var uuid = module.exports = {};

uuid.scheme = [ 8, 4, 4, 4, 12 ];
//uuid.length = 36;
uuid.separator = '-';

uuid.random = function(_radix = 16, _upperCase = false)
{
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
