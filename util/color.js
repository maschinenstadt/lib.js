var color = {};

if(BROWSER)
{
	web.util.color = color;
}
else
{
	module.exports = color;
}

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

color.hexToRgb = function(_hexa)
{
	if(_hexa[0] === '#')
	{
		_hexa = _hexa.substr(1);
	}
	
	var r, g, b;

	if(_hexa.length === 3)
	{
		r = parseInt(_hexa[0] + _hexa[0], 16);
		g = parseInt(_hexa[1] + _hexa[1], 16);
		b = parseInt(_hexa[2] + _hexa[2], 16);
	}
	else if(_hexa.length === 6)
	{
		r = parseInt(_hexa.substr(0, 2), 16);
		g = parseInt(_hexa.substr(2, 2), 16);
		b = parseInt(_hexa.substr(4, 2), 16);
	}

	return {
		r, g, b,
		red: r,
		green: g,
		blue: b,
		0: r,
		1: g,
		2: b
	};
}

color.rgbToHex = function(_r, _g, _b, _shorten = true, _withHashSign = true)
{
	if(global.type(_r, 'Number'))
	{
		_r = _r % 256;
	}
	else
	{
		return new Error(global.type(_r));
	}
	if(global.type(_g, 'Number'))
	{
		_g = _g % 256;
	}
	else
	{
		return new Error(global.type(_g));
	}
	if(global.type(_b, 'Number'))
	{
		_b = _b % 256;
	}
	else
	{
		return new Error(global.type(_b));
	}

	var r = Math.round(_r).toString(16).pad(2, '0');
	var g = Math.round(_g).toString(16).pad(2, '0');
	var b = Math.round(_b).toString(16).pad(2, '0');

	if(_shorten)
	{
		if(r[0] === '0' && g[0] === '0' && b[0] === '0')
		{
			r = r.substr(1);
			g = g.substr(1);
			b = b.substr(1);
		}
	}

	var result = r + g + b;

	if(_withHashSign)
	{
		result = '#' + result;
	}

	return result;
}

color.rgbToHex.array = function(_rgb, _shorten = true, _withHashSign = true)
{
	if(! global.type(_rgb, 'Array'))
	{
		return new Error(global.type(_rgb));
	}
	else if(global.not(_rgb))
	{
		return new Error();
	}

	_rgb[_rgb.length] = _shorten;
	_rgb[_rgb.length] = _withHashSign;

	return color.rgbToHex.apply(this, _rgb);
}

