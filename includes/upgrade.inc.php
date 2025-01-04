<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['cats'])){
    $n = $_POST['cats'];
    $pid = $_POST['pid'];

	$allSelected = array();
	
	while($n > 0){
		
		isset($_POST['cat'.$n]) ? array_push($allSelected, $_POST['cat'.$n]) : '';

		$n--;
	}
	$usersView->makeTutor($pid, $allSelected);
	
    echo json_encode(array("dialog"=> "dialog".$pid));

}