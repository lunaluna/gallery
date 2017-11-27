/*
gulpfile.js for saiki-php-package 2.0.0
*/

// node version v8.9.1

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var changed = require('gulp-changed');
var mmq = require('gulp-merge-media-queries');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect-php');
var csscomb = require('gulp-csscomb');
var csso = require('gulp-csso');
var imagemin = require('gulp-imagemin');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var phplint = require('gulp-phplint');
var plumber = require('gulp-plumber');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var sourcemaps = require('gulp-sourcemaps');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');


gulp.task('sasslint', function() {
  return gulp.src('project/resources/sass/*.scss')
    .pipe(sassLint({
      files: {
        include: 'project/resources/sass/*.scss',
        ignore: 'project/resources/sass/+(_bootstrap|_reset).scss'
      },
      configFile: '.sass-lint.yml'
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

// gulp.task('cssdev', function() {
//   return gulp.src('project/resources/sass/*.scss')
//     .pipe(sourcemaps.init())
//     .pipe(plumber({
//       errorHandler: notify.onError("Error: <%= error.message %>")
//     }))
//     .pipe(sass().on('error', sass.logError))
//     .pipe(autoprefixer({
//       browsers: ['last 2 version', 'ie 9', 'Android >= 4', 'iOS >= 7']
//     }))
//     .pipe(concat('style.css'))
//     .pipe(mmq({
//       log: true
//     }))
//     .pipe(csso())
//     .pipe(sourcemaps.write('./resources/map/'))
//     .pipe(gulp.dest('project'))
//     .pipe(browserSync.reload({
//       stream: true
//     }));
// });

gulp.task('cssdev', function() {
  return gulp.src('project/resources/sass/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 version', 'ie 9', 'Android >= 4', 'iOS >= 7']
    }))
    .pipe(concat('style.css'))
    .pipe(mmq({
      log: true
    }))
    .pipe(csscomb())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('./resources/map/'))
    .pipe(gulp.dest('project'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('jsdev', function() {
  return gulp.src('project/resources/js/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('project/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('lint', function() {
  return gulp.src('project/resources/js/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});


gulp.task('images', function() {
  return gulp.src('project/resources/raw-images/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(changed('project/images'))
    .pipe(imagemin({
      optimizationLevel: 7
    }))
    .pipe(gulp.dest('project/images'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('phplint', function() {
  return gulp.src(['project/**/*.php'])
    .pipe(phplint())
});


gulp.task('connect', function() {
  connect.server({
    port: '8000',
    hostname: '127.0.0.1',
    base: './project/'
  });
});


gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: '127.0.0.1:8000',
    notify: true
  });
});


gulp.task('bs-reload', function() {
  browserSync.reload();
});


gulp.task('watch', function() {
  gulp.watch('project/resources/sass/*.scss', ['sasslint', 'cssdev', 'bs-reload']);
  gulp.watch('project/resources/js/setting.js', ['lint', 'jsdev', 'bs-reload']);
  gulp.watch('project/resources/raw-images/*.+(jpg|jpeg|png|gif|svg)', ['images', 'bs-reload']);
  gulp.watch('project/**/*.php', ['phplint', 'bs-reload']);
});



gulp.task('dev', ['images', 'cssdev', 'jsdev']);
gulp.task('default', ['connect', 'browser-sync', 'sasslint', 'phplint', 'lint', 'dev', 'watch']);
