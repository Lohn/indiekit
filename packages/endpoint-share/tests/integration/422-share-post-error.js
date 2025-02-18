import test from 'ava';
import {server} from '@indiekit-test/server';

test('Returns 422 if error publishing post', async t => {
  const request = await server();

  const result = await request.post('/share')
    .auth(process.env.TEST_BEARER_TOKEN, {type: 'bearer'})
    .send('name=Foobar')
    .send('content=Test+of+sharing+a+bookmark')
    .send('bookmark-of=https://example.website');

  t.is(result.statusCode, 422);
});
