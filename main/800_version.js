var main = module.exports = {};

if(! global.settings.version.check)
{
	return;
}

try
{
	if(! global.file.exists(global.path.version))
	{
		global.file.mkdir(global.path.version);
	}
	
	if(! global.file.type.directory(global.path.version))
	{
		console.error('"%s" is not a directory!', global.path.version);
		return;
	}
}
catch(_error)
{
	//console.inspect(_error);
}

const lastQueryPath = global.path.version + '/lastQuery.json';
const availablePath = global.path.version + '/available';

/*
(function checkArguments(_argv)
{
	var forceRecheck = false;

	for(var i = 0; i < _argv.length; i++)
	{
		if(_argv[i] === '--check-version')
		{
			forceRecheck = true;
			break;
		}
	}

	if(forceRecheck)
	{
		global.console.debug(1, 'Forcing version recheck (--check-version)..');

		global.file.remove(lastQueryPath);
		global.file.remove(availablePath);
	}
})(global.process.argv);
*/

const defaultDelay = 30;
const defaultURL = 'https://nodejs.org/dist/latest/';

if(global.settings.version.delay <= 0)
{
	global.settings.version.delay = defaultDelay;
}

// convert minutes to milliseconds..
global.settings.version.delay *= 60 * 1000;

main.version = {};
main.version.string = global.process.version;
main.version.number = global.process.version.substr(1);

var parts = main.version.number.split('.');

if(parts.length === 3)
{
	main.version.major = Number(parts[0]);
	main.version.minor = Number(parts[1]);
	main.version.patch = Number(parts[2]);
}

var lastQuery = global.file.read(lastQueryPath);

if(lastQuery)
{
	lastQuery = main.version.lastQuery = global.fromJSON(lastQuery);
	var nextQuery = main.version.nextQuery = lastQuery + global.settings.version.delay;
	var delta = main.version.delta = nextQuery - Date.now();

	if(delta <= 0)
	{
		console.debug('Node.js version check again NOW (after (%d))', delta);

		query();

		lastQuery = Date.now();
		global.file.write(lastQueryPath, global.toJSON(lastQuery));
	}
	else
	{
		console.debug('Node.js version check again in (%d) milliseconds..', delta);

		if(global.file.exists(availablePath))
		{
			versionWarning();
		}
	}
}
else
{
	console.debug('Node.js version check the first time NOW.');

	query();

	lastQuery = main.version.lastQuery = Date.now();
	global.file.write(lastQueryPath, global.toJSON(lastQuery));
}


function query(_delta)
{
	const URL = global.settings.version.url || defaultURL;

	try
	{
		var client;

		if(URL.startsWith('https:'))
		{
			client = include('https');
		}
		else if(URL.startsWith('http:'))
		{
			client = include('http');
		}
		else
		{
			console.error("Invalid URL (@ 'settings.version.url')!");
			return new Error(settings.version.url);
		}

		client.get(URL, (_response) => {
			_response.setEncoding(global.settings.encoding);

			var data = '';

			// chunk has been received
			_response.on('data', (_chunk) => {
				data += _chunk;
			});

			// whole response has been received.
			_response.on('end', () => {
				check(data);
			});

		}).on('error', (_error) => {
			error(_error);
		});

		if(URL.startsWith('https:'))
		{
			delete global.nodejs.https;
		}
		else if(URL.startsWith('http:'))
		{
			delete global.nodejs.http;
		}
	}
	catch(_error)
	{
		error(_error);
	}
}

//
function check(_data)
{
	//TODO/ l8rs we'll also search for version number.. (already prepared the 'needle' ;-)´
	//
	var needle = global.settings.version.needle; // 'node-v9.8.0.tar.' => 'node-*.tar.'
	needle = needle.split('*').join(main.version.string);

	console.debug('Node.js version check finished HTTP GET .. w/ (%d) bytes.', _data.length);

	var idx = _data.indexOf(needle);

	if(idx === -1)
	{
		versionWarning();

		global.file.write(availablePath, '');
	}
	else
	{
		console.debug('Node.js version is the current/latest one. That\'s good! :-)´');

		global.file.remove(availablePath);
	}
}

function error(_error)
{
	//throw _error;
	console.warning("ERROR checking for current Node.js version: '%s'", _error.message);
}

function versionWarning()
{
	var nextQuery = lastQuery + global.settings.version.delay;
	var delta = nextQuery - Date.now();

	console.center('WARNING');
	console.warning('Node.js version is out-dated! There\'s a newer version available! :-(´');
	console.warning('Next check in (%d) milliseconds (in case you\'ve already updated ;-)´', delta);
}

console.debug(2, "Loaded 'version'");

