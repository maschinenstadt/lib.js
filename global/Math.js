if(BROWSER)
{
	window.Math = Math;
}
else
{
	module.exports = global.Math = Math;
}

const _round = Math.round;

Math.round = function(_number = undefined, _precision = 0)
{
	if(! global.type(_number, 'Number'))
	{
		return new Error(global.type(_number));
	}
	if(! global.type(_precision, 'Number'))
	{
		_precision = 0;
	}

	/*
	var str = _number.toString();
	var prec = 0;
	var high = false;

	var result = '';

	for(var i = str.length - 1; i >= 0; i--)
	{
		var symbol = this.charCodeAt(i);
	}

	return result;
	*/

        var factor = Math.pow(10, _precision);
        return ( _round(_number * factor) / factor );

	//	!!!!!!!!
	// 	SEE ALSO "doc/txt/Math.round.js.txt"!!!!!!!!!!
	// 	!!!!!!!!!!
}

Math.random.float = function(_max, _min)
{
	_max = _max || 1.0;
	_min = _min || 0.0;
	return Math.random() * (_max - _min) + _min;
}

Math.random.integer = function(_max, _min)
{
	_max = _max || 255;
	_min = _min || 0;
	return Math.floor(Math.random() * (_max - _min + 1)) + _min;
}

Math.radToDeg = function(_radians)
{
	return ( _radians * ( 180 / Math.PI ) );
}

Math.degToRad = function(_degrees)
{
	return ( _degrees * ( Math.PI / 180 ) );
}

Math.scale = function(_factor = 1, _system = 100)
{
	// e.g. ( 30/60 (secs) * 360° (circle) )
	// or.. ( 200/1000 * 100 ) [= 20%]
	// etc.
	// as.. ( freeMem / totalMem * 100 ) [ = (n) % memory free ;-)´
	//
	return (_factor * _system);
}

