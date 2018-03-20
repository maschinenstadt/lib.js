#!/usr/bin/env node.js

var obj = include('net');
var chk = not(obj);

console.inspect(obj, 1);
console.EOL(3);
console.inspect(type(obj));
console.inspect(chk);

console.EOL(6);

obj = include('netz'); // not existing..
chk = not(obj);

console.debug(0, obj.toString());
console.EOL(3);
console.inspect(type(obj));
console.inspect(chk);

console.EOL(3);

