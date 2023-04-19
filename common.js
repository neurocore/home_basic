const scale = 2;
const config = 
{
	type: Phaser.AUTO,
	width: 30 * 16 * scale,
	height: 20 * 16 * scale,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 1500 },
			debug: true
		}
	},
	scene: { preload, create, update }
};

const game = new Phaser.Game(config);

function preload() 
{
	// this.load.tilemapTiledJSON('map', 'assets/maps/sample.tmj');
	// let tileset = this.textures.get('myTileset');

	// Load any necessary assets, such as tilesets
  this.load.image('tileset', 'assets/maps/castle-tileset.png');

	// Load the TMX file
  this.load.tilemapTiledJSON('map', 'assets/maps/sample.json');

	this.load.spritesheet('player', 'assets/img/player.png', { frameWidth: 41, frameHeight: 70 });
}

let fgLayer;

function create() 
{
	// Create the tilemap
	const map = this.make.tilemap({ key: 'map' });

  // Add the tileset to the map
  var tileset = map.addTilesetImage('main', 'tileset');

  // Create the background layer
  var bgLayer = map.createLayer('back', tileset);

  // Create the foreground layer
  var fgLayer = map.createLayer('fore', tileset);

  bgLayer.setScale(scale);
	fgLayer.setScale(scale);
	
	// Add sprite
  player = this.physics.add.sprite(400, 200, 'player');
	player.setCollideWorldBounds(true);
  player.setBounce(0.2);

  // Set collision for the foreground layer
  fgLayer.setCollisionByExclusion([-1]);
 	this.physics.add.collider(player, fgLayer);

	this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'player', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update()
{
  if (cursors.left.isDown)
  {
    player.setVelocityX(-320);
    // player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(320);
    // player.anims.play('right', true);
  }
  else
  {
    player.setVelocityX(0);
    // player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.onFloor()) {
    player.setVelocityY(-700);
  }
}