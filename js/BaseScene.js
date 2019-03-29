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
        //console.log(map);
        const landscapeTileset = map.addTilesetImage('landscape-tileset');
        const spikeTileset = map.addTilesetImage('spike');
        const skiesTileset = map.addTilesetImage('skies');
        this.background = map.createStaticLayer('backgroundLayer', [landscapeTileset, skiesTileset], 0, 0);
        this.collideLayer = map.createStaticLayer('collideLayer', landscapeTileset, 0, 0);
        this.foreground = map.createStaticLayer('foregroundLayer', landscapeTileset, 0, 0);
        this.spikes = map.createStaticLayer('spikeLayer', spikeTileset, 0, 0);
        //collision
        //this.collideLayer.setCollisionBetween(0, 1000);
        this.collideLayer.setCollisionByProperty({ collides: true });
        this.spikes.setCollisionByProperty({ collides: true });
        this.spikes.label = 'spike';
       // console.log(this.collideLayer);
        const myLand = this.matter.world.convertTilemapLayer(this.collideLayer);
        const mySpikes = this.matter.world.convertTilemapLayer(this.spikes);
        this.flag = this.matter.add.sprite(608, 96, 'flag');
        this.flag.setStatic(true);
        this.flag.label = 'flag';
        //Saves
        this.saves = new Save(this, 20, 20);
        this.saves.sprite.label = 'saves';
        //Player
        this.playerSpawn = map.findObject('objectLayer', (object) => { if (object.name == 'playerSpawn') { return object } });
        this.player = new Player(this, this.playerSpawn.x, this.playerSpawn.y); //TODO Get from tiled
        this.player.label = 'player';
        //this.player.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);



        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.matter.world.on('collisionactive', this.handleCollision, this);


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
          //  console.log(bodyB.gameObject);
            //console.log(bodyA.gameObject);
            //this.player.freeze();
            if (bodyA.gameObject.tile && bodyA.gameObject.tile.layer.name == 'spikeLayer') {
                myPair[2] = 'spike';
                //console.log(myPair);
            }
            this.sortCollisionObjects(bodyB.gameObject.label, myPair);
        }
        if (myPair[0] == 'player' && myPair[1] == 'flag') {

            this.changeScene();
        }
        if (myPair[0] == 'player' && myPair[2] == 'spike') {
            this.killPlayer();
        }
        if (myPair[0] == 'player' && myPair[3] == 'saves') {
            this.savePlayerPosition(/*currentSave*/);
        }
    }
    sortCollisionObjects(label, arr) {
       // console.log(label);
        switch (label) {
            case 'player':
                arr[0] = 'player';
                break
            case 'flag':
                arr[1] = 'flag';
                break
            case 'spike':
                arr[2] = 'spike';
                break
            case 'saves':
                arr[3] = 'saves';
                break
        }
    }


    update(time, delta) {
        this.player.update();

    }
    changeScene() {
        console.log(this.id);
        switch (this.id) {
            case 'tutScene':
                console.log('change scene');
                this.scene.start('sceneA');
                break
        }
    }
    killPlayer() {
        console.log('die');
        this.player.sprite.x = this.player.sprite.spawnPoint[0];
        this.player.sprite.y = this.player.sprite.spawnPoint[1];
        //set player to last spawn point
    }
    savePlayerPosition(/*currentSave*/) {
        console.log('save');
        this.player.sprite.spawnPoint = [this.saves.sprite.x, this.saves.sprite.y];
        console.log(this.player.sprite.spawnPoint);
        //this.saves
        //set player respawn point to save object
    }

}