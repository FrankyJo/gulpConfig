var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');


gulp.task('hello', function() {
    console.log('Hello Zell');
});

gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});