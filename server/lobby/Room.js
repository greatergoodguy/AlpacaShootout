
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
	this.playerSlots = [{label: "P1", available: true}, {label: "P2", available: true}]
	this.spectatorSlots = [
		{label: "S1", available: true}, 
		{label: "S2", available: true},
		{label: "S3", available: true}, 
		{label: "S4", available: true}, 
		{label: "S5", available: true}, 
		{label: "S6", available: true}, 
		{label: "S7", available: true}, 
		{label: "S8", available: true}
	]
}

Room.prototype = {
	getPlayerIds: function() {
		return Object.keys(this.players)
	},

	getNumPlayers: function() {
		return Object.keys(this.players).length
	},

	isPlayer: function(id) {
		return id in this.players
	},

	isSpectator: function(id) {
		return id in this.spectators
	},

	removePlayer: function(id) {
		if(id in this.players) {
			this.playerSlots[playerLabelIndices[this.players[id].label]].available = true
			delete this.players[id]
		}
	},

	addPlayer: function(id) {
		this.players[id] = {id: id, label: this.claimFirstAvailablePlayerSlot(), texture: 'jaka_standby', isReady: false}
	},

	addSpectator: function(id) {
		this.spectators[id] = {id: id, label: this.claimFirstAvailableSpectatorSlot()}
	},

	removeSpectator: function(id) {
		if(id in this.spectators) {
			this.spectatorSlots[spectatorLabelIndices[this.spectators[id].label]].available = true
			delete this.spectators[id]
		}
	},

	updatePlayer: function(data) {
		console.log('Room.updatePlayer()')
		if('newTexture' in data) {
			this.players[data.playerId].texture = data.newTexture
		}
		if('isReady' in data) {
			this.players[data.playerId].isReady = data.isReady
		}
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
	}
};

module.exports = Room