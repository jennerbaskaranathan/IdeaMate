<?php
include 'mongodb.php';
class UserManager {
    private $mongoCollection;
    public function __construct($mongoCollection) {
        $this->mongoCollection = $mongoCollection;
    }

    public function userExistsInMongoDB($id) {
        $existingDocument = $this->mongoCollection->findOne(['mailid' => $id]);
        return $existingDocument !== null;
    }

    public function userExists($id) {
        if ($this->userExistsInMongoDB($id)) {
            return true;
        }
        return false;
    }
}

$userManager = new UserManager($client->handler->users);

$id = $_POST['mail'];
if ($userManager->userExists($id)) {
    echo "true";
} else {
    echo "false";
}