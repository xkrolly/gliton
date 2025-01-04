<?php
include_once 'autoloader.inc.php';

$usersContr = new usersContr();
$usersView = new usersView();

$data = $usersView->fetchUser();
$profileID = $data[0]['profile_id'];
//$val = $status.', '.$profileID;

if($_POST['type'] == 'upd'){
$status = $_POST['st'];
$udata = $usersView->select('skyman_user', ' WHERE profile_id = ?', $profileID);

$Oldstatus = $udata[0]['online'];
$newstatus = intval($Oldstatus) + 1;
$val = $newstatus.', '.$profileID;
$usersContr->update('skyman_user', 'online = ? WHERE user_id = ?', $val);

 	echo json_encode(array('stat' => $newstatus));
}

if($_POST['type'] == 'check'){

  $rid = $_POST['rid'];
  $drid = $usersView->dec_cons($rid);
  
  $rdata = $usersView->select('skyman_user', ' WHERE profile_id = ?', $drid);
  $rStatus = $rdata[0]['online'];
  
  echo json_encode(array('rstat' => $rStatus, 'rid'=>$rid, 'drid'=>$drid));
  
}

