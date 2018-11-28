const gulp = require('gulp');
const less = require('gulp-less');
const exec = require('child_process').exec;
const uglify = require('gulp-uglify'); // to be used on src/styleguide.js
const uglifycss = require('gulp-uglifycss');

const kssGenerate = `kss --config kss-config.json`;

gulp.task('default', ['build:kss', 'build:css']);

/* Generate CSS to support UI representation of static styleguide */
// TODO rename config.css to styleguide.css or something more meaningful
gulp.task('build:css', () => {
    gulp.src('less/config.less')
    .pipe(less())
    .pipe(uglifycss())
    .pipe(gulp.dest('src'));
});

/* Generate static styleguide based on KSS style comments in less files */
// TODO use gulp-kss generate kss instead of exec()
gulp.task('build:kss', () => exec(kssGenerate));

/* Watching for less changing and automatically rebuilding */
gulp.task('watch', () => gulp.watch('less/**/*.less', ['build:css', 'build:kss']))
