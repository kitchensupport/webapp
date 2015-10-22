/* eslint strict: [0, "global"] */
// strict mode has to be enabled for block scoping
// eslint thinks this is a module, which already has block scoping enabled by default,
// and will error out by default on 'use strict' calls
'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify-css');
const rename = require('gulp-rename');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const protractor = require('gulp-protractor').protractor;
const forever = require('forever-monitor');

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('lint:js', () => {
    return gulp.src(['src/js/**/*.js', 'server.js', 'gulpfile.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint:tests', () => {
    return gulp.src(['tests/**/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('build', ['build:js', 'build:sass', 'build:html']);

gulp.task('test', ['build', 'build:tests'], () => {
    const child = new (forever.Monitor)('index.js');

    child.start();
    return gulp.src(['./tests/**/.js'])
        .pipe(protractor({
            configFile: './tests/conf.js',
            args: ['--baseUrl', 'http://127.0.0.1:8001']
        }))
        .on('error', (error) => {
            throw error;
        })
        .on('end', () => {
            child.stop();
        });
});

gulp.task('build:html', () => {
    return gulp.src('src/templates/**/*')
        .pipe(gulp.dest('dist/templates'));
});

gulp.task('build:js', ['lint:js'], () => {
    return browserify('src/js/app.js', {debug: true})
        .bundle()
        .pipe(source('app.min.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('build:tests', ['lint:tests', 'build:tests-conf'], () => {
    return browserify('tests/main.js', {debug: true})
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(gulp.dest('dist/tests/'));
});

gulp.task('build:tests-conf', () => {
    return gulp.src('tests/conf.js')
        .pipe(gulp.dest('dist/tests/'));
});

gulp.task('build:sass', [], () => {
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
    gulp.watch('src/templates/**/*.html', ['build:html']);
    gulp.watch('tests/**/*.js', ['build:tests']);
});
