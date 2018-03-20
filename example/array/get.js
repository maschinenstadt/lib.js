#!/usr/bin/env node.js

// basic array examples. .. (it's just the beginning of more, more. ..);
//

var arr = [ "one", "two", "three", "four", "five", "six", "seven" ];

var res1 = arr.get();
var res2 = arr.get(2);
var res3 = arr.get(3, 3);
var res4 = arr.get(-2);
var res5 = arr.get(-4, 2);
var res6 = arr.get(-4, -2);
var res7 = arr.get(-3, -9);
var res8 = arr.get(0, 16);

console.EOL();
console.inspect(arr);
console.EOL(2);
console.debug(0, 'arr.get()\t\t%O\n\narr.get(2)\t\t%O\n\narr.get(3,3)\t\t%O\n\n'
	+ 'arr.get(-2)\t\t%O\n\narr.get(-4,2)\t\t%O\n\narr.get(-4,-2)\t\t%O\n\n'
	+ 'arr.get(-3,-9)\t\t%O\n\narr.get(0,16)\t\t%O\n\n',
		res1, res2, res3, res4, res5, res6, res7, res8);

