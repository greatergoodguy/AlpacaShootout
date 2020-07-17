import 'phaser'
import TextButton from './TextButton'
import ImageButton from './ImageButton'

export default class PlayerSelectorView extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y

    this.spectatorLabelIndices = {
        "S1": 0,
        "S2": 1,
        "S3": 2,
        "S4": 3,
        "S5": 4,
        "S6": 5,
        "S7": 6,
        "S8": 7
    }

    this.spectatorImages = []
    var i
    for(i=0; i<8; i++) {
        let image = this.scene.add.image(-200 + i*60, 0, 'spectator')
        image.setScale(0.4)
        this.add(image)
        this.spectatorImages.push(image)
        image.visible = false
    }    

    this.scene.add.existing(this)
  }

  showUserAsSpectator(spectatorData) {
    if(!(spectatorData.label in this.spectatorLabelIndices)) { return }
    this.spectatorImages[this.spectatorLabelIndices[spectatorData.label]].visible = true
    this.spectatorImages[this.spectatorLabelIndices[spectatorData.label]].setTint(0x585858)
  }

  showOnlineSpectator(spectatorData) {
    if(!(spectatorData.label in this.spectatorLabelIndices)) { return }
    this.spectatorImages[this.spectatorLabelIndices[spectatorData.label]].visible = true
    this.spectatorImages[this.spectatorLabelIndices[spectatorData.label]].setTint()
  }

  removeOnlineSpectator(spectatorData) {
    if(!(spectatorData.label in this.spectatorLabelIndices)) { return }
    this.spectatorImages[this.spectatorLabelIndices[spectatorData.label]].visible = false
  }
}