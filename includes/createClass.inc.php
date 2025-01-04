<?php
include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['topic'])){
	$topic = $_POST['topic'];
	$topicDesc = $usersView->enc_cons($_POST['topic-desc']);

	$date = $_POST['date'];
	$time = $_POST['time'];
	$lecturefee = $_POST['lecturefee'];
	$fulldate = $date.' '.$time;
	$classTimestamp = strtotime($date.' '.$time);

	$output = $usersView->createClass($topic, $topicDesc, $fulldate, $lecturefee);

    echo json_encode(array("resp"=> $output));
 
}
