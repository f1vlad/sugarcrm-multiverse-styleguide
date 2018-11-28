const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('default', ['build:ui:css']);

/* Build styleguide UI css */ 
gulp.task('build:ui:css', () => {
    gulp.src('less/config.less')
    .pipe(less())
    .pipe(gulp.dest('src'));

    // TODO rename config.css to styleguide.css
    // or something more meaningful
});

gulp.task('kss', () => {
    // TODO generate kss with gulp task
});
