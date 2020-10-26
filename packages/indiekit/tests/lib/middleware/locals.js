import test from 'ava';
import sinon from 'sinon';
import {defaultConfig} from '../../../config/defaults.js';
import {locals} from '../../../lib/middleware/locals.js';

import mockReqRes from 'mock-req-res';

const {mockRequest, mockResponse} = mockReqRes;

test('Throws error', async t => {
  const request = mockRequest();
  const response = mockResponse();
  const next = sinon.spy();
  await locals(defaultConfig)(request, response, next);
  t.true(next.calledOnce);
  t.true(next.firstCall.args[0] instanceof Error);
});

test('Returns locals', async t => {
  const request = mockRequest({session: {token: 'token'}});
  const response = mockResponse({locals: {}});
  const next = sinon.spy();
  await locals(defaultConfig)(request, response, next);
  t.true(next.calledOnce);
});
