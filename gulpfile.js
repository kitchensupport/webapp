/* eslint strict: [0, "global"] */
// strict mode has to be enabled for block scoping
// eslint thinks this is a module, which already has block scoping enabled by default,
// and will error out by default on 'use strict' calls
'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const sasslint = require('gulp-sass-lint');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('lint:js', () => {
    return gulp.src(['src/js/**/*.js', 'server.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:sass', () => {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sasslint())
        .pipe(sasslint.format())
        .pipe(sasslint.failOnError());
});

gulp.task('build', ['build:js', 'build:sass']);

gulp.task('build:js', ['lint:js'], () => {
    return browserify('src/js/app.js', {debug: true})
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build:sass', ['lint:sass'], () => {
    return gulp.src('src/sass/app.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minify())
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', ['build'], () => {
    gulp.watch('src/js/**/*.js', ['build:js']);
    gulp.watch('src/sass/**/*.scss', ['build:sass']);
});
