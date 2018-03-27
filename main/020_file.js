var main = module.exports = {};

global.file = function(_path = global.process.cwd(), _chroot = '')
{
	//TODO/ .. AND WHAT ELSE IN HERE!?
	//
	_path = global.file.path(_path);
	_chroot = global.file.path(_chroot);

	var result = global.file.path(global.nodejs.path.join(_chroot, _path));

	return result;
}

global.file.path = function(_path)
{
	if(! global.file.path.isValid(_path))
	{
		return new Error(_path.toString());
	}

	//TODO/ maybe we want some functionality to apply on every path?
	//the plan is to let every "path" argument (everywhere in these codes) run through this "global.path.root"..
	
	// interessant: alle verzeichnisse werden mit '/' am ende markiert. optimum: kein aufwand wg. extra file.type.directory..
	//
	if(global.nodejs.fs.existsSync(_path))
	{
		if(global.file.type.directory(_path))
		{
			if(_path[_path.length - 1] !== global.separator)
			{
				_path += global.separator;
			}
		}
		else
		{
			if(_path[_path.length - 1] === global.separator)
			{
				_path = _path.substr(0, _path.length - global.separator.length);
			}
		}
	}

	return _path;
}

global.file.path.isValid = function(_path)
{
	if(! global.type(_path, 'String'))
	{
		return false;
	}

	//TODO/
	//(maybe also determine os type for this)
	//but for sure: no \0 is allowed, neither in linux nor windows

	if(_path.indexOf('\0') > -1)
	{
		return false;
	}

	return true;
}

const _extname = global.nodejs.path.extname;

global.file.path.extname = function(_paths, _extensions = [], _withErrors = true)
{
	if(arguments.length === 0)
	{
		return new Error();
	}

	if(global.type(_paths, 'Array'))
	{
		var result = [];

		for(var i = 0; i < _paths.length; i++)
		{
			if(! global.type(_paths[i], 'String'))
			{
				if(_withErrors)
				{
					result[i] = new Error(global.type(_paths[i]));
				}

				continue;
			}

			result[result.length] = global.file.path.extname(_paths[i], _extensions);
		}

		return result;
	}
	else if(global.type(_paths, 'String'))
	{
		var ext = _extname(_paths);

		if(_extensions.length === 0)
		{
			return ext;
		}

		for(var i = 0; i < _extensions.length; i++)
		{
			if(ext === _extensions[i])
			{
				return true;
			}
		}

		return false;
	}
	else
	{
		return new Error(global.type(_paths));
	}


	var paths;

	if(arguments.length >= 1)
	{
		if(global.type(arguments[0], 'Array'))
		{
			paths = arguments[0];
		}
		else if(global.type(arguments[0], 'String'))
		{
			paths = [ arguments[0] ];
		}
		else
		{
			return new Error(global.type(arguments[0]));
		}
	}

	var result = [];

	for(var i = 0; i < paths.length; i++)
	{
		result[i] = _extname(paths[i]);
	}

	return result;
}

const _normalize = global.nodejs.path.normalize;

global.file.path.normalize = function()
{
	if(arguments.length === 0)
	{
		return new Error();
	}

	var paths;

	if(arguments.length === 1)
	{
		if(global.type(arguments[0], 'Array'))
		{
			paths = arguments[0];
		}
		else if(global.type(arguments[0], 'String'))
		{
			paths = [ arguments[0] ];
		}
		else
		{
			return new Error(global.type(arguments[0]));
		}
	}
	else
	{
		paths = Array.from(arguments);
	}

	var result = [];

	for(var i = 0; i < paths.length; i++)
	{
		result[i] = _normalize(paths[i]);
	}

	return result;
}

global.file.path.tree = function(_paths)
{
	if(arguments.length === 0)
	{
		return [];
	}

	//TODO/ extend it for MULTIPLE PATHS (array _paths)
	// atm just a single string expected..

	if(! global.type(_paths, 'String'))
	{
		return new Error(global.type(_paths));
	}

	var elems = _paths.split(global.separator);
	var result = [];

	for(var i = 0; i < elems.length; i++)
	{
		if(elems[i].length === 0)
		{
			continue;
		}

		result[result.length] = elems[i];
	}

	return result;
}

	// TODO /
//
// 	the following and other functions (below and above..) look exactly the same ..
//	... außer 'basename' vs. 'dirname' ..
//
// 	... hier würde ich eine abstrakte (versteckte! ;-)´ funktion schreiben, damit zusätzlich
// 	die jew. funktion (basename vs dirname) als letztes/erstes argument übergeben wird usw.!
//
// 	
//
//		GANZ ALLGEMEIN:
//
//		.. würde ich hier überlegen, eine automatische abstraktions-(denkprozess-)engine
//		so zu entwerfen, dass sie so "ähnlichkeit" (oder gleichheit) diverser ANTEILIGER
//		funktions-elemente überprüft (und ähnliches ..! ;-)´ und ganz von alleine alles,
//		wo konkrete differenz ist, zu neuen funktionen zu machen, deren allgemeine basis
//		die gleichen elemente sind etc. pp. ..! :-D
//
//

const _basename = global.nodejs.path.basename;

global.file.path.basename = function(_paths, _suffices = [], _prefices = [], _maximum = false, _remove = true, _filter = false)
{
	if(arguments.length === 0)
	{
		return new Error();
	}

	if(global.type(_paths, 'String'))
	{
		_paths = [ _paths ];
	}

	if(_paths.length === 0)
	{
		return new Error();
	}

	if(global.type(_suffices, 'String'))
	{
		_suffices = [ _suffices ];
	}

	if(global.type(_prefices, 'String'))
	{
		_prefices = [ _prefices ];
	}

	var result = [];

	for(var i = 0; i < _paths.length; i++)
	{
		var one = _basename(_paths[i]);
		var original = one;

		if(one.suffix)
		{
			for(var j = 0; j < _suffices.length; j++)
			{
				one = one.suffix(_suffices[j], _maximum, _remove, _filter);
			}
		}
		if(one.prefix)
		{
			for(var j = 0; j < _prefices.length; j++)
			{
				one = one.prefix(_prefices[j], _maximum, _remove, _filter);
			}
		}

		if(_filter)
		{
			if(one === original)
			{
				continue;
			}
		}
		
		if(! _remove)
		{
			one = original;
		}

		result[result.length] = one;
	}

	return result;
}

const _dirname = global.nodejs.path.dirname;

global.file.path.dirname = function(_paths, _suffices = [], _prefices = [], _maximum = false, _remove = true, _filter = false)
{
	if(arguments.length === 0)
	{
		return new Error();
	}

	if(global.type(_paths, 'String'))
	{
		_paths = [ _paths ];
	}
	
	if(_paths.length === 0)
	{
		return new Error();
	}

	if(global.type(_suffices, 'String'))
	{
		_suffices = [ _suffices ];
	}

	if(global.type(_prefices, 'String'))
	{
		_prefices = [ _prefices ];
	}

	var result = [];

	for(var i = 0; i < _paths.length; i++)
	{
		var one = _dirname(_paths[i]);
		var original = one;

		if(one.suffix)
		{
			for(var j = 0; j < _suffices.length; j++)
			{
				one = one.suffix(_suffices[j], _maximum, _remove, _filter);
			}
		}
		if(one.prefix)
		{
			for(var j = 0; j < _prefices.length; j++)
			{
				one = one.prefix(_prefices[j], _maximum, _remove, _filter);
			}
		}

		if(_filter)
		{
			if(one === original)
			{
				continue;
			}
		}

		if(! _remove)
		{
			one = original;
		}

		result[result.length] = one;
	}

	return result;
}

global.file.readStream = function(_path, _options = {})
{
	if(arguments.length === 0
		|| (!(global.type(_path, 'String'))))
	{
		return new Error();
	}

	if(! global.file.exists(_path))
	{
		return undefined;
	}

	_options = Object.assign(global.file.readStream.options, _options || {});
	//
	return global.nodejs.fs.createReadStream(_path, _options);
}

global.file.readStream.options = {
	flags: 'r',
	encoding: global.settings.encoding || null,
	fd: null,
	mode: 0o666,
	autoClose: true,
	start: 0,
	/*end: ,*/
	highWaterMark: (64*1024)
};

global.file.writeStream = function(_path, _options = {})
{
	if(arguments.length === 0
		|| (!(global.type(_path, 'String'))))
	{
		return new Error();
	}

	if(! global.file.exists(_path))
	{
		return undefined;
	}

	_options = Object.assign(global.file.writeStream.options, _options || {});
	//
	return global.nodejs.fs.createWriteStream(_path, _options);
}

global.file.writeStream.options = {
	flags: 'w' || 'w+',
	encoding: global.settings.encoding,
	fd: null,
	mode: 0o666,
	autoClose: true,
	start: 0
};

global.file.dd = function(_input, _output, _blockSize, _length)
{
	//TODO/
}

global.file.copy = function(_source, _target)
{
	//TODO/
}

global.file.mkdir = function(_path)
{
	try
	{
		if(! global.type(_path, 'String'))
		{
			return 0;
		}

		var result = 0;
	
		var parts = _path.split(global.separator);
		var p = ( _path[0] === global.separator ? global.separator : '' );

		for(var i = 0; i < parts.length; i++)
		{
			p = global.nodejs.path.join(p, parts[i]);

			if(global.nodejs.fs.existsSync(p))
			{
				if(global.file.type.directory(p))
				{
					continue;
				}
				else
				{
					break;
				}
			}
			else
			{
				global.nodejs.fs.mkdirSync(p);
				result++;
			}
		}
	}
	catch(_error)
	{
		//throw _error;
		return -1;
	}

	return result;
}

global.file.list = function(_path, _suffix = [], _prefix = [], _inverse = false, _encoding = global.settings.encoding)
{
	try
	{
		if(global.type(_path, 'String'))
		{
			//_path = global.file(_path);
			_path = global.nodejs.path.resolve(_path);
		}
		else
		{
			_path = global.process.getcwd();
		}

		_options = { encoding: _encoding };

		if(global.type(_suffix, 'String'))
		{
			_suffix = [ _suffix ];
		}

		if(global.type(_prefix, 'String'))
		{
			_prefix = [ _prefix ];
		}

		var l = global.nodejs.fs.readdirSync(_path, _options);

		if(_suffix.length === 0 && _prefix.length === 0)
		{
			return l;
		}

		var ll = [];

		for(var i = 0; i < l.length; i++)
		{
			var one = l[i];

			one = one.suffix(_suffix);
			one = one.prefix(_prefix);

			if(_inverse)
			{
				if(one !== l[i])
					continue;
			}
			else
			{
				if(one === l[i])
					continue;
			}
			// this is necessarry *here*, as we want to FILTER OUT our own prefix/suffix files..

			ll[ll.length] = one;
		}

		return ll;
	}
	catch(_error)
	{
		return _error;
	}

	return null;
}

global.file.exists = function(_path)
{
	return global.nodejs.fs.existsSync(global.file(_path));
}

global.file.read = function(_path, _encoding)
{
	try
	{
		_encoding = _encoding || settings.encoding;
		return global.nodejs.fs.readFileSync(global.file(_path), { encoding: _encoding });
	}
	catch(_error)
	{
		//throw _error;
		return undefined;//!?
	}
}

global.file.write = function(_path, _data, _encoding)
{
	try
	{
		_encoding = _encoding || settings.encoding;
		global.nodejs.fs.writeFileSync(global.file(_path), _data, { encoding: _encoding });
		return _data.length;
	}
	catch(_error)
	{
		//throw _error;
		return -1;
	}
}

global.file.append = function(_path, _data, _encoding)
{
	try
	{
		_encoding = _encoding || settings.encoding;
		global.nodejs.fs.appendFileSync(global.file(_path), _data, { encoding: _encoding });
		return _data.length;
	}
	catch(_error)
	{
		//throw _error;
		return -1;
	}
}

global.file.stat = function(_path, _resolveSymlinks = false)
{
	//_path = global.file(_path);	//TODO...

	var stats;

	try
	{
		if(_resolveSymlinks)
		{
			stats = global.nodejs.fs.statSync(_path);
		}
		else
		{
			stats = global.nodejs.fs.lstatSync(_path);
		}
	}
	catch(_error)
	{
		return _error;
	}

	return stats;
}

global.file.stat.resolve = function(_path)
{
	return global.file.stat(_path, true);
}

global.file.mode = function(_path, _resolveSymlinks = false)
{
	// see "doc/txt/file.modes.txt". ..

	var stats = global.file.stat(_path, _resolveSymlinks);
	return ( stats ? stats.mode : undefined );
}

global.file.user = function(_path, _resolveSymlinks = false)
{
	var stats = global.file.stat(_path, _resolveSymlinks);
	return ( stats ? stats.uid : undefined );
}

global.file.group = function(_path, _resolveSymlinks = false)
{
	var stats = global.file.stat(_path, _resolveSymlinks);
	return ( stats ? stats.gid : undefined );
}

global.file.size = function(_path, _resolveSymlinks = false)
{
	var stats = global.file.stat(_path, _resolveSymlinks);
	return ( stats ? stats.size : undefined );
}

global.file.type = function(_path, _resolveSymlinks = false)
{
	var stats = global.file.stat(_path, _resolveSymlinks);

	if(not(stats))
	{
		return 'unknown';
	}

	if(stats.isFile())
		return 'file';
	if(stats.isDirectory())
		return 'directory';
	if(stats.isSymbolicLink())
		return 'symlink';
	if(stats.isBlockDevice())
		return 'block';
	if(stats.isCharacterDevice())
		return 'character';
	if(stats.isSocket())
		return 'socket';
	if(stats.isFIFO())
		return 'fifo';

	return 'unknown';
}

global.file.type.file = function(_path, _resolveSymlinks = false)
{
	return 'file' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.directory = function(_path, _resolveSymlinks = false)
{
	return 'directory' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.symlink = function(_path, _resolveSymlinks = false)
{
	return 'symlink' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.block = function(_path, _resolveSymlinks = false)
{
	return 'block' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.character = function(_path, _resolveSymlinks = false)
{
	return 'character' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.socket = function(_path, _resolveSymlinks = false)
{
	return 'socket' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.fifo = function(_path, _resolveSymlinks = false)
{
	return 'fifo' === global.file.type(_path, _resolveSymlinks);
}

global.file.type.unknown = function(_path, _resolveSymlinks = false)
{
	return 'unknown' === global.file.type(_path, _resolveSymlinks);
}

global.file.readlink = function(_path, _resolve = false, _encoding = global.settings.encoding)
{
	//_path = global.file(_path);
	// WANTED OR NOT!?
	//_path = global.nodejs.path.resolve(_path);
	if(arguments.length === 0)
	{
		return new Error();
	}

	if(global.type(_path, 'Array'))
	{
		var result = [];

		//do i need '_depth' here, too? .. NO, maybe it's sache der entwickler.. ^-^
		for(var i = 0; i < _path.length; i++)
		{
			result[i] = global.file.readlink(_path[i], _resolve, _encoding);
		}

		return result;
	}
	else if(! global.type(_path, 'String'))
	{
		return new Error(global.type(_path));
	}

	if(! global.nodejs.fs.existsSync(_path))
	{
		return new Error(_path);
	}

	if(! global.file.type.symlink(_path))
	{
		//return new Error(_path.toString());
		return _path;	//?!?!?? vs. Error..?
	}

	var target = global.nodejs.fs.readlinkSync(_path, { encoding: _encoding });

	if(_resolve)
	{
		target = global.nodejs.path.resolve(target);
	}

	//TODO/ w/ "file.path()", so we check the target for directory type, so we can let be a '/' added to path..
	//

	return target;
}

global.file.readlink.resolve = function(_path, _encoding = global.settings.encoding)
{
	return global.file.readlink(_path, true, _encoding);
}

global.file.readlink.list = function(_path, _resolve = false, _encoding = global.settings.encoding, _withErrors = true)
{
	// resolves ALL links IN A LIST (optional resolving)
	if(arguments.length === 0)
	{
		return new Error();
	}

	if(global.type(_path, 'Array'))
	{
		var result = [];

		for(var i = 0; i < _path.length; i++)
		{
			if(! global.type(_path[i], 'String'))
			{
				if(_withErrors)
				{
					result[i] = new Error(global.type(_path[i]));
				}

				continue;
			}

			result[result.length] = global.file.readlink.list(_path[i], _resolve, _encoding, _withErrors)
		}

		return result;
	}
	else if(global.type(_path, 'String'))
	{
		//_path = global.nodejs.path.normalize(_path);

		if(! global.nodejs.fs.existsSync(_path))
		{
			return new Error(_path);
		}
		else if(! global.file.type.symlink(_path))
		{
			return [ ( _resolve ? global.nodejs.path.resolve(_path) : _path ) ];
		}

		var path = global.nodejs.path.resolve(_path);
		var dir = global.nodejs.path.dirname(path);
		var result = [ _resolve ? path : _path ];

		while(global.file.type.symlink(path))
		{
			var target = global.file.readlink(path, false, _encoding);

			if(target[0] === '/')
			{
				path = target;

				result[result.length] = target;
			}
			else
			{
				path = global.nodejs.path.join(dir, target);
				dir = global.nodejs.path.dirname(path);

				result[result.length] = ( _resolve ? path : target );
			}

		}

		return result;
	}
	else
	{
		return new Error(global.type(_path));
	}
}

global.file.readlink.list.resolve = function(_path, _encoding = global.settings.encoding)
{
	// resolves ALL links IN A LIST w/ resolving each
	return global.file.readlink.list(_path, true, _encoding);
}

global.file.readlink.all = function(_path, _resolve = false, _encoding = global.settings.encoding)
{
	// resolves ALL links (as ONE) (optional resolving - or original form)
	var ls = global.file.readlink.list(_path, _resolve, _encoding);
	return ls[ls.length - 1];
}

global.file.readlink.all.resolve = function(_path, _encoding = global.settings.encoding)
{
	// resolves ALL links (as ONE) w/ resolving them
	return global.file.readlink.all(_path, true, _encoding);
}

global.file.removeAt = function(_path, _from, _to)
{
	// w/ given _path(s(!)) traverse as long as DEPTH _from is reached,
	// and from there go again deeper until _to is reached.
	// .. everything in between is to be deleted! ;-)´
	//
	// TODO: maybe RELATIVE depths instead of ABSOLUTE ones?
	// ALSO: negative depths..? to think about it.. why what?
	//
}

// EVTL.. hier und überall in dieser datei "_recursive" durch "_depth" ersetzen (max depth FROM ENTRY PATH??!)
global.file.remove = function(_path, _recursive = false)
{
	if(arguments.length === 0)
	{
		return undefined;
	}

	if(global.type(_path, 'Array'))
	{
		var result = 0;

		for(var i = 0; i < _path.length; i++)
		{
			if(! global.type(_path[i], 'String'))
			{
				continue;
			}

			result += global.file.remove(_path[i], _recursive);
		}

		return result;
	}
	else if(! global.type(_path, 'String'))
	{
		return null;
	}

	var result = 0;

	try
	{
		if(global.file.type.directory(_path))
		{
			var ls = global.file.list(_path);

			if(ls.length === 0)
			{
				if(global.file.remove.directory(_path))
				{
					result++;
				}
			}
			else if(_recursive)
			{
				for(var i = 0; i < ls.length; i++)
				{
					var p = global.nodejs.path.join(_path, ls[i]);
					result += global.file.remove(p, _recursive);
				}

				if(global.file.remove.directory(_path))
				{
					result++;
				}
			}
		}
		else
		{
			if(global.file.remove.file(_path))
			{
				result++;
			}
		}
	}
	catch(_error)
	{
		return 0;
	}

	return 0;
}

global.file.remove.file = function(_path)
{
	try
	{
		global.nodejs.fs.unlinkSync(_path); // always returns 'undefined'
		return true;
	}
	catch(_error)
	{
		return false;
	}
}

global.file.remove.directory = function(_path)
{
	try
	{
		global.nodejs.fs.rmdirSync(_path); // always returns 'undefined'
		return true;
	}
	catch(_error)
	{
		return false;
	}
}

global.file.tree = function(_path, _glob, _depth = 0, _currentDepth = 1)
{
	//TODO/
	//
	//soll auch das unix-tool `tree` ersetzen können! ;-)´
	//
}

global.file.rename = function(_pathA, _pathB)
{
}

global.file.move = function(_path, _targetName)
{
}

global.file.lock = function(_path)
{
}

global.file.unlock = function(_path)
{
}

global.file.truncate = function(_path, _size)
{
}

global.file.xargs = function(/* TODO */)
{
	//TODO/ .. mainly for "file.find()" array/list (of paths!)
}

//
// necessary: own "class File" .. for my own fs-db and maybe for fuse. and for own, BETTER file operations (instead of pure path lists..)
//

global.file.find = function(_path = '/', _depth = 1, _types = [], _glob = '*', _caseSensitive = true, _inverse = false, _encoding = global.settings.encoding, _currentDepth = 1)
{
	//TODO/ .. accept MULTIPLE *_path* and call every with this function .. better search ... (todo: abs. vs. rel. paths in result arr..)
	//TODO/ _glob w/ _caseSensistive .. && "_inverse" => wie `grep -v` .. alles im _glob liegende wird NICHT gezählt, der nicht matchende rest schon.. ^-^

	var result;

	try
	{
		if(global.type(_types, 'String'))
		{
			_types = [ _types ];
		}

		var types = [];

		if(global.type(_types, 'Array'))
		{
			for(var i = 0; i < _types.length; i++)
			{
				switch(_types[i])
				{
					case 'file':
					case 'directory':
					case 'symlink':
					case 'block':
					case 'character':
					case 'socket':
					case 'fifo':
						types[types.length] = _types[i];
						continue;
					case 'unknown':
					default:
						continue;
				}
			}
		}

		//!??!??!!??
		//_path = global.nodejs.path.resolve(_path);

		if(! global.file.exists(_path))
		{
			return [];
		}

		result = [ _path ];

		if(global.file.type.directory(_path))
		{
			var res = global.file.list(_path, [], [], false, _encoding);

			for(var i = 0; i < res.length; i++)
			{
				var p = result[result.length] = global.nodejs.path.join(_path, res[i]);

				if(_depth === 0 || (_currentDepth < _depth))
				{
					if(global.file.type.directory(p))
					{
						var subRes = global.file.find(p, _depth, types, _glob, _caseSensitive, _inverse, _encoding, _currentDepth + 1);

						for(var j = 0; j < subRes.length; j++)
						{
							result[result.length] = subRes[j];
						}
					}
				}
			}
		}
	}
	catch(_error)
	{
		return _error;
	}

	if(not(types))
	{
		return result;
	}

	//TODO/ globs, inverse, .. etc.! minimum..

	var realResult = [];

	for(var i = 0; i < result.length; i++)
	{
		var t = global.file.type(result[i], false);
		var ok = ( types.length === 0 ? true : false );

		for(var j = 0; j < types.length; j++)
		{
			if(types[j] === t)
			{
				ok = true;
				break;
			}
		}

		if(_inverse) ok = !ok;

		if(ok)
		{
			realResult[realResult.length] = result[i];
		}
	}

	return realResult;
}

global.file.find.file = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'file', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.directory = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'directory', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.symlink = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'symlink', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.block = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'block', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.character = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'character', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.socket = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'socket', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.find.fifo = function(_path = '/', _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return global.file.find(_path, _depth, 'fifo', _glob, _caseSensitive, _inverse, _currentDepth);
}

global.file.count = {};

global.file.count.lines = function(_delim = global.EOL, _path, _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	//_delim is by default EOL (global.EOL)
}

global.file.count.words = function(_delim = ' ', _path, _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	//_delim is by default ' ' <Space>
}

global.file.count.bytes = function(_path, _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	var b = global.file.size(_path, false);
	//
	//TODO/ recursion etc... so we can sum() up all the bytes for any file under a _path..!!
	//
	return b;
}

global.file.count.bits = function(_path, _depth = 1, _glob = '*', _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	return (global.file.count.bytes(_path, _depth, _glob, _currentDepth) * 8);
}

global.file.hash = function(_path, _depth = 1, _inRadix = 256, _outRadix = 256, _currentDepth = 1)
{
	//own hash.. w/ multiple radices.. bit/byte-count..
	//
	//_inRadix wg. betrachtung von bytes z.b. .. oder eben nur modulo-anteilen auch zur eingabe
	// outRadix wg. werte-zählung, die bis byte gehen kann, aber auch schon ab unär oder binär!

	if(_inRadix < 0 || _inRadix > 256
		|| _outRadix < 0 || _outRadix > 256)
	{
		return new Error();
	}

	var result = [];

	for(var i = 0; i < _radix; i++)
	{
		result[i] = 0;
	}

	//var data = file.read
	//TODO
	//MUSS UNBEDINGT async laufen .. mit file-STREAMs und _chunk .. sonst zuviel ram-verbrauch;
	//und kann ja sowieso in sync'ed ausgabe enden (hier eben, w/o ".async" (much TODO, btw))..
}

global.file.hash.sha3 = function(_path, _depth = 1, _bitSize = 512, _currentDepth = 1)
{
	switch(_bitSize)
	{
		case 224:
		case 256:
		case 384:
		case 512:
			break;
		default:
			return new Error();
	}
}

global.file.grep = function(_path, _depth = 1, _string, _caseSensitive = true, _inverse = false, _currentDepth = 1)
{
	//TODO/
}

global.file.chown = function(_path, _uid = 0, _gid = 0, _recursive = false, _resolveSymlinks = false)
{
	try
	{
		if(_resolveSymlinks)
		{
			global.nodejs.fs.chownSync(_path, _uid, _gid);
		}
		else
		{
			global.nodejs.fs.lchownSync(_path, _uid, _gid);
		}

		return true;
	}
	catch(_error)
	{
		return false; // return _error!??
	}
}

global.file.chmod = function(_path, _mode, _recursive = false, _resolveSymlinks = false)
{
	// worx: 0777 (as Number .. w/ (0) before: is important!)
	// worx: '777' (as String)

	//
	// 4000: Hidden File
	// 2000: System File
	// 1000: Archive bit
	// 0400: Individual read
	// 0200: Individual write
	// 0100: Individual execute
	// 0040: Group read
	// 0020: Group write
	// 0010: Group execute
	// 0004: Other read
	// 0002: Other write
	// 0001: Other execute
	//

	if(arguments.length < 2)
	{
		return false;
		// MAYBE < 1 .. so only _path results in return the current mode!?
	}

	if(global.type(_path, 'Array'))
	{
		for(var i = 0; i < _path.length; i++)
		{
			if(global.type(_path[i], 'String'))
			{
				global.file.chmod(_path[i], _mode, _recursive, _resolveSymlinks);
			}
		}
	}

	if(! global.type(_mode, [ 'Number', 'String' ]))
	{
		return false;
	}

	// why? see "TypeError" below.. ('lchmodSync' doesn't seem to exist? WHY!??)
	//TODO/
	//_resolveSymlinks = true;

	try
	{
		if(_resolveSymlinks)
		{
			global.nodejs.fs.chmodSync(_path, _mode);
		}
		else
		{
			// TypeError: global.nodejs.fs.lchmodSync is not a function
			global.nodejs.fs.lchmodSync(_path, _mode);
		}

		return true;
	}
	catch(_error)
	{
		return false; // return _error?!?
	}
}

console.debug(2, "Loaded 'file'");

