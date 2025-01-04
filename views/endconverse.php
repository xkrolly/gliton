<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	
if(isset($_POST['uniqconv_id'])){

	$uniq_conv = $_POST['uniqconv_id'];
	$id = $_POST['id'];
	$status = $_POST['status'];

	$vals = $status.', '.$uniq_conv;
    $usersContr->update('chat', 'close = ? WHERE uniq_conv = ?', $vals);

   /* $uniq = explode('_', $uniq_conv);
    $tutor = $uniq[0];
    $leaner =  $uniq[1];
    //disengage both tutor and learner
    $valus1 = '0, 0, '.$tutor;
    $usersContr->update('profile', 'engaged = ?, engager = ? WHERE profile_id = ?', $valus1);
    $valus2 = '0, 0, '.$leaner;
    $usersContr->update('profile', 'engaged = ?, engager = ? WHERE profile_id = ?', $valus2);
*/
 		echo json_encode(array("output" => $status, 'id'=>$id));

}
