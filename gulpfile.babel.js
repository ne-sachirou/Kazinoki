var gulp    = require('gulp');
var concat  = require('gulp-concat');
var plumber = require('gulp-plumber');

gulp.task('build', ['build:js']);

gulp.task('build:js', () => {
  return gulp.src([
    'node_modules/babel-core/browser.min.js',
    'bower_components/react/react.min.js',
    'bower_components/react/react-dom.min.js',
    'bower_components/regenerator/runtime/min.js',
  ]).
    pipe(concat('browser.runtime.js')).
    pipe(gulp.dest('.'));
});

gulp.task('default', () => {});
