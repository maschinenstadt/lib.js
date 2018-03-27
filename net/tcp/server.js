const tcpServer = include('net').Server;

module.exports = class server extends tcpServer
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

