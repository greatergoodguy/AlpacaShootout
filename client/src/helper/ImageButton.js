import 'phaser';

export default class ImageButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, textureKey, onButtonClick) {
    super(scene)
    this.scene = scene
    this.onButtonClick = onButtonClick

    this.button = this.scene.add.sprite(0, 0, textureKey).setInteractive()

    this.add(this.button)

    this.button.on('pointerdown', function () {
      this.button.setTint(0xDCDCDC)
    }.bind(this));

    this.button.on('pointerup', function () {
      this.button.setTint()
      this.onButtonClick()
    }.bind(this));

    this.button.on('pointerover', function () {
      this.button.setTint(0xF5F5F5)
    }.bind(this));

    this.button.on('pointerout', function () {
      this.button.setTint()
    }.bind(this));

    this.x = x
    this.y = y

    this.scene.add.existing(this)
  }
}