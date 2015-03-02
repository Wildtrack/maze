var tool = 0;
var maze;

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
			table_row.appendChild(table_cell);
		}
		mtbl.appendChild(table_row);
	}
}

function set_tool(t) {
	tool = t;
}