if(! BROWSER)
{
	module.exports = Math;
}

var _round = Math.round;

Math.round = function(_number, _precision)
{
	// TODO / !!!
	/*
		*own* "Math.round(_number, _precision)"

			.. as "round(1.456)" (etc.) show (1), not (2) ..etc!

				... sprich, wir müssen das erledigen, was bislang fehlt:
					von hinten rückwärts nach vorne hin *alle* (> 5)
					mit anwenden ...

				.. regulär scheinen also weitere ziffern zu übersehen ..

					PS: kann auch schrittweise jeden ziffern-schritt mehr "round()";
						but that's not that efficient (as direct symbol comparison), eh!??
	*/

	// ersetzen eben, wie gehabt.
	return _round(_number, _precision);
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
	return Math.floor(_random() * (_max - _min + 1)) + _min;
}

Math.radToDeg = function(_radians)
{
	return ( _radians * ( 180 / Math.PI ) );
}

// [deg2rad(180)] => (3.141592653589793)
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

