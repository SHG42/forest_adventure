import Player from '../Sprites/Player_Zenva.js';
import Coins from '../Groups/Coins.js';
import Enemies from '../Groups/Enemies.js';
import Bullets from '../Groups/Bullets_Zenva.js';
//import Barrels from '../Groups/Barrels';

export default class GameScene_Zenva extends Phaser.Scene {
    //sets GameScene class as a child of the Phaser.Scene class, so Phaser will recognize it as a scene object.
    constructor (key) {
        super('Game'); //when extending a class, need to call super() so it passes all the arguments to the parent class first, before running any code inside the child class.
    }

    init (data) {
        console.log("this is the GameScene_Zenva");
        //store data in properties:
        this._LEVEL = data.level;
        this._LEVELS = data.levels;
        this._NEWGAME = data.newGame;
        this.loadingLevel = false;
        //emit event to reset health if game over occurs and new game starts, check to see if new game
        if(this._NEWGAME) {
            this.events.emit('newGame');
        }

        //emit event when game scene runs to signal UI scene to start, so that UI scene isn't running over the boot/preloader/title
        this.events.emit('displayUI');
    }

    create() {
        // listen for the resize event
        this.scale.on('resize', this.resize, this);

        //listen for player input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); //tells Phaser to look for keyboard input from spacebar

        //call createMap method
        this.createMap();

        //create player character by calling method
        this.createPlayer();
        
        //create portal between levels from custom method
        this.createPortal();

        //create coins
        this.coins = this.map.createFromObjects('Coins', 'Coin', {});
        //createfromobjects method returns an array of sprites, passing array to Coins class.
        this.coinsGroup = new Coins(this.physics.world, this, [], this.coins);

        //create enemies
        this.enemies = this.map.createFromObjects('Enemies', 'Enemy', {});
        this.enemiesGroup = new Enemies(this.physics.world, this, [], this.enemies);

        //create bullets group
        this.bullets = new Bullets(this.physics.world, this, []); //passing in physics, scene, empty array to contain children

        //add collisions from custom method
        this.addCollisions();

        //add camera bounds
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.cameras.main.startFollow(this.player);
        
    }

    update () {
        //call cursor key checks from player class
        this.player.update(this.cursors);

        //check for spacebar input
        if(Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            //checking to see if spaceKey is pressed down once and only once,not held down
            this.bullets.fireBullet(this.player.x, this.player.y, this.player.direction);
        }
    } 

    //custom method for setting collisions
    addCollisions() {
        //platform collider
        this.physics.add.collider(this.player, this.blockedLayer);
        //enemies platform collider
        this.physics.add.collider(this.enemiesGroup, this.blockedLayer);
        //player enemies overlap
        this.physics.add.overlap(this.player, this.enemiesGroup, this.player.enemyCollision.bind(this.player)); //adding new method to player class and binding the player object context to it.
        //player portal overlap
        this.physics.add.overlap(this.player, this.portal, this.loadNextLevel.bind(this, false)); //binding context AND a value of false for the newGame parameter, so Phaser knows we're moving to next level and NOT ending or restarting game
        //player coin overlap
        this.physics.add.overlap(this.coinsGroup, this.player, this.coinsGroup.collectCoin.bind(this.coinsGroup));
        //enemy bullet overlap
        this.physics.add.overlap(this.bullets, this.enemiesGroup, this.bullets.enemyCollision);
    }

    createPlayer () {
        //get player starting point coords from json
        this.map.findObject('Player', (obj) => {
            //check to see if new game AND which level is loaded
            if(this._NEWGAME && this._LEVEL === 1) {
                //if newGame = true and loaded level is lvl1, load character at lvl1 starting pt
                if (obj.type === 'StartingPoint') {
                    this.player = new Player(this, obj.x, obj.y);
                  }
            } else { //otherwise, use whatever coordinates come back when function runs
                if(obj.type === 'StartingPointPortal') {
                    this.player = new Player(this, obj.x, obj.y);
                }
            }
        });
    }

    createPortal() {
        //get portal object coordinates from json
        this.map.findObject('Portal', (obj) => {
            //check which lvl is loaded
            if(this._LEVEL === 1) {
                if(obj.type === 'lvl2portal') {
                    this.portal = this.add.zone(obj.x, obj.y, obj.width, obj.height);
                    this.buildPortal();
                }
            } else if(this._LEVEL === 2) {
                if(obj.type === 'lvl1portal') {
                    this.portal = this.add.zone(obj.x, obj.y, obj.width, obj.height);
                    this.buildPortal();
                }
            }
        });
    }

    //method to contain the portal zone setup
    buildPortal() {
        this.physics.world.enable(this.portal);
        this.portal.body.setAllowGravity(false);
        this.portal.setOrigin(0,0);
    }

    resize (gameSize, baseSize, displaySize, resolution) {
        let width = gameSize.width;
        let height = gameSize.height;
        if (width === undefined) {
          width = this.sys.game.config.width;
        }
        if (height === undefined) {
          height = this.sys.game.config.height;
        }
        this.cameras.resize(width, height);
      }

    createMap () {
        //create tilemap
        this.map = this.make.tilemap({ key: this._LEVELS[this._LEVEL] }); //access level data array then access current level
        //tell tilemap to use tilesheet
        this.tiles = this.map.addTilesetImage('RPGpack_sheet');
        //create layers
        this.backgroundLayer = this.map.createLayer('Background', this.tiles, 0,0);
        this.blockedLayer = this.map.createLayer('Blocked', this.tiles, 0,0);
        //set which tiles on blocked layer collide
        //pass in tile indexes that you DO NOT want collisions for, the rest will have collisions set.
        this.blockedLayer.setCollisionByExclusion(-1); 

        //set world bounds on map
		this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }

    loadNextLevel(endGame) {
        if(!this.loadingLevel){
            this.cameras.main.fade(500,0,0,0); //milliseconds duration, rgb values
            this.cameras.main.on('camerafadeoutcomplete', () => {
                //check if player lost game (ran out of health)
                if(endGame) {
                    //restart lvl1
                    this.scene.restart({level: 1, levels: this._LEVELS, newGame: true});
                } else if(this._LEVEL === 1) {
                    this.scene.restart({level: 2, levels: this._LEVELS, newGame: false});
                } else if(this._LEVEL === 2) {
                    this.scene.restart({level: 1, levels: this._LEVELS, newGame: false});
                }
            });
            this.loadingLevel = true;
        }
    }
};