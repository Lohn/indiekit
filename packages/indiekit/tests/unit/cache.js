import test from 'ava';
import nock from 'nock';
import {indiekitConfig} from '@indiekit-test/config';
import {Cache} from '../../lib/cache.js';

const config = (async () => {
  return indiekitConfig()
})();

test.beforeEach(async t => {
  const {application} = await config;

  t.context = {
    cacheCollection: application.cache,
    url: `${process.env.TEST_PUBLICATION_URL}categories.json`
  };
});

test.serial('Returns data from remote file and saves to cache', async t => {
  nock(process.env.TEST_PUBLICATION_URL)
    .get('/categories.json')
    .reply(200, ['Foo', 'Bar']);
  const cache = new Cache(t.context.cacheCollection);

  const result = await cache.json('test1', t.context.url);

  t.is(result.source, t.context.url);
});

test.serial('Throws error if remote file not found', async t => {
  nock(process.env.TEST_PUBLICATION_URL)
    .get('/categories.json')
    .replyWithError('Not found');
  const cache = new Cache(t.context.cacheCollection);

  await t.throwsAsync(cache.json('test2', t.context.url), {
    message: `Unable to fetch ${t.context.url}: Not found`
  });
});

test.serial('Gets data from cache', async t => {
  t.context.cacheCollection.insertOne({
    key: 'test3',
    url: t.context.url,
    data: ['Foo', 'Bar']
  });
  const cache = new Cache(t.context.cacheCollection);

  // Request item and add to cache
  await cache.json('test3', t.context.url);

  // Retrieve item from cache
  const result = await cache.json('test3', t.context.url);

  t.is(result.source, 'cache');
});
