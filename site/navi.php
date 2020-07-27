<!-- navigation -->

<style>

    #footer {

        position:absolute;

        bottom:0;

        width:100%;

        height:70px;


    }
</style>

<div class="wrapper">
    <nav id="sidebar">
        <div class="sidebar-header">
            <h1 class="site-title">
                <img class="imglogo logo_cus" src="/images/github-character.png" onclick="location.href='/index.php'"><br/>
                게임
            </h1>
        </div>
        <ul class="list-unstyled components">
            <?php
            if(!isset($_SESSION['id'])){ //로그인을 하지 않았을때
                ?>
                <li><a href="/test/join2.php">회원가입</a></li>
                <li><a href="/test/login.php">로그인</a></li>
                <?php
            } else{ // 로그인 했을때
                $user_id = $_SESSION['id'];
                echo "<h3>$user_id 님 환영합니다.</h3>";
                ?>

                <li><a href="/test/logout.php">로그아웃</a></li>


                <div id="footer">
                    <?php

                    // 간단 구현 페이징

                    function page_nav($total,$scale,$p_num,$page)
                    {
                        global $PHP_SELF;

                        $total_page = ceil($total/$scale);
                        if (!$page) $page = 1;
                        $page_list = ceil($page/$p_num)-1;
                        $navigation = null;

                        // 페이지 리스트의 첫번째가 아닌 경우엔 [1]...[prev] 버튼을 생성한다.
                        if ($page_list>0)
                        {
                            $navigation = "<a href='$PHP_SELF?page=1'>[1]</a> ... ";
                            //$prev_page = ($page_list-1)*$p_num+1;
                            $prev_page = ($page_list)*$p_num;
                            $navigation .= "<a href='$PHP_SELF?page=$prev_page'>[prev]</a> ";
                        }

                        // 페이지 목록 가운데 부분 출력
                        $page_end=($page_list+1)*$p_num;
                        if ($page_end>$total_page) $page_end=$total_page;

                        for ($setpage=$page_list*$p_num+1;$setpage<=$page_end;$setpage++)
                        {
                            if ($setpage==$page) {
                                $navigation .= "<b>[$setpage]</b> ";
                            } else {
                                $navigation .= "<a href='$PHP_SELF?page=$setpage'>[$setpage]</a> ";
                            }
                        }

                        // 페이지 목록 맨 끝이 $total_page 보다 작을 경우에만, [next]...[$total_page] 버튼을 생성한다.
                        if ($page_end<$total_page)
                        {
                            $next_page = ($page_list+1)*$p_num+1;
                            $navigation .= "<a href='$PHP_SELF?page=$next_page'>[next]</a> ";
                            $navigation .= "... <a href='$PHP_SELF?page=$total_page'>[$total_page]</a>";
                        }

                        return $navigation;
                    }
                    ?>

                    <?php

                    include "test/db_info.php";
                    if(empty($_GET['page'])){
                        $page = 0;
                    }else{
                        $page = $_GET['page'];
                    }
                    $queryy = 'SELECT * from gamelist';

                    $dd = mysqli_query($conn, $queryy);

                    $total_data = mysqli_num_rows($dd);
                    //echo $total_data;
                    $num_per_page = 5;
                    $page_per_list = 3;
                    //$query="id=$user_id";

                    //$nav=page_nav($total_data,$num_per_page,$page_per_list,$page,$query);
                    $nav=page_nav($total_data,$num_per_page,$page_per_list,$page);

                    echo $nav;
                    echo ("<form action=$PHP_SELF>
                        페이지 : <input type=text name=page size=4>
                        <input type=submit value='이동'></form>
                    ");

                    mysqli_close($conn);

                    ?>
                </div>



                <?php
            }
            ?>
        </ul>





    </nav>
</div>