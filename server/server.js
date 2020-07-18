var express = require("express")
var app = express()
var server = require("http").Server(app)
io = require("socket.io").listen(server)

var Lobby = require('./lobby/Lobby')

let playerIds = []

server.listen(process.env.PORT || 3000, function() {
    console.log('Server started')
})

Lobby.initialize()

io.on('connection', function(socket) {
    console.log('A user connected: ' + socket.id)
    playerIds.push(socket.id)
    console.log(playerIds)

    socket.on('enter lobby', Lobby.onEnterLobby)
    socket.on('enter room', Lobby.onEnterRoom)
    socket.on('leave room', Lobby.onLeaveRoom)
    socket.on('update player', Lobby.onUpdatePlayer)
    socket.on('join player slot', Lobby.onJoinPlayerSlot)
    socket.on('join spectators', Lobby.onJoinSpectators)
    socket.on('disconnect', onClientDisconnect)
})

function onClientDisconnect() {
    console.log('A user disconnected: ' + this.id)
    playerIds = playerIds.filter(playerIds => playerIds !== this.id)
    if (this.roomId == null) {
		return;
    }

    var rooms = Lobby.getRooms()
    Lobby.onLeaveRoom.call(this)
}