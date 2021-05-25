export default class Player extends Phaser.Physics.Arcade.Sprite {
    //extending an existing class, so we use a constructor
    constructor(scene, x, y) {
        super(scene, x, y, 'characters', 325); //params: scene where game object is being added, x and y coordinates where game object will be created, key, frame
        this.scene = scene; //storing a reference to the scene context being passed to the constructor, so we can reference the scene context in multiple methods in our Player class without having to pass it into each method.

        //add property for health:
        this.health = 10;
        //set default value for health-loss delay
        this.hitDelay = false;

        //enable physics
        this.scene.physics.world.enable(this);
        //add player to scene
        this.scene.add.existing(this);
        //scale sprite
        this.setScale(2);

        //emit event for creating of new player object
        this.scene.events.emit('playerCreate', this.health);
    }

    //custom method for enemy collision logic
    enemyCollision(player, enemy) {
        //if hitDelay = false, run loseHealth method
        if(!this.hitDelay) { //default value of hitDelay is false
            this.loseHealth();
            //set hitDelay to true to allow time buffer before more health loss
            this.hitDelay = true;
            //change tint of player sprite to indicate damage
            this.tint = 0xff0000;
            //set time delay before switching hitDelay value back to false
            this.scene.time.addEvent({
                delay: 1200,
                callback: () => {
                    this.hitDelay = false;
                    //reset tint back to normal
                    this.tint = 0xffffff;
                },
                callbackScope: this
            });
        }
    }

    //custom method for health decrease logic
    loseHealth() {
        this.health--;
        //emit event for losing health
        this.scene.events.emit('loseHealth', this.health);
        //check to see if player has run out of health
        if(this.health === 0) {
            //call loadNextLevel method to restart game
            this.scene.loadNextLevel(true); //the true argument passed in will be the value of the endGame parameter passed to loadNextLevel in Game.js
        }
    }

    update(cursors) {
        //referencing the cursors object that exists on our game scene, so we can pass the cursors object as a parameter to the update method

        //set default velocity to 0
        this.setVelocity(0);

        if(cursors.up.isDown) {
            this.setVelocityY(-350);
        } else if (cursors.down.isDown) {
            this.setVelocityY(350);
        }

        if(cursors.left.isDown) {
            this.setVelocityX(-350);
        } else if (cursors.right.isDown) {
            this.setVelocityX(350);
        }
    }
}
