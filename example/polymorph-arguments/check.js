#!/usr/bin/env node.js

function test()
{
	console.debug('(%d)', arguments.length);

	var one = arguments.check(0, 'String');
	var two = arguments.check(1, 'Number');
	var three = arguments.check(2, ['undefined','null']);
	var four = arguments.check(3, 'Boolean');
	var five = arguments.check(4, ['Boolean','Number']);
	var six = arguments.check(5, ['String','Number']);

	console.debug('[one] "%s"\n[two] "%s"\n[three] "%s"\n[four] "%s"\n[five] "%s"\n[six] "%s"',
		type(one), type(two), type(three), type(four), type(five), type(six));
}

test('eins', 2.0, undefined, 1, true, 'testing');

