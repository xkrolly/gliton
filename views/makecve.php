<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	
if(isset($_GET['chid'])){

	$chid = $_GET['chid'];
	$cveType = $_GET['cveType'];
	$usersView->makeCVE($cveType, $chid);

 		echo json_encode(array("chid"=>$chid, "cveType"=>$cveType));

}  

