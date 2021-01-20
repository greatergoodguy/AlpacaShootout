import { alpacas }  from '../config/const'
import TextButton from '../helper/TextButton'
import TextBox from '../helper/TextBox'
import CharacterInfoBox from './CharacterInfoBox'

export default class Player extends Phaser.GameObjects.Container {
    constructor(scene, x, y, alpaca) {
        super(scene)
        this.scene = scene
        this.x = x
        this.y = y
        this.alpaca = alpaca

        console.log(alpacas)
        console.log(alpacas[this.alpaca])

        this.clickSound = this.scene.sound.add('click')

        this.alpacaSprite = this.scene.add.image(0, 450, alpacas[this.alpaca].standby)
        this.alpacaSprite.setScale(0.8)
        this.add(this.alpacaSprite)

        this.characterInfoBox = new CharacterInfoBox(this.scene, 0, -160)
        this.characterInfoBox.initUI(alpacas[this.alpaca].stats)
        this.add(this.characterInfoBox)

        this.textBox = new TextBox(this.scene, 0, 120, '')
        this.add(this.textBox)

        this.shootButton = new TextButton(this.scene, 0, 200, 'Shoot', function() {
            console.log('Shoot')
            this.clickSound.play()
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Shoot'})
            this.disableButtons()
        }.bind(this))
        this.shootButton.setBackgroundImageScale(1.2, 0.9)
        this.add(this.shootButton)

        this.reloadButton = new TextButton(this.scene, 0, 260, 'Reload', function() {
            console.log('Reload')
            this.clickSound.play()
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Reload'})
            this.disableButtons()
        }.bind(this))
        this.reloadButton.setBackgroundImageScale(1.2, 0.9)
        this.add(this.reloadButton)

        this.shieldButton = new TextButton(this.scene, 0, 320, 'Dodge', function() {
            console.log('Shield')
            this.clickSound.play()
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Shield'})
            this.disableButtons()
        }.bind(this))
        this.shieldButton.setBackgroundImageScale(1.2, 0.9)
        this.add(this.shieldButton)

        this.refreshShieldButton = new TextButton(this.scene, 0, 380, 'Rest', function() {
            console.log('Shield')
            this.clickSound.play()
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Rest'})
            this.disableButtons()
        }.bind(this))
        this.refreshShieldButton.setBackgroundImageScale(1.2, 0.9)
        this.add(this.refreshShieldButton)

        this.enableButtons()
        this.scene.add.existing(this)
    }

    setTextBoxReady() {
        this.textBox.setTextColorGreen()
        this.textBox.setText('Ready')
    }

    faceLeft() {
        this.alpacaSprite.setScale(0.8, 0.8)
    }

    faceRight() {
        this.alpacaSprite.setScale(-0.8, 0.8)
    }

    showCharacter() {
        this.alpacaSprite.setVisible(true)
    }

    hideCharacter() {
        this.alpacaSprite.setVisible(false)
    }

    showButtons() {
        this.shootButton.setVisible(true)
        this.reloadButton.setVisible(true)
        this.shieldButton.setVisible(true)
        this.refreshShieldButton.setVisible(true)
    }

    hideButtons() {
        this.shootButton.setVisible(false)
        this.reloadButton.setVisible(false)
        this.shieldButton.setVisible(false)
        this.refreshShieldButton.setVisible(false)
    }

    disableButtons() {
        this.shootButton.setDisabled()
        this.reloadButton.setDisabled()
        this.shieldButton.setDisabled()
        this.refreshShieldButton.setDisabled()
    }

    enableButtons() {
        if(this.characterInfoBox.currentAmmo == 0) {
            this.shootButton.setDisabled()
        } else {
            this.shootButton.setEnabled()
        }

        this.reloadButton.setEnabled()

        if(this.characterInfoBox.currentShields == 0) {
            this.shieldButton.setDisabled()
        } else {
            this.shieldButton.setEnabled()
        }

        if(this.characterInfoBox.currentShields != this.characterInfoBox.maxShields) {
            this.refreshShieldButton.setEnabled()
        } else {
            this.refreshShieldButton.setDisabled()
        }
    }

    updateTextBox(playerData) {
        console.log('Player.updateTextBox()')
        if(playerData.statusTextColor === 'green') {
            this.textBox.setTextColorGreen()
        } else if(playerData.statusTextColor === 'red') {
            this.textBox.setTextColorRed()
        } else if(playerData.statusTextColor === 'blue') {
            this.textBox.setTextColorBlue()
        }

        this.textBox.setText(playerData.statusText)
    }

    updateTextBoxForUpdatePlayerInGame(playerData) {
        console.log('Player.updateTextBoxForUpdatePlayerInGame()')
        if(playerData.statusTextColor === 'green') {
            this.textBox.setTextColorGreen()
            this.textBox.setText("Ready")
        } else if(playerData.statusTextColor === 'red') {
            this.textBox.setTextColorRed()
            this.textBox.setText(playerData.statusText)
        } else if(playerData.statusTextColor === 'blue') {
            this.textBox.setTextColorGreen()
            this.textBox.setText("Ready")
        }
    }

    updateTexture(playerData) {
        console.log('Player.updateTexture()')
        let texture = playerData.texture
        console.log(texture)

        if(texture === "shoot") {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].shoot)
        } else if(texture === "reload") {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].reload)
        } else if(texture === "shield") {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].shield)
        } else if(texture === "hurt") {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].hurt)
        } else if(texture === "rest") {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].rest)
        } else {
            this.alpacaSprite.setTexture(alpacas[this.alpaca].standby)
        }
    }

    updateCharacterInfoBox(playerData) {
        console.log('Player.updateCharacterInfoBox()')
        this.characterInfoBox.updateUI(playerData)
    }

    update(playerData) {
        this.updateTextBox(playerData)
        this.updateTexture(playerData)
        this.updateCharacterInfoBox(playerData)
    }

}