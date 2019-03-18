class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.touchData = {};
        /*this.sprite = scene.matter.add
            .sprite(128, 162, "player", 4)
            
            /*.setBody({
                type:
            })
            .setFixedRotation()
            .setPosition(x, y)
            //.setFriction(0.001)
            //.setMass(1);
        //this.physics.add.sprite(128, 162, 'player', 4);
        this.sprite.label = 'player';

        const anims = scene.anims;

        anims.create({
            key: 'walk',
            frames: anims.generateFrameNumbers('player', { start: 5, end: 10 }),
            frameRate: 15,
            repeat: -1
        });

        anims.create({
            key: 'idle',
            frames: anims.generateFrameNumbers('player', { frames: [1, 4] }),
            frameRate: 3,
            repeat: -1
        });

        anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 3 }],
            frameRate: 15
        });

        anims.create({
            key: 'fall',
            frames: [{ key: 'player', frame: 2 }],
            frameRate: 15
        });*/

        this.isTouching = true;

        this.keys = this.scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,

        });
        this.sprite = scene.matter.add
            .sprite(40, 0, 'player', 0);
            /*.setBody({
                type: 'rectangle', width: 14, height: 28
            });*/
        
        this.sprite.label = 'player';
        //this.sprite.setStatic(true);
        //TODO mobile input
        const testButton = scene.add.text(80, 140, 'Right', { fill: '#0f0' });
        testButton.setInteractive();
        testButton.setScrollFactor(0);
        testButton.on('pointerdown', () => { this.moveRight = true; });
        testButton.on('pointerup', () => { this.moveRight = false; });
        const testButton2 = scene.add.text(20, 140, 'Left', { fill: '#0f0' });
        testButton2.setInteractive();
        testButton2.setScrollFactor(0);
        testButton2.on('pointerdown', () => { this.moveLeft = true; });
        testButton2.on('pointerup', () => { this.moveLeft = false; });
        const testButton3 = scene.add.text(440, 140, 'Jump', { fill: '#0f0' });
        testButton3.setInteractive();
        testButton3.setScrollFactor(0);
        testButton3.on('pointerdown', () => { this.jumpUp = true; });
        this.scene.input.on('pointerup', (pointer) => { if (pointer.x < 300) { this.moveLeft = this.moveRight = false; }});
    }
    freeze() {
        this.sprite.setStatic(true);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.right)) {
            this.moveRight = true;
        }
        else if (Phaser.Input.Keyboard.JustDown(this.keys.left)) {
            this.moveLeft = true;
        }
        if (Phaser.Input.Keyboard.JustUp(this.keys.right)) {
            this.moveRight = false;
        }
        else if (Phaser.Input.Keyboard.JustUp(this.keys.left)) {
            this.moveLeft = false;
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.up)) {
            this.jumpUp = true;
        };
        const xForce = 0.001;
        const yForce = -0.006;
        const maxVel = 1.2;
        const speed = 2;
        if (this.moveRight) {
            this.sprite.setFlipX(false);
            //this.sprite.anims.play('run', true);
            /*this.sprite.applyForce({
                x: xForce,
                y: 0
            })*/
            this.sprite.x += speed;
        } else if (this.moveLeft) {
            //this.sprite.anims.play('run', true);
            this.sprite.setFlipX(true);
            /*this.sprite.applyForce({
                x: -xForce,
                y: 0
            })*/
            this.sprite.x -= speed;
        }
        else {
            //this.sprite.anims.play('idle', true);
            this.moveLeft = this.moveRight = false;
        }
        if (this.jumpUp) {
            this.sprite.applyForce({
                x: 0,
                y: yForce
            })
            //this.sprite.y += 10;
            this.jumpUp = false;
            console.log("jump6");
        }

        if (this.sprite.body.velocity.x > maxVel) {
            this.sprite.setVelocityX(maxVel);
        } else if ((this.sprite.body.velocity.x < -maxVel)) {
            this.sprite.setVelocityX(-maxVel);
        }


    }


}