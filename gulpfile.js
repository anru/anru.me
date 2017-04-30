const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
const gif = require('gulp-if');
const rimraf = require('rimraf');

const notDev = process.env.HUGO_ENV != 'DEV';

function defineTask(name, src, fn) {
  gulp.task(name, () => {
    return fn(gulp.src(src));
  });

  gulp.task(`${name}.watch`, () => {
    gulp.watch(src, [name]);
  });
}

gulp.task('default', ['js', 'css', 'assets']);
gulp.task('js', ['js.photoswipe']);
gulp.task('css', ['css.photoswipe', 'css.site']);
gulp.task('assets', ['assets.photoswipe']);

gulp.task('clean', () => {
  rimraf.sync('static/photoswipe');
  rimraf.sync('static/css/app.css');
});

const photoswipeJs = [
  'src/photoswipe/photoswipe.js',
  'src/photoswipe/photoswipe-ui-default.js',
  'src/photoswipe/init.js'
];

defineTask('js.photoswipe', photoswipeJs, (stream) => {
  return stream
    .pipe(concat('bundle.js'))
    .pipe(gif(notDev, uglify()))
    .pipe(gulp.dest('static/photoswipe'));
});

defineTask('css.photoswipe', 'src/photoswipe/**/*.css', (stream) => {
  return stream
    .pipe(gif(notDev, cssnano({
      safe: true,
    })))
    .pipe(gulp.dest('static/photoswipe'));
});

defineTask('assets.photoswipe', 'src/photoswipe/**/*.{png,svg,jpg,gif}', stream => {
  return stream
    .pipe(gulp.dest('static/photoswipe'));
})

defineTask('css.site', 'src/css/**/*.css', (stream) => {
  return stream
    .pipe(concat('app.css'))
    .pipe(gif(notDev, cssnano()))
    .pipe(gulp.dest('static/css'));
});

const watchTasks = Object.keys(gulp.tasks).reduce((acc, name) => {
  const task = gulp.tasks[name];
  if (name.endsWith('.watch')) {
    acc.push(name);
  }
  return acc;
}, []);


gulp.task('watch', watchTasks);
