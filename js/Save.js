class Save {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.matter.add.sprite(x, y, 'saves', 0);
        this.sprite.setStatic(true);
    }
}