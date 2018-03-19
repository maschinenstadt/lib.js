var getopt = module.exports = {};

getopt.argv = function(_argv = [])
{
	return ( global.process.args = getopt.parse(_argv) );
}

getopt.parse = function(_argvOrLine)
{
	var argv;

	if(global.type(_argvOrLine, 'String'))
	{
		argv = getopt.parse.cmdline(_argvOrLine);
	}
	else if(global.type(_argvOrLine, 'Array'))
	{
		argv = _argvOrLine;

		if(! argv.only('String'))
		{
			return new Error(argv.length);
		}
	}
	else
	{
		return new Error();
	}

	return getopt.parse.array(argv);
}

getopt.parse.cmdline = function(_string = '')
{
	var result = [];

	//TODO/

	return result;
}

getopt.parse.array = function(_array = [])
{
	var result = {};

	//TODO/
	
	return result;
}

