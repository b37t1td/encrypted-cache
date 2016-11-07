var crypto = require('crypto');
var fs = require('fs');

var CRYPTO_ALGO = 'aes-256-ctr';

var Store = function(path) {
  this.key = crypto.randomBytes(16).toString('hex');
  this.path = path;

  if (fs.existsSync(path)) {
    this.clean();
  } else {
    fs.mkdirSync(path);
  }
};


Store.prototype.clean = function() {
  var files = fs.readdirSync(this.path);
  var path = this.path;

  files.map(function(file) {
    fs.unlinkSync(path + '/' + file);
  });
};

Store.prototype.pathHash = function(path) {
  return crypto.createHmac('sha256', this.key)
        .update(path)
        .digest('hex');
};

Store.prototype.exists = function(name, callback) {
  var hash = this.pathHash(name);

  return fs.exists(hash, function(exists) {
    if (exists) return callback('Already exists');
    return callback(null);
  });
};

Store.prototype.rename = function(src, dst, callback) {
  var srcHash = this.pathHash(src);
  var dstHash = this.pathHash(dst);

  fs.rename(this.path + '/' + srcHash, this.path + '/' + dstHash, function(err) {
    if (err) return callback(err);
    callback(null);
  });
};

Store.prototype.read = function(name, callback) {
  var hash = this.pathHash(name);
  var key = this.key;

  fs.readFile(this.path + '/' + hash, function(err, data) {
    if (err) return callback(err);

    var decipher = crypto.createDecipher(CRYPTO_ALGO, key);
    var decrypted = decipher.update(data);

    callback(null, decrypted);
  });
};

Store.prototype.write = function(name, buffer, callback) {
  var hash = this.pathHash(name);

  var cipher = crypto.createCipher(CRYPTO_ALGO, this.key);
  var encrypted = cipher.update(Buffer.from(buffer));

  fs.writeFile(this.path + '/' + hash, encrypted, function(err) {
    if (err) return callback(err);

    callback(null);
  });
};

module.exports = Store;
