### Encrypted Cache 

[![Build Status](https://travis-ci.org/b37t1td/encrypted-cache.svg?branch=master)](https://travis-ci.org/b37t1td/encrypted-cache)

An enctypted filesystem cache.

### Install

```js
  npm install encrypted-cache
```

### API

Api is based on convenient `callbacks`.

Create new store

```js
  var store = new Store(path);
```

Write something to store

```js
  store.write('my key', buffer, function(err) { });
```

Read it back

```js
  store.read('my key', function(err, buffer) { });
```

Rename cache key

```js
  store.rename(src, dst, function(err) { });
```

Remove cache entry

```js
  store.remove('my key', function(err) { });
```

Additionnaly

```js
  store.clean();
  store.pathHash(key);
```


### LICENSE

BSD
