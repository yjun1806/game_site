<?php

include "test/db_info.php";

$page = $_GET['page'];
$query = 'SELECT * FROM gamelist limit $page, 5';
$data = mysqli_query($conn, $query);

?>

<?php
while($row = mysqli_fetch_assoc($data)){
    ?>

    <div class="card">
        <div class="card">
            <img class="card-img-top img-fluid" src="<?=$row['gameimage']?>" alt="Card image cap">
        </div>
        <div class="card-block">
            <h2 class="card-title"><?=$row['gamename']?></h2>
            <p class="card-text"><?=$row['gameinfo']?></p>
            <p><a class="btn btn_cus_main" href="<?=$row['gameurl']?>" role="button">게임하기
                    &raquo;</a></p>
        </div>

    </div>

    <?php
}
mysqli_close($conn);

?>
