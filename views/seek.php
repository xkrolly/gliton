<?php

include('autoloader.inc.php');

$usersContr = new usersContr();
$usersView = new usersView();

$userData = $usersView->fetchUser();
$myLovedContents = $userData[0]['mylc'];

$newList = $usersView->newList($myLovedContents);	
 	echo json_encode(array("newList"=> $newList));
