var tool = 0;
var maze;

var start_cell, finish_cell;

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
			table_cell.width = 30;
			table_cell.height = 30;
			table_cell.tag_x = x;
			table_cell.tag_y = y;
			table_cell.onclick = cell_click;
			table_cell.align = 'center';
			table_row.appendChild(table_cell);
		}
		mtbl.appendChild(table_row);
	}
	
	start_cell = finish_cell = null;
}

function set_tool(t) {
	tool = t;
}

function cell_click() {
	switch (tool) {
		case 0:
			maze[this.tag_y][this.tag_x] = 1 - maze[this.tag_y][this.tag_x];
			update_cell_color(this);
			break;
		case 1:
			if (start_cell != null)
				start_cell.innerHTML = '';
			if (start_cell != this) {
				start_cell = this;
				this.innerHTML = 'S';
			} else {
				start_cell = null;
			}
			break;
		case 2:
			if (finish_cell != null)
				finish_cell.innerHTML = '';
			if (finish_cell != this) {
				finish_cell = this;
				this.innerHTML = 'F';
			} else {
				finish_cell = null;
			}
			break;
	}
}

function update_cell_color(cell) {
	cell.style.background = maze[cell.tag_y][cell.tag_x] ? '#000000' : 'none';
	cell.style.color = maze[cell.tag_y][cell.tag_x] ? '#FFFFFF' : '#000000';
}