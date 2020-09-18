# spreedly-api

**Spreedly Api** is a Typescript library which implements spreedly api.
The library does not modify request and response payload.

*   [Installation](#installation)
*   [Usage](#usage)
*   [Versioning](#versioning)
*   [Contributing](#contributing)
*   [Unit Tests](#unit-tests)
*   [License](#license)

## Installation

```
npm i @goparrot/spreedly-api
```

## Usage

### Simple example

```typescript
import { SpreedlyGateway } from '@goparrot/spreedly-api';

const gateway = new SpreedlyGateway({
    username: '',
    password: '',
    format: 'json',
    maxRetries: 5
});

// Show Gateway
gateway.show('gateway_token')
    .then(data => console.log(data))
    .catch(error => console.log(error));

```
## Available Options

### `SpreedlyApi` Options
    baseUrl: string;
    username: string;
    password: string;
    maxRetries?: number;
    format?: json | xml;

| Name           | Type       | Default            | Description                                                                                                                                                                                                                                                           |
| -------------- | ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| maxRetries     | `Number`   | `3`                | The number of times to retry before failing. Also for control the delay between retried request is used the built-in `exponentialDelay` function is used ([Exponential Backoff](https://developers.google.com/analytics/devguides/reporting/core/v3/errors#backoff)).     |
| baseUrl        | `string`   | https://core.spreedly.com/v1 | The base URL against which to resolve every API call's (relative) path. |
| username       | `string`   | The string for basic access authentication |
| password       | `string`   | The string for basic access authentication |


## Versioning

Spreedly Api follows [Semantic Versioning](http://semver.org/).

## Contributing

See [`CONTRIBUTING`](https://github.com/goparrot/spreedly-api-client/blob/feauture/2181-spreedly-api/CONTRIBUTING.md) file

## Unit Tests

In order to run the test suite, install the development dependencies:

```
npm i
```

Then, run the following command:

```
npm run coverage
```

## License

`@goparrot/spreedly-api` is licensed under the [MIT license](LICENSE).