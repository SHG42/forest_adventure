import Coin from '../Sprites/Coin.js';

export default class Coins extends Phaser.Physics.Arcade.Group {
    //extending an existing class, so we use a constructor
    constructor(world, scene, children, spriteArray) {
        super(world, scene); //params: passing in Physics Arcade world, current scene the physics group is in, array of any children in the group
        this.scene = scene;

        //add the spriteArray coins to group
        this.createCoins(scene, spriteArray);
    }

    createCoins(scene, spriteArray){
        spriteArray.forEach((sprite) => {
            //create new coin
            const coin = new Coin(scene, sprite.x, sprite.y);
            //add to group
            this.add(coin);
            
            //destroy sprite object
            sprite.destroy();
        });
    }

    collectCoin (player, coin) {
        this.remove(coin);
        coin.destroy();
        //dispatch event when coin collected
        this.scene.events.emit('coinCollected');
    }
}
