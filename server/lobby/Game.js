const { alpacas } = require('../../client/src/config/const')

var Game = function(id) {
    this.id = id
    this.players = {}
}

Game.prototype = {

    reset: function() {
        this.players = {}
        this.showActions = false
        this.isFinished = false
    },

    start: function(room) {
        this.reset()
        Object.entries(room.players).forEach((entry) => {
            this.players[entry[0]] = {
                id: entry[0],
                label: entry[1].label,
                alpacaKey: entry[1].alpacaKey,
                isActionReady: false,
                statusText: 'Thinking',
                statusTextColor: 'red',
                texture: 'standby',
                maxStats: {
                    heart: alpacas[entry[1].alpacaKey].stats.heartMax,
                    ammo: alpacas[entry[1].alpacaKey].stats.ammoMax,
                    shield: alpacas[entry[1].alpacaKey].stats.shieldMax
                },
                currentStats: {
                    heart: alpacas[entry[1].alpacaKey].stats.heart,
                    ammo: alpacas[entry[1].alpacaKey].stats.ammo,
                    shield: alpacas[entry[1].alpacaKey].stats.shield
                }
            }
        })
    },

    update(gameLogic) {
        this.showActions = gameLogic.areAllPlayersActionsReady()
        Object.entries(gameLogic.players).forEach((entry) => {
            this.players[entry[0]].isActionReady = entry[1].isActionReady
            if(this.showActions) {
                this.players[entry[0]].texture = entry[1].texture
                this.players[entry[0]].statusText = entry[1].action
                if(this.players[entry[0]].statusText == "Shield") {
                    this.players[entry[0]].statusText = "Dodge"
                }
                this.players[entry[0]].statusTextColor = 'blue'
            } else {
                this.players[entry[0]].texture = 'standby'
                if(entry[1].isActionReady) {
                    this.players[entry[0]].statusText = 'Ready'
                    this.players[entry[0]].statusTextColor = 'green'
                } else {
                    this.players[entry[0]].statusText = 'Thinking'
                    this.players[entry[0]].statusTextColor = 'red'
                }
            }

            this.players[entry[0]].currentStats.heart = entry[1].currentStats.heart
            this.players[entry[0]].currentStats.ammo = entry[1].currentStats.ammo
            this.players[entry[0]].currentStats.shield = entry[1].currentStats.shield

            if(this.players[entry[0]].currentStats.heart == 0) {
                this.isFinished = true
            }
        })   
    }

}

module.exports = Game