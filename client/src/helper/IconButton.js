import 'phaser';

export default class IconButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, onButtonClick) {
    super(scene)
    this.scene = scene
    this.onButtonClick = onButtonClick

    this.button = this.scene.add.sprite(0, 0, 'buttonLong_brown').setScale(0.5, 1.1).setInteractive()
    this.image = this.scene.add.image(0, 0, 'eye')
    Phaser.Display.Align.In.Center(this.image, this.button)

    this.add(this.button)
    this.add(this.image)

    this.button.on('pointerdown', function () {
      this.button.setTint(0xDCDCDC)
      this.button.setTexture('buttonLong_brown_pressed')
    }.bind(this))

    this.button.on('pointerup', function () {
      this.button.setTint()
      this.button.setTexture('buttonLong_brown')
      this.onButtonClick()
    }.bind(this))

    this.button.on('pointerover', function () {
      this.button.setTint(0xDCDCDC)
      this.button.setTexture('buttonLong_brown')
    }.bind(this))

    this.button.on('pointerout', function () {
      this.button.setTint()
      this.button.setTexture('buttonLong_brown')
    }.bind(this))

    this.x = x
    this.y = y

    this.scene.add.existing(this)
  }
}