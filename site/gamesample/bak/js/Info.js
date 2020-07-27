

var x = 10;
var y = canvas.height / 2;
let number = 0;

function draw() {
    drawScore();

    requestAnimationFrame(draw);

}




function drawScore() {
    /*context.clearRect(0, 0, canvas.width, canvas.height); // 프레임 단위로 새로 그리기 위해 캔버스를 일단 전부 지운다.
    context.font = 'bold 20pt Calibri';
    context.textBaseline = 'middle';
    number++;
    context.fillText(Unnamegame.Game.prototype.player.x + " , " + number, x, y);*/

}

draw();