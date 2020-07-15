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
        //this.socket.emit('enter room', {roomId: this.gameData.id})

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
            this.scene.start('Lobby')
        }.bind(this))

        this.player1SelectorView = new PlayerSelectorView(this, config.width/4, 0)
        this.player2SelectorView = new PlayerSelectorView(this, 3*config.width/4, 0)
        this.spectatorListView = new SpectatorListView(this)
        this.spectatorListView.setVisible(false)
    }

    update() {}
}