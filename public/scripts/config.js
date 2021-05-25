export default {
    type: Phaser.AUTO,
    scale: {
        parent: "phaser-container",
        width: window.innerWidth,
        height: window.innerHeight,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    roundPixels: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}
