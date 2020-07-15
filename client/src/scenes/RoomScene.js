import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'
import PlayerSelectorView from '../helper/PlayerSelectorView'
import SpectatorListView from '../helper/SpectatorListView'

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
        this.game.socket.emit('enter room', {roomId: this.gameData.id})

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Room 1', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.spectateButton = new TextButton(this, config.width/2, 740, 'Spectate', function() {
            this.player1SelectorView.clear()
        }.bind(this))
        this.spectatorListButton = new TextButton(this, config.width/2, 800, 'Spectator List', function() {
            this.spectatorListView.setVisible(true)
        }.bind(this))

        this.backButton = new TextButton(this, config.width/2, 900, 'Back', function() {
            this.game.socket.emit("leave room")
            this.game.socket.removeAllListeners()
            this.scene.start('Lobby')
        }.bind(this))

        this.playerSelectorViews = {}

        this.playerSelectorViews['P1'] = new PlayerSelectorView(this, config.width/4, 0)
        this.playerSelectorViews['P1'].hide()
        this.playerSelectorViews['P2'] = new PlayerSelectorView(this, 3*config.width/4, 0)
        this.playerSelectorViews['P2'].hide()
        this.spectatorListView = new SpectatorListView(this)
        this.spectatorListView.setVisible(false)
        this.spectateButton.setVisible(false)
        this.spectatorListButton.setVisible(false)

        this.game.socket.on("show room", this.populateRoom.bind(this))
        this.game.socket.on("player joined", this.playerJoined.bind(this))
        this.game.socket.on("player left", this.playerLeft.bind(this))
        this.game.socket.on("update player", this.updatePlayer.bind(this))
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
                playerSelectorView.showCurrentPlayer()
            }
            else {
                playerSelectorView.showOnlinePlayer(entry[1])
            }
        })
    }

    playerJoined(data) {
        console.log('RoomScene.playerJoined()')
        console.log(data)
        let playerlabel = data.label
        let playerSelectorView = this.playerSelectorViews[playerlabel]
        playerSelectorView.showOnlinePlayer(data)
    }

    playerLeft(data) {
        console.log('RoomScene.playerLeft()')
        console.log(data)
        let playerlabel = data.label
        let playerSelectorView = this.playerSelectorViews[playerlabel]
        playerSelectorView.hide()
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
    }

    spectatorLeft(data) {
        console.log('RoomScene.spectatorLeft()')
        console.log(data)
    }
}