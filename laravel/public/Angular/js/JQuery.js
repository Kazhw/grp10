(function() {
	'use strict';
	
	var game;

	$(document).ready(function() {


					$('body').append('<div id=\"leader\"><div id=\"borderleader\"><h2 id=\"highScore\">High Scores:</h2><h3 id=\"yourScore\">Your Score: 0pts</h3></div></div>');

		
		showLeaderboard();

		function showLeaderboard() {
   
   var name = [];
   var score = [];
   var storage=$.localStorage;

   if (storage.get('name0') && storage.get('score0')) {
    $('#highScore').text("High Score: " + storage.get('score0') + "pts");
   }
   

   $('<h4>').empty();


  for(var i=0; i<10; i++){
   name[i]=storage.get('name'+i);
   score[i]=storage.get('score'+i);

   if(name[i]!=null && score[i]!=null) {
    $('#borderleader').append("<h4 id=\"L"+(i+1)+"\">" + (i+1) + ". " + name[i] + " " + score[i] + "pts</h4>");
   }
   else {
    $('#borderleader').append("<h4 id=\"L"+(i+1)+"\">"+(i+1)+". "+"</h4>");
   }

  }
  }


  function updateLeaderboard(newName) {
   var storage=$.localStorage;
   var name = [];
   var score = [];

   var auxName;
   var auxScore;
   var auxName2;
   var auxScore2;
   var valScore;

   for (var i = 0; i<10; i++) {

    auxName = 'name' + i;
    auxScore = 'score' + i;
    valScore= storage.get(auxScore);

    if(valScore<game.getGameScore() || valScore==null ){
     for(var j=9;j>=i;j--){
      auxName2= storage.get('name' + (j-1) );
      auxScore2= storage.get('score' +(j-1) );
      storage.set('name'+j, auxName2);
      storage.set('score'+j,auxScore2);
     }
     storage.set('name'+i,newName);
     storage.set('score'+i,game.getGameScore());
     i=200;
     break;
    }

   }
   
   for (var i = 0; i<10; i++){
    auxName2= storage.get('name' + i);
    auxScore2= storage.get('score' + i);

    if(auxName2!=null){
    $('#L'+(i+1) ).text((i+1) + ". " + storage.get("name"+(i)) + " " + storage.get("score"+(i) ) + "pts");
	$('#highScore').text("High Score: " + storage.get('score0') + "pts");	
	}
 
   }
  }

		$('h1').text('Project 2');
		$('#idStudents').text('David Morais (2130129), Francisco Fernandes (2131089), Hugo Caseiro (2130419)');
		$("#id_form").children().first().append("<div id=\"slider-range-lines\"></div>");
		$("#id_form").children().eq(1).append("<div id=\"slider-range-col\"></div>");
		$("#id_form").children().eq(1).append("<span class=\"error\" id=\"error_spec\"></span>");
		$('#idCols').prop("readonly", true);
		$('#idCols').prop("disabled", true);
		$('#idLines').prop("readonly", true);
		$('#idLines').prop("disabled", true);
		
		var gameBoard = $('#gameBoard');
		var game = [];
		var tr;
		var td;
		var err;
		var row;
		var col;
		var numTiles;
		var timer;




	$(function() {
    $( "#slider-range-lines" ).slider({
      range: "max",
      min: 2,
      max: 10,
      value: 4,
      slide: function( event, ui ) {
        $( "#idLines" ).val( ui.value );

        


        if (($('#idLines').val()*$('#idCols').val())%2 == 1) {


        	$('#error_spec').text("Numero Impar de peças");
			$('#idStartButton').prop("disabled", true);


     
      } else if(($('#idCols').val()*$('#idLines').val())>80) {
      		$('#error_spec').text("O numero máximo de peças é 80"); 
      		$('#idStartButton').prop("disabled",true);
      	} else {
      		$('#error_spec').text(" "); 
      		$('#idStartButton').prop("disabled",false);
      	}
  }
    });
});


	$(function() {
    $( "#slider-range-col" ).slider({
      range: "max",
      min: 2,
      max: 10,
      value: 4,
      slide: function( event, ui ) {

        $( "#idCols" ).val( ui.value );

	if(($('#idCols').val()*$('#idLines').val())%2==1){
		$('#error_spec').text("Numero Impar de peças");
		$('#idStartButton').prop("disabled", true);
     
      }
      else if(($('#idCols').val()*$('#idLines').val())>80) {
      		$('#error_spec').text("O numero máximo de peças é 80"); 
      		$('#idStartButton').prop("disabled",true);
      	} else {
      		$('#error_spec').text(""); 
      		$('#idStartButton').prop("disabled",false);
      	}


      }
    });
});
		
		$('#idStartButton').click(function() {
			
			$(this).val("Restart Button");
			$('#msgError_Cols').text("");
			$('#msgError_Lines').text("");
			gameBoard.empty();
			clearView();
			$('#idStartButton').text("Restart Button");
			row = $('#idLines').val();
			col = $('#idCols').val();
			numTiles = col*row;
			
			err = validateBoard(col, row);
			
			if (err==0) {	
					
				for (var i=0; i<row; i++) {
					
					gameBoard.append($('<tr>'));
					
					for (var j=0; j<col; j++) {

						gameBoard.children(i).append($('<td>')
							.append($('<img>', {src:"img/hidden.png", id:(col*i+j)})));


						$("#"+(col*i+j)).click(function() { // start click funtion
													
							if (!($(this).attr('src') == "img/empty.png")) {

								if (($(this).attr('src') == "img/hidden.png")) {

									if (game.getFlippedPieces() < 2) {

										$(this).fadeOut(150, function() {
											$(this).attr('src', "img/hidden.png");
											$(this).fadeIn(150, turnPiece(this));
										});

									} else {

										if (!$("#"+(col*i+j)).attr('src', "img/hidden.png")) {

										for (var i=0; i<row; i++) {

										for (var j=0; j<col; j++) {

											

												$("#"+(col*i+j)).fadeOut("slow", function() {
										
											$("#"+(col*i+j)).fadeIn("slow");
										});
											}
										}
										}
										
										turnPiece(this);
								
									}
								}
							}
						}); // fim click function
					};
				};
				
				game = createBoard(numTiles);

				timer = setInterval(updateView, 500);

			
			}


		});
		
		function updateView() {

			$('#movesLabel').text(" " + game.getMoves());
			$('#timeLabel').text(" " + game.getTime() + " sec");
			$('#tilesLabel').text(" " + game.getRemainingTiles());
			$('#idStartButton').text("Restart Button");

			if (game.getRemainingTiles() == 0) {

				var newTimerId = window.setInterval("function(){}");
				for (var i = 0 ; i <= newTimerId; i++) {
				window.clearInterval(i); 


			}

			$('body').append('<div id=\"dialog-form\" title=\"You Win!\" style=\"display: none;\"><label id=\"timeText\"></label><p></p><label id=\"numPlaysText\"></label><p></p><label id=\"scoreText\"></label><p></p><label id=\"usernameText\" for=\"username\"></label><input type=\"text\" name="username" id=\"username\" value=\"\"></div>');
			$('#timeText').text("Your time was " +game.getTime()+ " sec");
			$('#numPlaysText').text("Number of plays was "+game.getMoves());
			$('#scoreText').text("Your score was "+game.getGameScore());
			$('#usernameText').text("Insert your username ");
			$('#dialog-form').dialog({
     			modal: true,
   				buttons:{

   						'Register HighScore': function (){

   							var username = $('#username').val();

   							console.log("user: "+username);
   							updateLeaderboard(username);
			   				$(this).dialog("close");
						},	

			   			'Cancel': function (){
			   				$(this).dialog("close");
						}			   
			 		}

			 	});

			}
			
		}
		
		function clearView() {
			
			$('#movesLabel').text(" " + 0);
			$('#timeLabel').text(" " + 0 + " sec");
			$('#idStartButton').text("Start Button");
			
			var newTimerId = window.setInterval("function(){}");
				for (var i = 0 ; i <= newTimerId; i++) {
				window.clearInterval(i); 
			}	
		}	
	});
	
	
	function validateBoard(row1, col1) {
		var numTiles;
		var err;
		
		numTiles = row1*col1;
		
		if ((col1>10) || (col1 <2) ){	
			if (col1>10) {
				$('#msgError_Cols').text("Maximum columns is 10");
			}
			if (col1<2) {
				$('#msgError_Cols').text("Minimum columns is 2");
			}
			err=1;
		}
		
		
		if ((row1>10) || (row1 <2)){
			if (row1>10) {
				$('#msgError_Lines').text("Maximum lines is 10");
			}
			
			if (row1<2) {
				$('#msgError_Lines').text("Minimum lines is 2");
			}
			err=1;
			
		}
		
		if(numTiles%2!=0){
			alert("Two odd numbers give a odd result, the number of tiles must be even");
			err=1;
		}
		
		if (numTiles>80){
			alert("The maximum tiles allowed is 80");
			err=1;	
		}
		
		if (err==1) {
			return 1;
			} else {
			return 0;
		}
		
	}

})();									