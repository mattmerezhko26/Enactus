const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compileSass() {
  return src('./src/sass/*.sass')
    .pipe(sass())
    .pipe(dest('./src/dist'));
}

function watchSass() {
  watch('./src/sass/*.sass', compileSass);
}

exports.default = series(compileSass, watchSass);