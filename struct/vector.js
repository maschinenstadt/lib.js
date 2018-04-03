var vector = function(_size = undefined)
{
	if(global.type(_size, 'Number'))
	{
		this.size = _size;
	}
	else
	{
		this.size = undefined;
	}

	//
	return this;
}

if(BROWSER)
{
	web.struct.vector = vector;
}
else
{
	module.exports = vector;
}

