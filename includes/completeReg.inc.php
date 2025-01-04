<?php

include('autoloader.inc.php');
	$usersView = new usersView();

	$_un = strtolower($_POST['user-name']);
	$username = trim($_un);
	$pwd = trim($_POST['pass-phrase']);
//	$whatsApp = '234'.substr($_POST['con-tact'], -10);
	$email = strtolower($_POST['con-tact']);
	$firstname = strtolower($_POST['first-name']);
	$surname = strtolower($_POST['last-name']);
	$public_key = $_POST['mypub'];
	$private_key = $_POST['prv'];
	$enc_pwd = $_POST['enc_pwd'];
	
	//var_dump($username.', '.$pwd.', '.$email.', '.$firstname.', '.$surname.', '.$public_key.', '.$private_key.', '.$enc_pwd);
	!empty($_un) && !empty($pwd) && !empty($email) ? 
	$command = $usersView->createNewUserAccount($username, $pwd, $email, $firstname, $surname, $public_key, $private_key, $enc_pwd) : 
	$command = "Fill out all the form fields!";
//var_dump('HAIHeee');

 	echo json_encode(array("ajaxReply"=> $command));

