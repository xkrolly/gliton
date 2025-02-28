<?php

$usersContr = new usersContr();
$usersView = new usersView();

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$regCompleted = $userData[0]['regCompleted'];
$notePg ='';

if($regCompleted == 1){
    
    $userNotes = $usersView->select('xnote', ' WHERE target_id = ? ORDER BY idate LIMIT 580', $me);
    $vals = '1, '.$me;
    $usersContr->update('xnote', 'iview = ? WHERE target_id = ?', $vals);
    
    $n = count($userNotes) - 1;
    
    $notePg .= "<div style='background:#eee; display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%; padding:10px 10px 50px 20px;'>";
    $notePg .= "<div class='enquiry-form' style='margin-bottom:100px; margin-top:5px; display:flex; position:fixed; top:0; z-index:20; background:#fff; border-radius:10px; text-align:center; padding:15px 15px 8px 15px; font-size:16px; filter:drop-shadow(2px 2px 1px #ccc);'><a href='enquiry' style='color:#000; text-decoration:none; text-align:left'>&lt;&lt;</a><strong style='margin-left:auto; margin-right:auto;'>All messages</strong></div><br>";
    
    while($n >= 0){
    	$sender = $userNotes[$n]['sender_id'];
    	$sentDate = $userNotes[$n]['idate'];
    	$cat_id = $userNotes[$n]['cat_id'];
    		//generate_spec($pid, $vericheck_application_categories)
    	!empty($cat_id) ? $topic = $usersView->generate_spec('', $cat_id) : $topic = '';
    	!empty($cat_id) ? $topic = implode(', ', $topic) : $topic = '';
    	$sender != 0 ? $proData = $usersView->fetchProfile($sender) : '';
    	$sender != 0 ? $fn = $proData[0]['firstname'] : '';
    	$sender != 0 ? $ln = $proData[0]['lastname'] : '';
    
    	$sender != 0 ? $fn = $usersView->decryptor0($fn) : $fn = "<span style='color:red'>The Admin</span>";
    	$sender != 0 ? $ln = $usersView->decryptor0($ln) : $ln = '';
    
    	$senderName = ucfirst($fn).' '.ucfirst($ln);
    	$msg = $userNotes[$n]['msg'];
    	$type = $userNotes[$n]['mtype'];
    	$views = $userNotes[$n]['iview'];
    	$pubid = $userNotes[$n]['pubid'];
    	
    	$type !== 10 ? $appoDate = $usersView->todate($msg) : $msg;
    $views == 0 ? $border = 'border-bottom:2px solid #2166f3;' : $border = '';
    $notePg .= "<div class='enquiry-form' style='display:flex; align-items:center; justify-content:center; background:#fff; $border border-radius:10px; margin-bottom:-10px; padding:15px; font-size:14px; filter:drop-shadow(1px 1px .5px #ccc);'>";
    $footer ="";
    
    if($type == 1){
    	$notePg .= "<div><strong>".$senderName."</strong> has fixed an appointment on <i style='text-decoration:underline; color:#2166f3;'>$topic</i> with you on <i style='font-family:serif;'>$appoDate</i> prompt.</div>";
    } 
    elseif($type == 2 ){
    	$pubData = $usersView->select('publish', ' WHERE pub_id = ?', $msg);
    	count($pubData) > 0 ? $heading = $pubData[0]['heading'] : $heading='';
    
    	$notePg .= "<div><strong>".$senderName."</strong> you are following has published a new solution on <span style='text-decoration:underline; font-family:serif;'>".$heading."</span>. Click here to view.</div>";
    }
    elseif($type == 3 ){
    	$notePg .= "<div><strong>".$senderName."</strong> has approved your VERIFICATION request. You are now officially a Glit professional on <i style='text-decoration:underline; color:#2166f3;'>$topic</i>. Cheers!!!.</div>";
    }
    elseif($type == 5 ){ 
    	$notePg .= "<div>Hello, your subscription for <i style='text-decoration:underline;'>$topic</i> has ended. Kindly subscribe to continue the benefit. Thanks.</div>";
    }
    elseif($type == 6 ){ 
    	$notePg .= "<div>Hello, kindly subscribe to <i style='text-decoration:underline;'>$topic</i> to have access to it. Thanks.</div>";
    }
    elseif($type == 7 ){ 
    	$notePg .= "<div>Hello, You have successfully subscribed to <i style='text-decoration:underline; color:#2166f3;'>$topic</i> to have unlimited access to their contents for 30Days. Thanks.</div>";
    }
    elseif($type == 8 ){ 
    	$notePg .= "<div>You have successfully purchased a session to consult an expert on <i style='text-decoration:underline; color:#2166f3;'>".$topic."</i>.</div>";
    }
    elseif($type == 9 ){ 
    	$notePg .= "<div><strong>".$senderName."</strong> is currently chatting you  on <i style='text-decoration:underline; color:#2166f3;'>$topic</i> and expecting your response. Kindly respond to their chat to render professional solution to their challenges without delay. Thanks.</div>";
    }
    elseif($type == 11 ){ 
        $notePg .= "<div><strong>".$senderName."</strong> is currently chatting you  on <i style='text-decoration:underline; color:#2166f3;'>$topic</i> and expecting your response. Kindly respond to get your problem solved. Thanks.</div>";
    }
    elseif($type == 10 ){ 
        if(!empty($pubid)){
    	$prodData = $usersView->select('publish', ' WHERE pub_id = ?', 	$pubid);
    	$heading = $prodData[0]['heading'];
    	$chatpop = $prodData[0]['chatpop'];
    	$catID = $prodData[0]['topic_id'];
        $published = $prodData[0]['published'];
    
    	$notePg .= "<div>You successfully purchased <i>".$msg."</i> solscript <span class='material-icons' style='color:#2166f3; margin-right:2px; font-size:20px;'>&#xef6e;</span> 
    	<a href='index.php?page=download&catid=".$catID."&scriptid=".$published."&chat=".$chatpop."' style='font-size:14px;'>Click here to download</a></div>";
    
        }
        else{
        $notePg .="<div>You successfully purchased <i>".$msg."</i> solscript <span class='material-icons' style='color:#2166f3; margin-right:2px; font-size:20px;'>&#xef6e;</span>. Sorry, no resource is available to download</div>";    
        }
    }
    
    $notePg.="<div style='display:flex; align-items:flex-bottom; justify-content:flex-bottom; margin-top:-4px;'>$footer<span style='margin-left:auto;'>".$usersView->time2($sentDate)."</span></div></div>";
    $n--;
    }
    $notePg .= "</div>";

}
else{
    $notePg.= $usersView->completeRegFirst();

}

return $notePg;
