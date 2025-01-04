<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

if(isset($_POST['newStat'])){
    $data = $usersView->fetchUser();
    $me = $data[0]['profile_id'];
    
    $xpt = $_POST['newStat'];
    $vals = $xpt.', '.$me;
    $usersContr->update('profile', 'xpt = ? WHERE profile_id = ?', $vals);
    
    $xpt == '1' ? $resp = '1' : $resp ='2'; 
   echo json_encode(array("resp" => $resp));
 
}