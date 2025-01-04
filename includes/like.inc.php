<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

    $data = $usersView->fetchUser();
    $regCompleted = $data[0]['regCompleted'];

if($regCompleted == 1){

    $_prdID = $_POST['prdID'];
    $PI_typeCol = 'likes';
    $PI_totalCol = 'tL';

    $dynamus = $usersView->productInteraction($_prdID, $PI_typeCol, $PI_totalCol);
    $addLike = $dynamus[0];
    $newtotalLikes = $dynamus[1];
    $prdID = $dynamus[2];
    $pubid = $dynamus[3];

//   echo json_encode(array('status' => $dynamus));
   echo json_encode(array('status' => $addLike, 'ttl'=>$newtotalLikes, 'prdid'=>$prdID_, 'pubid'=>$pubid));
}
else{
		return $usersView->completeRegFirst();
}