var main = global.random = module.exports = include('util/random');

/*
 * this is mandatory (and good) for ...
//
// 	(a) "Math.random()" (own, more secure version (searching for comments)
//
// 	(b) all cases we need *better* random data or numbers. .. "global" is a good idea! eh?
//
// 	(c) etc.. pp... ^_^
*/

// best:
//Math.random = main.random;

