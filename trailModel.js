var trailModel = {
        width: 20, height: 20, overlayEffectOn: false, backTrackOn: true,
        theBoard: [], userData: {ID: "", timer: 0, step: 0, level: 0},
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
                this.board = [];

                //Debug mode on
                this.debugOn = true;

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

        if (this.debugOn) console.log(x+","+y+":"+ flag + ", dot exists: "+ (data != 0));

        if (data)
        {
                // check whether it is backtrack
                if (flag) {

                        trailModel.theBoard[this.lastX][this.lastY] = 0;

                        this.lastDot = data;

                        data.remove();
                        trailModel.theBoard[this.lastX = x][this.lastY = y] = 0;

                } 

                // create some effect when track overlays
                if (trailModel.overlayEffectOn) {
                        //will be worked on...
                }

        	return true;
        }
        return false;
};

//v1 the original makeTrail function, use CanvasEngine
trailModel.create.prototype.makeTrail = function(stage, cursor) 
{
        var x = cursor.x;
        var y = cursor.y;
        var x1 = x/32;
        var y1 = y/32;

        if (!this.exists(x1, y1)) {

                if (this.lastDot != 0) //if last dot is saved turn it on
                {
                        trailModel.theBoard[this.lastX][this.lastY] = this.lastDot;
                        stage.prepend(this.lastDot);
                        this.lastDot = 0; 
                }

                this.lastDot = new this.dot(x, y);
        	trailModel.theBoard[this.lastX = x1][this.lastY = y1] = this.lastDot;
        	//stage.prepend(this.lastDot);
        }
};

trailModel.create.prototype.existsV2 = function(x, y, dx, dy, ctx) 
{

        var flag = !trailModel.backTrackOn || (flag = this.trace.onTrack(x, y));
        var data = trailModel.theBoard[x][y];

        if (this.debugOn) console.log(x+","+y+":"+ flag + ", dot exists: "+ (data != 0));

        if (data)
        {
                // check whether it is backtrack
                if (flag) {

                        trailModel.theBoard[this.lastX][this.lastY] = 0;

                        this.lastDot = data;

                        var ddx = data.x*dx+dx/2-16;
                        var ddy = data.y*dy+dy/2-16;

                        ctx.clearRect(ddx+8, ddy+8, 20, 20);
                        trailModel.theBoard[this.lastX = x][this.lastY = y] = 0;

                } 

                // create some effect when track overlays
                if (trailModel.overlayEffectOn) {
                        //will be worked on...
                }

                return true;
        }
        return false;
};

// makeTrail adapter to work with AMaze.Renderer, use HTML5 Canvas
trailModel.create.prototype.makeTrailV2 = function(canvas, pos, cellSize, theEngine) {
        var x1 = pos[0];
        var y1 = pos[1];
        var dx = cellSize[0];
        var dy = cellSize[1];
        var debugOn = this.debugOn;

        var ctx = canvas.getContext('2d');

        if (!this.existsV2(x1, y1, dx, dy, ctx)) {

                if (this.lastDot != 0) //if last dot is saved turn it on
                {
                        trailModel.theBoard[this.lastX][this.lastY] = this.lastDot;

                        ctx.drawImage(theEngine.Materials.get("trail2"), this.lastDot.x*dx+dx/2-16, this.lastDot.y*dy+dy/2-16);

                        this.lastDot = 0; 
                }

                this.lastDot = new this.dot(x1, y1);
                trailModel.theBoard[this.lastX = x1][this.lastY = y1] = this.lastDot;
                //stage.prepend(this.lastDot);
        }
}

//
// User data model
//
trailModel.userData = function() {

        this.startTime = 0;

        this.startTimer = function() {
                this.startTime = Date.getTime();
        }

        this.Step = function() {
                ++trailModel.userData.step;
        }

        this.setLevel = function(level) {
                trailModel.userData.level = level;
        }

        this.getGameTime = function() {
                return (trailModel.userData.timer = (Date.getTime() - this.StartTime)/1000);
        }
}

