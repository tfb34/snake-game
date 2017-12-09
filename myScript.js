

$(document).ready(function(){
	let rows = 40, cols = 40;
	const grid = createGrid(rows,cols);
	render(grid);
});



//Returns a 2d-array grid
let createGrid = function g(rows,cols){
	let table = [];
	let col = [];
	for(let i = 0; i<rows; i++){
		col.push(" ");
	}
	for(let i = 0; i <cols; i++){
		table.push(col.slice(0));
	}
	return table;
};


// Given a 2d array
// Creates a visual grid
let render = function r(grid){
	//create a giant box, set height and width
	let $grid = document.createElement("div");
	$grid.id = "grid";
	$("body").append($grid);
	//then the divs inside will be a % of the box
	//create a new div element with id being the array coordinates
	for(let col =0; col<grid.length;col++){
		for(let row =0;row<grid[0].length;row++ ){
			let $cell = document.createElement("div");
			$cell.className="grid-cell";
			$cell.id= col.toString()+row.toString();
			$('#grid').append($cell);
		}
	}
};