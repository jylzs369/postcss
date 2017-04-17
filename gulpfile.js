var gulp = require('gulp'),
    path = require('path'),
    sass = require('gulp-sass'),
    neat = require('node-neat').includePaths,
    cssnano = require('cssnano'),
    postcss = require('gulp-postcss'),
    rename = require('gulp-rename'),
    evilIcons = require('gulp-evil-icons'),
    fontpath = require('postcss-fontpath'),
    sprites = require('postcss-sprites'),
    postcssSVG = require('postcss-svg'),
    assets = require('postcss-assets');

var paths = {
    sass: 'src/*.scss'
}

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

gulp.task('assets', ['icons'], function () {
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

gulp.task('icons', function () {
    return gulp.src('src/index.html')
        .pipe(evilIcons())
        .pipe(gulp.dest('dist/'));
})

gulp.task('styles', function () {
    return gulp.src(paths.sass)
        .pipe(sass({
            includePaths: require('node-neat').includePaths
        }))
        .pipe(gulp.dest('dist/'));
})

gulp.task('default', ['styles']);

// gulp.watch('src/*.html', ['icons']);
// gulp.watch('src/*.css', ['assets']);
// gulp.watch('dist/*.css', ['rename']);