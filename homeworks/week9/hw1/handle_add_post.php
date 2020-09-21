<?php
  session_set_cookie_params(0, "/mtr04group1/naomi/week9/");
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $result = $conn->query("SELECT * FROM naomi_comments");

  if (!$result) {
    die($conn->error);
  }

  if (empty($_POST['content'])) {
    header('Location: index.php?errCode=1');
    die('請輸入 content');
  }
  $username = $_SESSION['username'];
  if(empty($username)) {
    header('Location: index.php?errCode=1');
    die('沒有 username 請先登入');
  }
  // username 是從 session 裡拿來的
  $user = getUserFromUsername($username);
  if (!empty($username)) {  
    $nickname = $user['nickname'];
    $id = $user['id'];
  }

  $content = $_POST['content'];
  $sql = sprintf(
    "insert into naomi_comments(nickname,content)
    values(?,?)",
    $nickname,
    $content
  );
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $nickname, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  
  $id = $stmt->insert_id;
  
  // log
  $origin = getRealIpAddr();
  updClientlog($origin, $id);

  header("Location: index.php");
?>