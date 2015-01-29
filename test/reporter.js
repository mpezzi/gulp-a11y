'use strict';

var should = require('should'),
    gutil  = require('gulp-util'),
    a11y   = require('../src/');

describe('gulp-a11y format', function () {

  var stream, fixture;

  beforeEach(function () {

    fixture = new gutil.File({
      base: __dirname + '/fixtures/',
      cwd: __dirname,
      path: __dirname + '/fixtures/fixture.html'
    });

    stream = a11y();

  });

  it('should return a report', function (done) {

    stream.on('data', function (file) {
      file.should.have.property('a11y');
    });

    stream.on('end', function () {
      done();
    });

    stream.write(fixture);
    stream.end();

  });

  it('should format a report', function (done) {

    var report = a11y.reporter(function (output) {
      should.exist(output);
    });

    stream.on('end', function () {
      done();
    });

    stream.write(fixture);
    stream.pipe(report);
    stream.end();

  });

  it('should fail on error', function (done) {

    var fail = a11y.failOnError();

    stream.on('data', function (file) {
      file.should.have.property('a11y');
    });

    fail.on('error', function (error) {
      should.exist(error);
      done();
    });

    fail.on('end', function () {
      done(new Error('Stream completed without failure.'));
    });

    stream.write(fixture);
    stream.pipe(fail);
    stream.end();

  });

});
