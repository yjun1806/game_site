// If the object exists already, we�ll use it, otherwise we�ll use a new object
//var Unnamegame = Unnamegame || {};

// Initiate a new game and set the size of the entire windows
// Phaser.AUTO means that whether the game will be rendered on a CANVAS element or using WebGL will depend on the browser
Unnamegame.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_Canvas');

Unnamegame.game.state.add('Boot', Unnamegame.Boot);
Unnamegame.game.state.add('Preloader', Unnamegame.Preloader);
Unnamegame.game.state.add('MainMenu', Unnamegame.MainMenu);
/*
Unnamegame.game.state.add('Game', Unnamegame.Game);
*/
Unnamegame.game.state.add('Game', Unnamegame.Game);

Unnamegame.game.state.start('Boot');