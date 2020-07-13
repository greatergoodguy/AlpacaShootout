
var playerLabelIndices = {
	"P1": 0,
	"P2": 1
}

var LobbySlot = function(id, roomNumber) {
    this.players = {}
    this.spectators = {}
    this.id = id
    this.roomNumber = roomNumber
	this.state = "joinable"
	this.gameStart = false
	this.playerSlots = [{label: "P1", available: true}, {label: "P2", available: true}]
}

LobbySlot.prototype = {
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
		this.players[id] = {label: this.claimFirstAvailablePlayerSlot(), ready: false}
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

module.exports = LobbySlot