PlayState = {}; // 새로운 객체 생성

function Hero(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'hero');
    this.anchor.set(0.5, 0.5); //캐릭터 이미지 중심을 옮긴다.
    this.game.physics.enable(this); //캐릭터에게 물리법칙 적용
    this.body.collideWorldBounds = true; //캐릭터가 화면 영역을 벗어나지 않도록 설정해줌

    this.animations.add('stop', [0]);
    this.animations.add('run', [1, 2], 8, true); // 8fps looped
    this.animations.add('jump', [3]);
    this.animations.add('fall', [4]);

}

function Spider(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'spider');

    // anchor
    this.anchor.set(0.5);
    // animation
    this.animations.add('crawl', [0, 1, 2], 8, true);
    this.animations.add('die', [0, 4, 0, 4, 0, 4, 3, 3, 3, 3, 3, 3], 12);
    this.animations.play('crawl');

    // physic properties
    this.game.physics.enable(this);
    this.body.collideWorldBounds = true;
    this.body.velocity.x = Spider.SPEED;
}

//캐릭터의 속성 정하는 부분
Hero.prototype = Object.create(Phaser.Sprite.prototype);
Hero.prototype.constructor = Hero;
Hero.prototype.move = function(direction){
    this.x += direction * 2.5;
    const SPEED = 500;
    this.body.velocity.x = direction*SPEED; //물리적 몸통의 속도를 설정

    if (this.body.velocity.x < 0) {
        this.scale.x = -1;
    }
    else if (this.body.velocity.x > 0) {
        this.scale.x = 1;
    }
};

Hero.prototype.jump = function(){
    const JUMP_SPEED = 1200;
    let canJump = this.body.touching.down; //물리적 캐릭터 body가 다른 바디와 아래방향으로 맞닿아 있으면 이 속성이 true가 된다. 캐릭터가 바닥에 있는경우에만 점프가 가능하도록 하기 위해 체크해줌

    if(canJump){
        this.body.velocity.y = -JUMP_SPEED;
    }

    return canJump;
};

Hero.prototype.bounce = function () {
    const BOUNCE_SPEED = 200;
    this.body.velocity.y = -BOUNCE_SPEED;
};

//상태에 따른 애니메이션 효과 이름을 처리하기 위한 부분
Hero.prototype._getAnimationName = function () {
    let name = 'stop'; // default animation

    // jumping
    if (this.body.velocity.y < 0) {
        name = 'jump';
    }
    // falling
    else if (this.body.velocity.y >= 0 && !this.body.touching.down) {
        name = 'fall';
    }
    else if (this.body.velocity.x !== 0 && this.body.touching.down) {
        name = 'run';
    }

    return name;
};

Hero.prototype.update = function () {
    // update sprite animation, if it needs changing
    let animationName = this._getAnimationName();
    if (this.animations.name !== animationName) {
        this.animations.play(animationName);
    }
};

//거미의 속성 정하는 부분
Spider.SPEED = 100;
Spider.prototype = Object.create(Phaser.Sprite.prototype);
Spider.prototype.constructor = Spider;
Spider.prototype.update = function(){
    if(this.body.touching.right || this.body.blocked.right){
        this.body.velocity.x = -Spider.SPEED;
    }else if(this.body.touching.left || this.body.blocked.left){
        this.body.velocity.x = Spider.SPEED;
    }
};

Spider.prototype.die = function () {
    this.body.enable = false; // 이후 충돌검사에서 제외됩니다.

    this.animations.play('die').onComplete.addOnce(function () {
        this.kill();
    }, this);
};

/*PlayState.init =  function(){
    this.game.scale.pageAlignHorizontally = true;
};*/

PlayState.preload = function(){ // 배경이미지를 등록하기 위해 preload단계를 이용한다. preload단계에서는 주로 게임에서 사용할 사운드, 이미지와 같은 리소스를 미리 로드시킨다.
    this.game.scale.pageAlignHorizontally = true;

    this.game.load.image('background', 'images/background.png'); //배경화면 이미지 리소스를 'background' 문자열 키로 참조할 수 있게 된다.
    this.game.load.json('level:1', 'data/level01.json'); // 게임에서 사용할 발판을 미리 하드코딩 시킨 json파일에서 로드한다.

    //스프라이트들을 화면에 출력하기 전에 미리 로드해주는 부분
    this.game.load.image('ground', 'images/ground.png');
    this.game.load.image('grass:8x1', 'images/grass_8x1.png');
    this.game.load.image('grass:6x1', 'images/grass_6x1.png');
    this.game.load.image('grass:4x1', 'images/grass_4x1.png');
    this.game.load.image('grass:2x1', 'images/grass_2x1.png');
    this.game.load.image('grass:1x1', 'images/grass_1x1.png');

    //메인 캐릭터를 스프라이트시키기 위해 캐릭터 이미지 로드
    //this.game.load.image('hero', 'images/hero_stopped.png');
    this.game.load.spritesheet('hero', 'images/hero.png', 36, 42);
    //this.game.load.spritesheet('hero', 'images/dragons.png', 32, 32);

    //점프사운드
    this.game.load.audio('sfx:jump', 'audio/jump.wav');

    //코인추가
    this.game.load.spritesheet('coin', 'images/coin_animated.png', 22, 22);

    //코인습득시 사운드 추가
    this.game.load.audio('sfx:coin', 'audio/coin.wav');

    //움직이는 적만들기
    this.game.load.spritesheet('spider', 'images/spider.png', 42, 32);

    //보이지 않는 벽 로드
    this.game.load.image('invisible-wall', 'images/invisible_wall.png');

    //거미를 밟았을때 사용되는 사운드.
    this.game.load.audio('sfx:stomp', 'audio/stomp.wav');

    //코인판 로드
    this.game.load.image('icon:coin', 'images/coin_icon.png');

    //레트로 폰트 로드
    this.game.load.image('font:numbers', 'images/numbers.png');
};

PlayState.create = function(){ // 게임생성
    //로드된 사운드 추가
    this.sfx = {
        jump: this.game.add.audio('sfx:jump'),
        coin: this.game.add.audio('sfx:coin'),
        stomp: this.game.add.audio('sfx:stomp')
    };

    this.game.add.image(0, 0, 'background'); // 최상당 최좌측 좌표 0,0을 기준으로 배경이미지를 화면에 그려준다.
    this._loadLevel(this.game.cache.getJSON('level:1'));

    this._createHud(); // 가장 하단에 추가하여 다른 요소들보다 가장 앞쪽에 그려지도록한다.
};

PlayState._createHud = function(){
    const NUMBERS_STR = '0123456789X';
    this.coinFont = this.game.add.retroFont('font:numbers', 20, 26, NUMBERS_STR, 6);
    let coinIcon = this.game.make.image(0, 0, 'icon:coin');
    let coinScoreImg = this.game.make.image(coinIcon.x + coinIcon.width, coinIcon.height/2, this.coinFont);

    coinScoreImg.anchor.set(0, 0.5);


    this.hud = this.game.add.group();
    this.hud.add(coinIcon);
    this.hud.add(coinScoreImg);
    this.hud.position.set(10,10);
};

PlayState._loadLevel = function(data){ //맵레벨을 로드할때 다루는 부분
    //모든 지형스프라이트들을 그룹으로 묶는다.
    this.platforms = this.game.add.group();
    this.coins = this.game.add.group();
    this.spiders = this.game.add.group();
    this.enemyWalls = this.game.add.group();
    this.enemyWalls.visible = false;

    //모든 플랫폼들을 스폰시킨다.
    data.platforms.forEach(this._spawnPlatform, this);
    //영웅과 적들 스폰
    this._spawnCharacters({hero:data.hero, spiders: data.spiders});


    data.coins.forEach(this._spawnCoin, this);

    //중력을 적용시킨다.
    const GRAVITY = 200;
    this.game.physics.arcade.gravity.y = GRAVITY;


};

PlayState._spawnCoin = function(coin){
    let sprite = this.coins.create(coin.x, coin.y, 'coin');
    sprite.anchor.set(0.5, 0.5);


    sprite.animations.add('rotate', [0, 1, 2, 1], 6, true); // 0,1,2,1은 이미지 스프라이트시트에서 사용할 인덱스 번호 시퀀스, 6은 6fps, true는 반복설정
    sprite.animations.play('rotate');

    this.game.physics.enable(sprite);
    sprite.body.allowGravity = false;
};

PlayState._spawnPlatform = function(platform){
    //let sprite = this.game.add.sprite(platform.x, platform.y, platform.image);
    let sprite = this.platforms.create(platform.x, platform.y, platform.image);

    this.game.physics.enable(sprite); // 지형에도 물리엔진을 적용시켜준다. 이제 캐릭터도 지형을 무시하지 못한다.
    sprite.body.allowGravity = false; //중력 영향을 받지 않도록 해줌
    sprite.body.immovable = true; //움직이지 않도록 해줌

    //플랫폼 생성시 보이지 않는 벽도 생성
    this._spawnEnemyWall(platform.x, platform.y, 'left');
    this._spawnEnemyWall(platform.x + sprite.width, platform.y, 'right');
};

PlayState._spawnEnemyWall = function(x, y, side){
    let sprite = this.enemyWalls.create(x, y, 'invisible-wall');
    sprite.anchor.set(side === 'left' ? 1: 0, 1);

    this.game.physics.enable(sprite);
    sprite.body.immovable = true;
    sprite.body.allowGravity = false;
};

PlayState._spawnCharacters = function(data){
    data.spiders.forEach(function (spider) {
        let sprite = new Spider(this.game, spider.x, spider.y);
        this.spiders.add(sprite);
    }, this);

    this.hero = new Hero(this.game, data.hero.x, data.hero.y);
    this.game.add.existing(this.hero);


};

PlayState.init = function(){
    this.keys = this.game.input.keyboard.addKeys({
        left: Phaser.KeyCode.LEFT,
        right: Phaser.KeyCode.RIGHT,
        up: Phaser.KeyCode.UP //점프를 위한 키코드 추가
    });
    this.game.renderer.renderSession.roundPixels = true; //안티엘리어싱 끄기, 픽셀이 흐릿해보이지 않음

    this.keys.up.onDown.add(function () { // up키가 입력된 경우 hero객체의 jump()메소드를 호출하도록 설정
        this.hero.jump();
    }, this);

    //점프할때 사운드가 나도록 설정해준다.
    this.keys.up.onDown.add(function () {
        let didJump = this.hero.jump();
        if(didJump){
            this.sfx.jump.play();
        }
    }, this);

    //코인개수를 저장할 변수 할당
    this.coinPickupCount = 0;

};


PlayState.update = function(){
    this._handleCollisions();
    this._handleInput();
    this.coinFont.text = 'x'+this.coinPickupCount;
};

PlayState._handleCollisions = function () {
    this.game.physics.arcade.collide(this.hero, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.platforms);
    this.game.physics.arcade.collide(this.spiders, this.enemyWalls);

    //코인과의 충돌검사, collide를 쓰지 않은 이유는 객체가 분리되므로 겹칩을 표시하기 위해 overlap
    this.game.physics.arcade.overlap(this.hero, this.coins, this._onHeroVsCoin, null, this);

    this.game.physics.arcade.overlap(this.hero, this.spiders, this._onHeroVsEnemy, null, this);
};

PlayState._onHeroVsCoin = function(hero, coin){
    this.sfx.coin.play();
    coin.kill(); //충돌된 코인 제거
    this.coinPickupCount++;
};

PlayState._onHeroVsEnemy = function(hero, enemy){
    if (hero.body.velocity.y > 0) { // kill enemies when hero is falling
        hero.bounce();
        enemy.die();
        this.sfx.stomp.play();
    }
    else { // game over -> restart the game
        this.sfx.stomp.play();
        this.game.state.restart();
    }
};


PlayState._handleInput = function(){ //키보드 입력을 다루는 부분
    if(this.keys.left.isDown){ // 키입력 왼쪽
        this.hero.move(-1);
    }else if(this.keys.right.isDown){ // 키입력 오른쪽
        this.hero.move(1);
    }else { // 그외 정지
        this.hero.move(0);
    }
};


    let game = new Phaser.Game(960, 600, Phaser.AUTO, 'phaser_canvas'); // 960*600짜리 캔버스를 만들어준다, 어떤 방식으로 처리할지는 Phaser가 정한다.
    game.state.add('play', PlayState); // 만들어진 게임에 상태를 추가한다.
    game.state.start('play'); // 추가된 상태?를 실행한다.



