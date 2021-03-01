import {
  APublisher,
  ESubjects,
  IOrderCreatedEvent,
} from '@webmak/microservices-common';

export class OrderCreatedPublisher extends APublisher<IOrderCreatedEvent> {
  subject: ESubjects.OrderCreated = ESubjects.OrderCreated;
}
