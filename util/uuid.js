var uuid = {};

if(BROWSER)
{
	web.util.uuid = uuid;
}
else
{
	module.exports = uuid;
}

uuid.radix = 16;
uuid.scheme = [ 8, 4, 4, 4, 12 ];
uuid.separator = '-';

uuid.random = function(_radix = uuid.radix, _upperCase = false)
{
	if(global.type(_radix, 'Number'))
	{
		if(_radix < Number.radix.min || _radix > Number.radix.max)
		{
			return new Error(Number.radix.min + ' .. ' + Number.radix.max);
		}
	}
	else
	{
		_radix = uuid.radix;
	}
	if(! global.type(_upperCase, 'Boolean'))
	{
		_upperCase = false;
	}

	var characters = String.alphabet[_radix];
	if(_upperCase) characters = characters.toUpperCase();
	characters = characters.split('');

	var result = '';

	for(var i = 0; i < uuid.scheme.length; i++)
	{
		for(var j = 0; j < uuid.scheme[i]; j++)
		{
			result += characters[Math.floor(Math.random() * characters.length)];
		}

		result += uuid.separator;
	}

	return result.substr(0, result.length - uuid.separator.length);
}

