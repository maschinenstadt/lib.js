const sock = include('net').Socket;
const node = include('core/node');

module.exports = class socket extends node
{
	constructor(_socket = new sock())
	{
		super();
		//
		this.setSocket(_socket);
		//
		this.setProtocol('tcp');
		this.setEncoding(socket.encoding);
		this.setTimeout(socket.timeout);
		this.setCallbacks(this.callbacks);
	}

	static get protocol() { return 'tcp'; }
	static get encoding() { return global.settings.encoding || 'utf8'; }
	static get timeout() { return global.settings.net.timeout || 0; }

	write(_data, _encoding = global.settings.encoding)
	{
		//this.socket.write(_data
	}

	connect(_host = '127.0.0.1', _port = 0, _options = {})
	{
		if(! global.type(_host, 'String'))
		{
			_host = '127.0.0.1';
		}
		if(! global.type(_port, 'Number'))
		{
			_port = 0;
		}

		_options = Object.assign(_options, { host: _host, port: _port });
		return this.socket.connect(_options);
	}

	setSocket(_socket = new sock())
	{
		this.socket = _socket;
	}

	get port() { return this.socket.remotePort; }
	get host() { return this.socket.remoteAddress; }
	
	toString()
	{
		return this.host + ':' + this.port;
	}

	setTimeout(_timeout = socket.timeout)
	{
		if(global.not(_timeout) || (! global.type(_timeout, 'Number')))
		{
			_timeout = socket.timeout;
		}

		this.timeout = _timeout;
		this.socket.setTimeout(_timeout);

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
		this.socket.setEncoding(_encoding);

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

			this.socket.on(idx, _map[idx]);
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
		console.debug(0, 'Connection closed (%s)', this.toString());
	}

	onConnect()
	{
		console.debug(0, 'Connection established (%s)', this.toString());
	}

	onData(_chunk)
	{
		console.debug(0, 'Connection DATA received (%s) w/ chunk of (%d) bytes]', this.toString(), _chunk.length);
	}

	onDrain()
	{
		console.debug(0, 'Connection DRAIN (%s)', this.toString());
	}

	onEnd()
	{
		console.debug(0, 'Connection END (%s)', this.toString());
	}

	onError(_error)
	{
		console.debug(0, 'Connection ERROR (%s)', this.toString());
		console.error(_error.text);
	}

	onLookup()
	{
		console.debug(0, 'Connection Lookup (%s)', this.toString());
	}

	onTimeout()
	{
		console.debug(0, 'Connection TIMEOUT (%s)', this.toString());
	}
}

