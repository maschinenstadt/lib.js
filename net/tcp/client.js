const tcpSocket = include('net').Socket;

module.exports = class client extends tcpSocket
{
	constructor()
	{
		super();
		//
		this.setProtocol(client.protocol);
		this.setEncoding(client.encoding);
		this.setTimeout(client.timeout);
		//
		this.setCallbacks(this.callbacks);
	}

	static get protocol() { return 'tcp'; };
	static get encoding() { return global.settings.encoding || 'utf8'; };
	static get timeout() { return global.settings.net.timeout || 0; };
	static get version() { return global.settings.net.version || 'IPv6' || 'IPv4'; };

	connect(_tls = true, _host = '127.0.0.1', _port = 0, _version = client.version, _localAddress, _localPort)
	{
		if(! global.type(_tls, 'Boolean'))
		{
			_tls = true;
		}
		if(! global.type(_host, 'String'))
		{
			_host = '127.0.0.1';
		}
		if(! global.type(_port, 'Number'))
		{
			_port = 0;
		}

		if(_tls)
		{
			this.setCrypto('tls');
		}

		var opts = { host: _host, port: _port };

		if(global.type(_localAddress, 'String'))
		{
			opts.localAddress = _localAddress;
		}
		if(global.type(_localPort, 'Number'))
		{
			opts.localPort = _localPort;
		}

		switch(_version)
		{
			case 4:
			case '4':
			case 'ipv4':
			case 'IPv4':
				opts.family = 4;
				break;
			case 6:
			case '6':
			case 'ipv6':
			case 'IPv6':
				opts.family = 6;
				break;
			default:
				opts.family = client.version || 6;
		}

		return super.connect(opts);
	}

	get port() { return this.remotePort; }
	get host() { return this.remoteAddress; }
	
	toString()
	{
		return this.host + ':' + this.port;
	}

	setCrypto(_type = 'tls')
	{
		this.crypto = _type || 'tls';
	}

	setTimeout(_timeout = socket.timeout)
	{
		if(global.not(_timeout) || (! global.type(_timeout, 'Number')))
		{
			_timeout = socket.timeout;
		}

		this.timeout = _timeout;
		super.setTimeout(_timeout);

		return this;
	}

	setEncoding(_encoding = socket.encoding)
	{
		//TODO/ do this also for the socket, if any
		if(global.not(_encoding) || (! global.type(_encoding, 'String')))
		{
			_encoding = socket.encoding;
		}

		this.encoding = _encoding;
		super.setEncoding(_encoding);

		return this;
	}

	setProtocol(_protocol = socket.protocol)
	{
		if(global.not(_protocol) || (! global.type(_protocol, 'String')))
		{
			_protocol = socket.protocol;
		}

		this.protocol = _protocol;

		return this;
	}

	setCallback(_name, _callback)
	{
		this.socket.on(_name, _callback);
		return this;
	}

	setCallbacks(_map)
	{
		var result = 0;

		for(var idx in _map)
		{
			if(! _map.hasOwnProperty(idx))
			{
				continue;
			}
			if(! global.type(_map[idx], 'Function'))
			{
				continue;
			}

			this.on(idx, _map[idx]);
			result++;
		}

		return result;
	}

	get callbacks()
	{
		return {
			close: this.onClose,
			connect: this.onConnect,
			data: this.onData,
			drain: this.onDrain,
			end: this.onEnd,
			error: this.onError,
			lookup: this.onLookup,
			timeout: this.onTimeout
		};
	}

	onClose()
	{
		console.right('Connection closed (' + this.toString() + ')');
	}

	onConnect()
	{
		console.right('Connection established (' + this.toString() + ')');
	}

	onData(_chunk)
	{
		console.right('Connection received DATA (' + this.toString() + '): (' + _chunk.length.toString() + ') bytes');
		console.line('-');
		console.stdout(_chunk);
		console.line('-');
	}

	onDrain()
	{
		console.right('Connection DRAIN (' + this.toString() + ')');
	}

	onEnd()
	{
		console.right('Connection END (' + this.toString() + ')');
	}

	onError(_error)
	{
		console.right('Connection ERROR (' + this.toString() + ')');
		console.error(_error.text);
	}

	onLookup()
	{
		console.right('Connection lookup (' + this.toString() + ')');
	}

	onTimeout()
	{
		console.right('Connection TIMEOUT (' + this.toString() + ')');
	}
}

