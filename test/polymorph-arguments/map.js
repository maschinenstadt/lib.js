#!/usr/bin/env node.js

function test()
{
	switch(arguments.map(
		'String|Boolean firstParam, Number|Boolean secondParam, Boolean thirdParam'/*, ..*/,
		'Number otherFirstArg, Boolean otherSecondOne'/*, ..*/
	))
	{
		case 0:
			// erste "map()"-zeile trifft auf (virt. polymorph) parameter-definition zu.
			var switch = arguments.thirdParam;
			break;
		case 1:
			// zweite "map()"-zeile trifft zu .. d.h. andere param-key-names, .. die nun
			// alle in "arguments" mit vorliegen sollten:
			var nr = arguments.otherFirstArg;
			break;
		case -1:
		default:
			// keine zeile match'ed .. also alternative vorgehensweise, mit fallback(s).
	}
}

test('eins', 2.0, undefined, 1, true, 'testing');

