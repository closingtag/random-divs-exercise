var APP = APP || {};

APP.init = function(){
	
	addEvent(document.getElementsByTagName('body')[0], 'dragover', function(event){
		if(event.preventDefault){
			event.preventDefault();
		}

		var dragger = window.MG10.dragged;
		
		if(dragger) {
			if(dragger.className.indexOf('resize') != -1) {
				var width = event.pageX - dragger.parentNode.offsetLeft;
				var height = event.pageY - dragger.parentNode.offsetTop;

				if(width > 30) {
					dragger.parentNode.style.width = width + "px";
				}

				if(height > 30) {
					dragger.parentNode.style.height = height + "px";
				}		
					
			} else if(dragger.className.indexOf('drag') != -1) {
				dragger.parentNode.style.left = event.pageX + "px";
				dragger.parentNode.style.top = event.pageY + "px";
			}
		}

		return false;
	});
	
	if(document.getElementById('add')){
		addEvent(document.getElementById('add'), 'click', function(){
			var box = new Box();
			box.set_color();
			box.set_coords();
		});
	}
	
};

APP.init();

console.log(document.getElementsByTagName('body')[0].ondragover);
console.log(document.getElementById('add').onclick);