<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

    $data = $usersView->fetchUser();
    $regCompleted = $data[0]['regCompleted'];

if($regCompleted == 1){

    $_prdID = $_POST['prdID'];
    $PI_typeCol = 'favs';
    $PI_totalCol = 'tF';

    $dynamus = $usersView->productInteraction($_prdID, $PI_typeCol, $PI_totalCol);
//var_dump($dynamus);
    $addFav = $dynamus[0];
    $newtotalFavs = $dynamus[1];
    $prdID = $dynamus[2];
    $pubid = $dynamus[3];

    echo json_encode(array('status' => $addFav, 'ttf'=>$newtotalFavs, 'prdid'=>$prdID_, 'pubid'=>$pubid));
}
else{
		return $usersView->completeRegFirst();
}