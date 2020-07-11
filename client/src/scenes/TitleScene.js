import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Title' 
        })
    }

    preload() {
        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Alpaca', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.titleBitmapText2 = this.add.bitmapText(config.width/2, 140, 'khodijah', 'Shootout', TITLE_FONT_SIZE)
        this.titleBitmapText2.setOrigin(0.5, 0)
    }

    create() {}

    update() {}
}