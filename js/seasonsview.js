var seasonsView = {
    template : '<ul><li class="js-season">Spring</li>' +
                   '<li class="js-season">Summer</li>' +
                   '<li class="js-season">Autumn</li>' + 
                   '<li class="js-season">Winter</li></ul>',
    el       : '#seasons',
    render   : function() {
        $( '#seasons' ).empty().prepend( this.template );
    }  
};