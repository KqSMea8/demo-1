var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jpegtran = require('imagemin-jpegtran'); // jpg图片压缩插件
var pngquant = require('imagemin-pngquant'); // png图片压缩插件

// 压缩png
gulp.task('png', function () {
    return gulp.src('images/*.png')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] // 使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});

// 压缩jpg
gulp.task('jpg', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()] // 使用pngquant来压缩png图片
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
    return gulp.start('png', 'jpg');
});
