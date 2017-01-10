module.exports = function (p) {
  var file = fs.readFileSync(p)
  var allgetters = ['getPlayhead', 'getPlayrate', 'getFramesPerSecond', 'getDroppedFrames',
    'getDuration', 'getBitrate', 'getThroughput', 'getRendition', 'getTitle', 'getTitle2',
    'getIsLive', 'getResource', 'getPosition']

  var getters = []
  for (var i = 0; i < allgetters.length; i++) {
    var element = allgetters[i]
    if (file.indexOf(element) !== -1) {
      getters.push(element)
    }
  }

  var name = pkg.name
  if (name.indexOf('youbora-adapter-') === 0) name = name.slice(16)

  return {
    name: name,
    type: 'adapter',
    tech: 'js',
    author: pkg.author,
    version: pkg.version,
    libVersion: lib.VERSION,
    built: new Date().toDateString(),
    features: {
      buffer: file.indexOf('fireBufferBegin') !== -1 ? 'native' : 'monitor',
      seek: file.indexOf('fireSeekBegin') !== -1 ? 'native' : 'monitor',
      getters: getters
    }
  }
}
