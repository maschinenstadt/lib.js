#!/usr/bin/env node.js

// this is for testing the return values of functions, e.g.
// a replacement for "if(! result)" .. but with own rules..

var arr = [
	0,
	false,
	new TypeError(),
	'',
	[],
	null,
	undefined
];

console.info('\n(0)\t\t%s\n\n(false)\t\t%s\n(new *Error())\t%s\n(\'\')\t\t%s\n([])\t\t%s\n(null)\t\t%s\n(undefined)\t%s\n',
	not(0), not(false), not(new TypeError()), not(''), not([]), not(null), not(undefined));





/*


.. PROBLEM: wenn ich error zurück gebe, ist "error === true" .. "undefined/null" sind === false! besser zu prüfen also..
.. UND: eigentlich ist (0) ja false .. aber (0) als int-wert ist o.k. und gewünscht?! hm!

	=> lösung (evtl.): global.not(); .. [wenigstens etwas..] funktioniert scheinbar auch.. siehe "node.js" (global.not)

		=> SOLVED! ;-D´

====>   =>		.. not() is true, even if empty string or empty array .. and not() is NOT true == false if (0)!
===>  ==>		... not() is true on "Error" .. and - of course - on "null" or "undefined" .. AND if === false. ;-D´

*/

