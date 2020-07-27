Unnamegame.Ending = function (game) {

};

Unnamegame.Ending.prototype = {
    init: function (Id) {

        this.ID = null || Id;
    },

    preload: function () {

    },

    create: function () {
        endingstage = true;

        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'tiles', 74);
        this.background.scale.set(3);
        this.background.autoScroll(0, 8);


        let bar2 = this.game.add.graphics();
        bar2.beginFill(0x000000, 0.2);
        bar2.drawRect(0, 0,  this.game.width, this.game.height*2);

        var style = { font: 'bold 100px monospace', fill: '#f70008', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" };
        testLabel = this.game.add.text(0, 0, "GAME OVER", style);
        testLabel.fixedToCamera = true;
        testLabel.stroke = '#000000';
        testLabel.strokeThickness = 8;
        testLabel.setTextBounds(this.game.width/2 - 400, this.game.height/2, 800, 100);

        this.border = this.game.add.image(0, 0, 'borderw');
        this.border.width = this.game.width; // 크기 세팅
        this.border.height = this.game.height;
        this.border.fixedToCamera = true;

        //this.game.time.events.add(2000, restartgame, this);

    },

    update: function () {
        if(this.game.input.activePointer.isDown){
           // restartgame();
            this.game.state.start('MainMenu', true, false, this.ID);
            endingstage = false;
            //window.location.reload();

        }
    }
};


function restartgame() {
    //this.game.state.start('Boot', true, false);
    //window.location.reload();
    //$('#game_Canvas').load('index.html').fadeIn("slow");

}
