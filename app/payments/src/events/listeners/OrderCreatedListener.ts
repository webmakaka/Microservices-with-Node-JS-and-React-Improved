import {
  AListener,
  ESubjects,
  IOrderCreatedEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Order } from 'models/Order';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends AListener<IOrderCreatedEvent> {
  subject: ESubjects.OrderCreated = ESubjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const order = Order.build({
      id: data.id,
      price: data.ticket.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });

    await order.save();

    msg.ack();
  }
}
