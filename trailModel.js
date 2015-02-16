var trailModel = {
        width: 20, height: 20, overlayEffectOn: false, backTrackOn: true,
        theBoard: [],
        create: function(trailDot, opts) {
                // trailModel and mazeModel should share same opts object
        	//
                trailModel.width = typeof opts !== "undefined"? opts.width || trailModel.width : trailModel.width;
                trailModel.height = typeof opts !== "undefined"? opts.height || trailModel.height : trailModel.height; 

                this.dot = trailDot;
                this.trace = {};

                this.lastDot = 0;
                this.lastX = 0;
                this.lastY = 0;

		for( var x = trailModel.width; x--; )
		{
			trailModel.theBoard.push([]);
			for( var y = trailModel.height; y--; )
			{
				trailModel.theBoard[trailModel.width-x-1].push(0);
			}
		}

                // turn overaly effect on/off
                this.setOverlayEffect = function(flag) {
                        trailModel.overlayEffectOn = boolean(flag);
                }
                
                // turn backtrack on/off
                this.setBackTrack = function(flag) {
                        trailModel.backTrackOn = boolean(flag);
                }

                this.trace = new backtrack.model();

        }
};

trailModel.create.prototype.exists = function(x, y) 
{

        var flag = !trailModel.backTrackOn || (flag = this.trace.onTrack(x, y));
        var data = trailModel.theBoard[x][y];

        console.log(x+","+y+":"+flag);

        if (data)
        {
                // check if it is backtrack
                if (flag) {
                        
                        data.remove();
                        trailModel.theBoard[x][y] = 0;

                        // remove previous dot if exists in backtrack
                        if (this.lastDot != 0)
                        {
                                this.lastDot.remove();
                                trailModel.theBoard[this.lastX][this.lastY] = 0;
                                this.lastDot = 0;
                        }
                } 

                // create some effect when track overlays
                if (trailModel.overlayEffectOn) {
                        
                }

        	return true;
        }
        return false;
};

trailModel.create.prototype.makeTrail = function(stage, cursor) 
{
        var x = cursor.x;
        var y = cursor.y;
        var x1 = x/32;
        var y1 = y/32;

        if (!this.exists(x1, y1)) {
                this.lastDot = new this.dot(x, y);
        	trailModel.theBoard[this.lastX = x1][this.lastY = y1] = this.lastDot;
        	stage.prepend(this.lastDot);
        }
};

