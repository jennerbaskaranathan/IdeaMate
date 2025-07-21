<?php
require '../vendor/autoload.php'; // Include Composer autoload if you're using MongoDB PHP library

require 'mongodb.php'; // Replace with actual URI
$collection = $client->display->ideas;

$id = $_POST['id'];
$feeds = $collection->find(
    ['user_id' => $id], // Replace 'user_id' with your actual field name
);

$data = [];

foreach ($feeds as $feed) {
    $data[] = [
        'userId' => $feed->userId,
        'ideaId' => $feed->ideaid,
        'idea' => $feed->idea,
        'domain' => $feed->domain,
        'type' => $feed->type,
        'likes' => $feed->likes,
        'upvotes' => $feed->upvotes,
        'downvotes' => $feed->downvotes,
        'replies' => $feed->replies
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
