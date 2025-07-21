<?php
require '../vendor/autoload.php';
require 'mongodb.php';

$collection = $client->display->ideas;

function getNextIdeaId($client) {
    $counters = $client->display->countersIdea;

    $updateResult = $counters->findOneAndUpdate(
        ['_id' => 'ideaid'],
        ['$inc' => ['seq' => 1]],
        ['returnDocument' => MongoDB\Operation\FindOneAndUpdate::RETURN_DOCUMENT_AFTER, 'upsert' => true]
    );

    return $updateResult->seq;
}

if (isset($_POST['idea']) && isset($_POST['domain']) && isset($_POST['type'])) {
    $idea = $_POST['idea'];
    $domain = $_POST['domain'];
    $type = $_POST['type'];
    $userId = $_POST['userid'] ?? "";
    $summary = $_POST['summary'] ?? "";
    $title = $_POST['title'] ?? "";

    $ideaid = getNextIdeaId($client); // auto-incremented

    $insertResult = $collection->insertOne([
        'userid' => $userId,
        'ideaid' => $ideaid,
        'idea' => $idea,
        'summary' => $summary,
        'domain' => $domain,
        'type' => $type,
        'likes' => [],
        'upvotes' => [],
        'downvotes' => [],
        'replies' => [],
        'title' => $title
    ]);

    echo json_encode(['status' => 'success', 'ideaid' => $ideaid, 'id' => (string) $insertResult->getInsertedId()]);
} else {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required POST data']);
}
?>
