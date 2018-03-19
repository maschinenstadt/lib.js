var main = module.exports = {};

global.process.isRoot = function()
{
	return ( global.process.getuid() === 0 || global.process.geteuid() === 0 );
}

global.process.hasRoot = function()
{
	return ( global.process.getgid() === 0 || global.process.getegid() === 0 );
}

global.process.stdio = [
	global.process.stdin,
	global.process.stdout,
	global.process.stderr
];

global.process.node = global.process.argv.shift();

global.process.exec = global.process.argv.shift();
global.process.file = global.process.argv.shift() || '';

main.paths = [];

if(global.process.file.length === 0)
{
	global.process.name = global.nodejs.path.basename(global.nodejs.path.basename(global.process.exec, '.js'), '.json');
}
else
{
	main.paths[main.paths.length] = global.nodejs.path.dirname(global.nodejs.path.resolve(global.process.file));
	global.process.name = global.nodejs.path.basename(global.nodejs.path.basename(global.process.file, '.js'), '.json');
}

global.process.list = []; // resolved symlinks for this process in a list ..!!
global.process.full = '';
global.process.base = [];
global.process.real = '';
global.process.name = '';

console.debug(2, "Loaded 'process'");

