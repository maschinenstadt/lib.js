var utf8 = {};

// < https://developer.mozilla.org/de/docs/Web/API/TextEncoder >
// < https://developer.mozilla.org/de/docs/Web/API/TextDecoder >

/*
 * var uint8array = new TextEncoder("utf-8").encode("Plain Text");
 * var string = new TextDecoder().decode(uint8array);
 * console.log(uint8array ,string )
 */

if(BROWSER)
{
	web.util.utf8 = utf8;
}
else
{
	module.exports = utf8;
}
