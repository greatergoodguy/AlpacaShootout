import 'phaser';

export default class TextBox extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y

    this.backgroundSquare = this.scene.add.sprite(0, 0, 'whiteSquare').setScale(2.5, 0.5)
    this.add(this.backgroundSquare)
    this.backgroundSquare.setTint(0xc1bca0)
    this.backgroundSquare.alpha = 0.8
    this.text = this.scene.add.text(0, 0, text, { fontSize: '24px', fill: '#000' })
    this.add(this.text)
    this.text.setFontFamily('RobotoSlab-Regular')
    this.text.setColor('#c90b0b')
    this.text.setOrigin(0.5, 0.5)

    this.scene.add.existing(this)
  }

  setTextColorGreen() {
    this.text.setColor('#138808')
  }

  setTextColorRed() {
    this.text.setColor('#c90b0b')
  }

  setTextColorBlue() {
    this.text.setColor('#1034a6')
  }

  setText(text) {
    this.text.setText(text) 
  }
  
}