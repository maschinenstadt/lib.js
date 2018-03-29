var main = module.exports = {};

const padLen = -20;

main.environment = function()
{
	if(global.process.file.length === 0)
	{
		if(global.settings.START_ONLY)
		{
			global.console.error('You can\'t run this script stand-alone.');
			global.process.exit(1);
		}
	}
	else
	{
		var original = global.process.file;

		global.process.file = global.nodejs('path').resolve(global.process.file);

		if(global.nodejs('fs').existsSync(global.process.file))
		{
			global.process.list = global.file.readlink.list.resolve(global.process.file);
			global.process.full = global.process.list[global.process.list.length - 1];
			global.process.base = global.file.path.basename(global.process.list, global.settings.library.extensions);
			global.process.real = global.process.base[global.process.base.length - 1];
			global.process.name = global.process.base[0];
		}
		else
		{
			if(global.settings.START_ONLY)
			{
				global.console.error('The script you\'ve specified doesn\'t exist.');
				global.process.exit(2);
			}

			global.process.file = '';
		}

		global.process.argv.unshift(original); // really? BUT: do i really not alter this somewhere else (global/process.js e.g.?)!?
	}
}

main.start = function()
{
	if(global.process.file.length > 0)
	{
		if(global.settings.START)
		{
			return ( global.process.main = require(global.process.file) );
		}
		else
		{
			//TODO/
			console.debug('-------- global.start @ global/script.js -----');
			//global.console.error('Starting scripts is not allowed right now. Check the \'config.js\'!');
			//global.process.exit(3);
		}
	}
}

main.debug = function()
{

	if(global.settings.DEBUG >= 8)
	{
		//
		console.left('( (Operating) System )', ' - ');

		console.debug("[ %s ]    %s", 'Hostname'.pad(padLen), global.hostname);
		console.debug("[ %s ]    %s", 'Architecture'.pad(padLen), global.nodejs('os').arch());
		console.debug("[ %s ]    %s", 'Network Interfaces'.pad(padLen), global.eth.count().toString() + ' ' + global.eth.keys().toString());
		console.debug("[ %s ]    %s", 'CPU(s) / Cores'.pad(padLen), global.cpu.length.toString());
		console.debug("[ %s ]    %s", 'Endianness'.pad(padLen), ( global.os.endianness === 'LE' ? 'Little Endian' : 'Big Endian' ) );
		console.debug("[ %s ]    %s", 'Memory FREE'.pad(padLen), global.memory.free.toString());
		console.debug("[ %s ]    %s", 'Memory TOTAL'.pad(padLen), global.memory.total.toString());
		console.debug("[ %s ]    %s", 'LOAD averages'.pad(padLen), global.load.toString());
		console.debug("[ %s ]    %s", 'Platform'.pad(padLen), global.os.platform);
		console.debug("[ %s ]    %s", 'Release'.pad(padLen), global.os.release);
		console.debug("[ %s ]    %s", 'Type'.pad(padLen), global.os.type);
		console.debug("[ %s ]    %s", 'Uptime'.pad(padLen), global.uptime);

		console.debug();
	}

	if(global.settings.DEBUG >= 6)
	{
		//
		console.left('( (User) Environment )', ' - ');

		var userInfo = global.user();

		if(userInfo.homedir !== global.nodejs('os').homedir())
			throw new Error('HomeDirectoryNotMatching');

		console.debug("[ %s ]    %s", 'TEMP directory'.pad(padLen), global.path.temp);
		console.debug("[ %s ]    %s", 'HOME directory'.pad(padLen), global.path.home);
		console.debug("[ %s ]    %s", 'SHELL'.pad(padLen), userInfo.shell);
		console.debug("[ %s ]    %s", 'UID (UserID)'.pad(padLen), userInfo.uid);
		console.debug("[ %s ]    %s", 'GID (GroupID)'.pad(padLen), userInfo.gid);
		console.debug("[ %s ]    %s", 'Username'.pad(padLen), userInfo.username);

		//TODO/ diverse stats/metrics/.. etc. pp.. if wanted (maybe DEBUG *LEVEL* todo??!)
	
		console.debug();
	}

	if(global.settings.DEBUG >= 4)
	{

		if(global.file.readlink)
		{
			//
			console.left('( Process )', ' - ');

			console.debug("[ %s ]    %s", 'process.node'.pad(padLen), global.process.node.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.exec'.pad(padLen), global.process.exec.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.file'.pad(padLen), global.process.file.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.list'.pad(padLen), global.process.list.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.full'.pad(padLen), global.process.full.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.base'.pad(padLen), global.process.base.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.name'.pad(padLen), global.process.name.toString(null, "'"));
			console.debug("[ %s ]    %s", 'process.real'.pad(padLen), global.process.real.toString(null, "'"));

			console.debug();
		}
	}

	if(global.settings.DEBUG >= 2)
	{
		console.left('( Node.js )', ' - ');

		console.debug("[ %s ]    %s", 'process.version'.pad(padLen), global.process.version.toString(null, "'"));

		console.debug();
	}

	if(global.settings.DEBUG >= 1)
	{
		//
		console.left('( Arguments / Parameters )', ' - ');

		for(var i = 0; i < global.process.argv.length; i++)
		{
			console.debug("[ %s ]   %s", ('process.argv[ ' + i.toString() + ' ]').pad(padLen),
				global.process.argv[i]);
		}

		console.debug();
	}

}

console.debug(2, "Loaded 'script'");

