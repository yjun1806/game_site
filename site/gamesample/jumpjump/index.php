<!doctype html>
<?php session_start(); ?>

<head>
    <title>Jump Game</title>
    <meta charset="utf-8">

    <?php include("../../setting_bootstrap.html")?>


    <!--
        <link rel="stylesheet" href="../../bootstrap/css/mand_bootstrap.min.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&amp;subset=devanagari,latin-ext" rel="stylesheet">
        <link rel="stylesheet" href="../../css/style.css">
        <link rel="stylesheet" href="../../css/perfect-scrollbar.min.css">-->

    <style>


    </style>
</head>
<body>


<?php
//session_start();
//$_SESSION['is_login'];
if(isset($_SESSION['is_login'])){ //로그인을 했을때
    include("game.html")

    ?>

<?php
} else { // 로그인을 안했을때
    include("../../need_login.html");
}
    ?>


</body>
