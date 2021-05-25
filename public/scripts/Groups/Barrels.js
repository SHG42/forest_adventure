import Barrel from '../Sprites/Barrel.js';

export default class Barrels extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, children, spriteArray) {
        super(world, scene);

        this.scene = scene;

        this.createBarrels(scene, spriteArray);
    }

    createBarrels(scene, spriteArray) {
        spriteArray.forEach(sprite => {
            //create new barrel
            const barrel = new Barrel(scene, sprite.x, sprite.y, 229);
            //add to group
            this.add(barrel);

            //destroy sprite object
            sprite.destroy();
        });
    }
}