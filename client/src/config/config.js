import PreloaderScene from "../scenes/PreloaderScene"
import TitleScene from "../scenes/TitleScene"

export default {
    type: Phaser.AUTO,
    parent: "AlpacaShootout",
    width: 800,
    height: 1280,
    scene: [
        PreloaderScene,
        TitleScene
    ]
}