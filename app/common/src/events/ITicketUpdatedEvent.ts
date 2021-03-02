import { ESubjects } from 'events/ESubjects';

export interface ITicketUpdatedEvent {
  subject: ESubjects.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string;
  };
}
