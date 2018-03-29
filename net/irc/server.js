const tcpServer = include('net/tcp/server');

module.exports = class server extends tcpServer
{
	constructor()
	{
		super();
		//
		this.protocol = server.protocol;
	}

	static get protocol() { return 'irc'; }
}

