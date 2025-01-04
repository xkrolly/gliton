<?php
include('../includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

	
if(isset($_GET['receiver'])){
	
	$receiver = $_GET['receiver']; 
	$receiver == '0' ? $chatAudience = 'group' : $chatAudience = 'duo';
	$chats = $usersView->chatUpd($receiver, $chatAudience);
	$userData = $usersView->fetchUser();
	$uid = $userData[0]['profile_id'];

	$allchat = array();
	if(count($chats) > 0){
		foreach ($chats as $chat) {
			$usersView->comma($chat['que']); 
			array_push($allchat, array('ttid'=>$chat['ttid'], 'audience'=>$chatAudience, 'holdclass'=>$chat['holdclass'], 'xpt_status'=>$chat['xpt_status'], 'sn'=>$chat['seen'], 'dt'=>$chat['dt'], 'type'=>$chat['type'], 'u' => $uid, 's' => $chat['s'], 'r' => $chat['r'], 'msg' => $chat['que'], 'mode' => $chat['mode'], 'chid' => $chat['chid'], 'cid'=>$chat['cid'], 'replyto'=>$chat['replyto'], 'quote'=>$chat['quote'], 'quoteSender'=>$chat['quoteSender']));
		}
 		echo json_encode(array("chat" => $allchat));
    }
}



