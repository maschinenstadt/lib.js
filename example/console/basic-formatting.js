#!/usr/bin/env node.js

console.center(' console.EOL(3) ', 'abcde', 40);
console.EOL(3);
console.left(' console.EOL(6, "abcdef", 10) ');
console.EOL(6, 'abcdef', 10);
console.right(' ("").pad(..) -> tables ;-)´ ', ' - ');
var padA = 14;
var padB = -12;
var padC = 3;
console.debug(0, '%s[%s]%s(%s)%s"%s"', ('').pad(8), 'erster schlüssel'.pad(padA), ('').pad(2), 'nr. one'.pad(padB), ('').pad(4), (true).toString('NO', 'YES').pad(padC));
console.debug(0, '%s[%s]%s(%s)%s"%s"', ('').pad(8), 'zweiter schlüssel'.pad(padA), ('').pad(2), '# two'.pad(padB), ('').pad(4), (false).toString('NO', 'YES').pad(padC));
console.debug(0, '%s[%s]%s(%s)%s"%s"', ('').pad(8), 'dritter schlüssel'.pad(padA), ('').pad(2), 'nummer drei'.pad(padB), ('').pad(4), (true).toString('NO', 'YES').pad(padC));
console.line('_');


