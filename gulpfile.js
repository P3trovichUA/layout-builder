'use strict';
const gulp            = require('gulp');
const ReactDOMServer  = require('react-dom/server');
const React           = require('react');
const babel           = require('gulp-babel');
const File            = require('vinyl');
const beautify        = require('gulp-html-beautify');
const through2        = require('through2').obj;
const remember        = require('gulp-remember');
const path            = require('path');
const less            = require('gulp-less');
const sourceMaps      = require('gulp-sourcemaps');
const LessAutoPrefix  = require('less-plugin-autoprefix');
const csso            = require('gulp-csso');
const concat          = require('gulp-concat');
const server          = require('browser-sync').create();

const reload = done => {
  server.reload();
  done();
};

const paths = {
  styles: {
    src: './src/**/*.less',
    libraries: [
      './node_modules/normalize.css/normalize.css',
      './node_modules/font-awesome/css/font-awesome.css',
      './node_modules/bootstrap/dist/css/bootstrap.min.css',
    ],
    dest: './public',
  },
  fonts: {
    src: './node_modules/font-awesome/fonts/*.*',
    dest: 'public/fonts',
  },
  html: {
    src: './src/pages',
    transpiledComponents: './temp/pages',
    dest: './public',
  },
};

gulp.task('prepare-templates', () => {
  return gulp.src(`${paths.html.src}/**/*.js`, {since: gulp.lastRun('prepare-templates')})
    .pipe(babel().on('error', (error) => {
      console.error(error.name, error.message);
      done();
    }))
    .pipe(gulp.dest(paths.html.transpiledComponents));
});

gulp.task('generate-html', () => {
  return gulp.src(`${paths.html.transpiledComponents}/*.js`)
    .pipe(through2((file, enc, done) => {
      const Component = require(file.path).default;
      const html = new File({
        contents: new Buffer(ReactDOMServer.renderToStaticMarkup(React.createElement(Component))),
        base: process.cwd(),
        path: `${process.cwd()}/${file.stem}.html`,
      });
      Object.keys(require.cache).forEach(key => {
        if(key.indexOf(path.normalize(paths.html.transpiledComponents)) !== -1) {
          console.log(key);
          delete require.cache[key];
        }
      });
      done(null, html);
    }))
    .pipe(beautify({
      indent_size: 2,
    }))
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('copy-fonts', () => {
  return gulp.src(paths.fonts.src, {since: gulp.lastRun('copy-fonts')})
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('compile-styles', () => {
  return gulp.src([...paths.styles.libraries, paths.styles.src])
    .pipe(sourceMaps.init())
    .pipe(less())
    .pipe(concat('styles.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('generate-pages', gulp.series('prepare-templates', 'generate-html'));

gulp.task('watch-markup', () => {
  gulp.watch(`${paths.html.src}/**/*.js`, gulp.series('generate-pages', reload));
});

gulp.task('watch-styles', () => {
  gulp.watch([
    paths.styles.src,
    './src/**/*.svg',
    './src/**/*.png',
    './src/**/*.jpg'
  ], gulp.series('compile-styles', reload)).on('unlink', filepath => {
    remember.forget('styles', path.resolve(filepath));
  });
});

gulp.task('browser-sync', function() {
  server.init({
    port: 3011,
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('default', gulp.series(
  gulp.parallel('generate-pages', 'compile-styles', 'copy-fonts'),
  gulp.parallel('watch-markup', 'watch-styles', 'browser-sync'))
);
