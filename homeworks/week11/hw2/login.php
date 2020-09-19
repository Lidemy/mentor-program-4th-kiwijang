<?php
  // 防止重複登入
  session_start();
  if (!empty($_SESSION['account_name'])) {
    header('Location: index.php');
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
  <div class="login-wrapper">
    <h2>Login</h2>
      <?php 
        $msg = NULL;
        if (!empty($_GET["errCode"])) {
          $code = $_GET["errCode"];
          $msg = "Error";
          if ($code === "1") {
            $msg = "資料不齊全";
          } else if ($code === "2") {
            $msg = "帳號或密碼輸入錯誤";
          }
          echo "<h3 class='red'>" . $msg . "</h3>";
        }
      ?>
    <form action="./handle_login.php" method="POST">
      <div class="input__wrapper">
        <div class="input__label">USERNAME</div>
        <input class="input__field" type="text" name="account_name" />
      </div>

      <div class="input__wrapper">
        <div class="input__label">PASSWORD</div>
        <input class="input__field" type="password" name="password" />
      </div>
      <input type='submit' value="登入" />
    </form>
     
  </div>
</body>
</html>