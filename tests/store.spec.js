var Store = require('../index.js');
var expect = require('chai').expect;

var path = require('path');
var fs = require('fs');

describe('Store creation r/w tests', function() {
  var cachePath = path.resolve(__dirname, '../tmp');
  var store = new Store(cachePath);

  it('should create store', function() {
    expect(store).not.be.null;
    expect(fs.readdirSync(cachePath).length).to.equal(0);
  });

  it('should create hash for path and compare them', function() {
    var path = '/test/1234/a';
    var hash = store.pathHash(path);
    expect(hash).to.equal(store.pathHash(path));
  });

  it('should write something', function(done) {
    store.write('/test.txt', 'hello world\n', function(err) {
      expect(err).to.be.null;

      store.read('/test.txt', function(err, data) {
        expect(err).to.be.null;
        expect(data.toString()).to.equal('hello world\n');
        done();
      });
    });
  });

  it('should rewrite keys', function(done) {
    var str = '#### hello!!!\r\n';
    store.write('/test.txt', str, function(err) {
      expect(err).to.be.null;

      store.read('/test.txt', function(err, data) {
        expect(err).to.be.null;
        expect(data.toString()).to.equal(str);
        done();
      });
    });
  });


  it('should write and read previous', function(done) {
    var str = '#### hello!!!\r\n';

    store.write('/sub/lalalal', str, function(err) {
      expect(err).to.be.null;

      store.read('/test.txt', function(err, data) {
        expect(err).to.be.null;
        expect(data.toString()).to.equal(str);

        store.read('/sub/lalalal', function(err,data) {
          expect(err).to.be.null;
          expect(data.toString()).to.equal(str);
          done();
        });
      });
    });
  });

  it('should handle not-found errors', function(done) {
    store.read('not-found', function(err, data) {
      expect(err).not.be.null;
      expect(data).to.be.an('undefined');
      done();
    });
  });


});