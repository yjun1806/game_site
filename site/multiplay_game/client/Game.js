// Credits:
// http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/
// http://jschomay.tumblr.com/post/103568304133/tutorial-building-a-polished-html5-space-shooter
// http://ezelia.com/2014/tutorial-creating-basic-multiplayer-game-phaser-eureca-io

//import NewDungeon from "random-dungeon-generator";


let CollectableNumber; // 상자뿌리는 개수
let ObstaclesNumber; // 오브젝트수
let enemyNumber; // 적 등장수
let kill_enemy;
var map;
var layer;
let Stage;
let Bossgen = false;
let bar;
let testLabel, BossShow;
let gameovermessge = false;
let playerMap = {};
let Dungeon;
let playerGroup;
let otherswordGroup;
let players;
let playerid;
let isGameReady = false;
let playerAttacks;
let endingstage = false;

/*
const SERVER_IP = 'http://10.211.55.14:8081/'; //노드접속서버주소
*/
const socket = GameSocket;
let clientID = null;



let otherPlayers;
const isDown = (game, key) => game.input.keyboard.isDown(key);
let Class_STATS_DATA;


let GameBasicData = {
    worldSizeX: null,
    worldSizeY: null,
    grid: null,
    CollectableNumber: null,
    CollectableLocation: null,
    ObstaclesNumber: null,
    ObstaclesLocation: null
};

let hit_image;
let hit_tween;
//let attackSound;


/*//던전 생성
const config = {
    width: 50,
    height: 50,
    minRoomSize: 5,
    maxRoomSize: 20,
};

const Dungeon = NewDungeon(config);

console.log(Dungeon);*/


Unnamegame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)


    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called 'world' or you'll over-write the world reference.
};


Unnamegame.Game.prototype = {
    init: function(type){
        this.character_type = type;
        console.log("선택된 캐릭터 타입 : " + this.character_type);
    },

    preload: function(){
        this.generateWorld();


    },

    generateSounds: function () {

        this.attackSound = this.game.add.audio('attackSound');
        this.batSound = this.game.add.audio('batSound');
        this.fireballSound = this.game.add.audio('fireballSound');
        this.dragonSound = this.game.add.audio('dragonSound');
        this.ghostSound = this.game.add.audio('ghostSound');
        this.goldSound = this.game.add.audio('goldSound');
        this.levelSound = this.game.add.audio('levelSound');
        this.playerSound = this.game.add.audio('playerSound');
        this.potionSound = this.game.add.audio('potionSound');
        this.skeletonSound = this.game.add.audio('skeletonSound');
        this.slimeSound = this.game.add.audio('slimeSound');
        this.spiderSound = this.game.add.audio('spiderSound');
    },

    createPlayer:function(x, y, game, socket, type){
        /*const sprite = game.add.sprite(x, y, 'characters');
        sprite.animations.add('down', [3, 4, 5], 10, true);
        sprite.animations.add('left', [15, 16, 17], 10, true);
        sprite.animations.add('right', [27, 28, 29], 10, true);
        sprite.animations.add('up', [39, 40, 41], 10, true);*/

        const sprite = game.add.sprite(x, y, type);
        sprite.animations.add('up', [0, 1, 2], 10, true);
        sprite.animations.add('right', [3, 4, 5], 10, true);
        sprite.animations.add('down', [6, 7, 8], 10, true);
        sprite.animations.add('left', [9, 10, 11], 10, true);

        sprite.animations.play('down');
        sprite.scale.setTo(1);
        sprite.strength = 25;
        sprite.name = LoginID;
        sprite.weapon = null;
        sprite.corpseSprite = 1;
        clientID = LoginID;

        sprite.damage = 10;
        game.physics.arcade.enable(sprite, false);
        sprite.body.collideWorldBounds=true;
        //console.log("113 create!! : " + sprite.name + " / " + socket.id + " / " + clientID);


        return sprite
    },


    createplayerdata: function(x, y, game, socket, type){
        const player = {
            socket,
            sprite: this.createPlayer(x, y, game, socket, type),
            playerName: null,
            type: type,
            speed: Class_STATS_DATA[type].SPEED ,
            HP: Class_STATS_DATA[type].HP,
            healthbar: null,
            attack_speed: Class_STATS_DATA[type].ATTACK_SPEED,
            attack_range: Class_STATS_DATA[type].ATTACK_RANGE,
            attack_damage: Class_STATS_DATA[type].ATTACK_POWER,
            speedText: null,
            tierImage: null,
            sword: null,
            alive: true,
            pHandler (game) {
                //this.sprite.name = socket.id;
                //console.log("create!! : " + this.sprite.name + " / " + socket.id);
                /*
                Most of the driving logic was written by Daniel Wuggenig
                https://www.anexia-it.com/blog/en/introduction-to-the-phaser-framework/
                I decided to use it since this is supposed to be an introduction to multiplayer
                online car game, his driving solution is simple and clean and fits perfectly
                */

                const KEYS = {
                    W: Phaser.Keyboard.W,
                    S: Phaser.Keyboard.S,
                    A: Phaser.Keyboard.A,
                    D: Phaser.Keyboard.D
                };

                // Only emit if the player is moving
               /* if (this.speed !== 0) {
                    this.emitPlayerData()
                }*/

                // Up-Left 1
                if(this.alive) {
                    if (isDown(game, KEYS.W) && isDown(game, KEYS.A)) {
                        this.sprite.body.velocity.x = -this.speed;
                        this.sprite.body.velocity.y = -this.speed;
                        this.sprite.animations.play('left');
                        this.emitPlayerData()

                        // Up-Right 2
                    } else if (isDown(game, KEYS.W) && isDown(game, KEYS.D)) {
                        this.sprite.body.velocity.x = this.speed;
                        this.sprite.body.velocity.y = -this.speed;
                        this.sprite.animations.play('right');
                        this.emitPlayerData()

                        // Down-Left 3
                    } else if (isDown(game, KEYS.S) && isDown(game, KEYS.A)) {
                        this.sprite.body.velocity.x = -this.speed;
                        this.sprite.body.velocity.y = this.speed;
                        this.sprite.animations.play('left');
                        this.emitPlayerData()

                        // Down-Right 4
                    } else if (isDown(game, KEYS.S) && isDown(game, KEYS.D)) {
                        this.sprite.body.velocity.x = this.speed;
                        this.sprite.body.velocity.y = this.speed;
                        this.sprite.animations.play('right');
                        this.emitPlayerData()

                        // Up 5
                    } else if (isDown(game, KEYS.W)) {
                        this.sprite.body.velocity.x = 0;
                        this.sprite.body.velocity.y = -this.speed;
                        this.sprite.animations.play('up');
                        this.emitPlayerData()

                        // Down 6
                    } else if (isDown(game, KEYS.S)) {
                        this.sprite.body.velocity.x = 0;
                        this.sprite.body.velocity.y = this.speed;
                        this.sprite.animations.play('down');
                        this.emitPlayerData()

                        // Left 7
                    } else if (isDown(game, KEYS.A)) {
                        this.sprite.body.velocity.x = -this.speed;
                        this.sprite.body.velocity.y = 0;
                        this.sprite.animations.play('left');
                        this.emitPlayerData()

                        // Right 8
                    } else if (isDown(game, KEYS.D)) {
                        this.sprite.body.velocity.x = this.speed;
                        this.sprite.body.velocity.y = 0;
                        this.sprite.animations.play('right');
                        this.emitPlayerData()

                        // Still 0
                    } else {
                        this.sprite.animations.stop();
                        this.sprite.body.velocity.x = 0;
                        this.sprite.body.velocity.y = 0;


                    }

                    // Brings the player's sprite to top
                    game.world.bringToTop(this.sprite);

                    this.updatePlayerName();
                    this.updatetierImage();
                    //this.updatePlayerStatusText('HP', this.sprite.body.x - 16, this.sprite.body.y - 20, this.speedText);
                    this.updateHealthbar();
                }
            },



            emitPlayerData () {
                // Emit the 'move-player' event, updating the player's data on the server
                socket.emit('move-player', {
                    x: this.sprite.body.x,
                    y: this.sprite.body.y,
                    angle: this.sprite.body.rotation,
                    type: this.type,
                    attack_damage: this.attack_damage,
                    attack_speed: this.attack_speed,
                    attack_range: this.attack_range,
                    playerName: {
                        name: this.playerName.text,
                        x: this.playerName.x,
                        y: this.playerName.y
                    },
                    tierImage:{
                        grade: this.tierImage.grade,
                        x: this.tierImage.x,
                        y: this.tierImage.y
                    },
                    speed: {
                        value: this.speed,
                        x: this.speedText.x,
                        y: this.speedText.y
                    },
                    HP: {
                        val: this.HP
                    }
                })
            },

            updateHealthbar(x = this.sprite.body.x+16, y = this.sprite.body.y + 46){
                this.healthbar.setPosition(x, y);
            },
            //updatePlayerName (name = this.socket.id, x = this.sprite.body.x - 57, y = this.sprite.body.y - 49) {

            updatePlayerName (name = LoginID, x = this.sprite.body.x+16, y = this.sprite.body.y - 10) {
                // Updates the player's name text and position
                this.playerName.text = String(name);
                if(name == clientID){
                    this.playerName.fill = '#f7bf12';

                }else {
                    this.playerName.fill = '#f70008';

                }
                this.playerName.x = x;
                this.playerName.y = y;
                // Bring the player's name to top
                game.world.bringToTop(this.playerName)
            },

            updatetierImage (grade = this.tierImage.grade, x = this.playerName.x - this.playerName.width/2 - 16, y = this.sprite.body.y - 14) {
                // Updates the player's name text and position
                let tier_grade = 'tier-'+(grade+1);
                this.tierImage.loadTexture(tier_grade , 0);
                this.tierImage.x = x;
                this.tierImage.y = y;
                // Bring the player's name to top
                game.world.bringToTop(this.tierImage)
            },

            updatePlayerStatusText (status, x, y, text) {
                // Capitalize the status text
                const capitalizedStatus = status[0].toUpperCase() + status.substring(1);
                let newText = '';
                // Set the speed text to either 0 or the current speed
                this[status] < 0 ? this.newText = 0 : this.newText = this[status];
                // Updates the text position and string
                text.x = x;
                text.y = y;
                text.text = `${capitalizedStatus}: ${parseInt(this.newText)}`;
                //text.text = "HP : " +  text;
                game.world.bringToTop(text)
            }
        };
        return player
    },


    createText: function(game, target){
        // Phaser - text: function(x, y, text, style)
        return game.add.text(target.x, target.y, '', {
            font: 'bold 14px monospace',
            fill: '#fff',
            align: 'center',
            stroke: '#000',
            strokeThickness: 2
        })
    },

    createTier: function (game, location, grade) {
        let Tier_grade = 'tier-' + (grade+1);

        var Tier = game.add.image(location.x, location.y, Tier_grade);
        Tier.scale.setTo(0.2);

        return Tier;
    },

    newPlayer: function(socket, player){
        console.log("NewPlayer ", socket);
        //socket.on('connect', () => {
            socket.emit('new-player', {
                x: player.sprite.body.x,
                y: player.sprite.body.y,
                angle: player.sprite.rotation,
                type: player.type,
                attack_damage: player.attack_damage,
                attack_speed: player.attack_speed,
                attack_range: player.attack_range,
                playerName: {
                    name: String(LoginID),
                    x: player.playerName.x,
                    y: player.playerName.y
                },
                tierImage:{
                    grade: 0,
                    x: player.tierImage.x,
                    y: player.tierImage.y
                },
                speed: {
                    value: player.speed,
                    x: player.speed.x,
                    y: player.speed.y
                },
                HP: {
                    val: player.HP
                }
            })
        //})
    },

    updatePlayers: function(socket, others, game){
        console.log("other up " + Object.keys(others).length + " / " + socket.id);

        socket.on('update-players', playersData => {
            if(!endingstage){
                let playersFound = {};
                //console.log("2 other player create ",playersData);

                this.player.tierImage.grade = playersData[clientID].tierImage.grade;
                //console.log("asdfasfasfdsafa : " + playersData[clientID].tierImage.grade + " / " + this.player.tierImage.grade);

                //this.player.HP = playersData[clientID].HP;
                // Iterate over all players
                //console.log("server recive player data " , playersData);

                for (let index in playersData) {
                    //console.log("other for " + Object.keys(others).length + " / " + socket.id);

                    const data = playersData[index];
                    // In case a player hasn't been created yet
                    // We make sure that we won't create a second instance of it
                    //if (others[index] === undefined && index !== socket.id) {
                    if (others[index] === undefined && index !== LoginID) {
                        console.log("2 other player create " + data.type);

                        const newPlayer = this.createplayerdata(data.x, data.y, game, socket, data.type);
                        newPlayer.playerName = this.createText(game, newPlayer);
                        newPlayer.playerName.anchor.setTo(0.5, 0.5);
                        newPlayer.speedText = this.createText(game, newPlayer);
                        newPlayer.tierImage = this.createTier(game, newPlayer, data.tierImage.grade);
                        newPlayer.tierImage.anchor.setTo(0.5, 0.5);

                        let health_config = {x: newPlayer.sprite.body.x + 16, y: newPlayer.sprite.body.y + 46, width: 20, height: 5,
                            bg: {
                                color: '#440105'
                            },
                            bar: {
                                color: '#c50004'
                            }
                        };
                        newPlayer.healthbar = new HealthBar(game, health_config);
                        newPlayer.healthbar.setPercent(100);
                        newPlayer.updatePlayerName(data.playerName.name, data.playerName.x, data.playerName.y);

                        if(data.type === 'warrior_m' || data.type === 'warrior_f'){
                            newPlayer.sprite.weapon = this.generateAttacks('sword', 50);
                        }else if(data.type === 'mage_m' || data.type === 'mage_f'){
                            newPlayer.sprite.weapon = this.generateAttacks('fireball', 50);
                        }else if(data.type === 'healer_m' || data.type === 'healer_f'){
                            newPlayer.sprite.weapon = this.generateAttacks('spell', 50);
                        }else if(data.type === 'ranger_m' || data.type === 'ranger_f'){
                            newPlayer.sprite.weapon = this.generateAttacks('arrow', 50);
                        }else {
                            newPlayer.sprite.weapon = this.generateAttacks('sword', 50);
                        }
                        newPlayer.sprite.name = data.playerName.name;
                        console.log("313 other player create : " + newPlayer.sprite.name +" / " + Object.keys(others).length + " / " + data.type);
                        others[index] = newPlayer;
                        playerGroup.add(others[index].sprite);
                        //otherswordGroup.moveAll(others[index].sword);
                        //game.world.bringToTop(others[index].sprite);
                        game.world.bringToTop(playerGroup);

                    }
                    //console.log("333 : data : " + data.playerName.name + " / " + data.HP.val);
                    if(clientID === data.playerName.name ){
                        this.player.HP = data.HP.val;
                        this.player.healthbar.setPercent(this.player.HP/Class_STATS_DATA[this.player.type].HP * 100);

                        //console.log("336 : data : " + this.player.HP + " / " + data.HP.val);
                    }

                    playersFound[index] = true;

                    // Update players data
                    //if (index !== socket.id) {
                    if (index !== LoginID) {

                        // Update players target but not their real position
                        others[index].target_x = data.x;
                        others[index].target_y = data.y;
                        others[index].target_rotation = data.angle;

                        others[index].attack_damage = data.attack_damage;
                        others[index].attack_speed = data.attack_speed;
                        others[index].attack_range = data.attack_range;

                        others[index].playerName.target_x = data.playerName.x;
                        others[index].playerName.target_y = data.playerName.y;

                        others[index].speedText.target_x = data.speed.x;
                        others[index].speedText.target_y = data.speed.y;

                        others[index].tierImage.target_x = data.tierImage.x;
                        others[index].tierImage.target_y = data.tierImage.y;

                        others[index].speed = data.speed.value;

                        others[index].HP = data.HP.val;
                        others[index].healthbar.setPercent(others[index].HP/Class_STATS_DATA[others[index].type].HP * 100);

                    }
                }

                // Check if there's no missing players, if there is, delete them
                for (let id in others) {
                    if (!playersFound[id]) {
                        others[id].sprite.destroy();
                        others[id].playerName.destroy();
                        others[id].speedText.destroy();
                        others[id].tierImage.destroy();
                        others[id].healthbar.kill();
                        delete others[id];
                    }
                }
            }
        })
    },

    playerMovementInterpolation: function(otherPlayers) {
        for (let id in otherPlayers) {
            let player = otherPlayers[id];
            if (player.target_x !== undefined) {
                // Interpolate the player's position
                player.sprite.body.x += (player.target_x - player.sprite.body.x) * 0.30;
                player.sprite.body.y += (player.target_y - player.sprite.body.y) * 0.30;

                let angle = player.target_rotation;
                let direction = (angle - player.sprite.body.rotation) / (Math.PI * 2);
                direction -= Math.round(direction);
                direction *= Math.PI * 2;
                player.sprite.body.rotation += direction * 0.30;


                //상대방의 이름위치 옮겨주는 부분
                player.playerName.x = player.sprite.body.x + 16;
                player.playerName.y = player.sprite.body.y - 10;


                //상대방의 체력표시 위치 옮겨주는 부분
                /*player.speedText.x = player.sprite.body.x - 16;
                player.speedText.y = player.sprite.body.y - 20;*/

                //상대방의 티어이미지 위치 옮겨주는 부분
                player.tierImage.x = player.playerName.x - player.playerName.width/2 - 16;
                player.tierImage.y = player.sprite.body.y - 14;

                player.healthbar.setPosition(player.sprite.body.x + 16, player.sprite.body.y + 46);

                // 상대방 케릭터 방향에 따른 애니메이션 보여주는 부분
                if(player.target_x > player.sprite.body.x -0.1 && player.target_x < player.sprite.body.x +0.1
                    &&  player.target_y > player.sprite.body.y -0.1 && player.target_y < player.sprite.body.y +0.1 ){
                    player.sprite.animations.stop();

                } else if (player.target_y > player.sprite.body.y
                    && player.target_x > player.sprite.body.x -0.1 && player.target_x < player.sprite.body.x +0.1){
                    player.sprite.animations.play('down');

                } else if (player.target_y < player.sprite.body.y
                    && player.target_x > player.sprite.body.x -0.1 && player.target_x < player.sprite.body.x +0.1) {
                    player.sprite.animations.play('up');

                } else if(player.target_x > player.sprite.body.x
                    && player.target_y > player.sprite.body.y -0.1 && player.target_y < player.sprite.body.y +0.1){
                    player.sprite.animations.play('right');

                } else if (player.target_x < player.sprite.body.x
                    && player.target_y > player.sprite.body.y -0.1 && player.target_y < player.sprite.body.y +0.1){
                    player.sprite.animations.play('left');

                }

                player.updatePlayerStatusText('HP', player.speedText.x, player.speedText.y, player.speedText);
            }
        }
    },

    attack(attacker, point){
        //console.log(this.game.time.now + " time " + attacker.sword.next + " ! " + attacker.sword.rate + " // " + attacker.sprite.alive + " // " + attacker.sword.countDead());
        if (attacker.alive && this.game.time.now > attacker.sprite.weapon.next && attacker.sprite.weapon.countDead() > 0) {
            //attacker.sprite.weapon.next = this.game.time.now + attacker.sprite.weapon.rate;
            attacker.sprite.weapon.next = this.game.time.now + attacker.attack_speed;
            //console.log(attacker.weapon.next + " ti123123me " + attacker.weapon.name + "!");

            //attacks.next = attacks.rate + 1;
            var a = attacker.sprite.weapon.getFirstDead();
            a.scale.setTo(1.5);
            //a.name = attacker.sprite.name;
            //a.strength = attacker.sprite.strength;
            a.reset(attacker.sprite.x + 16, attacker.sprite.y + 16);
            a.lifespan = attacker.attack_range; // 투사체가 얼마동안 살아있는지
            //console.log(attacker.playerName.name + " used " + attacker.weapon.name + "!");
            //if (attacks.name === 'weapon') {
                //console.log("???");
                a.rotation = this.game.physics.arcade.moveToXY(a, point.worldX, point.worldY, attacker.attack_range);
                this.attackSound.play();
                //game.attackSound.play();

           // }
        }
    },

    otherAttack(){
        socket.on('update-attack', attackdata => {
            //console.log("recevie attack!!");
            // Iterate over all players
                const data = attackdata;
                // In case a player hasn't been created yet
                // We make sure that we won't create a second instance of it

                if (otherPlayers[attackdata.sendingid] !== undefined && attackdata.sendingid !== LoginID) {
                    //console.log("others attack!!" + otherPlayers[attackdata.sendingid] + " / " + attackdata.sendingid);

                    /*otherPlayers[attackdata.sendingid].sprite.weapon.rate = 1000 - (otherPlayers[attackdata.sendingid].speed * 4);
                    if (otherPlayers[attackdata.sendingid].sprite.weapon.rate < 200) {
                        otherPlayers[attackdata.sendingid].sprite.weapon.rate = 200;
                    }*/
                    //otherPlayers[attackdata.sendingid].sprite.weapon.range = this.player.sprite.strength * 6; //투사체 속도
                    this.attack(otherPlayers[attackdata.sendingid], data.point);
                }else {
                    //console.log("attack!!" + this.player.sprite.weapon.name + " / " + attackdata.sendingid);

                    /*this.player.sprite.weapon.rate = 1000 - (this.player.speed * 4);
                    if (this.player.sprite.weapon.rate < 200) {
                        this.player.sprite.weapon.rate = 200;
                    }
                    this.player.sprite.weapon.range = this.player.sprite.strength * 6; //투사체 속도*/
                    this.attack(this.player, data.point);
                }
        });
    },


    generateWorld(){
       // socket = io(SERVER_IP);
        this.corpses = this.game.add.group();

            //socket.on('connect', () => {
        socket.emit('new-game', null);
            //});
        console.log("new!! : " + LoginID);

            socket.on('generate-world', data => {
                if(!endingstage) {
                    console.log("MakeWolrd", data, isGameReady);
                    if (!isGameReady) {

                        GameBasicData = data.GameBasicData;
                        Class_STATS_DATA = data.CLASS_STATS;

                        console.log("MakeWolrd" + GameBasicData.ObstaclesNumber);
                        console.log("CLASS STATS", Class_STATS_DATA);
                        this.player = {};
                        console.log("first" + Object.keys(this.player).length);

                        playerGroup = this.game.add.group();
                        //otherswordGroup = this.game.add.group();

                        this.game.world.setBounds(0, 0, GameBasicData.worldSizeX, GameBasicData.worldSizeY);
                        this.background = this.game.add.tileSprite(0, 0, GameBasicData.worldSizeX, GameBasicData.worldSizeY, 'tiles', 64);
                        //this.background = this.game.add.tileSprite(0, 0, GameBasicData.worldSizeX, GameBasicData.worldSizeY, 'ground', 0);
                        this.background.scale.setTo(2); // 스케일 설정하는 부분

                        this.player = this.createplayerdata(Math.random() * GameBasicData.worldSizeX, Math.random() * GameBasicData.worldSizeY / 2, this.game, socket, this.character_type);
                        this.player.playerName = this.createText(this.game, this.player.sprite.body);
                        this.player.playerName.anchor.setTo(0.5, 0.5);
                        //speedtext라고 되어있지만 hptext이다..
                        this.player.speedText = this.createText(this.game, this.player.sprite.body);
                        //티어이미지
                        this.player.tierImage = this.createTier(this.game, this.player.sprite.body, 0);
                        this.player.tierImage.anchor.setTo(0.5, 0.5);

                        let health_config = {x: this.player.sprite.body.x + 16, y: this.player.sprite.body.y + 46, width: 20, height: 5,
                            bg: {
                                color: '#440105'
                            },
                            bar: {
                                color: '#c50004'
                            }
                        };
                        this.player.healthbar = new HealthBar(this.game, health_config);
                        this.player.healthbar.setPercent(100);

                        this.newPlayer(socket, this.player);
                        otherPlayers = {};
                        console.log("other first " + Object.keys(otherPlayers).length + " / " + socket.id);
                        this.updatePlayers(socket, otherPlayers, this.game);


                        if (this.character_type === 'warrior_m' || this.character_type === 'warrior_f') {
                            this.player.sprite.weapon = this.generateAttacks('sword', 50);
                        } else if (this.character_type === 'mage_m' || this.character_type === 'mage_f') {
                            this.player.sprite.weapon = this.generateAttacks('fireball', 50);
                        } else if (this.character_type === 'healer_m' || this.character_type === 'healer_f') {
                            this.player.sprite.weapon = this.generateAttacks('spell', 50);
                        } else if (this.character_type === 'ranger_m' || this.character_type === 'ranger_f') {
                            this.player.sprite.weapon = this.generateAttacks('arrow', 50);
                        } else {
                            this.player.sprite.weapon = this.generateAttacks('sword', 50);
                        }

                        this.generateObstacles();
                        this.generateCollectables();


                        //맞았을때 테두리에 빨간 이미지를 띄워줌
                        hit_image = this.game.add.sprite(0, 0, 'hit_border');
                        hit_image.width = this.game.width; // 크기 세팅
                        hit_image.height = this.game.height;
                        //hit_image.anchor.setTo(0., 0.5);
                        hit_image.alpha = 0;
                        hit_image.fixedToCamera = true;
                        hit_tween = this.game.add.tween(hit_image).to({alpha: 0}, 1000, Phaser.Easing.Linear.None, true);
                        //이미지 처리 트윈


                        this.border = this.game.add.image(0, 0, 'borderw');
                        this.border.width = this.game.width; // 크기 세팅
                        this.border.height = this.game.height;
                        this.border.fixedToCamera = true;
                        //hit_tween.pause();
                        isGameReady = true;

                        this.infobar = this.game.add.graphics();
                        this.infobar.beginFill(0xffffff, 0.6);
                        this.infobar.drawRect(20, 20,  400, 50);
                        this.infobar.fixedToCamera = true;


                    }
                }

            });

            socket.on('died-player', data => {
                console.log("died player : ", data);

                if(clientID === data.playerName.name){
                    console.log("died player : " + data.playerName.name + " / " + clientID);

                    //socket.emit('disconnect');
                    this.player.alive = false;
                    this.player.sprite.destroy();
                    this.player.playerName.destroy();
                    this.player.speedText.destroy();
                    this.player.tierImage.destroy();
                    this.player = {};
                    isGameReady = false;
                    this.gameOver();

                }else {

                    //var corpse = this.corpses.create(data.x, data.y, 'dead');
                    var corpse = this.game.add.sprite(data.x, data.y, 'tombstone');
                    console.log("corpse : ", data.x + " , " + data.y);
                    corpse.animations.add('idle', [0], 0, true);
                    corpse.animations.play('idle');
                    corpse.scale.setTo(1);

                    corpse.lifespan = 3000;
                    //this.game.world.bringToTop(corpse);


                }
            });

    },


    // Runs once at start of game
    create: function () {
        this.game.sound.boot();

        // Generate in order of back to front
        //this.player = {};
        playerGroup = this.game.add.group();
        gameovermessge = false;
        /*CollectableNumber = 20; // 상자뿌리는 개수
        ObstaclesNumber = 20; // 오브젝트수
        enemyNumber = 5; // 적 등장수
        kill_enemy = 0;
        Stage = 1;
        Bossgen = false;*/

        //console.log("worldX : " + worldSizeX + " worldY : " + worldSizeY);

        //this.generateGrid(worldSizeX, worldSizeY);


        //otherswordGroup = this.game.add.group();

        /*this.player = this.createplayerdata(Math.random() * GameBasicData.worldSizeX, Math.random() * GameBasicData.worldSizeY / 2, this.game, socket);
        this.player.playerName = this.createText(this.game, this.player.sprite.body);
        //this.player.speedText = this.createText(this.game, this.player.sprite.body);

        this.newPlayer(socket, this.player);
        //this.updatePlayers(socket, otherPlayers, this.game);
        this.player.sprite.name = socket.id;*/


        // Initialize data
        this.notification = '';
        this.spellCooldown = 0;
        this.gold = 0;
        this.xp = 0;
        this.xpToNext = 20;
        this.goldForBoss = 5000;
        this.bossSpawned = false;
        this.bossColorIndex = 0;



        // Generate objects


        // Generate player and set camera to follow
        //this.player = this.generatePlayer();

        //playerAttacks = this.generateAttacks('sword', 50);
       /* this.playerSpells = this.generateAttacks('spell', 50);
        this.bossAttacks = this.generateAttacks('spellParticle', 5,2000, 300);
        this.bossAttacks = this.generateAttacks('fireball', 1, 2000, 300);*/

        // Generate enemies - must be generated after player and player.level
        //this.generateEnemies(enemyNumber);

        // Generate bosses
        this.bosses = this.game.add.group();
        this.bosses.enableBody = true;
        this.bosses.physicsBodyType = Phaser.Physics.ARCADE;

        // Music
        this.music = this.game.add.audio('overworldMusic');
        this.music.loop = true;
        this.music.play();

        // Sound effects
        this.generateSounds();

        // Set the controls
        this.controls = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            spell: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        };



        //this.game.world.bringToTop(this.hit_image);
        //this.hit_image.alpha = 0.5;

        // Set the camera
        /*this.showLabels();

        bar = this.game.add.graphics();
        bar.beginFill(0x000000, 0.2);
        bar.drawRect(0, 100, 800, 100);

        bar.visible = false;

        var style = { font: 'bold 40px Arial', fill: '#eff714', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" };
        testLabel = this.game.add.text(0, 0, text, style);
        testLabel.fixedToCamera = true;
        testLabel.stroke = '#000000';
        testLabel.strokeThickness = 8;
        testLabel.setTextBounds(0, 100, 800, 100);

        var style = { font: 'bold 40px Arial', fill: '#ff0c00', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" };
        BossShow = this.game.add.text(0, 0, text, style);
        BossShow.fixedToCamera = true;
        BossShow.stroke = '#000000';
        BossShow.strokeThickness = 8;
        BossShow.setTextBounds(0, 200, 800, 100);
        BossShow.text = "보스등장!!";
        BossShow.visible = false;


        bar.visible = true;
        testLabel.visible = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadeText, this);
        testLabel.text = "Stage : " + Stage;*/



        //console.log("PlayerID : " + playerid);
        this.otherAttack();
        //this.reduceDamage();

        this.idcheck = false;

    },

    getTheMapDatatoServer(data){ //서버에게 받은 맵데이터 저장하는 메소드

        Dungeon = data;
        console.log(Dungeon);

    },
    getCoordinates(pointer){
        Client.sendClick(pointer.worldX,pointer.worldY);
    },

    /*attack(pointer){
        console.log("where mouse? :" + pointer.worldX + " / " + pointer.worldY);
        Client.attackClick(pointer.worldX, pointer.worldY, playerid);
    },*/

    movePlayer(id,x,y){
        var player = playerMap[id];
        console.log("getMove ID : " + id + " | " + x + " / " + y);
        //Unnamegame.game.physics.arcade.moveToXY(player, x, y, player.speed);
        var distance = Phaser.Math.distance(player.x,player.y,x,y);
        var tween = Unnamegame.game.add.tween(player);
        var duration = distance*10;
        tween.to({x:x,y:y}, duration);
        tween.start();

        if(player.x < x){
            player.animations.play('right');
        }else if(player.x > x){
            player.animations.play('left');
        }else if(player.y < y){
            player.animations.play('down');
        }else if(player.y > y){
            player.animations.play('up');
        }else {
            player.animations.stop();
        }
    },

    /*attackPlayer(id, x, y){
        playerAttacks.rate = 1000 - (playerMap[id].speed * 4);
        if (playerAttacks.rate < 200) {
            playerAttacks.rate = 200;
        }
        playerAttacks.range = playerMap[id].strength * 6; //투사체 속도
        this.attacking(playerMap[id], playerAttacks, x, y);

    },*/

    refreshgroup: function () {
        //Client.
    },

    sendingAttack(point){

        let attack_data = { name: LoginID, x:point.worldX, y:point.worldY  };

        socket.emit('attack-player', attack_data);
        console.log("sending attack!!");

    },
    //화면 갱신부분
    // Checks for actions and changes
    update: function () {
        //console.log("?? : " + isGameReady + " / " );




        if(isGameReady && this.player.HP <= 0){
            this.player.alive = false;
        }else if(isGameReady && this.player.HP > 0){
            this.player.alive = true;

        }

        //console.log("792 alive ? : " + this.player.alive);
        if(isGameReady && this.player.alive) {
            //console.log("794 alive ? : " + this.player.alive);



            this.player.pHandler(this.game);
            this.game.camera.follow(this.player.sprite);
            this.playerMovementInterpolation(otherPlayers);
            this.collisionHandler();
            //onsole.log("attack count : " + playerAttacks);


            if (this.game.input.activePointer.leftButton.isDown) {

                //console.log(this.game.input.activePointer.worldX + ' / ' + this.game.input.activePointer.worldY);
                this.sendingAttack(this.game.input.activePointer);
                //console.log("sending attack!!2")
            }

            this.game.world.bringToTop(this.border);
            this.game.world.bringToTop(this.infobar);


            /*if(this.player.HP <= 0){
                this.player.sprite.alive = false;
                if (!this.player.sprite.alive) {
                    this.deathHandler(this.player.sprite);

                    if(!gameovermessge){
                        gameovermessge = true;
                        let bar2 = this.game.add.graphics();
                        bar2.beginFill(0x000000, 0.2);
                        bar2.drawRect(0, 0,  this.game.width, this.game.height*2);

                        var style = { font: 'bold 100px Arial', fill: '#f70008', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" };
                        testLabel = this.game.add.text(0, 0, "GAME OVER", style);
                        testLabel.fixedToCamera = true;
                        testLabel.stroke = '#000000';
                        testLabel.strokeThickness = 8;
                        testLabel.setTextBounds(this.game.width/2 - 400, this.game.height/2, 800, 100);
                    }

                    this.game.time.events.add(2000, this.gameOver, this);
                }
            }*/


            //this.InputKey();



            //this.refreshgroup();





          /*  this.;playerHandler();
            //this.enemyHandler();
            //this.bossHandler();
            this.collisionHandler()*/


            /*this.collectables.forEachDead(function (collectable) {
                collectable.destroy();
            });


            if(kill_enemy === enemyNumber){
                kill_enemy = 0;
                enemyNumber += 5;
                Stage++;
                this.generateEnemies(enemyNumber);

                bar.visible = true;
                testLabel.visible = true;
                this.game.time.events.add(Phaser.Timer.SECOND * 2, this.fadeText, this);
                testLabel.text = "Stage : " + Stage;

            }*/


            //this.notificationLabel.text = this.notification;
            //this.xpLabel.text = 'Lvl. ' + playerMap[playerid].level + ' - ' + this.xp + ' XP / ' + this.xpToNext + ' XP';
            //this.goldLabel.text = this.gold + ' Gold';
            //this.healthLabel.text = playerMap[playerid].health + ' / ' + playerMap[playerid].vitality;
            //var MNumber = enemyNumber - kill_enemy;
            //this.MonsterNumberLabel.text = "현재 남은 몬스터 수 : " + MNumber;


            /*if(this.player.x <= 0){
                worldSizeX = 1000;
                worldSizeY = 1000;
                this.create();
            }*/

        }
    },

    fadeText: function(){
        bar.visible = false;
        testLabel.visible = false;

    },

    playerHandler: function() {

        //if (playerMap[playerid].alive) {
            //this.playerMovementHandler();

            // Attack towards mouse click
            /*if (this.game.input.activePointer.rightButton.isDown) {
                this.playerAttacks.rate = 1000 - (playerMap[playerid].speed * 4);
                if (this.playerAttacks.rate < 200) {
                    this.playerAttacks.rate = 200;
                }
                this.playerAttacks.range = playerMap[playerid].strength * 6; //투사체 속도
                this.attacking(playerMap[playerid], this.playerAttacks);
            }*/

            // Use spell when spacebar is pressed
           /* if (this.game.time.now > this.spellCooldown) {
                this.spellLabel.text = "READY!";
*/
                /*if (this.controls.spell.isDown) {
                    this.playerSpells.rate = 1000; // 투사체 살아있는 시간
                    this.playerSpells.range = this.player.strength * 6; //투사체속도
                    this.attack(this.player, this.playerSpells);
                    //this.spellCooldown = this.game.time.now + 10;
                    this.spellCooldown = 10;
                }*/
           /* } else {
                this.spellLabel.text = "RECHARGING...";
            }*/

            /*if (playerMap[playerid].health > playerMap[playerid].vitality) {
                playerMap[playerid].health = playerMap[playerid].vitality;
            }*/

            if (this.xp >= this.xpToNext) {
                this.levelUp();
            }
       // }

        /*if (!this.player.alive) {
            this.deathHandler(this.player);

            if(!gameovermessge){
                gameovermessge = true;
                let bar2 = this.game.add.graphics();
                bar2.beginFill(0x000000, 0.2);
                bar2.drawRect(0, 0, 800, 600);

                var style = { font: 'bold 100px Arial', fill: '#f70008', align: 'center', boundsAlignH: "center", boundsAlignV: "middle" };
                testLabel = this.game.add.text(0, 0, "GAME OVER", style);
                testLabel.fixedToCamera = true;
                testLabel.stroke = '#000000';
                testLabel.strokeThickness = 8;
                testLabel.setTextBounds(0, this.game.height/2-40, 800, 100);

            }

            this.game.time.events.add(2000, this.gameOver, this);
        }*/
    },

    enemyHandler: function() {

        this.enemies.forEachAlive(function(enemy) {
            if (enemy.visible && enemy.inCamera) {
                //moveToObject : 적이 나에게 다가오도록 해주는 메소드
                this.game.physics.arcade.moveToObject(enemy, this.player, enemy.speed);
                this.enemyMovementHandler(enemy);
            }

        }, this);

        this.enemies.forEachDead(function(enemy) {
            if (this.rng(0, 5)) { // 랜덤처리 부분
                this.generateGold(enemy);
            } else if (this.rng(0, 2)) {
                this.generatePotion(enemy);
                this.notification = enemy.name + ' 가 포션을 드랍했습니다!';
            }
            this.xp += enemy.reward;
            kill_enemy++;
            //this.generateEnemy(this.enemies); // 몬스터가 죽으면 바로 생성해준다.
            this.deathHandler(enemy);
        }, this);
    },

    bossHandler: function() {

        // Spawn boss if player obtains enough gold
        //if (this.gold > this.goldForBoss && !this.bossSpawned) {
        if (Stage%5 === 0 && !this.bossSpawned) {
            BossShow.visible = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 2, function () {BossShow.visible = false} , this);

            Bossgen = true;
            this.bossSpawned = true;
            this.goldForBoss += 5000;
            var boss = this.generateDragon(this.bossColorIndex);
            this.dragonSound.play();
            this.notification = boss.name + ' 가 나타났습니다!';
        }

        this.bosses.forEachAlive(function(boss) {
            if (boss.visible && boss.inCamera) {
                this.game.physics.arcade.moveToObject(boss, this.player, boss.speed);
                this.enemyMovementHandler(boss);
                this.attack(boss, this.bossAttacks);
            }
        }, this);

        this.bosses.forEachDead(function(boss) {
            Bossgen = false;
            this.bossSpawned = false;
            if (this.bossColorIndex === 7) {
                this.bossColorIndex = 0;
            } else {
                this.bossColorIndex++;
            }

            this.generateGold(boss);
            this.generateChest(boss);
            this.generateVitalityPotion(boss);
            this.generateStrengthPotion(boss);
            this.generateSpeedPotion(boss);
            this.notification = boss.name + ' 가 포션을 드랍했습니다!';
            this.xp += boss.reward;

            // Make the dragon explode
            var emitter = this.game.add.emitter(boss.x, boss.y, 100);
            emitter.makeParticles('flame');
            emitter.minParticleSpeed.setTo(-200, -200);
            emitter.maxParticleSpeed.setTo(200, 200);
            emitter.gravity = 0;
            emitter.start(true, 1000, null, 100);

            boss.destroy();
            Stage++;

        }, this);
    },

    collisionHandler: function() {

        /*this.game.physics.arcade.collide(playerMap, this.enemies, this.hit, null, this);
        this.game.physics.arcade.collide(playerMap, this.bosses, this.hit, null, this);
        this.game.physics.arcade.collide(playerMap, this.bossAttacks, this.hit, null, this);

        this.game.physics.arcade.collide(this.bosses, this.playerAttacks, this.hitcollide, null, this);
        this.game.physics.arcade.collide(this.enemies, this.playerAttacks, this.hitcollide, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.playerAttacks, this.hit, null, this);

        this.game.physics.arcade.collide(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.collide(this.enemies, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.playerSpells, this.hit, null, this);*/


/*
        오브젝트와의 충돌처리부분
*/
        // 다른 캐릭터와 오브젝트끼리 겹치지 않도록 처리
        this.game.physics.arcade.collide(this.obstacles, playerGroup, function () { }, null, this);
        // 오브젝트와 나의 공격이 맞았을때의 처리
        this.game.physics.arcade.collide(this.obstacles, this.player.sprite.weapon, this.hitobject, null, this);
        // 내 캐릭터와 오브젝트끼리 겹치지 않도록 처리
        this.game.physics.arcade.collide(this.obstacles, this.player.sprite);



        //this.game.physics.arcade.collide(this.obstacles, this.enemies, null, null, this);

/*
        this.game.physics.arcade.overlap(this.collectables, this.player, this.collect, null, this);
*/



        this.game.physics.arcade.collide(this.player.sprite, this.layer);

/*
        캐릭터간의 상호작용 부분
*/

        this.game.physics.arcade.collide(this.player.sprite, playerGroup, this.hittheenemy, null, null);


        //나 이외의 캐릭터간의 충돌처리는 담당하는 반복문, 각 캐릭터의 정보에 접근하기 위해 반복문을 돌린다.
        for(let index in otherPlayers){
            //내가 공격받를때 충돌처리하는 부분
            this.game.physics.arcade.collide(otherPlayers[index].sprite.weapon, this.player.sprite, this.hitme, null, null);
            //나 이외의 플레이어가 서로 공격할때
            this.game.physics.arcade.collide(otherPlayers[index].sprite.weapon, playerGroup, function (a, b) {
                a.lifespan = 1;
            });
            //다른 캐릭터가 오브젝트에게 공격을 할때 처리하는 부분
            this.game.physics.arcade.collide(otherPlayers[index].sprite.weapon, this.obstacles, function (a, b) {
                a.lifespan = 1;
            });


        }

        //내가 다른 사람을 공격하거나, 다른사람끼리 공격할때 충돌처리하는 부분
        this.game.physics.arcade.collide(this.player.sprite.weapon, playerGroup, function (attacks, target) {
            //console.log("who is hit?  : " + enemy.name + " / " + enemy.HP + " / " + clientID);
            attacks.lifespan = 1;

            socket.emit('damage-player-to', {
                attackID: clientID,
                damagedID: target.name
            })
        });

    },
    hitme: function(a, b){

        hit_image.alpha = 0.7;
        hit_tween.start();
        b.lifespan = 1;


    },

    hittheenemy: function(attacker, target){
        console.log("충돌  : " + clientID+ " / " + target.name);

    },

    showLabels: function() {

        var text = '0';
        //각종 효과?
        style = { font: '20px Arial', fill: '#fff', align: 'center' };
        this.notificationLabel = this.game.add.text(25, 25, text, style);
        this.notificationLabel.fixedToCamera = true;

        //체력라벨
        style = { font: '20px Arial', fill: '#ffd', align: 'center' };
        this.xpLabel = this.game.add.text(25, this.game.height - 25, text, style);
        this.xpLabel.fixedToCamera = true;

        //체력
        style = { font: '30px Arial', fill: '#f00', align: 'center' };
        this.healthLabel = this.game.add.text(this.game.width/2 - 50, this.game.height - 40, text, style);
        this.healthLabel.fixedToCamera = true;

        var style = { font: '20px Arial', fill: '#fff', align: 'center' };
        this.goldLabel = this.game.add.text(this.game.width - 125, this.game.height - 25, text, style);
        this.goldLabel.fixedToCamera = true;

        var style = { font: '20px Arial', fill: '#fff', align: 'center' };
        this.spellLabel = this.game.add.text(230, this.game.height - 25, text, style);
        this.spellLabel.fixedToCamera = true;

        //내가 테스트하려고 만든거


        var style = { font: '20px Arial', fill: '#f77000', align: 'center' };
        this.MonsterNumberLabel = this.game.add.text(this.game.width - 210, 30, text, style);
        this.MonsterNumberLabel.fixedToCamera = true;
        this.MonsterNumberLabel.stroke = '#FFFFFF';
        this.MonsterNumberLabel.strokeThickness = 8;
    },

    levelUp: function() {

        this.player.level++;
        this.player.vitality += 5;
        this.player.health += 5;
        this.player.strength += 1;
        this.player.speed += 1;
        this.xp -= this.xpToNext;
        this.xpToNext = Math.floor(this.xpToNext * 1.1);
        this.notification = this.player.name + ' 가 레벨업을 하였습니다. 레벨이 ' + this.player.level + ' 가 되었습니다!';
        this.levelSound.play();
        var emitter = this.game.add.emitter(this.player.x, this.player.y, 100);
        emitter.makeParticles('levelParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 100);
    },

    attacking: function (attacker, attacks, x, y) {
        console.log("어디공격하니? :" + x + " / " + y);

        /*if (attacker.alive && this.game.time.now > attacks.next && attacks.countDead() > 0) {
            attacks.next = this.game.time.now + attacks.rate;
            //attacks.next = attacks.rate;
            var a = attacks.getFirstDead();
            a.scale.setTo(1.5);
            a.name = attacker.name;
            a.strength = attacker.strength;
            a.reset(attacker.x + 16, attacker.y + 16);
            //a.lifespan = attacks.rate; // 투사체가 얼마동안 살아있는지
            console.log(attacker.name + " used " + attacks.name + "!");
            if (attacks.name === 'sword') {
                a.rotation = this.game.physics.arcade.moveToPointer(a, attacks.range);
                this.attackSound.play();
            } else if (attacks.name === 'spell') {
                a.rotation = this.game.physics.arcade.moveToPointer(a, attacks.range);
                a.effect = 'spell';
                a.strength *= 300;
                this.fireballSound.play();
            } else if (attacks.name === 'fireball') {
                a.rotation = this.game.physics.arcade.moveToObject(a, this.player, attacks.range);
                this.fireballSound.play();
            }
        }*/

        if (attacker.alive && Unnamegame.game.time.now > attacks.next && attacks.countDead() > 0) {
            attacks.next = Unnamegame.game.time.now + attacks.rate;
            //attacks.next = attacks.rate;
            var a = attacks.getFirstDead();
            a.scale.setTo(1.5);
            a.name = attacker.name;
            a.strength = attacker.strength;
            a.reset(attacker.x + 16, attacker.y + 16);
            //a.lifespan = attacks.rate; // 투사체가 얼마동안 살아있는지
            console.log(attacker.name + " used " + attacks.name + "!");
            if (attacks.name === 'sword') {
                a.rotation = Unnamegame.game.physics.arcade.moveToXY(a, x, y, attacks.range);
                Unnamegame.Game.prototype.attackSound.play();
            } /*else if (attacks.name === 'spell') {
                a.rotation = this.game.physics.arcade.moveToPointer(a, attacks.range);
                a.effect = 'spell';
                a.strength *= 300;
                this.fireballSound.play();
            } else if (attacks.name === 'fireball') {
                a.rotation = this.game.physics.arcade.moveToObject(a, this.player, attacks.range);
                this.fireballSound.play();
            }*/
        }



    },

    generateAttacks: function (name, amount, rate, range) {
        console.log("make weapon");

        // Generate the group of attack objects
        var attacks = this.game.add.group();
        attacks.enableBody = true;
        attacks.physicsBodyType = Phaser.Physics.ARCADE;
        attacks.createMultiple(amount, name);

        if (name === 'spell') { // 힐러용
            attacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3,4 ,5], 10, true);
            attacks.callAll('animations.play', 'animations', 'particle');
        } else if (name === 'fireball') { // 마법사용
            attacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3], 10, true);
            attacks.callAll('animations.play', 'animations', 'particle');
        }

        attacks.setAll('anchor.x', 0.5);
        attacks.setAll('anchor.y', 0.5);
        attacks.setAll('outOfBoundsKill', true);
        attacks.setAll('checkWorldBounds', true);

        attacks.rate = rate;
        attacks.range = range;
        attacks.next = 0;
        attacks.name = name;

        return attacks;
    },
    hitcollide: function(enemy, attacks){

        //attacks.kill();
        attacks.lifespan = 100;
        var emitter = this.game.add.emitter(attacks.x, attacks.y, 5);
        emitter.makeParticles('swordParticle');
        emitter.minParticleSpeed.setTo(-200, -200);
        emitter.maxParticleSpeed.setTo(200, 200);
        emitter.gravity = 0;
        emitter.start(true, 1000, null, 100);
        enemy.damage(attacks.strength);

    },

    hitobject: function(object, bullets){
        bullets.kill();

    },

    hit: function (target, attacker) {

        if (this.game.time.now > target.invincibilityTime) {
            target.invincibilityTime = this.game.time.now + target.invincibilityFrames;
            target.damage(attacker.strength);
            if (target.health < 0) {
                target.health = 0;
            }
            this.playSound(target.name);
            this.notification = attacker.name + ' 가 ' + attacker.strength + ' 만큼 ' + target.name + '에게 데미지를 입혔습니다!';

            if (attacker.effect === 'spell') {
                var emitter = this.game.add.emitter(attacker.x, attacker.y, 100);
                emitter.makeParticles('spellParticle');
                emitter.minParticleSpeed.setTo(-200, -200);
                emitter.maxParticleSpeed.setTo(200, 200);
                emitter.gravity = 0;
                emitter.start(true, 1000, null, 100);
                attacker.lifespan = 1000;
            }

        }
    },

    deathHandler: function (target) {

        var corpse = this.corpses.create(target.x, target.y, 'dead');
        corpse.scale.setTo(2);
        corpse.animations.add('idle', [target.corpseSprite], 0, true);
        corpse.animations.play('idle');
        corpse.lifespan = 3000;
        //target.destroy();
    },

    collect: function(player, collectable) {

        if (!collectable.collected) {
            collectable.collected = true;
            var gain;
            if (collectable.name === '골드') {
                gain = this.player.level + Math.floor(Math.random() * 10);
                this.gold += collectable.value;
                this.goldSound.play();
                this.notification =  collectable.value + ' 골드를 획득했습니다.';
                collectable.destroy();
            } else if (collectable.name === '상자') {
                collectable.animations.play('open');
                this.gold += collectable.value;
                this.goldSound.play();
                this.notification = '상자에서 ' + collectable.value + ' 골드를 찾았습니다!';
                collectable.lifespan = 1000;
            } else if (collectable.name === '힐링포션') {
                player.health += collectable.value;
                this.notification = '힐링포션을 마십니다, ' + collectable.value + ' 만큼 체력이 회복되었습니다.';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === '바이탈포션') {
                player.vitality += collectable.value;
                this.notification = '바이탈포션을 마십니다, ' + collectable.value + '만큼 체력이 증가했습니다!';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === '근력포션') {
                player.strength += collectable.value;
                this.notification = '근력포션을 마십니다,  ' + collectable.value + '만큼 근력이 증가했습니다.';
                this.potionSound.play();
                collectable.destroy();
            } else if (collectable.name === '스피드포션') {
                player.speed += collectable.value;
                this.notification = '스피드포션을 마십니다,   ' + collectable.value + '만큼 스피드가 증가했습니다.';
                this.potionSound.play();
                collectable.destroy();
            }

        }
    },

    generatePlayer: function (id, x, y) {

        // Generate the player
        //var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');
        var player = Unnamegame.game.add.sprite(x, y, 'characters');
        console.log("Where Player? : " + x + " / " + y);

        // Loop through frames 3, 4, and 5 at 10 frames a second while the animation is playing
        player.animations.add('down', [3, 4, 5], 10, true);
        player.animations.add('left', [15, 16, 17], 10, true);
        player.animations.add('right', [27, 28, 29], 10, true);
        player.animations.add('up', [39, 40, 41], 10, true);
        player.animations.play('down');
        player.scale.setTo(2);

        // Enable player physics;
        player.alive = true;

        playerid = id;
        console.log("ddPlayerID : " + playerid);

        player.name = id;
        player.level = 1;

        player.health = 100;
        player.vitality = 100;
        player.strength = 25;
        player.speed = 250; //125


        player.invincibilityFrames = 500;
        player.invincibilityTime = 0;

        player.corpseSprite = 1;

        playerMap[id] = player;

        playerGroup = Unnamegame.game.add.group();
        playerGroup.add(playerMap[id]);
        Unnamegame.game.physics.arcade.enable(playerGroup);
        playerMap[id].body.collideWorldBounds=true;
        //playerMap[id].body.enableBody = true;


        //playerGroup.visible = true;

        /*
                return player;
        */
        console.log("3 " + isGameReady);

    },

    removePlayer: function(id){
        console.log(playerMap);
        playerMap[id].destroy();
        delete playerMap[id];
    },

    setStats: function (entity, name, health, speed, strength, reward, corpseSprite) {

        entity.animations.play('down');
        entity.scale.setTo(2);

        entity.body.collideWorldBounds = true;
        entity.body.velocity.x = 0,
            entity.body.velocity.y = 0,
            entity.alive = true;
            entity.alive = true;

        entity.name = name;
        entity.level = this.player.level;
        entity.health = health + (entity.level * 2);
        entity.speed = speed + Math.floor(entity.level * 1.5);
        entity.strength = strength + Math.floor(entity.level * 1.5);
        entity.reward = reward + Math.floor(entity.level * 1.5);

        entity.invincibilityFrames = 300;
        entity.invincibilityTime = 0;

        entity.corpseSprite = corpseSprite;

        return entity;
    },

    generateEnemies: function (amount) { // 몬스터 생성 메소드, 정해진 숫자 만큼 몬스터를 생성해준다.

        this.enemies = this.game.add.group(); // 그룹으로 처리

        // Enable physics in them
        this.enemies.enableBody = true; // 몸통과 물리법칙을 적용시켜준다.
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < amount; i++) {
            this.generateEnemy();
        }
    },

    generateEnemy: function () { // 몬스터 한 개체를 상세히 만드는 메소드

        var enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, 'characters');

        do {
            enemy.reset(this.game.world.randomX, this.game.world.randomY);
        } while (Phaser.Math.distance(this.player.x, this.player.y, enemy.x, enemy.y) <= 400);

        var rnd = Math.random();
        if (rnd > 0 && rnd < .3) enemy = this.generateSkeleton(enemy);
        else if (rnd >= .3 && rnd < .4) enemy = this.generateSlime(enemy);
        else if (rnd >= .4 && rnd < .6) enemy = this.generateBat(enemy);
        else if (rnd >= .6 && rnd < .7) enemy = this.generateGhost(enemy);
        else if (rnd >= .7 && rnd < 1) enemy = this.generateSpider(enemy);


        console.log('Generated ' + enemy.name + ' with ' + enemy.health + ' health, ' + enemy.strength + ' strength, and ' + enemy.speed + ' speed.');

        return enemy;
    },

    generateEyes: function(enemy){

        enemy.animations.add('down', [9, 10, 11], 10, true);
        enemy.animations.add('left', [21, 22, 23], 10, true);
        enemy.animations.add('right', [33, 34, 35], 10, true);
        enemy.animations.add('up', [45, 46, 47], 10, true);

        return this.setStats(enemy, 'eyes', 100, 70, 20, 5, 6);

    },

    generateSkeleton: function (enemy) {

        enemy.animations.add('down', [9, 10, 11], 10, true);
        enemy.animations.add('left', [21, 22, 23], 10, true);
        enemy.animations.add('right', [33, 34, 35], 10, true);
        enemy.animations.add('up', [45, 46, 47], 10, true);

        return this.setStats(enemy, '스켈레톤', 100*10, 70, 20, 5, 6);
    },

    generateSlime: function (enemy) {

        enemy.animations.add('down', [48, 49, 50], 10, true);
        enemy.animations.add('left', [60, 61, 62], 10, true);
        enemy.animations.add('right', [72, 73, 74], 10, true);
        enemy.animations.add('up', [84, 85, 86], 10, true);

        return this.setStats(enemy, '슬라임', 300*10, 40, 50, 10, 7);
    },

    generateBat: function (enemy) {

        enemy.animations.add('down', [51, 52, 53], 10, true);
        enemy.animations.add('left', [63, 64, 65], 10, true);
        enemy.animations.add('right', [75, 76, 77], 10, true);
        enemy.animations.add('up', [87, 88, 89], 10, true);

        return this.setStats(enemy, '박쥐', 20*10, 200, 10, 2, 8);
    },

    generateGhost: function (enemy) {

        enemy.animations.add('down', [54, 55, 56], 10, true);
        enemy.animations.add('left', [66, 67, 68], 10, true);
        enemy.animations.add('right', [78, 79, 80], 10, true);
        enemy.animations.add('up', [90, 91, 92], 10, true);

        return this.setStats(enemy, '고스트', 200*10, 60, 30, 7, 9);
    },

    generateSpider: function (enemy) {

        enemy.animations.add('down', [57, 58, 59], 10, true);
        enemy.animations.add('left', [69, 70, 71], 10, true);
        enemy.animations.add('right', [81, 82, 83], 10, true);
        enemy.animations.add('up', [93, 94, 95], 10, true);

        return this.setStats(enemy, '거미', 50*10, 120, 12, 4, 10);
    },

    generateDragon: function (colorIndex) {

        var boss = this.bosses.create(this.player.x, this.player.y - 300, 'dragons');

        if (colorIndex === 0) {
            boss.animations.add('down', [0, 1, 2], 10, true);
            boss.animations.add('left', [12, 13, 14], 10, true);
            boss.animations.add('right', [24, 25, 26], 10, true);
            boss.animations.add('up', [36, 37, 38], 10, true);
        } else if (colorIndex === 1) {
            boss.animations.add('down', [3, 4, 5], 10, true);
            boss.animations.add('left', [15, 16, 17], 10, true);
            boss.animations.add('right', [27, 28, 29], 10, true);
            boss.animations.add('up', [39, 40, 41], 10, true);
        } else if (colorIndex === 2) {
            boss.animations.add('down', [6, 7, 8], 10, true);
            boss.animations.add('left', [18, 19, 20], 10, true);
            boss.animations.add('right', [30, 31, 32], 10, true);
            boss.animations.add('up', [42, 43, 44], 10, true);
        } else if (colorIndex === 3) {
            boss.animations.add('down', [9, 10, 11], 10, true);
            boss.animations.add('left', [21, 22, 23], 10, true);
            boss.animations.add('right', [33, 34, 35], 10, true);
            boss.animations.add('up', [45, 46, 47], 10, true);
        } else if (colorIndex === 4) {
            boss.animations.add('down', [57, 58, 59], 10, true);
            boss.animations.add('left', [69, 70, 71], 10, true);
            boss.animations.add('right', [81, 82, 83], 10, true);
            boss.animations.add('up', [93, 94, 95], 10, true);
        } else if (colorIndex === 5) {
            boss.animations.add('down', [54, 55, 56], 10, true);
            boss.animations.add('left', [66, 67, 68], 10, true);
            boss.animations.add('right', [78, 79, 80], 10, true);
            boss.animations.add('up', [90, 91, 92], 10, true);
        } else if (colorIndex === 6) {
            boss.animations.add('down', [51, 52, 53], 10, true);
            boss.animations.add('left', [63, 64, 65], 10, true);
            boss.animations.add('right', [75, 76, 77], 10, true);
            boss.animations.add('up', [87, 88, 89], 10, true);
        } else if (colorIndex === 7) {
            boss.animations.add('down', [48, 49, 50], 10, true);
            boss.animations.add('left', [60, 61, 62], 10, true);
            boss.animations.add('right', [72, 73, 74], 10, true);
            boss.animations.add('up', [84, 85, 86], 10, true);
        }

        console.log('Generated dragon!');

        return this.setStats(boss, '드래곤', 2000, 100, 50, 500, 0);
    },

   /* generateObstacles: function() {

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;

        var amount = ObstaclesNumber; // 수집품 젠수
        for (var i = 0; i < amount; i++) {
            var point = this.getRandomLocation();
            var spriteIndex = Math.floor(Math.random() * 10);
            this.generateObstacle(point, spriteIndex);
        }
    },*/

    generateObstacles: function() {
        //console.log("generate Ob " + GameBasicData.ObstaclesNumber);

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;

        for (var i = 0; i < GameBasicData.ObstaclesNumber; i++) {
            this.generateObstacle(GameBasicData.ObstaclesLocation[i].location, GameBasicData.ObstaclesLocation[i].spriteIndex);
        }
    },




    generateObstacle: function (location, spriteIndex) {

        var obstacle = this.obstacles.create(location.x, location.y, 'tiles');
        //var obstacle = this.obstacles.create(location.x, location.y, 'tree');

        //console.log("generate Ob : " + location.x + " / " + location.y + " / " + spriteIndex);

        if (spriteIndex === 0) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 1) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 2) {
            obstacle.animations.add('shrub', [20], 0, true);
            obstacle.animations.play('shrub');
        } else if (spriteIndex === 3) {
            obstacle.animations.add('pine', [30], 0, true);
            obstacle.animations.play('pine');
        } else if (spriteIndex === 4) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 5) {
            obstacle.animations.add('column', [39], 0, true);
            obstacle.animations.play('column');
        } else if (spriteIndex === 6) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 7) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 8) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 9) {
            obstacle.animations.add('tree', [38], 0, true);
            obstacle.animations.play('tree');
        }

        /*if (spriteIndex === 0) {
            obstacle.animations.add('tree', [0], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 1) {
            obstacle.animations.add('tree', [1], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 2) {
            obstacle.animations.add('shrub', [2], 0, true);
            obstacle.animations.play('shrub');
        } else if (spriteIndex === 3) {
            obstacle.animations.add('pine', [3], 0, true);
            obstacle.animations.play('pine');
        } else if (spriteIndex === 4) {
            obstacle.animations.add('tree', [4], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 5) {
            obstacle.animations.add('column', [5], 0, true);
            obstacle.animations.play('column');
        } else if (spriteIndex === 6) {
            obstacle.animations.add('tree', [6], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 7) {
            obstacle.animations.add('tree', [7], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 8) {
            obstacle.animations.add('tree', [1], 0, true);
            obstacle.animations.play('tree');
        } else if (spriteIndex === 9) {
            obstacle.animations.add('tree', [2], 0, true);
            obstacle.animations.play('tree');
        }*/
        obstacle.scale.setTo(2);
        obstacle.body.setSize(8, 8, 4, -2);

        /*
                obstacle.body.setSize(32, 48, 16, -6);
        */
        obstacle.body.moves = false;

        return obstacle;
    },

    /*generateCollectables: function () {

        this.collectables = this.game.add.group();
        this.collectables.enableBody = true;
        this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

        var amount = CollectableNumber; // 수집품수
        for (var i = 0; i < amount; i++) {
            var point = this.getRandomLocation();
            this.generateChest(point);
        }
    },*/
    generateCollectables: function () {

        this.collectables = this.game.add.group();
        this.collectables.enableBody = true;
        this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

        for (var i = 0; i < GameBasicData.CollectableNumber; i++) {
            this.generateChest(GameBasicData.CollectableLocation[i].location);
        }
    },


    generateChest: function (location) {

        var collectable = this.collectables.create(location.x, location.y, 'things');
        collectable.scale.setTo(2);
        collectable.animations.add('idle', [6], 0, true);
        collectable.animations.add('open', [18, 30, 42], 10, false);
        collectable.animations.play('idle');
        collectable.name = '상자';
        collectable.value = Math.floor(Math.random() * 150);

        return collectable;
    },

    generateGold: function (enemy) {

        var collectable = this.collectables.create(enemy.x, enemy.y, 'tiles');
        collectable.animations.add('idle', [68], 0, true);
        collectable.animations.play('idle');
        collectable.name = '골드';
        collectable.value = enemy.reward * 2;
        return collectable;
    },

    generatePotion: function (location) {

        var rnd = Math.random();
        if (rnd >= 0 && rnd < .7) {
            this.generateHealthPotion(location);
        } else if (rnd >= .7 && rnd < .8) {
            this.generateVitalityPotion(location);
        } else if (rnd >= .8 && rnd < .9) {
            this.generateStrengthPotion(location);
        } else if (rnd >= .9 && rnd < 1) {
            this.generateSpeedPotion(location);
        }
    },

    generateHealthPotion: function (location) {

        var collectable = this.collectables.create(location.x, location.y, 'potions');
        collectable.animations.add('idle', [0], 0, true);
        collectable.animations.play('idle');
        collectable.name = '힐링포션';
        collectable.value = 20 + Math.floor(Math.random() * 10) + this.player.level;
        return collectable;
    },

    generateVitalityPotion: function (location) {

        var collectable = this.collectables.create(location.x, location.y, 'potions');
        collectable.animations.add('idle', [2], 0, true);
        collectable.animations.play('idle');
        collectable.name = '바이탈포션';
        collectable.value = 4 + Math.floor(Math.random() * 10);
        return collectable;
    },

    generateStrengthPotion: function (location) {

        var collectable = this.collectables.create(location.x, location.y, 'potions');
        collectable.animations.add('idle', [3], 0, true);
        collectable.animations.play('idle');
        collectable.name = '근력포션';
        collectable.value = 1 + Math.floor(Math.random() * 10);
        return collectable;
    },

    generateSpeedPotion: function (location) {

        var collectable = this.collectables.create(location.x, location.y, 'potions');
        collectable.animations.add('idle', [4], 0, true);
        collectable.animations.play('idle');
        collectable.name = '스피드포션';
        collectable.value = 1 + Math.floor(Math.random() * 10);
        return collectable;
    },

    playSound: function (name) {

        if (name === this.player.name) {
            this.playerSound.play();

        } else if (name === '스켈레톤') {
            this.skeletonSound.play();

        } else if (name === '슬라임') {
            this.slimeSound.play();

        } else if (name === '박쥐') {
            this.batSound.play();

        } else if (name === '고스트') {
            this.ghostSound.play();

        } else if (name === '거미') {
            this.spiderSound.play();

        } else if (name === '드래곤') {
            this.dragonSound.play();
        }
    },



    InputKey: function(){
        // Up-Left
        if (this.controls.up.isDown && this.controls.left.isDown) {
            Client.sendKeyBoardInput(1)

            // Up-Right
        } else if (this.controls.up.isDown && this.controls.right.isDown) {
            Client.sendKeyBoardInput(2)

            // Down-Left
        } else if (this.controls.down.isDown && this.controls.left.isDown) {
            Client.sendKeyBoardInput(3)

            // Down-Right
        } else if (this.controls.down.isDown && this.controls.right.isDown) {
            Client.sendKeyBoardInput(4)

            // Up
        } else if (this.controls.up.isDown) {
            Client.sendKeyBoardInput(5)

            // Down
        } else if (this.controls.down.isDown) {
            Client.sendKeyBoardInput(6)

            // Left
        } else if (this.controls.left.isDown) {
            Client.sendKeyBoardInput(7)

            // Right
        } else if (this.controls.right.isDown) {
            Client.sendKeyBoardInput(8)

            // Still
        } else {
            Client.sendKeyBoardInput(0)

        }
    },

    playerMovementHandler: function (id, type) {

        // Up-Left 1
        if (type === 1) {
            playerMap[id].body.velocity.x = -playerMap[id].speed;
            playerMap[id].body.velocity.y = -playerMap[id].speed;
            playerMap[id].animations.play('left');

            // Up-Right 2
        } else if (type ===2) {
            playerMap[id].body.velocity.x = playerMap[id].speed;
            playerMap[id].body.velocity.y = -playerMap[id].speed;
            playerMap[id].animations.play('right');

            // Down-Left 3
        } else if (type === 3) {
            playerMap[id].body.velocity.x = -playerMap[id].speed;
            playerMap[id].body.velocity.y = playerMap[id].speed;
            playerMap[id].animations.play('left');

            // Down-Right 4
        } else if (type === 4) {
            playerMap[id].body.velocity.x = playerMap[id].speed;
            playerMap[id].body.velocity.y = playerMap[id].speed;
            playerMap[id].animations.play('right');

            // Up 5
        } else if (type === 5) {
            playerMap[id].body.velocity.x = 0;
            playerMap[id].body.velocity.y = -playerMap[id].speed;
            playerMap[id].animations.play('up');

            // Down 6
        } else if (type === 6) {
            playerMap[id].body.velocity.x = 0;
            playerMap[id].body.velocity.y = playerMap[id].speed;
            playerMap[id].animations.play('down');

            // Left 7
        } else if (type === 7) {
            playerMap[id].body.velocity.x = -playerMap[id].speed;
            playerMap[id].body.velocity.y = 0;
            playerMap[id].animations.play('left');

            // Right 8
        } else if (type === 8) {
            playerMap[id].body.velocity.x = playerMap[id].speed;
            playerMap[id].body.velocity.y = 0;
            playerMap[id].animations.play('right');

            // Still 0
        } else {
            playerMap[id].animations.stop();
            playerMap[id].body.velocity.x = 0;
            playerMap[id].body.velocity.y = 0;
            Client.sendNowPosition(playerMap[id].body.x, playerMap[id].body.y, playerid);
        }
    },

    enemyMovementHandler: function (enemy) {

        // Left
        if (enemy.body.velocity.x < 0 && enemy.body.velocity.x <= -Math.abs(enemy.body.velocity.y)) {
            enemy.animations.play('left');

            // Right
        } else if (enemy.body.velocity.x > 0 && enemy.body.velocity.x >= Math.abs(enemy.body.velocity.y)) {
            enemy.animations.play('right');

            // Up
        } else if (enemy.body.velocity.y < 0 && enemy.body.velocity.y <= -Math.abs(enemy.body.velocity.x)) {
            enemy.animations.play('up');

            // Down
        } else {
            enemy.animations.play('down');
        }
    },

    gameOver: function() {

        /*this.background.destroy();
        /!*this.corpses.destroy();
        this.collectables.destroy();
        this.player.destroy();
        this.playerAttacks.destroy();
        this.enemies.destroy();*!/
        otherPlayers = {};
        console.log("other init " + Object.keys(otherPlayers).length);
        playerGroup.destroy();

        this.music.stop();
        this.music.destroy();

        this.attackSound.destroy();
        this.playerSound.destroy();
        this.skeletonSound.destroy();
        this.slimeSound.destroy();
        this.batSound.destroy();
        this.ghostSound.destroy();
        this.spiderSound.destroy();
        this.goldSound.destroy();
        console.log("gameover init " + socket.id);

        socket = null;*/
        //console.log("gameover 2 " + socket.id);


        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.


        //this.game.reset();
        //this.game.state.start('MainMenu', true, false, this.xp + this.gold);

        //socket.disconnect();
        //console.log("소켓연결해제");
        this.game.state.start('Ending', true, false, LoginID);



        //this.game.state.restart();

    },

    quitGame: function (pointer) {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        this.music.stop();

        //  Then let's go back to the main menu.
        this.game.state.start('MainMenu', true, false, this.xp + this.gold);
    },

    rng: function (floor, ceiling) {
        floor /= 10;
        ceiling /= 10;
        var rnd = Math.random();
        if (rnd >= floor && rnd < ceiling) {
            return true;
        }
        return false;
    },

    generateGrid: function (worldSizeX, worldSizeY) {

        this.grid = [];
        var gridSize = 32;
        var gridsX = Math.floor(worldSizeX / gridSize);
        var gridsY = Math.floor(worldSizeY / gridSize);
        console.log("gridsX : " + gridsX + " gridsY : " + gridsY);
        for (var x = 0; x < gridsX; x++) {
            for (var y = 0; y < gridsY; y++) {
                var gridX = x * gridSize;
                var gridY = y * gridSize;
                this.grid.push({x:gridX, y:gridY});
            }
        }
        this.shuffle(this.grid);
    },

    getRandomLocation: function () {

        var gridIndex = 0;
        var x = this.grid[gridIndex].x;
        var y = this.grid[gridIndex].y;

        this.grid.splice(gridIndex, 1);
        gridIndex++;
        if (gridIndex === this.grid.length) {
            this.shuffle(this.grid);
            gridIndex = 0;
        }
        return {x, y};
    },

    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};


