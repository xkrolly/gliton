<?php

include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();
  
//capture audio for storage
  $vid_input=$_FILES['vid_data']['tmp_name'];
  $vid = $_FILES['vid_data']['name'];
  $cat = $_POST['categ'];
  $lock = $_POST['lock'];
 // $cat = $info[0][0];
    $user = $usersView->fetchUser();
    $uid = $user[0]['profile_id'];
    $this_user_aoi = $user[0]['aoi'];
    $converse_id = $user[0]['converse_id'];
    
    $target = $vid;
    $recipient = $user[0]['engager'];
    
    
    $aoiCurrent = '-'.$cat.'-';
    	//check if thisuser is a tutor
    	strpos($this_user_aoi, $aoiCurrent);
//    !empty($this_user_aoi) 
	strpos($this_user_aoi, $aoiCurrent) ? $tutor = $uid : $tutor = $recipient;
    strpos($this_user_aoi, $aoiCurrent) ? $learner = $recipient : $learner = $uid;
    
    
   if(!empty($cat) && !empty($target) ){
        $aoi_array = $usersView->aoi($cat);
 	    $qCol = $aoi_array['queCol'];
 		$folder = $aoi_array['folder'];
		$col_id = $aoi_array['cat_id'];
		$topic = $aoi_array['topic'];
	    $group_cat = '1';//not decided yet
    
     //move_uploaded_file($vid_input, '../videos/'.$folder.'/'.$target.'.webm');
          $video = $vid_input;
    $video_enc = $target;
    $pw = '1234567890';
    $dir = '../videos/'.$folder.'/';
    $usersView->videoEncryptor($video, $video_enc, $pw, $dir);

    //check if previous note was used
      $row = $usersView->select('profile', ' WHERE profile_id = ?', $uid);
      $prev_aud = $row[0]['tmp_aud'];

$cat_user_id = substr($topic, 0, 1).'_user_id';
$valu2 = $target.', '.$uid;


//insert to topic table and chat
    $data = $usersView->select($topic, ' WHERE '.$qCol.' = ? AND '.$cat_user_id.' = ?', $valu2);
    
    $_data = array($qCol=>$target, $cat_user_id => $uid);
    count($data) == 0 ? $usersContr->insert($topic, $_data) : $doNothing='';

$allvals = $target.', '.$uid; 
$cat_user_id = substr($topic, 0, 1).'_user_id';
    $queData = $usersView->select($topic, ' WHERE '.$qCol.' = ? AND '.$cat_user_id.' = ?', $allvals);
$catCol_val = $queData[0][$col_id];

$uniq_conv = $tutor.'_'.$learner.'_'.$converse_id;
$uniqConv_enc = $usersView->enc_cons($uniq_conv);
    $chat_data = array('sender_id'=>$uid, 'lock'=>$lock, 'media'=>'3', 'recipient_id'=>$recipient, $col_id=>$catCol_val, 'category_id'=>$group_cat, 'uniq_conv'=>$uniqConv_enc, 'conv_id'=>$converse_id);

    //prevent double entry toDB
    $vals = $uniqConv_enc.', '.$catCol_val;
    //$data2 = $usersView->select('chat', ' WHERE uniq_conv = ? AND '.$col_id.' = ?', $vals);
    //count($data2) == 0 ? 
    $usersContr->insert('chat', $chat_data);// : $donothing = '';



      //choosing the right table to check
      if(!empty($prev_aud)){
      $row2 = $usersView->select($topic, ' WHERE '.$qCol.' = ?', $prev_aud);
   
      if(count($row2)==0){
    	 //unlink unused audio from folder
    	// @unlink('../sounds/'.$folder.'/'.$prev_aud.'.webm');
      }
    }
    //update profile
      $_SESSION['useAudio'] = TRUE;
      $vals = $target.', '.$uid;
      $usersContr->update('profile', 'tmp_aud = ? WHERE profile_id = ?', $vals);
  }
  else{return 'Your voice recording failed to upload, please try again!';}