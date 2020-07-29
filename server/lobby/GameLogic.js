const { alpacas } = require('../../client/src/config/const')

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
                action: 'none',
                texture: 'standby',
                maxStats: {
                    heart: alpacas[entry[1].alpacaKey].stats.heart,
                    ammo: alpacas[entry[1].alpacaKey].stats.ammo,
                    shield: alpacas[entry[1].alpacaKey].stats.shield
                },
                currentStats: {
                    heart: alpacas[entry[1].alpacaKey].stats.heart,
                    ammo: alpacas[entry[1].alpacaKey].stats.ammo,
                    shield: alpacas[entry[1].alpacaKey].stats.shield
                }
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
    },

    process: function() {
        if(!this.areAllPlayersActionsReady()) {
            return
        }

        if(Object.keys(this.players).length < 2) {
            return
        }

        var player1
        var player2

        Object.entries(this.players).forEach((entry) => {
            if(entry[1].label === 'P1') {
                player1 = entry[1]
            } else if(entry[1].label === 'P2') {
                player2 = entry[1]
            }
        })

        console.log('Player 1')
        console.log(player1)
        console.log('Player 2')
        console.log(player2)

        if(player1.action === 'Shoot' && player2.action === 'Shoot') {
            player1.texture = 'shoot'
            this.reduceStat(player1, 'ammo')
            player2.texture = 'shoot'
            this.reduceStat(player2, 'ammo')
        } else if(player1.action === 'Shoot' && player2.action === 'Reload') {
            player1.texture = 'shoot'
            this.reduceStat(player1, 'ammo')
            player2.texture = 'hurt'
            this.reduceStat(player2, 'heart')
        } else if(player1.action === 'Shoot' && player2.action === 'Shield') {
            player1.texture = 'shoot'
            this.reduceStat(player1, 'ammo')
            player2.texture = 'shield'
            this.reduceStat(player2, 'shield')
        } else if(player1.action === 'Reload' && player2.action === 'Shoot') {
            player1.texture = 'hurt'
            this.reduceStat(player1, 'heart')
            player2.texture = 'shoot'
            this.reduceStat(player2, 'ammo')
        } else if(player1.action === 'Reload' && player2.action === 'Reload') {
            player1.texture = 'reload'
            this.gainStat(player1, 'ammo')
            player2.texture = 'reload'
            this.gainStat(player2, 'ammo')
        } else if(player1.action === 'Reload' && player2.action === 'Shield') {
            player1.texture = 'reload'
            this.gainStat(player1, 'ammo')
            player2.texture = 'shield'
            this.reduceStat(player2, 'shield')
        } else if(player1.action === 'Shield' && player2.action === 'Shoot') {
            player1.texture = 'shield'
            this.reduceStat(player1, 'shield')
            player2.texture = 'shoot'
            this.reduceStat(player2, 'ammo')
        } else if(player1.action === 'Shield' && player2.action === 'Reload') {
            player1.texture = 'shield'
            this.reduceStat(player1, 'shield')
            player2.texture = 'reload'
            this.gainStat(player2, 'ammo')
        } else if(player1.action === 'Shield' && player2.action === 'Shield') {
            player1.texture = 'shield'
            this.reduceStat(player1, 'shield')
            player2.texture = 'shield'
            this.reduceStat(player2, 'shield')
        }
    },

    reduceStat(player, key) {
        player.currentStats[key] = player.currentStats[key] - 1
        if(player.currentStats[key] < 0) {
            player.currentStats[key] = 0
        }
    },

    gainStat(player, key) {
        player.currentStats[key] = player.currentStats[key] + 1
        if(player.currentStats[key] > player.maxStats[key]) {
            player.currentStats[key] = player.maxStats[key]
        }
    }
}


module.exports = GameLogic