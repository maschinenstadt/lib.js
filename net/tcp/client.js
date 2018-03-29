const tcpSocket = require('net').Socket; // MUST BE 'require()' .. see "replaceNetClasses()" @ '/node.js'

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
		this.callbacks = this.callbacks;
	}

	static get protocol() { return 'tcp'; };
	static get encoding() { return global.settings.net.encoding || 'utf8'; };
	static get timeout() { return global.settings.net.timeout || 0; };
	static get version() { return global.settings.net.version || 'IPv6' || 'IPv4'; };

	connect(_tls = true, _host = settings.net.host, _port = 0, _version = client.version, _localAddress, _localPort)
	{
		if(! global.type(_tls, 'Boolean'))
		{
			_tls = true;
		}
		if(! global.type(_host, 'String'))
		{
			_host = settings.net.host;
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
		return this.host + ':' + this.port + '/' + this.protocol;
	}

	setCrypto(_type = 'tls')
	{
		this.crypto = _type || 'tls';
	}

	close(_data = global.EOL, _encoding = client.encoding)
	{
		return this.end(_data, _encoding);
	}

	write(_data = global.EOL, _encoding = client.encoding, _callback)
	{
		return super.write(_data, _encoding, _callback);
	}

	setTimeout(_timeout = client.timeout)
	{
		if(global.not(_timeout) || (! global.type(_timeout, 'Number')))
		{
			_timeout = client.timeout;
		}

		this.timeout = _timeout;
		super.setTimeout(_timeout);

		return this;
	}

	setEncoding(_encoding = client.encoding)
	{
		//TODO/ do this also for the socket, if any
		if(global.not(_encoding) || (! global.type(_encoding, 'String')))
		{
			_encoding = client.encoding;
		}

		this.encoding = _encoding;
		super.setEncoding(_encoding);

		return this;
	}

	setProtocol(_protocol = client.protocol)
	{
		if(global.not(_protocol) || (! global.type(_protocol, 'String')))
		{
			_protocol = client.protocol;
		}

		this.protocol = _protocol;

		return this;
	}

	setCallback(_name, _callback)
	{
		if(! global.type(_callback, 'Function'))
		{
			return new Error(global.type(_callback));
		}

		this.on(_name, _callback);
		return this;
	}

	setCallbacks(_map = {}, _removeOld = false)
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

			if(_removeOld)
			{
				this.removeAllListeners(idx);
			}

			this.on(idx, _map[idx]);

			result++;
		}

		return result;
	}

	get callbacks()
	{
		return {
			close:		this.onClose,
			connect:	this.onConnect,
			data:		this.onData,
			drain:		this.onDrain,
			end:		this.onEnd,
			error:		this.onError,
			lookup:		this.onLookup,
			timeout:	this.onTimeout
		};
	}

	set callbacks(_map = {})
	{
		if(! global.type(_map, 'Object'))
		{
			return new Error(global.type(_map));
		}

		return this.setCallbacks(_map, true);
	}

	onClose(_hadError)
	{
		console.right('Connection [' + this.toString() + '] closed (had error: ' + _hadError.toString('NO', 'YES') + ')');
	}

	onConnect()
	{
		console.right('Connection [' + this.toString() + '] established! :-)´');
	}

	onData(_chunk)
	{
		console.right('Connection [' + this.toString() + '] received DATA (' + _chunk.length.toString() + ' bytes)');
		/*console.line('-');
		console.stdout(_chunk);
		console.line('-');*/
	}

	onDrain()
	{
		console.right('Connection [' + this.toString() + '] DRAIN..');
	}

	onEnd()
	{
		console.right('Connection [' + this.toString() + '] ENDs!');
	}

	onError(_error)
	{
		console.right('Connection [' + this.toString() + '] ERROR: "' + _error.name + '"!');
		/*console.error(_error.text);
		console.right('DESTROYing socket..');*/
		this.destroy(_error);
	}

	onLookup(_error, _address, _family, _host)
	{
		console.right('Connection [' + this.toString() + '] LOOKUP... (Error: ' + (_error ? '"' + _error.name + '"' : 'NO') + ')');
	}

	onTimeout()
	{
		console.right('Connection [' + this.toString() + '] TIMEOUT (' + this.timeout.toString() + ' ms)!');
	}
}

