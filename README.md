# Gulp a11y

A [Gulp](https://github.com/gulpjs/gulp) plugin for [a11y](https://github.com/addyosmani/a11y) to run accessibility audits on html files.

## Installation

```shell
npm install gulp-a11y
```

## Usage

```javascript
var a11y = require('gulp-a11y');

gulp.task('audit', function () {
  return gulp.src('./**/*.html')
    .pipe(a11y())
    .pipe(a11y.report());
});
```

## Options

You can pass any options directly to a11y, example:

```javascript
var a11y = require('gulp-a11y');

gulp.task('audit', function () {
  return gulp.src('./**/*.html')
    .pipe(a11y({
      viewportSize: '800x600',
      delay: 1
    }))
    .pipe(a11y.reporter());
});
```
