class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.exit;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image('flag', 'assets/flag.png');
        this.load.image('landscape-tileset', 'assets/landscape-tileset.png');
        this.load.image('spike', 'assets/spike.png');
        this.load.image('skies', 'assets/skies.png');
        this.load.image('player', 'assets/ralph.png');
        /*this.load.spritesheet('player', 'assets/player.png', {
            frameWidth: 32,
            frameHeight: 32,
            margin: 1,
            spacing: 2
        })*/
        this.load.spritesheet('saves', 'assets/saveTilesheet.png', {
            frameWidth: 16,
            frameHeight: 16,
        })
    };
    create() {
        const map = this.make.tilemap({ key: this.tileDataKey });
        console.log(map);
        const landscapeTileset = map.addTilesetImage('landscape-tileset');
        const spikeTileset = map.addTilesetImage('spike');
        const skiesTileset = map.addTilesetImage('skies');
        this.background = map.createStaticLayer('backgroundLayer', [landscapeTileset, skiesTileset], 0, 0);
        this.collideLayer = map.createStaticLayer('collideLayer', landscapeTileset, 0, 0);
        this.foreground = map.createStaticLayer('foregroundLayer', landscapeTileset, 0, 0);
        this.spikes = map.createStaticLayer('spikeLayer', spikeTileset, 0, 0);
        //collision
        //this.collideLayer.setCollisionBetween(0, 1000);
        this.collideLayer.setCollisionByProperty({collides:true});
        this.spikes.setCollisionByProperty({ collides: true });
        console.log(this.collideLayer);
        const myLand = this.matter.world.convertTilemapLayer(this.collideLayer);
        const mySpikes = this.matter.world.convertTilemapLayer(this.spikes);
        this.flag = this.matter.add.sprite(608, 96, 'flag');
        this.flag.setStatic(true);
        this.flag.label = 'flag';
        this.player = new Player(this, 200, 0); //TODO Get from tiled
        //this.player.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite,false,0.5,0.5);   
        //this.matter.world.on('collisionstart', this.handleCollision, this);
       // this.matter.world.on('collisionactive', this.handleCollision, this);

    }
    handleCollision(event) {
        event.pairs.forEach(this.matchCollisionPair, this);
    }

    matchCollisionPair(pair) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        var playerObj = null;
        let myPair = [null, null];
        if (bodyA.gameObject && bodyA.gameObject.label) {
            this.sortCollisionObjects(bodyA.gameObject.label, myPair);
        }
        if (bodyB.gameObject && bodyB.gameObject.label) {
            this.sortCollisionObjects(bodyB.gameObject.label, myPair);
        }
        if (myPair[0] == 'player' && myPair[1] == 'flag') {
            this.changeScene();
        }
    }
    sortCollisionObjects(label, arr) {
        switch (label) {
            case 'player':
                arr[0] = 'player';
                break
            case 'flag':
                arr[1] = 'flag';
                break
        }
    }


    update(time, delta) {
        this.player.update();

    }
    changeScene() {
        switch (this.id) {
            case 'TutScene':
                this.scene.start('sceneA');
                break
        }
    }

}