// Create a new Phaser game instance
let game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameDiv');

// Define variables for the tilemap and tileset
let map, tileset;

// Define variables for the sprite and sprite image
let sprite, spriteImage;

// Load the tileset image and sprite image
game.load.image('tiles', 'assets/tiles/castle-tileset.png');
game.load.image('sprite', 'assets/img/player.png');

// Create the game state
let gameState =
{
	// Load assets
	preload: function() {
		// Load the Tiled map data
		game.load.tilemap('map', 'path/to/map.json', null, Phaser.Tilemap.TILED_JSON);
	},
	
	// Create objects
	create: function() {
		// Create the tilemap
		map = game.add.tilemap('map');
		map.addTilesetImage('tileset', 'tiles');

		// Create layers for the map
		let backgroundLayer = map.createLayer('background');
		let foregroundLayer = map.createLayer('foreground');

		// Make the foreground layer collidable
		map.setCollisionBetween(1, 999, true, foregroundLayer);

		// Create the sprite and add it to the game
		spriteImage = game.cache.getImage('sprite');
		sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'sprite');
		sprite.anchor.set(0.5);

		// Enable physics for the sprite
		game.physics.enable(sprite);

		// Set up the camera to follow the sprite
		game.camera.follow(sprite);
	},
	
	// Update the game state
	update: function() {
		// Handle collisions between the sprite and the foreground layer
		game.physics.arcade.collide(sprite, foregroundLayer);

		// Handle user input to move the sprite
		if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			sprite.body.velocity.x = -200;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			sprite.body.velocity.x = 200;
		}
		else {
			sprite.body.velocity.x = 0;
		}

		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			sprite.body.velocity.y = -200;
		}
		else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			sprite.body.velocity.y = 200;
		}
		else {
			sprite.body.velocity.y = 0;
		}
	}
};

// Add the game state to the game and start it
game.state.add('gameState', gameState);
game.state.start('gameState');
