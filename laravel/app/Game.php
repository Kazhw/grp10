<?php
namespace App;
class Game {

	public $board = array();
	public $boardPieces=array();
	public $statusCounter = 0;	
	public $gameStatus = 0;
	public $players=array();
	public $scores=array();

	public function gameStart($col,$lin,$playerArray){
		for ($i=0;$i<$col;$i++){
			for ($f=0;$f<$lin;$f++){
				$this->$board[$j+$i*$col]=0;
				if(($j+$i*$col%2)==0) {$this->$boardPieces[$j+$i*$col]=(($j+($i*$col))/2)+1;}
				if(($j+$i*$col%2)==1) {$this->$boardPieces[$j+$i*$col]=(($j-1+($i*$col))/2)+1;}
			}}
		shuffle($this->$boardPieces);
		$this->gameStatus = 1;
		$this->statusCounter = 1;
		$k=0;
		foreach ($playerArray as $v) {
			$this->$players[$v]=("id" => $v, "score"=>0);
			
		}
	}

	protected function hasUnturnedPieces(){
		for ($i=0;$i<$col;$i++){
			for ($f=0;$f<$lin;$f++){
				if($board[$j+$i*$col]==0){return true;}
			}}
			return false;
	}

	protected function gameEnd(){
		if($this->hasUnturnedPieces()){return 0;}
		$max = max($players[$v]);

		}

	}
	protected fuction isPlaying($playerID){


	}

	public function playMove($playerNumber, $position){
		if (($this->gameStatus!=1) && ($this->gameStatus!=2))
			return false;		
		if (($position<0) || ($position>9))
			return false;
		if (($playerNumber!=1) && ($playerNumber!=2))
			return false;
		if ($this->gameStatus != $playerNumber)
			return false;
		if ($this->board[$position] == 0) {
			$this->board[$position] = $playerNumber;	
			$endStatus = $this->gameEnd();			
			if ($endStatus == 0)
				$this->gameStatus = ($playerNumber == 1) ? 2 : 1;
			else
				$this->gameStatus = $endStatus;
			$this->statusCounter++;
			return true;
		}			    
		return false;
	}






/*
//multiplayer stuff
	protected $players= array();
	protected $gameid;

//	
protected $col ;
protected $lin;

protected $HIDE_PIECE = "img/hidden.png";
protected $EMPTY_PIECE = "img/empty.png";
protected $TURNED_PIECE = "turned_piece";

//game variables
protected $num_jogadas = 0;

// pieces variables
protected $piece1ID=-1;
protected $piece2ID=-1;
protected $Pieces = array();



protected $auxPos;
protected $auxPos2;

// timer variables
protected $timer;
protected $flipTime;
// game object variable
protected $game;

// Game Objects
protected function Game($time, $moves, $remainingTiles, $boardSize, $flippedPieces, $gameScore) {
	
	this->$time = time;
	this->$moves = moves;
	this->$remainingTiles = remainingTiles;
	this->$boardSize = boardSize;
	this->$flippedPieces = flippedPieces;
	this->$gameScore = gameScore;

	// getters
	this->$getTime = function() {
		return this->$time;
	}
	this->$getMoves = function() {
		return this->$moves;
	}
	this->$getRemainingTiles = function() {
		return this->$remainingTiles;
	}
	this->$getBoardSize = function() {
		return this->$boardSize;
	}
	this->$getFlippedPieces = function() {
		return this->$flippedPieces;
	}
	this->$getGameScore = function() {
		return this->$gameScore;
	}
	
	// setters
	this->$setTime = function($time) {
		this->$time = $time;
	};
	this->$setMoves = function($moves) {
		this->$moves = $moves;
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

protected function createBoard($col,$lin) {
	
	$numTiles= $col*$lin;
	$board =array();
	$selectedImgs = array();
	$shuffledImgs = array();
	$Pieces = array();
	$game = array();
	resetGame();
	//game = new Game(0, 0, numTiles, numTiles, 0, 0);	
	$selectedImgs = chooseImages($numTiles);
	$shuffledImgs = shuffle($selectedImgs);
	
	for ($i = 0; $i < $numTiles; $i++) {
		
		$board[$i] = $shuffledImgs[$i].getId();
	};
	
	$timer = setInterval($gameTime, 1000);

	return $game;
}


protected function getPiece($id, $img, $status) {
	this->$id = $id;
	this->$img = $img;
	this->$status = $status;
	
	this->$getId = function() {
		return this->$id;
	};
	this->$getImg = function() {
		return this->$img;
	};
	this->$getStatus = function() {
		return this->$status;
	};
	/*this.setImg = function(img) {
		this.img = img;
	};
	this->$setStatus = function($status) {
		this->$status = $status;
	};
}


// Game initializers



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
}*/