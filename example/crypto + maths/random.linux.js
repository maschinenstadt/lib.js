#!/usr/bin/env node.js

var random = include('util/random');

var randomBINARY = random.binary();
var randomHEX = random.hex();
var randomBASE64 = random.base64();

console.debug(0, '[BINARY] (%d)\n%s\n\n[HEX] (%d)\n%s\n\n[BASE64] (%d)\n%s\n\n',
	randomBINARY.length, randomBINARY, randomHEX.length, randomHEX, randomBASE64.length, randomBASE64);

