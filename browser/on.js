global.on = {};

global.on.load = function()
{
	try
	{
		var _ = {};

		for(var i = 0; i < arguments.length; i++)
		{
			_[i] = arguments[i];
		}

		var _init = (INIT(_) || {});
		var _main = (MAIN(_init) || {});
		//
		return _main;
	}
	catch(_error)
	{
		window.message(_error.stack, _error.name);
	}
}

global.on.resize = function(_width, _height)
{
	//
}

global.on.key = {};

global.on.key.down = function()
{
}

global.on.key.up = function()
{
}

global.on.mouse = {};

global.on.mouse.down = function(e)
{
	var x = e.clientX; // .. 'client'!
	var y = e.clientY; // what 'bout absolute coords?
}

global.on.mouse.up = function(e)
{
	var x = e.clientX; // .. 'client'!
	var y = e.clientY; // absolutes??
}

global.on.mouse.move = function(e)
{
	var x = e.clientX; // ... 'client'!
	var y = e.clientY; // absolutes!?
}

global.on.timer = {};

global.on.timer.second = function(_second)
{
}

global.on.timer.minute = function(_minute)
{
}

global.on.timer.hour = function()
{
}

global.on.timer.day = function()
{
}

global.on.timer.week = function()
{
}

