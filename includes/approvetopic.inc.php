<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['topic'])){
    $topicDesc = $_POST['title'];
    $topic = $_POST['topic'];
    $date = date('Y-m-d H:i:s', time());
    $userData = $usersView->fetchUser();
    $me = $userData[0]['profile_id'];

    $scriptID = $me.'_'.$topic.'_'.$topicDesc.'_'.$date; 
    $scriptID_enc = $usersView->enc_cons($scriptID);
    $valu =array('scriptID'=>$scriptID_enc, 'topic'=>$topicDesc);
    $usersContr->insert('solo', $valu);

        echo json_encode(array("resp"=> "1", "topic"=>$topicDesc, "tid"=>$topic));
    }else{
        echo json_encode(array("resp"=> "2"));
    }
