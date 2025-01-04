<?php
include_once 'includes/autoloader.inc.php';

$usersContr = new usersContr();
$usersView = new usersView();

$_POST['category'] = '1';
$_SESSION['insertToScd'] = FALSE;
return $usersView->myChatHistory();
