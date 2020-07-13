import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'

export default class CreditsScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Credits' 
        })
    }

    preload() {}

    create() {
        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Credits', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 500, 'Back', function() {
            this.scene.start('Title')
        }.bind(this));
    }

    update() {
    }
}