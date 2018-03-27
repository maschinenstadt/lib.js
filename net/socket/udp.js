const sock = include('dgram').Socket;

module.exports = class socket extends sock
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
				return new Error(_version + ' (' + global.type(_version) + ')');
		}

		super(v);
	}
}

