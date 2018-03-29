var main = module.exports = {};

//global.console.trace(!!)
// < https://nodejs.org/api/readline.html >

/*	TODO!!!!
 *	TODO!!!
 *	!!TODO
 *	!!!TODO!
 *
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
*/

global.console.stream = global.process.stdout;
global.console.errorStream = global.process.stderr;

Object.defineProperty(global.console, 'size', {
	get: function() { return {
		width: global.console.stream.columns,
		height: global.console.stream.rows,

		rows: global.console.stream.rows,
		cols: global.console.stream.columns,
		columns: global.console.stream.columns,

		x: global.console.stream.columns,
		y: global.console.stream.rows,

		0: global.console.stream.columns,
		1: global.console.stream.rows
	}; } });

Object.defineProperty(global.console, 'stdio', {
	get: function() { return [
		global.process.stdin,
		global.process.stdout,
		global.process.stderr
	]; }
});

global.console.EOL = function(_count = 1, _padStr = '', _width = global.console.size.width, _stream = global.console.stream)
{
	if(global.type(_stream, 'Boolean'))
	{
		if(_stream)
		{
			_stream = global.console.stream;
		}
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	//TODO/ such task(s) should be solved via "arguments"-prototype-methods.. see polymorphy and mainly ".check()" w/ type-filter!!
	if(! global.type(_padStr, 'String'))
	{
		_padStr = '';
	}

	var result = '';
	var kk = 0;

	for(var i = 0; i < _count; i++)
	{
		if(_width === 0 || not(_padStr))
		{
			result += global.EOL;
			continue;
		}

		for(var j = 0, k = kk; j < _width; j++, kk = k = ((k+1) % _padStr.length))
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

global.console.inspect = function(_object, _depth = 1, _options = {}, _colors = true, _stream = global.console.stream)
{
	_options = Object.assign(global.console.inspect.options, _options || {});
	_options.colors = ( global.type(_colors, 'Boolean') ? _colors : _options.colors );

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

	if(global.type(_stream, 'Boolean'))
	{
		_stream = ( _stream ? global.console.stream : undefined );
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	var data = global.nodejs.util.inspect(_object, _options);

	if(_stream)
	{
		_stream.write(data + global.EOL);
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

global.console.line = function(_padStr = global.console.line.padStr, _width = global.console.size.width, _stream = global.console.stream)
{
	if(global.type(_stream, 'Boolean'))
	{
		_stream = ( _stream ? global.console.stream : undefined );
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	if(! global.type(_padStr, 'String'))
	{
		_padStr = global.console.line.padStr;
	}

	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}

	var data = '';

	for(var i = 0, j = 0; i < _width; i++, j = (j+1) % _padStr.length)
	{
		data += _padStr[j];
	}

	data += global.EOL;

	if(_stream)
	{
		_stream.write(data);
	}

	return data;
}

global.console.line.padStr = '-';

global.console.left = function(_text = '', _padStr = global.console.left.padStr, _width = global.console.size.width, _stream = global.console.stream)
{
	if(global.type(_stream, 'Boolean'))
	{
		_stream = ( _stream ? global.console.stream : undefined );
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	if(! global.type(_text, 'String'))
	{
		_text = '';
	}

	if(! global.type(_padStr, 'String'))
	{
		_padStr = global.console.left.padStr;
	}

	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}

	var data = _text;

	for(var i = data.length, j = 0; i < _width; i++, j = (j+1) % _padStr.length)
	{
		data += _padStr[j];
	}

	data += global.EOL;

	if(_stream)
	{
		_stream.write(data);
	}

	return data;
}

global.console.left.padStr = global.console.line.padStr;

global.console.center = function(_text = '', _padStr = global.console.center.padStr, _width = global.console.size.width, _stream = global.console.stream)
{
	if(global.type(_stream, 'Boolean'))
	{
		_stream = ( _stream ? global.console.stream : undefined );
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	if(! global.type(_text, 'String'))
	{
		_text = '';
	}

	if(! global.type(_padStr, 'String'))
	{
		_padStr = global.console.center.padStr;
	}

	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}

	var data = '';
	//var centerPos = Math.floor(_width / 2) - Math.floor(_text.length / 2);
	var centerPos = Math.floor((_width - _text.length) / 2);

	var i = 0;
	var j = 0;

	for(; i < centerPos; i++, j = (j+1) % _padStr.length)
	{
		data += _padStr[j];
	}

	data += _text;
	i += _text.length;

	for(; i < _width; i++, j = (j+1) % _padStr.length)
	{
		data += _padStr[j];
	}

	data += global.EOL;

	if(_stream)
	{
		_stream.write(data);
	}

	return data;
}

global.console.center.padStr = global.console.line.padStr;

global.console.right = function(_text = '', _padStr = global.console.right.padStr, _width = global.console.size.width, _stream = global.console.stream)
{
	if(global.type(_stream, 'Boolean'))
	{
		_stream = ( _stream ? global.console.stream : undefined );
	}
	else if(! global.type(_stream, 'Object'))
	{
		_stream = undefined;
	}

	if(! global.type(_text, 'String'))
	{
		_text = '';
	}

	if(! global.type(_padStr, 'String'))
	{
		_padStr = global.console.right.padStr;
	}

	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}

	var data = '';
	var endPos = _width - _text.length;

	for(var i = 0, j = 0; i < endPos; i++, j = (j+1) % _padStr.length)
	{
		data += _padStr[j];
	}

	data += _text + global.EOL;

	if(_stream)
	{
		_stream.write(data);
	}

	return data;
}

global.console.right.padStr = global.console.line.padStr;

global.console.stdout = function(_message = global.EOL)
{
	if(! global.type(_message, 'String'))
	{
		_message = _message.toString();
	}

	global.console.stream.write(_message);
	return _message;
}

global.console.stderr = function(_message = global.EOL)
{
	if(! global.type(_message, 'String'))
	{
		_message = _message.toString();
	}

	global.console.errorStream.write(_message);
	return _message;
}

// both following (and String's implementations) replace Node.js' format().. 8? :-)
global.console.printf = function()
{
	//TODO/
	//# should use "String" implementations (sscanf, sprintf)
}

global.console.scanf = function()
{
	//TODO/
	//# should use "String" implementations (sscanf, sprintf)
	//# maybe use 'readline' for input? otherweise you could also open /dev/* or so (as file)? but: async is better????
}

const _log = global.console.log;
const _error = global.console.error;

global.console.log = function()
{
	_log.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.info = function()
{
	_log.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.warning = function()
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.error = function()
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.exception = function()
{
	_error.apply(this, arguments);
	return Array.prototype.join.call(arguments, ' ');
}

global.console.debug = function(_level)
{
	var args = Array.from(arguments);//vs. "arguments.toArray()" ;-)´

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

