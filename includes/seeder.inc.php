<?php
//r_dump('WHAT is happeneing');
include('autoloader.inc.php');

	$usersContr = new usersContr();
	$usersView = new usersView();
	//var_dump('2344');
if(isset($_POST['problem'])){
//var_dump('topic title');
	$topic = $_POST['textspace'];
	$insight = $_POST['insight'];
	
	$cat = $_POST['category'];
	$datetime = $_POST['date'].' '.$_POST['time'];

	    $aoi_array = $usersView->aoi($cat);
		$folder = $aoi_array['folder'];
	
	$userData = $usersView->fetchUser();
	$me = $userData[0]['profile_id'];

	$que = $cat.time();
    $generatedName = 's'.mt_rand(100, 999).$me.time().$cat;
   
	$thumbnail = $generatedName.'t.webp';
	$vid_tmp = $_FILES['vid1']['tmp_name'];
	$thumbnail1_tmp = $_FILES['thumbnail1']['tmp_name'];
	$destination_URL = '../videos/'.$folder.'/thumb';

	$usersView->imgProcessor($thumbnail, $thumbnail1_tmp, $destination_URL);
	
	/////generate contentID
	$contentID = $me.'_0_'.$cat.'_'.time();
	$contentID_enc =  $usersView->enc_cons($contentID);
	
	//if it is seeder, fill seeder tbl
	$val3 = array('topic'=>$topic, 'cat'=>$cat, 'content_id'=>$contentID_enc);
	$usersContr->insert('seeder', $val3);

    $pw = '1234567890';
    $dir = '../videos/'.$folder.'/';
    $videoName = $generatedName.'.webm'; 
    $vd_name = $usersView->videoEncryptor($vid_tmp, $pw, $dir, $videoName);
$videoName = str_replace('.webm', '', $videoName);

	$media = 3;
	$usersView->postSoloChat($cat, $videoName, $thumbnail, $media, $contentID_enc, $insight, $datetime);
	echo json_encode(array("cat"=>$cat, "que"=>$que));	

}
if(isset($_POST['procedure'])){
	//var_dump('expression----------');
	$insight = $_POST['insight'];
	$sdID = $_POST['project'];

	$sdData = $usersView->select('seeder', ' WHERE sd_id = ?', $sdID);
	$projectID = $sdData[0]['content_id'];
	$cat = $sdData[0]['cat'];
	$contentID_enc =  $projectID;

	$datetime = $_POST['date'].' '.$_POST['time'];

	    $aoi_array = $usersView->aoi($cat);
		$folder = $aoi_array['folder'];

	$que = time();
	$img = $que.'.webp';

//	if( isset($_FILES['img']['name'])){
//		$img_tmp = $_FILES['img']['tmp_name'];
//		$destination_URL = '../img/'.$folder;
//		$usersView->imgProcessor($img, $img_tmp, $destination_URL);
//	}
	$userData = $usersView->fetchUser();
	$me = $userData[0]['profile_id'];

    if( isset($_FILES['vid']['tmp_name'])){

    	$vid_tmp = $_FILES['vid']['tmp_name'];
	
	    $pw = '1234567890';
	    $dir = '../videos/'.$folder.'/';
	    
	    $videoName = 's'.mt_rand(100, 999).$me.time().$cat.'.webm';
	    $vd_name = $usersView->videoEncryptor($vid_tmp, $pw, $dir, $videoName);
    }

	$media = 3;
	$videoName = str_replace('.webm', '', $videoName);

	$usersView->postSoloChat($cat, $videoName, $videoName.'t', $media, $contentID_enc, $insight, $datetime);
	echo json_encode(array("cat"=>$cat, "que"=>$que));	

}
if(isset($_POST['publishSeed'])){

	$caption = $_POST['insight'];
	$sdID = $_POST['project'];
	$sdData = $usersView->select('seeder', ' WHERE sd_id = ?', $sdID);
	$projectID = $sdData[0]['content_id'];
	$topic_id = $sdData[0]['cat'];
	
	$contentID_enc =  $projectID;

	$datetime = $_POST['date'].' '.$_POST['time'];

    $aoi_array = $usersView->aoi($topic_id);
	$folder = $aoi_array['folder'];

	$userData = $usersView->fetchUser();
	$me = $userData[0]['profile_id'];

    $generatedName2 = 's'.mt_rand(100, 999).$me.time().$topic_id;
	  
		$que = time();

	$thumb2 = $generatedName2.'t.webp';

		$thumb2_tmp = $_FILES['thumb2']['tmp_name'];
		$destination_URL = '../videos/'.$folder.'/thumb';
		$usersView->imgProcessor($thumb2, $thumb2_tmp, $destination_URL);

    if( isset($_FILES['vid2']['tmp_name'])){

    	$vid2_tmp = $_FILES['vid2']['tmp_name'];
	
	    $pw = '1234567890';
	    $dir = '../videos/'.$folder.'/';
	    
	    $videoName = $generatedName2.'.webm';
	    $vd_name = $usersView->videoEncryptor($vid2_tmp, $pw, $dir, $videoName);
    }

	$media = 3;
	$videoName = str_replace('.webm', '', $videoName);

	$usersView->postSoloChat($topic_id, $videoName, $videoName.'t', $media, $contentID_enc, $caption, $datetime);

    $searchkeys = $_POST['k1']." ".$_POST['k2']." ".$_POST['k3']." ".$_POST['k4']." ".$_POST['k5']." ".$_POST['k6'];
    $_POST['authorization'] == 1 ? $authorization = $_POST['authority'] : $authorization = '0';
    $chatpop = 's';
  
    $publish_mode = $_POST['pubmode'];
    $publish_mode == 1 ? $price = 1.1 * intval($_POST['price']) : ($publish_mode == 2 ? $price = $_POST['launchfund'] : $price = 0);

      //get solscript timespan
          $data = $usersView->select('solochat', ' WHERE content_id = ?', $contentID_enc);
          $startDate = $data[0]['cdate'];
          $n = count($data) - 1;
          $endDate = $data[$n]['cdate'];
          $_timespan = strtotime($endDate) - strtotime($startDate);
          $timespan = $usersView->getTimeDiff($_timespan)

		  $shrdKey = $usersView->generateSoloSharedKey($topic_id);

	$usersView->publish($contentID_enc, $caption, $searchkeys, $topic_id, $chatpop, $publish_mode, $authorization, $price, $timespan, $shrdKey);

	echo json_encode(array("cat"=>$topic_id, "que"=>$que));	

}
