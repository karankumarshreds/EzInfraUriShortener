import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongo: MongoMemoryServer;

let connection: mongoose.Connection;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();
  await mongoose.connect(mongoURI);
});

beforeEach(async () => {
  connection = mongoose.connection;
  const collections = await mongoose.connection.db.collections();
  collections.forEach(async (each) => {
    await each.deleteMany({});
  });
});

afterAll(async () => {
  await mongo.stop();
  connection.close();
});
