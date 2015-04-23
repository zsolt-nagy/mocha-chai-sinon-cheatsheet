var isInteger = function( n ) {
	return typeof n === 'number' && n % 1 === 0;
}

var fibonacci = function ( n ) {
    switch( n ) {
        case 0  : return 0;
        case 1  : return 1;
        default : return fibonacci( n - 1 ) + fibonacci( n - 2 );
    }
}