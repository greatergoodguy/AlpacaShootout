var express = require("express")
var app = express()
var server = require("http").Server(app)
io = require("socket.io").listen(server)

var Lobby = require('./lobby/Lobby')

server.listen(process.env.PORT || 3000, function() {
    console.log('Server started')
})

Lobby.initialize()

io.on('connection', function(socket) {
    console.log('A user connected: ' + socket.id)

    socket.on('enter lobby', Lobby.onEnterLobby)
})