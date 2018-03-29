if(BROWSER)
{
	window.Boolean = Boolean;
}
else
{
	module.exports = Boolean;
}

Boolean.prototype.clone = function()
{
	return this.valueOf();
}

Boolean.prototype.toString = function(_low, _high)
{
	_low = _low || 'false' || '-' || '0';
	_high = _high || 'true' || '+' || '1';

	if(this.valueOf() === true)
		return _high;
	else
		return _low;
}

