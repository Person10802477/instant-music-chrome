var gulp = require('gulp');
var del = require('del'); // rm -rf

gulp.task('default', ['build'], function() {
  console.log('Your Chrome app is inside ./built/');
});

gulp.task('clean', function() {
    return del(['built']);
});

var filesToMove = [
  './sandbox/*',
  './_locales/**/*',
  './assets/**/*',
  './manifest.json',
  './background/**/*',
  './foreground/bundle/**/*',
  './foreground/main.*',
  './foreground/setup.js',
  './node_modules/jquery/dist/jquery.js',
  './node_modules/underscore/underscore.js',
  './node_modules/bootstrap/dist/**/*',
  './node_modules/font-awesome/**/*',
  './manifest.json'
];

gulp.task('build', ['clean'], function(){
  gulp.src(filesToMove, { base: './' })
  .pipe(gulp.dest('built'));
});
