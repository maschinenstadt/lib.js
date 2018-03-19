if(! BROWSER)
{
	module.exports = Function;
}

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

Function.prototype.clone = function()
{

	//TODO/
	//
	// look for yourself .. test it ...
	//
	// < https://stackoverflow.com/questions/1833588/javascript-clone-a-function >
	//

}

/*
Function.prototype.toString = function()
{
}
*/

