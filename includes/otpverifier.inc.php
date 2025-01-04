<?php

session_start();
include('autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();


  $_user_Mobile=$_POST['mobile'];

if(!empty($_user_Mobile)){
	$user_Mobile = $usersView->mobile4mat('234', $_user_Mobile, 10);
    $enc0_mobile = $usersView->encryptor0($user_Mobile);
    
    $otp= $_POST['otp'];
    $enc0_otp = $usersView->encryptor0($otp);

        $mobile_streamlined = $usersView->slice_enc0( $enc0_mobile );
        
        $otp_streamlined = $usersView->slice_enc0( $enc0_otp );
        
        $data = '%'.$mobile_streamlined.'%, %'.$otp_streamlined.'%';
        $check = $usersView->select('rac', ' WHERE contact LIKE ? AND code LIKE ?', $data);

if(count($check) > 0){

        $sessionID = session_id().sha1($user_Mobile);
	$_mobile_streamlined = '%'.$mobile_streamlined.'%';
	$mobile_array = array("contact"=>$enc0_mobile, "regCompleted"=>"0");
	$newUserData = $usersView->select('profile', ' WHERE contact LIKE ?', $_mobile_streamlined);
    $userExist = count($newUserData);

        $userExist == 0 ? $usersContr->insert('profile', $mobile_array) : '';
		
    	$newUserData = $usersView->select('profile', ' WHERE contact LIKE ?', $_mobile_streamlined);
		$profile_id = $newUserData[0]['profile_id'];
		$otpassword = password_hash($otp, PASSWORD_DEFAULT);

		$userData = $profile_id.', '.$enc0_mobile.', '.$otpassword.', '.$sessionID.', '.$profile_id;
		$userData_array = array("profile_id"=>$profile_id, "online"=>'1', "username"=>$enc0_mobile, "password"=>$otpassword, "session"=>$sessionID);
	    $userExist == 0 ? $usersContr->insert('skyman_user', $userData_array) : $usersContr->update('skyman_user', 'profile_id = ?, username = ?, password = ?, session = ? WHERE user_id = ?', $userData);

		$_SESSION['loadNewsFeed'] = 'I AM HAPPY OOOOOO';//true;
		$_SESSION['geoloc_switch_query'] = 0;
    	$data = '%'.$mobile_streamlined.'%, %'.$otp_streamlined.'%';
        $usersContr->delete('rac', ' WHERE contact LIKE ? AND code LIKE ?', $data);

      header('Location: ../index.php?&autolog='.$sessionID);

}else{
	echo "Your OTP is incorrect, try again!";

}
}else{
	echo "Enter a valid contact number";

}
