import test from 'ava'
import sp from './lib'

let asyncFunctionBuilder = (success, value = 5) => () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      if (success) {
        resolve(value)
      } else {
        reject(new TypeError(value))
      }
    }, 1000)
  })
}

test('Async function transform', t => {
  const expectedReturn = 5
  const syncFunc = sp(asyncFunctionBuilder(true, expectedReturn))

  const returnValue = syncFunc()

  t.is(returnValue, expectedReturn)

  t.pass()
})

test('it would throw promise rejection', t => {
  const expectedReturn = '🦄'
  const syncFunc = sp(asyncFunctionBuilder(false, expectedReturn))

  const error = t.throws(() => {
    syncFunc()
  }, TypeError)

  t.is(error.message, expectedReturn);
})

test('Get timeout error', t => {
	const timeoutFunc = sp(asyncFunctionBuilder(true), { timeouts: 500 })

	const error = t.throws(() => {
		timeoutFunc()
	}, Error)

	t.truthy(error.message.match('called timeout'))
})

