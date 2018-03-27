#!/usr/bin/env node.js
var ansi = include('term/ansi');
ansi.gray(12);
console.stdout('testing..');
ansi.none();
console.stdout('none now..!');

