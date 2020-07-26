import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import Player from '../game/Player'
import Spectator from '../game/Spectator'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game' 
        })
    }

    init(roomData) {
        this.roomData = roomData
        console.log(this.roomData)
	}

    preload() {}

    create() {
        this.background = this.add.image(config.width/2, config.height/2, 'BG_pillars').setScale(0.5, 0.5)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Game', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.shootButton = new TextButton(this, config.width/2, 550, 'Shoot', function() {
        }.bind(this))

        this.reloadButton = new TextButton(this, config.width/2, 650, 'Reload', function() {
        }.bind(this))

        this.shieldButton = new TextButton(this, config.width/2, 750, 'Shield', function() {
        }.bind(this))

        let player1Data = Object.values(this.roomData.players).find(player => player.label == 'P1')
        this.player1 = new Player(this, config.width/4, 300, player1Data.alpacaKey)
        this.player1.faceRight()

        let player2Data = Object.values(this.roomData.players).find(player => player.label == 'P2')
        this.player2 = new Player(this, 3*config.width/4, 300, player2Data.alpacaKey)

        this.spectator = new Spectator(this, config.width/2, 700)
        this.spectator.hide()
    }

    update() {}
}