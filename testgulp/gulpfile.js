var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');

gulp.task('sass',function(){
	gulp.src('./scss/*.scss')
	 .pipe(sass())
	 .pipe(gulp.dest('./css'));
});

gulp.task('watch',function(){
	gulp.watch('./scss/*.scss',['sass']);
});

gulp.task('rename',function(){
	gulp.src('src/1.js')
	.pipe(uglify())//压缩
	.pipe(rename('1.min.js'))//会将1.js重命名
	.pipe(gulp.dest('js'));
})


gulp.task('minify-css',function(){
	gulp.src('src/*.css')
	.pipe(minifyCss())
	.pipe(rename('1.min.css'))
	.pipe(gulp.dest('css'))
});

gulp.task('hello',function  () {
	console.log('您好');
})

// gulp.src(['js/*js','css/*.css'],{base: 'client'})
// .pipe(gulp.dest('dist/foo.js'));
// 文件路径是dest+src里面的路径


gulp.task('default',['hello']);