

let Info_Phaser = new Phaser.Game(window.innerWidth-400, 100, Phaser.AUTO, 'game_Info', { preload: preload, create: create, update: update });

let Tier_name = ['브론즈', '실버', '골드', '플래티넘', '다이아몬드', '마스터', '그랜드마스터', '신'];

let STATS = {};

GameSocket.on('character-config', function (data) {
    STATS = data;
    console.log("TTT", STATS);
});

function preload() {
    this.load.image('tier-1', '/client/assets/images/tier1.png');
    this.load.image('tier-2', '/client/assets/images/tier2.png');
    this.load.image('tier-3', '/client/assets/images/tier3.png');
    this.load.image('tier-4', '/client/assets/images/tier4.png');
    this.load.image('tier-5', '/client/assets/images/tier5.png');
    this.load.image('tier-6', '/client/assets/images/tier6.png');
    this.load.image('tier-7', '/client/assets/images/tier7.png');
    this.load.image('tier-8', '/client/assets/images/tier8.png');

    this.load.image('border', '/client/assets/images/border3.png');

    this.load.spritesheet('health', '/client/assets/images/health-bar.png', 8, 8);



}

function Tier_grade_Re(grade){

    switch (grade) {
        case 0:
            return '브론즈';
        case 1:
            return '실버';
        case 2:
            return '골드';
        case 3:
            return '플래티넘';
        case 4:
            return '다이아몬드';
        case 5:
            return '마스터';
        case 6:
            return '그랜드마스터';
        case 7:
            return '신';
    }
}

function create() {

    this.game.stage.backgroundColor = "#fff"; //게임 배경색상 지정
    this.border = this.game.add.image(0, 0, 'border');
    this.border.width = this.game.width; // 크기 세팅
    this.border.height = 100;


    let bar2 = this.game.add.graphics();
    bar2.beginFill(0x000000, 0.8);
    bar2.drawRect(20, 20,  60, 60);

    let bar3 = this.game.add.graphics();
    bar3.beginFill(0x000000, 0.4);
    bar3.drawRect(85, 20,  260, 60);
    bar3.drawRect(350, 20,  250, 60);
    bar3.drawRect(605, 20,  255, 60);


    let styl2 = { font: "bold 14px Gugi", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 3};
    let styl4 = { font: "bold 18px Gugi", fill: "#ffffff", align: "center", stroke: "#000000", strokeThickness: 3};

    let styl3 = { font: "bold 18px Gugi", fill: "#f9ff28", align: "center", stroke: "#000000", strokeThickness: 3 };
    let styl5 = { font: "bold 18px Gugi", fill: "#ff2328", align: "center", stroke: "#000000", strokeThickness: 3};
    let styl6 = { font: "bold 18px Gugi", fill: "#3a2bff", align: "center", stroke: "#000000", strokeThickness: 3 };

    this.test = this.game.add.text(21, 27, '플레이어\n정       보', styl2);

    let grade_text = this.game.add.text(170, 25,'', styl4);

    let point_text = this.game.add.text(375, 25, '', styl3);
    let kill_text = this.game.add.text(point_text.x + 80, point_text.y, '', styl5);
    let died_text = this.game.add.text(kill_text.x + 70, point_text.y, '', styl6);

    var Tier = this.game.add.image(120, 50, 'tier-1');


    let hp_text = this.game.add.text(620, 25, 'HP : 0 / 0', styl4);

    // 헬스바 메소
    let health_config = {x: 730, y: 60, width: 220, height: 20,
        bg: {
            color: '#440105'
        },
        bar: {
            color: '#c50004'
        }
    };

    //체력바 만들어주는 메소드
    let Health_bar = new HealthBar(this.game, health_config);
    Health_bar.setPercent(100);


     GameSocket.on('update_hp', function (hp, type) {
         hp_text.setText("HP : " + hp +" / " + STATS[type].HP);
         console.log("HP : " + STATS[type].HP +" / " + hp);
         Health_bar.setPercent(hp/STATS[type].HP * 100);

     });


    GameSocket.on('update-character-info', function (data) {
        console.log("TEST : ", data);
        let Tier_grade = 'tier-' + (data[0].Grade+1);
        Tier.loadTexture(Tier_grade, 0);
        Tier.anchor.setTo(0.5, 0.5);
        Tier.scale.setTo(0.7);

        grade_text.setText('이름 : ' +data[0].id + '\n등급 : ' + Tier_grade_Re(data[0].Grade));

        console.log("change text ", data);
        point_text.setText('POINT\n' + data[0].Point);
        kill_text.setText('KILL\n' + data[0].Kill);
        died_text.setText('DIED\n' + data[0].Died);

    });

}




function update() {
    
}

