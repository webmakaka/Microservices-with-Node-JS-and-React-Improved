import {
  APublisher,
  ESubjects,
  IExpirationCompleteEvent,
} from '@webmak/microservices-common';

export class ExpirationCompletePublisher extends APublisher<IExpirationCompleteEvent> {
  subject: ESubjects.ExpirationComplete = ESubjects.ExpirationComplete;
}
