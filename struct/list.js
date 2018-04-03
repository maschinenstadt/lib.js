var list = function(_size = undefined)
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
	web.struct.list = list;
}
else
{
	module.exports = list;
}

