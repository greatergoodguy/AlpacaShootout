import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'

export default class RoomScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Room' 
        })
    }

    preload() {}

    create() {
        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Room 1', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 800, 'Back', function() {
            this.scene.start('Lobby')
        }.bind(this));

        this.selectionUI = [{}, {}]

        this.selectionUI[0].alpaca = this.add.image(config.width/4, 400, 'jaka_standby')
        this.selectionUI[0].alpaca.setScale(0.5)
        this.selectionUI[0].leftArrow = this.add.image(config.width/4 - 60, 600, 'arrowBrown_left')
        this.selectionUI[0].leftArrow.setScale(2)
        this.selectionUI[0].rightArrow = this.add.image(config.width/4 + 60, 600, 'arrowBrown_right')
        this.selectionUI[0].rightArrow.setScale(2)

        this.selectionUI[1].alpaca = this.add.image(3*config.width/4, 400, 'punka_standby')
        this.selectionUI[1].alpaca.setScale(0.5)
        this.selectionUI[1].leftArrow = this.add.image(3*config.width/4 - 60, 600, 'arrowBrown_left')
        this.selectionUI[1].leftArrow.setScale(2)
        this.selectionUI[1].rightArrow = this.add.image(3*config.width/4 + 60, 600, 'arrowBrown_right')
        this.selectionUI[1].rightArrow.setScale(2)
    }

    update() {
    }
}