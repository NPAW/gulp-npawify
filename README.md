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
gulp.task('watch', npawify(options, { watch: true })
gulp.task('default', ['build'])
```

Note: npawify supports multiple arguments, that will be merged using [assign](#npawifyassign). ie: `npawify(options, { watch: true })`.

## Options
npawify receives an options object, that can receive:

* `entry`: Name of the entry file. **Default:** 'src/index.js'.
* `output`: Name of the output file. **Default:** 'app.min.js'.
* `dest`: Name of the output folder. **Default:** 'dist/'.
* `standalone`: Browserify standalone option. **Default:** undefined.
* `watch`: If true, generated task will use watchify. **Default:** false.
* `uglify`: If true, generated task file will be uglified. **Default:** true.
* `postPipe`: If a function is suplied, browserify will pipe into that. ie: `postPype: browserSync.stream`. **Default:** false.
* `license`: String containing license text. **Default:** undefined.
* `transforms`: Collection of transforms to apply. ie: `[{ name: 'hbsfy', options: {} }]` **Default:** '[]'.

## npawify.sass
Similar to what it does with browserify, npawify includes a pipeline for sass, sass-glob and autoprefixer.

```js
gulp.task('build', npawify.sass({ entry: '*.scss' }))
```

* `entry`: Array of the entry files, supports globs. **Default:** ['src/css/*.scss'].
* `dest`: Name of the output folder. **Default:** 'dist/'.
* `uglify`: If true, generated task file will be compressed, nested otherwise. **Default:** true.
* `license`: String containing license text. **Default:** undefined.
* `includePaths`: Include paths.  **Default:**  `['node_modules']`.
* `autoprefixer`: Autoprefixer options.  **Default:**  `{ browsers: ['last 2 versions', '> 1%'] }`.

## npawify.assign
npawify comes with `npawify.assign()` which is a replica of
[`Object.assign`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
 for its use with older Node versions.

## npawify.analyze
This npawify function analyzes an adapter and returns an object containing its findings.

## npawify.copyfiles
Exposes [`copyfiles`](https://www.npmjs.com/package/copyfiles) package.
