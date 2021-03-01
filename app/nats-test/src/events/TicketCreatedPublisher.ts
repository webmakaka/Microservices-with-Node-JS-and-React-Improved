import {
  APublisher,
  ESubjects,
  ITicketCreatedEvent,
} from '@webmak/microservices-common';

export class TicketCreatedPublisher extends APublisher<ITicketCreatedEvent> {
  subject: ESubjects.TicketCreated = ESubjects.TicketCreated;
}
