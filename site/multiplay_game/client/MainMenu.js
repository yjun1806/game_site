let LoginID;

const character_set = ['warrior_m', 'warrior_f', 'mage_m', 'mage_f', 'ranger_m', 'ranger_f', 'healer_m', 'healer_f',
'ninja_m', 'ninja_f'];
const character_set_name = ['워리어(남)', '워리어(여)', '메이지(남)', '메이지(여)', '레인저(남)', '레인저(여)'
    , '힐러(남)', '힐러(여)', '닌자(남)', '닌자(여)'];

const class_name = ['워리어', '메이지', '레인저', '힐러', '닌자'];

const class_info =
        ['공 격 력 : ★★★☆☆   체     력 : ★★★★★\n이동속도 : ★★☆☆☆   공격속도 : ★★★☆☆', //워리어
        '공 격 력 : ★★★☆☆   체     력 : ★★★★★\n이동속도 : ★★☆☆☆   공격속도 : ★★★☆☆',

        '공 격 력 : ★★★★★   체     력 : ★★☆☆☆\n이동속도 : ★★★☆☆   공격속도 : ★★☆☆☆', //메이지
        '공 격 력 : ★★★★★   체     력 : ★★☆☆☆\n이동속도 : ★★★☆☆   공격속도 : ★★☆☆☆',

        '공 격 력 : ★★★☆☆   체     력 : ★★★☆☆\n이동속도 : ★★★★☆   공격속도 : ★★★★☆', //레인저
        '공 격 력 : ★★★☆☆   체     력 : ★★★☆☆\n이동속도 : ★★★★☆   공격속도 : ★★★★☆',

        '공 격 력 : ★☆☆☆☆   체     력 : ★★★★☆\n이동속도 : ★★★☆☆   공격속도 : ★★★☆☆', // 힐러
        '공 격 력 : ★☆☆☆☆   체     력 : ★★★★☆\n이동속도 : ★★★☆☆   공격속도 : ★★★☆☆',

        '공 격 력 : ★★☆☆☆   체     력 : ★★★☆☆\n이동속도 : ★★★★★   공격속도 : ★★★★★', // 닌자
        '공 격 력 : ★★☆☆☆   체     력 : ★★★☆☆\n이동속도 : ★★★★★   공격속도 : ★★★★★'];

let choiced_type = null;
let choiced_index = -1;

Unnamegame.MainMenu = function (game) {};

Unnamegame.MainMenu.prototype = {

    init: function(Id) {

        this.Loginid = Id || null;

        /*var score = score || 0;
        this.highestScore = this.highestScore || 0;
        this.highestScore = Math.max(score, this.highestScore);*/

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

        this.background = this.game.add.tileSprite(0, 0, 0, 0, 'tiles', 21);

        // Give it speed in x
        this.background.autoScroll(0, 8);
        this.background.scale.setTo(7);

        let bar2 = this.game.add.graphics();
        bar2.beginFill(0x000000, 0.8);
        bar2.drawRect(this.game.width/2-400, this.game.height/2-300,  800, 550);

        let class_bar = [];
        for(var i=0; i< 5; i++){
            class_bar = this.game.add.graphics();
            class_bar.beginFill(0xffffff, 0.5);
            class_bar.drawRect(60,  170+80*i,  260, 70);
        }

        let class_text = { font: "bold 24px Gugi", fill: "#8a8a8a", align: "center", stroke: "#000000", strokeThickness: 8 };
        for(var i = 0; i< 5; i++){
            this.game.add.text(70, 190+80*i, class_name[i], class_text);
        }


        //선택할 캐릭터 만들어 주는 부분
        this.choice_character = [];
        this.choice_group = this.game.add.group();
        for(var i=0; i < 5; i++){
            for(var j=0; j<2; j++){
                this.choice_character[i*2 + j] = this.game.add.sprite(170 + j*73, 180+80*i, character_set[i*2+j]);
                this.choice_character[i*2 + j].alpha = 0.5;
                this.choice_character[i*2 + j].inputEnabled = true;
                this.choice_character[i*2 + j].animations.add('down', [6, 7, 8], 10, true);
                this.choice_character[i*2 + j].animations.play('down');
                this.choice_character[i*2 + j].scale.set(1.5);
                this.game.world.bringToTop(this.choice_character[i*2 + j]);
                this.choice_group.add(this.choice_character[i*2 + j])
            }
        }

        this.selected_chr = this.game.add.sprite(600, 150, character_set[0]);
        this.selected_chr.alpha = 0;
        this.selected_chr.scale.set(4);




        GameSocket.emit('logindata', this.Loginid);

        GameSocket.on('loginID', data => {
            console.log("main menu", data);
            this.highestScore = data.id;
            LoginID = data.id;

            console.log(data);
            text = this.highestScore + "님 안녕하세요.";
            style = { font: "bold 32px Gugi", fill: "#fff", align: "center" };

            this.score = this.game.add.text(this.game.width/2, 75, text, style);
            this.score.anchor.set(0.5);
            this.score.stroke = '#000000';
            this.score.strokeThickness = 8;
        });

        //});
        let ss = { font: "bold 32px Gugi", fill: "#fffe61", align: "center", stroke: "#000000", strokeThickness: 8 };
        let cc = this.game.add.text(100, 110, '캐릭터 선택', ss);
        //cc.anchor.set(0.5);


        //캐릭터 선택 정보
        this.choiced = "선택된 캐릭터";
        let styl2 = { font: "bold 24px Gugi", fill: "#fff", align: "center" };
        this.character_choiced = this.game.add.text(350, 200, this.choiced, styl2);
        this.character_choiced.anchor.set(0);
        this.character_choiced.stroke = '#000000';
        this.character_choiced.strokeThickness = 8;

        //클래스별 상세 속성
        this.cinfo = "";
        this.class_info = this.game.add.text(350, this.game.height/2, this.cinfo, styl2);
        this.class_info.stroke = '#000000';
        this.class_info.strokeThickness = 8;

        this.choice_warning = this.game.add.text(this.game.width/2, this.game.height/2 + 100, '플레이할 캐릭터를 선택해주세요.', styl2);
        this.choice_warning.anchor.set(0.5);
        this.choice_warning.alpha = 0;
        this.choice_warning.stroke = '#f73645';
        this.choice_warning.strokeThickness = 4;

        this.border = this.game.add.image(0, 0, 'borderw');
        this.border.width = this.game.width; // 크기 세팅
        this.border.height = this.game.height;
        this.border.fixedToCamera = true;


        // Instructions
        let text = "이동: WASD 키   공격: 마우스 왼쪽 버튼   스킬: 스페이스바";
        let style = { font: "bold 20px Gugi", fill: "#fff", align: "center" };

        this.instructions = this.game.add.text(this.game.width/2, this.game.height - 40, text, style);
        this.instructions.anchor.set(0.5);
        this.instructions.stroke = '#000000';
        this.instructions.strokeThickness = 8;

        /*this.playButton = this.add.button(this.game.width/2, this.game.height/2 + 100, 'startButton', this.startGame, this);
        this.playButton.anchor.setTo(0.5);*/
        this.btgroup = this.game.add.group();
        var button = this.game.make.button(this.game.width/2+150, this.game.height/2 + 200, 'button', this.startGame, this, 2, 1, 0);
        button.anchor.set(0.5);

        /*button.onInputOver.add(this.over, this);
        button.onInputOut.add(this.out, this);*/
        this.btgroup.add(button);
        //this.btgroup.add(warrior_m);
    },

    /*over: function() {
    console.log('button over');
},

    out: function() {
    console.log('button out');
},*/

    update: function () {
        for(let index in this.choice_character) {
            if (this.choice_character[index].input.pointerOver()) {
                if (this.game.input.activePointer.isDown) {
                    //console.log(character_set[index]);

                    this.character_choiced.setText("선택된 캐릭터\n" + character_set_name[index]);
                    this.class_info.setText(class_info[index]);
                    choiced_type = character_set[index];
                    choiced_index = index;
                    console.log(choiced_type + " / " +choiced_index);

                    this.selected_chr.alpha = 1;
                    this.selected_chr.loadTexture(character_set[index], 0);
                    this.selected_chr.animations.add('walk');
                    this.selected_chr.animations.play('walk', 5, true);


                }
                this.choice_character[index].alpha = 1;
            }
            else {
                this.choice_character[index].alpha = 0.5;
            }

            if (choiced_index !== -1) {
                this.choice_character[choiced_index].alpha = 1;
            }
        }

    },

    startGame: function (pointer) {

        // Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        //this.music.stop();

        // And start the actual game
        if(choiced_type !== null){
            this.state.start('Game', true, false, choiced_type);
        }else {
            this.choice_warning.alpha = 1;
            this.game.time.events.add(0, function() {
                this.game.add.tween(this.choice_warning).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);

            return;
        }
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
