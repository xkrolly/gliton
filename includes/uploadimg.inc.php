<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	
if(isset($_POST['que'])){
//////////////////////////////////////////////
	$fff = $_FILES['upload']['name'];
	$destination_URL = '../img/'.$folder;
	$usersView->imgProcessor($file_name, $file_tmp_name, $destination_URL);
					
var_dump('fff: '.$fff);
///////////////////////////////////////////////
$que = $_POST['que'];
$cat = $_POST['cat'];
$msgReply = $_POST['msgReply'];
$mediaUsed = $_POST['mediaUsed'];
$chatLock = $_POST['lock'];
$rcid = $_POST['rcid'];
isset($_FILES['upload']['name']) ? $upload_name = $_FILES['upload']['name'] : $upload_name = '';
isset($_FILES['upload']['tmp_name']) ? $upload_tmp = $_FILES['upload']['tmp_name'] : $upload_tmp = '';

$i = count($_FILES['upload']['name']) - 1;
var_dump($que.'  '.$cat.'  '.$msgReply.'  '.$mediaUsed.'  '.$chatLock.'  '.$rcid.'  '.$upload_name.'  '.$upload_tmp.'  '.$i);
   			
$usersView->postChat2DB($que, $cat, $msgReply, $mediaUsed, $chatLock, $rcid, $upload_name, $upload_tmp, $i);

echo json_encode(array("resp" => 'success'));
}