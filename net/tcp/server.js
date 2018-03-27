const serv = include('net').Server;
const node = include('core/node');

module.exports = class server extends serv
{
	constructor()
	{
		super();
		//
		this.setProtocol('tcp');
	}

	setProtocol(_protocol = 'tcp')
	{
		this.protocol = _protocol || 'tcp';
		return this;
	}
}

