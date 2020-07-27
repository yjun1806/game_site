// If the object exists already, we�ll use it, otherwise we�ll use a new object
//var Unnamegame = Unnamegame || {};

// Initiate a new game and set the size of the entire windows
// Phaser.AUTO means that whether the game will be rendered on a CANVAS element or using WebGL will depend on the browser
//import  Unnamegame.Game  from "Game.js";

/*const WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;*/
const WINDOW_WIDTH = window.innerWidth;
const WINDOW_HEIGHT = window.innerHeight;


Unnamegame.game = new Phaser.Game(WINDOW_WIDTH-400, WINDOW_HEIGHT-100, Phaser.AUTO, 'game_Canvas');

Unnamegame.game.state.add('Boot', Unnamegame.Boot);
Unnamegame.game.state.add('Preloader', Unnamegame.Preloader);
Unnamegame.game.state.add('MainMenu', Unnamegame.MainMenu);
Unnamegame.game.state.add('Game', Unnamegame.Game);
Unnamegame.game.state.add('Ending', Unnamegame.Ending);


Unnamegame.game.state.start('Boot');

