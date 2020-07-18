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
	getRooms: function() {
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
			if(data.userType == 'player' && !room.hasMaxPlayers()) {
				room.addPlayer(this.id)
			} else {
				room.addSpectator(this.id)
			}

			this.roomId = data.roomId
		
			this.emit("show room", room)
	
			if(data.userType == 'player') {
				this.broadcast.to(data.roomId).emit("player joined", room.players[this.id])
			} else if(data.userType == 'spectator') {
				this.broadcast.to(data.roomId).emit("spectator joined", room.spectators[this.id])
			}


			broadcastSlotStateUpdate(data.roomId, room)
		}
	},
	onLeaveRoom: function(data) {
		leaveRoom.call(this)
	},
	onUpdatePlayer: function(data) {
		console.log('Lobby.onUpdatePlayer()')
		console.log(data)
		var room = rooms[data.roomId]
		if(room) {
			room.updatePlayer(data)
			this.broadcast.to(data.roomId).emit("update player", room.players[this.id])
		}
	},
	onJoinPlayerSlot: function(data) {
		console.log('Lobby.onJoinPlayerSlot()')
		console.log(data)

		var room = rooms[data.roomId]
		if(!room) { return }

		if(room.isSpectator(this.id)) {
			console.log('remove spectator from room')
			let spectatorData = room.spectators[this.id]
			room.removeSpectator(this.id)
			io.in(this.roomId).emit("spectator left", spectatorData)
		}

		console.log('add player to room')
		room.addPlayerToSlot(this.id, data.label)
		io.in(this.roomId).emit("player joined", room.players[this.id])
	},
	onJoinSpectators: function(data) {
		console.log('Lobby.onJoinSpectators()')
		console.log(data)

		var room = rooms[data.roomId]
		if(!room) { return }

		if(room.isPlayer(this.id)) {
			console.log('remove player from room')
			let playerData = room.players[this.id]
			room.removePlayer(this.id)
			io.in(this.roomId).emit("player left", playerData)
		}

		console.log('add spectator to room')
		room.addSpectator(this.id)
		io.in(this.roomId).emit("spectator joined", room.spectators[this.id])
	}
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
		if(room.isPlayer(this.id)) {
			console.log('remove player from room')
			let playerData = room.players[this.id]
			room.removePlayer(this.id)
			io.in(this.roomId).emit("player left", playerData)
		}
		if(room.isSpectator(this.id)) {
			console.log('remove spectator from room')
			let spectatorData = room.spectators[this.id]
			room.removeSpectator(this.id)
			io.in(this.roomId).emit("spectator left", spectatorData)
		}
		io.in(lobbyId).emit("update slot", {roomId: this.roomId, room: room})
	}
}

module.exports = Lobby