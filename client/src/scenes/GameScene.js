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

        this.player1 = new Player(this, config.width/4, 300, 'jaka')
        this.player1.faceRight()
        this.player2 = new Player(this, 3*config.width/4, 300, 'punka')

        this.spectator = new Spectator(this, config.width/2, 700)
        this.spectator.hide()
    }

    update() {
    }
}