import { ESubjects } from 'events/ESubjects';

export interface IPaymentCreatedEvent {
  subject: ESubjects.PaymentCreated;
  data: {
    id: string;
    orderId: string;
    stripeId: string;
  };
}
