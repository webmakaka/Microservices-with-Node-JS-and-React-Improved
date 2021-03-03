import {
  AListener,
  EOrderStatus,
  ESubjects,
  IExpirationCompleteEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { OrderCancelledPublisher } from 'events/publishers/OrderCancelledPublisher';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class ExpirationCompleteListener extends AListener<IExpirationCompleteEvent> {
  queueGroupName = queueGroupName;
  subject: ESubjects.ExpirationComplete = ESubjects.ExpirationComplete;

  async onMessage(data: IExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if (!order) {
      throw new Error('[Orders] Order not found');
    }

    if (order.status === EOrderStatus.Complete) {
      return msg.ack();
    }

    order.set({
      status: EOrderStatus.Cancelled,
    });

    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    msg.ack();
  }
}
