import {
  APublisher,
  ESubjects,
  ITicketUpdatedEvent,
} from '@webmakaka/microservices-common';

export class TicketUpdatedPublisher extends APublisher<ITicketUpdatedEvent> {
  subject: ESubjects.TicketUpdated = ESubjects.TicketUpdated;
}
