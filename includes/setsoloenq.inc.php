<?php
	
	include('autoloader.inc.php');
	
	$usersContr = new usersContr();
	$usersView = new usersView();
	
	$cat = $_POST['cat'];
	$media = $_POST['mediaType'];
	$contentID_enc = $_POST['cid'];

    $userData = $usersView->fetchUser();
    $que = $userData[0]['save_que'];

	$output = $usersView->postSoloChat($cat, $que, $media, $contentID_enc, '', '', '');
