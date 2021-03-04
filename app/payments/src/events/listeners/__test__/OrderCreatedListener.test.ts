import { EOrderStatus, IOrderCreatedEvent } from '@webmak/microservices-common';
import { OrderCreatedListener } from 'events/listeners/OrderCreatedListener';
import { Order } from 'models/Order';
import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from '__mocks__/NatsWrapper';

const setup = async () => {
  // @ts-ignore
  const listener = new OrderCreatedListener(natsWrapper.client);

  const data: IOrderCreatedEvent['data'] = {
    id: mongoose.Types.ObjectId().toHexString(),
    version: 0,
    expiresAt: 'alskdfjf',
    userId: 'alskdjf',
    status: EOrderStatus.Created,
    ticket: {
      id: 'alskdfj',
      price: 10,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('replicated the order info', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const order = await Order.findById(data.id);

  expect(order!.price).toEqual(data.ticket.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
