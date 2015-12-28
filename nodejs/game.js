function hasRow(v, a){
	return  ((a[0]==v) && (a[1]==v) && (a[2]==v)) || 
			((a[3]==v) && (a[4]==v) && (a[5]==v)) || 
			((a[6]==v) && (a[7]==v) && (a[8]==v)) || 
			((a[0]==v) && (a[3]==v) && (a[6]==v)) || 
			((a[1]==v) && (a[4]==v) && (a[7]==v)) || 
			((a[2]==v) && (a[5]==v) && (a[8]==v)) || 
			((a[0]==v) && (a[4]==v) && (a[8]==v)) || 
			((a[2]==v) && (a[4]==v) && (a[6]==v));
}

function isBoardComplete(a){
	for (i=0; i<9; i++)
		if (a[i] === 0)
			return false;
	return true;	
}

function gameEnd(game){
	if (hasRow(1, game.board))
		return 11;
	if (hasRow(2, game.board))
		return 12;
	if (isBoardComplete(game.board))
		return 13;
	return 0;
}


module.exports = {
    gameStart: function(numLines, numCols){

        var linhas = [];
        var colunas = [];

       for (var i=0; i<numLines; i++) {
       	    linhas[i] = 0;
       }

       for (var i=0; i<numCols; i++) {
       	    colunas[i] = 0;
       }
    	var game= {

				lines: linhas,
			    cols: colunas,
				gameStatus: 1
			};
		return game;	
	},
	playMove: function(game, playerNumber, position){
		if ((game.gameStatus!=1) && (game.gameStatus!=2))
			return false;		
		if ((position<0) || (position>9))
			return false;
		if ((playerNumber!=1) && (playerNumber!=2))
			return false;
		if (game.gameStatus != playerNumber)
			return false;
		if (game.board[position] === 0){
			game.board[position] = playerNumber;	
			var endStatus = gameEnd(game);			
			if (endStatus === 0)
				game.gameStatus = (playerNumber == 1) ? 2 : 1;
			else
				game.gameStatus = endStatus;
			return true;
		}			
		return false;
	}
};



"use strict"

var HIDE_PIECE = "img/hidden.png";
var EMPTY_PIECE = "img/empty.png";
var TURNED_PIECE = "turned_piece";

//game variables
var num_jogadas = 0;

// pieces variables
var	piece1ID=-1;
var	piece2ID=-1;
var Pieces = [];

var auxPos;
var auxPos2

// timer variables
var timer;
var flipTime;
// game object variable
var game;

function Game(time, moves, remainingTiles, boardSize, flippedPieces, gameScore) {
	
	this.time = time;
	this.moves = moves;
	this.remainingTiles = remainingTiles;
	this.boardSize = boardSize;
	this.flippedPieces = flippedPieces;
	this.gameScore = gameScore;

	// getters
	this.getTime = function() {
		return this.time;
	}
	this.getMoves = function() {
		return this.moves;
	}
	this.getRemainingTiles = function() {
		return this.remainingTiles;
	}
	this.getBoardSize = function() {
		return this.boardSize;
	}
	this.getFlippedPieces = function() {
		return this.flippedPieces;
	}
	this.getGameScore = function() {
		return this.gameScore;
	}
	
	// setters
	this.setTime = function(time) {
		this.time = time;
	};
	this.setMoves = function(moves) {
		this.moves = moves;
	};
	this.setRemainingTiles = function(remainingTiles) {
		this.remainingTiles = remainingTiles;
	}
	this.setBoardSize = function(boardSize) {
		this.boardSize = boardSize;
	};
	this.setFlippedPieces = function(flippedPieces) {
		this.flippedPieces = flippedPieces;
	};
	this.setGameScore = function(gameScore) {
		this.gameScore = gameScore;
	};

}

function Piece(id, img, status) {
	this.id = id;
	this.img = img;
	this.status = status;
	
	this.getId = function() {
		return this.id;
	};
	this.getImg = function() {
		return this.img;
	};
	this.getStatus = function() {
		return this.status;
	};
	/*this.setImg = function(img) {
		this.img = img;
	};*/
	this.setStatus = function(status) {
		this.status = status;
	};
}


// Game initializers


function createBoard(numTiles) {
	
	var board = [];
	var selectedImgs = [];
	var shuffledImgs = [];
	Pieces = [];
	game = [];
	resetGame();
	game = new Game(0, 0, numTiles, numTiles, 0, 0);	
	selectedImgs = chooseImages(numTiles);
	shuffledImgs = shuffleArray(selectedImgs);
	
	for (var i = 0; i < numTiles; i++) {
		
		board[i] = shuffledImgs[i].getId();
	};
	
	timer = setInterval(gameTime, 1000);

	return game;
}

// Utility Functions

var chooseImages = function(numTiles) {
	
	var auxIDs = [];
	var source_img;


	for (var i = 0; i <= 40; i++) {
		
		source_img = "img/" + i + ".png";
		
		var piece = new Piece(i, source_img, HIDE_PIECE);
		auxIDs.push(piece);
	}
	
	auxIDs = shuffleArray(auxIDs);
	
	for (var j = 0; j < numTiles/2; j++) {
		
		Pieces.push(auxIDs[j]);
		Pieces.push(auxIDs[j]);
	}	
	return Pieces;
}

function shuffleArray(array) {
	
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}	


// GamePlay


function turnPiece(piece) {
	
	if (piece.id != piece1ID.id) {

		if (Pieces[piece.id].getStatus() != EMPTY_PIECE) {
		
		
		
		if (game.getFlippedPieces() == 0) {
			
			
			if (Pieces[piece.id].getStatus() == HIDE_PIECE) {
				
				piece.src = Pieces[piece.id].getImg();
				
				piece1ID = piece;
				
				Pieces[piece1ID.id].setStatus(TURNED_PIECE);
				
				game.setFlippedPieces(1);
			}
			
			} else if (game.getFlippedPieces() == 1) {
			
			
			
			piece.src = Pieces[piece.id].getImg();
			
			piece2ID = piece;
			
			
			
			game.setMoves(game.getMoves()+1);
			
			if (Pieces[piece1ID.id].getId() == Pieces[piece2ID.id].getId()) {
					flipTime = setInterval(flipTileEmpty, 2000)
				} else {
				flipTime = setInterval(flipTile, 2000);
			}
			game.setFlippedPieces(2);
		
		} else if (game.getFlippedPieces() == 2) {
		
		if (Pieces[piece1ID.id].getId() == Pieces[piece2ID.id].getId()) {
			flipTileEmpty();
			
			} else {
			flipTile();
		}
	}
}
}
}



function resetGame() {

	piece1ID = -1;
	piece2ID = -1;
	
	var newTimerId = window.setInterval("function(){}");
	for (var i = 0 ; i <= newTimerId; i++) {
		window.clearInterval(i); 
	}
}


function gameWin() {
	
	var score = game.getGameScore();
}


function gameTime() {
	var totalSeconds = game.getTime();
	totalSeconds++;
	game.setTime(totalSeconds);
	return game.getTime();
}


function flipTile() {
	

	piece1ID.src = HIDE_PIECE;
	Pieces[piece1ID.id].setStatus(HIDE_PIECE);
	piece2ID.src = HIDE_PIECE;
	Pieces[piece2ID.id].setStatus(HIDE_PIECE);
	piece1ID=-1;
	piece2ID=-1;
	clearInterval(flipTime);
	game.setFlippedPieces(0);

	

}
function flipTileEmpty() {
	
	calculateScore();

	piece1ID.src = EMPTY_PIECE;
	Pieces[piece1ID.id].setStatus(EMPTY_PIECE);
	piece2ID.src = EMPTY_PIECE;
	Pieces[piece2ID.id].setStatus(EMPTY_PIECE);
	piece1ID=-1;
	piece2ID=-1;
	clearInterval(flipTime);
	game.setFlippedPieces(0);
	game.setRemainingTiles(game.getRemainingTiles()-2);

	if (game.getRemainingTiles() == 0) {
		gameWin();
		return game;
	}
}


function calculateScore() {
		var score = (Math.round((1/(.9*game.getMoves()+0.1*game.getTime()))*game.getBoardSize()*100000));
		game.setGameScore(score);
}