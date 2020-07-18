import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'
import PlayerSelectorView from '../helper/PlayerSelectorView'
import SpectatorListView from '../helper/SpectatorListView'
import SpectatorSelectorView from '../helper/SpectatorSelectorView'

export default class RoomScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Room' 
        })
    }

    init(gameData) {
        this.gameData = gameData
        console.log(this.gameData)
	}

    preload() {}

    create() {
        this.game.socket.emit('enter room', {roomId: this.gameData.roomId, userType: this.gameData.userType})

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Room 1', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.spectateButton = new TextButton(this, config.width/2, 740, 'Spectate', function() {
            this.game.socket.emit('join spectators', { roomId: this.gameData.roomId, playerId: this.game.socket.id})
            this.spectateButton.setVisible(false)
        }.bind(this))
        this.spectateButton.setBackgroundImageScale(0.75, 1)
        this.spectateButton.setScale(0.8)
        this.spectatorListButton = new TextButton(this, config.width/2, 800, 'Spectator List', function() {
            this.spectatorListView.setVisible(true)
        }.bind(this))

        this.backButton = new TextButton(this, config.width/2, 900, 'Back', function() {
            this.game.socket.emit("leave room")
            this.game.socket.removeAllListeners()
            this.scene.start('Lobby')
        }.bind(this))

        this.playerSelectorViews = {}

        this.playerSelectorViews['P1'] = new PlayerSelectorView(this, config.width/4, 0, 'P1')
        this.playerSelectorViews['P1'].hide()
        this.playerSelectorViews['P2'] = new PlayerSelectorView(this, 3*config.width/4, 0, 'P2')
        this.playerSelectorViews['P2'].hide()
        this.spectatorListView = new SpectatorListView(this)
        this.spectatorListView.setVisible(false)
        this.spectateButton.setVisible(false)
        this.spectatorListButton.setVisible(false)

        this.spectatorSelectorView = new SpectatorSelectorView(this, config.width/2, config.height/2 + 250)

        this.game.socket.on("show room", this.populateRoom.bind(this))
        this.game.socket.on("player joined", this.playerJoined.bind(this))
        this.game.socket.on("player left", this.playerLeft.bind(this))
        this.game.socket.on("update player", this.updatePlayer.bind(this))

        this.game.socket.on("spectator joined", this.spectatorJoined.bind(this))
        this.game.socket.on("spectator left", this.spectatorLeft.bind(this))
        this.game.socket.on("update spectator", this.updateSpectator.bind(this))

        this.game.socket.on('disconnect', this.leaveRoom.bind(this))
    }

    update() {}

    populateRoom(data) {
        console.log('RoomScene.populateRoom()')
        console.log(data)
        let userId = this.game.socket.id

        Object.entries(data.players).forEach((entry) => {
            console.log(entry[1])
            let playerlabel = entry[1].label
            let playerSelectorView = this.playerSelectorViews[playerlabel]
            if(userId == entry[0]) {
                playerSelectorView.showUserAsCurrentPlayer()
            }
            else {
                playerSelectorView.showOnlinePlayer(entry[1])
            }
        })

        Object.entries(data.spectators).forEach((entry) => {
            console.log(entry[1])
            if(userId == entry[0]) {
                this.spectatorSelectorView.showUserAsSpectator(entry[1])
            }
            else {
                this.spectatorSelectorView.showOnlineSpectator(entry[1])
            }
        })

        if(!this.playerSelectorViews['P1'].isOccupied && userId in data.players) {
            this.playerSelectorViews['P1'].showEmpty()
        }
        if(!this.playerSelectorViews['P2'].isOccupied && userId in data.players) {
            this.playerSelectorViews['P2'].showEmpty()
        }
        if(!this.playerSelectorViews['P1'].isOccupied && userId in data.spectators) {
            this.playerSelectorViews['P1'].showEmptyAndJoinable()
        }
        if(!this.playerSelectorViews['P2'].isOccupied && userId in data.spectators) {
            this.playerSelectorViews['P2'].showEmptyAndJoinable()
        }

        if(userId in data.players) {
            this.isPlayer = true
            this.spectateButton.setVisible(true)
        } else {
            this.isPlayer = false
        }
    }

    playerJoined(data) {
        console.log('RoomScene.playerJoined()')
        console.log(data)
        let playerlabel = data.label
        let playerSelectorView = this.playerSelectorViews[playerlabel]

        let userId = this.game.socket.id
        if(userId == data.id) {
            this.isPlayer = true
            playerSelectorView.showUserAsCurrentPlayer()
            this.spectateButton.setVisible(true)
        }
        else {
            playerSelectorView.showOnlinePlayer(data)
        }
    }

    playerLeft(data) {
        console.log('RoomScene.playerLeft()')
        console.log(data)
        let userId = this.game.socket.id
        let playerlabel = data.label
        let playerSelectorView = this.playerSelectorViews[playerlabel]

        if(userId == data.id) {
            this.isPlayer = false
        }

        if(this.isPlayer) {
            playerSelectorView.showEmpty()
        }
        else {
            playerSelectorView.showEmptyAndJoinable()
        }

    }

    updatePlayer(data) {
        console.log('RoomScene.updatePlayer()')
        console.log(data)
        let playerlabel = data.label
        let playerSelectorView = this.playerSelectorViews[playerlabel]
        playerSelectorView.showOnlinePlayer(data)
    }

    spectatorJoined(data) {
        console.log('RoomScene.spectatorJoined()')
        console.log(data)

        let userId = this.game.socket.id
        if(userId == data.id) {
            this.spectatorSelectorView.showUserAsSpectator(data)
            this.playerSelectorViews['P1'].showEmptyAndJoinableIfNotOccupied()
            this.playerSelectorViews['P2'].showEmptyAndJoinableIfNotOccupied()
        } 
        else {
            this.spectatorSelectorView.showOnlineSpectator(data)
        }
    }

    spectatorLeft(data) {
        console.log('RoomScene.spectatorLeft()')
        console.log(data)
        this.spectatorSelectorView.removeSpectator(data)
    }

    updateSpectator(data) {
        console.log('RoomScene.updateSpectator()')
        console.log(data)
    }

    leaveRoom() {
        this.game.socket.emit("leave room")
        this.game.socket.removeAllListeners()
        this.scene.start('Title')
    }

    hideJoinAndSpectateButtons() {
        this.playerSelectorViews['P1'].hideJoinButton()
        this.playerSelectorViews['P2'].hideJoinButton()
        this.spectateButton.setVisible(false)
    }
}