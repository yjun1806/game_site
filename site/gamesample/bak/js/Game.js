// Credits:
// http://www.gamedevacademy.org/html5-phaser-tutorial-spacehipster-a-space-exploration-game/
// http://www.joshmorony.com/how-to-create-an-animated-character-using-sprites-in-phaser/
// http://jschomay.tumblr.com/post/103568304133/tutorial-building-a-polished-html5-space-shooter
// http://ezelia.com/2014/tutorial-creating-basic-multiplayer-game-phaser-eureca-io

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

    // Runs once at start of game
    create: function () {
        this.game.sound.boot();

        // Generate in order of back to front
        var worldSizeX = 800;
        var worldSizeY = 600;

        gameovermessge = false;
        CollectableNumber = 20; // 상자뿌리는 개수
        ObstaclesNumber = 20; // 오브젝트수
        enemyNumber = 5; // 적 등장수
        kill_enemy = 0;
        Stage = 1;
        Bossgen = false;

        console.log("worldX : " + worldSizeX + " worldY : " + worldSizeY);

        this.generateGrid(worldSizeX, worldSizeY);

        this.game.world.setBounds(0, 0, worldSizeX, worldSizeY);

        this.background = this.game.add.tileSprite(0, 0, this.game.world.width / 2, this.game.world.height / 2, 'tiles', 64);
        this.background.scale.setTo(2);




        /*  map = this.game.add.tilemap('map', 16, 16);
          map.addTilesetImage('Tiles');
          layer = map.createLayer(0);
          layer.resizeWorld();
          map.setCollisionByExclusion([4]);*/

        /*var worldSizeX = this.world.width;
        var worldSizeY = this.world.height;
        console.log("worldX : " + worldSizeX + " worldY : " + worldSizeY);

        this.generateGrid(worldSizeX, worldSizeY);*/

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
        this.generateObstacles();
        this.generateCollectables();

        this.corpses = this.game.add.group();

        // Generate player and set camera to follow
        this.player = this.generatePlayer();
        this.game.camera.follow(this.player);

        this.playerAttacks = this.generateAttacks('sword', 50);
        this.playerSpells = this.generateAttacks('spell', 50);
        this.bossAttacks = this.generateAttacks('spellParticle', 5,2000, 300);
        this.bossAttacks = this.generateAttacks('fireball', 1, 2000, 300);

        // Generate enemies - must be generated after player and player.level
        this.generateEnemies(enemyNumber);

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

        // Set the camera
        this.showLabels();

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
        testLabel.text = "Stage : " + Stage;


    },

    //화면 갱신부분
    // Checks for actions and changes
    update: function () {

        this.playerHandler();
        this.enemyHandler();
        this.bossHandler();
        this.collisionHandler();


        this.collectables.forEachDead(function (collectable) {
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

        }



        this.notificationLabel.text = this.notification;
        this.xpLabel.text = 'Lvl. ' + this.player.level + ' - ' + this.xp + ' XP / ' + this.xpToNext + ' XP';
        this.goldLabel.text = this.gold + ' Gold';
        this.healthLabel.text = this.player.health + ' / ' + this.player.vitality;
        var MNumber = enemyNumber - kill_enemy;
        this.MonsterNumberLabel.text = "현재 남은 몬스터 수 : " + MNumber;


        /*if(this.player.x <= 0){
            worldSizeX = 1000;
            worldSizeY = 1000;
            this.create();
        }*/

    },

    fadeText: function(){
        bar.visible = false;
        testLabel.visible = false;

    },

    playerHandler: function() {

        if (this.player.alive) {
            this.playerMovementHandler();

            // Attack towards mouse click
            if (this.game.input.activePointer.isDown) {
                this.playerAttacks.rate = 1000 - (this.player.speed * 4);
                if (this.playerAttacks.rate < 200) {
                    this.playerAttacks.rate = 200;
                }
                this.playerAttacks.range = this.player.strength * 6; //투사체 속도
                this.attack(this.player, this.playerAttacks);
            }

            // Use spell when spacebar is pressed
           /* if (this.game.time.now > this.spellCooldown) {
                this.spellLabel.text = "READY!";
*/
                if (this.controls.spell.isDown) {
                    this.playerSpells.rate = 1000; // 투사체 살아있는 시간
                    this.playerSpells.range = this.player.strength * 6; //투사체속도
                    this.attack(this.player, this.playerSpells);
                    //this.spellCooldown = this.game.time.now + 10;
                    this.spellCooldown = 10;
                }
           /* } else {
                this.spellLabel.text = "RECHARGING...";
            }*/

            if (this.player.health > this.player.vitality) {
                this.player.health = this.player.vitality;
            }

            if (this.xp >= this.xpToNext) {
                this.levelUp();
            }
        }

        if (!this.player.alive) {
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
        }
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

        this.game.physics.arcade.collide(this.player, this.enemies, this.hit, null, this);
        this.game.physics.arcade.collide(this.player, this.bosses, this.hit, null, this);
        this.game.physics.arcade.collide(this.player, this.bossAttacks, this.hit, null, this);

        this.game.physics.arcade.collide(this.bosses, this.playerAttacks, this.hitcollide, null, this);
        this.game.physics.arcade.collide(this.enemies, this.playerAttacks, this.hitcollide, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.playerAttacks, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.playerAttacks, this.hit, null, this);

        this.game.physics.arcade.collide(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.collide(this.enemies, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.bosses, this.playerSpells, this.hit, null, this);
        this.game.physics.arcade.overlap(this.enemies, this.playerSpells, this.hit, null, this);

        this.game.physics.arcade.collide(this.obstacles, this.player, null, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.playerAttacks, this.hitobject, null, this);
        this.game.physics.arcade.collide(this.obstacles, this.enemies, null, null, this);

        this.game.physics.arcade.overlap(this.collectables, this.player, this.collect, null, this);

        this.game.physics.arcade.collide(this.player, this.layer);
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

    attack: function (attacker, attacks) {

        if (attacker.alive && this.game.time.now > attacks.next && attacks.countDead() > 0) {
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
        }
    },

    generateAttacks: function (name, amount, rate, range) {

        // Generate the group of attack objects
        var attacks = this.game.add.group();
        attacks.enableBody = true;
        attacks.physicsBodyType = Phaser.Physics.ARCADE;
        attacks.createMultiple(amount, name);

        if (name === 'spell') {
            attacks.callAll('animations.add', 'animations', 'particle', [0, 1, 2, 3,4 ,5], 10, true);
            attacks.callAll('animations.play', 'animations', 'particle');
        } else if (name === 'fireball') {
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
        target.destroy();
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

    generatePlayer: function () {

        // Generate the player
        var player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'characters');

        // Loop through frames 3, 4, and 5 at 10 frames a second while the animation is playing
        player.animations.add('down', [3, 4, 5], 10, true);
        player.animations.add('left', [15, 16, 17], 10, true);
        player.animations.add('right', [27, 28, 29], 10, true);
        player.animations.add('up', [39, 40, 41], 10, true);
        player.animations.play('down');
        player.scale.setTo(2);

        // Enable player physics;
        this.game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.alive = true;

        player.name = '주인공';
        player.level = 1;

        player.health = 1000;
        player.vitality = 100;
        player.strength = 25;
        player.speed = 250; //125


        player.invincibilityFrames = 500;
        player.invincibilityTime = 0;

        player.corpseSprite = 1;

        return player;
    },

    setStats: function (entity, name, health, speed, strength, reward, corpseSprite) {

        entity.animations.play('down');
        entity.scale.setTo(2);

        entity.body.collideWorldBounds = true;
        entity.body.velocity.x = 0,
            entity.body.velocity.y = 0,
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

        enemy = this.enemies.create(this.game.world.randomX, this.game.world.randomY, 'characters');

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

    generateObstacles: function() {

        this.obstacles = this.game.add.group();
        this.obstacles.enableBody = true;

        var amount = ObstaclesNumber; // 수집품 젠수
        for (var i = 0; i < amount; i++) {
            var point = this.getRandomLocation();
            var spriteIndex = Math.floor(Math.random() * 10);
            this.generateObstacle(point, spriteIndex);
        }
    },

    generateObstacle: function (location, spriteIndex) {

        obstacle = this.obstacles.create(location.x, location.y, 'tiles');

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
        obstacle.scale.setTo(2);
        obstacle.body.setSize(8, 8, 4, -2);
        obstacle.body.moves = false;

        return obstacle;
    },

    generateCollectables: function () {

        this.collectables = this.game.add.group();
        this.collectables.enableBody = true;
        this.collectables.physicsBodyType = Phaser.Physics.ARCADE;

        var amount = CollectableNumber; // 수집품수
        for (var i = 0; i < amount; i++) {
            var point = this.getRandomLocation();
            this.generateChest(point);
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

    playerMovementHandler: function () {

        // Up-Left
        if (this.controls.up.isDown && this.controls.left.isDown) {
            this.player.body.velocity.x = -this.player.speed;
            this.player.body.velocity.y = -this.player.speed;
            this.player.animations.play('left');

            // Up-Right
        } else if (this.controls.up.isDown && this.controls.right.isDown) {
            this.player.body.velocity.x = this.player.speed;
            this.player.body.velocity.y = -this.player.speed;
            this.player.animations.play('right');

            // Down-Left
        } else if (this.controls.down.isDown && this.controls.left.isDown) {
            this.player.body.velocity.x = -this.player.speed;
            this.player.body.velocity.y = this.player.speed;
            this.player.animations.play('left');

            // Down-Right
        } else if (this.controls.down.isDown && this.controls.right.isDown) {
            this.player.body.velocity.x = this.player.speed;
            this.player.body.velocity.y = this.player.speed;
            this.player.animations.play('right');

            // Up
        } else if (this.controls.up.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = -this.player.speed;
            this.player.animations.play('up');

            // Down
        } else if (this.controls.down.isDown) {
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = this.player.speed;
            this.player.animations.play('down');

            // Left
        } else if (this.controls.left.isDown) {
            this.player.body.velocity.x = -this.player.speed;
            this.player.body.velocity.y = 0;
            this.player.animations.play('left');

            // Right
        } else if (this.controls.right.isDown) {
            this.player.body.velocity.x = this.player.speed;
            this.player.body.velocity.y = 0;
            this.player.animations.play('right');

            // Still
        } else {
            this.player.animations.stop();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
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

        //this.background.destroy();
        this.corpses.destroy();
        this.collectables.destroy();
        this.player.destroy();
        this.playerAttacks.destroy();
        this.enemies.destroy();

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

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.

        this.game.state.start('MainMenu', true, false, this.xp + this.gold);
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
