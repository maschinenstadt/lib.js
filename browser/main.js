function init(_ = {})
{
	var _init = (_||{});

	//
	web.TIME = {};

	web.TIME.second = 0;
	web.TIME.minute = 0;
	web.TIME.hour = 0;
	web.TIME.day = 0;
	web.TIME.week = 0;

	// todo... allerdings durch "Date"-klasse.. anpassung der sekunden an jew. funktion (on.hour == ( s / 60 / 60 ) etc...
	timer.set.timeout(function() { return on.second(web.TIME.second); },	Date.second	);// 1 s(econd) == 1000 m(illiseconds)
	timer.set.timeout(function() { return on.minute(web.TIME.minute); },	Date.minute	);// 1 m(inute) == 60 s(econds)
	timer.set.timeout(function() { return on.hour(web.TIME.hour); },	Date.hour	);// 1 h(our) == 60 m(inutes)
	timer.set.timeout(function() { return on.day(web.TIME.day); },		Date.day	);// 1 d(ay) == 24 h(our)
	timer.set.timeout(function() { return on.week(web.TIME.week); },	Date.week	);// 1 w(eek) == 7 d(ays)

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
		var str = '<hr>'
			+ '<li><b><big>binary</big></b> ' + web.RANDOM.binary + '</li>'
			+ '<li><b><big>hex</big></b> ' + web.RANDOM.hex + '</li>'
			+ '<li><b><big>base64</big></b> ' + web.RANDOM.base64 + '</li>'
			+ '<hr />'
			+ '<li><b><big>(2)</big></b> ' + web.RANDOM[2] + '</li>'
			+ '<li><b><big>(10)</big></b> ' + web.RANDOM[10] + '</li>'
			+ '<li><b><big>(32)</big></b> ' + web.RANDOM[32] + '</li>'
			+ '<hr />';
		_random[i].innerHTML = str;
	}
	web.RANDOM.size = undefined;
	delete web.RANDOM.size;

	//
	_init.UPTIME = web.UPTIME;
	_init.UUID = web.UUID;
	_init.RANDOM = web.RANDOM;

	//
	return _init;
}

function main(_init = {})
{
	var _main = {};

	//
	return _main;
}

