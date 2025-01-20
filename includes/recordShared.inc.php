<?php

include_once 'autoloader.inc.php';

$usersContr = new usersContr();
$usersView = new usersView();

$id = $_POST['id'];
$usersView->recordSharedContent($id);
