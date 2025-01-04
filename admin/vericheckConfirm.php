<?php

include('../includes/autoloader.inc.php');
$usersContr = new usersContr();
$usersView = new usersView();

$cat = $_POST['category'];
$pid = $_POST['applicant'];
$userCERT = $_POST['userCERT'];

//$cat = str_replace('_', '-', $cat);
$vals = $userCERT.', '.$cat.', '.$pid;

$usersContr->update('profile', 'professional_cert = ?, aoi = ? WHERE profile_id = ?', $vals);

//msg applicant their verification request approved
$usersView->msgUser('0', $pid, 3, $cat, '');

echo json_encode(array("data"=>''));
