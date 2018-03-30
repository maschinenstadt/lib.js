var random = {};

//
random.length = 1024;

random.radix = 2;

random.radix_min = Number.radix.min;
random.radix_max = Number.base.max;

random.encoding = [ 'binary', 'hex', 'base64', 'dual', 'decimal' ];

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

	random.randomData = function(_length = random.length, _encoding = random.encoding[0])
	{
		if(not(crypto) || not(crypto.getRandomValues))
		{
			//TODO!!?
			//NOW: using "return _error". better for now.. (check if worx in browser, maybe @ onload-catch?
			//
			//.. or should i GLOBALLY use the WEB.CONSOLE(S)!?!?!!?

			throw new Error("window.crypto");
		}

		if(! type(_length, 'Number'))
		{
			_length = random.length;
		}

		var encType = type(_encoding);

		if(encType === 'Number')
		{
			if(_encoding < random.radix_min || _encoding > random.radix_max)
			{
				_encoding = random.radix || 2;
			}
		}
		else if(encType !== 'String')
		{
			_encoding = random.encoding[0];
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

	random.radix = function(_length = random.length, _radix = (random.radix || 2))
	{
		if(global.type(_radix, 'Number'))
		{
			if(_radix < random.radix_min || _radix > random.radix_max)
			{
				_radix = random.radix || 2;
			}
		}
		else
		{
			_radix = random.radix || 2;
		}

		return random.randomData(_length, _radix);
	}
}
else
{
	/* UPDATE
	 *
	 * Bislang war das allein für Linux basierende OS, da "/dev/urandom" genutzt worden war.
	 *
	 * JETZT nutze ich das weiterhin (ob's besser ist als folgendes weiß ich atm nicht! ...)
	 * selbiges. Falls diese Datei aber nicht existiert, so verwende ich das "crypto"-Modul,
	 * um auch für andere OS bereit zu stehen! ;-)´
	 */

	var entropy = global.settings.random;

	if(global.not(entropy))
	{
		throw new Error(global.type(entropy));
	}

	for(var i = 0; i < entropy.length; i++)
	{
		var p = global.file.path(entropy[i]);

		if(global.file.exists(p))
		{
			entropy = p;
			break;
		}
	}

	var crypto = global.not(entropy);

	//
	random.randomData = function(_length = random.length, _encoding = false)
	{
		if(global.type(_length, 'Number'))
		{
			if(_length < 1)
			{
				_length = random.length;
			}
		}
		else
		{
			_length = random.length;
		}

		if(global.type(_encoding, 'Boolean'))
		{
			if(_encoding)
			{
				_encoding = random.encoding[0];
			}
		}
		else if(! global.type(_encoding, 'String'))
		{
			_encoding = random.encoding[0];
		}

remove warnings //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(crypto)
		{
			console.warning('WITH crypto');
		}
		else
		{
			console.warning('WITH*OUT* crypto');
		}
remove warnings ////////////////////////////////////////////////////////////////////////////////////////////////////

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

	random.radix = function(_length = random.length, _radix = (random.radix || 2))
	{
		if(global.type(_radix, 'Number'))
		{
			if(_radix < random.radix_min || _radix > random.radix_max)
			{
				_radix = random.radix || 2;
			}
		}
		else
		{
			_radix = random.radix || 2;
		}

		return random.randomData(_length, _radix);
	}
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

