<!doctype html>
<?php session_start(); ?>

<head>
    <title>싱글게임</title>
    <meta charset="utf-8">

    <?php include("../../setting_bootstrap.html")?>

</head>
<body>


<?php
//session_start();
//$_SESSION['is_login'];
if(isset($_SESSION['is_login'])){ //로그인을 했을때
    include("index.html");
    ?>

    <?php
} else { // 로그인을 안했을때
        include("../../need_login.html");
    }
    ?>


</body>
