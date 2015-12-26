<!DOCTYPE html>
<html lang="pt" ng-app="memoryGame">
<head>
	<meta charset="UTF-8">
	<title>Memory Game</title>
	<link rel="stylesheet" type="text/css" href="css/normalize.css">
	<link rel="stylesheet" type="text/css" href="css/styles.css">
</head>
<body >
	<h1>Memory Game</h1>
	<h3><?php echo $versionName;?></h3>
	<h3><a href="/">Back to Main</a></h3> 
	<hr>
	<?php if ($jsFile == "game_websocket_1.js") :?>
		<h2>Node server on folder: ./nodejs_websocket_1</h2>	
	<?php else: ?>	
		<h2>Server uses REST API</h2> 
		<h3>REST API has 4 endpoints: get:poll_1/game; get:poll_1/gameStatusCounter; post:poll_1/startGame; put:poll_1/playMove</h3>
	<?php endif; ?>	
	<h2>Angular file: <?php echo $jsFile;?></h2>	
	<hr>
	<div id="contentor" ng-controller="AppController">
		<div class="header" id="gameForm">
			<form action="#" method="get" id="id_form">
				<div>
					<label for="idPlayer">Select Player:</label>
					<select id="idPlayer" name = "playerNum" ng-model="playerNumber">
						<option value="1">Cross (1st player)</option>
						<option value="2">Circle (2st player)</option>
					</select>
				</div>
				<div>
					<input type="button" id="idStartButton" name="startButton" value="Start Game" ng-click="startGame()">
				</div>
			</form>
			<div id="idMsgEnd" ng-bind="endGameMessage"></div>
		</div>
		<div id="main">
 			<div id="board"> 
 				<div ng-repeat="tile in game.board track by $index">
 					<img ng-src="img/{{tile}}.png" ng-click="clickTile($index);">
				</div>
			</div>
		</div>
	</div>
	<footer>@Marco Monteiro, IPLeiria, 2015</footer>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.7/angular.min.js">
	</script>
	<?php if (isset($includeSocketIO)): ?>
		<script src="https://cdn.socket.io/socket.io-1.2.0.js"></script> 
	<?php endif; ?>	
	<script src="js/<?php echo $jsFile;?>"></script>
</body>
</html>