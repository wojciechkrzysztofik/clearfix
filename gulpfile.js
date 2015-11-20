'use strict';

var $ = require('gulp-load-plugins')(),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    lazypipe = require('lazypipe'),
    bower = require('gulp-bower'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    notify = require("gulp-notify");

var scss_dir = './assets/scss/',
    scripts_dir = './assets/js/',
    fonts_dir = './assets/fonts/',
    dist_dir = './assets/dist/';

var jupi_message = 'Dobra robota Wojtku!';

// SCSS COMPILE
gulp.task('styles', function () {
    gulp.src(scss_dir + 'main.scss')
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(rename('styles.min.css'))
        .pipe(gulp.dest(dist_dir + 'css/'))
        .pipe(notify({
            title: "SCSS compiled successfully",
            message: jupi_message,
            onLast: true
        }));
});

// COPY SCRIPTS
gulp.task('copy', function () {
    return gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery.appear/jquery.appear.js'])
        .pipe(gulp.dest(scripts_dir + 'vendors/'));
});

// COPY FONTS
gulp.task('fonts', function () {
    return gulp.src(fonts_dir + '*')
        .pipe(gulp.dest(dist_dir + 'fonts/'));
});

// SCSS WATCHER
gulp.task('watch', function () {
    gulp.watch(scss_dir + '**/*.scss', ['styles']);
    gulp.watch(scripts_dir + '**/*.js', ['scripts']);
});

// JS CONCAT AND UGLIFY
gulp.task('scripts', function() {
    return gulp.src([scripts_dir + 'vendors/jquery.js', scripts_dir + 'vendors/jquery.appear.js', scripts_dir + 'index.js'])
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(dist_dir + 'js'))
        .pipe(notify({
            title: "JS compiled successfully",
            message: jupi_message,
            onLast: true
        }));
});

// CLEAN DIST DIRECTORIES
gulp.task('clean', require('del').bind(null, [dist_dir]));

// BOWER INSTALL
gulp.task('bower-install', function () {
    return $.bower().on('end', function () {
        console.log('Bower components installed');
    });
});

// BUILD STYLES AND SCRIPTS
gulp.task('build', ['styles', 'scripts']);


// CLEAN, BOWER INSTALL AND BUILD
gulp.task('setup', ['clean', 'bower-install'], function () {
    gulp.start('copy');
    gulp.start('build');
});

gulp.task('default', function() {
    gulp.start('setup');
    gulp.start('watch');
});