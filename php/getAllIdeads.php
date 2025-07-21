<?php
require '../vendor/autoload.php'; // Include Composer autoload if you're using MongoDB PHP library
require 'mongodb.php'; // MongoDB client connection

$collection = $client->display->ideas;

// Find all ideas sorted by most recent
$ideas = $collection->find([], ['sort' => ['_id' => -1]]);
$data = [];

foreach ($ideas as $idea1) {
    $data[] = [
        'userid' => $idea1->userid ?? null,
        'ideaid' => $idea1->ideaid ?? null,
        'idea' => $idea1->idea ?? '',
        'summary' => $idea1->summary ?? '',
        'domain' => $idea1->domain ?? '',
        'type' => $idea1->type ?? '',
        'likes' => $idea1->likes ?? [],
        'upvotes' => $idea1->upvotes ?? [],
        'downvotes' => $idea1->downvotes ?? [],
        'replies' => $idea1->replies ?? [],
        'title' => $idea1->title ?? ''
    ];
}

header('Content-Type: application/json');
echo json_encode($data);
