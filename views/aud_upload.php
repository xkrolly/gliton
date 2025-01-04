<?php

//include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();

  
//capture audio for storage
  $aud_input=$_FILES['audio_data']['tmp_name'];
  $aud = $_FILES['audio_data']['name'];
  $cat = $_POST['categ'];
  $lock = $_POST['lock'];
  $chatpop = $_POST['chatpop'];
  $cid = $_POST['cid'];
  
    $lectureID = str_replace(' ', '+', $cid);
    $chatpop == 'multiple' ? $classData = $usersView->select('classes', ' WHERE lecture_id = ?', $lectureID) : $classData='';
    $chatpop == 'multiple' ? $class_id = $classData[0]['class_id'] : $class_id = 0;

//  $class_id = 

  
 // $cat = $info[0][0];
    $user = $usersView->fetchUser();
    $uid = $user[0]['profile_id'];
    $this_user_aoi = $user[0]['aoi'];
    $converse_id = $user[0]['converse_id'];
    
    $target = $aud;
    $recipient = $user[0]['engager'];
    
    
    $aoiCurrent = '-'.$cat.'-';
    	//check if thisuser is a tutor
    	strpos($this_user_aoi, $aoiCurrent);
//    !empty($this_user_aoi) 
	strpos($this_user_aoi, $aoiCurrent) ? $tutor = $uid : $tutor = $recipient;
    strpos($this_user_aoi, $aoiCurrent) ? $learner = $recipient : $learner = $uid;
    
    
    /////////////////////////
    //if(1==1 ){
   if(!empty($cat) && !empty($target) ){
        $aoi_array = $usersView->aoi($cat);
 	    $qCol = $aoi_array['queCol'];
 		$folder = $aoi_array['folder'];
		$col_id = $aoi_array['cat_id'];
		$topic = $aoi_array['topic'];
	    $group_cat = '1';//not decided yet
    
    $chatpop == 'duo' ? $path='../' : $path='';
     move_uploaded_file($aud_input, $path.'sounds/'.$folder.'/'.$target.'.webm');
   
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


$chatpop == 'duo' ? $uniq_conv = $tutor.'_'.$learner.'_'.$converse_id : $uniq_conv = $usersView->dec_cons($lectureID);
$uniqConv_enc = $usersView->enc_cons($uniq_conv);
    $chat_data = array('sender_id'=>$uid, 'class_id'=>$class_id, 'locked'=>$lock, 'media'=>'1', 'recipient_id'=>intval($recipient), $col_id=>$catCol_val, 'category_id'=>$group_cat, 'uniq_conv'=>$uniqConv_enc, 'conv_id'=>$converse_id);

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