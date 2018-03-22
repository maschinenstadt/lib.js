const uuid = include('util/uuid');
const event = include('core/event');

module.exports = class node extends event
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

