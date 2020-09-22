<?php
require_once "conn.php";

function getUserFromAccount_name($account_name)
{
    global $conn;
    $sql = sprintf(
        "select account_name,account_id,nickname,auth_name from naomi_accounts where account_name = ?",
        $account_name
    );
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $account_name);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
    // Gets a result set from a prepared statement 拿到 sql 結果
    $result = $stmt->get_result();
    // Fetch a result row as an associative array 將 sql 結果轉成 php 物件
    $row = $result->fetch_assoc();
    return $row; // account_name, id, nickname
}

function escape($str)
{
    return htmlspecialchars($str, ENT_QUOTES);
}

function getArticleByArticleid($article_id)
{
    global $conn;
    $sql = sprintf("select * from naomi_articles where article_id=?", $article_id);
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $article_id);
    $result = $stmt->execute();
    if (!$result) {
        die('Error:' . $conn->error);
    }
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    return $row;
}