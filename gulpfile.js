const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function compileSass() {
  return src('./src/sass/*.{sass,scss}').pipe(sass().on('error', sass.logError)).pipe(dest('./src/dist'));
}

function watchSass() {
  watch('./src/sass/*.{sass,scss}', compileSass);
}

exports.default = series(compileSass, watchSass);
