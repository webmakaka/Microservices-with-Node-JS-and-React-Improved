import { ESubjects } from 'events/ESubjects';

export interface ITicketCreatedEvent {
  subject: ESubjects.TicketCreated;
  data: {
    id: string;
    title: string;
    price: number;
    userId: string;
  };
}
