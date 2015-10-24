var gulp    = require('gulp');
var concat  = require('gulp-concat');
var plumber = require('gulp-plumber');
var webpack = require('gulp-webpack');
var merge   = require('merge-stream');
var Webpack = require('webpack');

gulp.task('build', ['build:js']);

gulp.task('build:js', () => {
  return merge(
    gulp.src([
      'bower_components/react/react.min.js',
      'bower_components/react/react-dom.min.js',
      'bower_components/regenerator/runtime/min.js',
    ]),
    gulp.src('browser.js').
      pipe(plumber()).
      pipe(webpack({
        context: __dirname,
        output : {filename: 'browser.min.js'},
        module : {
          loaders: [
            {
              test   : /\.js$/,
              exclude: /node_modules/,
              loader : 'babel-loader',
            },
          ],
          resolve: {
            alias             : {},
            modulesDirectories: ['node_modules', 'bower_components'],
            extensions        : ['', '.js'],
          },
          plugins: [
            new Webpack.ResolverPlugin(new Webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('bower.json', ['main'])),
            new Webpack.optimize.DedupePlugin(),
            new Webpack.ProvidePlugin({
              jQuery: 'jquery',
              $     : 'jquery',
              jquery: 'jquery',
            }),
          ],
        },
      }))
  ).
    pipe(concat('browser.min.js')).
    pipe(gulp.dest('.'));
});

gulp.task('default', () => {});
