describe( 'SinonJs Spies', function() {

    describe( 'SinonJs Anonymous Spies', function() {

        it( 'should demonstrate the usage of anonymous spies with Backbone.Events', 
            function() {
                var spy = sinon.spy();
                var eventBus = _.extend( {}, Backbone.Events );

                // Spy subscribes
                eventBus.on( 'custom:event', spy );

                // Spy is called when the event is triggered
                eventBus.trigger( 'custom:event', 2, 5 );

                expect( spy.calledWith( 2, 5 ) ).to.be.true;
                expect( spy.calledOnce ).to.be.true;
                expect( spy.callCount ).to.equal( 1 );            
        } );
    } );


    describe( 'SinonJs Function Spies', function() {

        it( 'should demonstrate usage of function spies testing the isInteger function', 
            function() {

                var isIntegerSpy = sinon.spy( isInteger );
                
                isIntegerSpy( 5 );
                isIntegerSpy( 5.25 );

                expect( isIntegerSpy.calledTwice ).to.be.true;  
                expect( isIntegerSpy.getCall( 0 ).returnValue ).to.be.true;
                expect( isIntegerSpy.getCall( 1 ).returnValue ).to.be.false;  
        } );

        it( 'should demonstrate spying on recursive functions', function() {
            var originalFibonacci = fibonacci;
            fibonacci = sinon.spy( fibonacci );
            fibonacci( 4 );

            expect( fibonacci.callCount ).to.equal( 9 );

            fibonacci = originalFibonacci;
        } );        
    } );    


    describe( 'SinonJs Method Spies', function() {

        it( 'should call the parse method when fetching data', 
            function( testIsDone ) {
            var m = new Backbone.Model();
            m.url = 'http://ip.jsontest.com';
            sinon.spy( m, 'parse' );
            m.fetch().done( function() {
                 expect( m.parse.calledOnce ).to.be.true;
             } ).always( function() {
                 m.parse.restore();
                 testIsDone();
             } );
        } );
    } );    


    describe( 'SinonJs spy API', function() {
        
        beforeEach( function() {
            this.isIntegerSpy = sinon.spy( isInteger );
        } );

        afterEach( function() {
            delete this.isIntegerSpy;
        } );

        it( 'callCount : integer', function() {
            this.isIntegerSpy( 1 );
            expect( this.isIntegerSpy.callCount ).to.equal( 1 );
        } );

        it( 'called :  boolean', function() {
            this.isIntegerSpy( 1 );
            expect( this.isIntegerSpy.called ).to.be.true;
        } );

        it( 'calledOnce : boolean', function() {
            this.isIntegerSpy( 1 );
            expect( this.isIntegerSpy.calledOnce ).to.be.true;
        } );

        it( 'calledTwice : boolean', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 2 );
            expect( this.isIntegerSpy.calledTwice ).to.be.true;
        } );

        it( 'calledThrice : boolean', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 2 );
            this.isIntegerSpy( 3 );
            expect( this.isIntegerSpy.calledThrice ).to.be.true;
        } );    

        it( 'reset', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy.resetHistory();
            expect( this.isIntegerSpy.callCount ).to.equal( 0 );
        } );

        it( 'returned : arguments => boolean', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 1.25 );
            expect( this.isIntegerSpy.returned( true ) ).to.be.true;
            expect( this.isIntegerSpy.returned( false ) ).to.be.true;
            expect( this.isIntegerSpy.returned( null ) ).to.be.false;
        } );

        it( 'alwaysReturned : arguments => boolean', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 1.25 );
            expect( this.isIntegerSpy.alwaysReturned( true ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysReturned( false ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysReturned( null ) ).to.be.false;
        } );

        it( 'firstCall, secondCall, thirdCall, lastCall : spyCall', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 2 );
            this.isIntegerSpy( 3 );
            expect( this.isIntegerSpy.firstCall.returnValue ).to.be.true;
            expect( this.isIntegerSpy.secondCall.returnValue ).to.be.true;
            expect( this.isIntegerSpy.thirdCall.returnValue ).to.be.true;
            expect( this.isIntegerSpy.lastCall.returnValue ).to.be.true;
        } );

        it( 'getCall : spyCall', function() {
            this.isIntegerSpy( 1 );
            this.isIntegerSpy( 2 );
            this.isIntegerSpy( 3 );
            expect( this.isIntegerSpy.getCall( 0 ).returnValue ).to.be.true;
            expect( this.isIntegerSpy.getCall( 1 ).returnValue ).to.be.true;
            expect( this.isIntegerSpy.getCall( 2 ).returnValue ).to.be.true;
        } );

        it( 'calledBefore, calledAfter : spy => boolean', function() {
            var anonymousSpy = sinon.spy();

            this.isIntegerSpy( 1 );
            anonymousSpy();

            expect( this.isIntegerSpy.calledBefore( anonymousSpy ) ).to.be.true;
            expect( anonymousSpy.calledAfter( this.isIntegerSpy ) ).to.be.true;
        } );

        it( 'calledOn : object => boolean', function() {
            var context = {};
            this.isIntegerSpy( 1 );
            _.bind( this.isIntegerSpy, context )();

            expect( this.isIntegerSpy.calledOn( context ) ).to.be.true;
        } );

        it( 'alwaysCalledOn: object => boolean', function() {
            var context = {};
            this.isIntegerSpy( 1 );
            _.bind( this.isIntegerSpy, context )();

            expect( this.isIntegerSpy.alwaysCalledOn( context ) ).to.be.false;
        } );

        it( 'calledWith: arguments => boolean', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            this.isIntegerSpy( 1, false );

            // partial matching from left to right
            expect( this.isIntegerSpy.calledWith( 1, true, 'abc' ) ).to.be.true;
            expect( this.isIntegerSpy.calledWith( 1, false ) ).to.be.true;
            expect( this.isIntegerSpy.calledWith( 1 ) ).to.be.true;
            expect( this.isIntegerSpy.calledWith( 1, true ) ).to.be.true;
            expect( this.isIntegerSpy.calledWith( 'abc' ) ).to.be.false;
            expect( this.isIntegerSpy.calledWith() ).to.be.true;
        } );

        it( 'alwaysCalledWith: arguments => boolean', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            this.isIntegerSpy( 1, false );

            // partial matching from left to right has to match on all calls
            expect( this.isIntegerSpy.alwaysCalledWith( 1, true, 'abc' ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWith( 1, false ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWith( 1 ) ).to.be.true;
            expect( this.isIntegerSpy.alwaysCalledWith( 1, true ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWith( 'abc' ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWith() ).to.be.true;
        } );

        it( 'neverCalledWith: arguments => boolean', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            this.isIntegerSpy( 1, false );

            // partial matching from left to right has to match on all calls
            expect( this.isIntegerSpy.neverCalledWith( 1, true, 'abc' ) ).to.be.false;
            expect( this.isIntegerSpy.neverCalledWith( 1, false ) ).to.be.false;
            expect( this.isIntegerSpy.neverCalledWith( 1 ) ).to.be.false;
            expect( this.isIntegerSpy.neverCalledWith( 1, true ) ).to.be.false;
            expect( this.isIntegerSpy.neverCalledWith( 'abc' ) ).to.be.true;
            expect( this.isIntegerSpy.neverCalledWith() ).to.be.false;
        } );

        it( 'calledWithExactly: arguments => boolean', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            this.isIntegerSpy( 1, false );

            // full matching of the whole argument list and nothing else
            expect( this.isIntegerSpy.calledWithExactly( 1, true, 'abc' ) )
                .to.be.true;
            expect( this.isIntegerSpy.calledWithExactly( 1, false ) )
                .to.be.true;
            expect( this.isIntegerSpy.calledWithExactly( 1 ) ).to.be.false;
            expect( this.isIntegerSpy.calledWithExactly( 1, true ) )
                .to.be.false;
            expect( this.isIntegerSpy.calledWithExactly( 'abc' ) ).to.be.false;
            expect( this.isIntegerSpy.calledWithExactly() ).to.be.false;
        } );

        it( 'alwaysCalledWithExactly: arguments => boolean', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            this.isIntegerSpy( 1, false );

            // full matching of the whole argument list on all calls
            expect( this.isIntegerSpy.alwaysCalledWithExactly( 1, true, 'abc' ) )
                .to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWithExactly( 1, false ) )
                .to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWithExactly( 1 ) ).to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWithExactly( 1, true ) )
                .to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWithExactly( 'abc' ) )
                .to.be.false;
            expect( this.isIntegerSpy.alwaysCalledWithExactly() ).to.be.false;
        } );

        it( 'threw : (() | string | object) => boolean', function() {
            var injectError = function() {
                invalidReference;
            }
            var errorSpy = sinon.spy( injectError );

            try {
                errorSpy();
            } catch( e ) {
                this.e = e;
            }

            expect( errorSpy.threw() ).to.be.true;
            expect( errorSpy.threw( 'ReferenceError' ) ).to.be.true;
            expect( errorSpy.threw( 'Error' ) ).to.be.false;
            expect( errorSpy.threw( this.e ) ).to.be.true;
        } );

        it.skip( 'calledWithNew - may result in false positives' );

        it( 'alwaysThrew : (() | string | object) => boolean', function() {
            var injectError = function( shouldThrow ) {
                if( shouldThrow ) invalidReference;
            }
            var errorSpy = sinon.spy( injectError );

            try {
                // swapping the two calls negates the 1st, 2nd and 4th assertions.
                errorSpy( false );
                errorSpy( true );
            } catch( e ) {
                this.e = e;
            }

            expect( errorSpy.alwaysThrew() ).to.be.false;
            expect( errorSpy.alwaysThrew( 'ReferenceError' ) ).to.be.false;
            expect( errorSpy.alwaysThrew( 'Error' ) ).to.be.false;
            expect( errorSpy.alwaysThrew( this.e ) ).to.be.false;
        } );

        it( 'thisValues : array', function() {
            var context = {};
            this.isIntegerSpy( 1 );
            _.bind( this.isIntegerSpy, context )();

            expect( this.isIntegerSpy.thisValues[1] ).to.equal( context );
        } );

        it( 'args : array', function() {
            this.isIntegerSpy( 1, true, 'abc' );
            expect( this.isIntegerSpy.args[0] ).to.deep.equal( [ 1, true, 'abc' ] );
        } );

        it( 'exceptions : array', function() {
            var injectError = function( shouldThrow ) {
                if( shouldThrow ) invalidReference;
            }
            var errorSpy = sinon.spy( injectError );

            try {
                errorSpy( false );
                errorSpy( true );
            } catch( e ) {
                this.e = e;
            }

            expect( errorSpy.exceptions[0] ).to.be.undefined;
            expect( errorSpy.exceptions[1] ).to.equal( this.e );
        } );

        it.skip( 'printf (string, array) => string', function() {
            // This function just formats a string injecting spy results.
            // Don't use it inside assertions!
        } );
    } );


    describe( 'SinonJs Spy Call API', function() {
        
        beforeEach( function() {
            this.isIntegerSpy = sinon.spy( isInteger );
            this.isIntegerSpy( 5, true, 'abc' );
            this.spyCall = this.isIntegerSpy.firstCall;
        } );

        afterEach( function() {
            delete this.firstCall;
            delete this.isIntegerSpy;
        } );

        it( 'calledOn : object => boolean', function() {
            expect( this.spyCall.calledOn( this ) ).to.be.true;
        } );

        it( 'calledWith : arguments => boolean', function() {
            expect( this.spyCall.calledWith() ).to.be.true;
            expect( this.spyCall.calledWith( 5 ) ).to.be.true;
            expect( this.spyCall.calledWith( 5, true ) ).to.be.true;
            expect( this.spyCall.calledWith( 5, true, 'abc' ) ).to.be.true;
        } );

        it( 'calledWithExactly : arguments => boolean', function() {
            expect( this.spyCall.calledWithExactly() ).to.be.false;
            expect( this.spyCall.calledWithExactly( 5 ) ).to.be.false;
            expect( this.spyCall.calledWithExactly( 5, true ) ).to.be.false;
            expect( this.spyCall.calledWithExactly( 5, true, 'abc' ) ).to.be.true;
        } );

        it( 'notCalledWith : arguments => boolean', function() {
            expect( this.spyCall.notCalledWith() ).to.be.false;
            expect( this.spyCall.notCalledWith( 5 ) ).to.be.false;
            expect( this.spyCall.notCalledWith( 5, true ) ).to.be.false;
            expect( this.spyCall.notCalledWith( 5, true, 'abc' ) ).to.be.false;
        } );

        it( 'threw : (() | string | object) => boolean', function() {
            var injectError = function() {
                invalidReference;
            }
            var errorSpy = sinon.spy( injectError );

            try {
                errorSpy();
            } catch( e ) {
                this.e = e;
            }

            var firstCall = errorSpy.getCall( 0 );

            expect( firstCall.threw() ).to.be.true;
            expect( firstCall.threw( 'ReferenceError' ) ).to.be.true;
            expect( firstCall.threw( 'Error' ) ).to.be.false;
            expect( firstCall.threw( this.e ) ).to.be.true;        
        } );

        it( 'thisValue : object', function() {
            expect( this.spyCall.thisValue ).to.equal( this );
        } );

        it( 'args : array', function() {
            expect( this.spyCall.args ).to.deep.equal( [ 5, true, 'abc' ] );
        } );

        it( 'exception : object', function() {
            expect( this.spyCall.exception ).to.be.undefined;    
        } );

        it( 'returnValue : any', function() {
            expect( this.spyCall.returnValue ).to.be.true;
        } );
    } );


    describe( 'SinonJs Spy and SpyCall Matchers', function() {
        beforeEach( function() {
            var getArgs = function() { return arguments; }
            this.getArgsSpy = sinon.spy( getArgs );
        } );    

        afterEach( function() {
            delete this.getArgsSpy;
        } );

        it( 'calledWithMatch : (matcher1, ..., matcherN) => boolean', function() {
            this.getArgsSpy( 5 );
            this.getArgsSpy( 'abc' );
            
            expect( this.getArgsSpy.calledWithMatch( sinon.match.number ) )
                .to.be.true;
            expect( this.getArgsSpy.calledWithMatch( sinon.match.string ) )
                .to.be.true;
            expect( this.getArgsSpy.calledWithMatch( sinon.match.bool ) )
                .to.be.false;
        } );

        it( 'alwaysCalledWithMatch : (matcher1, ..., matcherN) => boolean', 
            function() {
            
            this.getArgsSpy( 5 );
            this.getArgsSpy( 'abc' );
            
            expect( this.getArgsSpy.alwaysCalledWithMatch( sinon.match.number ) )
                .to.be.false;
            expect( this.getArgsSpy.alwaysCalledWithMatch( sinon.match.string ) )
                .to.be.false;
            expect( this.getArgsSpy.alwaysCalledWithMatch( sinon.match.bool ) )
                .to.be.false;
            expect( this.getArgsSpy.alwaysCalledWithMatch( sinon.match.any ) )
                .to.be.true;            
        } );

        it( 'neverCalledWithMatch : (matcher1, ..., matcherN) => boolean', 
            function() {
            
            this.getArgsSpy( 5 );
            this.getArgsSpy( 'abc' );
            
            expect( this.getArgsSpy.neverCalledWithMatch( sinon.match.number ) )
                .to.be.false;
            expect( this.getArgsSpy.neverCalledWithMatch( sinon.match.string ) )
                .to.be.false;
            expect( this.getArgsSpy.neverCalledWithMatch( sinon.match.bool ) )
                .to.be.true;        
        } );

        it( 'returned : matcher => boolean', function() {
            this.getArgsSpy( 5 ); 
            expect( this.getArgsSpy.returned( sinon.match.bool ) ).to.be.false;    
        } );

        it( 'spyCall.calledWithMatch: matcher => boolean', function() {
            this.getArgsSpy( 5 );
            this.getArgsSpy( true );
            var callSpy = this.getArgsSpy.firstCall;

            expect( callSpy.calledWithMatch( sinon.match.number ) ).to.be.true;
            expect( callSpy.calledWithMatch( sinon.match.bool ) ).to.be.false;
        } );

        it( 'spyCall.notCalledWithMatch: matcher => boolean', function() {
            this.getArgsSpy( 5 );
            this.getArgsSpy( true );
            var callSpy = this.getArgsSpy.firstCall;

            expect( callSpy.notCalledWithMatch( sinon.match.number ) ).to.be.false;
            expect( callSpy.notCalledWithMatch( sinon.match.bool ) ).to.be.true;
        } );

        it( 'Type matchers', function() {
            this.getArgsSpy( 5 );
            var callSpy = this.getArgsSpy.firstCall;

            expect( callSpy.calledWithMatch( sinon.match.any ) ).to.be.true;
            expect( callSpy.calledWithMatch( sinon.match.defined ) ).to.be.true;
            expect( callSpy.calledWithMatch( sinon.match.truthy) ).to.be.true;
            expect( callSpy.calledWithMatch( sinon.match.falsy ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.bool ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.number ) ).to.be.true;
            expect( callSpy.calledWithMatch( sinon.match.string ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.object ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.func ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.array ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.regexp ) ).to.be.false;
            expect( callSpy.calledWithMatch( sinon.match.date ) ).to.be.false;

            expect( callSpy.calledWithMatch( sinon.match.typeOf( 'number' ) ) )
                .to.be.true;
        } );

        it( 'Value == equality matchers', function() {
            var data = { value: 5 };
            this.getArgsSpy( 5 );
            this.getArgsSpy( data );
            var firstCallSpy = this.getArgsSpy.firstCall;
            var lastCallSpy = this.getArgsSpy.lastCall;

            expect( firstCallSpy.calledWithMatch( sinon.match( 5 ) ) ).to.be.true;
            expect( lastCallSpy.calledWithMatch( sinon.match( data ) ) ).to.be.true;
        } );

        it( 'Value and type === equality matchers', function() {
            this.getArgsSpy( 5 );
            var firstCallSpy = this.getArgsSpy.firstCall;

            expect( firstCallSpy.calledWithMatch( sinon.match.same( 5 ) ) )
                .to.be.true;
            expect( firstCallSpy.calledWithMatch( sinon.match.same( '5' ) ) )
                .to.be.false;
        } );

        it( 'instanceOf matcher', function() {
            this.getArgsSpy( new Error() );
            var firstCallSpy = this.getArgsSpy.firstCall;

            expect( firstCallSpy.calledWithMatch( 
                sinon.match.instanceOf( Object ) ) ).to.be.true;
        } );

        it( 'has property, has own property matchers', function() {
            this.getArgsSpy( new Error() );
            var firstCallSpy = this.getArgsSpy.firstCall;

            expect( firstCallSpy.calledWithMatch( sinon.match.has( 'stack' ) ) )
                .to.be.true;
            expect( firstCallSpy.calledWithMatch( sinon.match.has( 'toString' ) ) )
                .to.be.true;
            expect( firstCallSpy.calledWithMatch( 
                sinon.match.hasOwn( 'stack' ) ) ).to.be.true;
            expect( firstCallSpy.calledWithMatch( 
                sinon.match.hasOwn( 'toString' ) ) ).to.be.false;
        } );

        it( 'matcher and/or matcher', function() {
            this.getArgsSpy( 5 );
            this.getArgsSpy( '5' );
            var numberOrString = sinon.match.number.or( sinon.match.string );
            var numberAndFive = sinon.match.number.and( sinon.match( 5 ) );

            expect( this.getArgsSpy.alwaysCalledWithMatch( numberOrString ) )
                .to.be.true;
            expect( this.getArgsSpy.alwaysCalledWithMatch( numberAndFive ) )
                .to.be.false;
        } );

        it( 'custom matcher', function() {
            this.getArgsSpy( 2015 );
            var yearMatcher = sinon.match( function( year ) {
                return typeof year === 'number' &&
                       year >= 1970 &&
                       year <= 2015;
            } );

            expect( this.getArgsSpy.alwaysCalledWithMatch( yearMatcher ) )
                .to.be.true;
        } );
    } );

} );


describe( 'SinonJs Stubs', function() {

    beforeEach( function() {
        this.f = sinon.stub();
    });

    it( 'should demonstrate stubbing js/player.js getCoordinates()', function() {
        expect( player.getCoordinates() ).to.deep.equal( {x: 10, y: 10 } );

        sinon.stub( player, 'getCoordinates' ).returns( { x: 0, y: 10 } );
        player.moveRight().animate();
        expect( player.getCoordinates() ).to.deep.equal( {x: 0, y: 10 } );
        
        player.getCoordinates.restore();
        expect( player.getCoordinates() ).to.deep.equal( {x: 11, y: 10 } );
    });

    it( 'should return "stubbed value"', function() {
        this.f.returns( 'stubbed value' );
        expect( this.f() ).to.equal( 'stubbed value' );
    });

    it( 'should throw an error with text ReferenceError', function() {
        this.f.throws( new Error( 'ReferenceError' ) );
        expect( this.f ).to.throw( 'ReferenceError' );
    });

    it( 'should change behavior based on arguments', function() {
        this.f.withArgs( 5, true ).returns( true );
        this.f.withArgs( 3 ).returns( false );
        expect( this.f( 5, true ) ).to.be.true;
        expect( this.f( 3 ) ).to.be.false;
    });


    it( 'should return different values on its first 5 calls', function() {
        this.f.onFirstCall().returns( 1 );
        this.f.onSecondCall().returns( 2 );
        this.f.onThirdCall().returns( 3 );
        this.f.onCall( 3 ).returns( true );
        this.f.onCall( 4 ).returns( false );
        expect( this.f() ).to.equal( 1 );
        expect( this.f() ).to.equal( 2 );
        expect( this.f() ).to.equal( 3 );
        expect( this.f() ).to.be.true;
        expect( this.f() ).to.be.false;
    });

    it( 'should return its second argument', function() {
        this.f.returnsArg( 1 );
        expect( this.f(true, 5) ).to.equal( 5 );
    });

    it( 'should call its first argument', function() {
        var spy = sinon.spy();
        this.f.callsArg( 0 );
        this.f( spy );
        expect( spy.calledOnce ).to.be.true;
    });

    it( 'should call its first argument with arguments 5, true', function() {
        var spy = sinon.spy();
        this.f.callsArgWith( 0, 5, true );
        this.f( spy );
        expect( spy.calledOnce ).to.be.true;
        expect( spy.calledWith( 5, true ) ).to.be.true;
    });

    it( 'should call its first argument with a defined context', function() {
        var context = {};
        var spy = sinon.spy();
        this.f.callsArgOn( 0, context );
        this.f( spy );
        expect( spy.calledOnce ).to.be.true;
        expect( spy.calledOn( context ) ).to.be.true;
    });

    it( 'should call its first argument with a defined context and with argument 2', function() {
        var context = {};
        var spy = sinon.spy();
        this.f.callsArgOnWith( 0, context, 2 );
        this.f( spy );
        expect( spy.calledOnce ).to.be.true;
        expect( spy.calledOn( context ) ).to.be.true;
        expect( spy.calledWith( 2 ) ).to.be.true;
    });

});


describe( 'SinonJs Mocking Process', function() {
    it( 'should demonstrate the mocking process', function() {
        var basket = { cashout: function() {} };

        // 1. Start mocking
        var mock = sinon.mock( basket );

        // 2. formulate your expectations
        mock.expects( 'cashout' )
            .exactly( 1 )       // to be called once, same as once()
            .withArgs( 1, 2 );  // to be called with specified arguments

        // 3. Execute tested code
        // ...
        basket.cashout( 1, 2 );
        // ...

        // 4. Verify expectations
        mock.verify();

        // 5. Restore the object
        mock.restore();
    });
});


describe( 'SinonJs Mock Expectation', function() {

    beforeEach( function() {
        this.model = new Backbone.Model();
        this.mock = sinon.mock( this.model );
    });

    it( 'should call the set method at least  and at most 4 times', function() {
        this.mock.expects( 'set' ).atLeast( 4 ).atMost( 4 );

        this.model.set( 'a', 1 );
        this.model.set( 'b', 2 );
        this.model.set( 'c', 3 );
        this.model.set( 'd', 4 );

        this.mock.verify();        
    });

    it( 'should call the set method exactly 4 times', function() {
        this.mock.expects( 'set' ).exactly( 4 );

        this.model.set( 'a', 1 );
        this.model.set( 'b', 2 );
        this.model.set( 'c', 3 );
        this.model.set( 'd', 4 );

        this.mock.verify();        
    });    

    it( 'should never call the set method', function() {
        this.mock.expects( 'set' ).never();

        this.model.has( 'a' );

        this.mock.verify();        
    });   

    it( 'should call the set method once', function() {
        this.mock.expects( 'set' ).once();

        this.model.set( 'a', 1 );

        this.mock.verify();        
    }); 

    it( 'should call the set method twice', function() {
        this.mock.expects( 'set' ).twice();

        this.model.set( 'a', 1 );
        this.model.set( 'b', 2 );

        this.mock.verify();        
    });            

    it( 'should call the set method thrice', function() {
        this.mock.expects( 'set' ).thrice();

        this.model.set( 'a', 1 );
        this.model.set( 'b', 2 );
        this.model.set( 'c', 3 );
 
        this.mock.verify();        
    });  

    it( 'should call the set method with argument "a"', function() {
        this.mock.expects( 'set' ).withArgs( 'a' );

        this.model.set( 'a', 1 );

        this.mock.verify();
    });

    it( 'should call the set method with exact argument "a" and 1', function() {
        this.mock.expects( 'set' ).withExactArgs( 'a', 1 );

        this.model.set( 'a', 1 );

        this.mock.verify();
    });    

    it( 'should call the set method with context this.model', function() {
        this.mock.expects( 'set' ).on( this.model );

        this.model.set( 'a', 1 );

        this.mock.verify();
    });           

});


describe( 'Animation with SinonJs Fake Timer', function() {

    beforeEach( function() {

        this.clock = sinon.useFakeTimers();
        this.$square = $( '<div class="moving-square"></div>' );
        this.$square.appendTo( $( '#fixtures') );

        playAnimation( this.$square );
    });

    afterEach( function() {
        $( '#fixtures' ).empty();
        this.clock.restore();
    });

    it( 'should move 10 pixels per 20 milliseconds', function() {
        this.clock.tick( 20 );
        expect( this.$square.css( 'left' ) ).to.equal( '10px' );
    } );

    it( 'should move to the right of the window @ speed 500px / second', function() {
        var maxX = $( 'body' ).width() - 50;
        var numOfSteps = Math.ceil( maxX / 10 );
        var left = ( numOfSteps * 10 ) + 'px';
        this.clock.tick( numOfSteps * 20 );
        expect( this.$square.css( 'left' ) ).to.equal( left );
    } );

    it( 'should return to its original position @ speed 500px / second', function() {
        var maxX = $( 'body' ).width() - 50;
        var numOfSteps = Math.ceil( maxX / 10 ) * 2;
        this.clock.tick( numOfSteps * 20 );
        expect( this.$square.css( 'left' ) ).to.equal( '0px' );
    } );
 
});
