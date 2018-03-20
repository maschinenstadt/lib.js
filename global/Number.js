if(! BROWSER)
{
	module.exports = Number;
}

Object.defineProperty(Number.prototype, 'positive', {
	get: function() { return this.valueOf() >= 0; } });
Object.defineProperty(Number.prototype, 'negative', {
	get: function() { return this.valueOf() < 0; } });

Object.defineProperty(Number.prototype, 'integer', {
	get: function() { return /*this.valueOf() % 1 === 0*/ Number.isInteger(this); } });
Object.defineProperty(Number.prototype, 'float', {
	get: function() { return /*this.valueOf() % 1 !== 0*/ ! Number.isInteger(this); } });

Object.defineProperty(Number.prototype, 'abs', {
	get: function() { return Math.abs(this.valueOf()); } });

Object.defineProperty(Number.prototype, 'NaN', {
	get: function() { return isNaN(this); } });

Number.prototype.clone = function()
{
	return this.valueOf();
}

Number.prototype.negate = function()
{
	return ( this.valueOf() < 0 ? 0 - this.valueOf() : this.valueOf() );
}

Number.prototype.toNegative = function()
{
	return ( this.valueOf() < 0 ? this.valueOf() : 0 - this.valueOf() );
}

Number.prototype.toPositive = function()
{
	return ( this.valueOf() < 0 ? 0 - this.valueOf() : this.valueOf() );
}

Number.prototype.round = function(_precision = 0)
{
	return Math.round(this.valueOf(), _precision);
}

Number.from = function(_string, _radix = 10)
{
	if(global.not(_string))
	{
		return new Error();
	}

	if(! global.type(_radix, 'Number'))
	{
		return new Error(global.type(_radix));
	}

	if(_string.indexOf('.') > -1 || _string.indexOf(',') > -1)
	{
		_string = _string.split(',').join('.');
		return parseFloat(_string);
		// < https://www.quora.com/What-is-the-difference-in-Javascript-between-Number-parseFloat-and-String-*1 >
	}

	return parseInt(_string, _radix);
}

Number.prototype.to = function(_radix = 10)
{
	// this ist just the default javascript radix conversion..
	// i('ll) have my own, better version in "util/radix(.js)"

	if(global.not(_radix))
	{
		return new Error();
	}

	if(global.type(_radix, 'Number'))
	{
		if(_radix < 2 || _radix > 36)
		{
			return new Error('2 .. 36');
		}
	}
	else
	{
		return new Error(global.type(_radix));
	}

	return this.toString(_radix);
}

