import { ESubjects } from 'events/ESubjects';

export interface ITicketUpdatedEvent {
  subject: ESubjects.TicketUpdated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
