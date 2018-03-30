var random = {};

//
random.length = global.settings.random.length || 64;

random.radix = global.settings.random.radix || 2;
random.encoding = global.settings.random.encoding || 0;

random.encodings = global.settings.random.encodings;	// [ 'binary', 'hex', 'base64', 'dual', 'decimal' ];
random.entropy = global.settings.random.entropy;	// '/dev/urandom'

//
if(BROWSER)
{
	web.util.random = random;
}
else
{
	module.exports = random;
}

//
if(BROWSER)
{
	var crypto = window.crypto || window.msCrypto;

	random.randomData = function(_length = random.length, _encoding = false)
	{
		if(not(crypto) || not(crypto.getRandomValues))
		{
			//TODO!!?
			//NOW: using "return _error". better for now.. (check if worx in browser, maybe @ onload-catch?
			//
			//.. or should i GLOBALLY use the WEB.CONSOLE(S)!?!?!!?

			throw new Error("window.crypto");
		}

		if(type(_length, 'Number'))
		{
			if(_length < 1)
			{
				return new Error('_length < 1 (' + _length + ')');
			}
		}
		else
		{
			_length = random.length;
		}

		var encType = type(_encoding);

		if(encType === 'Boolean')
		{
			if(_encoding)
			{
				_encoding = random.encodings[random.encoding];
			}
		}
		else if(encType === 'Number')
		{
			if(_encoding < Number.radix.min || _encoding > Number.radix.max)
			{
				return new Error(Number.base.min + ' .. ' + Number.base.max);
			}
		}
		else if(encType !== 'String')
		{
			_encoding = random.encodings[random.encoding];
		}

		var result = '';
		var iterations = 0;

		while(result.length < _length)
		{
			iterations++;

			var str = '';
			var buffer = new Uint8Array(_length);

			crypto.getRandomValues(buffer);

			for(var i = 0; i < buffer.length; i++)
			{
				if(encType === 'Number')
				{
					// various systems (default js)

					str += buffer[i].toString(_encoding);
				}
				else if(encType === 'String')
				{
					// my own '_encoding's

					switch(_encoding)
					{
						case 'dual':
						case 'bits':
						case 'bit':

							str += buffer[i].toString(2);
							break;

						case 'octal':
						case 'oct':

							str += buffer[i].toString(8);
							break;

						case 'decimal':
						case 'dec':

							str += buffer[i].toString(10);
							break;

						case 'hex':
						case 'hexa':
						case 'hexadecimal':

							str += buffer[i].toString(16);
							break;

						case 'base64':
						case 'binary':

							str += String.fromCharCode(buffer[i]);
					}
				}
			}

			if(_encoding === 'base64')
			{
				str = window.btoa(str);
			}

			result += str;
		}

		if(iterations !== 1)
		{
			var errMessage = '"util/random": random() iterations not equal (1)! CHECK THIS!';
			return new Error(errMessage); // or throw!?? must be catch'ed .. maybe @ window.onload..
		}

		return result.substr(0, _length);

		//TODO/
		//if(_encoding === false)
		//	return buffer; ..


	}
}
else
{
	var p = global.file.path(random.entropy);
	var crypto = global.not(p) || (!global.file.exists(p)) || (!global.file.type.file(p));

	function randomDevice(_length = random.length)
	{
		if(global.type(_length, 'Number'))
		{
			if(_length < 1)
			{
				return new Error('_length < 1 (' + _length + ')');
			}
		}
		else
		{
			_length = random.length;
		}
	}

	function randomCrypto(_length = random.length)
	{
		if(global.type(_length, 'Number'))
		{
			if(_length < 1)
			{
				return new Error('_length < 1 (' + _length + ')');
			}
		}
		else
		{
			_length = random.length;
		}
	}

	//
	random.randomData = function(_length = random.length, _encoding = false)
	{
		if(global.type(_encoding, 'Boolean'))
		{
			if(_encoding)
			{
				_encoding = random.encodings[random.encoding];
			}
		}
		else if(global.type(_encoding, 'Number'))
		{
			if(_encoding < Number.radix.min || _encoding > Number.radix.max)
			{
				return new Error(Number.base.min + ' .. ' + Number.base.max);
			}
		}
		else if(! global.type(_encoding, 'String'))
		{
			_encoding = random.encodings[random.encoding];
		}

		var result; // maybe not here (following "if+else")?!??
		var buffer = new Buffer(_length);	// o.k.?

		if(crypto)
		{
			result = randomCrypto(_length, buffer);
		}
		else
		{
			result = randomCrypto(_length, buffer);
		}
	}
}

random.binary = function(_length = random.length)
{
	return random.randomData(_length, 'binary');
}

random.hex = function(_length = random.length)
{
	return random.randomData(_length, 'hex');
}

random.base64 = function(_length = random.length)
{
	return random.randomData(_length, 'base64');
}

random.dual = function(_length = random.length)
{
	return random.randomData(_length, 'dual');
}

random.decimal = function(_length = random.length)
{
	return random.randomData(_length, 'decimal');
}

random.octal = function(_length = random.length)
{
	return random.randomData(_length, 'octal');
}

random.radix = function(_length = random.length, _radix = (random.radix || 2))
{
	if(global.type(_radix, 'Number'))
	{
		if(_radix < Number.radix.min || _radix > Number.radix.max)
		{
			return new Error(Number.base.min + ' .. ' + Number.base.max);
		}
	}
	else
	{
		_radix = random.radix || 2;
	}

	return random.randomData(_length, _radix);
}





//random.random = function //TODO: NERALY same as Math.random' *original*!








/*


////////
//if !encoding =>  return buffer
//////////

	Object.defineProperty(random, 'random', {
		value: function(_length = random.length, _encoding = random.encoding[0])
		{
			if(random.entropy)
			{
			}
		}
	});




	random.random = function(_length = random.length, _encoding = random.encoding[0])

	if(random.entropy)
	{
		Object.defineProperty(random, 'random', {
			value: function(
		random = Object.assign(random, randomFile(random.entropy));
	}
	else
	{
		random = Object.assign(random, randomCrypto(random.crypto));
	}
}


	//TODO/
	// (a) 'binary', 'hex', 'base64'
	// (b) ( 2 .. 36 )




	//TODO/ ALSO "_radix" (>=2 && <= 36)! .. see BROWSER impl. (above)!


function randomDevice(_length = random.length, _path = global.settings.random[0])
{
	if(! global.type(_length, 'Number'))
	{
		_length = random.length;
	}
	if(! global.type(_path, 'String'))
	{
		_path = global.settings.random[0];
	}

	if(! global.file.exists(_path))
	{
		return new Error(_path);
	}
}

function randomCrypto(_length = random.length, _crypto = global.nodejs('crypto'))
{
	if(! global.type(_length, 'Number'))
	{
		_length = random.length;
	}
	if(! global.type(_crypto, 'Function'))
	{
		_crypto = global.nodejs('crypto');
	}
}







	random.random = function(_length = random.length, _encoding = random.encoding[0])
	{
		if(! global.type(_length, 'Number'))
		{
			_length = random.length;
		}
		if(! global.type(_encoding, 'String'))
		{
			_encoding = random.encoding[0];
		}

		// Don't forget to shorten/pad result, by _encoding (producing various lengths)
		var result = '';

		// this 'while' is just to be sure... regularily it should work in once (see the "iterations" number variable..)
		var iterations = 0
		while(result.length < _length)
		{
			iterations++;

			switch(_encoding)
			{
				case 'hex':
					result += global.file.readBytes.hex(random.crypto, _length);
					break;
				case 'base64':
					result += global.file.readBytes.base64(random.crypto, _length);
					break;
				case 'binary':
				default:
					result += global.file.readBytes.binary(random.crypto, _length);
			}
		}

		if(iterations !== 1)
		{
			console.warning('"util/random": random() iterations not equal (1)! CHECK THIS!');
		}

		// SHOULD REGULARILY ALSO result in wished _length .. see "global.file.readBytes()" ;-)´
		//if(result.length > _length)
		//{
		//	result = result.substr(0, _length);
		//}
		//
		return result;
	}

	random.binary = function(_length = random.length)
	{
		return random.random(_length, 'binary');
	}

	random.hex = function(_length = random.length)
	{
		return random.random(_length, 'hex');
	}

	random.base64 = function(_length = random.length)
	{
		return random.random(_length, 'base64');
	}

	module.exports = random;
}

*/

