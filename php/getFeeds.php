<?php
require '../vendor/autoload.php'; // Include Composer autoload if you're using MongoDB PHP library

require 'mongodb.php'; // Replace with actual URI
$collection = $client->display->feeds;

$feeds = $collection->find([], ['sort' => ['_id' => -1]]);
$data = [];

foreach ($feeds as $feed) {
    $data[] = [
        'userId' => $feed->userId,
        'name' => $feed->name,
        'query' => $feed->query,
        'likes' => $feed->likes,
        'upvotes' => $feed->upvotes,
        'downvotes' => $feed->downvotes,
        'replies' => $feed->replies
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
