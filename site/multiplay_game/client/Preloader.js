Unnamegame.Preloader = function (game) { //Preloader 객체 생성 및 변수선언

    this.background = null;
    this.preloader =null;
    this.ready = false;

};

Unnamegame.Preloader.prototype = {

    preload: function () {
        //	These are the assets we loaded in Boot.js
        //	A nice sparkly background and a loading progress bar
        this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        this.splash.anchor.setTo(0.5);

        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'preloaderBar');
        this.preloadBar.anchor.setTo(0.5);

        //


        //	This sets the preloadBar sprite as a loader sprite.
        //	What that does is automatically crop the sprite from 0 to full-width
        //	as the files below are loaded in.
        this.load.setPreloadSprite(this.preloadBar);

        //	Here we load the rest of the assets our game needs.
        this.load.image('playButton', '/client/assets/images/play.png');
        this.load.image('startButton', '/client/assets/images/start.png');
        this.load.image('flame', '/client/assets/images/flame.png');
        this.load.image('sword', '/client/assets/images/sword.png');
        this.load.image('arrow', '/client/assets/images/arrow.png');
        this.load.image('shadow', '/client/assets/images/shadow.png');
        this.load.image('hit_border', '/client/assets/images/hit-border.png');
        this.load.image('borderw', '/client/assets/images/borderm.png');
        this.load.image('levelParticle', '/client/assets/images/level-particle.png');
        this.load.image('spellParticle', '/client/assets/images/spell-particle.png');
        this.load.image('swordParticle', '/client/assets/images/sword-particle.png');

        this.load.image('tier-1', '/client/assets/images/tier1.png');
        this.load.image('tier-2', '/client/assets/images/tier2.png');
        this.load.image('tier-3', '/client/assets/images/tier3.png');
        this.load.image('tier-4', '/client/assets/images/tier4.png');
        this.load.image('tier-5', '/client/assets/images/tier5.png');
        this.load.image('tier-6', '/client/assets/images/tier6.png');
        this.load.image('tier-7', '/client/assets/images/tier7.png');
        this.load.image('tier-8', '/client/assets/images/tier8.png');



        this.load.spritesheet('ground', '/client/assets/images/ground.png', 32, 32);
        this.load.spritesheet('health-bar', '/client/assets/images/health-bar.png', 8, 8);
        this.load.spritesheet('button', '/client/assets/images/button.png', 181, 54);
        this.load.spritesheet('tombstone', '/client/assets/images/tombstone.png', 32, 32);
        this.load.spritesheet('tier', '/client/assets/images/tier.png', 130, 130);
        this.load.spritesheet('grass', '/client/assets/images/light_grass.png', 128, 128);



        this.load.spritesheet('tiles', '/client/assets/images/tiles.png', 16, 16);
        this.load.spritesheet('tree', '/client/assets/images/tree.png', 64, 64);
        this.load.spritesheet('things', '/client/assets/images/things.png', 16, 16);
        this.load.spritesheet('characters', '/client/assets/images/characters.png', 16, 16);
        this.load.spritesheet('dead', '/client/assets/images/dead.png', 16, 16);
        this.load.spritesheet('potions', '/client/assets/images/potions.png', 16, 16);
        this.load.spritesheet('dragons', '/client/assets/images/dragons.png', 32, 32);
        this.load.spritesheet('fireball', '/client/assets/images/fireball.png', 16, 16);
        this.load.spritesheet('spell', '/client/assets/images/spell.png', 12, 12);
        this.load.spritesheet('eyes', '/client/assets/images/eye.png', 40, 48);

        this.load.spritesheet('warrior_m', '/client/assets/character/warrior_m.png', 32, 36);
        this.load.spritesheet('warrior_f', '/client/assets/character/warrior_f.png', 32, 36);
        this.load.spritesheet('ranger_m', '/client/assets/character/ranger_m.png', 32, 36);
        this.load.spritesheet('ranger_f', '/client/assets/character/ranger_f.png', 32, 36);
        this.load.spritesheet('mage_m', '/client/assets/character/mage_m.png', 32, 36);
        this.load.spritesheet('mage_f', '/client/assets/character/mage_f.png', 32, 36);
        this.load.spritesheet('healer_m', '/client/assets/character/healer_m.png', 32, 36);
        this.load.spritesheet('healer_f', '/client/assets/character/healer_f.png', 32, 36);
        this.load.spritesheet('ninja_m', '/client/assets/character/ninja_m.png', 32, 36);
        this.load.spritesheet('ninja_f', '/client/assets/character/ninja_f.png', 32, 36);

        this.load.audio('openingMusic', '/client/assets/sound/opening.ogg');
        this.load.audio('overworldMusic', '/client/assets/sound/overworld.ogg');
        this.load.audio('attackSound', '/client/assets/sound/attack.wav');
        this.load.audio('playerSound', '/client/assets/sound/player.wav');
        this.load.audio('skeletonSound', '/client/assets/sound/skeleton.wav');
        this.load.audio('slimeSound', '/client/assets/sound/slime.wav');
        this.load.audio('batSound', '/client/assets/sound/bat.wav');
        this.load.audio('ghostSound', '/client/assets/sound/ghost.wav');
        this.load.audio('spiderSound', '/client/assets/sound/spider.wav');
        this.load.audio('goldSound', '/client/assets/sound/gold.wav');
        this.load.audio('potionSound', '/client/assets/sound/potion.ogg');
        this.load.audio('levelSound', '/client/assets/sound/level.ogg');
        this.load.audio('fireballSound', '/client/assets/sound/fireball.wav');
        this.load.audio('dragonSound', '/client/assets/sound/dragon.wav');

        this.load.image("Tiles", "/client/assets/images/tiles.png", 16, 16);
        this.load.tilemap("map", "/client/assets/level/sam..csv", null, Phaser.Tilemap.CSV);
    },
    create: function () {

        //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
        this.preloadBar.cropEnabled = false;
    },

    update: function () {

        //	You don't actually need to do this, but I find it gives a much smoother game experience.
        //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
        //	You can jump right into the menu if you want and still play the music, but you'll have a few
        //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
        //	it's best to wait for it to decode here first, then carry on.

        //	If you don't have any music in your game then put the game.state.start line into the create function and delete
        //	the update function completely.

        /*if (this.cache.isSoundDecoded('openingMusic') && this.ready == false)
        {*/
            this.ready = true;
            this.state.start('MainMenu');
        //}
    }


};