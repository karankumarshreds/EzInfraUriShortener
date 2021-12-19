import request from 'supertest';
import { app } from '../../app';
import { signupMiddleware } from '../../test/tests-middleware';

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
