const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');

sass.compiler = require('node-sass');

const reload = browserSync.reload;

const paths = {
    html:['app/index.html'],
    css:['app/scss/**/*.scss']
};


gulp.task('sass', function () {
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(mmq())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
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
