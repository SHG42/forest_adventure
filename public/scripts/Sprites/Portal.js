export default class Portal extends Phaser.GameObjects.Zone {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height);

        this.scene = scene;
        //enable physics
        this.scene.physics.world.enable(this);
        //add portal zone to scene
        this.scene.add.existing(this);
    }
}