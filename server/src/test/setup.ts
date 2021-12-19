import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

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

// refactoring global to accept custom function to be used by all the tests
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

// @ts-ignore
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);
  const cookie = response.get('Set-Cookie');
  return cookie;
};
