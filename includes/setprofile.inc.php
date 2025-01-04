<?php

include('autoloader.inc.php');
	
	$usersContr = new usersContr();
	$usersView = new usersView();
	$userData = $usersView->fetchUser();

$uid = $userData[0]['profile_id'];
$H_target=$uid.'H'.time();
$P_target=$uid.'P'.time();

isset($_POST['sex']) ? $gender = $_POST['sex'] : $gender='';
isset($_POST['profession']) ? $profession = $_POST['profession'] : $profession = '';
isset( $_POST['contact']) ? $contact = $_POST['contact'] : $contact='';
isset($_FILES['imgH']['name']) ? $imgH = $_FILES['imgH']['tmp_name'] : $imgH = '';
isset($_FILES['imgP']['name']) ? $imgP = $_FILES['imgP']['tmp_name'] : $imgP = '';
isset( $_POST['hideProfile']) ? $hideProfile = $_POST['hideProfile'] : $hideProfile='';


isset($_FILES['imgH']['tmp_name']) ? move_uploaded_file($imgH, '../img/profiles/header/'.$H_target.".webp") : $nothing = '';

isset($_FILES['imgP']['tmp_name']) ? move_uploaded_file($imgP, '../img/profiles/profile/'.$P_target.".webp") :  $nothing = '';

$user = $uid;
!empty($imgP) ? $profile = $P_target.', ' : $profile='';
!empty($imgH) ? $header = $H_target.', ' : $header='';
!empty($hideProfile) ? $hideProfile = $hideProfile.', ' : $hideProfile = '';

//$showProfile = $hideProfile.', ';
!empty($contact) ? $contact = $contact.', ' : $contact='';
!empty($profession) ? $profession = $profession.', ' : $profession='';

!empty($imgP) ? $profileC = 'picture=?, ' : $profileC ='';
!empty($imgH) ? $headerC = 'headerImg = ?, ' : $headerC ='';
!empty($hideProfile) ? $hideProfileC = 'hideProfile = ?, ' : $hideProfileC ='';

//$showProfileC = 'hideProfile = ?, ';
!empty($contact) ? $contactC = 'contact = ?, ' : $contactC='';
!empty($profession) ? $professionC = 'profession = ?, ' : $professionC='';
$userC = 'profile_id = ?';


$_selectedCols = $contactC.$professionC.$profileC.$headerC.$hideProfileC;
//delete the last two string
$selectedCols = substr($_selectedCols, 0, -2);

$vals = $contact.$profession.$profile.$header.$hideProfile.$user;

$usersContr->update('profile', $selectedCols.' WHERE profile_id = ?', $vals);

echo json_encode(array('ajaxReply'=>'Profile update successful'));
