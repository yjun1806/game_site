let Unnamegame = {};

Unnamegame.Boot = function (game) {

};

Unnamegame.Boot.prototype = {
    init: function () {
        this.input.maxPointers = 1; // 멀티터치를 지원하지 않음. 최대 입력값은 1

        this.game.stage.disableVisibilityChange = true; //사용자가 브라우저 포커스를 다른데 두었을때? 설정하는 부분

        if(this.game.device.desktop){
            this.scale.pageAlignHorizontally = true; // 데스크탑 세팅
        }/*else { //모바일에서 볼때
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.scale.setMinMax(480, 260, 1024, 768);
            this.scale.forceLandscape = true;
            this.scale.pageAlignHorizontally = true;
        }*/


    },

    preload: function () {
        //this.load.image('logo', 'assets/images/logo.png'); //로고이미지 설정, 바꿀것
        this.load.image('preloaderBar', '/client/assets/images/preload-bar.png') //로딩바 이미지
    },

    create: function () {
        this.state.start('Preloader');
    }
};

//export default Unnamegame.Boot;