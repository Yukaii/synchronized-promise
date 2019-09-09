/* 10 seconds */
const DEFAULT_TIMEOUTS = 10 * 1000

/**
 * @param {Function} func Promise-base function that want to be transformed
 * @param {Object} options Additional options
 * @param {number} options.timeouts Function call timeouts
 * @returns {Function}
 */
function sp (func, options = {}) {
  return (...args) => {
    let promiseError, promiseValue
    let promiseStatus = 'pending'
    const timeouts = options.timeouts || DEFAULT_TIMEOUTS

    func.apply(this, args).then(value => {
      promiseValue = value
      promiseStatus = 'resolved'
    }).catch(e => {
      promiseError = e
      promiseStatus = 'rejected'
    })

    const waitUntil = new Date(new Date().getTime() + timeouts)
    while ((waitUntil > new Date()) && promiseStatus === 'pending') {
      require('deasync').sleep(100)
    }

    if (promiseStatus === 'resolved') {
      return promiseValue
    } else if (promiseStatus === 'rejected') {
      throw promiseError
    } else {
      throw new Error(`${func.name} called timeout`)
    }
  }
}

module.exports = sp
