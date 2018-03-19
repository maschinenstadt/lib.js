if(! BROWSER)
{
	module.exports = RegExp;
}

RegExp.prototype.clone = function()
{
	return this.valueOf();
}

