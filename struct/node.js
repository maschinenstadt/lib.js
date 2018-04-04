const uuid = include('util/uuid');
const event = include('core/event');
const stream = include('core/stream');

module.exports = class node extends stream
{
	constructor(_uuid = uuid.random())
	{
		super();

		this.event = new event();

		if(! global.type(_uuid, 'String'))
		{
			_uuid = uuid.random();
		}

		this.UUID = _uuid;
	}
}

