var Game = function(id) {
    this.id = id
    this.players = {}
}

Game.prototype = {

    reset: function() {
        this.players = {}
        this.showActions = false
    },

    start: function(room) {
        this.reset()
        Object.entries(room.players).forEach((entry) => {
            this.players[entry[0]] = {
                id: entry[0],
                label: entry[1].label,
                alpacaKey: entry[1].alpacaKey,
                isActionReady: false,
                action: 'none'
            }
        })
    },

    update(gameLogic) {
        this.showActions = gameLogic.areAllPlayersActionsReady()
        Object.entries(gameLogic.players).forEach((entry) => {
            this.players[entry[0]].isActionReady = entry[1].isActionReady
            if(this.showActions) {
                this.players[entry[0]].action = entry[1].action
            }
        })   
    }

}

module.exports = Game