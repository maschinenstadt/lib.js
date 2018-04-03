if(BROWSER)
{
	window.Function = Function;
}
else
{
	module.exports = global.Function = Function;
}

/*
Function.from = function(_source)
{
	var type = global.type(_source);

	switch(type)
	{
		case 'String':
			return Function.from.string(_source);
		case 'Array':
			return Function.from.array(_source);
		default:
			return null;
	}

	return undefined;
}

Function.from.string = function(_source)
{
	//
}

Function.from.array = function(_source)
{
	//
}
*/

Object.defineProperty(Function.prototype, 'clone', {
	configurable: true,
	enumerable: false,
	value: function()
	{
		// see for yourself: ..
		// < https://stackoverflow.com/questions/1833588/javascript-clone-a-function >
		// TODO /!!!!!
		return this.valueOf();
	}
});

Object.defineProperty(Function.prototype, 'toString', {
	enumerable: false,
	configurable: true,
	value: function()
	{
		//TODO/
	}
});

