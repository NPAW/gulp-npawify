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

gulp.task('build', npawify({
  entry: 'src/youboralib.js',
  output: 'youboralib.min.js'
}))

gulp.task('watch', npawify({
  entry: 'src/youboralib.js',
  output: 'youboralib.min.js',
  watch: true
}))

gulp.task('default', ['watch'])
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


