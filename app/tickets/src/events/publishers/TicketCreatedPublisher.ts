import {
  APublisher,
  ESubjects,
  ITicketCreatedEvent,
} from '@webmakaka/microservices-common';

export class TicketCreatedPublisher extends APublisher<ITicketCreatedEvent> {
  subject: ESubjects.TicketCreated = ESubjects.TicketCreated;
}
