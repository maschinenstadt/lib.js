// INFO: JavaScript only supports (53) bit integers..!!
// 
// < https://javascript.info/number >
// < http://mathjs.org >
//
// TODO: own "BigNumber" bis "Figure"(!! w/ abstraction and vectors etc.).
//
// < http://www.joseprio.com/blog/2013/04/27/biginteger-libraries-for-js/ >
// < http://2ality.com/2012/07/large-integers.html >
// < https://stackoverflow.com/questions/36826748/how-to-convert-strings-to-bigint-in-javascript >
// < http://peterolson.github.io/BigInteger.js/ >
// < https://github.com/rauschma/strint >
// < https://github.com/substack/node-bigint >
// < https://github.com/tc39/proposal-bigint >
// < https://silentmatt.com/biginteger/ >
// < https://github.com/MikeMcl/decimal.js/ >
// < http://mathjs.org/docs/datatypes/bignumbers.html >

if(BROWSER)
{
	window.Number = Number;
}
else
{
	module.exports = global.Number = Number;
}

Object.defineProperty(Number, 'radix', {
	enumerable: false,
	get: function()
	{
		return {
			min: 2,
			minimum: 2,
			max: 36,
			maximum: 36
		};
	}
});

Object.defineProperty(Number.prototype, 'isPositive', {
	enumerable: false,
	get: function() { return this.valueOf() >= 0; } });
Object.defineProperty(Number.prototype, 'isNegative', {
	enumerable: false,
	get: function() { return this.valueOf() < 0; } });

Object.defineProperty(Number.prototype, 'isInteger', {
	enumerable: false,
	get: function() { return /*this.valueOf() % 1 === 0*/ Number.isInteger(this); } });
Object.defineProperty(Number.prototype, 'isFloat', {
	enumerable: false,
	get: function() { return /*this.valueOf() % 1 !== 0*/ ! Number.isInteger(this); } });

Object.defineProperty(Number.prototype, 'abs', {
	enumerable: false,
	get: function() { return Math.abs(this.valueOf()); } });

Object.defineProperty(Number.prototype, 'isNaN', {
	enumerable: false,
	get: function() { return isNaN(this); } });

Object.defineProperty(Number.prototype, 'clone', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.valueOf();
	}
});

Object.defineProperty(Number.prototype, 'negate', {
	enumerable: false,
	value: function()
	{
		return ( this.valueOf() < 0 ? 0 - this.valueOf() : this.valueOf() );
	}
});

Object.defineProperty(Number.prototype, 'toNegative', {
	enumerable: false,
	value: function()
	{
		return ( this.valueOf() < 0 ? this.valueOf() : 0 - this.valueOf() );
	}
});

Object.defineProperty(Number.prototype, 'toPositive', {
	enumerable: false,
	value: function()
	{
		return ( this.valueOf() < 0 ? 0 - this.valueOf() : this.valueOf() );
	}
});

Object.defineProperty(Number.prototype, 'round', {
	enumerable: false,
	value: function(_precision = 0)
	{
		if(! global.type(_precision, 'Number'))
		{
			_precision = 0;
		}

		return Math.round(this.valueOf(), _precision);
	}
});

