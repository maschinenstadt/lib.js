BROWSER = true;

global = this || window;
global.global = global;

web = {};
util = web.util = {};
struct = web.struct = {};

if(settings.tls)
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

if(settings.www)
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

if(settings.slash)
{
	var p = window.location.pathname.split('/');

	if(p[p.length - 1].indexOf('.') > -1)
	{
		p[p.length - 1] = '';
		p = p.join('/');

		window.location.pathname = p;
	}
}

html = {};

html.head = document.getElementsByTagName('head');
html.body = document.getElementsByTagName('body');

if(html.head.length === 1)
{
	html.head = html.head[0];
}
if(html.body.length === 1)
{
	html.body = html.body[0];
}

{
	//TODO/ maybe check if already defined in document? and use that?

	let meta = document.createElement('meta');

	if(settings.charset && settings.charset.length > 0)
	{
		meta.setAttribute('charset', settings.charset);
	}
	else
	{
		meta.setAttribute('charset', 'utf-8');
	}

	html.head.appendChild(meta);
}

if(settings.title)
{
	document.title = settings.title;
}
//TODO/
//else if(..:
//-> if html NOT contains '<title>', set a default one..

//

const __toString = Object.prototype.toString;

type = function(_object, _types = undefined)
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

clone = function(_object, _depth = 1, _currentDepth = 1, _foreign = false)
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

not = function(_object, _zero = false)
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

object = function(_string)
{
	return eval(_string);
}

fromJSON = function(_string)
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

toJSON = function(_object)
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

sleep = function(_delay = 1000)
{
	if(! type(_delay, 'Number'))
	{
		_delay = 1000;
	}
	//
	var end = Date.now() + _delay;
	while(Date.now() < end) {};
	//
	return Date.now();
}

EOL = "\r\n";
ESC = String.fromCharCode(27);

function INIT(_ = {})
{
	var result = {};

	//
	web.TIMER = {};	// here are the timer HANDLES to "clearTimeout()" etc. them (best way, eh? ;-)´
	web.TIME = {};

	web.TIME.second = 0;
	web.TIME.minute = 0;
	web.TIME.hour = 0;
	web.TIME.day = 0;
	web.TIME.week = 0;

	// todo... allerdings durch "Date"-klasse.. anpassung der sekunden an jew. funktion (on.hour == ( s / 60 / 60 ) etc...
	web.TIMER.second = window.setInterval(function() { return on.second(web.TIME.second); },	Date.second	);
	web.TIMER.minute = window.setInterval(function() { return on.minute(web.TIME.minute); },	Date.minute	);
	web.TIMER.hour = window.setInterval(function() { return on.hour(web.TIME.hour); },		Date.hour	);
	web.TIMER.day = window.setInterval(function() { return on.day(web.TIME.day); },		Date.day	);
	web.TIMER.week = window.setInterval(function() { return on.week(web.TIME.week); },		Date.week	);

	//
	web.UUID = web.util.uuid.random();

	var _uuid = document.getElementsByName('uuid');
	for(var i = 0; i < _uuid.length; i++)
	{
		_uuid[i].innerHTML = web.UUID;
	}

	web.RANDOM = {};

	var size = 64;

	web.RANDOM.binary = web.util.random.binary(size);
	web.RANDOM.hex = web.util.random.hex(size);
	web.RANDOM.base64 = web.util.random.base64(size);
	web.RANDOM.dual = web.util.random.dual(size);
	web.RANDOM.decimal = web.util.random.decimal(size);
	web.RANDOM.octal = web.util.random.octal(size);

	web.RANDOM[2] = web.util.random.radix(size, 2);
	web.RANDOM[4] = web.util.random.radix(size, 4);
	web.RANDOM[10] = web.util.random.radix(size, 10);
	web.RANDOM[36] = web.util.random.radix(size, 36);

	var _random_size = document.getElementsByName('random_size');
	for(var i = 0; i < _random_size.length; i++)
	{
		_random_size[i].innerHTML = size.toString();
	}
	var _random = document.getElementsByName('random');
	for(var i = 0; i < _random.length; i++)
	{
		var str = '<hr>'
			+ '<li><b><big>binary</big></b> ' + web.RANDOM.binary + '</li>'
			+ '<li><b><big>hex</big></b> ' + web.RANDOM.hex + '</li>'
			+ '<li><b><big>base64</big></b> ' + web.RANDOM.base64 + '</li>'
			+ '<li><b><big>dual</big></b> ' + web.RANDOM.dual + '</li>'
			+ '<li><b><big>decimal</big></b> ' + web.RANDOM.decimal + '</li>'
			+ '<li><b><big>octal</big></b> ' + web.RANDOM.octal + '</li>'
			+ '<hr />'
			+ '<li><b><big>(2)</big></b> ' + web.RANDOM[2] + '</li>'
			+ '<li><b><big>(4)</big></b> ' + web.RANDOM[4] + '</li>'
			+ '<li><b><big>(10)</big></b> ' + web.RANDOM[10] + '</li>'
			+ '<li><b><big>(36)</big></b> ' + web.RANDOM[36] + '</li>'
			+ '<hr />';
		_random[i].innerHTML = str;
	}
	web.RANDOM.size = undefined;
	delete web.RANDOM.size;

	//
	web.BIRTHDAY = Date.now();
	//
	result.UUID = web.UUID;
	result.BIRTHDAY = web.BIRTHDAY;
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

