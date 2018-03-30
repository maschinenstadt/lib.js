/*
 * this was "home.js" to "autorun" files in "/home/$user/lib.js/*.js(on)".
 *
 * i rename it now to "auto.js".
 *
 * then you could add the autorun for all other library paths. ..
 * ... so /usr/local/lib.js e.g. will be loaded, too.
 *
 * but beware of the path "." or similar ones .. THINK ABOUT *THAT*!
 *
 */



	// 'auto'


// BRING HIER ORDNUNG REIN *omg*
var main = module.exports = global.include(global.path.library);

global.home = main;

// anything else? ^_^
// yes... look at the text on the beginning of this file!
//-> global.auto = global.include(..


// ich will als module.exports = { home: global.home, auto: global.auto };
// .. *EVTL.* auch sub-object-keys gemäß aller verwendeten include-pfade!?
//

console.debug(2, "Loaded 'auto'");

