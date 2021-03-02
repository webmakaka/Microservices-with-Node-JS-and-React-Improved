import { ESubjects } from 'events/ESubjects';

export interface ITicketCreatedEvent {
  subject: ESubjects.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
