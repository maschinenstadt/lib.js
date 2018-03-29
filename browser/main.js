function init()
{
	var _init = {};

	//
	UUID = _init.UUID = web.util.uuid.random();
	var _uuid = document.getElementsByName('uuid');
	for(var i = 0; i < _uuid.length; i++)
	{
		_uuid.innerHTML = _init.UUID;
	}

	//
	return _init;
}

function main(_init)
{
	var _main = {};

	// _init.UUID
	
	//
	return _main;
}

