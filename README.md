# gulp-npawify
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

Gulp builder that packs browserify with sourcemaps, uglify and license

## Install
```
npm install --save-dev gulp-npawify
```

## Use
```javascript
var gulp = require('gulp')
var npawify = require('gulp-npawify')

var options = {
  entry: 'src/youboralib.js',
  output: 'youboralib.min.js'
}

gulp.task('build', npawify(options))
gulp.task('watch', npawify(npawify.assign({}, options, { watch: true }))
gulp.task('default', ['build'])
```

## Options
npawify receives an options object, that can receive:

* `entry`: Name of the entry file. **Default:** 'src/index.js'.
* `output`: Name of the output file. **Default:** 'app.min.js'.
* `dest`: Name of the output folder. **Default:** 'dist/'.
* `standalone`: Browserify standalone option. **Default:** undefined.
* `watch`: If true, generated task will use watchify. **Default:** false.
* `uglify`: If true, generated task file will be uglified. **Default:** true.
* `license`: String containing license text. **Default:** undefined.

## npawify.assign
npawify comes with `npawify.assign()` which is a clone of
[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
function for its use with older Node versions
