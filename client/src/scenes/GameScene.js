import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import Player from '../game/Player'
import Spectator from '../game/Spectator'
import Audience from '../game/Audience'

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game' 
        })
    }

    init(roomData) {
        this.roomData = roomData
        console.log("init(roomData)")
        console.log(this.roomData)
	}

    preload() {}

    create() {
        if(Object.entries(this.roomData.players).length < this.roomData.playerSlots.length) {
            this.leaveGame()
            return
        }

        this.gunDodgeSound = this.sound.add('gun_dodge')
        this.gunExplodeSound = this.sound.add('gun_explode')
        this.gunReloadSound = this.sound.add('gun_reload')
        this.gunShotSound = this.sound.add('gun_shot')

        this.game.socket.emit('enter game', {roomId: this.roomData.id})

        this.background = this.add.image(config.width/2, config.height/2, 'BG_stage')

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'ashcanbb', 'Game', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.players = {}

        let player1Data = Object.values(this.roomData.players).find(player => player.label == 'P1')
        this.players['P1'] = new Player(this, config.width/4 - 50, 0, player1Data.alpacaKey)
        this.players['P1'].faceRight()
        this.players['P1'].hideCharacter()
        this.players['P1'].hideButtons()

        let player2Data = Object.values(this.roomData.players).find(player => player.label == 'P2')
        this.players['P2'] = new Player(this, 3*config.width/4 + 50, 0, player2Data.alpacaKey)
        this.players['P2'].hideCharacter()
        this.players['P2'].hideButtons()

        this.spectator = new Spectator(this, config.width/2, 700)
        this.spectator.hide()

        this.audience = new Audience(this, config.width/2, config.height/2 + 350)

        this.smallExplosion = this.add.image(config.width/2, 472, 'small_explosion')
        this.smallExplosion.setScale(0.3)
        this.smallExplosion.setVisible(false)
        this.bulletOnP1Side = this.add.image(config.width/2 - 265, 470, 'bullet')
        this.bulletOnP1Side.setScale(0.65)
        this.bulletOnP1Side.setVisible(false)
        this.bulletOnP2Side = this.add.image(config.width/2 + 265, 470, 'bullet')
        this.bulletOnP2Side.setScale(-0.65)
        this.bulletOnP2Side.setVisible(false)

        this.game.socket.on("show game", this.populateGame.bind(this))
        this.game.socket.on("player left", this.leaveGame.bind(this))
        this.game.socket.on("update player in game", this.updatePlayerInGame.bind(this))

        this.game.socket.on("spectator joined", this.spectatorJoined.bind(this))
        this.game.socket.on("spectator left", this.spectatorLeft.bind(this))
        this.game.socket.on('disconnect', this.leaveGame.bind(this))
        this.game.socket.on('finish', this.finishGame.bind(this))

        this.game.socket.on('show actions', this.showActions.bind(this))
        this.game.socket.on('new round', this.newRound.bind(this))
    }

    update() {}

    updatePlayerInGame(playerData) {
        console.log('Game.updatePlayerInGame()')
        console.log(playerData)
        let playerlabel = playerData.label
        let player = this.players[playerlabel]

        player.updateTextBoxForUpdatePlayerInGame(playerData)
    }

    populateGame(roomData, gameData) {
        console.log('GameScene.populateGame()')
        console.log(roomData)
        console.log(gameData)
        let userId = this.game.socket.id
        
        if(Object.entries(roomData.players).length < roomData.playerSlots.length) {
            this.leaveGame()
            return
        }

        Object.entries(roomData.players).forEach((entry) => {
            let playerlabel = entry[1].label
            let player = this.players[playerlabel]
            if(userId == entry[0]) {
                player.showButtons()
            }

            player.showCharacter()
        })

        Object.entries(roomData.spectators).forEach((entry) => {
            if(userId == entry[0]) {
                this.audience.showUserAsSpectator(entry[1])
            }
            else {
                this.audience.showOnlineSpectator(entry[1])
            }
        })

        Object.entries(gameData.players).forEach((entry) => {
            let playerlabel = entry[1].label
            let player = this.players[playerlabel]
            player.update(entry[1])
        })

        this.showAdditionalAssets(gameData)
    }

    spectatorJoined(data) {
        console.log('GameScene.spectatorJoined()')
        console.log(data)

        let userId = this.game.socket.id
        if(userId == data.id) {
            this.audience.showUserAsSpectator(data)
        } 
        else {
            this.audience.showOnlineSpectator(data)
        }
    }

    spectatorLeft(data) {
        console.log('GameScene.spectatorLeft()')
        console.log(data)
        this.audience.removeSpectator(data)
    }

    leaveGame() {
        console.log('GameScene.leaveGame()')
        this.game.socket.emit("leave room")
        this.game.socket.removeAllListeners()
        this.scene.start('Title')
    }

    finishGame(gameData, roomData) {
        console.log('GameScene.finishGame()')
        console.log('roomData:')
        console.log(roomData)
        this.game.socket.removeAllListeners()
        this.scene.start('Room', {roomId: roomData.id, roomData: roomData})
    }

    showActions(gameData) {
        console.log('GameScene.showActions()')
        console.log(gameData)

        Object.entries(gameData.players).forEach((entry) => {
            console.log(entry[1])
            let playerlabel = entry[1].label
            let player = this.players[playerlabel]

            player.update(entry[1])
        })

        let soundEffect = gameData.soundEffect
        if(soundEffect === 'gun_shot') {
            this.gunShotSound.play()
        } else if(soundEffect === 'gun_reload') {
            this.gunReloadSound.play()
        } else if(soundEffect === 'gun_explode') {
            this.gunExplodeSound.play()
        } else if(soundEffect === 'gun_dodge') {
            this.gunDodgeSound.play()
        }

        this.showAdditionalAssets(gameData)
    }

    showAdditionalAssets(gameData) {
        gameData.additionalAssets.forEach((entry) =>  {
            if(entry === 'smallExplosion') {
                this.smallExplosion.setVisible(true)
            } else if(entry === 'bulletOnP1Side') {
                this.bulletOnP1Side.setVisible(true)
            } else if(entry === 'bulletOnP2Side') {
                this.bulletOnP2Side.setVisible(true)
            }   
        })
    }

    newRound(gameData) {
        console.log('GameScene.newRound()')   
        console.log(gameData)

        let userId = this.game.socket.id
        Object.entries(gameData.players).forEach((entry) => {
            console.log(entry[1])
            let playerlabel = entry[1].label
            let player = this.players[playerlabel]

            player.update(entry[1])
            if(userId == entry[0]) {
                player.enableButtons()
            }
        })

        this.smallExplosion.setVisible(false)
        this.bulletOnP1Side.setVisible(false)
        this.bulletOnP2Side.setVisible(false)
    }
}