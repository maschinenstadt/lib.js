#!/usr/bin/env node.js

// check "radix.js" in this directory for my own, better conversions.
//
// this is just the javascript's integrated version from 2 to 36.
// my will work with 2 to 256 - important feature for quanta w/ neural (etc.)

var nr = Number.from('ff', 16);

console.inspect(nr);

var str = nr.to(2);

console.inspect(str);

