var ip = module.exports = {};

ip.v4 = include('net/address/ipv4');
ip.v6 = include('net/address/ipv6');

/*
var ip = module.exports = function()
{
}

ip.v4 = {};
ip.v6 = {};

ip.v4.toString = function(_byteArray)
{
}

ip.v6.toString = function(_byteArray)
{
}

ip.v4.isValid = function(..

ip.v6.isValid = function(..

//ip.v4.random = function(
//ip.v6.random = ..

*/

