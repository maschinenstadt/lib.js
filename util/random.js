var random = {};

if(BROWSER)
{
	web.util.random = random;

	//
	random.length = settings.random.length || 64;
	random.encoding = settings.random.encoding || 'decimal';
	random.radix = settings.random.radix || 2;
}
else
{
	module.exports = random;

	//
	random.length = global.settings.random.length || 64;

	random.radix = global.settings.random.radix || 2;
	random.encoding = global.settings.random.encoding || 'decimal';

	random.entropy = global.settings.random.entropy || '/dev/urandom';
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
				_encoding = random.encoding;
			}
		}
		
		if(encType === 'Number')
		{
			if(_encoding < Number.radix.min || _encoding > Number.radix.max)
			{
				return new Error(Number.base.min + ' .. ' + Number.base.max);
			}
		}

		var result = '';
		var iterations = 0;

		while(result.length < _length)
		{
			iterations++;

			var str = '';
			var buffer = new Uint8Array(_length);

			crypto.getRandomValues(buffer);

			if(_encoding === false)
			{
				return buffer;
			}

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
						case 'latin1':

							str += String.fromCharCode(buffer[i]);
							break;

						default:
							return '';
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
}
else
{
	var p = global.file.path(random.entropy);
	var crypto;

	if(global.file.exists(p))
	{
		if(global.file.type.character(p))
		{
			crypto = false;
		}
		else if(global.file.type.symlink(p))
		{
			var readLink = global.file.readlink.all.resolve(p);

			if(global.file.type.character(readLink))
			{
				crypto = false;
			}
			else
			{
				crypto = true;
			}
		}
	}
	else
	{
		crypto = true;
	}

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

		//
		var buffer = global.file.readBytes(p, _length, false);
		return buffer;
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

		var buffer = new Buffer(_length);

		//
		this.crypto = global.nodejs('crypto');
		this.crypto.randomFillSync(buffer, 0, _length);

		//
		return buffer;
	}

	//
	random.randomData = function(_length = random.length, _encoding = false)
	{
		if(global.type(_encoding, 'Boolean'))
		{
			if(_encoding)
			{
				_encoding = random.encoding;
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
			_encoding = random.encoding;
		}

		var result = '';
		var iterations = 0;

		while(result.length < _length)
		{
			iterations++;

			var str = '';
			var buffer;

			if(crypto)
			{
				buffer = randomCrypto(_length);
			}
			else
			{
				buffer = randomDevice(_length);
			}

			if(global.type(_encoding, 'Boolean'))
			{
				if(_encoding)
				{
					_encoding = random.encoding;
				}
				else if(buffer.length === _length)
				{
					return buffer;
				}
			}

			if(global.type(_encoding, 'Number'))
			{
				if(_encoding < Number.radix.min || _encoding > Number.radix.max)
				{
					return new Error(Number.base.min + ' .. ' + Number.base.max);
				}

				for(var i = 0; i < buffer.length; i++)
				{
					str += buffer[i].toString(_encoding);
				}
			}
			
			if(global.type(_encoding, 'String'))
			{
				var done = false;

				switch(_encoding)
				{
					case 'hex':

					case 'base64':

					case 'binary':
					case 'latin1':

					case 'utf8':

					case 'utf16le':
					case 'ucs2':

					case 'ascii':

						str += buffer.toString(_encoding);
						done = true;
						break;
				}

				if(! done)
				{
					for(var i = 0; i < buffer.length; i++)
					{

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
						}
					}
				}
			}

			result += str;
		}

		return result.substr(0, _length);
	}
}

random.buffer = function(_length = random.length)
{
	return random.randomData(_length, false);
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

random.octal = function(_length = random.length)
{
	return random.randomData(_length, 'octal');
}

random.decimal = function(_length = random.length)
{
	return random.randomData(_length, 'decimal');
}

random.dual = function(_length = random.length)
{
	return random.randomData(_length, 'dual');
}

random.base64 = function(_length = random.length)
{
	return random.randomData(_length, 'base64');
}

random.hex = function(_length = random.length)
{
	return random.randomData(_length, 'hex');
}

random.utf8 = function(_length = random.length)
{
	return random.randomData(_length, 'utf8');
}

random.utf16le = function(_length = random.length)
{
	return random.randomData(_length, 'utf16le');
}

random.ucs2 = function(_length = random.length)
{
	return random.randomData(_length, 'ucs2');
}

random.binary = function(_length = random.length)
{
	return random.randomData(_length, 'binary');
}

random.latin1 = function(_length = random.length)
{
	return random.randomData(_length, 'latin1');
}

random.ascii = function(_length = random.length)
{
	return random.randomData(_length, 'ascii');
}




//random.random = function //TODO: NERALY same as Math.random' *original*!
