<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>로그인</title>

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

    <form name=frm1 action="login_ok.php" method=post>
    <div class="inner-bg">
        <div class="container">
            <div class="row">
                <div class="col-sm-8 col-sm-offset-2 text">
                    <h1><strong>로그인</strong></h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6 col-sm-offset-3 form-box">
                    <div class="form-top">
                        <div class="form-top-left">
                            <p>아이디와 비밀번호를 입력해주세요.</p>
                        </div>
                        <div class="form-top-right">
                            <i class="fa fa-lock"></i>
                        </div>
                    </div>
                    <div class="form-bottom">
                        <form role="form" action="" method="post" class="login-form">
                            <div class="form-group">
                                <label class="sr-only" for="form-username">Username</label>
                                <input type="text" name="id" placeholder="ID..." class="form-username form-control" id="form-username">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">Password</label>
                                <input type="password" name="pw" placeholder="Password..." class="form-password form-control" id="form-password">
                            </div>
                            <button type="submit" class="btn">로그인</button>
                        </form>
                    </div>
                    <div>
                        <a href="../test/join2.php">아직 저희 사이트의 회원이 아니신가요?</a>
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

</body>

</html>