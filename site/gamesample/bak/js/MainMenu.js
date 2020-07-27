Unnamegame.MainMenu = function (game) {};

Unnamegame.MainMenu.prototype = {

    init: function(score) {

        var score = score || 0;
        this.highestScore = this.highestScore || 0;
        this.highestScore = Math.max(score, this.highestScore);
        this.game.sound.boot();
    },

    create: function () {

        // We've already preloaded our assets, so let's kick right into the Main Menu itself.
        // Here all we're doing is playing some music and adding a picture and button
        // Naturally I expect you to do something significantly better :)

        /*this.music = this.add.audio('openingMusic');
        this.music.loop = true;
        this.music.play();*/

        /*const map = this.make.tilemap({ key : "map"});
        const tileset = map.addTilesetImage("tilesheet.png", "stiles");
        const belowLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0);*/

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tiles', 5);

        // Give it speed in x
        this.background.autoScroll(-20, -20);

        //this.splash = this.add.image(this.game.width/2,this.game.height/2, 'logo');
        //this.splash.anchor.setTo(0.5);

        // High score
        text = "최고점수: "+this.highestScore;
        style = { font: "bold 20px Arial", fill: "#fff", align: "center" };

        this.score = this.game.add.text(this.game.width/2, this.game.height - 50, text, style);
        this.score.anchor.set(0.5);
        this.score.stroke = '#000000';
        this.score.strokeThickness = 8;

        // Instructions
        text = "이동: WASD 키   공격: 마우스 왼쪽 버튼   마법: 스페이스바";
        style = { font: "bold 20px Arial", fill: "#fff", align: "center" };

        this.instructions = this.game.add.text(this.game.width/2, this.game.height - 25, text, style);
        this.instructions.anchor.set(0.5);
        this.instructions.stroke = '#000000';
        this.instructions.strokeThickness = 8;

        this.playButton = this.add.button(this.game.width/2, this.game.height/2 + 100, 'startButton', this.startGame, this);
        this.playButton.anchor.setTo(0.5);
    },

    update: function () {

    },

    startGame: function (pointer) {

        // Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        // And start the actual game
        this.state.start('Game');
    },

    shutdown: function() {

        this.music = null;
        this.splash = null;
        this.score = null;
        this.instructions = null;
        this.background = null;
        this.playButton = null;
    }
};
