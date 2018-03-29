BROWSER = true;

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
	let charset = settings.charset || 'utf-8';

	meta.setAttribute('charset', charset);
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
	else if(_object.length && _object.length === 0)
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

EOL = "\r\n";
ESC = String.fromCharCode(27);

