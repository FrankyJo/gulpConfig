const gulp = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const minifyCss = require('gulp-minify-css');
const shorthand = require('gulp-shorthand');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const mmq = require('gulp-merge-media-queries');
const terser = require('gulp-terser');
const obfuscate  = require('gulp-obfuscate');
const babel = require('gulp-babel');
const image = require('gulp-image');


const reload = browserSync.reload;

const paths = {
    html:['app/index.html'],
    css:['app/scss/**/*.scss'],
    js:['app/js/**/*.js'],
    images:['app/images/**/*']
};


gulp.task('sass', function () {
    return gulp.src(paths.css)
        .pipe(sourcemaps.init())
        .pipe(shorthand())
        .pipe(sass().on('error', sass.logError))
        .pipe(mmq())
        .pipe(minifyCss())
        .pipe(autoprefixer({
            cascade: false
        }))        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream:true}));
});

gulp.task('js', function () {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        //.pipe(obfuscate())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream:true}));
});

gulp.task('html',function(){
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream:true}));
});

gulp.task('images',function(){
    return gulp.src(paths.images)
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            guetzli: false,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true // defaults to false
        }))
        .pipe(gulp.dest('dist/images'))
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
    gulp.watch(paths.images, gulp.series('images'));
});

gulp.task('default', gulp.series(gulp.parallel('watcher', 'browserSync')));
