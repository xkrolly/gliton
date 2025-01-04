<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	
if(isset($_GET['chid'])){

	$chid = $_GET['chid'];
	$action = $_GET['action'];
	
	$usersView->lockChat($action, $chid);

 		echo json_encode(array("command" => $action, "chid"=>$chid));

}  

