<?php
session_set_cookie_params(0, "/mtr04group1/naomi/hw2/");
session_start();
require_once "conn.php";
require_once "utils.php";

// 檢查有無 id
if (!empty($_GET['id'])) {
  $article_id = $_GET['id'];
} else {
    header("Location: admin.php");
    exit();
}
// 檢查要刪的 article_id 存不存在，避免其他頁面已刪，使用者還可打開編輯
$article_row = getArticleByArticleid($article_id);
if (empty($article_row)) {
    header("Location: index.php?errCode=9");
    exit();
}

if (empty($_SESSION['account_name'])) {
    header('Location: index.php?errCode=1');
    die('沒有 account_name 請先登入');
}

deleteArticle($article_id);
header("Location: index.php?delete=yap");

function deleteArticle($article_id)
{
    global $conn;
    $sql = sprintf(
        "delete from naomi_articles
        where article_id=?",
        $article_id
    );
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $article_id);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
}
