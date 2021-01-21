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
        var clickSound = this.sound.add('click')

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.backgroundImage = this.add.image(config.width/2, config.height/2, 'BG_stage')

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'ashcanbb', 'Credits', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 560, 'Back', function() {
            clickSound.play()
            this.scene.start('Title')
        }.bind(this));
    }

    update() {
    }
}