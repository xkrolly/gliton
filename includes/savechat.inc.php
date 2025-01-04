<?php
include('autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	$cat = $usersView->decryptor0( $_POST['cat_enc'] );
	$uniqCon_enc = $_POST['uniqCon_enc'];
	
	$chats = $usersView->savelocally($uniqCon_enc, $cat);
 		echo json_encode(array("output" => $chats));
