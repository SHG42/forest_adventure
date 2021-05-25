export default class Coin extends Phaser.Physics.Arcade.Sprite {
    //extending an existing class, so we use a constructor
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'coin'); //params: scene where game object is being added, x and y coordinates where game object will be created, key from Boot preload of spritesheet, frame from spritesheet
        this.scene = scene; //storing a reference to the scene context being passed to the constructor, so we can reference the scene context in multiple methods in our Player class without having to pass it into each method.

        //enable physics
        this.scene.physics.world.enable(this);
        //add coin to scene
        this.scene.add.existing(this);
        //scale sprite
        this.setScale(0.2);
    }
}