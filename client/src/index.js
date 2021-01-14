import Phaser from 'phaser'
import config from './config/config'

class AlpacaShootout extends Phaser.Game {
  constructor () {
    super(config);
    
    // Add to resize event
    window.addEventListener('resize', this.resizeApp);

    this.scene.start('Preloader');
  }

  resizeApp()
  {
    console.log("resizeApp")

    // Width-height-ratio of game resolution
    let game_ratio = 540 / 960
    
    // Make div full height of browser and keep the ratio of game resolution
    let div = document.getElementById('AlpacaShootout');
    div.style.width = (window.innerHeight * game_ratio) + 'px';
    div.style.height = window.innerHeight + 'px';
    
    // Check if device DPI messes up the width-height-ratio
    let canvas = document.getElementsByTagName('canvas')[0];
    
    let dpi_w = (parseInt(div.style.width) / canvas.width);
    let dpi_h = (parseInt(div.style.height) / canvas.height);		
    
    let height = window.innerHeight * (dpi_w / dpi_h);
    let width = height * 0.6;
    
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
  }
}

window.game = new AlpacaShootout(config)