<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

    $data = $usersView->fetchUser();
    $regCompleted = $data[0]['regCompleted'];

if($regCompleted == 1){

    $_prdID = $_POST['prdID'];
    $PI_totalCol = 'tF';
    $prdType = $_POST['val'];
    $prdType == 'tpp' ? $PI_typeCol = '3ppfavs' : $PI_typeCol = 'favs';

    $dynamus = $usersView->productInteraction($_prdID, $PI_typeCol, $PI_totalCol, $prdType);

    $addFav = $dynamus[0];
    $newtotalFavs = $dynamus[1];
    $prdID = $dynamus[2];
    $pubid = $dynamus[3];

    echo json_encode(array('status' => $addFav, 'ttf'=>$newtotalFavs, 'prdid'=>$prdID_, 'pubid'=>$pubid, 'prdType'=>$prdType));
}
else{
		return $usersView->completeRegFirst();
}
