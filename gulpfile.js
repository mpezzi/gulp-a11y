'use strict';

var gulp   = require('gulp'),
    eslint = require('gulp-eslint');

gulp.task('lint', function () {

  return gulp.src('./src/**/*.js')
    .pipe(eslint({
      configFile: '.eslintrc'
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());

});

gulp.task('default', ['lint']);
