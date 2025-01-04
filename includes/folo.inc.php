<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();
	$_xpt = $_POST['xpt'];

    $xpt = $usersView->dec_cons($_xpt);


    $data = $usersView->fetchUser();
    $me = $data[0]['profile_id'];

//    $val1 = $xpt.', '.%_$me_%;

$checkxpt = $usersView->select('profile', ' WHERE profile_id = ?', $xpt);

$xptFoloas = $checkxpt[0]['foloas'];
$totalFoloas = $checkxpt[0]['tf'];
empty($xptFoloas) ? $xptFoloas = '_'.$xptFoloas : '';
$xptFoloasPlusMe = $xptFoloas.$me.'_';

$newtotalFoloas = $totalFoloas + 1;
$vals = $xptFoloasPlusMe.', '.$newtotalFoloas.', '.$xpt;

$check = $usersView->checkFoloa($xpt, $me);

$addMe = '';
if(count($check) == 0 ){
    $addMe .='1';
    $usersContr->update('profile', 'foloas = ?, tf = ? WHERE profile_id = ?', $vals);
}

$xpt_ = $usersView->cutSpecialChars($_xpt);
echo json_encode(array('status' => $addMe, 'ttf'=>$newtotalFoloas, 'xid'=>$xpt_));
