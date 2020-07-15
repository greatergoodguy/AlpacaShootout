import 'phaser'
import TextButton from './TextButton'
import ImageButton from './ImageButton'

export default class PlayerSelectorView extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene)
    this.scene = scene

    this.alpacaTextures = ['jaka_standby', 'punka_standby', 'pompaca_standby']

    this.index = 0
    this.alpaca = this.scene.add.image(0, 400, 'jaka_standby')
    this.add(this.alpaca)
    this.alpaca.setScale(0.5)
    this.leftArrow = new ImageButton(this.scene, 0 - 80, 600, 'arrowBrown_left', function() {
        this.index = (this.index - 1).mod(this.alpacaTextures.length)
        this.alpaca.setTexture(this.alpacaTextures[this.index])
    }.bind(this))
    this.add(this.leftArrow)
    this.leftArrow.setScale(1.5)
    this.rightArrow = new ImageButton(this.scene, 0 + 80, 600, 'arrowBrown_right', function() {
        this.index = (this.index + 1).mod(this.alpacaTextures.length)
        this.alpaca.setTexture(this.alpacaTextures[this.index])
    }.bind(this))
    this.add(this.rightArrow)
    this.rightArrow.setScale(1.5)
    this.readySquare = this.scene.add.sprite(0, 550, 'whiteSquare').setScale(2, 0.5)
    this.add(this.readySquare)
    this.readySquare.setTint(0xc1bca0)
    this.readySquare.alpha = 0.5
    this.readyText = this.scene.add.text(0, 550, 'Not Ready', { fontSize: '24px', fill: '#000' })
    this.add(this.readyText)
    this.readyText.setFontFamily('RobotoSlab-Regular')
    this.readyText.setColor('#c90b0b')
    this.readyText.setOrigin(0.5, 0.5)
    this.isReady = false

    this.readyButton = new TextButton(this.scene, 0, 600, 'Ready', function() {
        this.ready()
    }.bind(this))
    this.add(this.readyButton)
    this.readyButton.setBackgroundImageScale(0.65, 1)
    this.readyButton.setScale(0.8)

    this.x = x
    this.y = y

    this.scene.add.existing(this)
  }

  ready() {
    if(!this.isReady) {
        this.readyText.setText('Ready')
        this.readyText.setColor('#138808')
        this.leftArrow.visible = false
        this.rightArrow.visible = false
    } else {
        this.readyText.setText('Not Ready')
        this.readyText.setColor('#c90b0b')
        this.leftArrow.visible = true
        this.rightArrow.visible = true
    }
    this.isReady = !this.isReady
  }

  clear() {
    this.index = 0
    this.alpaca.setTexture('empty_slot')
    this.leftArrow.visible = false
    this.rightArrow.visible = false
    this.readySquare.visible = false
    this.readyText.visible = false
    this.isReady = false
    this.readyText.setText('Not Ready')
    this.readyText.setColor('#c90b0b')

    this.readyButton.setText('Join')
    this.readyButton.setOnButtonClick(function() {
        this.fill()
    }.bind(this))
  }

  fill() {
    this.index = 0
    this.alpaca.setTexture('jaka_standby')
    this.leftArrow.visible = true
    this.rightArrow.visible = true
    this.readySquare.visible = true
    this.readyText.visible = true
    this.isReady = false
    this.readyText.setText('Not Ready')
    this.readyText.setColor('#c90b0b')

    this.readyButton.setText('Ready')
    this.readyButton.setOnButtonClick(function() {
        this.ready()
    }.bind(this))
}
}