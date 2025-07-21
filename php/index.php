<?php
require 'mongodb.php'; // assumes $mongoClient is defined in this file

class User {
    private $mongo;

    public function __construct($mongoClient) {
        $this->mongo = $mongoClient;
    }

    public function authenticate($email, $password) {
        $collection = $this->mongo->selectDatabase('handler')->selectCollection('users');
        $user = $collection->findOne(['mailid' => $email]);

        if ($user && isset($user['password']) && $user['password'] === $password) {
            return [
                'status' => 'success',
                'userId' => $user['id']
            ];
        }

        return false;
    }
}

$email = $_POST['mail'] ?? '';
$password = $_POST['password'] ?? '';

$user = new User($client);
$response = $user->authenticate($email, $password);

if ($response) {
    echo json_encode($response);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid']);
}
