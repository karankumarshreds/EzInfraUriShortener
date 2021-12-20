import { app } from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const CONN_STRING = process.env.CONN_STRING;
const JWT_KEY = process.env.JWT_KEY;

const start = async () => {
  /* env variables check */
  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be provided');
  }
  if (!CONN_STRING) {
    throw new Error('CONN_STRING must be provided');
  }
  if (!process.env.CLIENT_ADDRESS) {
    throw new Error('CLIENT_ADDRESS must be provided');
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
