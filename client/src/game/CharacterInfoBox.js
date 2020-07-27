import 'phaser'
import TextButton from '../helper/TextButton'
import ImageButton from '../helper/ImageButton'


export default class CharacterInfoBox extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
      super(scene)
      this.scene = scene
      this.x = x
      this.y = y
  
      this.background = this.scene.add.sprite(0, 0, 'whiteSquare').setScale(2, 2)
      this.background.setTint(0xc1bca0)
      this.background.alpha = 0.5
      this.add(this.background)
  
      this.hearts = []
      this.ammos = []
      this.shields = []

      this.maxHearts = 5
      this.maxAmmo = 5
      this.maxShields = 5
      
      this.currentHearts = 5
      this.currentAmmo = 5
      this.currentShields = 5
  
      var i
      for(i = 0; i < 5; i++) {
          this.hearts[i] = this.scene.add.sprite(-80 + i*40, -70, 'heart').setScale(0.2, 0.2)
          this.add(this.hearts[i])
      }
  
      for(i = 0; i < 5; i++) {
          this.ammos[i] = this.scene.add.sprite(-80 + i*40, 0, 'ammo').setScale(1.4, 1.4)
          this.add(this.ammos[i])
      }
  
      for(i = 0; i < 5; i++) {
          this.shields[i] = this.scene.add.sprite(-80 + i*40, 70, 'shield').setScale(0.8, 0.8)
          this.add(this.shields[i])
      }
  
      this.scene.add.existing(this)
    }
  
    updateUI(data) {
        this.maxHearts = data.heart
        this.maxAmmo = data.ammo
        this.maxShields = data.shield

        this.currentHearts = this.maxHearts
        this.currentAmmo = this.maxAmmo
        this.currentShields = this.maxShields

        var i
        for(i = 0; i < 5; i++) {
            this.hearts[i].setVisible(false)
            this.ammos[i].setVisible(false)
            this.shields[i].setVisible(false)
        }
    
        for(i = 0; i < data.heart; i++) {
            this.hearts[i].setVisible(true)
        }
    
        for(i = 0; i < data.ammo; i++) {
            this.ammos[i].setVisible(true)
        }
    
        for(i = 0; i < data.shield; i++) {
            this.shields[i].setVisible(true)
        }
    }

    removeHeart() {
        this.currentHearts = this.currentHearts - 1
        if(this.currentHearts < 0) {
            this.currentHearts = 0
        }

        this.hearts[this.currentHearts].setTexture('heartEmpty')
    }

    gainHeart() {
        this.hearts[this.currentHearts].setTexture('heart')

        this.currentHearts = this.currentHearts + 1
        if(this.currentHearts > this.maxHearts) {
            this.currentHearts = this.maxHearts
        }
    }

    removeAmmo() {
        this.currentAmmo = this.currentAmmo - 1
        if(this.currentAmmo < 0) {
            this.currentAmmo = 0
        }

        this.ammos[this.currentAmmo].setTexture('ammoEmpty')
    }

    gainAmmo() {
        this.ammos[this.currentAmmo].setTexture('ammo')

        this.currentAmmo = this.currentAmmo + 1
        if(this.currentAmmo > this.maxAmmo) {
            this.currentAmmo = this.maxAmmo
        }
    }

    removeShield() {
        this.currentShields = this.currentShields - 1
        if(this.currentShields < 0) {
            this.currentShields = 0
        }

        this.shields[this.currentShields].setTexture('shieldEmpty')
    }

    gainShield() {
        this.shields[this.currentShields].setTexture('shield')

        this.currentShields = this.currentShields + 1
        if(this.currentShields > this.maxShields) {
            this.currentShields = this.maxShields
        }
    }
}