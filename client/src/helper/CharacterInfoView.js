import 'phaser'
import TextButton from './TextButton'
import ImageButton from './ImageButton'

export default class CharacterInfoView extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene)
    this.scene = scene
    this.x = x
    this.y = y

    this.background = this.scene.add.sprite(0, 0, 'whiteSquare').setScale(2.4, 2)
    this.background.setTint(0xc1bca0)
    this.background.alpha = 0.5
    this.add(this.background)

    this.hearts = []
    this.ammos = []
    this.shields = []

    var i
    for(i = 0; i < 5; i++) {
        this.hearts[i] = this.scene.add.sprite(-90 + i*45, -70, 'heart').setScale(0.17, 0.17)
        this.add(this.hearts[i])
    }

    for(i = 0; i < 5; i++) {
        this.ammos[i] = this.scene.add.sprite(-90 + i*45, 0, 'ammo').setScale(0.17, 0.17)
        this.add(this.ammos[i])
    }

    for(i = 0; i < 5; i++) {
        this.shields[i] = this.scene.add.sprite(-90 + i*45, 70, 'shield').setScale(0.17, 0.17)
        this.add(this.shields[i])
    }

    this.scene.add.existing(this)
  }

  updateUI(data) {
    var i
    for(i = 0; i < 5; i++) {
        this.hearts[i].setVisible(false)
        this.ammos[i].setVisible(false)
        this.shields[i].setVisible(false)
    }

    for(i = 0; i < data.heart; i++) {
        this.hearts[i].setVisible(true)
        this.hearts[i].setTexture('heart')
    }
    for(i = data.heart; i < data.heartMax; i++) {
        this.hearts[i].setVisible(true)
        this.hearts[i].setTexture('heartEmpty')
    }

    for(i = 0; i < data.ammo; i++) {
        this.ammos[i].setVisible(true)
        this.ammos[i].setTexture('ammo')
    }
    for(i = data.ammo; i < data.ammoMax; i++) {
        this.ammos[i].setVisible(true)
        this.ammos[i].setTexture('ammoEmpty')
    }

    for(i = 0; i < data.shield; i++) {
        this.shields[i].setVisible(true)
        this.shields[i].setTexture('shield')
    }
    for(i = data.shield; i < data.shieldMax; i++) {
        this.shields[i].setVisible(true)
        this.shields[i].setTexture('shieldEmpty')
    }
  }
}