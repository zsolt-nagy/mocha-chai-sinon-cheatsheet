var player = {
   x: 10,
   y: 10,
   vx: 0,

   getCoordinates: function() { 
       return { x: this.x, y: this.y } 
   },

   moveRight: function() { 
       this.vx += 1; 
       return this; 
   },

   animate: function() { 
       this.x += this.vx; 
       return this; 
   } //, ...
};