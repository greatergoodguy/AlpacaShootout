import 'phaser';

export default class TextBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y

    this.readySquare = this.scene.add.sprite(0, 0, 'whiteSquare').setScale(3.5, 0.5)
    this.add(this.readySquare)
    this.readySquare.setTint(0xc1bca0)
    this.readySquare.alpha = 0.8
    this.readyText = this.scene.add.text(0, 0, text, { fontSize: '24px', fill: '#000' })
    this.add(this.readyText)
    this.readyText.setFontFamily('RobotoSlab-Regular')
    this.readyText.setColor('#c90b0b')
    this.readyText.setOrigin(0.5, 0.5)

    this.scene.add.existing(this)
  }
}