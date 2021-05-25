import Enemy from '../Sprites/Enemy.js';

export default class Enemies extends Phaser.Physics.Arcade.Group {
    //extending an existing class, so we use a constructor
    constructor(world, scene, children, spriteArray) {
        super(world, scene, children); //params: passing in Physics Arcade world, current scene the physics group is in, array of any children in the group
        this.scene = scene;

        //variable to contain frames to use to randomize enemy sprites
        this.spriteFrames = [0, 1, 54, 55, 108, 109, 162, 163];

        //add the spriteArray enemies to group
        this.createEnemies(scene, spriteArray);
    }

    createEnemies(scene, spriteArray){
        spriteArray.forEach((sprite) => {
            //random number
            const randNumber = Math.floor(Math.random() * this.spriteFrames.length -1); //calculates a number between 0 and the length of the array containing our sprite frames, to provide an index in the array, which we can then use that index to pick at random which sprite to display for each enemy object.
            //create new enemy
            const enemy = new Enemy(scene, sprite.x, sprite.y, this.spriteFrames[randNumber]);
            //add to group
            this.add(enemy);
            //destroy sprite object
            sprite.destroy();
        });
    }
}