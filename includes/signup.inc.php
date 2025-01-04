<?php
include('autoloader.inc.php');

$usersView = new usersView();

!empty($_POST['mobileNum']) ? $response = $usersView->getSignupCode($_POST['mobileNum']) : $reponse = array('4', '', '');
$reply = $response[0];
$user_phoneNum = $response[1];
$code = $response[2];

 echo json_encode(array("ajaxReply"=> $reply, "mobile"=>$user_phoneNum, "code"=>$code));
