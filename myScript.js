


$(document).ready(function(){

    $('body').append('<div id="scoreBoard"></div)');
    $('#scoreBoard').append('<p>Score <span id="score">0</span></p>');
    $('body').append('<div id="rules"><p>Use the keyboard arrow(&larr;&uarr;&rarr;&darr;) keys to move.</p></div>');
	let rows = 20, cols = 20;
	const grid = createGrid(rows,cols);
	render(grid);
	
    $('#grid').append('<div id="gameOver">Game Over</div>');
    $('#gameOver').hide();


	$(document).on("keypress", turn);
	
	

    var v  = setInterval(function(){move(v);}, 300);
    $('body').append('<button>stop</button>');
    $('button').click(function(){
        console.log("clicked button");
        clearInterval(v);
        gameOver();
    });
    
});

//needs coordinates of snake , [0,0], dir. right
let move = function m(v){//keep moving for each turn, use setTimeout
	//right//if key is pressed stop or return
    console.log("called");
    if(snake.outOfBounds()){
        clearInterval(v);
        gameOver();
        console.log("interval has stopped");
        return;
    }

    console.log('path =' + snake.path);
    switch(snake.dir){//here we are composing the id
        case 'left':
            // change
            $('#'+'r'+snake.pos[0]+'c'+(snake.pos[1]-1)).css({'background-color':'yellow'});
            //update
            snake.pos[1]-=1;
            break;
        case 'up':
            // change
            $('#'+'r'+(snake.pos[0]-1)+'c'+snake.pos[1]).css({'background-color':'yellow'});
            //update
            snake.pos[0]-=1;
            break;
        case 'right':
            console.log("right hello");
            // change
            $('#'+'r'+snake.pos[0]+'c'+(snake.pos[1]+1)).css({'background-color':'yellow'});
            //update
            snake.pos[1]+=1;
            break;
        case 'down':
            // change
            $('#'+'r'+(snake.pos[0]+1)+'c'+snake.pos[1]).css({'background-color':'yellow'});
            //update
            snake.pos[0]+=1;
            break;
    }

    console.log('*path =' + snake.path);
    console.log("just moved, "+snake.pos);
    console.log("check collision");
    if(snake.collision()){
        clearInterval(v);
        gameOver();
        return;
    }
    console.log("apple pos = "+food.pos);
    snake.path.push(snake.pos.slice());
    //check if apple was eaten
    if(snake.pos[0] == food.pos[0] && snake.pos[1] == food.pos[1]){
        $('#apple').remove();
        //change food pos and rerender apple, snake update
        food.randomPos();
        //$('#r'+food.pos[0]+'c'+food.pos[1]).css({'background-color':'red'});

         $('#'+'r'+food.pos[0]+'c'+food.pos[1]).append('<img id="apple" src="apple.png">');
        snake.score+=food.points;
        console.log('snake score ='+snake.score);
        snake.increaseSpeed();
        $('#score').text(snake.score);
        food.increaseWorth();
    }else{
        let tail = snake.path[0];
        $('#'+'r'+tail[0]+'c'+tail[1]).css({'background-color':'#52BF90'});
        snake.path.shift();
    }
    console.log('path =' + snake.path);
};

let gameOver = function end(){
    $('#gameOver').show();
    $('#rules').hide();
    $('body').css({'background-color':'black'});
}

let turn = function t(e){

	switch(e.keyCode){
		case 37: // left arrow
        if(snake.dir == 'right'){
            return;
        }
		snake.dir= 'left';
		console.log('left');
		break;

		case 38: // up arrow
        if(snake.dir == 'down'){
            return;
        }
		snake.dir='up';
		console.log('up');
		break;

		case 39: // right arrow
        if(snake.dir == 'left'){
            return;
        }
		snake.dir='right';
		console.log('right');
		break;

		case 40: // down arrow
        if(snake.dir == 'up'){
            return;
        }
		snake.dir='down';
		console.log('down');
		break;

		default: return; // just exit
	}
	e.preventDefault();
};

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
			$cell.id= 'r'+col.toString()+'c'+row.toString();
			$('#grid').append($cell);
		}
	}
    // render snake and food object
	$('#55').css({'background-color':'yellow'});
    //$('#r'+food.pos[0]+'c'+food.pos[1]).css({'background-color':'red'});
    $('#r'+food.pos[0]+'c'+food.pos[1]).append('<img id="apple" src="apple.png">');
};


// snake object
const snake = {
	'pos': [5,5],// x -> row, y->col
	'dir': 'right',
	'path':[[5,5]],
    'speed': 1000,
    'score' : 0,
    collision : function(){//
        for(let i =0; i< this.path.length; i++){
            let curr = this.path[i];
            if(this.pos[0] == curr[0] && this.pos[1] == curr[1]){
                console.log('collision indeed');
                return true;
            }
        }
        return false;
    },
    outOfBounds : function(){
        if(this.pos[0] > 19 || this.pos[0] < 0 || this.pos[1] >19 || this.pos[1] < 0){
            console.log('outOfBounds');
            return true;
        }else{
            return false;
        }
    },
    increaseSpeed : function(){
        if((this.speed - 100) >0){
            this.speed -=100;
        }
    }

};

// food object, visualize on screen
const food = {
    'pos' : [Math.floor(Math.random()*20), Math.floor(Math.random()*20)],
    randomPos: function(){
        this.pos = [Math.floor(Math.random()*20), Math.floor(Math.random()*20)];
    },
    'points': 1,
    increaseWorth: function(){
        this.points +=1;
    }

};