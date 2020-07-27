import 'phaser'
import TextButton from '../helper/TextBox'
import ImageButton from '../helper/ImageButton'
import Spectator from './Spectator'


var spectatorMap = {
    "S1": {
        index: 0,
        xPos: -200 + 0*60
    },
    "S2": {
        index: 1,
        xPos: -200 + 1*60
    },
    "S3": {
        index: 2,
        xPos: -200 + 2*60
    },
    "S4": {
        index: 3,
        xPos: -200 + 3*60
    },
    "S5": {
        index: 4,
        xPos: -200 + 4*60
    },
    "S6": {
        index: 5,
        xPos: -200 + 5*60
    },
    "S7": {
        index: 6,
        xPos: -200 + 6*60
    },
    "S8": {
        index: 7,
        xPos: -200 + 7*60
    },
}

export default class Audience extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene)
        this.scene = scene
        this.x = x
        this.y = y

        this.spectators = {}
        Object.entries(spectatorMap).forEach((entry) => {
            let spectator = new Spectator(this.scene, this, entry[1].xPos, 0)
            spectator.hide()
            this.spectators[entry[0]] = spectator
            this.add(spectator)
        })

        this.scene.add.existing(this)
    }

    showUserAsSpectator(spectatorData) {
        if(!(spectatorData.label in spectatorMap)) { return }
        this.spectators[spectatorData.label].show()
        this.spectators[spectatorData.label].setTint(0x585858)
      }
    
      showOnlineSpectator(spectatorData) {
        if(!(spectatorData.label in spectatorMap)) { return }
        this.spectators[spectatorData.label].show()
        this.spectators[spectatorData.label].setTint()
      }
    
      removeSpectator(spectatorData) {
        if(!(spectatorData.label in spectatorMap)) { return }
        this.spectators[spectatorData.label].hide()
      }
}