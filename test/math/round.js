#!/usr/bin/env node.js

/* *own* "Math.round(_number, _precision)"

        .. as "round(1.456)" (etc.) show (1), not (2) ..etc!
 
                ... sprich, wir müssen das erledigen, was bislang fehlt:
                        von hinten rückwärts nach vorne hin *alle* (> 5)
                        mit anwenden ...

                .. regulär scheinen also weitere ziffern zu übersehen ..

                        PS: kann auch schrittweise jeden ziffern-schritt mehr "round()";
                                but that's not that efficient (as direct symbol comparison), eh!??


*/

// first implement own "round(_decimals)" in "global/Math.js", then test it here.
//
// and first you could try out the original round(), here as "_round" .. problem:
// not rounding sufficient .. not correct result sometimes. AND THIS 'precision*'
// makes mistakes, too? RIGHT??
//
//	1.2346
//	1.235	// shouldn't (5) cause (3++)?!? so ==> (1.24)!?
//	1.23
//	1.2
//	1
//
//	1.456
//	1.46
//	1.5	// shouldn't (5) cause (1++), so ==> (2), not (1)?!?
//	1

// see also "Beschreibung" @ < https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Math/round >



var nr = 1.456;

var r0 = nr.round(3); // == Math.round(nr, 3);
var r1 = nr.round(2); // .. etc. ...
var r2 = nr.round(1); // ;-)´
var r3 = nr.round();

console.inspect(nr);

console.EOL();

console.inspect(r0);
console.inspect(r1);
console.inspect(r2);
console.inspect(r3);

