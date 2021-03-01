import {
  APublisher,
  ESubjects,
  ITicketUpdatedEvent,
} from '@webmak/microservices-common';

export class TicketUpdatedPublisher extends APublisher<ITicketUpdatedEvent> {
  subject: ESubjects.TicketUpdated = ESubjects.TicketUpdated;
}
