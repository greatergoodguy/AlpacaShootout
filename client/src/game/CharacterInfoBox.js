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
  
    initUI(data) {
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

    updateUI(playerData) {
        let maxStats = playerData.maxStats
        let currentStats = playerData.currentStats

        this.maxHearts = maxStats.heart
        this.maxAmmo = maxStats.ammo
        this.maxShields = maxStats.shield

        this.currentHearts = currentStats.heart
        this.currentAmmo = currentStats.ammo
        this.currentShields = currentStats.shield

        var i
        for(i = 0; i < 5; i++) {
            this.hearts[i].setVisible(false)
            this.ammos[i].setVisible(false)
            this.shields[i].setVisible(false)
        }
    
        for(i = 0; i < this.maxHearts; i++) {
            if(i < this.currentHearts) {
                this.hearts[i].setTexture('heart')
            } else {
                this.hearts[i].setTexture('heartEmpty')
            }
            this.hearts[i].setVisible(true)
        }
    
        for(i = 0; i < this.maxAmmo; i++) {
            if(i < this.currentAmmo) {
                this.ammos[i].setTexture('ammo')
            } else {
                this.ammos[i].setTexture('ammoEmpty')
            }
            this.ammos[i].setVisible(true)
        }
    
        for(i = 0; i < this.maxShields; i++) {
            if(i < this.currentShields) {
                this.shields[i].setTexture('shield')
            } else {
                this.shields[i].setTexture('shieldEmpty')
            }
            this.shields[i].setVisible(true)
        }
    }
}