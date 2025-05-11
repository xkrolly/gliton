<?php

include('autoloader.inc.php');

$usersContr = new usersContr();
$usersView = new usersView();

$userData = $usersView->fetchUser();
$user = $userData[0]['profile_id'];
$newList = $usersView->newList($user);

$thirdpartyProdList = $usersView->thirdPPL($user);
$prodListArr = explode(', ', $thirdpartyProdList);//['a', 'b', 'c'];//

$newListArr = explode(', ', $newList);

$finalArr = [];

$i = 0;
$j = 0;

while($i < count($newListArr) || $j < count($prodListArr)){
	$step = rand(0, 3);
	$step = min($step, count($newListArr) - $i);

	for($k = 0; $k < $step && $i < count($newListArr); $k++){
		$finalArr[] = $newListArr[$i];
		$i++;
	}
	if($j < count($prodListArr)){
		$finalArr[] = $prodListArr[$j];
		$j++;
	}
}

$n = count($finalArr);

$finalList = implode(', ', $finalArr);
echo json_encode(array("newList"=>$finalList, "n"=>$n));
