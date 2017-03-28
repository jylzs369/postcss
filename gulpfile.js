var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    stylelint = require('stylelint'),
    reporter = require('postcss-reporter'),
    cssvariables = require('postcss-css-variables')
    cssmixins = require('postcss-mixins'),
    calc = require('postcss-calc')
    eachloop = require('postcss-each'),
    nesting = require('postcss-nesting');

gulp.task('styles', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([autoprefixer, nesting, cssvariables, cssmixins, calc, eachloop]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task('rename', ['styles'], function () {
    return gulp.src('dist/index.css')
        .pipe(rename('index.min.css'))
        .pipe(postcss([cssnano]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task('lint-styles', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([stylelint({
            'rules': {
                'color-no-invalid-hex': true
            }
        }),
        reporter({
            clearMessages: true
        })
    ]))
});

gulp.task('default', ['lint-styles', 'styles', 'rename']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function (event) {
    console.log('File' + event.path + ' was ' + event.type + ',running tasks...');
});