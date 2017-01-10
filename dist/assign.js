/**
 * he assign() method is used to copy the values of all enumerable own properties from one or more
 * source objects to a target object. It will return the target object.
 *
 * @param {Object} target
 * @param {...Object} sources
 * @returns {Object} The target object.
 */
module.exports = function (target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}
