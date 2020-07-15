
var playerLabelIndices = {
	"P1": 0,
	"P2": 1
}

var Room = function(id, roomNumber) {
    this.players = {}
    this.spectators = {}
    this.id = id
    this.roomNumber = roomNumber
	this.state = "joinable"
	this.gameStart = false
	this.playerSlots = [{label: "P1", available: true}, {label: "P2", available: true}]
}

Room.prototype = {
	getPlayerIds: function() {
		return Object.keys(this.players)
	},

	getNumPlayers: function() {
		return Object.keys(this.players).length
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
	},

	removeSpectator: function(id) {
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
	}
};

module.exports = Room