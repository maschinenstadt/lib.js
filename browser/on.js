on = on || {};

on.resize = function(_width, _height)
{
	//TODO/(remove, ..)
	alert(_width.toString() + ' x ' + _height.toString());
}

on.key = {};

on.key.down = function()
{
	//TODO/(remove, ..)
	alert('on.key.down()');
}

on.key.up = function()
{
	//TODO/(remove, ..)
	alert('on.key.up()');
}

on.mouse = {};

on.mouse.down = function(e)
{
	var x = e.clientX;
	var y = e.clientY;

	//TODO/(remove, ..)
	alert('on.mouse.down(' + x.toString() + ', ' + y.toString() + ')');
}

on.mouse.up = function(e)
{
	var x = e.clientX;
	var y = e.clientY;

	//TODO/(remove, ..)
	alert('on.mouse.up(' + x.toString() + ', ' + y.toString() + ')');
}

on.mouse.move = function(e)
{
	var x = e.clientX;
	var y = e.clientY;

	//TODO/(remove, ..)
	alert('on.mouse.move(' + x.toString() + ', ' + y.toString() + ')');
}

