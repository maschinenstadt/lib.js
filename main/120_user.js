var main = module.exports = {};

global.user = function(_encoding)
{
	return global.nodejs('os').userInfo({encoding: (_encoding||settings.encoding)});
}

global.user.name = function(_encoding)
{
	return global.user(_encoding).username;
}

global.user.uid = function(_encoding)
{
	return global.user(_encoding).uid;
}

global.user.gid = function(_encoding)
{
	return global.user(_encoding).gid;
}

global.user.shell = function(_encoding)
{
	return global.user(_encoding).shell;
}

global.user.home = function(_encoding)
{
	return global.user(_encoding).homedir;
}

console.debug(2, "Loaded 'user'");

