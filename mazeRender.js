var AMaze = AMaze || {};
AMaze.render = {
	MazeRenderer: function(opts) {
		this.style = {bg: '#fff', wall:'#000', entrance:'#0f0', exit:'#f00' ,width:null,height:null,padding:5};
		this.canvas = null;
		this.canvasEngine = null;
		this.stage = null;
		this.maze = null;
		this.player = null;
		this.displayMaze = null;
		this.actualWidth = null;
		this.actualHeight = null;
		this.cellWidth = null;
		this.cellHeight = null;

		//opts should have a canvasengine object in it, the stage, and the maze object,
		//a style object is optional
		this.stage = opts.hasOwnProperty('stage')? opts.stage : null;
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
			this.actualWidth = this.canvas.width-this.style.padding;
			this.actualHeight = this.canvas.height-this.style.padding;
			this.style.width = this.actualWidth-this.style.padding;
			this.style.height = this.actualHeight-this.style.padding;

			//maze-specific derived values
			this.cellWidth = this.style.width/this.maze.width;
			this.cellHeight = this.style.height/this.maze.height;
		}

		//setting up the stage
		if(this.canvasEngine != null && this.stage != null) {
			this.displayMaze = this.canvasEngine.createElement(this.actualWidth, this.actualHeight);
			this.displayMaze.x = 0;
			this.displayMaze.y = 0;
			this.displayMaze.multiple = true;
        	this.stage.append(this.displayMaze);

			this.player = this.canvasEngine.createElement(32,32);
			this.player.drawImage("player");
        	this.stage.append(this.player);
		}
	}
};

//draw the initial maze on the canvas
AMaze.render.MazeRenderer.prototype.drawMaze = function() {
	if(this.maze != null && this.displayMaze != null) {

		//clearing the canvas
		this.displayMaze.rect(0,0,this.actualWidth,this.actualHeight);
		this.displayMaze.fillStyle=this.style.bg;
		this.displayMaze.fill();

		//drawing entrance
		this.displayMaze.fillStyle = this.style.entrance;
		this.displayMaze.strokeStyle = this.style.entrance;
		this.displayMaze.fillRect(this.style.padding + this.cellWidth*this.maze.start[0],this.style.padding + this.cellHeight*this.maze.start[1],
			this.cellWidth, this.cellHeight);

		//drawing exit
		this.displayMaze.fillStyle = this.style.exit;
		this.displayMaze.strokeStyle = this.style.exit;
		this.displayMaze.fillRect((this.style.padding + this.cellWidth*this.maze.end[0]),(this.style.padding + this.cellHeight*this.maze.end[1]),
			this.cellWidth, this.cellHeight);

		var self = this;

		var drawWall = function(ctx,x1,y1,x2,y2) {
			self.displayMaze.strokeStyle  = self.style.wall;
			self.displayMaze.beginPath();
			self.displayMaze.moveTo(x1,y1);
			self.displayMaze.lineTo(x2,y2);
			self.displayMaze.stroke();
			self.displayMaze.closePath();
		};

		//drawing the maze
		for( x = 0; x < this.maze.width; x++)
		{
			for( y = 0; y < this.maze.height; y++)
			{
				if((this.maze.board[x][y] & AMaze.model.N_CONST) != AMaze.model.N_CONST)
				{
					drawWall((this.style.padding + this.cellWidth*x),(this.style.padding + this.cellHeight*y),
						(this.style.padding + this.cellWidth*(x+1)),(this.style.padding + this.cellHeight*y));
				}
				if((this.maze.board[x][y] & AMaze.model.E_CONST) != AMaze.model.E_CONST)
				{
					drawWall((this.style.padding + this.cellWidth*(x+1)),(this.style.padding + this.cellHeight*y),
						(this.style.padding + this.cellWidth*(x+1)),(this.style.padding + this.cellHeight*(y+1)));
				}
				if((this.maze.board[x][y] & AMaze.model.S_CONST) != AMaze.model.S_CONST)
				{
					drawWall((this.style.padding+ this.cellWidth*x),(this.style.padding + this.cellHeight*(y+1)),
						(this.style.padding + this.cellWidth*(x+1)),(this.style.padding + this.cellHeight*(y+1)));
				}
				if((this.maze.board[x][y] & AMaze.model.W_CONST) != AMaze.model.W_CONST)
				{
					drawWall((this.style.padding + this.cellWidth*x),(this.style.padding + this.cellHeight*y),
						(this.style.padding + this.cellWidth*x),(this.style.padding + this.cellHeight*(y+1)));
				}
			}
		}
	}
};

//refresh position of player (maybe trail if mluo wants to merge his changes in here?)
AMaze.render.MazeRenderer.prototype.refresh = function() {
	//no need to do anything if canvas == null
	if(this.canvas != null && this.player != null && this.maze != null) {
		this.player.x = this.style.padding + (this.maze.currPos[0]*this.cellWidth);
		this.player.y = this.style.padding + (this.maze.currPos[1]*this.cellHeight);

		//maybe do trail things here
	}
};