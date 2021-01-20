export default class Spectator extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene)
        this.scene = scene
        this.x = x
        this.y = y

        this.image = this.scene.add.image(0, 0, 'spectator')
        this.image.setScale(0.4)
        this.add(this.image)

        this.nameText = this.scene.add.text(0, -80, 'Tom', { fontSize: '28px', fill: '#000' })
        this.add(this.nameText)
        this.nameText.setFontFamily('RobotoSlab-Regular')
        this.nameText.setColor('#252525')
        this.nameText.setOrigin(0.5, 0.5)

        this.scene.add.existing(this)
    }

    show(spectatorData) {
        this.image.setVisible(true)
        this.nameText.setVisible(true)
        this.nameText.setText(spectatorData.username)
    }

    hide() {
        this.image.setVisible(false)
        this.nameText.setVisible(false)
    }

    setTint(tint) {
        this.image.setTint(tint)
    }

    bringNameToTop() {
        this.nameText.setDepth(100)
    }
}