const uuid = require('uuid')
const Room = require('./Room')

var rooms = {}
var lobbyId = -1
var numRooms = 1

var Lobby = {
	initialize: function() {
		for(var i = 0; i < numRooms; i++) {
			let id = uuid.v4()
			rooms[id] = new Room(id, i + 1);
		}
	},
	getLobbySlots: function() {
		return rooms;
    },
    getLobbyId: function() {
		return lobbyId;
    },
	getNumRooms: function() {
		return numRooms;
	},
	broadcastSlotStateUpdate: function(roomId, newState) {
		broadcastSlotStateUpdate(roomId, newState);
	},
	onEnterLobby: function(data) {
		console.log('Lobby.onEnterLobby()')
		this.join(lobbyId);
		io.in(lobbyId).emit("add slots", rooms);
	},
	onEnterRoom: function(data) {
		console.log('Lobby.onEnterRoom()')
		console.log(data)

		var room = rooms[data.roomId]
		if(room) {
			this.leave(lobbyId)
			this.join(data.roomId)
			room.addPlayer(this.id)

			this.roomId = data.roomId
		
			this.emit("show room", room)
			this.broadcast.to(data.roomId).emit("player joined", room.players[this.id])
			broadcastSlotStateUpdate(data.roomId, room)
		}
	},
	onLeaveRoom: function(data) {
		leaveRoom.call(this)
	},
}

function broadcastSlotStateUpdate(roomId, room) {
	io.in(lobbyId).emit("update slot", {roomId: roomId, room: room})
}

function leaveRoom() {
	console.log('Lobby.leaveRoom()')
	console.log('this.roomId: ' + this.roomId)
	var room = rooms[this.roomId]

	this.leave(this.roomId)
	if(room) {
		console.log('remove player from room')
		let playerData = room.players[this.id]
		room.removePlayer(this.id)
		io.in(this.roomId).emit("player left", playerData)
		io.in(lobbyId).emit("update slot", {roomId: this.roomId, room: room})
	}
}

module.exports = Lobby