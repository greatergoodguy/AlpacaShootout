import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preloader' 
        })
    }

    init() {
        console.log("PreloaderScene: init()")
        //  Inject our CSS
        var element = document.createElement('style')
        document.head.appendChild(element)
        var sheet = element.sheet
        var styles = '@font-face { font-family: "troika"; src: url("client/src/assets/fonts/ttf/troika.otf") format("opentype"); }\n'
        sheet.insertRule(styles, 0)
        styles = '@font-face { font-family: "Caroni"; src: url("client/src/assets/fonts/ttf/caroni.otf") format("opentype"); }\n'
        sheet.insertRule(styles, 0)
        styles = '@font-face { font-family: "Piedra-Regular"; src: url("client/src/assets/fonts/ttf/Piedra-Regular.ttf") format("opentype"); }\n'
        sheet.insertRule(styles, 0)
        styles = '@font-face { font-family: "Assistant-SemiBold"; src: url("client/src/assets/fonts/ttf/Assistant-SemiBold.ttf") format("opentype"); }\n'
        sheet.insertRule(styles, 0)
        styles = '@font-face { font-family: "RobotoSlab-Regular"; src: url("client/src/assets/fonts/ttf/RobotoSlab-Regular.ttf") format("opentype"); }\n'
        sheet.insertRule(styles, 0)
    }

    displayLoader() {
        let self = this
        let loadingText = this.add.text(config.width/2, config.height/2, "Loading... 0%").setFontSize(48)
        loadingText.setOrigin(0.5, 0.5)    
        this.load.on('progress', function(progress) {
            loadingText.setText("Loading... " + Math.round(progress*100) + "%")
        })
        this.load.on('complete', function() {
            this.cameras.main.fadeOut(FADE_DURATION)
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                self.scene.start('Title')
            })
        }.bind(this))
    }

    preload() {
        this.displayLoader()
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

        this.load.image('buttonLong_brown', 'client/src/assets/ui/buttonLong_brown.png')
        this.load.image('buttonLong_brown_pressed', 'client/src/assets/ui/buttonLong_brown_pressed.png')
        this.load.image('InvisiblePixel', 'client/src/assets/ui/InvisiblePixel.png')
        this.load.image('whitePixel', 'client/src/assets/ui/whitePixel.png')
        this.load.image('whiteSquare', 'client/src/assets/ui/whiteSquare.png')
        this.load.image('eye', 'client/src/assets/ui/eye.png')

        this.load.bitmapFont('khodijah', 'client/src/assets/fonts/khodijah.png', 'client/src/assets/fonts/khodijah.fnt')

        this.load.audio("click", 'client/src/assets/sounds/click.ogg')

        // //this.game.socket = io('http://localhost:3000')
    }

    create() {
        WebFont.load({
            custom: {
                families: [ 'troika', 'Caroni', 'Piedra-Regular', 'Assistant-SemiBold', 'RobotoSlab-Regular' ]
            },
            active: function ()
            {}
        })
    }

    update() {}
}