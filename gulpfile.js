var gulp = require('gulp'),
    path = require('path'),
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    evilIcons = require('gulp-evil-icons'),
    fontpath = require('postcss-fontpath'),
    sprites = require('postcss-sprites'),
    postcssSVG = require('postcss-svg'),
    assets = require('postcss-assets');

var basePath = 'dist/';

var options = {
    assets: {
        basePath: basePath,
        relative: true,
        loadPaths: ['images/']
    },
    sprites: {
        basePath: basePath,
        stylesheetPath: basePath,
        spritePath: basePath + 'images/'
    }
};

gulp.task('assets', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([assets(options.assets), fontpath, sprites(options.sprites), postcssSVG()]))
        .pipe(gulp.dest('dist'));
})
gulp.task('rename', function () {
    return gulp.src('dist/index.css')
        .pipe(postcss([cssnano]))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist'));
})

gulp.tast('icons', function () {
    return gulp.src('index.html')
        .pipe(evilIcons())
        .pipe(rename('index1.html'))
        .pipe(gulp.dest('/'));
})

gulp.task('default', ['icons', 'assets', 'rename']);

gulp.watch('*.index', ['icons']);
gulp.watch('src/*.css', ['assets']);
gulp.watch('dist/*.css', ['rename']);