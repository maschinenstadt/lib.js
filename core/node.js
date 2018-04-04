const uuid = include('util/uuid');
const struct = include('struct/node');
const event = include('core/event');
const stream = include('core/stream');

module.exports = class node extends struct
{
	constructor(_uuid = undefined)
	{
		super(_uuid);
		this.event = new event();
	}
}

