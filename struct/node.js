var node = function(_uuid = undefined)
{
	if(! global.type(_uuid, 'String'))
	{
		if(BROWSER)
		{
			this.UUID = global.web.util.uuid.random();
			alert(' => ' + this.UUID);
		}
		else
		{
			this.UUID = include('util/uuid').random();
			console.inspect(' => ' + this.UUID);
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
		//TODO/
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

