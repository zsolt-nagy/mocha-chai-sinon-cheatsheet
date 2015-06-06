function playAnimation( $element ) {
	var x = 0;
	var maxX = $( 'body' ).width() - 50;
	var direction = 1;
	var dt = 20;          // 50fps
	var dx = 10;          // 10 pixels per 20 milliseconds

	var animate = function() {
		if( x <= 0 ) {
			direction = 1;
		} else if( x >= maxX ) {
			direction = -1;
		}
		x += dx * direction;
		$element.css( 'left', x + 'px' );
	}

	setInterval( animate, dt );
}
