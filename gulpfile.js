var gulp = require('gulp'),
    path = require('path'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    fontpath = require('postcss-fontpath'),
    sprites = require('postcss-sprites'),
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
        .pipe(postcss([assets(options.assets), fontpath, sprites(options.sprites)]))
        .pipe(gulp.dest('dist'));
})
gulp.task('rename', function () {
    return gulp.src('dist/index.css')
        .pipe(postcss([cssnano]))
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['assets', 'rename']);

gulp.watch('src/*.css', ['assets']);
gulp.watch('dist/*.css', ['rename']);