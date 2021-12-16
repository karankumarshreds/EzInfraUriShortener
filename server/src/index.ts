import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONN_STRING = process.env.CONN_STRING || 'mongodb://localhost:27017/dyte';

const start = async () => {
  // authentication
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be provided');
  }

  try {
    await mongoose.connect(CONN_STRING);
    console.log('Connected with DB');
  } catch (error) {
    console.error('============= Mongodb connection error =============', error);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
};

start();
