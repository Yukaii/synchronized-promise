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
    let hasError = false
    const timeouts = options.timeouts || DEFAULT_TIMEOUTS

    func.apply(this, args).then(value => {
      promiseValue = value
    }).catch(e => {
      promiseError = e
      hasError = true
    })

    const waitUntil = new Date(new Date().getTime() + timeouts)
    while ((waitUntil > new Date()) && typeof promiseError === 'undefined') {
      require('deasync').sleep(100)
      if (promiseValue) {
        return promiseValue
      }
    }

    if (hasError) {
      throw promiseError
    } else {
      throw new Error(`${func.name} called timeout`)
    }
  }
}

module.exports = sp
