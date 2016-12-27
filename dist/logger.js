var gutil = require('gulp-util')
var prettyHrtime = require('pretty-hrtime')

var startTime

var Logger = {

  start: function (file) {
    startTime = process.hrtime()
    gutil.log('Starting bundling of \'' + gutil.colors.cyan(file) + '\'.')
  },

  end: function (file) {
    const taskTime = process.hrtime(startTime)
    const prettyTime = prettyHrtime(taskTime)
    gutil.log('Finished bundling of \'' + gutil.colors.green(file) + '\' in ' +
      gutil.colors.magenta(prettyTime))
  },

  error: function (error) {
    gutil.log(gutil.colors.red(error))
    this.emit('end')
  }
}

module.exports = Logger
