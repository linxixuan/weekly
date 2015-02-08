var gulp = require('gulp'),
    watch = require('gulp-watch'),
    stylus = require('gulp-stylus');

gulp.task('css', function () {
    gulp.src('./public/stylus/base.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./public/css'));
});
    
gulp.task('default', function () {
    watch('./public/stylus/base.styl', function () {
        gulp.start('css');
    });
});
