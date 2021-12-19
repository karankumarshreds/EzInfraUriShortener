import request from 'supertest';
import { app } from '../../app';
import { signinMiddleware, signupMiddleware } from '../../test/tests-middleware';

const dummyData = {
  email: 'test@test.com',
  password: 'password',
  firstName: 'test',
  lastName: 'test',
};

describe('CURRENT USER ROUTE', () => {
  it('returns current user details', async () => {
    const cookies = await signupMiddleware({});
    const response = await request(app).get('/api/auth/current-user').set('Cookie', cookies).send().expect(200);
    expect(response.body.email).toEqual('test@test.com');
  });

  it('returns null if not signed in', async () => {
    const response = await request(app).get('/api/auth/current-user').send().expect(200);
    expect(response.body.id).not.toBeDefined();
  });
});

describe('SIGNIN USER ROUTE', () => {
  it('returns 401 if email does not exist', async () => {
    return request(app)
      .post('/api/auth/signin')
      .send({
        email: 'random@random.com',
        password: 'password',
      })
      .expect(401);
  });

  it('returns 401 if incorrect password is applied', async () => {
    await signupMiddleware({ email: 'valid@valid.com', password: 'password' });

    await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'valid@valid.com',
        password: 'invalid_password',
      })
      .expect(401);
  });

  it('returns with cookie if valid credentials', async () => {
    await signupMiddleware({ email: 'valid@valid.com', password: 'password' });
    const response = await request(app)
      .post('/api/auth/signin')
      .send({
        email: 'valid@valid.com',
        password: 'password',
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('SIGNUP USER ROUTE', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        ...dummyData,
      })
      .expect(201);
  });

  it('returns a 400 with an invalid email', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'testtest.com',
        password: 'password',
      })
      .expect(400);
  });

  it('returns a 400 with an invalid password', async () => {
    return request(app)
      .post('/api/auth/signup')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
  });

  it('returns a 400 with missing email and password', async () => {
    return request(app).post('/api/auth/signup').send({}).expect(400);
  });

  it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/auth/signup')
      .send({
        ...dummyData,
      })
      .expect(201);
    await request(app)
      .post('/api/auth/signup')
      .send({
        ...dummyData,
      })
      .expect(400);
  });

  it('sets a cookie after a successful signup', async () => {
    const response = await request(app)
      .post('/api/auth/signup')
      .send({
        ...dummyData,
      })
      .expect(201);
    // To check if user is getting a cookie attached to header
    // as 'Set-Cookie' which includes the JWT for the user
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('SIGNOUT USER ROUTE', () => {
  it('clears the cookie after signout', async () => {
    const cookie = await signinMiddleware({});
    await request(app).post('/api/auth/signout').set('Cookie', cookie).send({}).expect(200);
    const response = await request(app).get('/api/auth/current-user').send({});
    expect(response.body).toEqual({});
  });
});
