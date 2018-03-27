#!/usr/bin/env node.js
var ansi = include('console/ansi');


var bg = '#bfff00';
var fg = 'f00';

ansi.cursor(10, 0);
ansi.color.fg.hex(fg);
ansi.color.bg.hex(bg);
console.stdout('das ist der erste von zwei tests..');

timer.sleep(3000);

ansi.cursor(3, 3);
ansi.color.fg(200, 220, 40);
ansi.color.bg(100, 110, 20);
console.stdout('dies ist ein test..');
ansi.cursor(0, 0);
ansi.reset();
ansi.attribute(ansi.attribute.blink);
console.stdout('drei vier?!?');
ansi.reset();
ansi.attribute(ansi.attribute.italic);
ansi.attribute(ansi.attribute.bold);
ansi.cursor(0, -1);
ansi.attribute(ansi.attribute.underline);
console.stdout('zweiter test w/o..');
ansi.cursor.save();
ansi.cursor(0, 0);
console.stdout('ABC');
ansi.cursor.load();
ansi.clear.left();
console.stdout('ENDE');

timer.timeout.set(function() { ansi.cursor(0, 4); ansi.clear.down(); }, 2500);
timer.set.timeout(function() { ansi.clear(); ansi.cursor(-('Fedisch!').length, -1); console.stdout('Fedisch!'); }, 5000);

