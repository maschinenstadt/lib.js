if(BROWSER)
{
	window.Date = Date;
}
else
{
	module.exports = global.Date = Date;
}

// TODO /
//
// # add()
// # sub()
//
// # start()
// # stop()
//
// # diff|delta()
//
// # format() / toString(_format)
//
