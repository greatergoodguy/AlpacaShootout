const uuid = require('uuid')
const Room = require('./Room')
const Game = require('./Game')
const GameLogic = require('./GameLogic')

var rooms = {}
var lobbyId = -1
var numRooms = 4

var games = {}
var gameLogics = {}

var Lobby = {
	initialize: function() {
		for(var i = 0; i < numRooms; i++) {
			let id = uuid.v4()
			rooms[id] = new Room(id, i + 1);
			games[id] = new Game(id)
			gameLogics[id] = new GameLogic(id)
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
				data.userType = 'player'
				room.addPlayer(this.id)
			} else {
				data.userType = 'spectator'
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
		var gameLogic = gameLogics[data.roomId]
		var game = games[data.roomId]

		if(room) {
			room.updatePlayer(data)
			this.broadcast.to(data.roomId).emit("update player", room.players[this.id])

			console.log('room.hasMaxPlayers(): ' + room.hasMaxPlayers())
			console.log('room.areAllPlayersReady(): ' + room.areAllPlayersReady())

			if(room.hasMaxPlayers() && room.areAllPlayersReady()) {
				room.setState("in progress")
				gameLogic.start(room)
				game.start(room)
				room.turn = {}
				io.in(data.roomId).emit("start game", room);
			}
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
		broadcastSlotStateUpdate(data.roomId, room)
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
		broadcastSlotStateUpdate(data.roomId, room)
	},

	onEnterGame: function(data) {
		console.log('Lobby.onEnterGame()')
		console.log(data)

		var room = rooms[data.roomId]
		var game = games[data.roomId]
		if(room) {
			this.emit("show game", room, game)
		}
	},

	onActionPlayed: function(data) {
		console.log('Lobby.onActionPlayed()')
		console.log(data)

		var room = rooms[data.roomId]
		var gameLogic = gameLogics[data.roomId]
		var game = games[data.roomId]
		if(!room) { return }

		if(room.isPlayer(this.id)) {
			let player = room.players[this.id]
			if(player.isActionReady) {
				return
			}

			gameLogic.updateAction(this.id, data.action)
			gameLogic.process()
			game.update(gameLogic)

			this.broadcast.to(data.roomId).emit("update player in game", game.players[this.id])
			if(game.showActions) {
				io.in(this.roomId).emit("show actions", room, game)
			}
		}
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
			room.setState("joinable")
			room.turn = {}
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