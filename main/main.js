var main = module.exports = {};

global.global = global;

global.BROWSER = false;

global.EOL = global.nodejs.os.EOL;
global.ESC = String.fromCharCode(27);

global.delimiter = global.nodejs.path.delimiter;	// ':'
global.separator = global.nodejs.path.sep;		// '/'
//global.divider = //..

Object.defineProperty(global, 'os', {
	get: function() { return {
		type: global.nodejs.os.type(),
		platform: global.process.platform,
		release: global.nodejs.os.release(),
		endianness: global.nodejs.os.endianness()
	}; } } );
Object.defineProperty(global, 'load', {
	get: function() { return global.nodejs.os.loadavg(); } });
Object.defineProperty(global, 'memory', {
	get: function() { return {
		total: global.nodejs.os.totalmem(),
		free: global.nodejs.os.freemem()
	}; } });
Object.defineProperty(global, 'hostname', {
	get: function() { return global.nodejs.os.hostname(); } });
Object.defineProperty(global, 'uptime', {
	get: function() { return global.nodejs.os.uptime(); } });
Object.defineProperty(global, 'cpu', {
	get: function() { return global.nodejs.os.cpus(); } });
Object.defineProperty(global, 'eth', {
	get: function() {
		var eth = global.nodejs.os.networkInterfaces();

		eth.lo = undefined;
		delete eth.lo;

		return eth;
	} });

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
		return null;
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
		return null;
	}
}

global.execute = function(_cmdline, _options)
{
	_options = Object.apply(global.execute.options, (_options||{}));
	_options.encoding = _options.encoding || settings.encoding;

	//
	// < http://www.codingdefined.com/2014/08/difference-between-fork-spawn-and-exec.html >
	// also look @ "global['$']" ...
}

global.execute.options = {
};

global['$'] = function(_cmdline)
{
	//TODO/ (sollte so wie im shell-scripting; stdout als string-rückgabe)
	//
	// < http://www.codingdefined.com/2014/08/difference-between-fork-spawn-and-exec.html >
	//
}

var thisFile = global.nodejs.path.basename(__filename);
var libraryPaths = global.settings.library.path.reverse();

for(var i = 0; i < libraryPaths.length; i++)
{
	var p = libraryPaths[i] + '/' + global.settings.library.global;
	
	if(! global.nodejs.fs.existsSync(p))
	{
		continue;
	}

	var ls = global.nodejs.fs.readdirSync(p, { encoding: global.settings.encoding });

	for(var j = 0; j < ls.length; j++)
	{
		var pp = p + '/' + ls[j];

		var ext = global.nodejs.path.extname(pp);
		var extOK = false;

		for(var i = 0; i < global.settings.library.extensions.length; i++)
		{
			if(global.settings.library.extensions[i] === ext)
			{
				extOK = true;
				break;
			}
		}
		
		if(! extOK)
		{
			continue;
		}

		/*var o = */require(pp);
	}
}


(function args(_argv)
{
	for(var i = 0; i < _argv.length; i++)
	{
		var item = _argv[i].prefix('--debug');

		if(item.length === _argv[i].length)
		{
			continue;
		}

		if(item.length > 0)
		{
			if(item[0] === '=')
			{
				item = item.substr(1);
				var level = Number(item);

				global.settings.DEBUG = level;
			}
		}

		break;
	}
})(global.process.argv);





for(var i = 0; i < libraryPaths.length; i++)
{
	var p = libraryPaths[i] + '/' + global.settings.library.main;

	if(! global.nodejs.fs.existsSync(p))
	{
		continue;
	}

	var ls = global.nodejs.fs.readdirSync(p, { encoding: global.settings.encoding });

	for(var j = 0; j < ls.length; j++)
	{
		var pp = p + '/' + ls[j];

		if(global.nodejs.path.basename(pp) === thisFile)
		{
			continue;
		}

		var ext = global.nodejs.path.extname(pp);
		var extOK = false;

		for(var i = 0; i < global.settings.library.extensions.length; i++)
		{
			if(global.settings.library.extensions[i] === ext)
			{
				extOK = true;
				break;
			}
		}

		if(extOK)
		{
			var o = require(pp);
			main = Object.assign(main, (o||{}));
		}
	}
}

