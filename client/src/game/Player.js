import { alpacas }  from '../config/const'

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

        this.scene.add.existing(this)
    }

    faceLeft() {
        this.alpacaSprite.setScale(0.5, 0.5)
    }

    faceRight() {
        this.alpacaSprite.setScale(-0.5, 0.5)
    }
}