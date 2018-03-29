#!/usr/bin/env node.js


var random = include('util/random');

var length = 64;

var randomBINARY = random.binary(length);
var randomHEX = random.hex(length);
var randomBASE64 = random.base64(length);

console.debug(0, '[BINARY] (%d)\n(bytecode)\n\n[HEX] (%d)\n%s\n\n[BASE64] (%d)\n%s\n\n',
	randomBINARY.length, randomHEX.length, randomHEX, randomBASE64.length, randomBASE64);

