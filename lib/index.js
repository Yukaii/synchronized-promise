/* 10 seconds */
const DEFAULT_TIMEOUTS = 10 * 1000

/**
 * @param {Function} func Promise-base function that want to be transformed
 * @param {Object} options Additional options
 * @param {number} options.timeouts Function call timeouts
 * @param {Array} options.args Function call arguments
 * @returns {Function}
 */
function syncPromise (func, options = {}) {
  return () => {
    let promiseError, promiseValue
    let hasError = false
    let args = Array.isArray(options.args) ? options.args : [options.args]
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

module.exports = syncPromise
