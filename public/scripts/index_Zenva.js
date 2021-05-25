import config from './config.js';
import BootScene from './Scenes/Boot.js';
import Preloader from './Scenes/Preloader.js';
import Title from './Scenes/Title.js';
import GameScene_Zenva from './Scenes/Game_Zenva.js';
import UIScene_Zenva from './Scenes/UI_Zenva.js';

class Game extends Phaser.Game {
  constructor() {
      super(config);
      this.scene.add('Boot', BootScene);
      this.scene.add('Preloader', Preloader);
      this.scene.add('Title', Title);
      this.scene.add('Game', GameScene_Zenva);
      this.scene.add('UI', UIScene_Zenva);
      this.scene.start('Boot');
  }
}

window.game = new Game();
window.addEventListener('resize', (event) => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});