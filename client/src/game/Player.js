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

        this.alpacaSprite = this.scene.add.image(0, 0, alpacas[this.alpaca].standby)
        this.alpacaSprite.setScale(0.5, 0.5)
        this.add(this.alpacaSprite)

        this.characterInfoBox = new CharacterInfoBox(this.scene, 0, -160)
        this.characterInfoBox.initUI(alpacas[this.alpaca].stats)
        this.add(this.characterInfoBox)

        this.textBox = new TextBox(this.scene, 0, 120, '')
        this.add(this.textBox)

        this.shootButton = new TextButton(this.scene, 0, 200, 'Shoot', function() {
            console.log('Shoot')
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Shoot'})
            //this.alpacaSprite.setTexture('suri_shoot')
            this.disableButtons()
        }.bind(this))
        this.shootButton.setBackgroundImageScale(0.9, 0.9)
        this.add(this.shootButton)

        this.reloadButton = new TextButton(this.scene, 0, 260, 'Reload', function() {
            console.log('Reload')
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Reload'})
            //this.alpacaSprite.setTexture('suri_reload')
            this.disableButtons()
        }.bind(this))
        this.reloadButton.setBackgroundImageScale(0.9, 0.9)
        this.add(this.reloadButton)

        this.shieldButton = new TextButton(this.scene, 0, 320, 'Shield', function() {
            console.log('Shield')
            this.setTextBoxReady()
            this.scene.game.socket.emit('action played', { roomId: this.scene.roomData.id, action: 'Shield'})
            //this.alpacaSprite.setTexture('suri_shield')
            this.disableButtons()
        }.bind(this))
        this.shieldButton.setBackgroundImageScale(0.9, 0.9)
        this.add(this.shieldButton)

        this.scene.add.existing(this)
    }

    setTextBoxReady() {
        this.textBox.setTextColorGreen()
        this.textBox.setText('Ready')
    }

    faceLeft() {
        this.alpacaSprite.setScale(0.5, 0.5)
    }

    faceRight() {
        this.alpacaSprite.setScale(-0.5, 0.5)
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
    }

    hideButtons() {
        this.shootButton.setVisible(false)
        this.reloadButton.setVisible(false)
        this.shieldButton.setVisible(false)
    }

    disableButtons() {
        this.shootButton.setDisabled()
        this.reloadButton.setDisabled()
        this.shieldButton.setDisabled()
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