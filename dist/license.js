var pkg = require('../package.json')
var through = require('through2')
var offsetLines = require('offset-sourcemap-lines')
var convert = require('convert-source-map')

var newlinesIn = function (src) {
  if (!src) return 0
  var newlines = src.match(/\n/g)
  return newlines ? newlines.length : 0
}

var createStream = function (license) {
  var firstChunk = true
  var stream = through.obj(function (buf, enc, next) {
    if (firstChunk) {
      /*  insert the header comment as the first chunk  */
      this.push(new Buffer(license))
      firstChunk = false
    }
    var conv = convert.fromSource(buf.toString('utf8'))
    if (conv) {
      var offsetMap = offsetLines(conv.toObject(), newlinesIn(license))
      this.push(new Buffer('\n' + convert.fromObject(offsetMap).toComment() + '\n'))
    } else {
      this.push(buf)
    }
    next()
  })
  stream.label = 'header'
  return stream
}

module.exports = createStream
