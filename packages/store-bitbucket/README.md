# @indiekit/store-bitbucket

Store IndieWeb content on Bitbucket.

## Installation

`npm i @indiekit/store-bitbucket`

## Usage

```js
const BitbucketStore = require('@indiekit/store-bitbucket');

const bitbucket = new BitbucketStore({
  // config options here
});
```

## Options

### `branch`

The branch files will be saved to.

Type: `string`\
_Optional_, defaults to `master`

### `password`

A Bitbucket [app password](https://bitbucket.org/account/settings/app-passwords/).

Type: `string`\
_Required_

### `repo`

The name of your Bitbucket repository.

Type: `string`\
_Required_

### `user`

Your Bitbucket username.

Type: `string`\
_Required_
