const uuid = include('util/uuid');
const event = include('core/event');

module.exports = class node extends Object
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

