import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import { getParameterByName } from '../toolbox/Toolbox'

var firstTimeInScene = true

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
        //this.game.resizeApp();
        console.log("hello world")
        console.log(document.getElementsByTagName("*"))

        var allElements = document.getElementsByTagName("*");
        var allIds = [];
        for (var i = 0, n = allElements.length; i < n; ++i) {
            var el = allElements[i];
            if (el.id) { allIds.push(el.id); }
        }
        console.log(allIds)

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Alpaca', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.titleBitmapText2 = this.add.bitmapText(config.width/2, 140, 'khodijah', 'Shootout', TITLE_FONT_SIZE)
        this.titleBitmapText2.setOrigin(0.5, 0)

        this.startButton = new TextButton(this, config.width/2, 400, 'Start Game', function() {
            this.scene.start('Lobby')
        }.bind(this));

        this.creditsButton = new TextButton(this, config.width/2, 500, 'Credits', function() {
            this.scene.start('Credits')
        }.bind(this));

        if(firstTimeInScene) {
            firstTimeInScene = false
            this.navigateBasedOnQueryParams()
        }
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