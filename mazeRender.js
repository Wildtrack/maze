var AMaze = AMaze || {};
AMaze.render = {
	MazeRenderer: function(opts) {
		this.style = {bg: '#fff', wall:'#000', entrance:'#0f0', exit:'#f00' ,width:null,height:null,padding:5,
			spritemap:null, tileSize:[32,32]};
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

			this.player = this.canvasEngine.createElement(this.style.tileSize[0],this.style.tileSize[1]);
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

		var self = this;

		//need to decide between arbitrary lines and sprites here
		if(spritemap == null)
		{
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
			this.displayMaze.closePath();
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
		this.player.x = this.style.padding + (this.maze.currPos[0]*this.cellWidth);
		this.player.y = this.style.padding + (this.maze.currPos[1]*this.cellHeight);

		//maybe do trail things here
	}
};