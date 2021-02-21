import { json } from 'body-parser';
import { NotFoundError } from 'errors/not-found-error';
import express from 'express';
import 'express-async-errors';
import { errorHandler } from 'middlewares/error-handler';
import { currentUserRouter } from 'routes/current-user';
import { signinRouter } from 'routes/signin';
import { signoutRouter } from 'routes/signout';
import { signupRouter } from 'routes/signup';

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (_req, _res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
