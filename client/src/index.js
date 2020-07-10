import Phaser from 'phaser'
import config from './config/config'

class AlpacaShootout extends Phaser.Game {
  constructor () {
    super(config);
    //this.scene.start('Preloader');
  }
}

window.game = new AlpacaShootout(config)