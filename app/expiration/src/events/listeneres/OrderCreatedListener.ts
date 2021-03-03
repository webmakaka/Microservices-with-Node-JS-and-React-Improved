import {
  AListener,
  ESubjects,
  IOrderCreatedEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeneres/queueGroupName';
import { Message } from 'node-nats-streaming';
import { expirationQueue } from 'queues/expiration-queue';

export class OrderCreatedListener extends AListener<IOrderCreatedEvent> {
  subject: ESubjects.OrderCreated = ESubjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
