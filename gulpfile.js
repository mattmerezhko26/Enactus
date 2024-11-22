const { watch, series } = require('gulp');
const sass = require('sass');
const fs = require('fs');
const path = require('path');

function compileSass(done) {
  const sassDirectory = './src/sass';
  const files = fs.readdirSync(sassDirectory);
  const sassFiles = files.filter((file) => /(\.sass|\.scss)$/.test(file) && !/^_/.test(file));

  sassFiles.forEach((file) => {
    const filePath = path.join(sassDirectory, file);
    try {
      const result = sass.compile(filePath, { style: 'compressed' });
      const outputPath = path.join('./src/dist', file.replace(/\.(sass|scss)$/, '.css'));

      fs.writeFileSync(outputPath, result.css);
    } catch (err) {
      console.error('Error compiling Sass file:', file, err);
    }
  });

  done();
}

function watchSass() {
  watch('./src/sass/*.{sass,scss}', compileSass);
}

exports.default = series(compileSass, watchSass);
