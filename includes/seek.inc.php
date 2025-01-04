<?php

include('autoloader.inc.php');

$usersContr = new usersContr();
$usersView = new usersView();

$userData = $usersView->fetchUser();
$user = $userData[0]['profile_id'];
$newList = $usersView->newList($user);
//var_dump($newList);
$newListArr = explode(', ', $newList);
$n = count($newListArr);

echo json_encode(array("newList"=>$newList, "n"=>$n));
