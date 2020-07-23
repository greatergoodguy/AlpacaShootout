export default class Spectator extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene)
        this.scene = scene
        this.x = x
        this.y = y

        this.image = this.scene.add.image(0, 0, 'spectator')
        this.image.setScale(0.4)
        this.add(image)


        this.scene.add.existing(this)
    }

    show() {
        this.image.setVisible(true)
    }

    hide() {
        this.image.setVisible(false)
    }
}