import {
  AListener,
  EOrderStatus,
  ESubjects,
  IOrderCancelledEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class OrderCancelledListener extends AListener<IOrderCancelledEvent> {
  subject: ESubjects.OrderCancelled = ESubjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCancelledEvent['data'], msg: Message) {
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!order) {
      throw new Error('[Payments] Order not found');
    }

    order.set({ status: EOrderStatus.Cancelled });
    await order.save();

    msg.ack();
  }
}
