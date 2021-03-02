import {
  AListener,
  ESubjects,
  ITicketUpdatedEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { Ticket } from 'models/Ticket';
import { Message } from 'node-nats-streaming';

export class TicketUpdatedListener extends AListener<ITicketUpdatedEvent> {
  subject: ESubjects.TicketUpdated = ESubjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ITicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    const { title, price } = data;

    ticket.set({
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
