var main = module.exports = {};

global.include = main.include = function(_module, _libraryPaths)
{
	if(arguments.length === 0)
	{
		return global.nodejs;
	}
	else if(_module.indexOf('/') === -1)
	{
		var reload;

		if(global.type(arguments[1], 'Boolean'))
		{
			reload = arguments[1];
		}
		else
		{
			reload = false;
		}

		return global.nodejs(_module, reload);
	}

	if(_libraryPaths)
	{
		if(global.type(_libraryPaths, 'Boolean'))
		{
			_libraryPaths = [ global.path.root ];
		}
		else if(! global.type(_libraryPaths, 'Array'))
		{
			_libraryPaths = [ _libraryPaths ];
		}
	}
	else
	{
		_libraryPaths = global.settings.library.path.clone();

		if(_module[0] === '/')
		{
			_libraryPaths.unshift('/');
		}
	}

	var extname = global.nodejs('path').extname(_module);
	var extensions = global.settings.library.extensions.clone();

	if(extname.length > 0)
	{
		extensions = [ extname ];
	}

	for(var i = 0; i < _libraryPaths.length; i++)
	{
		var p = global.nodejs('path').join(_libraryPaths[i], _module).suffix(extensions);

		for(var j = 0; j < extensions.length; j++)
		{
			var pp = p + extensions[j];

			if(! (pp.startsWith('.') || pp.startsWith('/')))
			{
				pp = './' + pp;
			}

			if(! global.file.exists(pp))
			{
				continue;
			}

			return realInclude(pp);
		}
	}

	return undefined;
}

function realInclude(_what)
{
	try
	{
		if(_what.indexOf('/') === -1)
		{
			return require(_what);
		}
		else if(global.file.type.directory(_what))
		{
			return realInclude.directory(_what);
		}
		else
		{
			return realInclude.file(_what);
		}
	}
	catch(_error)
	{
		//TODO/ include '_what' in Error(), somewhere..
		return _error;
	}

	return null;
}

realInclude.original = function(_module)
{
	return require(_module);
}

realInclude.directory = function(_path)
{
	var ls = global.file.list(_path);//, global.settings.library.extensions);

	var result = {};

	for(var i = 0; i < ls.length; i++)
	{
		var p = global.nodejs('path').join(_path, ls[i]);

		for(var j = 0; j < global.settings.library.extensions.length; j++)
		{
			var pp = p + global.settings.library.extensions[j];

			if(! global.file.exists(pp))
			{
				continue;
			}

			if(global.file.type.directory(pp))
			{
				result[global.file.path.tree(pp).last] = {};
				continue;
			}

			var name = global.file.path.basename(pp, global.settings.library.extensions)[0];
			var extOk = false;

			if(pp.endsWith('.json'))
			{
				name = name.toUpperCase();
				extOk = true;
			}
			else
			{
				for(var k = 0; k < global.settings.library.extensions.length; k++)
				{
					if(global.settings.library.extensions[k] === '')
					{
						continue;
					}

					if(pp.endsWith(global.settings.library.extensions[k]))
					{
						extOk = true;
						break;
					}
				}
			}

			if(! extOk)
			{
				continue;
			}

			result[name] = realInclude.file(pp);
		}
	}

	return result;
}

realInclude.file = function(_path)
{
	var ext = nodejs('path').extname(_path);

	for(var i = 0; i < global.settings.library.extensions.length; i++)
	{
		if(global.settings.library.extensions[i] === ext)
		{
			return require(_path);
		}
	}

	return new Error(_path + ' (' + ext + ')');
}

console.debug(2, "Loaded 'module'");

