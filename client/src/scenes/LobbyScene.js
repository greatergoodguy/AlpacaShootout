import { FADE_DURATION, TITLE_FONT_SIZE }  from '../config/const'
import config from '../config/config'
import TextButton from '../helper/TextButton'
import IconButton from '../helper/IconButton'
import { getParameterByName } from '../toolbox/Toolbox'

var firstTimeInScene = true

export default class LobbyScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'Lobby' 
        })
    }

    preload() {
    }

    create() {
        var clickSound = this.sound.add('click')

        this.gameDatas = {}
        this.lobbyButtons = {}
        this.spectatorButtons = {}

        this.background = this.add.image(0, 0, 'whitePixel').setScale(config.width, config.height)
        this.background.setOrigin(0, 0)
        this.background.setTint(0xF1FAEE)

        this.titleBitmapText = this.add.bitmapText(config.width/2, 30, 'khodijah', 'Lobby', TITLE_FONT_SIZE)
        this.titleBitmapText.setOrigin(0.5, 0)

        this.backButton = new TextButton(this, config.width/2, 600, 'Back', function() {
            clickSound.play()
            this.scene.start('Title')
        }.bind(this))

        this.game.socket.emit("enter lobby")
        this.game.socket.on("add slots", this.addSlots.bind(this))
        this.game.socket.on("update slot", this.updateRoom.bind(this));
        this.game.socket.on('disconnect', this.leaveLobby.bind(this))

        this.setupUsernameInputField()
    }

    setupUsernameInputField() {
        const game = this.game

        this.add.text(50, 0, 'Username', { fontSize: 32, color: '#00ff00', backgroundColor: '#00000099' })
        const helloWorldText = this.add.text(50, 50, this.game.config.username, { fontSize: 32, color: '#00ff00', backgroundColor: '#00000099' })
        helloWorldText.setInteractive().on('pointerdown', () => {
            var config = {
                onTextChanged: function(textObject, text) {
                    game.config.username = text
                    textObject.text = text
                }
    
            };
            this.rexUI.edit(helloWorldText, config)
        })
    }

    update() {}

    addSlots(serverData) {
        console.log('LobbyScene.addSlots()')
        console.log(serverData)

        var clickSound = this.sound.add('click')

        let serverDataAsList = Object.values(serverData)
        let socket = this.game.socket
        let self = this

        for(var i = 0; i < serverDataAsList.length; i++) {
            var gameData = serverDataAsList[i]

            this.gameDatas[gameData.id] = gameData
            this.lobbyButtons[gameData.id] = new TextButton(this, config.width/2, 300 + i*70, '1: Join Game (0/2)', function() {
                clickSound.play()
                socket.removeAllListeners()
                self.scene.start('Room', {roomId: this.getData('id'), userType: 'player'})
            })
            this.lobbyButtons[gameData.id].setData('id', gameData.id)
            this.setLobbyButton(this.lobbyButtons[gameData.id], gameData)


            this.spectatorButtons[gameData.id] = new IconButton(this, config.width/2 + 210, 300 + i*70, function() {
                clickSound.play()
                socket.removeAllListeners()
                self.scene.start('Room', {roomId: this.getData('id'), userType: 'spectator'})
            })
            this.spectatorButtons[gameData.id].setData('id', gameData.id)
        }

        if(firstTimeInScene) {
            firstTimeInScene = false
            this.navigateBasedOnQueryParams()
        }

    }

    setLobbyButton(lobbyButton, gameData) {
        console.log('LobbyScene.setLobbyButton()')
        console.log(gameData)

        var roomNumber = gameData.roomNumber
        var numberOfPlayers = Object.keys(gameData.players).length

        if(numberOfPlayers >= 2) {
            lobbyButton.setText('Full\t\t(' + numberOfPlayers + '/2)')   
            lobbyButton.setDisabled()
        } else {
            lobbyButton.setText('Room ' + roomNumber + '\t\t(' + numberOfPlayers + '/2)')   
            lobbyButton.setEnabled()
        }
    }

    updateRoom(roomData) {
        console.log('LobbyScene.updateRoom()')
        console.log(roomData)
        this.setLobbyButton(this.lobbyButtons[roomData.roomId], roomData.room)
    }

    leaveLobby() {
        let socket = this.game.socket
        socket.removeAllListeners()
        this.scene.start('Title')
    }

    navigateBasedOnQueryParams() {
        let titleParam = getParameterByName('lobby')
        console.log(titleParam)
        if(titleParam === 'room1') {
            this.game.socket.removeAllListeners()
            let roomId = Object.keys(this.lobbyButtons)[0]
            this.scene.start('Room', {roomId: roomId, userType: 'player'})
        }
    }
}