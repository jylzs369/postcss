var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('cssnano'),
    rename = require('gulp-rename'),
    stylelint = require('stylelint'),
    reporter = require('postcss-reporter')
    cssvariables = require('postcss-css-variables');

gulp.task('styles', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([autoprefixer, cssnano, cssvariables()]))
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('dist'));
});

gulp.task('rename', ['styles'], function () {
    return gulp.src('dist/index.css')
        .pipe(rename('index.min.css'))
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

gulp.task('default', ['styles', 'rename', 'lint-styles']);

var watcher = gulp.watch('src/*.css', ['default']);
watcher.on('change', function (event) {
    console.log('File' + event.path + 'was' + event.type + ',running tasks...');
});