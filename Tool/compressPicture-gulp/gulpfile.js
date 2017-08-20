var gulp = require('gulp');
var tinypng = require('gulp-tinypng');

const apikey = 'uAtUpB7XH6luNIrXhA_u4yYKN4log3C_';

gulp.task('default', function () {
    gulp.src('images/*')
        .pipe(tinypng(apikey))
        .pipe(gulp.dest('dist'));
});