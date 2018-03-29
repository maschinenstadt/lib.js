if(BROWSER)
{
	window.RegExp = RegExp;
}
else
{
	module.exports = RegExp;
}

RegExp.clone = function()
{
	return this.valueOf();
}

