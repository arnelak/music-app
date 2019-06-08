'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require("gulp-babel");

sass.compiler = require('node-sass');

gulp.task("default", function () {
  return gulp.src("src/scripts/index.js")
      .pipe(babel())
      .pipe(gulp.dest("dist"));
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/scss/**/*.scss', gulp.series('sass'));
});
