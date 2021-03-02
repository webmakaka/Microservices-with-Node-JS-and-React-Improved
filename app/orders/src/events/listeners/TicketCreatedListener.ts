import {
  AListener,
  ESubjects,
  ITicketCreatedEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Ticket } from 'models/Ticket';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends AListener<ITicketCreatedEvent> {
  subject: ESubjects.TicketCreated = ESubjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ITicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
