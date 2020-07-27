const canvas = document.getElementById("myCanvas"); // 어떤 캔버스에 그릴 것인지 정함
const ctx = canvas.getContext("2d"); // 캔버스의 스타일??

//패들과 관련된 변수들
let paddleHeight = 10;
let paddleWidth = 150;
let paddleX = (canvas.width-paddleWidth)/2;

// 공과 관련된 변수들
let x = canvas.width / 2; // 공의 x위치 - 첫 시작은 너비의 중간지점
let y = canvas.height - paddleHeight; // 공의 y 위치, 패들의 바로 위에서 시작
let dx = 2; // 속도변화
let dy = -2; // 속도변화
let ballRadius = 10; // 공의 반지


let now_status = 1;


//키보드 입력과 관련된 변수
let rightPressed = false;
let leftPressed = false;

//벽돌과 관련된 변수
let brickRowCount = 3; // 벽돌의 행
let brickColumnCount = 5; // 벽돌의 열
let brickWidth = 75; // 벽돌 너비
let brickHeight = 20; // 벽돌 높이
let brickPadding = 10; // 벽돌 사이 간격
let brickOffsetTop = 30; // 위에서 얼마나 떨어진 곳에 그릴지
let brickOffsetLeft = 30; // 왼쪽에서 얼마나 떨어진 곳에 그릴지

//시스템 상태에 관련된 변수
let score = 0;
let lives = 3;

let game_start = false;


//벽돌들 초기화
let bricks = [];
for(let c=0; c<brickColumnCount; c++){
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        if (r === 0) {
            bricks[c][r] = {x: 0, y: 0, status: 1};
        }else if (r === 1){
            bricks[c][r] = {x: 0, y: 0, status: 2};
        }else if (r === 2){
            bricks[c][r] = {x: 0, y: 0, status: 3};
        }
    }
}

function game_start_fn(){ // 게임 시작 메소드, 게임시작 버튼을 누르면 호출된다
    game_start = true;
    draw();
}

function game_stop_fn(){ // 게임 중지 메소드, 게임중지 버튼을 누르면 호출된다
    document.location.reload(); // 단순히 새로고침 해줌
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width){
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("mousemove", mouseMoveHandler, false);

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#765e8f";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#765e8f";
    ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}

function drawBricks() {
    for(let c=0; c<brickColumnCount; c++){
        for(let r=0; r<brickRowCount; r++){
            if(bricks[c][r].status > 0) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                if(bricks[c][r].status ===  3){
                    ctx.fillStyle = "#73476e";
                }else if (bricks[c][r].status === 2) {
                    ctx.fillStyle = "#4d4e8f";
                }else if (bricks[c][r].status === 1) {
                    ctx.fillStyle = "#e0aed1";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
    }

}

//충돌판정 메소드
function collisionDetection() {
    //벽돌 배열의 전부를 매번 탐색한다. 매 프레임 그려줄때마다 탐색을 하는 방식
    for(let c=0; c<brickColumnCount; c++){
        for (let r = 0; r<brickRowCount ; r++){
            let b = bricks[c][r];
            if(b.status > 0) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status--;
                    if(b.status === 0){
                        score++;
                    }
                    if(score === brickRowCount*brickColumnCount){
                        alert("You Win, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}




function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    switch (now_status) { //벽에 팅길때마다 색상을 바꿔줌
        case 1:
            change_color("#735c8c");
            break;
        case 2:
            change_color("#992381");
            break;
        case 3:
            change_color("#b88bc9");
            break;
        case 4:
            change_color("#8c74b7");
            break;
        case 5:
            change_color("#434786");
            break;
        case 6:
            change_color("#991133");
    }
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() { // 패들을 그려주는 함수
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#741a6c";
    ctx.fill();
    ctx.closePath();
}

function change_color(fn_color) {
    ctx.fillStyle = fn_color;
}

//캔버스 그려주는 메소드
function draw(){
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 프레임 단위로 새로 그리기 위해 캔버스를 일단 전부 지운다.
        drawBricks(); // 벽돌 그리는 부분 호출
        drawBall(); // 공그리는 부분 호출
        drawPaddle(); // 패들 그리는 부분 호출
        collisionDetection(); // 충돌테스트 하는 부분 호출
        drawScore(); // 점수 그리는 부분 호출
        drawLives(); // 생명 그리는 부분 호출

        // 공을 반사시키는 부분
        if (y + dy < ballRadius) {
            dy = -dy;
            now_status++;
            if (now_status === 7) {
                now_status = 1;
            }
        } else if (y + dy > canvas.height - ballRadius) {
            if (x > paddleX && x < paddleX + paddleWidth) {

                //패들에 공이 맞을때마다 속도 변화시켜주는 부분
                dy = -dy;
                if (dx > 0) {
                    dx += 0.5;
                } else {
                    dx -= 0.5;
                }
                if (dy > 0) {
                    dy += 0.5;
                } else {
                    dy -= 0.5;
                }
            } else {
                lives--;
                if (!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                } else {
                    x = canvas.width / 2;
                    y = canvas.height - 30;
                    dx = 2;
                    dy = -2;
                    paddleX = (canvas.width - paddleWidth) / 2;
                }

            }
        }

        if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
            dx = -dx;
            now_status++;
            if (now_status === 7) {
                now_status = 1;
            }
        }

        //패들의 처리 부분, 키입력시 어떻게 처리할지
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        //좌표를 변경해주는 부분

        x += dx;
        y += dy;

        //일단 draw함수가 호출되면 이 부분에 의해서 매번 다시 호출된다. 프레임 단위로 호출됨.
        requestAnimationFrame(draw);
}

function keyDownHandler(e) {
    var key = e.keyCode;
    if(key === 39){
        rightPressed = true;
    }else if(key === 37){
        leftPressed = true;
    }
}


function keyUpHandler(e) {
    let key = e.keyCode;
    if(key === 39){
        rightPressed = false;
    }else if(key === 37){
        leftPressed = false;
    }
}

/*if(game_start){
    draw();
}else {

}*/
