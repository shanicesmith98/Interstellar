const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
  
const game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('star', './assets/star.png');
    this.load.image('bomb', './assets/bomb.png');
    this.load.spritesheet('dude', 
        './assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
    this.add.image(0, 0, 'sky').setOrigin(0, 0);
    this.add.image(400, 300, 'star');
    this.add.image(100, 500, 'dude');

    this.add.text(300, 10, "Interstellar", { font: "40px Times New Roman", fill: "#ffffff"});
  
    this.add.text(340, 60, "by Shanice", { font: "20px Times New Roman", fill: "#ffffff"});
}

function update ()
{
}