var gulp = require('gulp')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var sassglob = require('gulp-sass-glob')
var autoprefixer = require('gulp-autoprefixer')
var through = require('through2')

var Logger = require('./logger')
var assign = require('./assign')

var defaults = {
  entry: ['./src/css/*.scss'],
  dest: './dist/',
  uglify: true,
  autoprefixer: { browsers: ['last 2 versions', '> 1%'] },
  includePaths: ['node_modules']
}

/**
 * Funnels gulp-sass, gulp-sass-glob, autoprefixer and sourcemaps.
 *
 * @param {...Object} [options] Options. Will be merged using npawify.assign.
 * @returns
 */
var sassNpawify = function () {
  var args = Array.prototype.slice.call(arguments)
  args.unshift(defaults)
  args.unshift({})
  var options = assign.apply(this, args)

  return function () {
    return gulp.src(options.entry)
      .on('error', Logger.error)
      .on('end', Logger.end.bind(this, 'css files'))
      .pipe(sourcemaps.init())
      .pipe(sassglob())
      .pipe(sass({
        sourceComments: !options.uglify,
        outputStyle: options.uglify ? 'compressed' : 'nested',
        includePaths: options.includePaths
      }))
      .pipe(options.autoprefixer ? autoprefixer(options.autoprefixer) : through.obj())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(options.dest))
  }
}

module.exports = sassNpawify
