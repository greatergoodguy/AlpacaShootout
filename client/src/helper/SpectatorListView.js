import 'phaser'
import config from '../config/config'
import TextBox from './TextBox'
import TextButton from './TextButton'

export default class SpectatorListView extends Phaser.GameObjects.Container {
  constructor(scene) {
    super(scene)
    this.scene = scene

    this.background = this.scene.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
    this.background.setOrigin(0, 0)
    this.background.setTint(0x505050)
    this.background.alpha = 0.8
    this.background.setInteractive()

    this.add(this.background)

    var i;
    for (i = 1; i <= 8; i++) {
        let textBox = new TextBox(this.scene, config.width/2, 200 + 60*i, 'Spectator ' + i)
        this.add(textBox)
    }

    this.closeButton = new TextButton(this.scene, config.width/2, 900, 'Close', function() {
        this.setVisible(false)
    }.bind(this))
    this.add(this.closeButton)
    this.closeButton.bringToTop()

    this.scene.add.existing(this)
  }
}