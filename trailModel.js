var trailModel = {
        width: 20, height: 20, theBoard: [],
        create: function(trailDot, opts) {
                // trailModel and mazeModel should share same opts object
        	//
                trailModel.width = typeof opts !== "undefined"? opts.width || trailModel.width : trailModel.width;
                trailModel.height = typeof opts !== "undefined"? opts.height || trailModel.height : trailModel.height; 

                this.dot = trailDot;

		for( var x = trailModel.width; x--; )
		{
			trailModel.theBoard.push([]);
			for( var y = trailModel.height; y--; )
			{
				trailModel.theBoard[trailModel.width-x-1].push();
			}
		}
        }
};

        trailModel.create.prototype.exists = function(x, y) 
        {
        		var data = trailModel.theBoard[x][y];
        		if (typeof data == "object")
        		{
        			//data.remove();
        			//trailModel.theBoard[x][y] = null;
        			return 1;
        		}
        		return 0;
        };

        trailModel.create.prototype.makeTrail = function(stage, cursor) 
        {
                        var x = cursor.x;
                        var y = cursor.y;
        		var x1 = x/32;
        		var y1 = y/32;
        		if (!this.exists(x1, y1)) {
        			var newDot = new this.dot(x, y);
        			trailModel.theBoard[x1][y1] = newDot;
        			stage.prepend(newDot);
        		}
        };