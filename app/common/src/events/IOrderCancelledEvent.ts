import { ESubjects } from 'events/ESubjects';

export interface IOrderCancelledEvent {
  subject: ESubjects.OrderCancelled;
  data: {
    id: string;
    ticket: {
      id: string;
    };
  };
}
