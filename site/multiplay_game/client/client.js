let Client = {};
//Client.socket = io.connect();

Client.sendTest = function(){
    console.log("test sent");
    Client.socket.emit('test');
};

Client.askNewPlayer = function(){
    Client.socket.emit('newplayer');
};

/*Client.sendKeyBoardUp = function(){
    Client.socket.emit('inputUp');
    console.log("inputUp sent!");
};

Client.sendKeyBoardDown = function(){
    Client.socket.emit('inputDown');
    console.log("inputDown sent!");
};

Client.sendKeyBoardLeft = function(){
    Client.socket.emit('inputLeft');
    console.log("inputLeft sent!");
};

Client.sendKeyBoardRight = function(){
    Client.socket.emit('inputRight');
    console.log("inputRight sent!");
};
Client.sendKeyBoardStop = function(){
    Client.socket.emit('inputStop');
    console.log("inputStop sent!");
};*/

Client.sendNowPosition = function(x, y, id){
    Client.socket.emit('nowPosition', {posX:x, posY:y, id:id});
    console.log("nowPosition sent!" + x + " / " + y + " // " + id);
};

Client.sendKeyBoardInput = function(number){
    Client.socket.emit('inputKeyboard', number);
   // console.log("inputStop sent!");
};

Client.sendClick = function(x,y){
    Client.socket.emit('click',{x:x,y:y});
   // console.log("send move position : " + x + " / " + y);
};

/*Client.attackClick = function(x,y, id){
    Client.socket.emit('attack',{swordx:x,swordy:y, id:id});
    //console.log("attack position : " + x + " / " + y);
};*/

Client.getTheMapData = function(){
    Client.socket.emit('mapData');
    console.log("mapData get sent!");
};

Client.socket.on('newplayer',function(data){
    Unnamegame.Game.prototype.generatePlayer(data.id,data.x,data.y);
});

Client.socket.on('allplayers',function(data){
    for(var i = 0; i < data.length; i++){
        Unnamegame.Game.prototype.generatePlayer(data[i].id,data[i].x,data[i].y);
    }
    Client.socket.on('move',function(data){
        Unnamegame.Game.prototype.movePlayer(data.id,data.x,data.y);
    });

    Client.socket.on('attacker',function(data){
        Unnamegame.Game.prototype.attackPlayer(data.id,data.swordx,data.swordy);
    });

    /*Client.socket.on('moveUp',function(data){
        console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, 5);
    });

    Client.socket.on('moveDown',function(data){
        console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, 6);
    });

    Client.socket.on('moveLeft',function(data){
        console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, 7);
    });

    Client.socket.on('moveRight',function(data){
        console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, 8);
    });*/

    /*Client.socket.on('moveStop',function(data){
        console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, 0);
    });*/

    /*Client.socket.on('movePlayer',function(data){
        //console.log("input receive!");
        Unnamegame.Game.prototype.playerMovementHandler(data.id, data.keys);
    });*/

    Client.socket.on('remove',function(id){
        Unnamegame.Game.prototype.removePlayer(id);
        console.log("remove id " + id);
    });


});

Client.socket.on('makedMapData',function(data){
    console.log("mapdata receive!");
    Unnamegame.Game.prototype.getTheMapDatatoServer(data);
});


