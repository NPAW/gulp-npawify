var gulp = require('gulp')
var browserify = require('browserify')
var watchify = require('watchify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')
var through = require('through2')

var rename = require('gulp-rename')
var sourcemaps = require('gulp-sourcemaps')
var uglify = require('gulp-uglify')
var copyfiles = require('copyfiles')

var license = require('./license')
var Logger = require('./logger')
var assign = require('./assign')
var analyze = require('./analyze')

var defaults = {
  entry: 'src/index.js',
  output: 'app.min.js',
  dest: './dist/',
  standalone: undefined,
  watch: false,
  uglify: true,
  license: false
}

/** Accept multiple arguments, will join them using assign */
var npawify = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift({})

  var options = assign.apply(this, args)

  var bundler = browserify({
    entries: [options.entry],
    standalone: options.standalone,
    debug: true
  })

  var rebundle = function () {
    Logger.start(options.output)
    if (options.license) {
      bundler.on('bundle', function () {
        bundler.pipeline.get('wrap').push(license(options.license))
      })
    }
    var stream = bundler.bundle()

    return stream
      .on('error', Logger.error)
      .on('end', Logger.end.bind(this, options.output))
      .pipe(source(options.entry))
      .pipe(buffer())
      .pipe(rename(options.output))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(options.uglify ? uglify({ compress: false, preserveComments: 'license' }) : through.obj())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(options.dest))
  }

  if (options.watch) {
    bundler = watchify(bundler)
    bundler.on('update', rebundle)
  }

  return function () { rebundle() }
}

npawify.assign = assign
npawify.Logger = Logger
npawify.copyfiles = copyfiles
npawify.analyze = analyze

module.exports = npawify
