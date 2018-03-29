BROWSER = true;

if(tls)
{
	if(window.location.protocol === 'http:')
	{
		window.location.protocol = 'https:';
	}
}
else
{
	if(window.location.protocol === 'https:')
	{
		window.location.protocol = 'http:';
	}
}

if(www)
{
	if(! window.location.hostname.startsWith('www.'))
	{
		window.location.hostname = 'www.' + window.location.hostname;
	}
}
else
{
	if(window.location.hostname.startsWith('www.'))
	{
		window.location.hostname = window.location.hostname.substr(4);
	}
}

