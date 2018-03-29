const tcpServer = nodejs('net').Server;

module.exports = class server extends tcpServer
{
	constructor(_port = undefined, _host = undefined)
	{
		super();
		//
		this.clients = [];
		//
		this.setProtocol('tcp');
		//
		this.callbacks = this.callbacks;
	}

	static get protocol() { return 'tcp' };
	// these will be used on creating new CLIENT instances in here.. give 'em this infos!
	static get encoding() { return global.settings.net.encoding || 'utf8'; };
	static get timeout() { return global.settings.net.timeout || 0; };
	static get version() { return global.settings.net.version || 'IPv6' || 'IPv4'; };

	setProtocol(_protocol = server.protocol)
	{
		if(global.not(_protocol) || (! global.type(_protocol, 'String')))
		{
			_protocol = server.protocol;
		}

		this.protocol = _protocol;
		return this;
	}

	get port() { return ( this.address() ? this.address().port : '-' ); }
	get host() { return ( this.address() ? this.address().address : '-' ); }
	get family() { return ( this.address() ? this.address().family : '-' ); }

	toString()
	{
		return this.host.toString() + ':' + this.port.toString() + '/' + this.protocol;
	}

	start(_port = 0, _host = settings.net.host)
	{
		if(! global.type(_port, 'Number'))
		{
			_port = 0;
		}
		if(! global.type(_host, 'String'))
		{
			_host = settings.net.host;
		}

		var options = {
			port: _port,
			host: _host
		};

		return this.listen(options);
	}

	stop()
	{
		this.close();
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
			connection:	this.onConnection,
			error:		this.onError,
			listening:	this.onListening
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

	onClose()
	{
	}

	onConnection(_socket)
	{
console.debug('[onConnection() -> test if MY NEW net.Socket] "%s"', _socket.protocol);
		//
		this.clients[this.clients.length] = sock;
	}

	onError(_error)
	{
	}

	onListening()
	{
	}
}

