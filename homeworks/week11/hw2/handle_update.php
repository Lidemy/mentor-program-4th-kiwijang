<?php
session_set_cookie_params(0, "/mtr04group1/naomi/hw2/");
session_start();
require_once "conn.php";
require_once "utils.php";

if (empty($_POST['id'])) {
    header('Location: index.php');
}
$article_id = $_POST['id'];

if (empty($_POST['content']) || empty($_POST['title'])) {
    header('Location: edit.php?errCode=1&id=' . $article_id);
    die('請輸入 content 和 title');
}
if (empty($_SESSION['account_name'])) {
    header('Location: index.php?errCode=1');
    die('沒有 account_name 請先登入');
}

updateComment($article_id);
header("Location: index.php?update=yap");

function updateComment($article_id)
{
    global $conn;
    $content = $_POST['content'];
    $title = $_POST['title'];
    $sql = sprintf(
        "update naomi_articles
      set content=?, title=?
      where article_id=?",
        $content,
        $title,
        $article_id
    );
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('ssi', $content, $title, $article_id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
}
?>