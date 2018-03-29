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

	static get protocol() { return 'irc'; };

	connect(_tls = true, _host = '127.0.0.1', _port = ( _tls ? client.port.tls : client.port.tcp ))
	{
		super.connect(_tls, _host, _port);
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
}
