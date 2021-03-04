import {
  APublisher,
  ESubjects,
  IPaymentCreatedEvent,
} from '@webmak/microservices-common';

export class PaymentCreatedPublisher extends APublisher<IPaymentCreatedEvent> {
  subject: ESubjects.PaymentCreated = ESubjects.PaymentCreated;
}
