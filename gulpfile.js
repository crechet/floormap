'use strict'

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');


// PostCSS plugins.
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

const postCssPlugins = [
    precss,
    autoprefixer({ browsers: 'last 2 versions' })
]

const paths = {
    app: 'app',
    styles: 'app/styles',
    images: 'app/styles/images'
};

gulp.task('styles', function() {
    return gulp.src('./dev/styles/main.css')
            .pipe(plumber({
                errorHandler: notify.onError(err => ({
                    title: 'styles',
                    message: err.message
                }))
            }))
            .pipe(postcss(postCssPlugins))
            .pipe(gulp.dest(paths.styles));
});

gulp.task('images', function() {
    return gulp.src('./dev/images/**/*.*')
            .pipe(gulp.dest(paths.images));
});

gulp.task('watch', function() {
    return gulp.watch('./dev/styles/**/*.css', ['styles']);
});

gulp.task('dev', ['styles', 'images', 'watch'], function() {
    browserSync.init({
         server: paths.app
    });
    
    browserSync.watch(paths.app + '/**/*.*').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'images', 'watch', 'dev']);
