import {
  AListener,
  ESubjects,
  ITicketCreatedEvent,
} from '@webmak/microservices-common';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends AListener<ITicketCreatedEvent> {
  subject: ESubjects.TicketCreated = ESubjects.TicketCreated;
  queueGroupName = 'payments-service';

  onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
    console.log('Event data! ', data);
    msg.ack();
  }
}
