import 'phaser';

export default class TextButton extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, onButtonClick) {
    super(scene)
    this.scene = scene
    this.onButtonClick = onButtonClick

    this.button = this.scene.add.sprite(0, 0, 'buttonLong_brown').setScale(1.6, 1.1).setInteractive()
    this.text = this.scene.add.text(0, 0, text, { fontFamily: 'RobotoSlab-Regular', fontSize: '32px', fill: '#fff' })
    Phaser.Display.Align.In.Center(this.text, this.button)

    this.add(this.button)
    this.add(this.text)

    this.button.on('pointerdown', function () {
      this.button.setTint(0xDCDCDC)
      this.button.setTexture('buttonLong_brown_pressed')
    }.bind(this));

    this.button.on('pointerup', function () {
      this.button.setTint()
      this.button.setTexture('buttonLong_brown')
      this.onButtonClick()
    }.bind(this));

    this.button.on('pointerover', function () {
      this.button.setTint(0xDCDCDC)
      this.button.setTexture('buttonLong_brown')
    }.bind(this));

    this.button.on('pointerout', function () {
      if(!this.button.input.enabled) {
        return
      }
      this.button.setTint()
      this.button.setTexture('buttonLong_brown')
    }.bind(this));

    this.x = x
    this.y = y

    this.scene.add.existing(this)
  }

  setPos(posX, posY) {
    this.x = posX
    this.y = posY
  }

  setBackgroundImageScale(scaleX, scaleY) {
    this.button.setScale(scaleX, scaleY)
  }

  setText(newText) {
    this.text.setText(newText)
    Phaser.Display.Align.In.Center(this.text, this.button)
  }

  setOnButtonClick(newOnButtonClick) {
    this.onButtonClick = newOnButtonClick
  }

  setDisabled() {
    this.button.setTint(0x808080)
    this.button.setTexture('buttonLong_brown_pressed')
    this.button.disableInteractive()
  }

  setEnabled() {
    this.button.setTint()
    this.button.setTexture('buttonLong_brown')
    this.button.setInteractive()
  }
}