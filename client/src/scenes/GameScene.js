import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import Player from '../game/Player'
import Spectator from '../game/Spectator'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game' 
        })
    }

    init(roomData) {
        this.roomData = roomData
        console.log(this.roomData)
	}

    preload() {}

    create() {
        this.game.socket.emit('enter game', {roomId: this.roomData.id})

        this.background = this.add.image(config.width/2, config.height/2, 'BG_pillars').setScale(0.5, 0.5)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Game', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.players = {}

        let player1Data = Object.values(this.roomData.players).find(player => player.label == 'P1')
        this.players['P1'] = new Player(this, config.width/4, 300, player1Data.alpacaKey)
        this.players['P1'].faceRight()
        this.players['P1'].hideCharacter()
        this.players['P1'].hideButtons()

        let player2Data = Object.values(this.roomData.players).find(player => player.label == 'P2')
        this.players['P2'] = new Player(this, 3*config.width/4, 300, player2Data.alpacaKey)
        this.players['P2'].hideCharacter()
        this.players['P2'].hideButtons()

        this.spectator = new Spectator(this, config.width/2, 700)
        this.spectator.hide()

        this.game.socket.on("show game", this.populateGame.bind(this))
        this.game.socket.on("player left", this.leaveGame.bind(this))
        this.game.socket.on('disconnect', this.leaveGame.bind(this))
    }

    update() {}

    populateGame(data) {
        console.log('GameScene.populateGame()')
        console.log(data)
        let userId = this.game.socket.id
        
        if(Object.entries(data.players).length < data.playerSlots.length) {
            this.leaveGame()
            return
        }

        Object.entries(data.players).forEach((entry) => {
            console.log(entry[1])
            let playerlabel = entry[1].label
            let player = this.players[playerlabel]
            if(userId == entry[0]) {
                player.showCharacter()
                player.showButtons()
            }
            else {
                player.showCharacter()
            }
        })
    }

    leaveGame() {
        console.log('GameScene.leaveGame()')
        this.game.socket.emit("leave room")
        this.game.socket.removeAllListeners()
        this.scene.start('Title')
    }
}