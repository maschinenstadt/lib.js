const tcpClient = include('net/tcp/client');

module.exports = class client extends tcpClient
{
	constructor(
		_name_nick = String.random.alphabet(16, 8),
		_name_real = String.random.alphabet(16, 8),
		_name_user = String.random.alphabet(16, 8)
	){
		super();

		this.name = {};
		this.setNick(_name_nick);
		this.setReal(_name_real);
		this.setUser(_name_user);
	}

	setNick(_name = String.random.alphabet(16, 8))
	{
		if(! global.type(_name, 'String'))
		{
			_name = _name.toString().substr(0, 8);
		}

		this.name.nick = _name;
		return this;
	}

	setReal(_name = String.random.alphabet(16, 8))
	{
		if(! global.type(_name, 'String'))
		{
			_name = _name.toString().substr(0, 8);
		}

		this.name.real = _name;
		return this;
	}

	setUser(_name = String.random.alphabet(16, 8))
	{
		if(! global.type(_name, 'String'))
		{
			_name = _name.toString().substr(0, 8);
		}

		this.name.user = _name;
		return this;
	}

	static get port() { return { tcp: 6667, tls: 5597 }; }

	connect(_tls = true, _host = '127.0.0.1', _port = ( _tls ? client.port.tls : client.port.tcp ), _version = global.settings.net.version || 6, _localAddress, _localPort)
	{
		if(! global.type(_tls, 'Boolean'))
		{
			_tls = true;
		}
		if(! global.type(_port, 'Number'))
		{
			_port = ( _tls ? client.port.tls : client.port.tcp );
		}
		if(! global.type(_host, 'String'))
		{
			_host = '127.0.0.1';
		}

		var opts = { port: _port, host: _host };

		if(_localAddress)
		{
			opts = Object.assign(opts, { localAddress: _localAddress });
		}
		if(_localPort)
		{
			opts = Object.assign(opts, { localPort: _localPort });
		}

		switch(_version)
		{
			case 4:
			case '4':
			case 'ipv4':
			case 'IPv4':
				opts = Object.assign(opts, { family: 4 });
				break;
			case 6:
			case '6':
			case 'ipv6':
			case 'IPv6':
				opts = Object.assign(opts, { family: 6 });
				break;
			default:
				opts = Object.assign(opts, { family: global.settings.net.version || 6 });
		}

		super.connect(_tls, _host, _port, _version, _localAddress, _localPort);

		return this;
	}
}

