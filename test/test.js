#!/usr/bin/env node.js
//

var random = include('util/random');

var hex = random.hex(16);
var b64 = random.base64(16);

console.info('[hex(%d)] "%s"\n[base64(%d)] "%s"', hex.length, hex, b64.length, b64);

