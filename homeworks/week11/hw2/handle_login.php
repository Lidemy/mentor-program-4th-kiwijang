<?php
  session_set_cookie_params(0, "/mtr04group1/naomi/hw2/");
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST['account_name']) ||
    empty($_POST['password'])  
  ) {
    header('Location: login.php?errCode=1');
    die();
  }

  $account_name = $_POST['account_name'];
  $password = $_POST['password'];

  $sql = sprintf(
    "select * from naomi_accounts where account_name=?",
    $account_name
  );
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $account_name);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }
  
  $result = $stmt->get_result();
  if ($result->num_rows === 0) {
    header('Location: login.php?errCode=2');
    exit();
  }

  // 有查到使用者
  $row = $result->fetch_assoc();
  if (password_verify($password, $row['password'])) {
    session_start();
    // 登入成功
    /*
     1. 產生 session id (token)
     2. 把 account_name 寫入檔案
     3. set-cookie: session-id
    */
    $_SESSION['account_name'] = $account_name;

    header('Location: index.php');
  } else {
    // 登入失敗 查無此人
    header('Location: login.php?errCode=2');
  }  
?>