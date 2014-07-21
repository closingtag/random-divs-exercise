/**
 * Box Creation Object
 *
 * 
 * @author Robert Weber / mail@closingtag.org
 */


var Box = function (container) {

	var _parent = container || document.getElementsByTagName('body')[0], // Get the container element otherwise take the body-Element.
		_dragged, // dragged element
		that = this,
		_specs = { // Default specs of the Box.
			color : '#cccccc',
			leftX : 10,
			topY : 10
	},
	
	/**
	 * Create a button element
	 *
	 * @param {String} class_name Class of the button
	 * @param {Boolean} drag wether element is draggable
	 * @param {String} text for title-attribute and innerHTML
	 * @return {DOMElement} The create DOM Element
	 */
	_create_button = function (class_name, drag, text) {
		var button = document.createElement('button');
		button.className = class_name + " button";
		if (drag) {
			button.draggable = true;
		}
		button.title = text;
		button.innerHTML = text;
		return button;
	},
	
	/**
	 * Close the box
	 *
	 */	
	_close_box = function () {
		_parent.removeChild(this.parentNode);
		return false;
	},
	
	/**
	 * clears dragged box object
	 *
	 */	
	_clear_drag_element = function () {
		_dragged = null;
		this.parentNode.className = this.parentNode.className.replace('action', '');
	},

	/**
	 * sets dragged box object
	 *
	 */		
	_set_drag_element = function () {
		_dragged = this;
		this.parentNode.className = this.parentNode.className + ' action';			
	},

	/**
	 * sets drop over handling for _parent object
	 *
	 * @param {Object} event object for event access
	 */			
	_set_drop_handling = function (event) {
		var the_box;

		if (event.preventDefault) {
			event.preventDefault();
		}
		
		if (_dragged) {
			the_box = _dragged.parentNode;
			
			if (_dragged.className.indexOf('resize') != -1) {
				var width = event.pageX - the_box.offsetLeft;
				var height = event.pageY - the_box.offsetTop;

				if (width > 30) {
					the_box.style.width = width + "px";
				}

				if (height > 30) {
					the_box.style.height = height + "px";
				}		
					
			} else if (_dragged.className.indexOf('drag') != -1) {
				the_box.style.left = event.pageX + "px";
				the_box.style.top = event.pageY + "px";
			}
		}

		return false;
	};
	
	/**
	 * Create the box and append to _parent 
	 *
	 * @method create
	 */	
	
	this.create = function () {
		// First remove dragover handler and the add handler again
		// to have all event handlers within Box object
		removeEvent(_parent,'dragover', _set_drop_handling);
		addEvent(_parent,'dragover', _set_drop_handling);
		
		// create the box element and the buttons
		var box = document.createElement('div');
		var drag = _create_button('drag', true, 'Move!');
		var resize = _create_button('resize', true, 'Resize!');
		var close = _create_button('close', false, 'Close!');
		
		// set box properties and styles
		box.className = "box";
		box.id = "box" + Math.floor(Math.random() * 100000);
		box.style.backgroundColor = _specs.color;
		box.style.left = _specs.leftX + "px";
		box.style.top = _specs.topY + "px";
		
		// append buttons to box
		box.appendChild(drag);
		box.appendChild(resize);
		box.appendChild(close);
		
		// event handlers for all buttons
		addEvent(drag, 'dragstart', _set_drag_element);
		addEvent(drag, 'dragend', _clear_drag_element);
		
		addEvent(resize, 'dragstart', _set_drag_element);
		addEvent(resize, 'dragend', _clear_drag_element);
		
		addEvent(close, 'click', _close_box);
		
		// finally append box to DOM
		_parent.appendChild(box);
		
		return that;
	};
	
	/**
	 * Setting the colors of box
	 *
	 * @method set_color	
	 * @param {String} color as hex-string
	 * if no param is passed, color will be create randomly
	 */
	this.set_color = function (color) {
		_specs.color = color || '#' + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16) + Math.floor(Math.random() * 256).toString(16);
		return that;
	};

	/**
	 * Setting the coordinates of box
	 *
	 * @method set_coords	
	 * @param {Array} coords X and Y position of string
	 * if no coordinates are passed, coordinates will be create randomly relativly to the width and height of _parent variable
	 */
	this.set_coords = function (coords) {
		if (coords && typeof (coords) === 'array') {
			_specs.leftX = coords[0];
			_specs.topY = coords[1];
		} else {
			_specs.leftX = Math.floor(Math.random() * _parent.clientWidth);
			_specs.topY = Math.floor(Math.random() * _parent.clientHeight);
		}
		return that;
	};
};