<?php
var_dump('expression 00');

include('autoloader.inc.php');
var_dump('expression 001');

$usersView = new usersView();
$usersContr = new usersContr();
var_dump('expression 002');


  $_user_Mobile=$_POST['mobile'];
  		echo "<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en' dir='ltr'>
  <head>
   <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <meta http-equiv='x-ua-compatible' content='ie=edge'>
 </head>
  <body>";
var_dump('expression 1');
if(!empty($_user_Mobile)){
	$user_Mobile = $usersView->mobile4mat('234', $_user_Mobile, 10);
  $enc0_mobile = $usersView->encryptor0($user_Mobile);
var_dump('expression 2');

$otp= $_POST['otp'];
$enc0_otp = $usersView->encryptor0($otp);
//echo 'I am otp: '.$enc0_otp;

$mobile_streamlined = $usersView->slice_enc0( $enc0_mobile );

$otp_streamlined = $usersView->slice_enc0( $enc0_otp );
var_dump('expression 3');

$data = '%'.$mobile_streamlined.'%, %'.$otp_streamlined.'%';
$check = $usersView->select('rac', ' WHERE contact LIKE ? AND code LIKE ?', $data);
var_dump('expression 4');

if(count($check) > 0){
	$_mobile_streamlined = '%'.$mobile_streamlined.'%';
	$mobile_array = array("contact"=>$enc0_mobile, "regCompleted"=>"0");
	$newUserData = $usersView->select('profile', ' WHERE contact LIKE ?', $_mobile_streamlined);
var_dump('expression 5');

  if(count($newUserData)==0){
		$usersContr->insert('profile', $mobile_array);
    	
    	$newUserData = $usersView->select('profile', ' WHERE contact LIKE ?', $_mobile_streamlined);
		$profile_id = $newUserData[0]['profile_id'];
		$otpassword = password_hash($otp, PASSWORD_DEFAULT);

        $sessionID = session_id().sha1($_user_Mobile);

		$userData_array = array("profile_id"=>$profile_id, "online"=>'1', "username"=>$enc0_mobile, "password"=>$otpassword, "session"=>$sessionID);
var_dump('expression 6');

		$usersContr->insert('skyman_user', $userData_array);
var_dump('expression 7');

	//	session_start();
		$_SESSION['user_id'] = $sessionID;// $newUserID[0]['user_id'];
		$_SESSION['loadNewsFeed'] = true;
		$_SESSION['geoloc_switch_query'] = 0;
			header('Location: ../index.php');
	$data = '%'.$mobile_streamlined.'%, %'.$otp_streamlined.'%';
    $usersContr->delete('rac', ' WHERE contact LIKE ? AND code LIKE ?', $data);
	var_dump('expression 8');

	}else{
		var_dump('expression 9');

/*	 $data = $enc0_otp.', '.$enc0_mobile;
     $usersContr->update('rac', 'code = ? WHERE contact LIKE ?', $data);
*/			header('Location: ../index.php');
	}

}else{
	echo "Your OTP is incorrect, try again!";
	var_dump('expression 10');

}
}else{
	echo "Enter a valid contact number";
	var_dump('expression 11');

}
echo "</body>
</html>";