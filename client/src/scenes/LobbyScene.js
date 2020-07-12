import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import UIButton from '../helper/UIButton'
import ImageButton from '../helper/ImageButton'

export default class LobbyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Lobby' 
        })
    }

    preload() {
        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Lobby', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.room1Button = new UIButton(this, config.width/2, 400, 'Room 1 (0/2)', function() {
        }.bind(this))


        this.room1WatchButton = new ImageButton(this, config.width/2 + 210, 400, 'Room 1 (0/2)', function() {
        }.bind(this))

        this.backButton = new UIButton(this, config.width/2, 500, 'Back', function() {
            this.scene.start('Title')
        }.bind(this))
    }

    create() {
        console.log(this.room1Button.x)
        console.log(this.room1Button.width)
        console.log(this.room1Button.scaleX)
    }

    update() {
    }
}