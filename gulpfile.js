const gulp = require('gulp');
const less = require('gulp-less');
const exec = require('child_process').exec;
const kssGenerate = `kss --config kss-config.json`;

gulp.task('default', ['build:kss', 'build:css']);

/* Generate CSS files to support UI representation of static styleguide */ 
gulp.task('build:css', () => {
    gulp.src('less/config.less')
    .pipe(less())
    .pipe(gulp.dest('src'));

    // TODO rename config.css to styleguide.css
    // or something more meaningful
});

/* Generate static styleguide based on KSS style comments in less files */
gulp.task('build:kss', function (v) {
    exec(kssGenerate, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      v(err);
    });

    // TODO use gulp-kss generate kss instead of exec()
  })
