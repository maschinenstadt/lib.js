#!/usr/bin/env node.js

/*
 * erstmal 'readlink()'(S!), dann file.copy, file.remove, .. etc. ...
 *
 */


///*

var p = 'symlinks.js';

var r1 = file.readlink.list(p);
var r2 = file.readlink.list.resolve(p); // same as list(.., true);

var r3 = file.readlink.all(p);
var r4 = file.readlink.all(p, true); // w/ '.resolve'

console.inspect(p);
console.EOL(2);
console.inspect(r1, 0);
console.inspect(r2, 0);
console.EOL();
console.inspect(r3, 0);
console.inspect(r4, 0);


//*/


/*
 * multiple paths..
 *
var p = [ 'symlinks.js', './symlinks.js' ];

var r1 = file.readlink.list(p);
var r2 = file.readlink.list.resolve(p);

console.inspect(r1, 0);
console.inspect(r2, 0);
*/

