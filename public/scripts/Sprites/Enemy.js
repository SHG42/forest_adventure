export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    //extending an existing class, so we use a constructor
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'characters', frame); //params: scene where game object is being added, x and y coordinates where game object will be created, key from Boot preload of spritesheet, frame from spritesheet
        this.scene = scene; //storing a reference to the scene context being passed to the constructor, so we can reference the scene context in multiple methods in our Player class without having to pass it into each method.

        //set health default
        this.health = 3;

        //enable physics
        this.scene.physics.world.enable(this);
        //add player to scene
        this.scene.add.existing(this);
        //scale sprite
        this.setScale(2);


        //move enemy around
        this.timeEvent = this.scene.time.addEvent({
            delay: 3000, //time in milliseconds that we want before function runs
            callback: this.move,
            loop: true,
            callbackScope: this //tells function in callback to use scope of Enemy class
        });
    }

    //custom method for removing enemy health
    loseHealth() {
        this.health--;
        this.tint = 0xff0000;
        //check if health is 0
        if(this.health === 0) {
            //remove time event before removing enemyobject
            this.timeEvent.destroy();
            //remove enemy
            this.destroy();
        } else {
            //if not 0, reset tint back to normal after a delay
            this.scene.time.addEvent({
                delay: 200, 
                callback: () => {
                    this.tint = 0xffffff;
                }
            });
        }
    }

    move() {
        //get random number to use for randomizing movement
        const randNumber = Math.floor((Math.random() * 4) + 1);

        //switch statement to specify random movement details: choosing random direction based on number between 1 and 4, since enemies can only move in four directions (up down left right).
        switch(randNumber) {
            case 1: 
                this.setVelocityX(100);
                break;
            case 2: 
                this.setVelocityX(-100);
                break;
            case 3:
                this.setVelocityY(100);
                break;    
            case 4:
                this.setVelocityY(-100);
                break;
            default: 
                this.setVelocityX(100);           
        }
    
        //timed event to reset velocity back to 0
        this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                if(this.active) this.setVelocityX(0);
            },
            callbackScope: this
        });
    }
}