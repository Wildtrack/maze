var backtrack = {
	N_CONST:1,E_CONST:2,S_CONST:4,W_CONST:8,
	
	//
	// backtrack tree model
	//
	
	model: function (opts) {

		this.direction =  {N_CONST: "north", E_CONST: "east", S_CONST: "south", W_CONST: "west"}

		//the main tree
		this.tree = {};

		// current cursor position
		this.pointer = this.tree;

		// path vector, last postion
		this.currentDir = 0;
		this.lastX;
		this.lastY;

		// Root coord must be set before track model can be used
		function setRoot(x, y) {
			this.pointer = this.tree = node(0, this.lastX = x, this.lastY = y, 0);
		}

		//
		// check if the cursor is backtracking
		//
		function onTrack(x, y) {

			//identify moving direction
			if (this.currentDir == 0) {
				//
				// assume browser is fast enough to track user input!
				//
				if (this.lastX != x) {

				}
				else if (this.lastY != y) {

				}
			}

			if (this.pointer.dir == 0) {
				this.pointer = this.pointer.
			}

			return false;
		}

		function searchNode(node, x, y) {

		}


		node = function (parentNode, x1, y1, dirFrom) {

			//
			// The direction points to its parent node
			//
			dir = dirFrom;

			// References to its parent
			parent = parentNode;

			x = x1;
			y = y1;

			// node can only have max. of 3 children
			child = {
				"north": {},
				"east": {},
				"south": {},
				"west": {}
			}
		}
	},

	//
	// other models go here
	//
	otherModel: function (opts) {
		
	}
}