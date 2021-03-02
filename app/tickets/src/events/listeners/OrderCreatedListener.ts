import {
  AListener,
  ESubjects,
  IOrderCreatedEvent,
} from '@webmak/microservices-common';
import { queueGroupName } from 'events/listeners/queueGroupName';
import { TicketUpdatedPublisher } from 'events/publishers/TicketUpdatedPublisher';
import { Ticket } from 'models/Ticket';
import { Message } from 'node-nats-streaming';

export class OrderCreatedListener extends AListener<IOrderCreatedEvent> {
  subject: ESubjects.OrderCreated = ESubjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);
    if (!ticket) {
      throw new Error('[Tickets] Ticket not found');
    }

    ticket.set({ orderId: data.id });

    await ticket.save();
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId,
      version: ticket.version,
    });

    msg.ack();
  }
}
