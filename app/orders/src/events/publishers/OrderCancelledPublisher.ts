import {
  APublisher,
  ESubjects,
  IOrderCancelledEvent,
} from '@webmak/microservices-common';

export class OrderCancelledPublisher extends APublisher<IOrderCancelledEvent> {
  subject: ESubjects.OrderCancelled = ESubjects.OrderCancelled;
}
