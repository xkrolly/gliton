<?php

include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();

if(isset($_POST['pid'])){
$pid = $_POST['pid'];
$val = '1, '.$pid;
$usersContr->update('profile', 'ban = ? WHERE profile_id = ?', $val);
 echo json_encode(array("id"=> $pid));
}

if(isset($_POST['pubid'])){
    $pubid = $_POST['pubid'];
    $val2 = '1, '.$pubid;
    
$usersContr->update('publish', 'approval = ? WHERE pub_id = ?', $val2);
 echo json_encode(array("pubid"=> $pubid));
   
}