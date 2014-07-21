function addEvent(el, type, fn){
	if(document.addEventListener){
		el.addEventListener(type, fn, false);
	} else {
		el.attachEvent('on' + type, fn);
	}
}

function removeEvent(el, type, fn){
	if(document.removeEventListener){
		el.removeEventListener(type, fn, false);
	} else {
		el.detachEvent('on' + type, fn);
	}
}
