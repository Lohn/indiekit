import test from 'ava';
import nock from 'nock';
import {getFixture} from '@indiekit-test/get-fixture';
import {server} from '@indiekit-test/server';

test('Uploads file', async t => {
  nock('https://tokens.indieauth.com')
    .get('/token')
    .reply(200, {
      me: process.env.TEST_PUBLICATION_URL,
      scope: 'media'
    });
  nock('https://api.github.com')
    .put(uri => uri.includes('.jpg'))
    .reply(200, {commit: {message: 'Message'}});
  const request = await server();

  const result = await request.post('/media')
    .auth(process.env.TEST_BEARER_TOKEN, {type: 'bearer'})
    .set('Accept', 'application/json')
    .attach('file', getFixture('file-types/photo.jpg', false), 'photo.jpg');

  t.is(result.statusCode, 201);
  t.regex(result.headers.location, /\b.jpg\b/);
  t.regex(result.body.success_description, /\bMedia uploaded\b/);
});
