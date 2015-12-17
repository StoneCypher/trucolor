'use strict';

/*
	trucolor (v0.0.18-alpha.47)
	24bit color tools for the command line

	Copyright (c) 2015 CryptoComposite

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use, copy,
	modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var _, _core, console, supportsColor;

_ = require('underscore');

supportsColor = require('supports-color');

global.colorSupport = _.clone(supportsColor);

if ((process.env.TERM_COLOR === '24 bit') || process.env.fish_term24bit) {
  colorSupport.has16m = true;
  colorSupport.level = 3;
}

global._iTerm = process.env.ITERM_SESSION_ID && (process.env.TERM_PROGRAM === 'iTerm.app');

console = global.vconsole != null ? global.vconsole : global.vconsole = require('@thebespokepixel/verbosity').console({
  out: process.stderr
});

_core = require('./lib/core');

exports.SGRout = function() {
  _core.setMode('SGR');
  return _core;
};

exports.RGBout = function() {
  _core.setMode('RGB');
  return _core;
};

exports.HEXout = function() {
  _core.setMode('HEX');
  return _core;
};

exports.simplePalette = require('./lib/simple');
