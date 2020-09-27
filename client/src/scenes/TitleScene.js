import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import { getParameterByName } from '../toolbox/Toolbox'
import FormUtil from '../util/formUtil'

var firstTimeInScene = true

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Title' 
        })
    }

    preload() {}

    create() {
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

        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        //this.formUtil.showNumbers();
        
        this.formUtil.setVisibile("myText", true)
        this.formUtil.scaleToGameW("myText", .95);
        this.formUtil.placeElementAt(5, 'myText', true);
        
        // this.formUtil.scaleToGameW("area51", .8);
        // this.formUtil.scaleToGameH("area51", .5);
        // this.formUtil.placeElementAt(60, "area51", true, true);
        // this.formUtil.addChangeCallback("area51", this.textAreaChanged, this);
    }

    textAreaChanged() {
    	var text=this.formUtil.getTextAreaValue("area51");
    	console.log(text);
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