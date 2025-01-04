<?php
require('../classes/textlocal.class.php');
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

	$Textlocal = new Textlocal(false, false, 'your apiKey');
    $pn = $usersView->enc_cons($_POST['mobileNum']);
	$numbers = array($pn);
	$sender = 'GLit';
	$message = rand(10000, 99999);
	
	$vals = array('contact'=>$pn, 'code'=>$message);
	$usersContr->insert('rac', $vals);
	$response = $textlocal->sendSms($numbers, $message, $sender);
	echo json_encode(array('resp' => $response));
//print_r($response);