import { ESubjects } from 'events/ESubjects';

export interface IExpirationCompleteEvent {
  subject: ESubjects.ExpirationComplete;
  data: {
    orderId: string;
  };
}
