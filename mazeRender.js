var AMaze = AMaze || {};
AMaze.render = {
	MazeRenderer: function(opts) {
		this.style = {bg: '#fff', wall:'#000', entrance:'#0f0', exit:'#f00' ,width:null,height:null,padding:5,
			spritemap:null, cellSize:[64,64]};
		this.canvas = null;
		this.canvasEngine = null;
		this.scene = null;
		this.stage = null;
		this.maze = null;
		this.player = null;
		this.displayMaze = null;
		this.actualWidth = null;
		this.actualHeight = null;
		this.cellWidth = null;
		this.cellHeight = null;
		this.displayMazeUL = [];

		//opts should have a canvasengine object in it, the stage, and the maze object,
		//a style object is optional
		this.stage = opts.hasOwnProperty('stage')? opts.stage : null;
		this.scene = opts.hasOwnProperty('scene')? opts.scene : null;
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

		//spritemap is rather dense and complicated
		//	{image:(materials string), size:[(number of gridbox lines), (number of gridbox columns)],
		//		tile:[(width of each gridbox),(height of each gridbox)], reg:[(x origin), (y origin)],
		//		set:[(1st identifier starting from top left), (2nd identifier), ...],
		//		cellSize:[(width of cell),(height of cell)],
		//		cells:[...] }
		//cellSize gives the width and height of a cell in px, which should be the same as the tiles
		//	added together
		//cells is also dense and complicated
		//each array location corresponds to the direction that the cell will indicate
		//ex: 0 is no openings, 1 is opening to the north, 5 opening to the north and south, etc
		//each array location is an array with tile objects in it:
		//	[	{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},...	]
		//x/y correspond to where the upper left corner of the image should start
		//width/height indicate how big the tile should be scaled to fit, 0 or absent is ignored
		//tiles gives a selection of tiles that could be used, corresponding to identifiers given in the spritemap set array
		//if there is only one tile, it will always use that one, if there is more than one, it will choose randomly
		//all together:
		//{
		//	image:(materials string),
		//	size:[(number of gridbox lines), (number of gridbox columns)],
		//	tile:[(width of each gridbox),(height of each gridbox)],
		//	reg:[(x origin), (y origin)],
		//	set:[(1st identifier starting from top left), (2nd identifier), ...],
		//	cells:[
		//		[{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},... ],
		//		[{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},... ],...}
		//	]
		//}



		//derived values
		if(this.scene != null && this.maze != null)
		{
			this.canvas = this.scene.getCanvas();
			this.actualWidth = this.canvas.width;
			this.actualHeight = this.canvas.height;
			this.style.width = this.actualWidth-(this.style.padding*2);
			this.style.height = this.actualHeight-(this.style.padding*2);

			//maze-specific derived values
			var minWidth = Math.min(this.style.width, this.style.height);
			this.displayMazeUL = [(this.style.width-minWidth)/2 + this.style.padding, (this.style.height-minWidth)/2 + this.style.padding];

			var maxCells = Math.max(this.maze.width, this.maze.height);

			this.cellWidth = minWidth/maxCells;
			this.cellHeight = minWidth/maxCells;

			this.displayMazeUL[0] += (minWidth-this.cellWidth*this.maze.width)/2;
			this.displayMazeUL[1] += (minWidth-this.cellHeight*this.maze.height)/2;
		}

		//setting up the stage
		if(this.scene != null && this.stage != null) {
			this.displayMaze = this.scene.createElement(this.style.cellSize[0]*this.maze.width, this.style.cellSize[1]*this.maze.height);
			this.displayMaze.x = this.displayMazeUL[0];
			this.displayMaze.y = this.displayMazeUL[1];
			this.displayMaze.multiple = true;
        	this.stage.append(this.displayMaze);

			this.player = this.scene.createElement(this.cellWidth,this.cellHeight);
			var pls = this.canvasEngine.Materials.get("player");
			this.player.drawImage("player",  (this.cellWidth/2)-(pls.naturalWidth/2), (this.cellHeight/2)-(pls.naturalHeight/2));
        	this.stage.append(this.player);
		}
	}
};

//draw the initial maze on the canvas
AMaze.render.MazeRenderer.prototype.drawMaze = function() {
	if(this.maze != null && this.displayMaze != null) {
		var self = this;

		//need to decide between arbitrary lines and sprites here
		if(this.style.spritemap == null)
		{
			//drawing entrance
			this.displayMaze.fillStyle = this.style.entrance;
			this.displayMaze.strokeStyle = this.style.entrance;
			this.displayMaze.fillRect(this.style.cellSize[0]*this.maze.start[0], this.style.cellSize[1]*this.maze.start[1],
				this.style.cellSize[0], this.style.cellSize[1]);

			//drawing exit
			this.displayMaze.fillStyle = this.style.exit;
			this.displayMaze.strokeStyle = this.style.exit;
			this.displayMaze.fillRect( this.style.cellSize[0]*this.maze.end[0], this.style.cellSize[1]*this.maze.end[1],
				this.style.cellSize[0], this.style.cellSize[1]);

			var drawWall = function(x1,y1,x2,y2) {
				self.displayMaze.moveTo(x1,y1);
				self.displayMaze.lineTo(x2,y2);
				self.displayMaze.stroke();
			};

			//drawing the maze
			this.displayMaze.beginPath();
			this.displayMaze.strokeStyle  = self.style.wall;
			for( x = 0; x < this.maze.width; x++)
			{
				for( y = 0; y < this.maze.height; y++)
				{
					if((this.maze.board[x][y] & AMaze.model.N_CONST) != AMaze.model.N_CONST)
					{
						drawWall( this.style.cellSize[0]*x, this.style.cellSize[1]*y,
							this.style.cellSize[0]*(x+1), this.style.cellSize[1]*y );
					}
					if((this.maze.board[x][y] & AMaze.model.E_CONST) != AMaze.model.E_CONST)
					{
						drawWall( this.style.cellSize[0]*(x+1), this.style.cellSize[1]*y,
							this.style.cellSize[0]*(x+1), this.style.cellSize[1]*(y+1) );
					}
					if((this.maze.board[x][y] & AMaze.model.S_CONST) != AMaze.model.S_CONST)
					{
						drawWall( this.style.cellSize[0]*x, this.style.cellSize[1]*(y+1),
							this.style.cellSize[0]*(x+1), this.style.cellSize[1]*(y+1) );
					}
					if((this.maze.board[x][y] & AMaze.model.W_CONST) != AMaze.model.W_CONST)
					{
						drawWall( this.style.cellSize[0]*x, this.style.cellSize[1]*y,
							this.style.cellSize[0]*x, this.style.cellSize[1]*(y+1) );
					}
				}
			}
			this.displayMaze.closePath();
			this.displayMaze.scaleTo( this.cellWidth/this.style.cellSize[0] );//needed / actual
		}
		else
		{
			//draw with sprites
		}
	}
};

//refresh position of player (maybe trail if mluo wants to merge his changes in here?)
AMaze.render.MazeRenderer.prototype.refresh = function() {
	//no need to do anything if canvas == null
	if(this.canvas != null && this.player != null && this.maze != null) {
		this.player.x = this.displayMazeUL[0] + (this.maze.currPos[0]*this.cellWidth);
		this.player.y = this.displayMazeUL[1] + (this.maze.currPos[1]*this.cellHeight);

		//maybe do trail things here
	}
};