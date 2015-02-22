var AMaze = AMaze || {};
AMaze.render = {
	MazeRenderer: function(opts) {
		this.style = {bg: '#fff', wall:'#000', entrance:'#0f0', exit:'#f00' ,width:null,height:null,padding:5,
			spritemap:null, cellSize:[64,64]};
		this.canvas = null;
		this.canvasEngine = null;
		this.bgCanvas = null;
		this.cacheCanvas = document.createElement('canvas');
		this.scene = null;
		this.stage = null;
		this.maze = null;
		this.player = null;
		this.actualWidth = null;
		this.actualHeight = null;
		this.displayMazeUL = [0,0];
		this.pcUL = [];
		this.scaleFactor = 1;

		//opts should have a canvasengine object in it, the stage, and the maze object,
		//a style object is optional
		this.stage = opts.hasOwnProperty('stage')? opts.stage : null;
		this.scene = opts.hasOwnProperty('scene')? opts.scene : null;
		this.canvasEngine = opts.hasOwnProperty('canvasEngine')? opts.canvasEngine : null;
		this.maze = opts.hasOwnProperty('maze')? opts.maze : null;
		this.bgCanvas = opts.hasOwnProperty('bgcanvas')? opts.bgcanvas : null;

		//style options
		var tempStyleObj = opts.hasOwnProperty('style')? opts.style : null;
		if(tempStyleObj != null) {
			for(var key in tempStyleObj) {
				if(this.style.hasOwnProperty(key)) {
					this.style[key] = tempStyleObj[key];
				}
			}
		}

		//spritemap is rather dense and complicated
		//	{image:(materials string), size:[(number of gridbox lines), (number of gridbox columns)],
		//		tile:[(width of each gridbox),(height of each gridbox)], reg:[(x origin), (y origin)],
		//		set:[(1st identifier starting from top left), (2nd identifier), ...],
		//		cellSize:[(width of cell),(height of cell)],
		//		cells:[...],
		//		entrances:[...],
		//		exits:[...] }
		//cellSize gives the width and height of a cell in px, which should be the same as the tiles
		//	added together
		//cells is also dense and complicated (entrances and exits is the same structure, but defines
		//	the look for entrance tiles and exit tiles, as opposed to normal ground tiles)
		//each array location corresponds to the direction that the cell will indicate
		//ex: 0 is no openings, 1 is opening to the north, 5 opening to the north and south, etc
		//each array location is an array with tile objects in it:
		//	[	{x:0,y:0,width:0,height:0, tiles:["gridtile1","gridtile2",...]},...	]
		//x/y correspond to where the upper left corner of the image should start relative to the tile's UL
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
		//	],
		//	entrances: [
		//		...
		//	],
		//	exits: [
		//		...
		//	]
		//}



		//derived values
		if(this.scene != null && this.maze != null)
		{
			this.cacheCanvas.width = this.maze.width*this.style.cellSize[0]+2;
			this.cacheCanvas.height = this.maze.height*this.style.cellSize[1]+2;
			this.canvas = this.scene.getCanvas();
			$('#'+this.bgCanvas.id).css('background-color', this.style.bg);
			this.actualWidth = this.canvas.width;
			this.actualHeight = this.canvas.height;
			this.style.width = this.actualWidth-(this.style.padding*2);
			this.style.height = this.actualHeight-(this.style.padding*2);

			//maze-specific derived values
			var minWidth = Math.min(this.style.width, this.style.height);
			this.displayMazeUL = [(this.style.width-minWidth)/2 + this.style.padding, (this.style.height-minWidth)/2 + this.style.padding];

			var maxCells = Math.max(this.maze.width, this.maze.height);

			this.displayMazeUL[0] += (minWidth-this.style.cellSize[0]*this.maze.width)/2;
			this.displayMazeUL[1] += (minWidth-this.style.cellSize[1]*this.maze.height)/2;
		}

		//setting up the stage
		if(this.scene != null && this.stage != null) {
			this.player = this.scene.createElement(this.style.cellSize[0],this.style.cellSize[1]);
			var pls = this.canvasEngine.Materials.get("player");
			this.player.drawImage("player",  (this.style.cellSize[0]/2)-(pls.naturalWidth/2), (this.style.cellSize[1]/2)-(pls.naturalHeight/2));
        	this.stage.append(this.player);
		}
	},
	fastRound: function(val) {
		return (0.5 + val) << 0;
	}
};

//draw the initial maze on the canvas
AMaze.render.MazeRenderer.prototype.drawMaze = function() {
	if(this.maze != null)
	{
		var self = this, cellBeingDrawn = [0,0], ctx = this.cacheCanvas.getContext('2d');
		if(this.style.spritemap != null)
		{
			var tilesetImage = this.canvasEngine.Materials.get(this.style.spritemap.image),
			tiles = [], tileSize = this.style.spritemap.tile,
			offset = this.style.spritemap.reg, cells = this.style.spritemap.cells,
			entrances = this.style.spritemap.entrances, exits = this.style.spritemap.exits,
			cellDef, localOffset = [0,0];
			//building the catalogue of sprites
			for(var y = 0; y < this.style.spritemap.size[1]; y++)
			{
				for(var x = 0; x < this.style.spritemap.size[0]; x++)
				{
					if(this.style.spritemap.set[y*this.style.spritemap.size[0]+x] != "blank")
					{
						var tempCanvas = document.createElement('canvas'),
						tempCtx = tempCanvas.getContext('2d');
						tempCanvas.width = tileSize[0];
						tempCanvas.height = tileSize[1];
						tempCtx.drawImage(tilesetImage,
							offset[0] + x*tileSize[0],	offset[1] + y*tileSize[1], tileSize[0], tileSize[1],
							0,							0,						   tileSize[0], tileSize[1]);
						tiles[this.style.spritemap.set[y*this.style.spritemap.size[0]+x]] = tempCanvas;
					}
				}
			}
			//catalogue built, now draw that sweet-tastic maze
			for( x = 0; x < this.maze.width; x++)
			{
				for( y = 0; y < this.maze.height; y++)
				{
					localOffset = [x*this.style.cellSize[0], y*this.style.cellSize[1]];
					cellDef = this.style.spritemap.cells[this.maze.board[x][y]];
					for(var idx = 0; idx < cellDef.length; idx++)
					{
						var obj = cellDef[idx],
						img = tiles[obj.tiles.length>1? obj.tiles[Math.floor(Math.random()*obj.tiles.length)] : obj.tiles[0]];
						ctx.drawImage(img, localOffset[0]+obj.x, localOffset[1]+obj.y);
						//technically I should worry about scaling here but not at present
					}
					if(x == this.maze.start[0] && y == this.maze.start[1])
					{
						//overlay with start color at 20% alpha
						ctx.save();
						ctx.fillStyle = this.style.entrance;
						ctx.globalAlpha = 0.2;
						ctx.fillRect(localOffset[0],localOffset[1], this.style.cellSize[0],this.style.cellSize[1]);
						ctx.restore();
					}
					if(x == this.maze.end[0] && y == this.maze.end[1])
					{
						//overlay with end color at 20% alpha
						ctx.save();
						ctx.fillStyle = this.style.exit;
						ctx.globalAlpha = 0.2;
						ctx.fillRect(localOffset[0],localOffset[1], this.style.cellSize[0],this.style.cellSize[1]);
						ctx.restore();
					}
				}
			}
		}
		else
		{

			var	drawWall = function(x1,y1,x2,y2) {
				ctx.moveTo(AMaze.render.fastRound(cellBeingDrawn[0]+x1+1), AMaze.render.fastRound(cellBeingDrawn[1]+y1+1));
				ctx.lineTo(AMaze.render.fastRound(cellBeingDrawn[0]+x2+1), AMaze.render.fastRound(cellBeingDrawn[1]+y2+1));
				ctx.stroke();
			};

			//drawing entrance
			cellBeingDrawn = [this.maze.start[0]*this.style.cellSize[0], this.maze.start[1]*this.style.cellSize[1]];
			ctx.fillStyle = this.style.entrance;
			ctx.strokeStyle = this.style.entrance;
			ctx.fillRect(cellBeingDrawn[0]+1,cellBeingDrawn[1]+1, this.style.cellSize[0], this.style.cellSize[1]);

			//drawing exit
			cellBeingDrawn = [this.maze.end[0]*this.style.cellSize[0], this.maze.end[1]*this.style.cellSize[1]];
			ctx.fillStyle = this.style.exit;
			ctx.strokeStyle = this.style.exit;
			ctx.fillRect(cellBeingDrawn[0]+1,cellBeingDrawn[1]+1, this.style.cellSize[0], this.style.cellSize[1]);

			//drawing the maze
			ctx.fillStyle = this.style.bg;
			ctx.strokeStyle = self.style.wall;
			for( x = 0; x < this.maze.width; x++)
			{
				for( y = 0; y < this.maze.height; y++)
				{
					cellBeingDrawn = [x*this.style.cellSize[0],y*this.style.cellSize[1]];
					if(! ((x == this.maze.start[0] && y == this.maze.start[1]) || ( x == this.maze.end[0] && y == this.maze.end[1])) )
						ctx.fillRect(cellBeingDrawn[0]+1,cellBeingDrawn[1]+1, this.style.cellSize[0],this.style.cellSize[1]);
					//ctx.beginPath();

					if((this.maze.board[x][y] & AMaze.model.N_CONST) != AMaze.model.N_CONST)
					{
						drawWall( 0, 0, this.style.cellSize[0], 0 );
					}
					if((this.maze.board[x][y] & AMaze.model.E_CONST) != AMaze.model.E_CONST)
					{
						drawWall( this.style.cellSize[0], 0, this.style.cellSize[0], this.style.cellSize[1] );
					}
					if((this.maze.board[x][y] & AMaze.model.S_CONST) != AMaze.model.S_CONST)
					{
						drawWall( 0, this.style.cellSize[1], this.style.cellSize[0], this.style.cellSize[1] );
					}
					if((this.maze.board[x][y] & AMaze.model.W_CONST) != AMaze.model.W_CONST)
					{
						drawWall( 0, 0, 0, this.style.cellSize[1] );
					}
					//ctx.closePath();
				}
			}
		}
	}
};

//refresh position of player and trail 
AMaze.render.MazeRenderer.prototype.refresh = function() {
	//no need to do anything if canvas == null
	if(this.canvas != null && this.player != null && this.maze != null) {
		//new viewport movement:
		//pcUL[0] = mapUL[0]>=0 || mapUL[0]+mapW <= vpW? mapUL[0] + (cellsize[0]*pcLoc[0]) : (vpW/2-pcW/2);
		//mapUL[0] = ((vpW/2)-(pcW/2))-(pcLoc[0]*cellsize[0]);
		var pls = this.canvasEngine.Materials.get("player"),
		tmpMazeUL = [(this.actualWidth/2)-(pls.naturalWidth/2)-(this.maze.currPos[0]*this.style.cellSize[0]),
								(this.actualHeight/2)-(pls.naturalHeight/2)-(this.maze.currPos[1]*this.style.cellSize[1])];
		if(tmpMazeUL[0] != this.displayMazeUL[0] || tmpMazeUL[1] != this.displayMazeUL[1])
		{
			
			this.displayMazeUL = tmpMazeUL;
			//redraw
			var bgCtx = this.bgCanvas.getContext('2d'),
			cacheCoords = [Math.max(this.maze.currPos[0]*this.style.cellSize[0]-(this.actualWidth/2-pls.naturalWidth/2),0), Math.max(this.maze.currPos[1]*this.style.cellSize[1]-(this.actualHeight/2-pls.naturalHeight/2),0)];
			bgCtx.clearRect(0,0,this.bgCanvas.width, this.bgCanvas.height);
			//cropping out a section of the cached image
			bgCtx.drawImage(this.cacheCanvas,
				cacheCoords[0], cacheCoords[1], Math.min(this.actualWidth, this.cacheCanvas.width-cacheCoords[0]), Math.min(this.actualHeight, this.cacheCanvas.height-cacheCoords[1]),
				Math.max(this.displayMazeUL[0],0), Math.max(this.displayMazeUL[1],0), Math.min(this.actualWidth, this.cacheCanvas.width-cacheCoords[0]), Math.min(this.actualHeight, this.cacheCanvas.height-cacheCoords[1]));
			
			//trailModel 
			if (AMaze.model.trailOn)
			{
				this.trailModel.makeTrailV2(this.cacheTrail, this.maze.currPos, this.style.cellSize, this.canvasEngine);

				bgCtx.drawImage(this.cacheTrail,
				cacheCoords[0], cacheCoords[1], Math.min(this.actualWidth, this.cacheCanvas.width-cacheCoords[0]), Math.min(this.actualHeight, this.cacheCanvas.height-cacheCoords[1]),
				Math.max(this.displayMazeUL[0],0), Math.max(this.displayMazeUL[1],0), Math.min(this.actualWidth, this.cacheCanvas.width-cacheCoords[0]), Math.min(this.actualHeight, this.cacheCanvas.height-cacheCoords[1]));
			}
		}

		this.player.x = this.displayMazeUL[0] >= 0 || this.displayMazeUL[0]+(this.maze.width*this.style.cellSize[0]) >= this.actualWidth?
			this.displayMazeUL[0]+ this.maze.currPos[0]*this.style.cellSize[0]	:	this.actualWidth/2 - pls.naturalWidth/2;
		this.player.y = this.displayMazeUL[1] >= 0 || this.displayMazeUL[1]+(this.maze.height*this.style.cellSize[0]) >= this.actualHeight?
			this.displayMazeUL[1]+ this.maze.currPos[1]*this.style.cellSize[1]	:	this.actualHeight/2 - pls.naturalHeight/2;

		//maybe do trail things here
	}
};

//enable trail model inside Amaze renderer
AMaze.render.MazeRenderer.prototype.createTrailModel = function() {

	// exit if no maze is present
	if (this.maze == null) {
		console.log("Error! Maze must be loaded to MazeRenderer before trail model is created!");
		return;
	}

	//set up default trail image
	var el = function(x1, y1) {
		return {x: x1, y: y1};
	}

	this.trailModel = new trailModel.create(el, this.AMaze);
	this.cacheTrail = document.createElement('canvas');
	this.cacheTrail.width = this.maze.width*this.style.cellSize[0]+2;
	this.cacheTrail.height = this.maze.height*this.style.cellSize[1]+2;
	AMaze.model.trailOn = true;

}