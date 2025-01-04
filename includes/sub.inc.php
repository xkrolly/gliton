<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['category'])){

    $category = $_POST['category'];
	$dur = $_POST['dur'];
	$userData = $usersView->fetchUser();
	$me = $userData[0]['profile_id'];

  	$data = $usersView->subscribe($category, $dur);
  	$dataArr = explode(', ', $data);
	$cat = $dataArr[0];
	$charges = $dataArr[1];
	$redirectURL = $dataArr[2];
	$valueOffered = $dataArr[3];
	$product_ID = time().$dataArr[4].$me;

	$uData = $usersView->fetchUser();

	$email = 'xkrolly@gmail.com';
	$contact = $usersView->decryptor0($uData[0]['contact']);
	$fullname = $usersView->decryptor0($uData[0]['firstname']).'-'.$usersView->decryptor0($uData[0]['lastname']);

//  	$usersView->pay_now($cat, $charges, $redirectURL, $valueOffered, $product_ID);

    if($data != 'YES'){echo json_encode(array('cat'=>$cat, 'charges'=>$charges, 'email'=>$email, 'contact'=>$contact, 'fullname'=>$fullname, 'url'=>$redirectURL, 'val'=>$valueOffered, 'prdID'=>$product_ID, "sub_cat"=> $category, "dur"=> $dur));}
}