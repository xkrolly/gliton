<?php
//var_dump('HELOO CO1');

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

    if(empty($cat)){
        //update profile of the video for later usage
        $dir = '../videos/temp/';
        $video = $vid_input;
        $pw = '1234567890';

        $videoName = mt_rand(1000, 9999).$uid.time().'0';
        $vd_name = $usersView->videoEncryptor($video, $pw, $dir, $videoName);
        $valu = $videoName.', '.$uid;
        $usersContr->update('profile', 'save_que = ?  WHERE profile_id = ?', $valu);
       // move_uploaded_file($vid_input, '../videos/temp/'.$vid.'.webm');

    }

   if(!empty($cat) ){
        $aoi_array = $usersView->aoi($cat);
 	    $qCol = $aoi_array['queCol'];
 		$folder = $aoi_array['folder'];
		$col_id = $aoi_array['cat_id'];
		$topic = $aoi_array['topic'];
        
        $video = $vid_input;

    $pw = '1234567890';

        $dir = '../videos/'.$folder.'/';
    $videoName = mt_rand(100, 999).$uid.time().$cat;//.'.webm';
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

    $contentCheck = $usersView->select('solochat', ' WHERE content_id = ?', $content_id);

//set conversation flag and post video on db
    count($contentCheck) == 0 ? $flag = $cat : $flag = 0;
    $chat_data = array('scriptor_id'=>$uid, 'category_id'=>$cat, $col_id=>$catCol_val, 'content_id'=>$content_id, 'media'=>3, 'flag'=>$flag);
    $usersContr->insert('solochat', $chat_data);

}/**/

