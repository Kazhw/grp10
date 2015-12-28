<!DOCTYPE html>
<html ng-app="clientApp">
	<head>
		<title>Create Match</title>
		<meta charset="UTF-8">
		
		<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/foundation/5.5.2/css/foundation.css">-->

		<link rel="stylesheet" href="css/sliders.css">
		<link rel="stylesheet" href="css/forms.css">
        <link rel="stylesheet" href="css/style.css">
		
	</head>
	
	<body>
		<div id="contentor" ng-controller="ClientController">
		<div class="form-card" id="gameForm">
			<h1>Create Match</h1><br>
			<form action="#" method="get" id="id_form">
				<div>
					<div>
						<label for="idGame">Select Game:</label>
						<input type="text" id="idGame" name= "gameId" ng-model="gameId">
					</div>
				<input type="text" name="name" placeholder="Match Name">
                
				<input type="text" name="maxplayers" placeholder="Max Players">
                <input type="checkbox" name="bots" class="login" value="Bots">
				<label class="label-card">Bots: </label>
                <br></br>
            
				<label class="label-card">Lines: </label>
                <input type="text" id="idLines" name="Lines" value="4" ng-model="idLines">
				<input class="slider" type="range" id="idLines" name="Lines" value="2" min="2" max="10" >
				
				<br></br>
				<label class="label-card">Rows: </label><input type="text" id="idCols" name="cols" value="5" ng-model="idCols">
				<input class="slider" type="range" id="idCols" name="cols" value="4"  min="2" max="10" >
				
				<br></br>
                <input type="checkbox" name="private" class="form" value="Private">
				<label class="label-card">Private: </label>
                <input type="password" name="pass" placeholder="Password">
				<input type="password" name="confirm_pass" placeholder="Confirm Password">
				<input type="submit" name="create" class="form form-submit" value="Create Match" ng-click="startGame()">
                <input type="button" name="cancel" class="form form-button" value="Cancel">
				
			</form>

			<div id="idMsgEnd" ng-bind="endGameMessage"></div>
				</div>
			<div id="main">
 			<div id="board"> 

				<table>
  <tr ng-repeat="tile in game.lines track by $index">
    <td ng-repeat="tile in game.cols track by $index"><img ng-src="img/{{tile}}.png" ng-click="clickTile($index);"></td>

  </tr>
</table>
			</div>
		</div>
		</div>
		</div>

		
		<!-- <div id="error"><img src="https://dl.dropboxusercontent.com/u/23299152/Delete-icon.png" /> Your caps-lock is on.</div> -->
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js">	</script>
		<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script> 
		<script src='js/game_interaction.js'></script>
		<!-- Initialize Foundation JS -->		
	</body>
</html>
