<!doctype html>
<?php session_start(); ?>

<head>
    <title>Phaser Game</title>
    <meta charset="utf-8">

    <?php include("setting_bootstrap.html")?>

</head>
<body>
<div>
    <?php include("navi.php") ?>
</div>

<?php
//session_start();
//$_SESSION['is_login'];
if(isset($_SESSION['is_login'])){ //로그인을 했을때
    $id = $_SESSION['id'];
    ?>
    <script>
        let sessionid = "<?php echo $id; ?>";

        console.log("sss : " + sessionid);

        function sendingDATA(value) {
            var popUrl = "http://10.211.55.14:8081/"; // 노드서버 주소
            var popName = "GAME";
            var popOption = "width=1280, height=800, resizable=no, scrollbars=no, status=no;";

            window.open(popUrl,popName,popOption);

            var form = document.createElement("form");      // form 엘리멘트 생성
            form.setAttribute("method","post");             // method 속성 설정
            form.setAttribute("action", popUrl);       // action 속성 설정
            form.setAttribute("target", popName);       // action 속성 설정
            document.body.appendChild(form);                // 현재 페이지에 form 엘리멘트 추가

            var insert = document.createElement("input");   // input 엘리멘트 생성
            insert.setAttribute("type","hidden");           // type 속성을 hidden으로 설정
            insert.setAttribute("name","id");               // name 속성을 'stadium'으로 설정
            insert.setAttribute("value",value);             // value 속성을 삽입
            form.appendChild(insert);                       // form 엘리멘트에 input 엘리멘트 추가

            form.submit();

           //window.open('http://10.211.55.14:8081?val='+value, popName, popOption);
        }
    </script>

    <div id="content">
        <!--<form action="http://10.211.55.14:8081/" method="post" target="popup" onsubmit="window.open('http://10.211.55.14:8081/', 'GAME', 'width=1200, height=800');">
            <input type="hidden" name="var" value=$id>
            <input type="submit">
        </form>-->
        <!--<p class="text-center">
            <a class="btn-danger btn-primary btn-lg btn_large"
                                  href="#" onclick="javascript:sendingDATA(sessionid);" role="button">
                게임하기</a></p>-->
            <input class="btn-danger btn-primary btn-lg btn_large" type="button" value="게임하기" onclick="sendingDATA(sessionid)">

    </div>

    <?php
} else { // 로그인을 안했을때
    include("need_login.html");
}
?>


</body>
