const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
// const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');
const minify = require('gulp-minify');
const obfuscate  = require('gulp-obfuscate');

sass.compiler = require('node-sass');

const reload = browserSync.reload;

const paths = {
    html:['app/index.html'],
    css:['app/scss/**/*.scss'],
    js:['app/js/**/*.js']
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

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(obfuscate())
        .pipe(minify({
            ext:{
                min:'.js'
            }
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
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
    gulp.watch(paths.js, gulp.series('js'));
});

gulp.task('default', gulp.series(gulp.parallel('watcher', 'browserSync')));
