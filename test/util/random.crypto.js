#!/usr/bin/env node.js

var length = 1024;

var buffer = new Buffer(length);

nodejs('crypto').randomFillSync(buffer, 0, length);

console.inspect(type(buffer));
console.inspect(buffer.length);

var binary = buffer.toString('binary');
var hex = buffer.toString('hex');
var base64 = buffer.toString('base64');

console.info('[binary(%d)]\n%s\n\n[hex(%d)]\n%s\n\n[base64(%d)]\n%s\n\n',
	binary.length, binary, hex.length, hex, base64.length, base64);

