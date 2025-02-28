<?php
include('autoloader.inc.php');
  
	$usersView = new usersView();
	$_searchInput = $_POST['search_input'];
	$searchInput = $usersView->sanitise($_searchInput);
	$rows = $usersView->getPubchat($searchInput);
    $total = count($rows);

	$sender = array();
	$recipient = array();
	$conv_id = array();
	$heading = array();
	$published = array();
	$pub_id = array();
	$xpt = array();
	$tutor = array();
	$published_enc = array();
	$price = array();
	$videoThumbnail = array();
	$thumbnail_Dir = array();
    $media = array();
    
	if($total>0){
		foreach($rows as $row){
			$fn = '';
			$ln = '';
		
			//verify authorized access
			$auth_access = $row['auth'];
			$userData = $usersView->fetchUser();
			$me = $userData[0]['profile_id'];
			$auth_status = $usersView->verify_AuthAccess($me, $auth_access);
            $auth_access == 0 ? $auth_status = TRUE : $auth_status;
			if($auth_status == FALSE){
				$total = $total - 1;
			}
			if($auth_status == TRUE ){

			$heading[] = $row['heading'];
			$published[] = $row['published'];
			$tutor[] = $row['rsP'];
//			$pub_id[] = $row['pub_id'];
			$pub_id[] = $usersView->encryptor0($row['pub_id']);
			$price[] = $row['price'];

			$published_dec = $usersView->dec_cons($row['published']);
			$published_enc[] = $row['published'];
			$pub_array = explode("_", $published_dec);
			
         //Groupchat search check is needed here
			$chatpop = $row['chatpop'];

			$topic = $row['topic_id'];

			$_videoThumbnail = $usersView->getThumbnail($topic, $chatpop, $row['published']);
  			$videoThumbnail[] = $_videoThumbnail[0];
  			$media[] = $_videoThumbnail[1];

  			$aoi_data = $usersView->aoi($topic);
  			$thumbnail_Dir[] = $aoi_data['folder'];

			$sender[] = $usersView->encryptor0($pub_array[0]);
			
			$chatpop == 'm' ? $recipient[] = 0 :
			$recipient[] = $usersView->encryptor0($pub_array[1]);

			$conv_id[] = $usersView->encryptor0($pub_array[2]);

			//$row = $usersView->fetchProfile('1');
			$row = $usersView->fetchProfile($pub_array[0]);

			$fn .=$usersView->decryptor0($row[0]['firstname']);
			$ln .=$usersView->decryptor0($row[0]['lastname']);
			
			$xpt[] = ucfirst($ln).' '.ucfirst($fn);	
		
	    	}
    	}
	}

echo json_encode(array("pub_id"=>$pub_id, "price"=>$price, "xpt"=>$xpt, "media"=>$media, "thumbnail"=>$videoThumbnail, "thumbnail_Dir"=>$thumbnail_Dir, "published"=>$published_enc, "sender"=>$sender, "recipient" => $recipient, "conv_id"=>$conv_id, "heading"=>$heading, "total"=>$total, "wordinput"=>$_searchInput));	

