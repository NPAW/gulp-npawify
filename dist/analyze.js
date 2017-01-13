/**
 * This npawify function analyzes an adapter and returns an object containing its findings.
 *
 * @param {String} file Contents of the file.
 * @returns {Object}
 */
module.exports = function (file) {
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

  return {
    buffer: file.indexOf('fireBufferBegin') !== -1 ? 'native' : 'monitor',
    seek: file.indexOf('fireSeekBegin') !== -1 ? 'native' : 'monitor',
    getters: getters
  }
}
