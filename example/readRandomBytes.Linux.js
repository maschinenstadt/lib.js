#!/usr/bin/env node.js

var p = '/dev/urandom';
var s = 4096;

//var hex = file.readBytes(p, s, 'hex');
//var hex = file.readBytes.hex(p, s);
//var hex = file.random(s, 'hex');
//var hex = file.random.hex(s);

//var base64 = file.readBytes.base64(p, s);
//var base64 = file.random.base64(s);

//var octal = file.readBytes(p, s, 'octal');
//var octal = file.random(s, 'octal');

//var radix = file.random.radix(s, 4);

//var binary = file.random(s, 'binary'); // bad idea - in the console.. xD´

//var utf8 = file.random.utf8(s);
//var utf8 = file.readBytes(p, s, 'utf8');



var decimal = file.readBytes.decimal(p, s);

console.inspect(decimal.length);
console.inspect(decimal);
console.EOL(2);

var dual = file.random.dual(s);

console.inspect(dual.length);
console.inspect(dual);
console.EOL(2);

var buffer = file.random(s);
//var buffer = file.readBytes(p, s);

console.inspect(buffer.length);
for(var i = 0; i < /*buffer.length*/16; i++)
{
	console.log('[%d] (%d)', i, buffer[i]);
}
console.EOL(2);

