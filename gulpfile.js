var gulp = require('gulp'),
    path = require('path'),
    postcss = require('gulp-postcss'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename')
    assets = require('postcss-assets');

var options = {
    basePath: 'dist',
    relative: true,
    loadPaths: ['images/']
};

gulp.task('assets', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([assets(options)]))
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