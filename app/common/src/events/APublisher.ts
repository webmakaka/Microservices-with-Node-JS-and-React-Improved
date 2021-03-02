import { ESubjects } from 'events/ESubjects';
import { Stan } from 'node-nats-streaming';

interface IEvent {
  subject: ESubjects;
  data: any;
}

export abstract class APublisher<T extends IEvent> {
  abstract subject: T['subject'];
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T['data']): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err: any) => {
        if (err) {
          return reject(err);
        }
        console.log('Event published to subject', this.subject);
        resolve();
      });
    });
  }
}
