#!/usr/bin/env node.js
var ansi = include('term/ansi');
ansi.color('this is a test...', 34, 47, 'bold');
ansi.none();
process.stdout.write('nun normaler text wieder?');

