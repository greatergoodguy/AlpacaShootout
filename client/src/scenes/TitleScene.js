import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import UIButton from '../helper/UIButton'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Title' 
        })
    }

    preload() {
        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Alpaca', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.titleBitmapText2 = this.add.bitmapText(config.width/2, 140, 'khodijah', 'Shootout', TITLE_FONT_SIZE)
        this.titleBitmapText2.setOrigin(0.5, 0)

        this.startButton = new UIButton(this, config.width/2, 400, 'Start Game', function() {
            // clickSound.play()
            // self.cameras.main.fadeOut(FADE_DURATION)
            // invisiblePixel.setInteractive()
            // self.cameras.main.once('camerafadeoutcomplete', function (camera) {
            //     self.scene.start('Lobby')
            // })
            this.scene.start('Lobby')
        }.bind(this));

        this.creditsButton = new UIButton(this, config.width/2, 500, 'Credits', function() {
            this.scene.start('Credits')
        }.bind(this));
    }

    create() {}

    update() {}
}