var gulp = require('gulp');
var del = require('del'); // rm -rf
var zip = require('gulp-zip');
var webpack = require('webpack-stream');

gulp.task('default', ['zip'], function() {
  console.log('Your Chrome unpackaged app is inside ./built/');
  console.log('Your Chrome packaged app is inside ./dist/');
});

gulp.task('clean-built', function() {
  return del(['built']);
});

gulp.task('clean-dist', function() {
  return del(['dist']);
});

gulp.task('clean-bundle', function() {
  return del(['./foreground/bundle']);
});

gulp.task('clean', ['clean-bundle', 'clean-built', 'clean-dist'], function() {
  console.log("Cleaned foreground/bundle/, built/, dist/ ...");
});

var filesToMove = [
  './sandbox/*',
  './_locales/**/*',
  './assets/**/*',
  './manifest.json',
  './background/**/*',
  './foreground/bundle/**/*',
  './foreground/main.*',
  './node_modules/jquery/dist/jquery.js',
  './node_modules/underscore/underscore.js',
  './node_modules/bootstrap/dist/**/*',
  './node_modules/font-awesome/**/*',
  './manifest.json'
];

gulp.task('webpack-build', ['clean'], function() {
  return gulp.src('./foreground/src/app.js')
    .pipe(webpack( require('./webpack.production.config.js') ))
    .pipe(gulp.dest('./foreground/bundle/'));
});

gulp.task('move-files', ['webpack-build'], function() {
  return gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('built'));
});

gulp.task('zip', ['move-files'], function() {
  return gulp.src('built/**/*')
    .pipe(zip('dist.zip'))
    .pipe(gulp.dest('dist'));
});
