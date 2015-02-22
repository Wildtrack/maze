var backtrack = backtrack || {
	//
	// Direcion mapping table, 0: north, 1: east, 2: south, 3: west
	//

	DIR_MAP: [2,3,0,1]
}

backtrack.model = function (opts)
{

		this.direction =  ["north", "east", "south", "west"];

		//the tree
		this.tree = null;

		// current cursor position
		this.pointer = this.tree;

		// last node has been reviisted?
		this.nodeRevisited = false;
		this.backtracked = false;

		// path vector, last postion
		this.currentDir = -1;
		this.backtrackDir = -1;
		this.lastX;
		this.lastY;

		// turn on for debug information
		this.debugOn = true;

		// Root coord must be present before track model can be used
		this.setRoot = function(x, y) {

			// root can only set be set up once
			if (!this.tree)
			{
				this.pointer = (this.tree = new trackNode(0, this.lastX = x, this.lastY = y, 0));
			}
		}


		//
		// check if the cursor is backtracking. True: backtrack, False: new trail
		//
		this.onTrack = function(x, y) {

			if (this.debugOn) console.log("backtrack? "+this.backtracked+" node visited: "+
				this.nodeRevisited+" backtrack dir: "+this.backtrackDir+ " current dir: "+this.currentDir);

			//fault-safe
			if (!this.tree){
				this.pointer = (this.tree = new trackNode(0, this.lastX = x, this.lastY = y, 0));
				return false;
			}

			var newDir;
			//Debug info
			//if cursor is moving to a new direction then add a new node
			//Each time either x or y would be changed. If both are changed then something is wrong!
			if (this.lastX != x && this.lastY != y)
			{
				console.log("Unexpected move x:"+x+ " y:"+y+"lastX:"+this.lastX+"lastY:"+this.lastY); //something is wrong!
				return false;
			}
			else if (this.lastX == x && this.lastY == y) {
				console.log("Cursor freezes"); //something is wrong too!
				return false;
			}

			newDir = this.getDirection([this.lastX, this.lastY],[x,y]);

			if (this.currentDir == -1) //set up first step
			{
				this.currentDir = newDir;
				this.backtrackDir = backtrack.DIR_MAP[newDir];
			}

			// check if cursor direction changes
			else if (newDir != this.currentDir)
			{
				// if a node has been revisted and cursor moves to its parent node --> BINGO!!!
				if (this.nodeRevisited && newDir == this.backtrackDir)
				{
					
					if (this.rootVisited(x,y)) return true;

					this.pointer.head.child[backtrack.DIR_MAP[newDir]] = 0; //release child node from memory
					this.pointer = this.pointer.head;

					//check if hits another node 
					if (x == this.pointer.pos[0] && y == this.pointer.pos[1])
					{
						if (this.rootVisited(x,y)) return true;
						this.nodeRevisited = true; //duplicated line for future reference
						this.backtrackDir = this.pointer.direction;
					}
					else this.nodeRevisited = false;
					
					this.currentDir = newDir;
					this.lastX = x;
					this.lastY = y;
					return true;
				}
				// if a node has been revisted and cursor moves away from parent node --> BINGO!! straight line shouldn't have a node!
				else if (this.nodeRevisited && newDir == backtrack.DIR_MAP[this.backtrackDir])
				{
					this.pointer.head.child[newDir] = 0; //release child node from memory
					this.pointer = this.pointer.head;
					this.nodeRevisited = false;

					this.currentDir = newDir;
				}
				else if (this.nodeRevisited) //if node is being revisited the cursor moves to other direcdtion other than the above
				{
					this.nodeRevisited = false;
					this.currenDir = newDir;
				}
				else if (newDir == backtrack.DIR_MAP[this.currentDir]) // if cursor is moving backwards or is on backtrack
				{
					//if a node is revisited during backtracking, flag it
					if (x == this.pointer.pos[0] && y == this.pointer.pos[1])
					{
						if (this.rootVisited(x,y)) return true;
						this.nodeRevisited = true;
						this.backtrackDir = this.pointer.direction; //assign parent's backtrack direction
					}
					else this.backtrackDir = newDir;

					this.currentDir = newDir;
					this.lastX = x;
					this.lastY = y;
					return true;
				}
				else if (newDir == backtrack.DIR_MAP[this.backtrackDir]) //if move in opposite of backtrack
				{
					this.currentDir = newDir;
					this.lastX = x;
					this.lastY = y;
					return true;
				}
				else //if not moving backwards then create a new node
				{	
					if (this.debugOn) console.log("new node: "+x+", "+y);
					var dir = backtrack.DIR_MAP[this.currentDir];
					this.pointer = (this.pointer.child[dir] = new trackNode(this.pointer, this.lastX, this.lastY, this.currentDir));
					this.backtrackDir = backtrack.DIR_MAP[this.currentDir = newDir]; //backtrack direction is always the opposite of current direction after a node is created
				}
				//this.currentDir = currentDir;
			}
			// if cursor keeps on going along backtrack
			else if (newDir == this.backtrackDir)
			{
				//if a node is revisited during backtracking, flag it
				if (x == this.pointer.pos[0] && y == this.pointer.pos[1])
				{
					if (this.rootVisited(x,y)) return true;
					this.nodeRevisited = true;
					this.backtrackDir = this.pointer.direction; 
				}

				this.lastX = x;
				this.lastY = y;
				return true;
			}
			// if cursor keeps on going and pass the node
			else if (this.nodeRevisited && newDir != this.backtrackDir)
			{
				this.nodeRevisited = false;
				this.backtrackDir = backtrack.DIR_MAP[newDir];
			}

			this.lastX = x;
			this.lastY = y;
			return false;
		}

		// If it hits root again then reset everything
		this.rootVisited = function(x, y) {

			if (this.pointer.head == 0) {
				this.currentDir = -1;
				this.backtrackDir = -1;
				this.nodeRevisited = false;
				this.lastX = x;
				this.lastY = y;
				return true;

			}
			else return false;
		}

		// Get direction from two positions, pos0 is start point, pos1 is end point
		// Will not check if pos0 and pos1 are on same spot! 
		// Format is [x,y]
		this.getDirection = function(pos0, pos1) {

			if (pos0[0] != pos1[0]) { //moves in x direction
				
				if (pos1[0] > pos0[0]) 
				{
					return 1; //moves to east
				}
				else 
				{
					return 3; //moves to west
				}

			}
			else if (pos0[1] != pos1[1]) { //moves in y direction

				if (pos1[1] > pos0[1]) 
				{
					return 2; //move to south
				}
				else 
				{
					return 0; //move to north
				}

			}
		}

		// Search node that is located at <x,y>
		this.forwardSearch = function(node, x, y) {
			if (node.pos[0] == x && node.pos[1] == y) return true;
			else if (forwardTraverse(node, [x, y])) return true;
			else return false;
		}

		// Recursive search function
		this.forwardTraverse = function(node, pos) {
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
		this.backwardSearch = function(node, x, y) {
			if (node.head != 0){
				if (backwardTraverse(node.head, [x, y])) return true;
				else return false;
			}
		}

		// Recursive backward search function
		this.backwardTraverse = function(node, pos) {
			if (node.pos[0] == pos[0] && node.pos[1] == pos[1]) {
				return true;
			}
			else if (node.head != 0) {
				return backwardTraverse(node.head, pos);
			}
			else return false;
		}
}

//
// tree node to store new direction
// params: parentNode pointer to parent node
// params: newDir, direction = this.direction[newDir]
//
var trackNode = function (parentNode, x, y, newDir) {

	//
	// The direction points to its parent node
	//
	this.direction = backtrack.DIR_MAP[newDir];


	// References to its parent
	this.head = parentNode;

			// node position
	this.pos = [x, y];

	// array of 4 elements is used but node can only have max. of 3 child nodes
	// use array to store child nodes for performance reason
	// stuffed with 0 for fast condition check
	this.child = [0,0,0,0];

}