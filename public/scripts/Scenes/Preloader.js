export default class Preloader extends Phaser.Scene {
    constructor(key) {
        super('Preloader');
    }

    init() {
        this.readyCount = 0;
    }

    preload() {
        //time event for showing logo
        this.timedEvent = this.time.delayedCall(1, this.ready, [], this); 

        this.createPreloader();

        //preload assets
        this.loadAssets();
    }

    createPreloader() {
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        this.add.image(width/2, height/2 -100, 'zenva_logo');

         //display progress bar
         var progressBar = this.add.graphics(); 
         var progressBox = this.add.graphics();
 
         progressBox.fillStyle(0x222222, 0.8); 
         progressBox.fillRect(width/2 - 160, height/2 - 30, 320, 50);

         //loading text
        var loadingText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 - 50,
            text: 'Loading...',
            style: {
                //config object
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        //percent text
        var percentText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 - 5,
            text: '0%',
            style: {
                //config object
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        //loading assets text
        var assetText = this.make.text({
            //config object containing text properties
            x: width/2,
            y: height/2 + 50,
            text: '',
            style: {
                //config object
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        //listen for loading events: update progress bar
        this.load.on('progress', function(value) { 
            percentText.setText(parseInt(value * 100) + '%'); 
            progressBar.clear(); 
            progressBar.fillStyle(0xffffff, 1); 
            progressBar.fillRect(width/2 - 150, height/2 - 20, 300*value, 30);
        });

        //listen for loading events: update file progress text
        this.load.on('fileprogress', function(file) { 
            assetText.setText('Loading asset: ' + file.key); 
        });

        //remove progressbar when complete
        this.load.on('complete', function() {
            progressBox.destroy();
            progressBar.destroy();
            assetText.destroy();
            loadingText.destroy();
            percentText.destroy();

            this.ready();
        }.bind(this)); 
    }

    loadAssets() {
        //load title image
        this.load.image('title', 'assets/ui/title2.png');

        //load buttons
        this.load.image('sword1', 'assets/ui/swordbutton1.png');
        this.load.image('sword2', 'assets/ui/swordbutton2.png');

        //pass level keys as an array so we don't have to hardcode keys for each level
        this.levels = {
            1: 'level1',
            2: 'level2'
        }
        //load in tiled json
        this.load.tilemapTiledJSON('level1', 'assets/tilemaps/zenva_tutorial_rpg_lvl1.json');
        this.load.tilemapTiledJSON('level2', 'assets/tilemaps/zenva_tutorial_rpg_lvl2.json');
        //load in tilesheet
        this.load.spritesheet('RPGpack_sheet', 'assets/images/RPGpack_sheet.png', { frameWidth: 64, frameHeight: 64 });
        //load character spritesheet
        this.load.spritesheet('characters', 'assets/images/roguelikeChar_transparent.png', {
            frameWidth: 17, frameHeight: 17
        });
        //load coin sprite
        this.load.image('coin', 'assets/images/coin_01.png');
        //load bullet sprite
        this.load.image('bullet', 'assets/images/ballBlack_04.png');
    }

    ready() {
        this.readyCount++;
        if(this.readyCount === 2) {
            //this leaves logo on splash screen for a short interval before launching next scene
            this.scene.start('Title', {level: 1, newGame: true, levels: this.levels});
        }
    }

    create() {
        console.log("this is the PreloaderScene");
    }
}





