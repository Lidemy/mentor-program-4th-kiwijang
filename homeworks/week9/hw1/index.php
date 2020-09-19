<?php
  session_set_cookie_params(0, "/mtr04group1/naomi/week9/");
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  /*
    1. 從 cookie 裡面讀取 PHPSESSION(token)
    2. 從檔案裡面讀取 session id 的內容
    3. 放到 $_SESSION
  */
  $username = NULL;
  // 如果 session 裡面有 username
  if (!empty($_SESSION['username'])) {
    $username = $_SESSION['username'];
  }

  $result = $conn->query("select * from naomi_comments order by id desc");
  if(!$result) {
    die('Error:' . $conn->error);
  }
?>

<!DOCTYPE html>
<html lang="zh-tw">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>留言板</title>
    <link rel="stylesheet" href="./style.css" />
    <script src="./script.js"></script>
  </head>
  <body>
    <header>
      注意!本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。
    </header>
    <div class="container">
      <div class="top">
        <h1 class="title">
          comments
        </h1>
        <div class="btnwrap">
        <?php if (!$username) { ?>
          <a class="btnwrap__btn registerbtn" href="register.php">註冊</a>
          <a class="btnwrap__btn loginbtn" href="login.php">登入</a>
        <?php } else { ?>
          <p>你好，<?php echo escape($username) ?>，歡迎留言~</p>
          <a class="btnwrap__btn" href="logout.php">會員登出</a>
        <?php } ?>
        </div>
      </div>
      <div class="bottom">
        <?php 
          if (!empty($_GET["errCode"])) {
            $code = $_GET["errCode"];
            $msg = "Error";
            if ($code === "1") {
              $msg = "資料不齊全";
            }
            echo "<h3 class='red'>" . $msg . "</h3>";
          }
        ?>
        <?php if ($username) { ?>
          <form method="POST" action="./handle_add_post.php">
            <h3>有什麼想說的嗎?<span class="red"> *</span></h3>
            <textarea
              cols="30"
              rows="10"
              placeholder="請輸入你的留言..."
              name="content"
            ></textarea>
            <button type="submit">送出</button>
          </form>
        <?php } else { ?>          
          <h3 class="red">登入才可以發布留言</h3>
        <?php } ?>

        <section class="comments">
          <?php
            while($row = $result->fetch_assoc()) {
          ?>
            <div class="comment">
              <div class="comment__userphoto"><?php                
                  preg_match_all('/./u', $row['nickname'], $matches);
                  echo $matches[0][0];
                ?></div>
              <div class="comment__wrap">
                <div class="comment__wrap__userinfo">
                  <span class="comment__wrap__userinfo__name">
                    <?php echo escape($row['nickname']) ?>
                  </span>
                  ·
                  <span class="comment__wrap__userinfo__date"> 
                    <?php echo escape($row['created_at']) ?>
                  </span>
                </div>
                <div class="comment__wrap__content"><?php echo escape($row['content']) ?>
                </div>
              </div>
            </div>
          <?php } ?>
        </section>
      </div>
    </div>
  </body>
</html>
