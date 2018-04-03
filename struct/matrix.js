var matrix = function()
{
	//
	return this;
}

if(BROWSER)
{
	web.struct.matrix = matrix;
}
else
{
	module.exports = matrix;
}

