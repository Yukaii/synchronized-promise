import test from 'ava'
import sp from './lib'

let asyncFunctionBuilder = (success) => (value, timeouts = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (success) {
        resolve(value)
      } else {
        reject(new TypeError(value))
      }
    }, timeouts)
  })
}

test('Async function transform', t => {
  const syncFunc = sp(asyncFunctionBuilder(true))

  const expectedReturn = 5
  const returnValue = syncFunc(expectedReturn)

  t.is(returnValue, expectedReturn)

  t.pass()
})

test('it would throw promise rejection', t => {
  const expectedReturn = '🦄'
  const syncFunc = sp(asyncFunctionBuilder(false))

  const error = t.throws(() => {
    syncFunc(expectedReturn)
  }, TypeError)

  t.is(error.message, expectedReturn);
})

test('Get timeout error', t => {
  const timeoutFunc = sp(asyncFunctionBuilder(true), { timeouts: 100 })

  const error = t.throws(() => {
    timeoutFunc(undefined, 1000)
  }, Error)

  t.truthy(error.message.match('called timeout'))
})

