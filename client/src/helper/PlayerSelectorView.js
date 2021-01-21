import 'phaser'
import { alpacas }  from '../config/const'
import TextButton from './TextButton'
import ImageButton from './ImageButton'
import CharacterInfoView from './CharacterInfoView'

const READY_BUTTON_POS_Y = 685
const TEXT_BOX_POS_Y = 620
const CHARACTER_INFO_BOX_POS_Y = 190

export default class PlayerSelectorView extends Phaser.GameObjects.Container {
  constructor(scene, x, y, label) {
    super(scene)
    this.scene = scene
    this.label = label

    this.alpacaKeys = Object.keys(alpacas)

    this.clickSound = this.scene.sound.add('click')

    this.index = 0
    this.alpaca = this.scene.add.image(0, 450, 'jaka_standby')
    this.add(this.alpaca)
    this.alpaca.setScale(0.8)
    this.leftArrow = new ImageButton(this.scene, 0 - 120, READY_BUTTON_POS_Y, 'arrowBrown_left', function() {
      this.clickSound.play()
      this.index = (this.index - 1).mod(this.alpacaKeys.length)
      this.updateAlpaca()
    }.bind(this))
    this.add(this.leftArrow)
    this.leftArrow.setScale(2.2)
    this.rightArrow = new ImageButton(this.scene, 0 + 120, READY_BUTTON_POS_Y, 'arrowBrown_right', function() {
      this.clickSound.play()
      this.index = (this.index + 1).mod(this.alpacaKeys.length)
      this.updateAlpaca()
    }.bind(this))
    this.add(this.rightArrow)
    this.rightArrow.setScale(2.2)
    this.readySquare = this.scene.add.sprite(0, TEXT_BOX_POS_Y, 'whiteSquare').setScale(2, 0.5)
    this.add(this.readySquare)
    this.readySquare.setTint(0xc1bca0)
    this.readySquare.alpha = 0.5
    this.readyText = this.scene.add.text(0, TEXT_BOX_POS_Y, 'Not Ready', { fontSize: '24px', fill: '#000' })
    this.add(this.readyText)
    this.readyText.setFontFamily('RobotoSlab-Regular')
    this.readyText.setColor('#c90b0b')
    this.readyText.setOrigin(0.5, 0.5)
    this.isReady = false
    this.isOccupied = false

    this.nameText = this.scene.add.text(0, 310, 'Tom', { fontSize: '28px', fill: '#000' })
    this.add(this.nameText)
    this.nameText.setFontFamily('RobotoSlab-Regular')
    this.nameText.setColor('#252525')
    this.nameText.setOrigin(0.5, 0.5)

    this.readyButton = new TextButton(this.scene, 0, READY_BUTTON_POS_Y, 'Ready', function() {
    }.bind(this))
    this.add(this.readyButton)
    this.readyButton.setBackgroundImageScale(0.9, 1.2)

    this.characterInfoView = new CharacterInfoView(this.scene, 0, CHARACTER_INFO_BOX_POS_Y)
    this.add(this.characterInfoView)

    this.x = x
    this.y = y

    this.scene.add.existing(this)
  }

  updateAlpaca() {
    this.alpacaKey = this.alpacaKeys[this.index]
    this.alpaca.setTexture(alpacas[this.alpacaKey].standby)
    this.characterInfoView.updateUI(alpacas[this.alpacaKey].stats)
    this.scene.game.socket.emit('update player', { roomId: this.scene.gameData.roomId, playerId: this.scene.game.socket.id, alpacaKey: this.alpacaKey})
  }


  faceLeft() {
    this.alpaca.setScale(0.8, 0.8)
  }

  faceRight() {
    this.alpaca.setScale(-0.8, 0.8)
  }

  ready() {
    if(!this.isReady) {
        this.readyText.setText('Ready')
        this.readyText.setColor('#138808')
        this.leftArrow.setVisible(false)
        this.rightArrow.setVisible(false)
        this.scene.hideSpectateButton()
    } else {
        this.readyText.setText('Not Ready')
        this.readyText.setColor('#c90b0b')
        this.leftArrow.setVisible(true)
        this.rightArrow.setVisible(true)
        this.scene.showSpectateButton()
    }
    this.isReady = !this.isReady
    this.scene.game.socket.emit('update player', { roomId: this.scene.gameData.roomId, playerId: this.scene.game.socket.id, isReady: this.isReady})
  }

  showOnlinePlayer(playerData) {
    this.index = 0
    this.alpacaKey = playerData.alpacaKey
    this.alpaca.setTexture(alpacas[this.alpacaKey].standby)
    this.leftArrow.setVisible(false)
    this.rightArrow.setVisible(false)
    this.readySquare.setVisible(true)
    this.readyText.setVisible(true)
    this.isReady = playerData.isReady
    this.isOccupied = true
    if(!this.isReady) {
      this.readyText.setText('Not Ready')
      this.readyText.setColor('#c90b0b')
    } else {
      this.readyText.setText('Ready')
      this.readyText.setColor('#138808')
    }

    this.readyButton.setText('Ready')
    this.readyButton.setVisible(false)
    this.readyButton.setOnButtonClick(function() {
    }.bind(this))

    this.nameText.setVisible(true)
    this.nameText.setText(playerData.username)

    this.characterInfoView.setVisible(true)
    this.characterInfoView.updateUI(alpacas[this.alpacaKey].stats)
    this.setVisible(true)
  }

  showUserAsCurrentPlayer(playerData) {
    this.alpacaKey = playerData.alpacaKey
    this.index = this.alpacaKeys.indexOf(this.alpacaKey)
    this.alpaca.setTexture(alpacas[this.alpacaKey].standby)
    this.leftArrow.setVisible(true)
    this.rightArrow.setVisible(true)
    this.readySquare.setVisible(true)
    this.readyText.setVisible(true)
    this.isReady = playerData.isReady
    this.isOccupied = true
    this.readyText.setText('Not Ready')
    this.readyText.setColor('#c90b0b')

    this.readyButton.setText('Ready')
    this.readyButton.setVisible(true)
    this.readyButton.setPos(0, READY_BUTTON_POS_Y)
    this.readyButton.setOnButtonClick(function() {
      this.clickSound.play()
      this.ready()
    }.bind(this))

    this.nameText.setVisible(true)
    this.nameText.setText(playerData.username)

    this.characterInfoView.setVisible(true)
    this.characterInfoView.updateUI(alpacas[this.alpacaKey].stats)
    this.setVisible(true)
  }

  showEmpty() {
    this.setVisible(true)
    this.alpaca.setTexture('empty_slot')
    this.leftArrow.setVisible(false)
    this.rightArrow.setVisible(false)
    this.readySquare.setVisible(false)
    this.readyText.setVisible(false)
    this.isReady = false
    this.isOccupied = false
    this.readyText.setText('Not Ready')
    this.readyText.setColor('#c90b0b')
    this.readyButton.setVisible(false)
    this.nameText.visible = false
    this.characterInfoView.setVisible(false)
  }

  showEmptyAndJoinable() {
    this.showEmpty()
    this.readyButton.setVisible(true)
    this.readyButton.setPos(0, 500)
    this.readyButton.setText('Join')
    this.readyButton.setOnButtonClick(function() {
      this.clickSound.play()
      this.scene.game.socket.emit('join player slot', { roomId: this.scene.gameData.roomId, playerId: this.scene.game.socket.id, label: this.label, username: this.scene.game.config.username})
      this.scene.hideJoinAndSpectateButtons()
    }.bind(this))
  }

  hide() {
    this.setVisible(false)
  }

  hideReadyButton() {
    this.readyButton.setVisible(false)
  }

  hideJoinButton() {
    this.readyButton.setVisible(false)
  }

  showEmptyAndJoinableIfNotOccupied() {
    if(!this.isOccupied) {
      this.showEmptyAndJoinable()
    }
  }
}