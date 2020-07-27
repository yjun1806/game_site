<!DOCTYPE html>
<?php session_start(); ?>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>메인</title>
    <?php include("setting_bootstrap.html")?>
    <link rel="icon" href="favicon.png" type="image/x-icon">


</head>
<body>
<!-- 부트스트랩 관련 코드 -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>


<div>
    <?php include("navi.php") ?>
</div>

<!-- jumbotron -->
    <div id="content">
    <div class="jumbotron background">
        <h1 class="text-center">게임 모음</h1>

        <!--<p class="text-center"><a class="btn-danger btn-primary btn-lg btn_large" href="#" role="button">게임하기</a></p>-->
    </div>

    <?php
    //session_start();
    //$_SESSION['is_login'];
    if(isset($_SESSION['is_login'])){
        $id = $_SESSION['id'];

        ?>
        <script>
            let sessionid = "<?php echo $id; ?>";
            console.log("sss : " + sessionid);

            function sendingDATA(id, width, height, url, name) {
                var popUrl = url; // 노드서버 주소
                var popName = name;
                var popOption = "width="+width+", height="+height+", resizable=no, scrollbars=no, status=no;";

                window.open(popUrl,popName,popOption);

                var form = document.createElement("form");      // form 엘리멘트 생성
                form.setAttribute("method","post");             // method 속성 설정
                form.setAttribute("action", popUrl);       // action 속성 설정
                form.setAttribute("target", popName);       // action 속성 설정
                document.body.appendChild(form);                // 현재 페이지에 form 엘리멘트 추가

                var insert = document.createElement("input");   // input 엘리멘트 생성
                insert.setAttribute("type","hidden");           // type 속성을 hidden으로 설정
                insert.setAttribute("name","id");               // name 속성을 'stadium'으로 설정
                insert.setAttribute("value",id);             // value 속성을 삽입
                form.appendChild(insert);                       // form 엘리멘트에 input 엘리멘트 추가

                form.submit();

                //window.open('http://10.211.55.14:8081?val='+value, popName, popOption);
            }



        </script>


        <?php include("board.php") ?>


        <?php
        } else {
            ?>
        <h1 class="text-center">로그인을 하면 게임을 할 수 있습니다.</h1>

        <?php
        }
        ?>

</div>

<!-- BEGIN Scripts -->
<script src="js/jquery.js"></script>
<script src="js/tether.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/perfect-scrollbar.min.js"></script>
<script src="js/common.js"></script>
<!-- END Scripts -->


</body>
</html>




