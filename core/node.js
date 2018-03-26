const uuid = include('util/uuid');
//const event = include('core/event');
//const channel = include('mud/channel');

module.exports = class node //extends channel|event|..
{
	constructor(_uuid = uuid.random())
	{
		super();

		if(global.not(_uuid) || (! global.type(_uuid, 'String')))
		{
			_uuid = uuid.random();
		}

		this.UUID = _uuid;
	}
}

