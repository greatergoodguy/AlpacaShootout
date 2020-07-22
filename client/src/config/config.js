import PreloaderScene from '../scenes/PreloaderScene'
import TitleScene from '../scenes/TitleScene'
import CreditsScene from '../scenes/CreditsScene'
import LobbyScene from '../scenes/LobbyScene'
import RoomScene from '../scenes/RoomScene'
import GameScene from '../scenes/GameScene'

export default {
    type: Phaser.AUTO,
    parent: "AlpacaShootout",
    width: 540,
    height: 960,
    scene: [
        PreloaderScene,
        TitleScene,
        CreditsScene,
        LobbyScene,
        RoomScene,
        GameScene
    ]
}