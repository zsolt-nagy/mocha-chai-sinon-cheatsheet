describe( 'Mocha, Chai Expect Cheat Sheet', function() {
	it( 'should check types', function() {
		expect( '1' ).to.be.a( 'string' );
		expect( 1 ).to.be.a( 'number' );
		expect( true ).to.be.a( 'boolean' );
		expect( {} ).to.be.an( 'object' );
		expect( null ).to.be.a( 'null' );
		expect( undefined ).to.be.a( 'undefined' );
		expect( null ).to.be.a( 'null' );
		expect( [] ).to.be.an( 'array' );
		expect( 0/0 ).to.be.a( 'number' );
	} );

	it( 'should accept any number of chain objects', function() {
		expect( 'mocha' ).a( 'string' );
		expect( 'mocha' ).to.be.a( 'string' );
		expect( 'mocha' ).at.be.been.have.is.of.that.to.with.a( 'string' );
	} );

	it( 'should handle negation', function() {
		expect( 5 ).to.not.be.a( 'string' );
	} );

	it( 'should check truthy and falsy values', function() {
		var o = {};

		// x is truthy iff !!x is true.
		expect( 'John' ).to.be.ok;
		expect( true ).to.be.ok;
		expect( o ).to.be.ok;
		expect( 1 ).to.be.ok;
		expect( 0 ).to.be.not.ok;

		// y is falsy iff !!x is false.		
		expect( null ).to.be.not.ok;
		expect( o.member ).to.be.not.ok;
		expect( "" ).to.be.not.ok;	
	} );

	it( 'should check equality', function() {
		var o = {};
		o.o = o;

		expect( 2*2 ).to.equal( 4 );
		expect( NaN ).to.not.equal( NaN );
		expect( 5 ).to.not.equal( '5' );
		// different object references are not equal
		expect( { a: 3 } ).to.not.equal( { a: 3 } ); 
		// references pointing at the same object are equal
		expect( o.o ).to.equal( o );
	} );

	it( 'should check deep equality of objects and arrays', function() {
		var o1 = { b:5, c: { d:6, e: [1,2,3] } };
		var o2 = { c: { d:6, e: [1,2,3] }, b:5 };
		expect( o1 ).to.deep.equal( o2 );
		expect( o1 ).to.eql( o2 );
		expect( o1 ).to.not.equal( o2 );
	} );

	it( 'should chain multiple checks on the same object', function() {
		var name = 'Mocha';
		expect( name ).to.be.a( 'string' ).and
					  .to.equal( 'Mocha' );
	} );

	it( 'should check true and false values', function() {
		var o = {};

		expect( true ).to.be.true;
		expect( true ).to.not.be.false;
		expect( o ).to.not.be.true;
		expect( o ).to.not.be.false;
	} );

	it( 'should detect null, undefined and existing values', function() {
		var o = {};

		expect( o ).to.exist;
		expect( null ).to.not.exist;
		expect( null ).to.be.null;
		expect( null ).to.not.be.undefined;
		expect( o.member ).to.not.exist;
		expect( o.member ).to.not.be.null;
		expect( o.member ).to.be.undefined;
	} );

	it( 'should check object properties', function() {
		var player = {
			name: 'Mario', 
			coins: 55,
			inventory: {
				mushrooms: 2,
				stars: 3
			}
		};

		// check the existence of a key
		expect( player ).to.have.property( 'coins' );
		// check the existence of a key + check its value
		expect( player ).to.have.property( 'name', 'Mario' );
		// deep properties
		expect( player ).to.have.deep.property( 'inventory.stars', 3 );
	} );

	it( 'should check the length property', function() {
		expect( [] ).to.have.length( 0 );
		expect( 'Mocha' ).to.have.length( 5 );
		expect( [] ).to.have.property( 'length', 0 );
		expect( 'Mocha' ).to.have.property( 'length', 5 );
	} );

	it( 'should check own properties', function() {
		var o = Object.create( { name: 'Mocha' } );

		expect( o ).to.have.property( 'name' );
		expect( o ).to.not.have.ownProperty( 'name' );
	} );

	it( 'should check if an array contains an element', function() {
		expect( [1, 3, 5] ).to.contain( 3 );
		expect( [1, 3, 5] ).to.not.contain( 4 );

		// contain expressed without contain
		expect( [1, 3, 5].indexOf( 3 ) ).to.not.equal( -1 );
	} );

	it( 'should check keys of an object', function() {
		var jsonPayload =
		{
			name:    'John',
			email:   'john@user.com',
			country: 'NZL'
		}

		// exact matching of all keys
		expect( jsonPayload ).to.have.keys( [ 'name', 'email', 'country' ] );
		// exclusion of keys
		expect( jsonPayload ).to.not.have.keys( [ 'repeat_email' ] );
		// inclusion of keys
		expect( jsonPayload ).to.contain.keys( [ 'name' ] );	
	} );

	it( 'should compare ordered values', function() {
		expect( 2 ).to.be.above( 1 );
		expect( 1 ).to.not.be.above( 1 );
		expect( 1 ).to.be.at.least( 1 );

		expect( 1 ).to.be.below( 2 );
		expect( 1 ).to.not.be.below( 1 );
		expect( 1 ).to.be.at.most( 1 );

		expect( 1 ).to.be.within( 0, 2 );
	} );

	it( 'should check the instanceof relationship', function() {
		var C = function( ) { this.a = 1; };
		var D = function( ) { this.b = 2; };
		D.prototype = new C();

		var c = new C();
		var d = new D();

		expect( c ).to.be.an.instanceof( C );
		expect( c ).to.not.be.an.instanceof( D );
		expect( d ).to.be.an.instanceof( C );
		expect( d ).to.be.an.instanceof( D );
		expect( c ).to.be.an.instanceof( Object );
		expect( d ).to.be.an.instanceof( Object );		
	} );

	it( 'should match regular expressions', function() {
		expect( 'John' ).to.match( /^(John|Jack)$/ );
	} );

	it( 'should contain a substring', function() {
		expect( 'John' ).to.have.string( 'hn' );
	} );

	it( 'should satisfy a condition described by a function', function() {
		var isShortName = function( name )
		{
			return typeof name === 'string' && 
			       name.length >= 2 && 
			       name.length <= 5;
		};

		expect( 'John' ).to.satisfy( isShortName );
		expect( 'Michael' ).to.not.satisfy( isShortName );
	} );

	it( 'should throw an error', function() {
		var parse = function( response ) {
		    if( response.error ) {
		        throw new Error( response.error.message );
		    }
		    return response;
		};

		var testWrapper = function() {
		    parse( { error: { message: 'Server Error' } } );
		}

		expect( testWrapper ).to.Throw( 'Server Error' );
	} );
} );


describe("Test with fixture", function()
{
    before( function()
    {
        this.$fixture = $('<div id="view-fixture"></div>');
    } );

    beforeEach( function() {
       this.$fixture.empty().appendTo( $( '#fixtures' ) );
       this.$fixture.prepend( '<div id="seasons"></div>' );
       seasonsView.render();
    } );

    afterEach( function() {
        $( '#fixtures' ).empty();
    } );

    it( 'should display Spring, Summer, Autumn and Winter', function() {
        var mapFunction = function( item ) { 
            return item.innerHTML;
        }
        var $seasons = this.$fixture.find( '.js-season' ); 
        var seasonNames = _.map( $seasons, mapFunction);
        expect( seasonNames ).to.contain( 'Spring' );
        expect( seasonNames ).to.contain( 'Summer' );
        expect( seasonNames ).to.contain( 'Autumn' );
        expect( seasonNames ).to.contain( 'Winter' );
    });

    it( 'should display four seasons.', function() {
        var seasonNodes = this.$fixture.find( '.js-season' );
        expect( seasonNodes ).to.have.length( 4 );
    });
} );


describe( 'Asynchronous Tests', function() {
	before( function() {
        this.timeModel = new TimeModel();
	});

	it( 'should find the correct keys after fetching the model', 
        function( testIsDone ) {
            var callback = function() { 
                var expectedKeys = 
                    [ 'date', 'milliseconds_since_epoch', 'time' ];  
                expect( this.timeModel.attributes ).to
                    .have.keys( expectedKeys );    

                // Tell Mocha when the test should finish
                testIsDone();        
            }
		    this.timeModel.fetch().done( 
		    	_.bind( callback, this ) 
		    );
	});
});