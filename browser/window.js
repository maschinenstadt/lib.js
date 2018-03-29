window.window = window;

Object.defineProperty(window, 'size' {
	get: function()
	{
		return {
			width: window.innerWidth,
			height: window.innerHeight,

			x: window.innerWidth,
			y: window.innerHeight,

			0: window.innerWidth,
			1: window.innerHeight
		};
	}
});

window.message = function(_text, _title)
{
	//TODO/
	alert(_text);
}

window.onload = function()
{
	if(on && on.load)
	{
		return on.load();
	}

	//return (true|false)?
}

window.onresize = function()
{
	if(on && on.resize)
	{
		var s = window.size;
		return on.resize(s.width, s.height);
	}

	//return (true|false)?
}

window.onkeydown = function()
{
	if(on && on.key && on.key.down)
	{
		return on.key.down.apply(this, arguments);
	}

	//return (true|false)?
}

window.onkeyup = function()
{
	if(on && on.key && on.key.up)
	{
		return on.key.up.apply(this, arguments);
	}

	//return (true|false)?
}

window.onmousedown = function()
{
	if(on && on.mouse && on.mouse.down)
	{
		return on.mouse.down.apply(this, arguments);
	}

	//return (true|false)?
}

window.onmouseup = function()
{
	if(on && on.mouse && on.mouse.up)
	{
		return on.mouse.up.apply(this, arguments);
	}

	//return (true|false)?
}

window.onmousemove = function()
{
	if(on && on.mouse && on.mouse.move)
	{
		return on.mouse.move.apply(this, arguments);
	}

	//return (true|false)?
}

