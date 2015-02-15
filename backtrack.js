var backtrack = {
	
	//
	// Direcion mapping table, 0: north, 1: east, 2: south, 3: west
	//

	DIR_MAP: [2,3,0,1],
	
	//
	// backtrack tree model
	//
	
	model: function (opts) {

		this.direction =  ["north", "east", "south", "west"];

		//the tree
		this.tree = {};

		// current cursor position
		this.pointer = this.tree;

		// path vector, last postion
		this.currentDir = 0;
		this.BacktrackDir = 0;
		this.lastX;
		this.lastY;

		// Root coord must be present before track model can be used
		function setRoot(x, y) {
			this.pointer = this.tree = new node(0, this.lastX = x, this.lastY = y, 0);
		}

		//
		// check if the cursor is backtracking
		//
		function onTrack(x, y) {

			var currentDir;
			//if cursor is moving to a new direction then add a new node
			//Each time either x or y would be changed. If both are changed then something is wrong!
			if (this.lastX != x && this.lastY != y)
			{
				console.log("x:"+x+ "y"+y); //something is wrong!
			}
			else if (this.lastX != x) { //moves in x direction
				
				if (x > this.lastX) 
				{
					currentDir = 1; //moves to east
				}
				else 
				{
					currentDir = 3; //moves to west
				}
				this.lastX = x;

			}
			else if (this.lastY != y) { //moves in y direction

				if (y > this.lastY) 
				{
					currentDir = 2; //move to south
				}
				else 
				{
					currentDir = 0; //move to north
				}
				this.lastY = y;

			}
			else {
				console.log("Cursor freezes"); //something is wrong too!
			}

			// check if cursor is backtracking
			if (currentDir != this.currentDir)
			{
				if (this.currentDir == [backtrack.DIR_MAP.[this.currentDir = currentDir]) // if cursor is moving backwards
				{
					return true;
				}
				else //if not moving backwards then create a new node
				{
					this.pointer = (this.pointer.child[this.currentDir = currentDir] = new node(this.pointer, x, y, this.currentDir));
				}
			}

			return false;
		}

		// Search node that is located at <x,y>
		function forwardSearch(node, x, y) {
			if (node.pos[0] == x && node.pos[1] == y) return true;
			else if (forwardTraverse(node, [x, y])) return true;
			else return false;
		}

		// Recursive search function
		function forwardTraverse(node, pos) {
			var child = node.child;

			if (child == 0) return false; //no child
			for (var i = 0; i < 4; i++) // only 4 directions
			{
				if (child[i] != 0)
				{
					if (child[i].pos[0] == pos[0] && child[i].pos[1] == pos[1]) return true;
					else if (forwardTraverse(node, pos)) return true;
				}
			}
			return false;
		}

		// Search node that is located at <x, y>
		function backwardSearch(node, x, y) {
			if (node.parent != 0){
				if (backwardTraverse(node.parent, [x, y])) return true;
				else return false;
			}
		}

		// Recursive backward search function
		function backwardTraverse(node, pos) {
			if (node.pos[0] == pos[0] && node.pos[1] == pos[1]) {
				return true;
			}
			else if (node.parent != 0) {
				return backwardTraverse(node.parent, pos);
			}
			else return false;
		}

		//
		// tree node to store new direction
		// params: parentNode pointer to parent node
		// params: newDir, direction = this.direction[newDir]
		//
		node = function (parentNode, x, y, newDir) {

			//
			// The direction points to its parent node
			//
			dir = backtrack.DIR_MAP.newDirection;


			// References to its parent
			parent = parentNode;

			// node position
			pos = [x, y];

			// array of 4 elements is used but node can only have max. of 3 child nodes
			// use array to store child nodes for performance reason
			// stuffed with 0 for fast condition check
			child = [0,0,0,0];

			}
		}
	},

	//
	// other models go here
	//
	otherModel: function (opts) {
		
	}
}