<?php
require_once "conn.php";

function getUserFromUsername($username) {
    global $conn;
    $sql = sprintf(
        "select * from naomi_users where username = ?",
        $username
    );
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $username);
    $result = $stmt->execute();
    if (!$result) {
      die($conn->error);
    }
    // Gets a result set from a prepared statement 拿到 sql 結果
    $result = $stmt->get_result();
    // Fetch a result row as an associative array 將 sql 結果轉成 php 物件
    $row = $result->fetch_assoc();
    return $row; // username, id, nickname
}

function escape($str) {
    return htmlspecialchars($str, ENT_QUOTES);
}

function updClientlog($origin, $insertId) {
    global $conn;
    $sql = sprintf(
        "UPDATE naomi_comments SET origin=? WHERE id=$insertId",
        $origin
    );
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s', $origin);
    $result = $stmt->execute();
    if (!$result) {
        die($conn->error);
    }
}

// 來源: http://itman.in/en/how-to-get-client-ip-address-in-php/
function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

?>