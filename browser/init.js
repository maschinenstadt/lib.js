BROWSER = true;

global = this || window;
global.global = global;

global.web = {};
global.util = global.web.util = {};
global.struct = global.web.struct = {};

if(global.settings.tls)
{
	if(window.location.protocol === 'http:')
	{
		window.location.protocol = 'https:';
	}
}
else
{
	if(window.location.protocol === 'https:')
	{
		window.location.protocol = 'http:';
	}
}

if(global.settings.www)
{
	if(! window.location.hostname.startsWith('www.'))
	{
		window.location.hostname = 'www.' + window.location.hostname;
	}
}
else
{
	if(window.location.hostname.startsWith('www.'))
	{
		window.location.hostname = window.location.hostname.substr(4);
	}
}

if(global.settings.slash)
{
	var p = window.location.pathname.split('/');

	if(p[p.length - 1].indexOf('.') > -1)
	{
		p[p.length - 1] = '';
		p = p.join('/');

		window.location.pathname = p;
	}
}

const __toString = Object.prototype.toString;

global.type = function(_object, _types = undefined)
{
	var type;

	//TODO/
	//_object.constructor.name

	if(_object === undefined)
	{
		type = 'undefined';
	}
	else if(_object === null)
	{
		type = 'null';
	}
	else
	{
		type = __toString.call(_object).slice(8, -1);
	}

	if(_types)
	{
		typesType = __toString.call(_types).slice(8, -1);

		if(typesType === 'String')
		{
			return ( type === _types );
		}
		else if(typesType === 'Array')
		{
			for(var i = 0; i < _types.length; i++)
			{
				if(type === _types[i])
				{
					return true;
				}
			}

			return false;
		}
	}

	return ( type || undefined );
}

global.clone = function(_object, _depth = 1, _currentDepth = 1, _foreign = false)
{
	if(arguments.length === 0)
	{
		return new Error();
	}
	else if(_object === null)
	{
		return null;
	}
	else if(_object === undefined)
	{
		return undefined;
	}
	else if(_object.clone)
	{
		return _object.clone(_depth, _currentDepth, _foreign);
	}

	return ( fromJSON(toJSON(_object)) );
}

global.not = function(_object, _zero = false)
{
	if(_object === null)
	{
		return true;
	}
	else if(_object === undefined)
	{
		return true;
	}
	else if(_object === false)
	{
		return true;
	}
	else if(_object === 0)
	{
		return ( _zero ? true : false );
	}
	else if(type(_object, 'Error') || _object.isError)
	{
		return true;
	}
	else if(_object.length === 0)
	{
		return true;
	}

	return false;
}

global.object = function(_string)
{
	return eval(_string);
}

global.fromJSON = function(_string)
{
	try
	{
		return JSON.parse(_string);
	}
	catch(_error)
	{
		return _error;
	}
}

global.toJSON = function(_object)
{
	try
	{
		return JSON.stringify(_object);
	}
	catch(_error)
	{
		return _error;
	}
}

global.sleep = function(_delay = 1000)
{
	if(! global.type(_delay, 'Number'))
	{
		_delay = global.sleep.delay;
	}
	//
	var end = Date.now() + _delay;

	while(Date.now() < end) {};

	return end;
}

global.sleep.delay = 1000;

EOL = "\r\n";
ESC = String.fromCharCode(27);

function INIT(_ = {})
{
	var result = {};

	//
	global.web.time = {};

	global.web.time.second = global.web.time.seconds = 0;
	global.web.time.minute = global.web.time.minutes = 0;
	global.web.time.hour = global.web.time.hours = 0;
	global.web.time.day = global.web.time.days = 0;
	global.web.time.week = global.web.time.weeks = 0;

	//
	global.html.head = document.getElementsByTagName('head');
	global.html.body = document.getElementsByTagName('body');

	//
	global.web.UUID = global.web.util.uuid.random();

	var _uuid = document.getElementsByName('uuid');
	for(var i = 0; i < _uuid.length; i++)
	{
		_uuid[i].innerHTML = web.UUID;
	}

	global.web.RANDOM = {};

	var size = 64;

	global.web.RANDOM.binary = global.web.util.random.binary(size);
	global.web.RANDOM.hex = global.web.util.random.hex(size);
	global.web.RANDOM.base64 = global.web.util.random.base64(size);
	global.web.RANDOM.dual = global.web.util.random.dual(size);
	global.web.RANDOM.decimal = global.web.util.random.decimal(size);
	global.web.RANDOM.octal = global.web.util.random.octal(size);

	global.web.RANDOM[2] = global.web.util.random.radix(size, 2);
	global.web.RANDOM[4] = global.web.util.random.radix(size, 4);
	global.web.RANDOM[10] = global.web.util.random.radix(size, 10);
	global.web.RANDOM[36] = global.web.util.random.radix(size, 36);

	var _random_size = document.getElementsByName('random_size');
	for(var i = 0; i < _random_size.length; i++)
	{
		_random_size[i].innerHTML = size.toString();
	}
	var _random = document.getElementsByName('random');
	for(var i = 0; i < _random.length; i++)
	{
		var str = '<li><b><big>binary</big></b> ' + global.web.RANDOM.binary + '</li>'
			+ '<li><b><big>hex</big></b> ' + global.web.RANDOM.hex + '</li>'
			+ '<li><b><big>base64</big></b> ' + global.web.RANDOM.base64 + '</li>'
			+ '<li><b><big>dual</big></b> ' + global.web.RANDOM.dual + '</li>'
			+ '<li><b><big>decimal</big></b> ' + global.web.RANDOM.decimal + '</li>'
			+ '<li><b><big>octal</big></b> ' + global.web.RANDOM.octal + '</li>'
			+ '<hr />'
			+ '<li><b><big>(2)</big></b> ' + global.web.RANDOM[2] + '</li>'
			+ '<li><b><big>(4)</big></b> ' + global.web.RANDOM[4] + '</li>'
			+ '<li><b><big>(10)</big></b> ' + global.web.RANDOM[10] + '</li>'
			+ '<li><b><big>(36)</big></b> ' + global.web.RANDOM[36] + '</li>';
		_random[i].innerHTML = str;
	}

	//
	global.web.BIRTHDAY = Date.now();
	//
	result.UUID = global.web.UUID;
	result.BIRTHDAY = global.web.BIRTHDAY;
	//
	result = Object.assign((result||{}), (_||{}));
	return (result || {});
}

function MAIN(_init = {})
{
	var result = {};
	result = Object.assign((result||{}), (_init||{}));

	var res = main(result);

	result = Object.assign((result||{}), (res||{}));
	return (result || {});
}

