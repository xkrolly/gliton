<?php
include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();
  
//capture audio for storage
  $vid_input=$_FILES['vid_data']['tmp_name'];
  $vid = $_FILES['vid_data']['name'];
  $cat = $_POST['categ'];
  $lock = $_POST['lock'];
  $content_id = $_POST['cid'];

  $user = $usersView->fetchUser();
  $uid = $user[0]['profile_id'];
  	var_dump('ONE 1');
  
  if(empty($cat)){
        //update profile of the video for later usage
        $dir = '../videos/temp/';
        $video = $vid_input;
        $pw = '1234567890';
    	var_dump('ONE 2');
    
        $videoName = mt_rand(1000, 9999).$uid.time().'0';
        $vd_name = $usersView->videoEncryptor($video, $pw, $dir, $videoName);
        $valu = $videoName.', '.$uid;
        $usersContr->update('profile', 'save_que = ?  WHERE profile_id = ?', $valu);
   }

   if(!empty($cat) ){
        $aoi_array = $usersView->aoi($cat);
 	    $qCol = $aoi_array['queCol'];
 		$folder = $aoi_array['folder'];
		$col_id = $aoi_array['cat_id'];
		$topic = $aoi_array['topic'];
        
        $video = $vid_input;

    $pw = '1234567890';
 	var_dump('ONE 3');
   
        $dir = '../videos/'.$folder.'/';
    $videoName = mt_rand(100, 999).$uid.time().$cat;
    $vd_name = $usersView->videoEncryptor($video, $pw, $dir, $videoName);
    $cat_user_id = substr($topic, 0, 1).'_user_id';
    $valu2 = $vd_name.', '.$uid;

//insert to topic table and chat
    $data = $usersView->select($topic, ' WHERE '.$qCol.' = ? AND '.$cat_user_id.' = ?', $valu2);

    $_data = array($qCol=>$vd_name, $cat_user_id => $uid);
    count($data) == 0 ? $usersContr->insert($topic, $_data) : $doNothing='';

    $allvals = $vd_name.', '.$uid;
    $cat_user_id = substr($topic, 0, 1).'_user_id';
    $queData = $usersView->select($topic, ' WHERE '.$qCol.' = ? AND '.$cat_user_id.' = ?', $allvals);
    $catCol_val = $queData[0][$col_id];

    $contentCheck = $usersView->select('productscript', ' WHERE productUniq = ?', $content_id);
	var_dump('ONE 4');

//set conversation flag
    $chat_data = array('brandid'=>$uid, 'category_id'=>$cat, $col_id=>$catCol_val, 'productUniq'=>$content_id, 'media'=>3, 'flag'=>$cat);
    count($contentCheck) == 0 ? $usersContr->insert('productscript', $chat_data) : '';
	var_dump('ONE 5');

    $chat_data = array('brandid'=>$uid, 'category_id'=>$cat, $col_id=>$catCol_val, 'productUniq'=>$content_id, 'media'=>3, 'flag'=>0);
    $usersContr->insert('productscript', $chat_data);
  	var_dump('ONE 6');

}

