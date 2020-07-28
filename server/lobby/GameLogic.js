var GameLogic = function(id) {
    this.id = id
    this.players = {}
}

GameLogic.prototype = {

    reset: function() {
        this.players = {}
    },

    start: function(roomData) {
        this.reset()

        Object.entries(roomData.players).forEach((entry) => {
            this.players[entry[0]] = {
                id: entry[0],
                label: entry[1].label,
                alpacaKey: entry[1].alpacaKey,
                isActionReady: false,
                action: 'none'
            }
        })
    },

    updateAction: function(playerId, action) {
        this.players[playerId].isActionReady = true
        this.players[playerId].action = action
    },

    areAllPlayersActionsReady: function() {
        return Object.values(this.players).reduce((result, player) => {
			return result && player.isActionReady
		}, true)
    }

}


module.exports = GameLogic