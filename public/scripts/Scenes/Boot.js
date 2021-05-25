export default class Boot extends Phaser.Scene {
    constructor(key) {
        super(key);
    }

    preload() {
        this.load.image('zenva_logo', 'assets/ui/zenva_logo.png');
    }
      
    create() {
        this.scene.start('Preloader');
        console.log('this is the boot scene');
    }
}