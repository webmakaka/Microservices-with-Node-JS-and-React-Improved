import {
  EOrderStatus,
  IOrderCancelledEvent,
} from '@webmak/microservices-common';
import { OrderCancelledListener } from 'events/listeners/OrderCancelledListener';
import { Order } from 'models/Order';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '__mocks__/NatsWrapper';

const setup = async () => {
  // @ts-ignore
  const listener = new OrderCancelledListener(natsWrapper.client);

  const order = Order.build({
    id: mongoose.Types.ObjectId().toHexString(),
    status: EOrderStatus.Created,
    price: 10,
    userId: 'alskdjf',
    version: 0,
  });

  await order.save();

  const data: IOrderCancelledEvent['data'] = {
    id: order.id,
    version: order.version + 1,
    ticket: {
      id: 'alskdjf',
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, order };
};

it('updates the status of the order', async () => {
  const { listener, data, msg, order } = await setup();

  await listener.onMessage(data, msg);

  const updateOrder = await Order.findById(order.id);

  expect(updateOrder!.status).toEqual(EOrderStatus.Cancelled);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
