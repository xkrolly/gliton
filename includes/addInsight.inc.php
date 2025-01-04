<?php
include('autoloader.inc.php');
$usersView = new usersView();
$usersContr = new usersContr();

$scrollet_insight = trim($_POST['content']);
$scrollet_insight = str_replace('  ', '\n\n', $scrollet_insight);
$insightID = $_POST['contid'];
$soloID = str_replace("cntted", '', $insightID);

$vals = $scrollet_insight.', '.$soloID;
$usersContr->update('solochat', 'insight = ? WHERE solo_id = ?', $vals);

echo json_encode(array("insID"=>$insightID));	
