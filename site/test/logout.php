<?php
/**
 * Created by PhpStorm.
 * User: yj
 * Date: 10/09/2018
 * Time: 9:25 PM
 */
session_start();
//$_SESSION['is_login'] = 0;
session_destroy();
//echo "<meta http-equiv='refresh' content='1; ../index.php'>";
echo '<meta http-equiv=\'refresh\' content=\'1; /index.php\'>';
//echo "<script> history.go(-2); </script>";

?>