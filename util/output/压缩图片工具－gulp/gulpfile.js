var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant'); // png图片压缩插件

gulp.task('default', function () {
    return gulp.src('images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] // 使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});
