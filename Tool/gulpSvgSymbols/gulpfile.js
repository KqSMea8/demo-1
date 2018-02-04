'use strick';
const gulp = require("gulp");
const symbols = require("gulp-svg-symbols");

//转换svg
gulp.task('svg', () => {
  return gulp.src('./svg/**')
    .pipe(symbols())
    .pipe(gulp.dest('out/'))
});
