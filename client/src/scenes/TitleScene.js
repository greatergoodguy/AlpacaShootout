import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import { getParameterByName } from '../toolbox/Toolbox'
import TextEdit from 'phaser3-rex-plugins/plugins/textedit'

var firstTimeInScene = true

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Title' 
        })
    }

    init() {
        console.log("TitleScene: init()")
    }

    preload() {
        console.log("TitleScene: preload()")
    }

    create() {
        console.log("TitleScene: create()")

        var clickSound = this.sound.add('click')

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.backgroundImage = this.add.image(config.width/2, config.height/2, 'BG_stage')

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'ashcanbb', 'Alpaca', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.titleBitmapText2 = this.add.bitmapText(config.width/2, 140, 'ashcanbb', 'Shootout', TITLE_FONT_SIZE)
        this.titleBitmapText2.setOrigin(0.5, 0)

        this.startButton = new TextButton(this, config.width/2, 460, 'Play', function() {
            clickSound.play()
            this.scene.start('Lobby')
        }.bind(this));

        this.creditsButton = new TextButton(this, config.width/2, 560, 'Credits', function() {
            clickSound.play()
            this.scene.start('Credits')
        }.bind(this));

        //this.setupUsernameInputField()

        if(firstTimeInScene) {
            firstTimeInScene = false
            this.navigateBasedOnQueryParams()
        }
    }

    setupUsernameInputField() {
        const game = this.game

        this.add.text(50, 0, 'Username', { fontSize: 32, color: '#00ff00', backgroundColor: '#00000099' })
        const helloWorldText = this.add.text(50, 50, this.game.config.username, { fontSize: 32, color: '#00ff00', backgroundColor: '#00000099' })
        helloWorldText.setInteractive().on('pointerdown', () => {
            var config = {
                onTextChanged: function(textObject, text) {
                    game.config.username = text
                    textObject.text = text
                }
    
            };
            this.rexUI.edit(helloWorldText, config)
        })
    }

    update() {}

    navigateBasedOnQueryParams() {
        let titleParam = getParameterByName('title')
        console.log(titleParam)
        if(titleParam === 'start') {
            this.scene.start('Lobby')
        } else if(titleParam === 'credits') {
            this.scene.start('Credits')
        }
    }
}