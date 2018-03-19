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

