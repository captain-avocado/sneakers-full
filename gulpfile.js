'use strict';
const path = require('path');

const gulp = require('gulp');
const $gp = require('gulp-load-plugins')();

const browserSync = require('browser-sync').create();

const del = require('del');

const webpack = require('webpack');
const webpackConfig = require('./webpack.config');


const paths = {
    src: path.join(__dirname, 'src/'),
    dest: path.join(__dirname, 'dest/')
};

function clean() {
    return del(paths.dest);
}

const reportError = function(error) {
    const LINE = (error.line) ? 'LINE ' + (error.line) : '';
  
    $gp.notify.onError({
        title: `[${error.plugin}] ${LINE}`,
        message: error.message,
        sound: 'Beep'
    })(error);
    this.emit('end');
};

function styles() {
    return gulp.src(paths.src + 'styles/main.scss')
    .pipe($gp.plumber({
        errorHandler: reportError
    }))
    .pipe($gp.sourcemaps.init())
    .pipe($gp.sassGlob())
    .pipe($gp.sass())
    .pipe($gp.autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
    }))
    .pipe($gp.groupCssMediaQueries())
    .pipe($gp.cleancss())
    .pipe($gp.rename({  suffix: '.min'  }))
    .pipe($gp.sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dest + 'styles/'))
    .pipe(browserSync.stream());
}

function templates() {
    return gulp.src(paths.src + 'templates/**/*.pug')
    .pipe($gp.plumber({
        errorHandler: reportError
    }))
    .pipe($gp.pug({ pretty: true }))
    .pipe(gulp.dest(paths.dest));
}

function scripts() {
    return gulp.src(paths.src + 'scripts/**/*.js')
    .pipe($gp.plumber({
        errorHandler: reportError
    }))
    .pipe($gp.webpack(webpackConfig, webpack))
    
    // .pipe($gp.sourcemaps.init())
    // .pipe($gp.babel({ presets: ['env'] }))
    // .pipe($gp.uglify())
    // .pipe($gp.concat('scripts.min.js'))
    // .pipe($gp.sourcemaps.write('/'))
    .pipe(gulp.dest(paths.dest + 'scripts/'));
}

function images() {
    return gulp.src(paths.src + 'images/**/*.*')
    .pipe($gp.imagemin({ progressive: true }))
    .pipe(gulp.dest(paths.dest + 'images/'));
}

function fonts() {
    return gulp.src(paths.src + 'fonts/**').pipe(gulp.dest(paths.dest + 'fonts/'));
}

function watch() {
    gulp.watch(paths.src + 'styles/**/*.scss', styles);
    gulp.watch(paths.src + 'scripts/**/*.js', scripts);
    gulp.watch(paths.src + 'templates/**/*.pug', templates);
    gulp.watch(paths.src + 'images/**/*.*', images);
    gulp.watch(paths.src + 'fonts/**/*.*', fonts);
}

function serve() {
    browserSync.init({
        server: {
            baseDir: paths.dest
        }
    });
    browserSync.watch(paths.dest + '**/*.*', browserSync.reload);
}

gulp.task('clean', clean);
gulp.task('styles', styles);
gulp.task('templates', templates);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('fonts', fonts);
gulp.task('watch', watch);
gulp.task('serve', serve);
//чекнуть соурсмапы
gulp.task('default', gulp.series(
    clean,
    gulp.parallel(styles, templates, images, scripts, fonts),
    gulp.parallel(watch, serve)
));