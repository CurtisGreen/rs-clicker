export class TextRow extends Phaser.GameObjects.Container {
    constructor(scene, x, y, children) {
        console.log('before super')
        super(scene, x, y, children);
        //super(scene);
        console.log('after super')
        scene.add.existing(this);
        console.log('after add')
    }
}