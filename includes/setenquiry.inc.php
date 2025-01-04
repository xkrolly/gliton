<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();
//	$usersView->checkSubscription($_cat);
	
	!empty($_POST['category']) ? $_cat = $_POST['category'] : $_cat = $_POST['categoryg'];

	$msgReply = $_POST['msgReply'];
	$mediaUsed = $_POST['mediaUsed'];
	!empty($_POST['lock']) ? $chatLock = $_POST['lock'] : $chatLock =0;
	$que = $_POST['encmsg'];
	isset($_POST['rcid']) ? $rcid = $_POST['rcid'] : $rcid = '';
	isset($_POST['cid']) ? $cid = $_POST['cid'] : $cid = '';
	isset($_POST['chatpop']) ? $chatpop = $_POST['chatpop'] : $chatpop = '';

	isset($_FILES['upload']['name']) ? $upload_name = $_FILES['upload']['name'] : $upload_name = '';
	isset($_FILES['upload']['tmp_name']) ? $upload_tmp = $_FILES['upload']['tmp_name'] : $upload_tmp = '';

	//set new conversation id for learner
	isset($_FILES['upload']['name']) ? $i = count($_FILES['upload']['name']) - 1 : $i=0;
//	$upload_tmp_arr = $_FILES['upload']['tmp_name'];
	$output = $usersView->postChat2DB($cid, $que, $_cat, $msgReply, $mediaUsed, $chatLock, $rcid, $upload_name, $upload_tmp, $i, $chatpop);

	echo json_encode(array("n" => $i));
