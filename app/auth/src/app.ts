import { errorHandler, NotFoundError } from '@webmak/microservices-common';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { currentUserRouter } from 'routes/current-user';
import { metricsRouter } from 'routes/metrics';
import { signinRouter } from 'routes/signin';
import { signoutRouter } from 'routes/signout';
import { signupRouter } from 'routes/signup';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(metricsRouter);
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (_req: Request, _res: Response) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
