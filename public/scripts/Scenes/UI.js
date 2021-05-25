export default class UIScene extends Phaser.Scene {
    constructor () {
        super({key: 'UI', active: true}); //config object passed to scene
    }

    init() {
       this.coinsCollected = 0;
    }

    create() {
        //get a reference to game scene, store as variable
        this.gameScene = this.scene.get('Game'); //pass in key belonging to game scene class to reference that scene
        //'Game' key is from index.js constructor
        
        this.createUI();

        this.createEvents();

        this.launchUI();
    }

    createUI() {
        //create scoreboard text
        this.scoreText = this.add.text(12, 12, `Gold: ${this.coinsCollected}`, {
            fontSize: '32px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: '5'
        }); //x and y pos coordinates, string with initial text, config object with text properties

        //create health scoreboard text
        this.healthText = this.add.text(12, 50, `Health: 10`, {
            fontSize: '32px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: '5'
        });

        //hide UI elements by default
        this.hideUIElements();
    }

    hideUIElements() {
        this.scoreText.alpha = 0;
        this.healthText.alpha = 0;
    }

    createEvents() {
        //listen for new player object creating
        this.gameScene.events.on('playerCreate', (health) => {
            this.healthText.setText(`Health: ${health}`);
        });


        //listen for events from that scene
        this.gameScene.events.on('coinCollected', () => {
            //update score text
            this.coinsCollected++;
            this.scoreText.setText(`Gold: ${this.coinsCollected}`);
        });

        this.gameScene.events.on('loseHealth', (health) => {
            this.healthText.setText(`Health: ${health}`);
        });

        //listen for new game
        this.gameScene.events.on('newGame', () => {
            this.coinsCollected = 0;
            this.scoreText.setText(`Gold: ${this.coinsCollected}`);
            this.healthText.setText(`Health: 10`);
        });
    }

    launchUI() {
        this.gameScene.events.on('displayUI', function() {
            this.scoreText.alpha = 1;
            this.healthText.alpha = 1;
            console.log("UI is now visible");
        }.bind(this));
    }

};
