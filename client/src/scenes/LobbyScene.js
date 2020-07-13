import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'

export default class LobbyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Lobby' 
        })
    }

    preload() {
    }

    create() {
        this.gameDatas = {}
        this.lobbyButtons = {}
        this.spectatorButtons = {}

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Lobby', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 600, 'Back', function() {
            this.scene.start('Title')
        }.bind(this))

        this.game.socket.emit("enter lobby")
        this.game.socket.on("add slots", this.addSlots.bind(this))
    }

    update() {
    }

    addSlots(serverData) {
        console.log('LobbyScene.addSlots()')
        console.log(serverData)
        let serverDataAsList = Object.values(serverData)
        let socket = this.game.socket
        let self = this

        for(var i = 0; i < serverDataAsList.length; i++) {
            var gameData = serverDataAsList[i]

            this.gameDatas[gameData.id] = gameData
            this.lobbyButtons[gameData.id] = new TextButton(this, config.width/2, 300 + i*70, '1: Join Game (0/2)', function() {
                socket.removeAllListeners()
                self.scene.start('Room', self.gameDatas[this.data.id])
            })
            this.lobbyButtons[gameData.id].setData({ 'id': gameData.id })

            this.spectatorButtons[gameData.id] = new ImageButton(this, config.width/2 + 210, 300 + i*70, function() {
                socket.removeAllListeners()
                self.scene.start('Room', self.gameDatas[this.data.id])
            }.bind(this))
            this.spectatorButtons[gameData.id].setData({ 'id': gameData.id })
        }
    }
}