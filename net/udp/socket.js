const udpSocket = include('dgram').Socket;

module.exports = class socket extends udpSocket
{
	constructor(_version = 4)
	{
		var v;

		switch(_version)
		{
			case 4:
			case '4':
			case 'v4':
			case 'ipv4':
			case 'IPv4':
				v = 'udp4';
				break;
			case 6:
			case '6':
			case 'v6':
			case 'ipv6':
			case 'IPv6':
				v = 'udp6';
				break;
			default:
				v = socket.version;
		}

		super(v);
	}

	static get version() { return ( global.settings.net.version === 6 ? 'udp6' : 'udp4' ); }
}

