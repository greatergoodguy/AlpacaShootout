
var playerLabelIndices = {
	"P1": 0,
	"P2": 1
}

var spectatorLabelIndices = {
	"S1": 0,
	"S2": 1,
	"S3": 2,
	"S4": 3,
	"S5": 4,
	"S6": 5,
	"S7": 6,
	"S8": 7
}

var Room = function(id, roomNumber) {
    this.players = {}
    this.spectators = {}
    this.id = id
    this.roomNumber = roomNumber
	this.state = "joinable"
	this.gameStart = false
	this.turn = {}
	this.playerSlots = [{label: "P1", available: true}, {label: "P2", available: true}]
	this.spectatorSlots = [
		{label: "S1", available: true}, 
		{label: "S2", available: true},
		{label: "S3", available: true}, 
		{label: "S4", available: true}, 
		{label: "S5", available: true}, 
		{label: "S6", available: true}, 
		{label: "S7", available: true}, 
		{label: "S8", available: true},
	]
}

Room.prototype = {
	getPlayerIds: function() {
		return Object.keys(this.players)
	},

	getNumPlayers: function() {
		return Object.keys(this.players).length
	},

	getNumSpectators: function() {
		return Object.keys(this.spectators).length
	},

	isPlayer: function(id) {
		return id in this.players
	},

	isSpectator: function(id) {
		return id in this.spectators
	},

	hasMaxPlayers: function() {
		return this.getNumPlayers() == this.playerSlots.length
	},

	hasMaxSpectators: function() {
		return this.getNumSpectators() == this.spectatorSlots.length
	},

	removePlayer: function(id) {
		if(id in this.players) {
			this.playerSlots[playerLabelIndices[this.players[id].label]].available = true
			delete this.players[id]
		}
	},

	setState: function(newState) {
		this.state = newState
	},

	addPlayer: function(id, username) {
		this.players[id] = {
			id: id, 
			label: this.claimFirstAvailablePlayerSlot(), 
			alpacaKey: 'suri', 
			isReady: false,
			username: username,
		}
	},

	addPlayerToSlot: function(id, label, username) {
		if(this.playerSlots[playerLabelIndices[label]].available) {
			this.playerSlots[playerLabelIndices[label]].available = false
			this.players[id] = {
				id: id, 
				label: label, 
				alpacaKey: 'jaka', 
				isReady: false,
				username: username
			}
		}
	},

	addSpectator: function(id, username) {
		this.spectators[id] = {
			id: id, 
			label: this.claimFirstAvailableSpectatorSlot(),
			username: username,
		}
	},

	removeSpectator: function(id) {
		console.log("removeSpectator: " + id + ", " + this.spectators[id].label)
		if(id in this.spectators && this.spectators[id].label) {
			this.spectatorSlots[spectatorLabelIndices[this.spectators[id].label]].available = true
			delete this.spectators[id]
		}
	},

	updatePlayer: function(data) {
		console.log('Room.updatePlayer()')
		if('alpacaKey' in data) {
			this.players[data.playerId].alpacaKey = data.alpacaKey
		}
		if('isReady' in data) {
			this.players[data.playerId].isReady = data.isReady
		}
	},

	areAllPlayersReady: function() {
		return Object.values(this.players).reduce((result, player) => {
			return result && player.isReady
		}, true)
	},

	claimFirstAvailablePlayerSlot: function() {
		for(var i = 0; i < this.playerSlots.length; i++) {
			var playerSlot = this.playerSlots[i]
			if(playerSlot.available) {
				playerSlot.available = false
				return playerSlot.label
			}
		}
	},

	claimFirstAvailableSpectatorSlot: function() {
		for(var i = 0; i < this.spectatorSlots.length; i++) {
			var spectatorSlot = this.spectatorSlots[i]
			if(spectatorSlot.available) {
				spectatorSlot.available = false
				return spectatorSlot.label
			}
		}
	},

	unreadyAllPlayers: function() {
		Object.values(this.players).forEach((entry) => {
			entry.isReady = false
		})
	},
};

module.exports = Room