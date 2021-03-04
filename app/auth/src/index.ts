import { app } from 'app';
import mongoose from 'mongoose';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('[Auth] JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('[Auth] MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('[Auth] Connected to MongoDB');
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log('[Auth] Listening on port 3000');
  });
};

start();
