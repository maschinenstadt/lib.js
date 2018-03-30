#!/usr/bin/env node.js
//
var hex = random.hex(16);
var b64 = random.base64(16);
var bin = random.binary(16)
var bit = random.dual(16);
var dec = random.decimal(16);
var tre = random.radix(16, 3);

console.info('[hex(%d)] "%s"\n[base64(%d)] "%s"\n[binary(%d)] "%s"\n[dual(%d)] "%s"\n[decimal(%d)] "%s"\n[3(%d)] "%s"\n',
	hex.length, hex, b64.length, b64, bin.length, bin, bit.length, bit, dec.length, dec, tre.length, tre);

