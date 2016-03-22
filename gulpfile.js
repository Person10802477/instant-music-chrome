var gulp = require('gulp');
var del = require('del'); // rm -rf
var zip = require('gulp-zip');

gulp.task('default', ['zip'], function() {
  console.log('Your Chrome unpackaged app is inside ./built/');
  console.log('Your Chrome packaged app is inside ./dist/');
});

gulp.task('clean-built', function() {
  return del(['built']);
});

gulp.task('clean-archive', function() {
  return del(['dist']);
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

gulp.task('build', ['clean-built', 'clean-archive'], function(){
  return gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('built'));
});

gulp.task('zip', ['build'], function() {
  return gulp.src('built/**/*')
    .pipe(zip('built.zip'))
    .pipe(gulp.dest('dist'));
});
