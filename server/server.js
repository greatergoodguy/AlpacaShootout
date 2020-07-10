var express = require("express")
var app = express()
var server = require("http").Server(app)
io = require("socket.io").listen(server)

io.on('connection', function(socket) {
    console.log('A user connected: ' + socket.id)
})