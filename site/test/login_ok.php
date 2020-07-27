<?php
session_start();
include "db_info.php";
$logid=$_POST['id'];
$logpw=$_POST['pw'];
$prePage = $_SERVER['HTTP_REFERER'];


$query="select logid,email from member where logid='$logid' && logpw='$logpw'";

$result=mysqli_query($conn, $query);
$row=mysqli_fetch_array($result);

if(!$row){
    //echo "<script>alert('아이디와 비밀번호를 확인해주세요.');history.back();</script>";
}
else{
    $_SESSION['id']=$logid;
    //$_SESSION['email']=$orw['email'];
    $_SESSION['is_login'] = 1;

    echo "<meta http-equiv='refresh' content='1; /index.php'>";
    //echo "<script> history.go(-2); </script>";
}

mysqli_close($conn);
?>

