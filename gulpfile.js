const gulp = require('gulp');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('default', function (cb) {
  const src = ['levels', 'constants', 'utilities', 'entity', 'bird', 'hero', 'spawner', 'main'].map(x => `dodge-birds/${x}.js`)
  gulp.src(src)
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dodge-birds/dist'))
});
