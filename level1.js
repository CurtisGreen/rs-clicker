Level1 = function () {};
// Upgrades
var purchases = {
	weapons: weapons,
	spells: spells,
	ranged: ranged
}

var spells = ["Air Strike", "Water Blast", "High Alc", "Earth Wave", "Blood Barrage", "Ice Barrage", "Fire Surge"];
var weapons = ["Dagger", "Sword", "Halberd", "Battle Axe", "Scimitar"];
var ranged = ["Shortbow", "Oak Shortbow", "Willow Shortbow", "Maple Shortbow", "Yew Shortbow", "Magic Shortbow", "Crystal Bow"];
var ores = ["Bronze", "Iron", "Steel", "Mithril", "Adamant", "Rune", "Dragon"];

// Player
var player = {
	level: 1,
	gold: 0,
	goldPerSec: 0
}

// Game objects
var gameWindow = {
	button: null,
	background: null,
	scoreText: null
}

Level1.prototype = {
  preload: function () {

    game.load.image('background', 'source/assets/MenuBg.png');
    game.load.image('loading', 'source/assets/loading.png');
    game.load.image('button', 'source/assets/chicken.jpg');


    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.pageAlignVertically = true;
    //game.scale.setScreenSize( true );
  },

  create: function () {
    //game.state.start('Splash');
  	// Background
  	gameWindow.background = game.add.image(game.world.centerX, game.world.centerY, 'background');
  	gameWindow.background.anchor.setTo(0.5);

  	// Button
  	gameWindow.button = game.add.sprite(game.world.centerX, game.world.centerY, 'button');
    gameWindow.button.anchor.setTo(0.5);
  	gameWindow.button.inputEnabled = true;
  	gameWindow.scoreText = game.add.text(game.world.width - 200, 20, 'Gold: 0', {fontSize: '32px', fill: '#999'});
  	gameWindow.button.events.onInputDown.add(buttonClick, this);
    
  }
}
function buttonClick(){
	player.gold++;
	gameWindow.scoreText.text = 'Gold: ' + player.gold;
	gameWindow.button.tint = 0xff0000;
	setTimeout(function(){
		gameWindow.button.tint = 0xFFFFFF
	}, 100);
}


/*function over(){
	console.log('Button over');
	console.log(window.innerWidth, window.devicePixelRatio, window.innerHeight);
}
function up(){
	console.log('Button up', arguments);
}
function out(){
	console.log('Button out');
}
function actionOnClick(){
	background.visible =! background.visible;
} */

// function update() {}