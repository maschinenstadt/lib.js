var utf8math = {};

// < https://gist.github.com/pascaldekloe/62546103a1576803dade9269ccf76330 >
// < https://gist.github.com/joni/3760795 >
// ... which is better?!?

if(BROWSER)
{
	web.util.utf8math = utf8math;
}
else
{
	module.exports = utf8math;
}

// marhshals a string to 'Uint8Array'
utf8math.encode = utf8math.fromString = utf8math.toBytes = utf8math.toArray = function(_string)
{
	var i = 0;
	var bytes = new Uint8Array(_string.length * 4);

	for(var ci = 0; ci != s.length; ci++)
	{
		var c = _string.charCodeAt(ci);

		if(c < 128)
		{
			bytes[i++] = c;
			continue;
		}

		if(c < 2048)
		{
			bytes[i++] = c >> 6 | 192;
		}
		else
		{
			if(c > 0xd7ff && c < 0xdc00)
			{
				if(++ci == s.length)
				{
					return new Error('UTF-8.encode: incomplete surrogate pair');
				}

				var c2 = _string.charCodeAt(ci);

				if(c2 < 0xdc00 || c2 > 0xdfff)
				{
					return new Error('UTF-8.encode: second char code 0x' + c2.toString(16)
						+ ' at index ' + ci + ' in surrogate pair OUT OF RANGE');
				}

				c = 0x10000 + ((c & 0x03ff) << 10) + (c2 & 0x03ff);

				bytes[i++] = c >> 18 | 240;
				bytes[i++] = c >> 12 & 63 | 128;
			}
			else
			{
				bytes[i++] = c >> 12 | 224;
			}

			bytes[i++] = c >> 6 & 63 | 128;
		}

		bytes[i++] = c & 63 | 128;
	}

	return bytes.subarray(0, i);
}

// unmarshals an 'Uint8Array' to string.
utf8math.decode = utf8math.toString = utf8math.fromBytes = utf8math.fromArray = function(_bytes)
{
	var s = '';
	var i = 0;

	while(i < _bytes.length)
	{
		var c = _bytes[i++];

		if(c > 127)
		{
			if(c > 191 && c < 224)
			{
				if(i >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 2-byte sequence');
				}

				c = (c & 31) << 6 | _bytes[i] & 63;
			}
			else if(c > 223 && c < 240)
			{
				if(i + 1 >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 3-byte sequence');
				}

				c = (c & 15) << 12 | (_bytes[i] & 63) << 6 | bytes[++i] & 63;
			}
			else if(c > 239 && c < 248)
			{
				if(i + 2 >= _bytes.length)
				{
					return new Error('UTF-8.decode: incomplete 4-byte sequence');
				}

				c = (c & 7) << 18 | (_bytes[i] & 63) << 12 | (_bytes[++i] & 63) << 6 | _bytes[++i] & 63;
			}
			else
			{
				return new Error('UTF-8.decode: unknown multibyte start 0x' + c.toString(16)
					+ ' at index ' + (i - 1));
			}

			++i;
		}

		if(c <= 0xffff)
		{
			s += String.fromCharCode(c);
		}
		else if(c <= 0x10ffff)
		{
			c -= 0x10000;
			s += String.fromCharCode(c >> 10 | 0xd800);
			s += String.fromCharCode(c & 0x3FF | 0xdc00);
		}
		else
		{
			return new Error('UTF-8.decode: code point 0x' + c.toString(16) + ' exceeds UTF-16 reach');
		}
	}

	return s;
}

utf8math.encode2 = utf8math.fromString2 = utf8math.toBytes2 = utf8math.toArray2 = function(_string)
{
	var utf = [];

	for(var i = 0; i < _string.length; i++)
	{
		var charcode = _string.charCodeAt(i);

		if(charcode < 0x80)
		{
			utf.push(charcode);
		}
		else if(charcode < 0x800)
		{
			utf.push(0xc0 | (charcode >> 6),
				0x80 | (charcode & 0x3f));
		}
		else if(charcode < 0xd800 || charcode >= 0xe000)
		{
			utf.push(0xe0 | (charcode >> 12),
				0x80 | ((charcode >> 6) & 0x3f),
				0x80 | (charcode & 0x3f));
		}
		// surrogate pair
		else
		{
			i++;
			// UTF-16 encodes 0x10000 - 0x10FFFF by
			// subtracting 0x10000 and splitting the
			// 20 bits of 0x0 - 0xFFFFF into two halves
			charcode = 0x10000 + (((charcode & 0x3ff)<<10)
				| (_string.charCodeAt(i) & 0x3ff));

			utf.push(0xf0 | (charcode >> 18),
				0x80 | ((charcode >> 12) & 0x3f),
				0x80 | ((charcode >> 6) & 0x3f),
				0x80 | (charcode & 0x3f));
		}
	}

	return utf;
}

utf8math.decode2 = utf8math.toString2 = utf8math.fromBytes2 = utf8math.fromArray2 = function(_bytes)
{
	var str = '';
	var i;

	for(i = 0; i < _bytes.length; i++)
	{
		var value = _bytes[i];

		if(value < 0x80)
		{
			str += String.fromCharCode(value);
		}
		else if(value > 0xBF && value < 0xE0)
		{
			str += String.fromCharCode((value & 0x1F) << 6
				| _bytes[i + 1] & 0x3F);
			i += 1;
		}
		else if(value > 0xDF && value < 0xF0)
		{
			str += String.fromCharCode((value & 0x0F) << 12
				| (_bytes[i + 1] & 0x3F) << 6
				| _bytes[i + 2] & 0x3F);
			i += 2;
		}
		else
		{
			// surrogate pair
			var charCode = ((value & 0x07) << 18
				| (_bytes[i + 1] & 0x3F) << 12
				| (_bytes[i + 2] & 0x3F) << 6
				| _bytes[i + 3] & 0x3F) - 0x010000;

			str += String.fromCharCode(charCode >> 10 | 0xD800, charCode & 0x03FF | 0xDC00);
			i += 3;
		}
	}

	return str;
}

