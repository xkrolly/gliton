<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();
	$_appo = $_POST['appo']; 
    $appoday = $_POST['appoday'];
    $data = $usersView->fetchUser();
    $me = $data[0]['profile_id'];
    
$vals = $_appo.', '.$me;
$checkme = $usersView->select('appointment', ' WHERE profile_id = ?', $me);
if(count($checkme)>0){
$usersContr->update('appointment', 'freetime = ? WHERE profile_id = ?', $vals);
}else{
    $ins_vals = array('freetime'=>$_appo, 'profile_id'=>$me);
    $usersContr->insert('appointment', $ins_vals);    
}
echo json_encode(array('appocal' => $_appo, 'appoday'=>$appoday));
