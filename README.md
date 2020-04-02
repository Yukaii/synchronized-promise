# synchronized-promise
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

[![npm version](https://badge.fury.io/js/synchronized-promise.svg)](https://badge.fury.io/js/synchronized-promise)
[![Build Status](https://travis-ci.org/Yukaii/synchronized-promise.svg?branch=master)](https://travis-ci.org/Yukaii/synchronized-promise)

Turn ES6 Promise into synchronize function call, a simple wrapper of deasync package

## Installation

```js
npm install synchronized-promise --save
```

## Usage

First, you need to require the `synchronized-promise` packgage, for JavaScript:

```js
const sp = require('synchronized-promise')
```

For TypeScript or ES6 later JavaScript:

```ts
import sp from 'synchronized-promise'
```

Then call it as the following example:

```js
// An promise base async function
let asyncFunction = (value) => {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(value)
    }, 2000)
  })
}

// regular usage
asyncFunction(5).then(value => value === 5)

// make it synchronized
let syncFunc = sp(asyncFunction)
const value = syncFunc(5) // value === 5
```

See [`test.js`](https://github.com/Yukaii/synchronized-promise/blob/master/test.js) for usage in details.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/masquevil"><img src="https://avatars1.githubusercontent.com/u/3344691?v=4" width="100px;" alt=""/><br /><sub><b>侠小然</b></sub></a><br /><a href="https://github.com/Yukaii/synchronized-promise/commits?author=masquevil" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/clar-cmp"><img src="https://avatars3.githubusercontent.com/u/54909317?v=4" width="100px;" alt=""/><br /><sub><b>Clar Charron</b></sub></a><br /><a href="https://github.com/Yukaii/synchronized-promise/commits?author=clar-cmp" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
