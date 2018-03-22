module.exports = class socket // extends (..)
{
	constructor()
	{
		this.setProtocol();
		// the other can wait .. or find any solution - as they are important for the SOCKET, which comes later..
		this.setEncoding();
		this.setTimeout();
	}

	static get protocol() { return 'tcp'; }
	static get encoding() { return global.settings.encoding || 'utf8'; }
	static get timeout() { return global.settings.net.timeout || 0; }

	// IS THIS CORRECT IN A *CLIENT* (not SERVER)!?? YES, i do think so .. ATM. ..
	setTimeout(_timeout = socket.timeout)
	{
		//TODO/ do this also for the socket, if any
		if(global.not(_timeout) || (! global.type(_timeout, 'Number')))
		{
			_timeout = socket.timeout;
		}
		this.timeout = _timeout;
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
}

