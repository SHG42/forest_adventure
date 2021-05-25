export default class Bullets extends Phaser.Physics.Arcade.Group {
    //extending an existing class, so we use a constructor
    constructor(world, scene, children) {
        super(world, scene); //params: passing in Physics Arcade world, current scene the physics group is in, array of any children in the group
        this.scene = scene;
        
        //use groups method to create gameobjects
        this.createMultiple({
            //config
            frameQuantity: 5,
            key: 'bullet',
            active: false, //setting this to false tells Phaser this gameobject is no longer in use in group
            //when we call an object from our pool to use it, Phaser will take the first inactive object from the group and reuse it by making it active again.
            visible: false //setting this to false tells Phaser to not render the gameobject sprites to our game
        });
    }

    //custom method to fire on enemies
    enemyCollision(bullet, enemy) { //arguments: bullet fired, enemy the bullet overlapped with
        //deactivate bullet object
        bullet.active = false;
        bullet.visible = false;
        bullet.disableBody();
        enemy.loseHealth(); //calling custom method from enemy class
    }

    //custom method to fire bullets
    fireBullet(x, y, direction) {
        //parameters are the coordinates where bullet should start from, which will be player's position, and the direction of player travel
        //get non-active bullet from group using groups method
        const bullet = this.getFirstDead(false); //if all of them are active, nothing will be returned
        //check to see if bullet is returned from get
        if(bullet) {
            //enable physics body
            bullet.enableBody(true); //when bullet hits enemy we will want to disable body so collisions stop, so we will need to re-enable body when firing another bullet
            //make bullet active and visible
            bullet.active = true;
            bullet.visible = true;
            //set position to playercoords
            bullet.setPosition(x, y);
            //set scale
            bullet.setScale(0.1);
            //update velocity
            switch(direction) {
                case 'up':
                    bullet.setVelocityY(-500);
                    break;
                case 'down':
                    bullet.setVelocityY(500);
                    break;
                case 'left':
                    bullet.setVelocityX(-500);
                    break;
                case 'right':
                    bullet.setVelocityX(500);
                    break;
                default:
                    bullet.setVelocityY(-500);    //'up' is default value for direction property in player class, so we use it as default case for bullet fire direction    
            }

            //time event to set distance bullet travels
            this.scene.time.addEvent({
                delay: 1500, 
                callback: () => {
                    bullet.disableBody();
                    bullet.active = false;
                    bullet.visible = false;
                    bullet.setVelocity(0);
                }
            });
        }
    }
}
