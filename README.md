### Encrypted Cache 

An enctypted filesystem cache.

### API

Api is based on convenient `callbacks`.

Create new store

```js
  var store = new Store(path);
```

Write something to store

```js
  store.write('my key', function(err) { } );
```

Read it back

```js
  store.read('my key', function(err, buffer) { });
```

Additioannly

```js
  store.clean();
  store.pathHash(key);
```


### LICENSE

BSD
