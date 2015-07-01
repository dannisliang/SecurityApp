/*
Core
====
This is a series of helper methods designed to be used by other components or actions
TODO: break these out into separate imports in a /utils folder
*/
export default function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};