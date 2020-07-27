<?php
include "db_info.php";

$id=$_GET['userid'];

$query="select count(*) from member where logid='$id'";
$result=mysqli_query($conn, $query);
$row=mysqli_fetch_array($result);

mysqli_close($conn);

?>

<script>
    var row="<?=$row[0]?>";
    if(row==1){
        parent.document.getElementById("chk_id2").value="0";
        parent.alert("이미 사용중인 아이디입니다.");
    }
    else{
        parent.document.getElementById("chk_id2").value="1";
        parent.alert("사용 가능합니다.");
    }
</script>