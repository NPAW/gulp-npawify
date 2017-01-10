/**
 * This npawify function analyzes an adapter and returns an object containing its findings.
 *
 * @param {String} file Contents of the file.
 * @param {Object} [pkg] An object representing the package. ie: require('package.json')
 * @returns {Object}
 */
module.exports = function (file, pkg) {
  pkg = pkg || {}
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
  if (name && name.indexOf('youbora-adapter-') === 0) name = name.slice(16)

  return {
    name: name,
    type: 'adapter',
    tech: 'js',
    author: pkg.author,
    version: pkg.version,
    built: new Date().toDateString(),
    features: {
      buffer: file.indexOf('fireBufferBegin') !== -1 ? 'native' : 'monitor',
      seek: file.indexOf('fireSeekBegin') !== -1 ? 'native' : 'monitor',
      getters: getters
    }
  }
}
