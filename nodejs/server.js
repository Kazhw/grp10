// Require HTTP module (to start server) and Socket.IO
var http = require('http');
var io = require('socket.io');
var gameMod = require('./game');
var port = 8080;

//start http
var server = http.createServer(function(req, res){ 
});

server.listen(port);
console.log('Server listening on port ' + port);

// -------------------------------------------------
// Web Socket --------------------------------------
// -------------------------------------------------

var games= [];

var io = io.listen(server, {
        log: false,
        agent: false,
        origins: '*:*'
        // 'transports': ['websocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']
    });

io.on('connection', function(socket){ 
    console.log('\n----------------------------------------------------\n');
    console.log('Connection to client established');

    // Success!  Now listen to messages to be received

    // StartGame is invoked with the gameId defined on input field on the client
    socket.on('startGame',function(gameId, lines, cols){ 
	    console.log('\n----------------------------------------------------\n');
        console.log('Client requested "startGame" - gameId = ' + gameId);       

        socket.join(gameId);
        games[gameId] = gameMod.gameStart(lines, cols);

        io.in(gameId).emit('refreshGame', games[gameId]);
        console.log('Games ', games);
    });

    // joinGame is invoked with the gameId defined on input field on the client
    socket.on('joinGame',function(gameId){ 
        console.log('\n----------------------------------------------------\n');
        console.log('Client requested "joinGame" - gameId = ' + gameId);       

        socket.join(gameId);

        io.in(gameId).emit('refreshGame', games[gameId]);
        console.log('Games ', games);
    });

    // Messages have information about the room (id)
    socket.on('playMove',function(gameId, move){ 
        console.log('\n----------------------------------------------------\n');
    	console.log('Client requested "playMove" - gameId = ' + gameId + ' move= ', move);

        gameMod.playMove(games[gameId], move.numPlayer, move.position);

        io.in(gameId).emit('refreshGame', games[gameId]);
        console.log('Games ', games);
    });

    socket.on('msgChatAll',function(playerName, chatMsg){ 
        console.log('\n----------------------------------------------------\n');
        console.log('Client send a chat message = ' + playerName+ ' - '+chatMsg);       

        io.emit('newChatMsg', playerName, chatMsg);
    });

    socket.on('msgChatGame',function(gameId, playerName, chatMsg){ 
        console.log('\n----------------------------------------------------\n');
        console.log('Client send a chat message = "' + chatMsg + '" to room ' + gameId);       

        io.in(gameId).emit('newChatMsg', playerName, chatMsg);
    });

    socket.on('disconnect',function(){
        console.log('\n----------------------------------------------------\n');
        console.log('Disconnect');
    });


// -------------------------------------------------
// Integration with PHP ----------------------------
// -------------------------------------------------
    socket.on('msgChatAllFromPHP',function(chatMsg){ 
        console.log('\n----------------------------------------------------\n');
        console.log('PHP Server send a chat message =  - '+chatMsg);       

        io.emit('newChatMsg', 'Server', chatMsg);
    });    
    
    socket.on('msgChatGameFromPHP',function(data){ 
        var dataObj = JSON.parse(data); 

        console.log('\n----------------------------------------------------\n');
        console.log('PHP Server send a chat message = "' + dataObj.msg + '" to room ' + dataObj.room);       

        socket.join(dataObj.room);
        io.in(dataObj.room).emit('newChatMsg', 'Server', dataObj.msg);
        socket.leave(dataObj.room);
    });        
});

