<?php
  session_set_cookie_params(0, "/mtr04group1/naomi/hw2/");
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $account_name = NULL;
  $user_row = NULL;
  $auth_name = NULL;

  // 如果已登入
  if (!empty($_SESSION['account_name'])) {
    $account_name = $_SESSION['account_name'];
    $user_row = getUserFromAccount_name($account_name);

    $auth_name = $user_row['auth_name'];
  }
  // 不是 Admin 導回 index
  if($auth_name != 'admin') {
    header("Location: index.php?errCode=noAuth");
    exit();
  }
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <ul class="navbar__list">
        <div>
          <li><a href="admin.php">文章列表</a></li>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <form action="./handle_add.php" method="POST">
          <div class="edit-post__title">
            新增文章：
          </div>
          <?php 
              $msg = NULL;
              if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                $msg = "Error";
                if ($code === "1") {
                  $msg = "資料不完整";
                }
                echo "<li class='red'>" . $msg . "</li>";
              }
          ?>
          <div class="edit-post__input-wrapper">
            <input class="edit-post__input" placeholder="請輸入文章標題" name="title"/>
          </div>
          <div class="edit-post__input-wrapper">
            <textarea rows="20" class="edit-post__content" name="content" maxlength="300"></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
              <button class="edit-post__btn" type="submit">送出</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>