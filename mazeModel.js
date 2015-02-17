//Needed to include this to make node function with the current setup
//Deals with a weird issue of jquery needs a window, apparently jsdom
//solves that problem.
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

var AMaze = (function(AMaze) {
    AMaze.model = {
        //Maze constructor
        N_CONST: 1, E_CONST: 2, S_CONST: 4, W_CONST: 8,
        DEF_WIDTH: 10, DEF_HEIGHT: 10,
        Maze: function (opts) {
            //opts is an object with optional params, width and height
            //default to 10x10 maze

            this.width = typeof opts !== "undefined" ? opts.width ||
            AMaze.model.DEF_WIDTH : AMaze.model.DEF_WIDTH;
            this.height = typeof opts !== "undefined" ? opts.height ||
            AMaze.model.DEF_HEIGHT : AMaze.model.DEF_HEIGHT;

            //default start and end are 0,0 and (width),(height)
            this.start = [0, 0];
            this.end = [this.width - 1, this.height - 1];
            this.currPos = [this.start[0], this.start[1]];

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
            for (var x = this.width; x--;) {
                this.board.push([]);
                for (var y = this.height; y--;) {
                    this.board[this.width - x - 1].push(0);
                }
            }
        },
        //returns true if dir has exactly one direction
        onlyOneDir: function (dir) {
            var bCount = 0;
            [AMaze.model.N_CONST, AMaze.model.E_CONST, AMaze.model.S_CONST, AMaze.model.W_CONST].forEach(function (tDir, idx, arr) {
                bCount += (dir & tDir) ? 1 : 0;
            });
            return bCount == 1;
        },
        //loads JSON data from disk (same filesystem as stored on)
        //calls func on success with loaded maze as param
        load: function (filename, func) {
            $.getJSON(filename, {}, function (data) {
                var load = new AMaze.model.Maze();
                load.width = data.width;
                load.height = data.height;
                load.start = data.start;
                load.currPos = [data.start[0], data.start[1]];
                load.end = data.end;
                load.board = data.board;
                func(load);
            });
        }
    };

    //returns cell-type number that gives you the true possible exits
    //ie: a wall can only be traveled through if cells on both sides agree
    //that there is an opening there
    AMaze.model.Maze.prototype.accessibleExits = function (x, y) {
        var acc = 0;
        if (y - 1 >= 0 && (this.board[x][y] & AMaze.model.N_CONST) && (this.board[x][y - 1] & AMaze.model.S_CONST)) {
            acc |= AMaze.model.N_CONST;
        }
        if (y + 1 < this.height && (this.board[x][y] & AMaze.model.S_CONST) && (this.board[x][y + 1] & AMaze.model.N_CONST)) {
            acc |= AMaze.model.S_CONST;
        }
        if (x - 1 >= 0 && (this.board[x][y] & AMaze.model.W_CONST) && (this.board[x - 1][y] & AMaze.model.E_CONST)) {
            acc |= AMaze.model.W_CONST;
        }
        if (x + 1 < this.width && (this.board[x][y] & AMaze.model.E_CONST) && (this.board[x + 1][y] & AMaze.model.W_CONST)) {
            acc |= AMaze.model.E_CONST;
        }
        return acc;
    };

    //opens the wall(s) in the given cell and the matching wall(s)
    //in the cell(s) in the direction(s) of the now-open wall(s)
    //params: cell x and y and cell-type number indicating direction(s)
    //where wall(s) should be opened
    AMaze.model.Maze.prototype.makeAccessible = function (x, y, dir) {
        if ((dir & AMaze.model.N_CONST) && y - 1 >= 0) {
            this.board[x][y] |= AMaze.model.N_CONST;
            this.board[x][y - 1] |= AMaze.model.S_CONST;
        }
        if ((dir & AMaze.model.E_CONST) && x + 1 < this.width) {
            this.board[x][y] |= AMaze.model.E_CONST;
            this.board[x + 1][y] |= AMaze.model.W_CONST;
        }
        if ((dir & AMaze.model.S_CONST) && y + 1 < this.height) {
            this.board[x][y] |= AMaze.model.S_CONST;
            this.board[x][y + 1] |= AMaze.model.N_CONST;
        }
        if ((dir & AMaze.model.W_CONST) && x - 1 >= 0) {
            this.board[x][y] |= AMaze.model.W_CONST;
            this.board[x - 1][y] |= AMaze.model.E_CONST;
        }
    };

    //returns true if direction is accessible from x,y
    AMaze.model.Maze.prototype.canAccess = function (x, y, dir) {
        return (this.accessibleExits(x, y) & dir) != 0;
    };

    //returns true if player was moved
    AMaze.model.Maze.prototype.movePlayer = function (dir) {
        var valid = AMaze.model.onlyOneDir(dir) && this.canAccess(this.currPos[0], this.currPos[1], dir);
        if (valid) {
            switch (dir) {
                case AMaze.model.N_CONST:
                    this.currPos[1] -= 1;
                    break;
                case AMaze.model.E_CONST:
                    this.currPos[0] += 1;
                    break;
                case AMaze.model.S_CONST:
                    this.currPos[1] += 1;
                    break;
                case AMaze.model.W_CONST:
                    this.currPos[0] -= 1;
                    break;
            }
        }
        return valid;
    };

    //returns true if the player is on the exit
    AMaze.model.Maze.prototype.hasPlayerWon = function () {
        return (this.currPos[0] == this.end[0]) && (this.currPos[1] == this.end[1]);
    };

    return AMaze;
}(AMaze || {}));

//module.exports = AMaze.model;
