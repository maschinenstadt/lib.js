const node = include('core/node');
const tcpClient = include('net/tcp/client');

module.exports = class client extends tcpClient
{
	constructor()
	{
		super();
	}
}

