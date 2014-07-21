var Box = function(){
	var body = document.getElementsByTagName('body')[0];
	
	var box = document.createElement('div');
	box.className = "box";
	box.id = "box" + Math.floor(Math.random()*100000);
	
	var color = '#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
	box.style.backgroundColor = color;
	
	var left = Math.floor(Math.random() * body.clientWidth);
	var top = Math.floor(Math.random() * body.clientHeight);
	
	box.style.left = left + "px";
	box.style.top = top + "px";
	
	var drag = document.createElement('a');
	drag.href = "#"
	drag.className = "drag button";
	drag.draggable = true;
	drag.title = "Move!";
	drag.innerHTML = "Move!";

	box.appendChild(drag);
	
	addEvent(drag, 'dragstart', set_drag_element);
	addEvent(drag, 'dragend', clear_drag_element);
	
	var resize = document.createElement('a');
	resize.href = "#"
	resize.className = "resize button";
	resize.draggable = true;
	resize.title = "Resize!";
	resize.innerHTML = "Resize!";
	
	box.appendChild(resize);

	addEvent(resize, 'dragstart', set_drag_element);
	addEvent(resize, 'dragend', clear_drag_element);
	
	var close = document.createElement('a');
	close.href = "#"
	close.className = "close button";
	close.title = "Close!";
	close.innerHTML = "Close!";
	
	box.appendChild(close);
	
	addEvent(close, 'click', function(){
		var body = document.getElementsByTagName('body')[0];
		body.removeChild(this.parentNode);
		return false;
	})
	
	body.appendChild(box);
	
	function clear_drag_element(event) {
		if(window.MG10) {
			MG10.dragged = null;
			this.parentNode.className = this.parentNode.className.replace('action', '');
		}
	}
	
	function set_drag_element(event) {
		if(window.MG10) {
			MG10.dragged = this;
			this.parentNode.className = this.parentNode.className + ' action';			
		}
	}
	
};