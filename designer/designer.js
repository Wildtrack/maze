var tool = 0;
var maze;

var start_x, start_y, finish_x, finish_y;

function set_size() {
	w = document.getElementById('width').value;
	h = document.getElementById('height').value;
	mtbl = document.getElementById('maze_table');
	
	maze = [[]];
	mtbl.innerHTML = '';
	for (y = 0; y < h; y++) {
		maze[y] = [];
		table_row = document.createElement('tr');
		for (x = 0; x < w; x++) {
			maze[y][x] = [0];
			table_cell = document.createElement('td');
			table_cell.width = 20;
			table_cell.height = 20;
			table_cell.tag_x = x;
			table_cell.tag_y = y;
			table_cell.onclick = cell_click;
			table_row.appendChild(table_cell);
		}
		mtbl.appendChild(table_row);
	}
	
	start_x = start_y = finish_x = finish_y = 0;
}

function set_tool(t) {
	tool = t;
}

function cell_click() {
	switch (tool) {
		case 0:
			maze[this.tag_y][this.tag_x] = 1 - maze[this.tag_y][this.tag_x];
			this.style.background = maze[this.tag_y][this.tag_x] ? '#000000' : 'none';
			break;
		case 1:
		
			break;
		case 2:
			
			break;
	}
}