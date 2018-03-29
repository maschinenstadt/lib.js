//TODO/ "hrtime" u.a. noch.. und natürlich .format()...
//

var time = function()
{
	return Date.now();
}

if(BROWSER)
{
	web.util.time = time;
}
else
{
	module.exports = time;
}

time.now = function()
{
	return Date.now();
}

time.prototype.add = function(_diff)
{
	return (this.now += _diff);
}

time.prototype.sub = function(_diff)
{
	return (this.now -= _diff);
}

time.prototype.start = function()
{
	this.now = Date.now();
}

time.prototype.stop = function()
{
	var end = Date.now();
	var delta = end - this.now;
	this.now = end; // or delta (or so)?
	return delta;
}

time.format = time.toString = function(_unix, _format)
{
	//for(..
	
	var result = '';

	// < http://php.net/manual/de/function.date.php >
	/*switch(elem)
	{
		case 'd':
			break;
		case 'D':
			break;
		case 'j':
			break;
		case 'l':
			break;
		case 'N':
			break;
		case 'S':
			break;
		case 'w':
			break;
		case 'z':
			break;
		case 'W':
			break;
		case 'F':
			break;
		case 'm':
			break;
		case 'M':
			break;
		case 'n':
			break;
		case 't':
			break;
		case 'L':
			break;
		case 'o':
			break;
		case 'Y':
			break;
		case 'y':
			break;
		case 'a':
			break;
		case 'A':
			break;
		case 'B':
			break;
		case 'g':
			break;
		case 'G':
			break;
		case 'h':
			break;
		case 'H':
			break;
		case 'i':
			break;
		case 's':
			break;
		case 'u':
			break;
		case 'v':
			break;
		case 'e':
			break;
		case 'I':
			break;
		case 'O':
			break;
		case 'P':
			break;
		case 'T':
			break;
		case 'Z':
			break;
		case 'z':
			break;
		case 'c':
			break;
		case 'r':
			break;
		case 'U':
			break;
		default:
			break;
	}*/
	// < https://docs.microsoft.com/de-de/dotnet/standard/base-types/custom-date-and-time-format-strings >
	/*switch(elem)
	{
		case 'd':
			break;
		case 'dd':
			break;
		case 'ddd':
			break;
		case 'dddd':
			break;
		case 'f':
			break;
		case 'ff':
			break;
		case 'fff':
			break;
		case 'ffff':
			break;
		case 'fffff':
			break;
		case 'ffffff':
			break;
		case 'fffffff':
			break;
		case 'F':
			break;
		case 'FF':
			break;
		case 'FFF':
			break;
		case 'FFFF':
			break;
		case 'FFFFF':
			break;
		case 'FFFFFF':
			break;
		case 'FFFFFFF':
			break;
		case 'g':
		case 'gg':
			break;
		case 'h':
			break;
		case 'hh':
			break;
		case 'H':
			break;
		case 'HH':
			break;
		case 'K':
			break;
		case 'm':
			break;
		case 'mm':
			break;
		case 'M':
			break;
		case 'MM':
			break;
		case 'MMM':
			break;
		case 'MMMM':
			break;
		case 's':
			break;
		case 'ss':
			break;
		case 't':
			break;
		case 'tt':
			break;
		case 'y':
			break;
		case 'yy':
			break;
		case 'yyy':
			break;
		case 'yyyy':
			break;
		case 'yyyyy':
			break;
		case 'z':
			break;
		case 'zz':
			break;
		case 'zzz':
			break;
		case ':':
			break;
		case '/':
			break;
		case '%':
			break;
		case '\\':
			break;
		default:
			break;
	}*/

	return result;
}

time.prototype.format = time.prototype.toString = function(_format)
{
	return time.format(this.now, _format);
}

time.delta = function(_start, _stop)
{
	var diff = (_stop - _start);
	return diff;
}

time.prototype.delta = function(_stop)
{
	return time.delta(this.now, _stop);
}

