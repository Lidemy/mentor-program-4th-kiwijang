<?php
  session_set_cookie_params(0, "/mtr04group1/naomi/hw2/");
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  /*
    1. 從 cookie 裡面讀取 PHPSESSION(token)
    2. 從檔案裡面讀取 session id 的內容
    3. 放到 $_SESSION
  */
  $account_name = NULL;
  $user_row = NULL;
  $auth_name = NULL;

  // 如果已登入
  if (!empty($_SESSION['account_name'])) {
    $account_name = $_SESSION['account_name'];
    $user_row = getUserFromAccount_name($account_name);

    $account_nickname = $user_row['nickname'];
    $account_id = $user_row['account_id'];
    $auth_name = $user_row['auth_name'];
  }

  $result = $conn->query(
    "select * from naomi_articles
    order by created_at desc");
  if(!$result) {
    die('Error:' . $conn->error);
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
          <?php 
              $msg = NULL;
              if (!empty($_GET["errCode"])) {
                $code = $_GET["errCode"];
                $msg = "Error";
                if ($code === "noAuth") {
                  $msg = "※訪客沒有編輯權限。";
                }
                if ($code === "9") {
                  $msg = "這則文章已經不存在了喔，已幫您取得最新文章狀態~";
                }
                echo "<li class='red'>" . $msg . "</li>";
              }
              if (!empty($_GET["update"]) && $_GET["update"] == "yap") {
                echo "<li class='red'>編輯成功!!</li>";
              }
              if (!empty($_GET["delete"]) && $_GET["delete"] == "yap") {
                echo "<li class='red'>刪除成功!!</li>";
              }
          ?>
        </div>
        <div>
          <?php if (!empty($auth_name) && $auth_name === "admin") { ?>
            <li><a href="admin.php">管理後台</a></li>
            <li><a href="add.php">新增文章</a></li>
          <?php } ?>
          <?php if (empty($account_name)) { ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
          <?php if (!empty($account_name)) { ?>
            <li><a href="logout.php">登出</a></li>
          <?php } ?>
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
    <div class="posts">
      <?php while($row = $result->fetch_assoc()) {?>
        
      <article class="post">
        <div class="post__header">
          <div>
            <?php echo escape($row['title']) ?>
          </div>
          <div class="post__actions">                
            <?php if (!empty($auth_name) && $auth_name === "admin") { ?>
              <a class="post__action" href="edit.php?id=<?php echo escape($row['article_id']) ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo escape($row['created_at']) ?>
        </div>
        <div class="post__content"><?php echo escape($row['content']) ?>
        </div>
      </article>

      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>