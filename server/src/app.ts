import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import { errorHandler } from './common/errors';
import cookieSession from 'cookie-session';

// routes
import { authenticationRoutes } from './routes/authentication';
import { urlRoutes } from './routes/urls';

const app = express();

app.set('trust proxy', true);

app.use(json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
  })
);

app.use(
  cookieSession({
    // we do not need encrypted cookies
    signed: false,
    // make sure to accept requests from only https
    // secure: process.env.NODE_ENV === 'PROD',
    secure: false,
  })
);

// authentication
app.use('/api/auth', authenticationRoutes);
app.use('/api/url', urlRoutes);

// to catch all the errors
app.use(errorHandler);

export { app };
