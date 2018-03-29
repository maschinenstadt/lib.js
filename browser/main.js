function init()
{
	var _init = {};

	//
	web.UUID = web.util.uuid.random();

	var _uuid = document.getElementsByName('uuid');
	for(var i = 0; i < _uuid.length; i++)
	{
		_uuid[i].innerHTML = web.UUID;
	}

	web.RANDOM = {};

	web.RANDOM.size = 64;

	web.RANDOM.binary = web.util.random.binary(web.RANDOM.size);
	web.RANDOM.hex = web.util.random.hex(web.RANDOM.size);
	web.RANDOM.base64 = web.util.random.base64(web.RANDOM.size);

	var _random = document.getElementsByName('random');
	for(var i = 0; i < _random.length; i++)
	{
		var str = '<ul><li><b><big>binary</big></b> ' + web.RANDOM.binary + '</li>'
			+ '<li><b><big>hex</big></b> ' + web.RANDOM.hex + '</li>'
			+ '<li><b><big>base64</big></b> ' + web.RANDOM.base64 + '</li></ul>';
		_random[i].innerHTML = str;
	}

	//
	_init.UUID = web.UUID;
	_init.RANDOM = web.RANDOM;

	//
	return _init;
}

function main(_init)
{
	var _main = {};

	//
	return _main;
}

