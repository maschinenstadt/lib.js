#!/usr/bin/env node

try
{

global.path = { root: __dirname };
//
const _settings = global.path.root + '/settings.js';
global.settings = require(_settings);

const __toString = Object.prototype.toString;

global.type = function(_object, _types = undefined)
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
	return ( global.fromJSON(global.toJSON(_object)) );
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
	else if(global.type(_object, 'Error') || _object.isError)
	{
		return true;
	}
	else if(_object.length && _object.length === 0)
	{
		return true;
	}

	return false;
}

if(global.type(global.settings.library.path, 'String'))
{
	global.settings.library.path = [ global.settings.library.path ];
}

global.nodejs = function(_module, _reload = false)
{
	try
	{
		if(_module in global.nodejs
			&& (! _reload))
		{
			return global.nodejs[_module];
		}

		var mod = require(_module);

		if(mod)
		{
			return (global.nodejs[_module] = mod);
		}
		else
		{
			return new Error(_module + ' => ' + global.type(mod));
		}
	}
	catch(_error)
	{
		return _error;
	}
}

for(var idx in settings.nodejs)
{
	global.nodejs[idx] = require(idx);
}

//
Object.defineProperty(global.path, 'temp', {
	get: function() { return global.nodejs.os.tmpdir(); } });
Object.defineProperty(global.path, 'home', {
	get: function() { return global.nodejs.os.homedir(); } });
Object.defineProperty(global.path, 'maschinenstadt', {
	get: function() { return global.path.home + '/.maschinenstadt'; } });
Object.defineProperty(global.path, 'library', {
	get: function() { return global.path.home + '/lib.js'; } });
Object.defineProperty(global.path, 'version', {
	get: function() { return global.path.maschinenstadt + '/.version'; } });
Object.defineProperty(global.path, 'service', {
	get: function() { return global.path.maschinenstadt + '/.service'; } });

var _lang = global.process.env[settings.variable.lang];
var _language = global.process.env[settings.variable.language];
var _library_path = global.process.env[settings.variable.libraryPath];

if(_lang || _language)
{
	if(_language)
	{
		_lang = _language.substr(0, 2);
	}
	else
	{
		_lang = _lang.substr(0, 2);
	}

	switch(_lang)
	{
		case 'en':
		case 'de':
			global.language = global.settings.language = _lang;
			break;
		default:
			global.language = global.settings.language = global.settings.defaultLanguage;
	}
}

const backup = global.settings.library.path;
global.settings.library.path = [ global.path.root ];

var main = require(global.settings.library.init);

var newPaths = [ global.process.cwd(), global.path.library ];

for(var i = 0, j = newPaths.length; i < main.paths.length; i++, j++)
{
	newPaths[j] = main.paths[i];
}

if(_library_path)
{
	_library_path = _library_path.split(global.delimiter);

	for(var i = 0, j = newPaths.length; i < _library_path.length; i++, j++)
	{
		newPaths[j] = _library_path[i];
	}
}

for(var i = 0, j = newPaths.length; i < backup.length; i++, j++)
{
	newPaths[j] = backup[i];
}

newPaths[newPaths.length] = global.path.root;

global.settings.library.path = [];

for(var i = 0; i < newPaths.length; i++)
{
	if(! global.type(newPaths[i], 'String'))
	{
		continue;
	}

	if(global.settings.library.path.indexOf(newPaths[i]) > -1)
	{
		continue;
	}

	if(! global.nodejs.fs.existsSync(newPaths[i]))
	{
		continue;
	}

	if(! global.file.type.directory(newPaths[i]))
	{
		continue;
	}

	global.settings.library.path[global.settings.library.path.length] = newPaths[i];
}

delete main.paths;

//
main.environment();

main.debug();

if(global.settings.START)
{
	//TODO/ w/ IPC or so? TODO/ manage (@ own "Master"?!)
	//main.createCluster();
	//
	main.start();
}

//
module.exports = main.include;

}

catch(_error)
{
	console.error(_error.text);
}

