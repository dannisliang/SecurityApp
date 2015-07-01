/*
Core
====
This is a series of helper methods designed to be used by other components or actions
TODO: break these out into separate imports in a /utils folder
*/
export default function(base64) {
	base64 = base64.split('data:image/png;base64,').join('');
    let binary_string =  window.atob(base64),
        len = binary_string.length,
        bytes = new Uint8Array( len ),
        i;
    for(i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
};