export default class Barrel extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, frame) {
        super(scene, x, y, 'RPGpack_sheet', frame);

        this.scene = scene;

        //enable physics
        this.scene.physics.world.enable(this);
        
        //add player to scene
        this.scene.add.existing(this);
    }
}