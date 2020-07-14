import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'

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
        this.alpacaTextures = ['jaka_standby', 'punka_standby', 'pompaca_standby']

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Room 1', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 800, 'Back', function() {
            this.scene.start('Lobby')
        }.bind(this))

        this.selectionUI = [{}, {}]

        this.initSelectionUI(0, config.width/4)
        this.initSelectionUI(1, 3*config.width/4)
    }

    update() {}

    initSelectionUI(playerIndex, centerX) {
        this.selectionUI[playerIndex].index = 0
        this.selectionUI[playerIndex].alpaca = this.add.image(centerX, 400, 'jaka_standby')
        this.selectionUI[playerIndex].alpaca.setScale(0.5)
        this.selectionUI[playerIndex].leftArrow = new ImageButton(this, centerX - 80, 600, 'arrowBrown_left', function() {
            this.selectionUI[playerIndex].index = (this.selectionUI[playerIndex].index - 1).mod(this.alpacaTextures.length)
            this.selectionUI[playerIndex].alpaca.setTexture(this.alpacaTextures[this.selectionUI[playerIndex].index])

            console.log(this.selectionUI[playerIndex].index)
            console.log(this.alpacaTextures[this.selectionUI[playerIndex].index])
        }.bind(this))
        this.selectionUI[playerIndex].leftArrow.setScale(1.5)
        this.selectionUI[playerIndex].rightArrow = new ImageButton(this, centerX + 80, 600, 'arrowBrown_right', function() {
            this.selectionUI[playerIndex].index = (this.selectionUI[playerIndex].index + 1).mod(this.alpacaTextures.length)
            this.selectionUI[playerIndex].alpaca.setTexture(this.alpacaTextures[this.selectionUI[playerIndex].index])

            console.log(this.selectionUI[playerIndex].index)
            console.log(this.alpacaTextures[this.selectionUI[playerIndex].index])
        }.bind(this))
        this.selectionUI[playerIndex].rightArrow.setScale(1.5)

        this.selectionUI[playerIndex].readyButton = new TextButton(this, centerX, 600, 'Ready', function() {
        }.bind(this))
        this.selectionUI[playerIndex].readyButton.setBackgroundImageScale(0.65, 1)
        this.selectionUI[playerIndex].readyButton.setScale(0.8)
    }
}