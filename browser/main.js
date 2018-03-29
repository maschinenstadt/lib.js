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
	web.RANDOM[2] = web.util.random.radix(web.RANDOM.size, 2);
	web.RANDOM[10] = web.util.random.radix(web.RANDOM.size, 10);
	web.RANDOM[32] = web.util.random.radix(web.RANDOM.size, 32);

	var _random_size = document.getElementsByName('random_size');
	for(var i = 0; i < _random_size.length; i++)
	{
		_random_size[i].innerHTML = web.RANDOM.size.toString();
	}
	var _random = document.getElementsByName('random');
	for(var i = 0; i < _random.length; i++)
	{
		var str = '<li><b><big>binary</big></b> ' + web.RANDOM.binary + '</li>'
			+ '<li><b><big>hex</big></b> ' + web.RANDOM.hex + '</li>'
			+ '<li><b><big>base64</big></b> ' + web.RANDOM.base64 + '</li>'
			+ '<li><b><big>(2)</big></b> ' + web.RANDOM[2] + '</li>'
			+ '<li><b><big>(10)</big></b> ' + web.RANDOM[10] + '</li>'
			+ '<li><b><big>(32)</big></b> ' + web.RANDOM[32] + '</li>'
			+ '<br />';
		_random[i].innerHTML = str;
	}
	web.RANDOM.size = undefined;
	delete web.RANDOM.size;

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

