import 'phaser'
import TextButton from './TextButton'
import ImageButton from './ImageButton'
import Spectator from '../game/Spectator'

const spectatorMap = {
  "S1": {
      index: 0,
      xPos: -240,
      yPos: -30 + 100,
  },
  "S2": {
      index: 2,
      xPos: -20,
      yPos: -50 + 100,
  },
  "S3": {
      index: 3,
      xPos: 100,
      yPos: -10 + 100,
  },
  "S4": {
      index: 1,
      xPos: -140,
      yPos: 30 + 100,
  },
  "S5": {
      index: 4,
      xPos: 250,
      yPos: 40 + 100,
  },
  "S6": {
      index: 5,
      xPos: -180,
      yPos: 80 + 100,
  },
  "S7": {
      index: 6,
      xPos: 20,
      yPos: 100 + 100,
  },
  "S8": {
      index: 7,
      xPos: 200,
      yPos: 90 + 100,
  },
}

export default class SpectatorSelectorView extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y

    this.spectators = {}
    Object.entries(spectatorMap).forEach((entry) => {
        let spectator = new Spectator(this.scene, entry[1].xPos, entry[1].yPos)
        spectator.hide()
        this.spectators[entry[0]] = spectator
        this.add(spectator)
    })

    Object.values(this.spectators).forEach((spectator) => {
      spectator.bringNameToTop()
    })

    this.scene.add.existing(this)
  }

  showUserAsSpectator(spectatorData) {
    if(!(spectatorData.label in spectatorMap)) { return }
    this.spectators[spectatorData.label].show(spectatorData)
    this.spectators[spectatorData.label].setTint(0x585858)
  }

  showOnlineSpectator(spectatorData) {
      if(!(spectatorData.label in spectatorMap)) { return }
      this.spectators[spectatorData.label].show(spectatorData)
      this.spectators[spectatorData.label].setTint()
  }

  removeSpectator(spectatorData) {
      if(!(spectatorData.label in spectatorMap)) { return }
      this.spectators[spectatorData.label].hide()
  }
}