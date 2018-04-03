var port = module.exports = {};

port.min = port.minimum = 0;
port.max = port.maximum = 65535;

port.random = function(_max = port.max, _min = port.min)
{
	if(global.type(_max, 'Number'))
	{
		if(_max > port.max || _max < port.min)
		{
			return new Error(port.min + ' .. ' + port.max);
		}
	}
	else
	{
		_max = port.max;
	}
	if(global.type(_min, 'Number'))
	{
		if(_min > port.max || _min < port.min)
		{
			return new Error(port.min + ' .. ' + port.max);
		}
	}
	else
	{
		_min = port.min;
	}

	return Math.random.integer(_max, _min);
}

port.isValid = function(_port)
{
	if(_port >= port.min && _port <= port.max)
	{
		return true;
	}

	return false;
}

