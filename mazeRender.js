var AMaze = AMaze || {};
AMaze.render = {
	style:{bg: '#fff', wall:'#000', entrance:'#0f0', exit:'#f00' ,width:null,height:null,padding:5},
	canvas:null,
	canvasEngine:null,maze:null,player:null,
	actualWidth:null,actualHeight:null,
	cellWidth:null,cellHeight:null,
	MazeRenderer: function(opts) {
		//opts should have a canvasengine object in it, an element for the player, and the maze object,
		//a style object is optional
		this.player = opts.hasOwnProperty('player')? opts.player : null;//player object
		this.canvasEngine = opts.hasOwnProperty('canvasEngine')? opts.canvasEngine : null;
		this.maze = opts.hasOwnProperty('maze')? opts.maze : null;

		//style options
		var tempStyleObj = opts.hasOwnProperty('style')? opts.style : null;
		if(tempStyleObj != null) {
			for(var key in tempStyleObj) {
				if(this.style.hasOwnProperty(key)) {
					this.style.key = tempStyleObj.key;
				}
			}
		}

		//derived values
		if(this.canvasEngine != null && this.maze != null)
		{
			this.canvas = this.canvasEngine.getCanvas();
			this.actualWidth = this.canvas.width;
			this.actualHeight = this.canvas.height;
			this.style.width = this.actualWidth-this.style.padding;
			this.style.height = this.actualHeight-this.style.padding;

			//maze-specific derived values
			this.cellWidth = this.style.width/this.maze.width;
			this.cellHeight = this.style.height/this.maze.height;
		}
	}
};

//draw the initial maze on the canvas
AMaze.render.MazeRenderer.prototype.drawMaze = function() {
	if(this.canvas != null && this.maze != null) {
		var ctx = this.canvas.getContext('2d');

		//clearing the canvas
		ctx.rect(0,0,this.actualWidth,this.actualHeight);
		ctx.fillStyle=this.style.bg;
		ctx.fill();

		//drawing entrance
		ctx.fillStyle = this.style.entrance;
		ctx.strokeStyle = this.style.entrance;
		ctx.rect(this.cellWidth*this.maze.start[0],this.cellHeight*this.maze.start[1],
			this.cellWidth*(this.maze.start[0]+1),this.cellHeight*(this.maze.start[1]+1));
		ctx.fill();

		//drawing exit
		ctx.fillStyle = this.style.exit;
		ctx.strokeStyle = this.style.exit;
		ctx.rect(this.cellWidth*this.maze.end[0],this.cellHeight*this.maze.end[1],
			this.cellWidth*(this.maze.end[0]+1),this.cellHeight*(this.maze.end[1]+1));
		ctx.fill();

		var drawWall = function(ctx,x1,y1,x2,y2) {
			ctx.strokeStyle=this.style.wall;
			ctx.beginPath();
			ctx.moveTo(x1,y1);
			ctx.lineTo(x2,y2);
			ctx.stroke();
		};

		//drawing the maze
		for( x = 0; x < this.maze.width; x++)
		{
			for( y = 0; y < this.maze.height; y++)
			{
				if((this.maze.board[x][y] & AMaze.model.N_CONST) != AMaze.model.N_CONST)
				{
					drawWall(this.cellWidth*x,this.cellHeight*y, this.cellWidth*(x+1),thix.cellHeight*y);
				}
				if((this.maze.board[x][y] & AMaze.model.E_CONST) != AMaze.model.E_CONST)
				{
					drawWall(this.cellWidth*(x+1),this.cellHeight*y, this.cellWidth*(x+1),thix.cellHeight*(y+1));
				}
				if((this.maze.board[x][y] & AMaze.model.S_CONST) != AMaze.model.S_CONST)
				{
					drawWall(this.cellWidth*x,this.cellHeight*(y+1), this.cellWidth*(x+1),thix.cellHeight*(y+1));
				}
				if((this.maze.board[x][y] & AMaze.model.W_CONST) != AMaze.model.W_CONST)
				{
					drawWall(this.cellWidth*x,this.cellHeight*y, this.cellWidth*x,thix.cellHeight*(y+1));
				}
			}
		}
	}
};

//refresh position of player (maybe trail if mluo wants to merge his changes in here?)
AMaze.render.MazeRenderer.prototype.refresh = function() {
	//no need to do anything if canvas == null
	if(this.canvas != null && this.player != null && this.maze != null) {
		this.player.x = this.maze.currPos[0]*this.cellWidth;
		this.player.y = this.maze.currPos[1]*this.cellHeight;

		//maybe do trail things here
	}
};