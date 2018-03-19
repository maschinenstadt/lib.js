#!/usr/bin/env node.js

// INITIALIZE.. first this is a function to init the rl-streams.
// AFTER THIS it's your readline-"Interface". .. this is because
// it's not necessary to initialize "readline" directly on start
// every time .. also because this causes some kind of pause (as
// the "readline.pause()" (below) exists this example process)..
global.readline();


// after the init (above) you can use 'readline' regularily. ...
global.readline.question('Really exit? ', (_answer) => {
	if(_answer.match(/^y(es)?$/i))
	{
		global.readline.pause();
	}
	else
	{
	}
});

