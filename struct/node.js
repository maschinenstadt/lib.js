var node = function(_uuid = undefined)
{
	if(! global.type(_uuid, 'String'))
	{
		if(BROWSER)
		{
			this.UUID = global.web.util.uuid.random();
		}
		else
		{
			this.UUID = include('util/uuid').random();
		}
	}

	//
	return this;
}

Object.defineProperty(node.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		return this.UUID;
	}
});

if(BROWSER)
{
	web.struct.node = node;
}
else
{
	module.exports = node;
}

