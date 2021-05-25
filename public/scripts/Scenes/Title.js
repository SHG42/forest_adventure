export default class Title extends Phaser.Scene {
    constructor() {
        super('Title');
    }

    init(data) {
        //store data in properties:
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
        //emit event to reset health if game over occurs and new game starts, check to see if new game
        if(this._NEWGAME) {
            this.events.emit('newGame');
        }
    }
      
    create() {
        //create game title image
        this.createTitle();

        //play button
       this.createPlayButton();

       console.log('this is the title scene');
    }

    //custom method
    createTitle() {
        this.titleImage = this.add.image(0,0, 'title');
        this.centerObject(this.titleImage, 0.5); //gameObject, offset value
        //scale title image
        this.titleImage.setScale(0.4);
    }

    createPlayButton() {
        this.gameButton = this.add.sprite(0,0, 'sword1').setInteractive();
        this.centerObject(this.gameButton, -2);

        //listen for input on button
        this.gameButton.on('pointerdown', function(pointer) {
            this.scene.start('Game', {level: this._LEVEL, newGame: true, levels: this._LEVELS});
        }.bind(this));

        //set gameobject to change in texture when hovered over
        this.gameButton.on('pointerover', function(pointer) { //pointerover event fires when mouse hovers over interactive object
            this.gameButton.setTexture('sword2'); //setTexture method lets us switch what image a gameobject uses without having to create an additional gameobject to switch between
        }.bind(this));

        this.gameButton.on('pointerout', function(pointer) { //pointerover event fires when mouse leaves hover over interactive object
            this.gameButton.setTexture('sword1');
        }.bind(this));
    }

    centerObject(gameObject, offset=0) {
        //setting default value of offset to 0. we can set a default value on a parameter being passed to a method, so if no other value is passed, it will inherit the default value.
        var width = this.cameras.main.width; 
        var height = this.cameras.main.height;

        gameObject.x = width/2;
        gameObject.y = height/2 - offset * 100;
    }
}