const uuid = require('uuid')
const LobbySlot = require('./LobbySlot')

var lobbySlots = {}
var lobbyId = -1
var numLobbySlots = 4

var Lobby = {
	initialize: function() {
		for(var i = 0; i < numLobbySlots; i++) {
			let id = uuid.v4()
			lobbySlots[id] = new LobbySlot(id, i + 1);
		}
	},
	getLobbySlots: function() {
		return lobbySlots;
    },
    getLobbyId: function() {
		return lobbyId;
    },
	getNumLobbySlots: function() {
		return numLobbySlots;
    },
	onEnterLobby: function(data) {
		console.log('Lobby.onEnterLobby()')
		this.join(lobbyId);
		io.in(lobbyId).emit("add slots", lobbySlots);
	},
}

module.exports = Lobby