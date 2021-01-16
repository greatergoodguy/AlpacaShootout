import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import io from 'socket.io-client'

export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Preloader' 
        })
    }

    init() {
        console.log("PreloaderScene: init()")

        this.game.resizeApp()

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
            console.log("PreloaderScene: complete()")
            this.cameras.main.fadeOut(FADE_DURATION)
            this.cameras.main.once('camerafadeoutcomplete', function (camera) {
                console.log("PreloaderScene: start Title Scene")
                self.scene.start('Title')
                //self.scene.start('Game')
            })
        }.bind(this))
    }

    preload() {
        this.displayLoader()
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js')

        this.load.image('suri_standby', 'client/src/assets/alpaca/suri_standby.png')
        this.load.image('suri_shield', 'client/src/assets/alpaca/suri_shield.png')
        this.load.image('suri_shoot', 'client/src/assets/alpaca/suri_shoot.png')
        this.load.image('suri_reload', 'client/src/assets/alpaca/suri_reload.png')
        this.load.image('suri_hurt', 'client/src/assets/alpaca/suri_hurt.png')
        this.load.image('suri_rest', 'client/src/assets/alpaca/suri_rest.png')

        this.load.image('jaka_standby', 'client/src/assets/alpaca/jaka_standby.png')
        this.load.image('jaka_shield', 'client/src/assets/alpaca/jaka_shield.png')
        this.load.image('jaka_shoot', 'client/src/assets/alpaca/jaka_shoot.png')
        this.load.image('jaka_reload', 'client/src/assets/alpaca/jaka_reload.png')
        this.load.image('jaka_hurt', 'client/src/assets/alpaca/jaka_hurt.png')

        this.load.image('pompaca_standby', 'client/src/assets/alpaca/pompaca_standby.png')
        this.load.image('punka_standby', 'client/src/assets/alpaca/punka_standby.png')
        this.load.image('punka_standby', 'client/src/assets/alpaca/punka_standby.png')
        this.load.image('empty_slot', 'client/src/assets/alpaca/empty_slot.png')
        this.load.image('spectator', 'client/src/assets/alpaca/spectator.png')

        this.load.image('BG_pillars', 'client/src/assets/backgrounds/BG_pillars.png')

        this.load.image('buttonLong_brown', 'client/src/assets/ui/buttonLong_brown.png')
        this.load.image('buttonLong_brown_pressed', 'client/src/assets/ui/buttonLong_brown_pressed.png')
        this.load.image('arrowBrown_left', 'client/src/assets/ui/arrowBrown_left.png')
        this.load.image('arrowBrown_right', 'client/src/assets/ui/arrowBrown_right.png')
        this.load.image('InvisiblePixel', 'client/src/assets/ui/InvisiblePixel.png')
        this.load.image('whitePixel', 'client/src/assets/ui/whitePixel.png')
        this.load.image('whiteSquare', 'client/src/assets/ui/whiteSquare.png')
        this.load.image('eye', 'client/src/assets/ui/eye.png')
        this.load.image('heart', 'client/src/assets/ui/heart.png')
        this.load.image('heartEmpty', 'client/src/assets/ui/heart_empty.png')
        this.load.image('ammo', 'client/src/assets/ui/bulletSilverSilver_outline.png')
        this.load.image('ammoEmpty', 'client/src/assets/ui/bulletSilverSilver_outline_empty.png')
        this.load.image('shield', 'client/src/assets/ui/barrelRed_up.png')
        this.load.image('shieldEmpty', 'client/src/assets/ui/barrelRed_up_empty.png')

        this.load.bitmapFont('khodijah', 'client/src/assets/fonts/khodijah.png', 'client/src/assets/fonts/khodijah.fnt')

        this.load.audio("click", 'client/src/assets/sounds/click.ogg')
        this.load.audio("gun_dodge", 'client/src/assets/sounds/gun_dodge.ogg')
        this.load.audio("gun_explode", 'client/src/assets/sounds/gun_explode.ogg')
        this.load.audio("gun_reload", 'client/src/assets/sounds/gun_reload.mp3')
        this.load.audio("gun_shot", 'client/src/assets/sounds/gun_shot.ogg')

        this.game.socket = io('http://localhost:3000')
        //this.game.socket = io('https://alpaca-shootout.herokuapp.com')

        Number.prototype.mod = function(n) {
            return ((this%n)+n)%n;
        }
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