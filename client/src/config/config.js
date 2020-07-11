import PreloaderScene from '../scenes/PreloaderScene'
import TitleScene from '../scenes/TitleScene'
import CreditsScene from '../scenes/CreditsScene'


export default {
    type: Phaser.AUTO,
    parent: "AlpacaShootout",
    width: 540,
    height: 960,
    scene: [
        PreloaderScene,
        TitleScene,
        CreditsScene
    ]
}