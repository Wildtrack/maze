var AMaze = AMaze || {};
AMaze.model = {
	//Maze constructor
	var N_CONST = 1, E_CONST = 2, S_CONST = 4, W_CONST = 8,
	Maze = function(opts){
		//opts is an object with optional params, width and height
		//default to 10x10 maze

		this.width = opts.width || 10;
		this.height = opts.height || 10;

		//default start and end are 0,0 and (width),(height)
		this.start = [0,0];
		this.end = [this.width, this.height];

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
		for( var y = this.height; y--; )
		{
			this.board.push([]);
			for( var x = this.width; x--; )
			{
				this.board[y][this.width-x-1] = 0;
			}
		}
	};

	//returns cell-type number that gives you the true possible exits
	//ie: a wall can only be traveled through if cells on both sides agree
	//that there is an opening there
	Maze.prototype.acessibleExits = function(x, y) {
		var acc = 0;
		if(y-1 >= 0 && (this.board[x][y] & N_CONST == N_CONST) && (this.board[x][y-1] & S_CONST == S_CONST))
		{
			acc+=N_CONST;
		}
		if(y+1 < this.height && (this.board[x][y] & S_CONST == S_CONST) && (this.board[x][y+1] & N_CONST == N_CONST))
		{
			acc+=S_CONST;
		}
		if(x-1 >= 0 && (this.board[x][y] & W_CONST == W_CONST) && (this.board[x-1][y] & E_CONST == E_CONST))
		{
			acc+=W_CONST;
		}
		if(x+1 < this.width && (this.board[x][y] & E_CONST == E_CONST) && (this.board[x+1][y] & W_CONST == W_CONST))
		{
			acc+=E_CONST;
		}
		return acc;
	};
};
