# synchronized-promise

Turn ES6 Promise into synchronize function call, a simple wrapper of deasync package

## Installation

```js
npm install synchronized-promise --save
```

## Usage

```js
const sp = require('synchronized-promise')

// An promise base async function
let asyncFunction = () => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(5)
    }, 2000)
  })
}

// regular usage
asyncFunction().then(value => value === 5)

// make it synchronized
let syncFunc = sp(asyncFunction)
const value = syncFunc() // value === 5
```
