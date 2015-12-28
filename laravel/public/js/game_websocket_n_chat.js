(function(){
"use strict";	
	var module = angular.module('myApp', []); 

	module.controller('AppController', ['$scope', function($scope) {
		$scope.game= {board: [0,0,0,0,0,0,0,0,0], gameStatus:0};
		$scope.playerNumber = 1;
		$scope.endGameMessage = "";	
		$scope.gameId = "A";
		$scope.playerName = "player";
		$scope.chatMsg = "";
		$scope.chatAll = false;
		$scope.chatMessages = [];
		
		console.log('connect');

		var protocol = location.protocol;
		var port = '8080';
		var url = protocol + '//' + window.location.hostname + ':' + port;

		console.log(url);

		var socket = io.connect(url, {reconnect: true});

		var getEndGameMessage = function (){
			if ($scope.game.gameStatus === undefined)
				return "";
			if ($scope.game.gameStatus <= 2)
				return "";
			if ($scope.game.gameStatus == 11)
				return "Player with crosses has won!";
			else
				if ($scope.game.gameStatus == 12)
					return "Player with circles has won!";
				else
					return "There was a tie!";
		};

	   	$scope.startGame = function() {
	   		console.log('startGame');
	   		$scope.endGameMessage = '';
	   		socket.emit("startGame", $scope.gameId);
		};

	   	$scope.joinGame = function() {
	   		console.log('joinGame');
	   		$scope.endGameMessage = '';
	   		socket.emit("joinGame", $scope.gameId);
		};

	   	$scope.clickTile = function(idx){
	   		// Only plays on its turn
	   		if ($scope.game.gameStatus == $scope.playerNumber){
				var move = {
					position: idx,
					numPlayer: $scope.playerNumber
				};
		   		console.log('click ', move);
				socket.emit("playMove", $scope.gameId, move);	   			   			
	   		}
		};

		socket.on('refreshGame', function(data){
			console.log('RefreshGame', data);
			$scope.game = data;
			$scope.endGameMessage = getEndGameMessage();
			$scope.$apply();
		});

		// CHAT - Simple Version 
	   	$scope.keyPressMsg = function($event){
	   		if ($event.keyCode == 13) {
	   			if ($scope.chatAll) {
		   			console.log('msgChat to All ', $scope.playerName, $scope.chatMsg);
		   			socket.emit("msgChatAll", $scope.playerName, $scope.chatMsg);
		   			$scope.chatMsg = "";	   				
	   			} else {
		   			console.log('msgChat to Game Only', $scope.gameId, $scope.playerName, $scope.chatMsg);
		   			socket.emit("msgChatGame", $scope.gameId, $scope.playerName, $scope.chatMsg);
		   			$scope.chatMsg = "";	   				
	   			}

	   		}
	   	};

		socket.on('newChatMsg', function(playerName, newMsg){
			console.log('newChatMsg', playerName, newMsg);
			if ($scope.chatMessages.length>6)
				$scope.chatMessages.shift();
			$scope.chatMessages.push(playerName + ": " +newMsg);
			console.log($scope.chatMessages);
			$scope.$apply();
		});

	}]);
})();
