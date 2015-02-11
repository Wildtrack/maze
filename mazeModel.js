var AMaze = AMaze || {};
AMaze.model = {
	var Maze = function(opts){
		//opts is an object with optional params, width and height
		//default to 10x10 maze

		this.width = opts.width || 10;
		this.height = opts.height || 10;

		//default start and end are 0,0 and (width),(height)
		this.start = [0,0];
		this.end = [width, height];

		//board is a 2d array of cells, each cell is one of 16 states
		//check with bitwise and
		//0/1: not/accessible from n
		//0/2: not/accessible from e
		//0/4: not/accessible from s
		//0/8: not/accessible from w
		//ex: if cell is 13:
		//13 & 1 == 1: accessible from n
		//13 & 2 != 2: not accessible from e
		//13 & 4 == 4: accessible from s
		//13 & 8 == 8: accessible from w

		this.board = [];
		for( var y = height; y--; )
		{
			this.board.push([]);
			for( var x = width; x--; )
			{
				this.board[y][width-x-1] = 0;
			}
		}
	};
};
