<?php

include "test/db_info.php";


?>

<div xmlns:10.211.55.14="http://www.w3.org/1999/xhtml">
    <div class="card-columns">

        <!--<div class="card">
            <div class="card">
                <img class="card-img-top img-fluid" src="images/bricks.png" alt="Card image cap" onmouseover="this.src='images/bricks.gif';" onmouseout="this.src='images/bricks.png';">
            </div>
            <div class="card-block">
                <h2 class="card-title">Bricks Breaker</h2>
                <p class="card-text">평범한 벽돌깨기 게임. 공이 바에 맞으면 빨라진다. 무한히. 목숨은 3개, 벽돌은 1~3번 맞춰야 깨진다.</p>
                <p>
                    <input class="btn btn_cus_main" type="button" value="게임하기 &raquo;" onclick='sendingDATA(null, 500, 850, "gamesample/bricks/bricksbreak.php", "a")'>
                </p>
            </div>
        </div>




        <div class="card">
            <div class="card">
                <img class="card-img-top img-fluid" src="images/jump.png" alt="Card image cap" onmouseover="this.src='images/jump.gif';" onmouseout="this.src='images/jump.png';">
            </div>
            <div class="card-block">
                <h2 class="card-title">점프점프!</h2>
                <p class="card-text">점프해서 코인먹는 게임</p>
                <p><input class="btn btn_cus_main" type="button" value="게임하기 &raquo;" onclick='sendingDATA(null, 960, 700, "gamesample/jumpjump/index.php", "a")'></p>
            </div>
        </div>



        <div class="card">
            <div class="card">
                <img class="card-img-top img-fluid" src="images/sample.png" alt="Card image cap" onmouseover="this.src='images/sample.gif';" onmouseout="this.src='images/sample.png';">
            </div>
            <div class="card-block">
                <h2 class="card-title">싱글게임</h2>
                <p class="card-text">등장하는 몬스터를 잡는 게임, 스테이지가 올라갈수록 등장하는 몬스터의 수가 많아지며 5번째 스테이지마다 보스몬스터인 드래곤이 등장한다.</p>
                <p><input class="btn btn_cus_main" type="button" value="게임하기 &raquo;" onclick='sendingDATA(null, 800, 650, "gamesample/bak/index.php", "SINGLE GAME")'></p>
            </div>

        </div>


        <div class="card">
            <div class="card">
                <img class="card-img-top img-fluid" src="images/sample.png" alt="Card image cap" onmouseover="this.src='images/sample.gif';" onmouseout="this.src='images/sample.png';">
            </div>
            <div class="card-block">
                <h2 class="card-title">실시간 무한대전 게임!</h2>
                <p class="card-text">캐릭터를 선택해 전투에 참여하세요! 적을 쓰러트리고 높은 점수를 획득하세요!</p>
                <p>
                    <input class="btn btn_cus_main" type="button" value="게임하기 &raquo;" onclick="sendingDATA(sessionid, 1280, 800, 'http://10.211.55.14:8081/', 'INFINITY WAR')">

                </p>
            </div>

        </div>-->

        <?php
        $num = 5;
        //$page = $_GET['page'];

        if(empty($_GET['page'])){
            $page = 0;
        }else{
            $page = ($_GET['page']-1)*5;
        }
        //echo $page;

        $query = 'SELECT * FROM gamelist limit '.$page.', 5';
        if(!$data = mysqli_query($conn, $query)){
            printf("ERROR : ", mysqli_error($conn));
        };


        while($row = mysqli_fetch_array($data)){
            ?>

            <div class="card">
                <div class="card">
                    <img class="card-img-top img-fluid" src="<?=$row['gameimage']?>" alt="Card image cap">
                </div>
                <div class="card-block">
                    <h2 class="card-title"><?=$row['gamename']?></h2>
                    <p class="card-text"><?=$row['gameinfo']?></p>
                    <p>
                        <input class="btn btn_cus_main" type="button" value="게임하기 &raquo;" onclick="sendingDATA(sessionid, <?=$row['width']?>, <?=$row['height']?>, '<?=$row['gameurl']?>', 'a')">
                    </p>
                </div>

            </div>

            <?php
        }
        mysqli_close($conn);

        ?>







    </div>
</div>