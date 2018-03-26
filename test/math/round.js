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


var nr = 1.23456;
//var nr = 1.456;


var res1 = nr.round(5);//Math.round(nr, 5);
var res2 = nr.round(4);//Math.round(nr, 4);
var res3 = Math.round(nr, 3);
var res4 = Math.round(nr, 2);
var res5 = nr.round(1);//Math.round(nr, 1);
var res6 = nr.round();//Math.round(nr);


console.inspect(nr);
console.EOL(2);
console.inspect(res1);
console.inspect(res2);
console.inspect(res3);
console.inspect(res4);
console.inspect(res5);
console.inspect(res6);

