'use strict';

const gulp = require('gulp'),
  rename = require('gulp-rename'),
  browserify = require('gulp-browserify'),
  uglify = require('gulp-uglify'),
  babelify = require('babelify'),
  shell = require('gulp-shell'),
  jshint = require('gulp-jshint'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  gulpSequence = require('gulp-sequence'),
  outputClientDir = '../server_build';

gulp.task('create-build-production-doc', shell.task('node update-package-json'));

gulp.task('remove-updated-package-json', shell.task('rm -rf package-build.json'));

gulp.task('move-updated-package-json', function() {
  return gulp.src('package-build.json')
    .pipe(rename({
      'basename': 'package',
    }))
    .pipe(gulp.dest(outputClientDir));
});

gulp.task('move-package-json', gulpSequence('remove-updated-package-json', 'create-build-production-doc', 'move-updated-package-json', 'remove-updated-package-json'));

gulp.task('copy-public-folder', function() {
  return gulp.src('public/**/*')
    .pipe(gulp.dest(outputClientDir + '/public'));
});

gulp.task('copy-views-folder', function() {
  return gulp.src('views/**/*')
    .pipe(gulp.dest(outputClientDir + '/views'));
});

gulp.task('copy-lang-folder', function() {
  return gulp.src('langFiles/**/*')
    .pipe(gulp.dest(outputClientDir + '/langFiles'));
});

gulp.task('js', function() {

  return gulp.src('./app.js', {
      'read': false
    })
    .pipe(browserify({
      'browserField': false,
      'bundleExternal': false,
      'detectGlobals': false,
      'transform': [
        [babelify.configure({
          'presets': ['es2015']
        })],
      ]
    }))
    .pipe(uglify().on('error', require('gulp-util').log))
    .pipe(rename({
      'basename': 'app',
      'suffix': '.min'
    }))
    .pipe(gulp.dest(outputClientDir));
});



var onError = function(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Beep'
  })(err);

  this.emit('end');
};

gulp.task('lint', function() {
  return gulp.src([
      './config/**/*.js',
      './controllers/**/*.js',
      './modules/**/*.js',
      './utilities/**/*.js',
      './*.js'
    ])
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
  gulp.watch([
    './config/**/*.js',
    './controllers/**/*.js',
    './modules/**/*.js',
    './utilities/**/*.js',
    './*.js'
  ], ['lint']);
});

gulp.task('lintWatch', ['lint', 'watch']);

gulp.task('build', ['move-package-json', 'copy-public-folder', 'copy-views-folder','copy-lang-folder', 'js']);