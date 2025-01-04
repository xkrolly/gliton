<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

    $delegator = $_POST['delegator'];
    $client = $_POST['client_ID'];
    $delegate = $_POST['delegate'];
    $category = $_POST['cat'];
    $delegtime = $_POST['delegtime'];
    $conversation_id = '';//$_POST['cid'];

	$usersView->delegateTask($delegator, $client, $delegate, $category, $delegtime, $conversation_id);
	