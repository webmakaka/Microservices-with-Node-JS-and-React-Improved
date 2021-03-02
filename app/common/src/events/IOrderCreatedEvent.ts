import { ESubjects } from 'events/ESubjects';
import { EOrderStatus } from 'events/types/EOrderStatus';

export interface IOrderCreatedEvent {
  subject: ESubjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: EOrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}
