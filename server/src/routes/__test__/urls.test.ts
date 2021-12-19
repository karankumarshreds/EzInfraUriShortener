import request from 'supertest';
import { app } from '../../app';
import { signinMiddleware } from '../../test/tests-middleware';

describe('GENERATE URL SUFFIX', () => {
  it('generates a short url suffix', async () => {
    const cookie = await signinMiddleware({});
    const response = await request(app).get('/api/url/generate').set('Cookie', cookie).expect(200);
    expect(response.body).toBeDefined();
  });
});

describe('SAVE URL SUFFIX', () => {
  it('saves a short url suffix', async () => {
    const cookie = await signinMiddleware({});
    const response = await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);
    expect(response.body.shortUrl).toEqual('testing');
  });

  it('returns 400 for bad url', async () => {
    const cookie = await signinMiddleware({});
    await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtubecom',
        shortUrl: 'testing',
      })
      .expect(400);
  });

  it('returns 400 for custom url length shorter than 6', async () => {
    const cookie = await signinMiddleware({});
    await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'test',
      })
      .expect(400);
  });

  it('returns 400 if short url is already taken', async () => {
    const cookie = await signinMiddleware({});
    await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);
    await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(400);
  });
});

describe('UPDATE SHORT URL', () => {
  it('successfully updates the short url', async () => {
    const cookie = await signinMiddleware({});
    const response = await request(app)
      .post('/api/url')
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);
    const response2 = await request(app)
      .put(`/api/url/${response.body.id}`)
      .set('Cookie', cookie)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing1',
      })
      .expect(201);
    expect(response2.body.shortUrl).toEqual('testing1');
  });
  it('returns 404 is some other tries to update url', async () => {
    const user1 = await signinMiddleware({});
    const response = await request(app)
      .post('/api/url')
      .set('Cookie', user1)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);
    const user2 = await signinMiddleware({ email: 'test2@test.com', password: 'password' });
    await request(app)
      .put(`/api/url/${response.body.id}`)
      .set('Cookie', user2)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing1',
      })
      .expect(401);
  });
});

describe('GET URLS', () => {
  it('returns urls owned by the user', async () => {
    const user1 = await signinMiddleware({});
    await request(app)
      .post('/api/url')
      .set('Cookie', user1)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);

    await request(app)
      .post('/api/url')
      .set('Cookie', user1)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing2',
      })
      .expect(201);
    const response = await request(app).get('/api/url').set('Cookie', user1).expect(200);

    expect(response.body.length).toEqual(2);
  });
});

describe('REDIRECTION MAPPING', () => {
  it('redirects to correct mapped url', async () => {
    const user1 = await signinMiddleware({});
    await request(app)
      .post('/api/url')
      .set('Cookie', user1)
      .send({
        url: 'https://youtube.com',
        shortUrl: 'testing',
      })
      .expect(201);
    const response = await request(app).get(`/api/url/testing`).set('Cookie', user1).expect(200);
    expect(response.body.shortUrl).toEqual('testing');
    expect(response.body.url).toEqual('https://youtube.com');
  });
});
