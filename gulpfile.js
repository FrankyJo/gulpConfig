var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');

sass.compiler = require('node-sass');

var reload = browserSync.reload;

var paths = {
    html:['app/index.html'],
    css:['app/scss/**/*.scss']
};


gulp.task('sass', function () {
    return gulp.src(paths.css)
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

gulp.task('html',function(){
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
        open: true,
        notify: false
    });

});

gulp.task('watcher',function(){
    gulp.watch(paths.css, gulp.series('sass'));
    gulp.watch(paths.html, gulp.series('html'));
});

gulp.task('default', gulp.series(gulp.parallel('watcher', 'browserSync')));
