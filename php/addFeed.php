<?php
require '../vendor/autoload.php';
require 'mongodb.php';


$collection = $client->display->feeds;


if (isset($_POST['query']) && isset($_POST['userId'])) {
    $query = $_POST['query'];
    //$query = "how you doing??";
    $userId = $_POST['userId'];
$usercollection = $client->handler->users->findOne(['id' => (int)$userId]);
$name = $usercollection->fname . " " . $usercollection->lname;
    $insertResult = $collection->insertOne([
        'userId' => (int)$userId,
        'name' => $name,
        'query' => $query,
        'likes' => [],
        'upvotes' => [],
        'downvotes' => [],
        'replies' => []
    ]);

    echo json_encode(['status' => 'success', 'id' => (string) $insertResult->getInsertedId()]);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing POST data']);
}
?>
