# node-ally

> A collection of express middleware helpers.

[![NPM Version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Downloads Stats][npm-downloads]][npm-url]

node-ally is a very small library that has some middleware functions that I find useful.

## Installation

```sh
npm install node-ally --save
```

## Usage example

node-ally is an extremely small and easy to use library, it currently contains four middleware functions, these functions are as follows;

- `errorHandler` - The error handler is used to capture errors thrown in your NodeJS application and return a message + status code based on the thrown error as the server response.

- `enableCORS` - This middleware function enabled cross origin requests

- `notFound` - This middleware function will return an appropriate error to the client if they hit an endpoint that doesn't exist in your API

```javascript
import express from 'express';
import { errorHandler, enableCORS, notFound } from 'node-ally';

const app = express();

app.use(enableCORS);
app.use(notFound);
app.use(errorHandler);

export default app;
```

- `supportCrossOrigin` - This is used for preflight requests from browsers, currently it returns a 200 to the preflight request while also telling the browser that it accepts cross origin requests **using this will enable CORS for the route you use it on**

```javascript
import express from 'express';
import { supportCrossOrigin } from 'node-ally';

const router = express.Router();

router.options('/hello-world', supportCrossOrigin);
router.post('/hello-world', (req, res, next) => {
  res.status(200).send('Hello World');
});

export default router;
```

## Development setup

If you want to setup node-ally for development then you're going to need to get this repo onto your local machine by forking it and then cloning it, after it's on your machine the rest of the setup is pretty simple, you just need to install the dependencies with `npm install` and check everything is working with `npm test` the current node version being used can be found in the `.travis.yml`

```sh
npm install
npm test
```

## Release History

- 1.0.3
  - ADD: Added this readme file
  - ADD: added travis CI to the project
- 1.0.2
  - CHANGE: modified to only bundle index.js rather than index.js and index.test.js in final build
- 1.0.1
  - FIX: removed deprecated prepublish npm script
- 1.0.0
  - The initial version of the project

## Meta

Grant Leadbetter – [@Grantlyk](https://twitter.com/grantlyk) – grant@nespite.io

Distributed under the MIT license. See `LICENSE` for more information.

[https://github.com/grantlyk/node-ally](https://github.com/grantlyk/node-ally)

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Add your changes including tests
4. Commit your changes (`git commit -am 'Add some fooBar'`)
5. Push to the branch (`git push origin feature/fooBar`)
6. Create a new Pull Request
7. Ensure the CI build passes

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/node-ally.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-ally
[npm-downloads]: https://img.shields.io/npm/dm/node-ally.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/Grantlyk/node-ally/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/Grantlyk/node-ally
[wiki]: https://github.com/yourname/yourproject/wiki
