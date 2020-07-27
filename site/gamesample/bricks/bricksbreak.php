<!DOCTYPE html>
<?php session_start(); ?>
<html>
<head>
    <meta charset="UTF-8" />
    <title>벽돌깨기</title>
    <style>* { padding: 0; margin: 0; } canvas { background: #eee; display: block; margin: 0 auto; }</style>

    <?php include("../../setting_bootstrap.html")?>

    <!--<link rel="stylesheet" href="../../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../../css/index_style.css">

    <link rel="stylesheet" href="../../bootstrap/css/mand_bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&amp;subset=devanagari,latin-ext" rel="stylesheet">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/perfect-scrollbar.min.css">-->
</head>
<body>
<!-- 부트스트랩 관련 코드 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="../../bootstrap/js/bootstrap.js"></script>






<?php
//session_start();
//$_SESSION['is_login'];
if(isset($_SESSION['is_login'])){ //로그인을 했을때
?>

    <div>
        <div class="jumbotron game_background">
            <div>
                <h1 class="text-center">벽돌깨기</h1>
                <br>
                <p class="text-center">
                    <input class="btn_cus btn" id="start" type="button" value="게임시작" onclick="game_start_fn()"/>
                    <input class="btn_cus btn" id="stop" type="button" value="게임중지" onclick="game_stop_fn()"/>
                </p>
            </div>
            <div>
                <canvas id="myCanvas" class="align-content-center" width="480" height="600"></canvas>
            </div>
            <br>
            <!--<div>
                <button class="btn_cus btn" onclick="location.href='../../index.php'">메인으로</button>
            </div>-->
        </div>
    </div>
    <script src = 'bricks.js'></script>


<?php
} else{ // 로그인을 안했을때
    include("../../need_login.html");
    ?>


    <?php
}
?>



</body>
</html>