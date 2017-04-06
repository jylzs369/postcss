var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    assets = require('postcss-assets');

var options = {
    loadPaths: ['images/']
};

gulp.task('assets', function () {
    return gulp.src('src/*.css')
        .pipe(postcss([assets(options)]))
        .pipe(gulp.dest('dist'));
})

gulp.task('default', ['assets']);
