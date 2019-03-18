class TutScene extends BaseScene {
    constructor() {
        super('tutScene');
        this.tileDataKey = 'tutorial';
        this.tileDataSource = 'assets/tutorial.json';
    }
    preload() {
        super.preload();
        /*this.load.image('flag', 'assets/flag.png');
        this.load.image('landscape-tileset', 'assets/landscape-tileset.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('skies', 'assets/skies.png');
        this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 2
        })
        this.load.spritesheet('saves', 'assets/saveTilesheet.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 0,
            spacing: 0
        })*/
    }
    create() {
        super.create();
    }
    update(time, delta) {
        super.update(time, delta);
    }
}