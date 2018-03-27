var ansi = module.exports = {};

// "doc/txt/ANSI.txt"

ansi.ESC = global.ESC || String.fromCharCode(27); // \033
ansi.BRACKET = String.fromCharCode(91);
ansi.END = 'm';

function write(_code, _write = global.console.stream)
{
	if(! global.type(_code, 'String'))
	{
		return new Error(global.type(_code));
	}
	if(global.type(_write, 'Boolean'))
	{
		if(_write)
		{
			_write = global.console.stream;
		}
	}
	else if(! global.type(_write, ['Object','Function']))
	{
		_write = global.console.stream;
	}

	if(_write)
	{
		_write.write(_code);
	}

	return _code;
}

ansi.none = function()
{
	return write(ansi.ESC + ansi.BRACKET + '0m');
}

ansi.color = function(_text = global.EOL, _foreground = 37, _background = 40, _attribute = 0, _write = global.console.stream)
{
	if(! global.type(_text, 'String'))
	{
		_text = global.EOL;
	}

	if(global.type(_write, 'Boolean'))
	{
		if(_write)
		{
			_write = global.console.stream;
		}
	}
	else if(! global.type(_write, ['Object','Function']))
	{
		_write = global.console.stream;
	}

	if(global.type(_foreground, 'String'))
	{
		_foreground = ansi.color[_foreground].fg;
	}
	else if(! global.type(_foreground, 'Number'))
	{
		_foreground = ansi.color.white.fg;
	}

	if(global.type(_background, 'String'))
	{
		_background = ansi.color[_background].bg;
	}
	else if(! global.type(_background, 'Number'))
	{
		_background = ansi.color.black.bg;
	}

	if(global.type(_attribute, 'String'))
	{
		_attribute = ansi.attribute[_attribute];
	}
	else if(! global.type(_background, 'Number'))
	{
		_attribute = ansi.attribute.none;
	}

	var code = ansi.ESC + ansi.BRACKET + _attribute.toString() + ';' + _foreground.toString() + ';' + _background.toString() + 'm';
	return write(code, _write);
}

ansi.color.black = { fg: 30, bg: 40 };
ansi.color.red = { fg: 31, bg: 41 };
ansi.color.green = { fg: 32, bg: 42 };
ansi.color.yellow = { fg: 33, bg: 43 };
ansi.color.blue = { fg: 34, bg: 44 };
ansi.color.magenta = { fg: 35, bg: 45 };
ansi.color.cyan = { fg: 36, bg: 46 };
ansi.color.white = { fg: 37, bg: 47 };

ansi.attribute = {
	none: 0,
	bold: 1,
	dark: 2,
	italic: 3,
	underline: 4,
	blinking: 5,
	/* : 6, */
	inverse: 7,
	invisible: 8,
	linethrough: 9
};

ansi.cursor = function(_x = 0, _y = 0, _width = global.console.size.width, _height = global.console.size.height)
{
	if(! global.type(_x, 'Number'))
	{
		_x = 0;
	}
	if(! global.type(_y, 'Number'))
	{
		_y = 0;
	}
	if(! global.type(_width, 'Number'))
	{
		_width = global.console.size.width;
	}
	if(! global.type(_height, 'Number'))
	{
		_height = global.console.size.height;
	}

	var line = ( ( _y < 0 ? _height + _y : _y ) % _height ) + 1;
	var column = ( ( _x < 0 ? _width + _x : _x ) % _width ) + 1;

	//
}

ansi.hex2esc = function(_color)
{
	_color = strip_hash(_color);
	return rgb2esc(
		parseInt(_color.charAt(0) + _color.charAt(1), 16),
		parseInt(_color.charAt(2) + _color.charAt(3), 16),
		parseInt(_color.charAt(4) + _color.charAt(5), 16)
	);
}

ansi.rgb2esc = function(_red, _green, _blue)
{
	var incs = [ 0x00, 0x5f, 0x87, 0xaf, 0xd7, 0xff ];
	var result = [];

	[_red, _green, _blue].forEach(function(_part)
	{
		var i = 0;
		var closest = 0;

		while(i < incs.length - 1)
		{
			var s = incs[i];
			var b = incs[i+1];

			if((s <= _part) && (_part <= b))
			{
				var s1 = Math.abs(s - _part);
				var b1 = Math.abs(b - _part);

				if(s1 < b1)
				{
					closest = s;
				}
				else
				{
					closest = b;
				}

				result[result.length] = closest;
				break;
			}

			i++;
		}
	});

	return CLUT[result.map(function(_e1)
	{
		var newNumber = _e1.toString(16);

		if(newNumber.length < 2)
		{
			newNumber = 0 + newNumber;
		}

		return newNumber;
	}
	).join('')];
}

// 
// < https://github.com/michalbe/rgb2xterm >
//
var CLUT = {

  '000000': '00',
  '800000': '01',
  '008000': '02',
  '808000': '03',
  '000080': '04',
  '800080': '05',
  '008080': '06',
  'c0c0c0': '07',
  '808080': '08',
  'ff0000': '09',
  '00ff00': '10',
  'ffff00': '11',
  '0000ff': '12',
  'ff00ff': '13',
  '00ffff': '14',
  'ffffff': '15',
  //'000000': '16',
  '00005f': '17',
  '000087': '18',
  '0000af': '19',
  '0000d7': '20',
  //'0000ff': '21',
  '005f00': '22',
  '005f5f': '23',
  '005f87': '24',
  '005faf': '25',
  '005fd7': '26',
  '005fff': '27',
  '008700': '28',
  '00875f': '29',
  '008787': '30',
  '0087af': '31',
  '0087d7': '32',
  '0087ff': '33',
  '00af00': '34',
  '00af5f': '35',
  '00af87': '36',
  '00afaf': '37',
  '00afd7': '38',
  '00afff': '39',
  '00d700': '40',
  '00d75f': '41',
  '00d787': '42',
  '00d7af': '43',
  '00d7d7': '44',
  '00d7ff': '45',
  //'00ff00': '46',
  '00ff5f': '47',
  '00ff87': '48',
  '00ffaf': '49',
  '00ffd7': '50',
  //'00ffff': '51',
  '5f0000': '52',
  '5f005f': '53',
  '5f0087': '54',
  '5f00af': '55',
  '5f00d7': '56',
  '5f00ff': '57',
  '5f5f00': '58',
  '5f5f5f': '59',
  '5f5f87': '60',
  '5f5faf': '61',
  '5f5fd7': '62',
  '5f5fff': '63',
  '5f8700': '64',
  '5f875f': '65',
  '5f8787': '66',
  '5f87af': '67',
  '5f87d7': '68',
  '5f87ff': '69',
  '5faf00': '70',
  '5faf5f': '71',
  '5faf87': '72',
  '5fafaf': '73',
  '5fafd7': '74',
  '5fafff': '75',
  '5fd700': '76',
  '5fd75f': '77',
  '5fd787': '78',
  '5fd7af': '79',
  '5fd7d7': '80',
  '5fd7ff': '81',
  '5fff00': '82',
  '5fff5f': '83',
  '5fff87': '84',
  '5fffaf': '85',
  '5fffd7': '86',
  '5fffff': '87',
  '870000': '88',
  '87005f': '89',
  '870087': '90',
  '8700af': '91',
  '8700d7': '92',
  '8700ff': '93',
  '875f00': '94',
  '875f5f': '95',
  '875f87': '96',
  '875faf': '97',
  '875fd7': '98',
  '875fff': '99',
  '878700': '100',
  '87875f': '101',
  '878787': '102',
  '8787af': '103',
  '8787d7': '104',
  '8787ff': '105',
  '87af00': '106',
  '87af5f': '107',
  '87af87': '108',
  '87afaf': '109',
  '87afd7': '110',
  '87afff': '111',
  '87d700': '112',
  '87d75f': '113',
  '87d787': '114',
  '87d7af': '115',
  '87d7d7': '116',
  '87d7ff': '117',
  '87ff00': '118',
  '87ff5f': '119',
  '87ff87': '120',
  '87ffaf': '121',
  '87ffd7': '122',
  '87ffff': '123',
  'af0000': '124',
  'af005f': '125',
  'af0087': '126',
  'af00af': '127',
  'af00d7': '128',
  'af00ff': '129',
  'af5f00': '130',
  'af5f5f': '131',
  'af5f87': '132',
  'af5faf': '133',
  'af5fd7': '134',
  'af5fff': '135',
  'af8700': '136',
  'af875f': '137',
  'af8787': '138',
  'af87af': '139',
  'af87d7': '140',
  'af87ff': '141',
  'afaf00': '142',
  'afaf5f': '143',
  'afaf87': '144',
  'afafaf': '145',
  'afafd7': '146',
  'afafff': '147',
  'afd700': '148',
  'afd75f': '149',
  'afd787': '150',
  'afd7af': '151',
  'afd7d7': '152',
  'afd7ff': '153',
  'afff00': '154',
  'afff5f': '155',
  'afff87': '156',
  'afffaf': '157',
  'afffd7': '158',
  'afffff': '159',
  'd70000': '160',
  'd7005f': '161',
  'd70087': '162',
  'd700af': '163',
  'd700d7': '164',
  'd700ff': '165',
  'd75f00': '166',
  'd75f5f': '167',
  'd75f87': '168',
  'd75faf': '169',
  'd75fd7': '170',
  'd75fff': '171',
  'd78700': '172',
  'd7875f': '173',
  'd78787': '174',
  'd787af': '175',
  'd787d7': '176',
  'd787ff': '177',
  'd7af00': '178',
  'd7af5f': '179',
  'd7af87': '180',
  'd7afaf': '181',
  'd7afd7': '182',
  'd7afff': '183',
  'd7d700': '184',
  'd7d75f': '185',
  'd7d787': '186',
  'd7d7af': '187',
  'd7d7d7': '188',
  'd7d7ff': '189',
  'd7ff00': '190',
  'd7ff5f': '191',
  'd7ff87': '192',
  'd7ffaf': '193',
  'd7ffd7': '194',
  'd7ffff': '195',
  //'ff0000': '196',
  'ff005f': '197',
  'ff0087': '198',
  'ff00af': '199',
  'ff00d7': '200',
  //'ff00ff': '201',
  'ff5f00': '202',
  'ff5f5f': '203',
  'ff5f87': '204',
  'ff5faf': '205',
  'ff5fd7': '206',
  'ff5fff': '207',
  'ff8700': '208',
  'ff875f': '209',
  'ff8787': '210',
  'ff87af': '211',
  'ff87d7': '212',
  'ff87ff': '213',
  'ffaf00': '214',
  'ffaf5f': '215',
  'ffaf87': '216',
  'ffafaf': '217',
  'ffafd7': '218',
  'ffafff': '219',
  'ffd700': '220',
  'ffd75f': '221',
  'ffd787': '222',
  'ffd7af': '223',
  'ffd7d7': '224',
  'ffd7ff': '225',
  //'ffff00': '226',
  'ffff5f': '227',
  'ffff87': '228',
  'ffffaf': '229',
  'ffffd7': '230',
  //'ffffff': '231',
  '080808': '232',
  '121212': '233',
  '1c1c1c': '234',
  '262626': '235',
  '303030': '236',
  '3a3a3a': '237',
  '444444': '238',
  '4e4e4e': '239',
  '585858': '240',
  '626262': '241',
  '6c6c6c': '242',
  '767676': '243',
  //'808080': '244',
  '8a8a8a': '245',
  '949494': '246',
  '9e9e9e': '247',
  'a8a8a8': '248',
  'b2b2b2': '249',
  'bcbcbc': '250',
  'c6c6c6': '251',
  'd0d0d0': '252',
  'dadada': '253',
  'e4e4e4': '254',
  'eeeeee': '255'
};

var strip_hash = function(_color)
{
	if(_color[0] === '#')
	{
		return _color.toString().substr(1);
	}

	return _color.toString();
}

