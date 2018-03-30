on = {};

on.load = function()
{
	try
	{
		var _init = init() || undefined;
		var _main = main(_init) || undefined;
		return { init: _init, main: _main };
	}
	catch(_error)
	{
		window.message(_error.stack, _error.name);
	}
}

on.resize = function(_width, _height)
{
	//
}

on.key = {};

on.key.down = function()
{
}

on.key.up = function()
{
}

on.mouse = {};

on.mouse.down = function(e)
{
	var x = e.clientX; // .. 'client'!
	var y = e.clientY; // what 'bout absolute coords?
}

on.mouse.up = function(e)
{
	var x = e.clientX; // .. 'client'!
	var y = e.clientY; // absolutes??
}

on.mouse.move = function(e)
{
	var x = e.clientX; // ... 'client'!
	var y = e.clientY; // absolutes!?
}

