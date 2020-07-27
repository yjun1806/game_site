<?php
include "db_info.php";

$j_id=$_POST["joinid"];
$j_pw=$_POST['joinpw'];
$j_pw2=$_POST['joinpw2'];
$j_email=$_POST['joinemail'];
$j_chkid=$_POST['chk_id2'];


if(!$j_id||!$j_pw||!$j_pw2||!$j_email){
echo"<script>alert('빈칸없이 작성해 주세요.');history.back();</script>";
}

if($j_chkid==0){
echo"<script>alert('아이디 중복확인을 해주세요.');history.back();</script>";
}

if($j_pw!=$j_pw2){
echo"<script>alert('비밀번호를 정확히 입력해주세요.');history.back();</script>";
}

if(!strpos($j_email,'@')){
echo"<script>alert('올바른 이메일을 입력해주세요.');history.back();</script>";
}

$query="insert into member(logid,logpw,email) values('$j_id','$j_pw','$j_email')";
$result=mysqli_query($conn, $query);
echo "<script>alert('회원가입을 축하드립니다.');</script>";
echo "<meta http-equiv='refresh' content='1; URL=login.php'>";


?>