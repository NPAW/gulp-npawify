var gulp = require('gulp')
var browserify = require('browserify')
var watchify = require('watchify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var through = require('through2')

var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')

var license = require('./license')
var Logger = require('./logger')

var defaults = {
  entry: 'src/index.js',
  output: 'app.min.js',
  dest: './dist/',
  standalone: undefined,
  watch: false,
  uglify: true,
  license: false
}

var npawify = function (options) {
  options = Object.assign({}, defaults, options)

  var bundler = browserify({
    entries: [options.entry],
    standalone: options.standalone,
    debug: true
  })

  var rebundle = function () {
    Logger.start(options.entry)
    if (options.license) {
      bundler.on('bundle', function () {
        bundler.pipeline.get('wrap').push(license(options.license))
      })
    }
    var stream = bundler.bundle()

    return stream
      .on('error', Logger.error)
      .on('end', Logger.end.bind(this, options.entry))
      .pipe(source(options.entry))
      .pipe(buffer())
      .pipe(rename(options.output))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(options.uglify ? uglify({ compress: false, preserveComments: 'license' }) : throught.obj())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(options.dest))
  }

  if (options.watch) {
    bundler = watchify(bundler)
    bundler.on('update', rebundle)
  }

  return function () { rebundle() }
}

module.exports = npawify
