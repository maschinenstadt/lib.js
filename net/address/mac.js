var mac = module.exports = {};

mac.radix = 16;
mac.scheme = [ 2, 2, 2, 2, 2, 2 ];
mac.separator = ':' || '-';

mac.random = function(_radix = mac.radix, _separator = mac.separator, _upperCase = false)
{
	if(global.type(_radix, 'Number'))
	{
		if(_radix < Number.radix.min || _radix > Number.base.max)
		{
			return new Error(Number.base.min + ' .. ' + Number.radix.max);
		}
	}
	else
	{
		_radix = mac.radix;
	}
	if(! global.type(_separator, 'String'))
	{
		_separator = mac.separator;
	}
	if(! global.type(_upperCase, 'Boolean'))
	{
		_upperCase = false;
	}

	var characters = String.alphabet[_radix];
	if(_upperCase) characters = characters.toUpperCase();
	characters = characters.split('');

	var result = '';

	for(var i = 0; i < mac.scheme.length; i++)
	{
		for(var j = 0; j < mac.scheme[i]; j++)
		{
			result += characters[Math.floor(Math.random() * characters.length)];
		}

		result += mac.separator;
	}

	return result.substr(0, result.length - mac.separator.length);
}

mac.isValid = function(_address)
{
	//TODO/
	//(w/ *both* possible separators (':' and '-')
	//
}

