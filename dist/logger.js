var gutil = require('gulp-util')
var prettyHrtime = require('pretty-hrtime')

var startTime

var Logger = {

  start: function (file) {
    startTime = process.hrtime()
    gutil.log('Starting ' + gutil.colors.green('Bundling', file) + '...')
  },

  end: function (file) {
    const taskTime = process.hrtime(startTime)
    const prettyTime = prettyHrtime(taskTime)
    gutil.log('Finished ' + gutil.colors.yellow('bundling of', file) + ' in ' +
      gutil.colors.magenta(prettyTime))
  },

  error: function (error) {
    gutil.log(gutil.colors.red(error))
    this.emit('end')
  }
}

module.exports = Logger
