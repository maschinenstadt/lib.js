var ansi = module.exports = {};
var color = include('util/color');

// 
// "doc/txt/ANSI.txt"
// "doc/ansi/colortest-*.txt"
//

ansi.ESC = global.ESC || String.fromCharCode(27); // \033
ansi.BRACKET = String.fromCharCode(91);

ansi.reset = function(_home = false, _write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '0m');
}

ansi.color = function(_foreground = 37, _background = 40, _attribute = 0)
{
	//TODO/ not really necessary, btw..
}

ansi.color.fg = function(_r, _g, _b, _write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '38;2;'
		+ _r.toString() + ';'
		+ _g.toString() + ';'
		+ _b.toString() + 'm');
}

ansi.color.fg.rgb = ansi.color.fg;

ansi.color.bg = function(_r, _g, _b, _write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '48;2;'
		+ _r.toString() + ';'
		+ _g.toString() + ';'
		+ _b.toString() + 'm');
}

ansi.color.bg.rgb = ansi.color.bg;

ansi.color.fg.hex = function(_hexa, _write = global.console.stream)
{
	var rgb = color.hexToRgb(_hexa);
	return ansi.color.fg(rgb.r, rgb.g, rgb.b, _write);
}

ansi.color.bg.hex = function(_hexa, _write = global.console.stream)
{
	var rgb = color.hexToRgb(_hexa);
	return ansi.color.bg(rgb.r, rgb.g, rgb.b, _write);
}

ansi.color.rgb = {};
ansi.color.hex = {};

ansi.color.rgb.fg = ansi.color.fg;
ansi.color.rgb.bg = ansi.color.bg;

ansi.color.hex.fg = ansi.color.fg.hex;
ansi.color.hex.bg = ansi.color.bg.hex;

ansi.color.black = { fg: 30, bg: 40 };
ansi.color.red = { fg: 31, bg: 41 };
ansi.color.green = { fg: 32, bg: 42 };
ansi.color.yellow = { fg: 33, bg: 43 };
ansi.color.blue = { fg: 34, bg: 44 };
ansi.color.magenta = { fg: 35, bg: 45 };
ansi.color.cyan = { fg: 36, bg: 46 };
ansi.color.white = { fg: 37, bg: 47 };

ansi.attribute = function(_attribute, _write = global.console.stream)
{
	if(global.type(_attribute, 'String'))
	{
		_attribute = ansi.attribute[_attribute];
	}
	else if(! global.type(_attribute, 'Number'))
	{
		_attribute = 0;
	}

	return write(ansi.ESC + ansi.BRACKET + _attribute.toString() + 'm');
}

ansi.attribute.none = 0;
ansi.attribute.bold = 1;
ansi.attribute.dark = 2;
ansi.attribute.italic = 3;
ansi.attribute.underline = 4;
ansi.attribute.blink = 5;
ansi.attribute.rapid = 6;
ansi.attribute.inverse = 7;
ansi.attribute.invisible = 8;
ansi.attribute.crossed = 9;

ansi.cursor = function(_x = 0, _y = 0, _width = global.console.size.width, _height = global.console.size.height, _write = global.console.stream)
{
	if(! global.type(_x, 'Number'))
	{
		_x = 0;
	}
	if(! global.type(_y, 'Number'))
	{
		_y = 0;
	}
	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}
	if(! global.type(_height, 'Number'))
	{
		_height = global.console.size.height;
	}

	var pos = position(_x, _y, _width, _height);

	var column = pos[0];
	var line = pos[1];

	return write(ansi.ESC + ansi.BRACKET + line.toString() + ';' + column.toString() + ('H'||'f'), _write);
}

ansi.cursor.save = function(_write = global.console.stream)
{
	return write(ansi.ESC + '7', _write);
}

ansi.cursor.load = function(_write = global.console.stream)
{
	return write(ansi.ESC + '8', _write);
}

ansi.clear = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '2J', _write);
}

ansi.clear.up = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '1J', _write);
}

ansi.clear.down = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '0J', _write);
}

ansi.clear.line = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '2K', _write);
}

ansi.clear.line.start = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '1K', _write);
}

ansi.clear.line.end = function(_write = global.console.stream)
{
	return write(ansi.ESC + ansi.BRACKET + '0K', _write);
}

function write(_code, _write = global.console.stream)
{
	if(! global.type(_code, 'String'))
	{
		return new Error(global.type(_code));
	}

	if(global.type(_write, 'Boolean'))
	{
		if(_write)
		{
			_write = global.console.stream;
		}
	}
	else if(! global.type(_write, ['Object','Function']))
	{
		_write = global.console.stream;
	}

	if(_write)
	{
		if(global.type(_write, 'Function'))
		{
			_write(_code);
		}
		else if(_write.write)
		{
			_write.write(_code);
		}
		else
		{
			global.process.stdout.write(_code);
		}
	}

	return _code;
}

function position(_x = 0, _y = 0, _width = global.console.size.width, _height = global.console.size.height)
{
	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width || 80;
	}
	if(! global.type(_height, 'Number'))
	{
		_height = global.console.size.height || 25;
	}

	if(_x < 0)
	{
		_x = _width + _x;
	}

	if(_y < 0)
	{
		_y = _height + _y;
	}

	_x = ( _x % _width ) + 1;
	_y = ( _y % _height ) + 1;

	return [ _x, _y ];
}

position.x = function(_x = 0, _width = global.console.size.width)
{
	return position(_x, 0, _width, global.console.size.height)[0];
}

position.y = function(_y = 0, _height = global.console.size.height)
{
	return position(0, _y, global.console.size.width, _height)[1];
}

