import test from 'tape-catch';
import sinon from 'sinon';
import {
  supportCrossOrigin,
  notFound,
  errorHandler,
  enableCORS,
} from './index.js';

test('Lib SupportCrossOrigin', assert => {
  const res = {
    status: sinon.spy(),
    header: sinon.spy(),
  };

  const next = sinon.spy();

  supportCrossOrigin(null, res, next);

  assert.ok(res.status.called, 'Status should be called');
  assert.ok(res.header.called, 'Header should be called');
  assert.same(res.header.callCount, 3, 'Header should be called three times');
  assert.ok(next.called, 'Next should be called');
  assert.end();
});

test('Lib notFound', assert => {
  const json = sinon.fake();
  const res = {
    status: sinon.fake.returns({ json }),
  };

  const next = sinon.spy();
  const expected = {
    message: 'Endpoint not Found',
    code: 404,
  };

  notFound(null, res, next);

  assert.ok(res.status.called, 'Status should be called');
  assert.ok(json.called, 'Json should be called');
  assert.same(
    json.lastArg,
    expected,
    'Json should be passed the correct not found message',
  );
  assert.end();
});

test('Lib errorHandler', assert => {
  const json = sinon.fake();
  const res = {
    status: sinon.fake.returns({ json }),
  };

  const err = {
    code: 500,
    message: 'An Error has occurred',
  };

  const expected = err;

  errorHandler(err, null, res);

  assert.ok(res.status.called, 'Should have called res.status');
  assert.same(
    json.lastArg,
    expected,
    'Json should be passed the correct error message',
  );

  res.headersSent = true;
  const next = sinon.spy();

  errorHandler(err, null, res, next);

  assert.ok(next.called, 'Should call next if readers have been sent');
  assert.end();
});

test('Lib enableCORS', assert => {
  const res = { header: sinon.spy() };
  const next = sinon.spy();

  enableCORS(null, res, next);

  assert.ok(res.header.called, 'should have called the header function');
  assert.ok(
    res.header.calledThrice,
    'should have called the header function three times',
  );
  assert.ok(next.called, 'should have called the next function');
  assert.end();
});
