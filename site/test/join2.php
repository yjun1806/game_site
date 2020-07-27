<script>
    function chid(){

        document.getElementById("chk_id2").value=0;
        var id=document.getElementById("chk_id1").value;

        if(id==""){
            alert("빈칸 안되요!");
            exit;
        }

        ifrm1.location.href="join_chk.php?userid="+id;
    }

</script>

<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>회원가입</title>

    <!-- CSS -->
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:400,100,300,500">
    <link rel="stylesheet" href="../login_form/assets/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="../login_form/assets/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../login_form/assets/css/form-elements.css">
    <link rel="stylesheet" href="../login_form/assets/css/style.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Favicon and touch icons -->
    <link rel="shortcut icon" href="../login_form/assets/ico/favicon.png">
    <link rel="apple-touch-icon-precomposed" sizes="144x144" href="../login_form/assets/ico/apple-touch-icon-144-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="114x114" href="../login_form/assets/ico/apple-touch-icon-114-precomposed.png">
    <link rel="apple-touch-icon-precomposed" sizes="72x72" href="../login_form/assets/ico/apple-touch-icon-72-precomposed.png">
    <link rel="apple-touch-icon-precomposed" href="../login_form/assets/ico/apple-touch-icon-57-precomposed.png">

</head>

<body>

<!-- Top content -->
<div class="top-content">

    <form class="form-box" action=join_ok.php method=post name=frmjoin>
    <div class="inner-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2 text">
                    <h1><strong>회원가입</strong></h1>
                </div>
            </div>

            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 form-box">
                    <div class="form-top">
                        <div class="form-top-left">
                            <h3>회원가입</h3>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <form role="form" action="" method="post" class="login-form">
                            <div class="form-group">
                                <div class="input-group">

                                    <input type="text"  placeholder="ID..." maxlength=15 name=joinid class="form-username form-control" id="chk_id1">
                                    <input type=hidden id="chk_id2" name=chk_id2 value="0">
                                    <div class="input-group-btn">
                                        <button type="button" class="btn" onclick=chid()>아이디 중복검사</button>

                                    </div>
                                </div>
                                <!--<input class="sr-only">ID입력</input>-->
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" placeholder="Password..." class="form-password form-control" name=joinpw>
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password Check</label>
                                <input type="password" placeholder="Password Check..." class="form-password form-control" name =joinpw2>
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">E-mail</label>
                                <input type="text" name=joinemail placeholder="E-mail..." class="form-password form-control">
                            </div>

                            <div class="btn-group btn-group-justified" role="group" aria-label="...">
                                <div class="btn-group" role="group">
                                    <button type="submit" class="btn btn-default">가입</button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="reset" class="btn btn-default">다시작성</button>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-default" onclick="history.back()">취소</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </form>

</div>


<!-- Javascript -->
<script src="../login_form/assets/js/jquery-1.11.1.min.js"></script>
<script src="../login_form/assets/bootstrap/js/bootstrap.min.js"></script>
<script src="../login_form/assets/js/jquery.backstretch.min.js"></script>
<script src="../login_form/assets/js/scripts.js"></script>

<!--[if lt IE 10]>
<script src="../login_form/assets/js/placeholder.js"></script>
<![endif]-->
<iframe src="" id="ifrm1" scrolling=no frameborder=no width=0 height=0 name="ifrm1"></iframe>
</body>

</html>