<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

$delegCode = $_POST['delegCode'];
$del = explode('.', $delegCode);
$client = $del['1'];
$delegTime = $del['0'];
$cat = $del['2'];
$catData = $usersView->fetchaoi($cat);
$topic = $catData[0]['subcategory'];

//only tutors free on the delegTime
$tutors = $usersView->fetchFreeTutor($cat);


//get Delegator
$userData = $usersView->fetchUser();
$Delegator = $userData[0]['profile_id'];

$allTutors = array();

foreach($tutors as $tutor){
	$tutorName = $tutor['profile_id'].'_'.$usersView->decryptor0($tutor['lastname']).' '.$usersView->decryptor0($tutor['firstname']);
	$tutor['profile_id'] != $Delegator ? array_push($allTutors, $tutorName) : '';
}

//$client_DP = $usersView->generate_DP($client, '80px');
$client_profile = $usersView->fetchProfile($client);
$client_ID = $client_profile[0]['profile_id'];
$dp_URL = $client_profile[0]['picture'];
$client_fullname = $usersView->decryptor0($client_profile[0]['lastname']).' '.$usersView->decryptor0($client_profile[0]['firstname']);


echo json_encode(array("dp_URL"=> $dp_URL, "delegtime"=>$delegTime, "client_ID"=>$client_ID, "xpt"=>$Delegator, "cfn"=> ucfirst($client_fullname), "cat"=>$cat, "topic"=>ucfirst($topic), "tutors"=>$allTutors));