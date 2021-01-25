import 'phaser'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'

export default class FinaleView extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene)
        this.scene = scene
        this.x = x
        this.y = y
    
        this.clickSound = this.scene.sound.add('click')

        this.background = this.scene.add.sprite(0, 0, 'whiteSquare').setScale(6.5, 3.6)
        this.background.setTint(0xc1bca0)
        this.background.setOrigin(0.5, 0)
        this.background.alpha = 0.9
        this.add(this.background)

        this.title = this.scene.add.bitmapText(0, 40, 'ashcanbb', 'You Lose', 110)
        this.title.setOrigin(0.5, 0)
        this.add(this.title)

        this.finishButton = new TextButton(this.scene, 0, 280, 'Finish', function() {
        }.bind(this))
        this.finishButton.setBackgroundImageScale(1, 1.2)
        this.finishButton.setScale(1.1)
        this.add(this.finishButton)

        this.scene.add.existing(this)
    }

    show(gameData, roomData) {
        this.setVisible(true)

        var numHeartsP1 = 0
        var numHeartsP2 = 0
        Object.entries(gameData.players).forEach((entry) => {
            console.log(entry)
            let playerId = entry[0]
            let playerData = entry[1]
            if(playerData.label === 'P1') {
                numHeartsP1 = playerData.currentStats.heart
            }
            if(playerData.label === 'P2') {
                numHeartsP2 = playerData.currentStats.heart
            }
        })

        var titleText = ''
        if(this.scene.userLabel === 'P1' && numHeartsP1 === 0) {
            titleText = 'You Lose'
        } else if(this.scene.userLabel === 'P1' && numHeartsP2 === 0) {
            titleText = 'You Win'
        } else if(this.scene.userLabel === 'P2' && numHeartsP1 === 0) {
            titleText = 'You Win'
        } else if(this.scene.userLabel === 'P2' && numHeartsP2 === 0) {
            titleText = 'You Lose'
        } else if(numHeartsP1 === 0) {
            titleText = 'P2 Wins'
        } else if(numHeartsP2 === 0) {
            titleText = 'P1 Wins'
        }


        this.title.setText(titleText)

        this.scene.game.socket.removeAllListeners()

        this.finishButton.setOnButtonClick(function() {
            this.clickSound.play()
            this.scene.scene.start('Room', {roomId: roomData.id, roomData: roomData})
        }.bind(this))
    }
}