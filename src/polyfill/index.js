/* eslint-disable */

// console (IE9)
require('./console');

// ES5
require('es5-shim/es5-shim');
require('es5-shim/es5-sham');

// Babel polyfill
require('@babel/polyfill');

// web.js includes the most common Web polyfills - it assumes ES2015 support
// * Includes: html.js dom.js xhr.js cssom.js timing.js url.js fetch.js
require('imports-loader?self=>window!js-polyfills/html');
require('./nodes');
//require('imports-loader?self=>window!js-polyfills/dom');

// Placeholder polyfill
require('./placeholders');
