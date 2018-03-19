var main = module.exports = {};

//global.console.trace(!!)

global.console.prompt = function(_prompt = '> ')
{
	global.console.write(_prompt);
	return global.console.read();
}

global.console.read = function()
{
	// < https://nodejs.org/api/readline.html >
}

//TODO/!!!!!!!!!!!!! (as better replacement for "console.inspect()" (or additionally?!?)
global.console.object = function(_object, _depth, _currentDepth)
{
	if(_object === null)
	{
		return '(null)' + EOL;
	}
	else if(_object === undefined)
	{
		return '(undefined)' + EOL;
	}

	if(_depth === 0)
	{
		//all levels
	}
	else
	{
		_depth = _depth || global.console.object.depth;
	}

	var foreign = false;

	if(_currentDepth === 0)
	{
		_currentDepth = 1;
	}
	else
	{
		_currentDepth = _currentDepth || 1;
	}

	var string = '';

	for(var i = 1, j = 0; i < _currentDepth; i++, j = (j+1) % global.console.object.indentStr.length)
	{
		string += global.console.object.indentStr[j];
	}

	var type = global.type(_object);

	for(var idx in _object)
	{
		if(foreign || _object.hasOwnProperty(idx))
		{
			string += global.console.object(_object[idx], _depth, _currentDepth + 1);
		}
	}

	return string;
}

global.console.object.depth = 4;
global.console.object.arrayLength = 8;
global.console.object.indentStr = ' ';
global.console.object.indentTab = 4;

/*
global.console.size = function()
{
	return [
		global.console.size.width(),
		global.console.size.height()
	];
}

global.console.size.width = function()
{
	return global.process.stdout.columns;
}

global.console.size.height = function()
{
	return global.process.stdout.rows;
}*/
Object.defineProperty(global.console, 'size', {
	get: function() { return {
		width: global.process.stdout.columns,
		height: global.process.stdout.rows,

		rows: global.process.stdout.rows,
		cols: global.process.stdout.columns,
		columns: global.process.stdout.columns,

		0: global.process.stdout.columns,
		1: global.process.stdout.rows
	}; } });

global.console.EOL = function(_count = 1, _padStr, _width, _stream)
{
	if(_width !== 0)
	{
		_width = _width || global.console.size.width || 0;
	}

	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}

	if(! _padStr)
	{
		_padStr = undefined;
		_width = 0;
	}

	var result = '';

	for(var i = 0; i < _count; i++)
	{
		if(_width === 0)
		{
			result += global.EOL;
			continue;
		}

		for(var j = 0, k = 0; j < _width; j++, k = ((k+1) % _padStr.length))
		{
			result += _padStr[k];
		}

		result += global.EOL;
	}

	if(_stream)
	{
		_stream.write(result);
	}

	return result;
}

global.console.inspect = function(_object, _depth, _options, _stream, _colors)
{
	_options = _options || {};
	_options = Object.assign(global.console.inspect.options, _options);
	_options.colors = _options.colors || ( _colors !== false );

	/*
	 * => anderes verhalten als util.inspect ..
	 *
	 * 0 wird umgesetzt als 'null' und steht für die gesamte tiefe;
	 * 1 ist standard und ist ganz flach!
	 * 2 ist erste tiefen-verschachtelung, usw.
	 *
	 */
	if(! global.type(_depth, 'Number'))
	{
		_depth = 1;
	}
	else if(_depth === 0)
	{
		_options.depth = null;
	}
	else
	{
		_options.depth = _depth - 1;
	}

	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}
	else if(global.type(_stream, 'Boolean'))
	{
		_stream = global.process.stdout;
		_options.colors = (_stream !== false);
	}

	var data = global.nodejs.util.inspect(_object, _options);

	if(_stream)
	{
		_stream.write(data + EOL);
	}

	return data;
}

global.console.inspect.options = {
	showHidden: false,
	depth: 0,
	colors: true,
	customInspect: true,
	showProxy: true,
	maxArrayLength: global.console.size.width || 60,
	breakLength: global.console.size.width || 60
};

global.console.line = function(_padStr, _width, _stream)	//TODO/ _space_left _space_right (!??)
{
	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}
	_width = _width || global.console.size.width;
	_padStr = _padStr || global.console.line.padStr;

	var data = '';

	for(var i = 0, j = 0; i < _width; i++, j = (j+1) % _padStr.length)
		data += _padStr[j];

	if(_stream)
	{
		_stream.write(data += EOL);
	}

	return data;
}

global.console.line.padStr = '-';

global.console.left = function(_text, _padStr, _width, _stream)
{
	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}
	_width = _width || global.console.size.width;
	_padStr = _padStr || global.console.left.padStr;

	var data = _text;

	for(var i = data.length, j = 0; i < _width; i++, j = (j+1) % _padStr.length)
		data += _padStr[j];

	if(_stream)
	{
		_stream.write(data += EOL);
	}

	return data;
}

global.console.left.padStr = global.console.line.padStr;

global.console.center = function(_text, _padStr, _width, _stream)
{
	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}
	_width = _width || global.console.size.width;
	_padStr = _padStr || global.console.center.padStr;

	var data = '';
	//var centerPos = Math.floor(_width / 2) - Math.floor(_text.length / 2);
	var centerPos = Math.floor((_width - _text.length) / 2);

	var i = 0;
	var j = 0;

	for(; i < centerPos; i++, j = (j+1) % _padStr.length)
		data += _padStr[j];

	data += _text;
	i += _text.length;

	for(; i < _width; i++, j = (j+1) % _padStr.length)
		data += _padStr[j];

	if(_stream)
	{
		_stream.write(data += EOL);
	}

	return data;
}

global.console.center.padStr = global.console.line.padStr;

global.console.right = function(_text, _padStr, _width, _stream)
{
	if(_stream !== false)
	{
		_stream = _stream || global.process.stdout;
	}
	_width = _width || global.console.size.width;
	_padStr = _padStr || global.console.right.padStr;

	var data = '';
	var endPos = _width - _text.length;

	for(var i = 0, j = 0; i < endPos; i++, j = (j+1) % _padStr.length)
		data += _padStr[j];

	data += _text;

	if(_stream)
	{
		_stream.write(data += EOL);
	}

	return data;
}

global.console.right.padStr = global.console.line.padStr;

//TODO/ (wie bei err() below) "format()" quasi, wohl mit (s)printf()?!
global.console.write = function(_message = global.EOL)
{
	global.process.stdout.write(_message);
}

global.console.writeError = function(_message = global.EOL)
{
	global.process.stderr.write(_message);
}

const _log = global.console.log;
const _error = global.console.error;

global.console.log = function()
{
	_log.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.info = function(_data)
{
	_log.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.warning = function(_data)
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.error = function(_data)
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.exception = function(_data)
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.debug = function(_level, _data)
{
	var args = [].slice.call(arguments);

	if(global.type(_level, 'Number'))
	{
		_level = args.shift();
	}
	else
	{
		_level = 1;
	}

	if(_level > global.settings.DEBUG)
	{
		return '';
	}

	_log.apply(this, args);
	return Array.prototype.join.call(args, ' ');
}

console.debug(2, "Loaded 'console'");

