var color = module.exports = {};

color.random = function(_upperCase = false, _radix = 16, _amount = 6, _hash_sign = true)
{
	var characters = String.alphabet[_radix];
	if(_upperCase) characters = characters.toUpperCase();
	characters = characters.split('');

	var result = (_hash_sign ? '#' : '');

	for(var i = 0; i < _amount; i++)
	{
		result += characters[Math.floor(Math.random() * characters.length)];
	}

	return result;
}

