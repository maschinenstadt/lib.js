#!/usr/bin/env node.js

var size = 16;

	// buffer
	// radix
	// octal
	// decimal
	// dual
	// base64
	// hex
	// utf8
	// utf16le|ucs2
	// binary|latin1
	// ascii


var r0 = random.buffer(size);
var r1 = random.array(size);
var r2 = random.hex(size);
var r3 = random.base64(size);
var r4 = random.binary(size)
var r5 = random.dual(size);
var r6 = random.octal(size);
var r7 = random.decimal(size);
var r8 = random.utf8(size);
var r9 = random.ascii(size);
var r10 = random.ucs2(size);
var r11 = random.radix(size, 4);

console.info('[buffer(%d)] "%s"\n'
	+ '[array(%d)] "%s"\n'
	+ '[hex(%d)] "%s"\n'
	+ '[base64(%d)] "%s"\n'
	+ '[binary(%d)] "%s"\n'
	+ '[dual(%d)] "%s"\n'
	+ '[octal(%d)] "%s"\n'
	+ '[decimal(%d)] "%s"\n'
	+ '[utf8(%d)] "%s"\n'
	+ '[ascii(%d)] "%s"\n'
	+ '[ucs2(%d)] "%s"\n'
	+ '[4(%d)] "%s"\n',
	r0.length, r0,
	r1.length, r1,
	r2.length, r2,
	r3.length, r3,
	r4.length, r4,
	r5.length, r5,
	r6.length, r6,
	r7.length, r7,
	r8.length, r8,
	r9.length, r9,
	r10.length, r10,
	r11.length, r11
);

