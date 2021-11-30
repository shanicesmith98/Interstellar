const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    audio: {
        disableWebAudio: true
    }
};
  
const game = new Phaser.Game(config);

// To-Do:
// Look into music format for phaser (convert to ogg + mp3)
// Animation with stars (rotation)
// Scale objects based on x/y of screen (16:9) **

function preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.audio('background_music', ['./assets/music_bg.ogg', '/.assets/music_bg.mp3']);
    this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    
}

function create() {
    let music = this.sound.add('background_music', { loop: true });
    music.play();

    let score = 0;
    let scoreText;

    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    
    platforms = this.physics.add.staticGroup();
    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });
    
    stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    platforms.create(400, 0.71 * config.width, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, stars);
    this.physics.add.collider(stars, platforms);

    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    player.body.setGravityY(10);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // keyboard manager
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.overlap(player, stars, collectStar, null, this);
    
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }

    this.add.text(300, 10, "Interstellar", { font: "40px Times New Roman", fill: "#ffffff"});
    this.add.text(340, 60, "by Shanice", { font: "20px Times New Roman", fill: "#ffffff"});
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });
    
    
}

function update ()
{
    // TO-DO: add translate for platforms (x axis)
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    
}