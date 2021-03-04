import {
  AListener,
  EOrderStatus,
  ESubjects,
  PaymentCreatedEventInteface,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class PaymentCreatedListener extends AListener<PaymentCreatedEventInteface> {
  subject: ESubjects.PaymentCreated = ESubjects.PaymentCreated;

  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEventInteface['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('[Orders] Order not found');
    }

    order.set({
      status: EOrderStatus.Complete,
    });

    await order.save();

    msg.ack();
  }
}
