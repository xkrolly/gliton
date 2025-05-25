<?php

class UsersView extends Users {
    public $scriptElements = "";
   	public $contact;
   	public $css = '';
   	public $embeddedStyle = '';
   	public $content = '';

   	const SM_UPLOADPATH = '../spymages/';
   	const PHPUPL = 'img/';
   	const PROFILE = 'img/profiles/profile/';
   	const HEADER = 'img/profiles/header/';
   	const SM_MAXFILESIZE = 1000000;
	const session_duration = 60*30;

  public function send_txtmsg($to, $message){//, $api_key, $sender_id = 'Glit' ){
  	$url = 'https://api.ng.termii.com/api/sms/send';
  	$baseUrl = 'https://v3.api.termii.com';
  	$data = [
  			'to' => $to,
  			'from' => 'Glit',//$sender_id,
  			'sms' => $message,
  			'type' => 'plain',
  			'channel' => 'generic',
  			'api_key' => 'TLNkyYqyCWtUUzgXHumlPchVlMHdkEodNEvBjvLjHkWkVRaLKlYgZliYagCzdH'  //$api_key

  	];

  	$options = [
  			'http' => [
  					'method' => 'POST',
  					'header' => [
  								'Content-Type: application/json',
  								'Content-Length: '. strlen(json_encode($data)),
  					],
  					'content' => json_encode($data),
  					'ignore_errors' => true
  			]
  	];

  	$context = stream_context_create($options);
  	$result = file_get_contents($url, false, $context);

  	return $result;// ? : "Failed to send SMS.";

  }
	public function change_Password(){
		
	}
	public function processes_onInternet(){

	}
	public function ribbon(){
		return "<div class='ribbon-wrap'><div class='ribbon'>Special offer</div></div>";
	}

	public function clearProductImage(){
		$userData = $this->fetchUser();
	  $me = $userData[0]['profile_id'];
		$val = ' , '.$me;
		$this->updateStmt('profile', '3pp_img1 = ? WHERE profile_id = ?', $val);

	}

	public function imguploader3p($cat, $prdImg, $imgusage){

	  $userData = $this->fetchUser();
	  $me = $userData[0]['profile_id'];
	  $tpp1 = $userData[0]['3pp_img1'];
	  //capture img for storage
	  
	  $imgusage === 'productimg2' && !empty($tpp1) ? $imgName = $tpp1.'_2' : $imgName = mt_rand(1000, 9999).$me.time().$cat;
	 
	  $cat_arr = $this->aoi($cat);
	  $folder = $cat_arr['folder'];
	  move_uploaded_file($prdImg, '../img3pp/'.$folder.'/'.$imgName.'.webp');

	  $vals = $imgName.', '.$me;
	  if($imgusage === 'productimg1'){
	  	 $this->updateStmt('profile', '3pp_img1 = ? WHERE profile_id = ?', $vals);
	  }
	}
	public function imguploader($cat, $img_input){

	  $userData = $this->fetchUser();
	  $me = $userData[0]['profile_id'];
	  //capture img for storage

		$imgName = mt_rand(1000, 9999).$me.time().$cat;
	 
	  $cat_arr = $this->aoi($cat);
	  $folder = $cat_arr['folder'];
	  move_uploaded_file($img_input, '../img/'.$folder.'/'.$imgName.'.webp');

	  $vals = $imgName.', '.$me;
	  $this->updateStmt('profile', 'save_que = ?  WHERE profile_id = ?', $vals);

	}
  public function productInteraction($_prdID, $intCol, $intTotalCol, $prdType){
	    $data = $this->fetchUser();
	    $me = $data[0]['profile_id'];

	  $prdType == 'tpp' ? $publish_onTable = '3rdpartyproduct' : $publish_onTable = 'publish';
	  $prdType == 'tpp' ? $publish_onCol = 'product_uniq' : $publish_onCol = 'published';
	  
		$intData = $this->select($publish_onTable, ' WHERE '.$publish_onCol.' = ?', $_prdID);
	    $totalIntrxs = $intData[0][$intTotalCol];
	    $pubid = $intData[0]['pub_id'];
	   
	    $intDataCheck = $this->select('prd_interactions', ' WHERE profile_id = ?', $me);
        $ins_vals = array('profile_id'=>$me, $intCol =>'.'.$pubid.'.');
	     
        count($intDataCheck) == 0 ?
	    $this->insert2Db('prd_interactions', $ins_vals) : '';

	    $intData2 = $this->select('prd_interactions', ' WHERE profile_id = ?', $me);
        $all_Intrxed = $intData2[0][$intCol];
    	empty($all_Intrxed) ? $all_Intrxed ='.' : $all_Intrxed;
    	strpos($all_Intrxed, '.'.$pubid.'.') !== false ? $allIntrxed_update = str_replace($pubid.'.', '', $all_Intrxed) : $allIntrxed_update = $all_Intrxed.$pubid.'.'; 
    	strpos($all_Intrxed, '.'.$pubid.'.') !== false ? $newtotalIntrxs = intval($totalIntrxs) - 1 : $newtotalIntrxs = intval($totalIntrxs) + 1;
    	strpos($all_Intrxed, '.'.$pubid.'.') !== false ? $addInt = FALSE : $addInt = TRUE;
    
    	$vals = $newtotalIntrxs.', '.$_prdID;
    	$this->updateStmt($publish_onTable, $intTotalCol.' = ? WHERE '.$publish_onCol.' = ?', $vals);
    	
    	$_vals = $allIntrxed_update.', '.$me;
    	$this->updateStmt('prd_interactions',  $intCol.' = ? WHERE profile_id = ?', $_vals);
    	$prdID_ = $this->cutSpecialChars($_prdID);
       	
       	return array($addInt, $newtotalIntrxs, $prdID_, $pubid);
	}
	
  public function boughtOrNot($pid){
    	$userData = $this->fetchUser();
    	$user = $userData[0]['profile_id'];

    	$_me = $this->usercode($user);
  		$me = '%.'.$_me.'.%';
  		$val = $pid.', '.$me;
    	$rows = $this->select('purchase', ' WHERE product_ID = ? AND buyer LIKE ?', $val);
  		count($rows) > 0 ? $status = true : $status = false;
  	
  	return $status;
  }
  public function fetchAssets($user){
    	$_me = $this->usercode($user);
  		$me = '%.'.$_me.'.%';
    	$rows = $this->select('purchase', ' WHERE buyer LIKE ?', $me);
    	$all = count($rows);
    	
    	$prdID = array();
	    $date = array();
		$prdKey = array();
        $videoThumbnail = array();
        $outputThumbnail = array();    
	
		if($all>0){
			foreach($rows as $row){
				$prdID[] = $row['product_id'];
				$prdKey[] = $row['productKey'];
				$date[] = $row['purchase_date'];
                if(!empty($row['product_id'])){
    				$data = $this->select('publish', ' WHERE published = ?', $row['product_id']);
    				$chatpop = $data[0]['chatpop'];
    				$heading = $data[0]['heading'];
    				$topic = $data[0]['topic_id'];
    				$_videoThumbnail = $this->getThumbnail($topic, $chatpop, $data[0]['published']); 
    	  			$videoThumbnail[] = $_videoThumbnail[0];
    	  			$media[] = $_videoThumbnail[1];
    	  			$aoi_data = $this->aoi($topic);
    	  			$thumbnail_Dir[] = $aoi_data['folder'];
    	  			$outputThumbnail[] = $_videoThumbnail[0].' '.$aoi_data['folder'].' '.$_videoThumbnail[1].' '.str_replace(' ', '.', $heading);
                }
			}
		}
	return $outputThumbnail;
    }
  public function fetchFavs($user){
    	$me = $user;
		$prdData = $this->select('prd_interactions', ' WHERE profile_id = ?', $me);
        $allFav = count($prdData);

		$videoThumbnail = array();
        $outputThumbnail = array();    
		
		if($allFav > 0){

        	$favs = $prdData[0]['favs'];
        	$_favsArray = explode('.', $favs);
    		$favsArray = array_slice($_favsArray, 1, -1, true);

		    foreach($favsArray as $favContent){

			    $data = $this->select('publish', ' WHERE pub_id = ?', $favContent);
         
				$chatpop = $data[0]['chatpop'];
				$heading = $data[0]['heading'];
				$topic = $data[0]['topic_id'];

				if( count($data) > 0 ){
					$_videoThumbnail = $this->getThumbnail($topic, $chatpop, $data[0]['published']); 
	  			$videoThumbnail[] = $_videoThumbnail[0];
	  			$media[] = $_videoThumbnail[1];
	  			$aoi_data = $this->aoi($topic);
	  			$thumbnail_Dir[] = $aoi_data['folder'];
	  			$outputThumbnail[] = $_videoThumbnail[0].' '.$aoi_data['folder'].' '.$_videoThumbnail[1].' '.str_replace(' ', '.', $heading);
		    }
		   }
		}
	 return $outputThumbnail;
  }
  public function topBar($notes){

	return "<div style='display:flex; align-items:center; padding:20px 8px 8px 8px; background:#fff; filter:drop-shadow(2px 2px 2px #ccc); position:fixed; top:0; width:100%; z-index:25;'>
            <div style='align-self:left; margin-left:2px; justify-content:center; margin-right:auto; display:flex; color:#2166f3; font-weight:bold; font-size:20px;'> <img src='img/glit192.png' alt='gLIT logo' style='height:25px; width:25px;'>lit</div>
    
            
            <div style='display:flex; justify-content:flex-end; align-items:center; margin-left:auto; margin-right:2px;'>

              <div onclick='$(\"#searchPanel\").slideDown();' style='margin-left:20px;'><span class='material-icons' style='color:#444; font-size:20px; margin-right:2px;'>&#xe8b6;</span>
              </div>
              <div style='margin-left:20px;'><a href='index.php?page=classes'><span class='material-icons' style='color:#444; font-size:20px;'>&#xf233;</span></a></div>
              <div style='margin-left:20px;'><a href='note'><span class='material-icons' style='color:#444; font-size:20px;'>&#xe7f4;</span></a></div>
              $notes

	            <div style='display:flex; flex-direction:column; margin-left:20px; margin-right:2px;' onclick='$(\"#menus\").show()'>
	              <div style='width:4px; height:4px; background:#000;'></div>
	              <div style='width:4px; height:4px; margin-top:4px; background:#000;'></div>
	              <div style='width:4px; height:4px; margin-top:4px; background:#000;'></div>
	            </div>
            </div>
          </div>

                      <div id='menus' style='display:none; width:100%; z-index:11; position:fixed; right:0; top:4%; margin:20px 5px auto auto;'>
                <div style='display:flex; width:100%; justify-content:flex-end;'>
                <div style='border-bottom-right-radius:5px; border-bottom-left-radius:5px; background:#fff; filter:drop-shadow(-2px 2px 2px #888); font-size:16px; padding:5px 20px 10px 10px;'>
              <p style='text-align:left; margin-bottom:-1px; margin-top:8px;' onclick='$(\"#menus\").slideUp(20);'>&times;</p>
              <div style='display:flex; align-items:center; justify-content:flex-start; padding:8px; border-bottom:1px solid #ccc;'>
                <span class='material-icons' style='margin-right:8px; color:#444; font-size:20px;'>&#xe064;</span>
                <a href='subscribe' style='text-decoration:none; color:#000; font-size:14px;'>Subscribe</a>
              </div>
              <div style='display:flex; align-items:center; justify-content:flex-start; padding:8px; border-bottom:1px solid #ccc;'>
                <span class='material-icons' style='color:#444; margin-right:8px; font-size:20px;'>&#xeb3f;</span>
                <a href='https://glit.ng/glitforbiz' target='_blank' style='text-decoration:none; color:#000; font-size:14px;'>Glit for Biz</a>
              </div>
              <div style='display:flex; align-items:center; justify-content:center; padding:8px;'>
                <a href='logout' style='text-decoration:none; font-size:12px; color:#000;'>Log out</a>
              </div>
        </div></div></div>";
  }
 
  public function publish($publink, $caption, $searchkeys, $topic_id, $chatpop, $publish_mode, $authorization, $price, $timespan, $shrdKey, $publishTo){
	
	$publishTo == 'publish' ? $contentIDCol = 'published' : $contentIDCol = 'product_uniq';

  $pubVal = $publink.', '.$caption.', '.$searchkeys;
  $checkPub = $this->select($publishTo, ' WHERE '.$contentIDCol.' = ? AND heading=? AND searchKeys = ?', $pubVal);
  
  if(count($checkPub) == 0){
	  $rsP = ''; //rsP = resource Person
	  $dec_publink = $this->dec_cons($publink);
	  $publink_array = explode('_', $dec_publink);
	  //getting resource person
	  $rsP = $publink_array[0]; 
	  $rsP_enc = $this->enc_cons($rsP);
	  
	  $insight = $this->paragrafin($caption);

	  $seederData = $this->select('seeder', ' WHERE content_id = ?', $publink);
	  count($seederData) > 0 ? $topic = $seederData[0]['topic'] : $topic = $caption;

	  $val = array($contentIDCol => $publink, 'pubmode'=>$publish_mode, 'auth'=>$authorization, 'topic_id'=>$topic_id, 'chatpop'=>$chatpop, 'price'=>$price, 'rsP'=>$rsP_enc, 'heading'=>$topic, 'searchKeys'=>$searchkeys, 'insight'=>$insight, 'timespan'=>$timespan);

/*var_dump($rsP);
	  var_dump($publishTo);
	   var_dump($val);
*/
	  $this->insert2Db($publishTo, $val);
	  
	  //delete if pending file
	  $valu = $publink;
	  $this->deleteStmt('pending', ' WHERE projectID = ?', $valu);

	  //update resource person profile about their new publicatn
	  $rsp_data = $this->select($publishTo, ' WHERE rsP = ?', $rsP_enc);
	  $allPub = count($rsp_data);
	  $valus = $allPub.', '.$rsP;
	  $this->updateStmt('profile', 'works = ? WHERE profile_id = ?', $valus);

		//inform foloas of the rsp about their new publicatn
		$vall = $publink.', '.$topic.', '.$searchkeys;
		$_data = $this->select($publishTo, ' WHERE '.$contentIDCol.' = ? AND heading = ? AND searchKeys = ?', $vall);
		$publishTo == 'publish' ? $pub_id = $_data[0]['pub_id'] : $pub_id = $_data[0]['product_id'];

		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];
//		$this->decryptor0($pubtype) == 'soloPublish' 
		$publish_mode == 's' ? $xpt = $me : $xpt=$rsP;
		var_dump($xpt.', '.$pub_id);
		$this->informFoloas($xpt, $pub_id);

	  //store the shrdk into external shk database for dual chat
	  if($publish_mode == 'd'){
	    $_uniqconv_id = $publink;
	    $shrdKey_enc = $this->enc_cons($shrdKey);

	    $data = $this->select2('sharedkey', ' WHERE ucid = ?', $_uniqconv_id);

	    $val = array('ucid' => $_uniqconv_id, 'sk'=>$shrdKey_enc);
	  
	    count($data) == 0 ? $this->insert2SHK('sharedkey', $val) : '';
	  }
	     //d//elete approval
	    $this->deleteStmt('approval', ' WHERE uniqconvID = ?', $publink);
  }
}
public function bottomNavigation(){
    	$userData = $this->fetchUser();
    	$xpt = $userData[0]['xpt'];	
    	$xpt == '1' ? $anchor = 'response' : $anchor = 'enquiry';
    return"<div style='display:flex; justify-content:space-evenly; z-index:11; filter:drop-shadow(-1px -1px 1px #eee); position:fixed; left:0; bottom:0; width:100%; background:#fff; padding-top:8px; padding-bottom:15px;'>
              <div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
                <a href='scrolls' style='display:flex; flex-direction:column; align-items:center; justify-content:center; color:#2166f3; font-weight:bold; text-decoration:none; font-size:12px;'>
                  <span class='material-icons' style='filter:drop-shadow(1px 1px 1.5px #2166f3) drop-shadow(-1px -1px 1px #2166f3); color:#fff; margin-right:5px; margin-bottom:6px; font-size:30px;'>&#xe88a;</span>
                  <span>Home</span>
                </a>
              </div>
              <div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
                <nav><a href='$anchor' style='display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:bold; text-decoration:none; font-size:12px;'>
                  <span class='material-icons' style='filter:drop-shadow(1px 1px 1.5px #2166f3) drop-shadow(-1px -1px 1px #2166f3); color:#fff; margin-right:5px; font-size:30px; margin-bottom:6px;'>&#xe94c;</span>
                  <span>Consult</span>
                </a></nav>
              </div>

              <div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
                <nav><a href='solscript' style='display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:bold; text-decoration:none; font-size:12px;'>
                  <span class='material-icons' style='filter:drop-shadow(1px 1px 1.5px #2166f3) drop-shadow(-1px -1px 1px #2166f3); color:#fff; margin-right:5px; font-size:30px; margin-bottom:6px;'>&#xef6e;</span>
                   <span>Create</span>
                </a></nav>
              </div>

              <div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
                <nav><a href='pending' style='display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:bold; text-decoration:none; font-size:12px;'>
                  <span class='material-icons' style='filter:drop-shadow(1px 1px 1.5px #2166f3) drop-shadow(-1px -1px 1px #2166f3); color:#fff; margin-right:5px; font-size:30px; margin-bottom:6px;'>&#xf1bb;</span>
                  <span>Pending</span>
                </a></nav>
              </div>
              <div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
                <nav><a href='profile' style='display:flex; flex-direction:column; align-items:center; justify-content:center; font-weight:bold; text-decoration:none; font-size:12px;'>
                  <span class='material-icons' style='filter:drop-shadow(1px 1px 1.5px #2166f3) drop-shadow(-1px -1px 1px #2166f3); color:#fff; margin-right:5px; font-size:30px; margin-bottom:6px;'>&#xf02e;</span>
                  <span>Account</span>
                </a></nav>
              </div>
            </div>
        ";

    }
    public function saveScript($chatTableID, $catid, $uniqConvID_enc){
		$chatTableID == 's' ? $table = 'solochat' : ($chatTableID == 'd' ? $table = 'chat' : $table = 'grpchat');
		$chatTableID == 's' ? $row_ID = 'solo_id' : ($chatTableID == 'd' ? $row_ID = 'chat_id' : $row_ID = 'grp_id');
		
		$chatTableID == 's' ? $uniqConv = 'content_id' : ($chatTableID == 'd' ? $uniqConv = 'uniq_conv' : $uniqConv = 'class_id');
		$uniqConvID = $this->dec_cons($uniqConvID_enc);

		$data = $this->aoi($catid);
		$queCol = $data['queCol'];
		$topic = $data['topic'];
		$cat_id = $data['cat_id'];
		$folder = $data['folder'];

		$heading = ucfirst($topic).' consultation';

		$scriptData = $this->select($table, ' INNER JOIN '.$topic.' USING ('.$cat_id.') WHERE '.$uniqConv.' = ? ORDER BY '.$row_ID.' DESC', $uniqConvID_enc);
	

		$dir = $this->getLocalDir();

		$newdir = $dir.'/Glit/Konsult/'.$heading.'/';
		!file_exists($newdir) ? mkdir($newdir, 0777, true) : '';
		$headingSubfolder = str_replace(' ', '_', $heading.'_files');
		!file_exists($newdir.$headingSubfolder.'/') ? mkdir($newdir.$headingSubfolder.'/', 0777, true) : '';

		$scriptName = $newdir.$heading.'.html';
		////////////////////////////////////
				$fp = fopen($scriptName, 'w');

		$content = "<html><head><title>".$heading."</title>
					<style>
						.scrollet{
								margin-left:auto;
								margin-right:auto;
						}
						@media only screen and (min-width: 620px) and (max-width: 768px){ 
							#scrollet{
								width:90%;
							}
						}
						@media only screen and (min-width: 768px) and (max-width: 991px){ 
							#scrollet{
								width:80%;
							}
						}

						@media only screen and (min-width: 992px) and (max-width: 1200px){ 
							#scrollet{
								width:60%;
							}
						}
						@media(min-width: 1201px){
							#scrollet{
							  width:50%;
							}
						}

				    	@media only screen and (min-width: 576px) and (max-width: 620px){ 
								#scrollet{
									width:100%;
								}
						}
					</style>
				</head><body style='padding:10px; text-align:center; width:100vw;'>
					<script>
		                  var rid = localStorage.getItem('rid_enc_cons');
		                  var shrd = localStorage.getItem('shrd'+ rid);
alert(shrd);
						function sym_decrypt(ciphertext, key){
						    const passphrase = shrd;//key;
		    				const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
		    				const originalText = bytes.toString(CryptoJS.enc.Utf8);
		    				return originalText;
						}

					</script>
				<div id='scrollet' class='scrollet'><h2>".$heading."</h2>";
				fwrite($fp, $content);
				
		////////////////////////////////////
		$n = count($scriptData) - 1;

		while($n >= 0){
			if($scriptData[$n]['media'] == 0){
				$content = "<p><script>sym_decrypt(".$scriptData[$n][$queCol].", shrdK)</script></p>";
	//			$content = "<p>".$scriptData[$n][$queCol].")</script></p>";
	
				fwrite($fp, $content);
			} 
			elseif($scriptData[$n]['media'] == 1){
				$filename = $scriptData[$n][$queCol].".webm";

				$content = "<audio controls style='margin-bottom:10px;'>".
				"<source src='".$headingSubfolder."/".$filename."' type='audio/webm'>".
				"</audio>";
				fwrite($fp, $content);
				//store the media to local dir
				$localDir = $this->getLocalDir();
				copy("sounds/".$folder."/".$filename, $localDir.'/Glit/Konsult/'.$heading.'/'.$headingSubfolder.'/'.$filename);
			} 
			elseif($scriptData[$n]['media'] == 2){
				$filename = $scriptData[$n][$queCol].'.webp';
				$content = "<img src='".$headingSubfolder."/".$filename."' style='height:500px; width:100%; margin-bottom:10px;'/>";
				fwrite($fp, $content);

				//store the media to local dir
				$localDir = $this->getLocalDir();

				copy("img/".$folder."/".$filename, $localDir.'/Glit/Konsult/'.$heading.'/'.$headingSubfolder.'/'.$filename);

			} 
			elseif($scriptData[$n]['media'] == 3){
				$filename = $scriptData[$n][$queCol];
				$content = "<video controls style='height:500px; width:100%; margin-bottom:10px;'>".
				"<source src='".$headingSubfolder."/".$filename."' type='video/webm'>".
				"</video>";
				fwrite($fp, $content);

				//store the media to local dir
				$localDir = $this->getLocalDir();
				copy("videos/".$folder."/".$filename, $localDir.'/Glit/Konsult/'.$heading.'/'.$headingSubfolder.'/'.$filename);


			} 
		
    		$n--;
		}
    	$content = "</div></body></html>";
		fwrite($fp, $content);
		fclose($fp);
	
		return $heading;
	}
    
    /*	public function downloadScript($chatTableID, $cat_id, $scriptID){
		$chatTableID == 's' ? $table = 'solochat' : ($chatTableID == 'd' ? $table = 'chat' : $table = 'grpchat');
		$chatTableID == 's' ? $row_ID = 'solo_id' : ($chatTableID == 'd' ? $row_ID = 'chat_id' : $row_ID = 'grp_id');
	
		$chatTableID == 's' ? $uniqConv = 'content_id' : ($chatTableID == 'd' ? $uniqConv = 'uniq_conv' : $uniqConv = 'class_id');

		$pubData = $this->select('publish', ' WHERE published = ?', $scriptID);
		$heading = $pubData[0]['heading'];

		$data = $this->aoi($cat_id);
		$queCol = $data['queCol'];
		$topic = $data['topic'];
		$cat_id = $data['cat_id'];
		$folder = $data['folder'];

		$scriptData = $this->select($table, ' INNER JOIN '.$topic.' USING ('.$cat_id.') WHERE '.$uniqConv.' = ? ORDER BY '.$row_ID.' DESC', $scriptID);
//$dir = $this->getLocalDir();

$headingSubfolder = str_replace(' ', '_', $heading.'_files/');
//!file_exists($headingSubfolder) ? mkdir($headingSubfolder, 0777, true) : '';

		$htmlFilePath = $heading.'.html';
		////////////////////////////////////
				$fp = fopen($htmlFilePath, 'w');
				$content = "<html><head><title>".$heading."</title>
							    <meta charset='utf-8'>
                                <meta name='description' content='".ucfirst($heading)."'>
                                <meta name='Homepage' content='GLit homepage'>
                                <meta name='theme-color' content='#2176f3'>
                                <meta name='glit:title' content='GLit homepage'>
                                <meta name='glit:description' content='Seek technical guide as urgent as possible. Get started with GLit now!'>
                                <meta name='glit:creator' content='@_GLit'>
                                <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no'>
                                <meta name='mobile-web-app-capable' content='yes'>
                                <meta http-equiv='x-ua-compatible' content='ie=edge'>

					<style>
						.scrollet{
								margin-left:auto;
								margin-right:auto;
						}
						@media only screen and (min-width: 620px) and (max-width: 768px){ 
							#scrollet{
								width:90%;
							}
						}
						@media only screen and (min-width: 768px) and (max-width: 991px){ 
							#scrollet{
								width:80%;
							}
						}

						@media only screen and (min-width: 992px) and (max-width: 1200px){ 
							#scrollet{
								width:60%;
							}
						}
						@media(min-width: 1201px){
							#scrollet{
							  width:50%;
							}
						}

				    	@media only screen and (min-width: 576px) and (max-width: 620px){ 
								#scrollet{
									width:100%;
								}
						}
					</style>
				</head><body style='padding:10px; text-align:center; width:100%;'>
					<script>
						
						function sym_decrypt(ciphertext, key){
						    const passphrase = key;
		    				const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
		    				const originalText = bytes.toString(CryptoJS.enc.Utf8);
		    				return originalText;
						}

					</script>
				<div id='scrollet' class='scrollet'><h2>".$heading."</h2>";
				fwrite($fp, $content);
				
		////////////////////////////////////
		$n = count($scriptData) - 1;
		$zip_f = $heading.'.zip';
		$zip = new ZipArchive;
		$zip->open($zip_f, ZipArchive::CREATE);
	
$shrdK = $this->getSharedKey($scriptID);
		while($n >= 0){
			if($scriptData[$n]['media'] == 0){
				$content = "<p><script>sym_decrypt(".$scriptData[$n][$queCol].", ".$shrdK.")</script></p>";
				fwrite($fp, $content);
			} 
			elseif($scriptData[$n]['media'] == 1){
				$filename = $scriptData[$n][$queCol].".webm";

				$content = "<audio controls style='margin-bottom:10px;'>".
				"<source src='".$headingSubfolder.$filename."' type='audio/webm'>".
				"</audio>";
				fwrite($fp, $content);
				$zip->addFile("audio/".$folder."/".$filename, $headingSubfolder.$filename);
			} 
			elseif($scriptData[$n]['media'] == 2){
				$filename = $scriptData[$n][$queCol].'.webp';
				$content = "<img src='".$headingSubfolder.$filename."' style='height:500px; width:100%; margin-bottom:10px;'/>";
				fwrite($fp, $content);
				$zip->addFile("img/".$folder."/".$filename, $headingSubfolder.$filename);
			} 
			elseif($scriptData[$n]['media'] == 3){
				$filename = $scriptData[$n][$queCol].'webm';
				$content = "<video controls style='height:500px; width:100%; margin-bottom:10px;'>".
				"<source src='".$headingSubfolder.$filename."' type='video/webm'>".
				"</video>";
				fwrite($fp, $content);
			//	$this->videoDecryptor($filename, $folder);
    			$zip->addFile("videos/".$folder."/dec/".$filename, $headingSubfolder.$filename);	
               //$zip->addFile("videos/".$folder."/".$filename, $headingSubfolder.$filename);
			} 
		
    		$n--;
		}
    	$content = "</div>
    		<br><br>
    		<div style='width:100%; font-size:16px; color:#2166f3; text-align:center; background:yellow;'><a href='https://www.glit.ng'>For more free Glit solution scripts, click here to get started!!!</a></div>
    		<br><br>
    	</body></html>";
		fwrite($fp, $content);


		fclose($fp);
			$htmlFilePath = $rFd.$heading.'.html';
	
		$zip->addFile($htmlFilePath, $heading.'.html');
		$zip->close();

		header('Content-Type: application/zip');//application/octet-stream');
		header('Content-Disposition: attachment; filename='.$zip_f);
		header('Content-Length: '.filesize($zip_f));
		readfile($zip_f);

return $heading;
	}
	*/
		public function downloadScript($chatTableID, $cat_id, $scriptID){
		$chatTableID == 's' ? $table = 'solochat' : ($chatTableID == 'd' ? $table = 'chat' : $table = 'grpchat');
		$chatTableID == 's' ? $row_ID = 'solo_id' : ($chatTableID == 'd' ? $row_ID = 'chat_id' : $row_ID = 'grp_id');
	
		$chatTableID == 's' ? $uniqConv = 'content_id' : ($chatTableID == 'd' ? $uniqConv = 'uniq_conv' : $uniqConv = 'class_id');

		$pubData = $this->select('publish', ' WHERE published = ?', $scriptID);
		$heading = $pubData[0]['heading'];

		$data = $this->aoi($cat_id);
		$queCol = $data['queCol'];
		$topic = $data['topic'];
		$cat_id = $data['cat_id'];
		$folder = $data['folder'];

		$scriptData = $this->select($table, ' INNER JOIN '.$topic.' USING ('.$cat_id.') WHERE '.$uniqConv.' = ? ORDER BY '.$row_ID.' DESC', $scriptID);

        $headingSubfolder = str_replace(' ', '_', $heading.'_files/');

        //!file_exists($headingSubfolder) ? mkdir($headingSubfolder, 0777, true) : '';

		$htmlFilePath =$heading.'.html';
		////////////////////////////////////
				$fp = fopen($htmlFilePath, 'w');
				$content = "<html><head><title>".$heading."</title>
				    <meta charset='utf-8'>
            <meta name='description' content='Seek professional or technical guide/advice from expert!'>
            <meta name='Homepage' content='GLit homepage'>
            <meta name='theme-color' content='#2176f3'>
            <meta name='glit:title' content='GLit homepage'>
            <meta name='glit:description' content='Seek technical guide as urgent as possible. Get started with GLit now!'>
            <meta name='glit:creator' content='@_GLit'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no'>
            <meta name='mobile-web-app-capable' content='yes'>
            <meta http-equiv='x-ua-compatible' content='ie=edge'>

					<style>
						.scrollet{
								margin-left:auto;
								margin-right:auto;
						}
						@media only screen and (min-width: 620px) and (max-width: 768px){ 
							#scrollet{
								width:90%;
							}
						}
						@media only screen and (min-width: 768px) and (max-width: 991px){ 
							#scrollet{
								width:80%;
							}
						}

						@media only screen and (min-width: 992px) and (max-width: 1200px){ 
							#scrollet{
								width:60%;
							}
						}
						@media(min-width: 1201px){
							#scrollet{
							  width:50%;
							}
						}

				    	@media only screen and (min-width: 576px) and (max-width: 620px){ 
								#scrollet{
									width:100%;
								}
						}
					</style>
				</head><body style='padding:10px; text-align:center; width:100vw;'>
					<script>
						
						function sym_decrypt(ciphertext, key){
						    const passphrase = key;
		    				const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
		    				const originalText = bytes.toString(CryptoJS.enc.Utf8);
		    				return originalText;
						}
                        
                        
					</script>";
			$content = $this->topBar('');
	
				fwrite($fp, $content);

			$content ="<div id='scrollet' class='scrollet'><h2>".$heading."</h2>";
				fwrite($fp, $content);
				
		$n = count($scriptData) - 1;
	
		$zip_f = $heading.'.zip';
		$zip = new ZipArchive;
		$zip->open($zip_f, ZipArchive::CREATE);
	
        $shrdK = $this->getSharedKey($scriptID);
		$zip->addFile("scripts/users/userscript.js", $headingSubfolder.'userscript.js');	
        $zip->addFile("scripts/jquery-3.6.0.min.js", $headingSubfolder.'jquery.js');	

		while($n >= 0){
			//grab the id & use for indexing video
			$ID = $scriptData[$n][$catid];
		
			if($scriptData[$n]['media'] == 0){
				$content = "<p><script>sym_decrypt(".$scriptData[$n][$queCol].", ".$shrdK.")</script></p>";
				fwrite($fp, $content);
			} 
			elseif($scriptData[$n]['media'] == 1){
				$filename = $scriptData[$n][$queCol].".webm";

				$content = "<audio controls style='margin-bottom:10px;'>".
				"<source src='".$headingSubfolder.$filename."' type='audio/webm'>".
				"</audio>";
				fwrite($fp, $content);
        		$zip->addFile("audio/".$folder."/".$filename, $headingSubfolder.$filename);
			} 
			elseif($scriptData[$n]['media'] == 2){
				$filename = $scriptData[$n][$queCol].'.webp';

				$content = "<img src='".$headingSubfolder.$filename."' class='flexible' style='object-fit:cover; height:500px; width:100%; margin-bottom:10px;'/>";
				fwrite($fp, $content);
				$zip->addFile("img/".$folder."/".$filename, $headingSubfolder.$filename);
			} 
			elseif($scriptData[$n]['media'] == 3){
				$filename = $scriptData[$n][$queCol].'.webm';
				$content = "<video controls class='flexible2' id='vid".$ID."' style='height:500px; width:100%; margin-bottom:20px; object-fit:cover;'>".
				"<source src='".$headingSubfolder.$filename."' type='video/webm'>".
				"</video><figcaption>Video.Insight</figcaption>";
				fwrite($fp, $content);

            	if(!file_exists("videos/".$folder."/dec/".$filename)){
    				$this->videoDecryptor($filename, $folder);
        		}
    			
    			$zip->addFile("videos/".$folder."/dec/".$filename, $headingSubfolder.$filename);	
			} 
		
    		$n--;
		}  
    	$content = "</div>

    		<br><br>
    		<div>For more free Glit solution scripts, click <a href='glit.ng'>here</a> to get started!!!</div>
    		<br><br>
    		    <script src='".$headingSubfolder."jquery.js'></script>
    		    <script src='".$headingSubfolder."userscript.js'></script>

    	</body></html>";
		fwrite($fp, $content);

		fclose($fp);
		$htmlFilePath = $rFd.$heading.'.html';
    	$rFd = 'glit/';

		$zip->addFile($htmlFilePath, $heading.'.html');
		$zip->close();

		header('Content-Type: application/zip');
		header('Content-Disposition: attachment; filename='.$zip_f);
		header('Content-Length: '.filesize($zip_f));
		readfile($zip_f);
	}
	public function getLocalDir(){
		$userAgent = $_SERVER['HTTP_USER_AGENT'];
		if(strpos($userAgent, 'Android') !== false){
            return $_ENV['EXTERNAL_STORAGE_PUBLIC_DIRECTORY'].'/Download/';
        }
		elseif(strpos($userAgent, 'iOS') !== false){
 			return "/var/mobile/Downloads/";
		}
		elseif(strpos($userAgent, 'Windows') !== false){
 			return "C:\Users\USER\Downloads";
		}
		elseif(strpos($userAgent, 'Mac') !== false){
 			return "~/Downloads/";

		}
		elseif(strpos($userAgent, 'Linux') !== false){
 			return "~/Downloads/";

		}

	}
	public function deleteUnpublished($converse_id, $sender, $recipient){
		//delete after it is closed
	}


	/*public function payNow($amount, $redirectLink){
				header('Access-Control-Allow-Origin: *');

		$mail = 'teewhy4peace@gmail.com';

		$data = array(
			'tx_ref' => time(),
			'amount' => $amount,
			'currency' => 'NGN',
			'redirect_url' => $redirectLink,
			'payment_type' => 'card',
			'order_id' => time(),
			'phone_number' => '',
			'email' => $mail,
			'meta' => array(
				array('metaname' => 'user_email', 'metavalue' => $mail)
			)
		);

		$headers = array(
			'Authorization: Bearer FLWSECK_TEST-ef7da8f15c6185ca459c42fefb4ea413-X',
			'Content-Type: application/json'
		);

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, "https://api.flutterwave.com/v3/charges?type=card");
		curl_setopt($ch, CURLOPT_POST, 1);
		curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));		
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

		$response = curl_exec($ch);
		curl_close($ch);

		$responseData = json_decode($response, true);

		if(isset($responseData['data']['link'])){
			return $responseData['data']['link'];
		} else {
			return 'ERROR payment2';
			//return null;
		}

	}*/
	public function pay($amount, $pid, $redirectURL, $scriptTopic){
		header('Access-Control-Allow-Origin: *');
		$pData = $this->fetchProfile($pid);
		$ln = $this->decryptor0($pData[0]['lastname']);
		$fn = $this->decryptor0($pData[0]['firstname']);
		$email = 'teewhy4peace@gmail.com';//$this->decryptor0($pData[0]['email']);
		
		$request = [
			'tx_ref' => time(),
			'amount' => $amount,
			'currency' => 'NGN',
			'payment_options' => 'card',
			'redirect_url' => $redirectURL,
			'customer' => [
				'email' => $email,
				'name' => $fn.' '.$ln
			],
			'meta' => [
				'price' => $amount
			],
			'customizations' => [
					'title' => 'Glit script',
					'description' => $scriptTopic,
					'logo' => '../img/glit192.png'
			]

		];

		$curl = curl_init();

		curl_setopt_array($curl, array(
			//<script src='https://checkout.flutterwave.com/v3.js'></script>
					
			CURLOPT_URL => 'https://api.flutterwave.com/v3/payments',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS => json_encode($request),
			CURLOPT_HTTPHEADER => array(
					'Authorization: FLWSECK_TEST-ef7da8f15c6185ca459c42fefb4ea413-X',
					'Content-Type: application/json'
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);

		$res = json_decode($response);
		if($res->status == 'success')
		{
			$link = $res->data->link;
			header('Location: '.$link);

		}
		else{
			echo $res->status;
		}

	}
	public function videoEncryptor($video, $pw, $dir, $vidName){
		$method = "AES-256-CBC";
		$key = hash('sha256', $pw, true);
		$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length($method));
		$video_content = file_get_contents($video);
		$encrypted_content = openssl_encrypt($video_content, $method, $key, 0, $iv);

		if(!is_dir($dir)){
			mkdir($dir, 0777, true);
		}

//		file_put_contents($dir.'enc_'.basename($video), 													$encrypted_content);
		//file_put_contents($dir.$vidName.'.webm', $encrypted_content);
		file_put_contents($dir.$vidName, $encrypted_content);
		file_put_contents($dir.'iv.txt', $iv);
		file_put_contents($dir.'key.txt', $key);
		$pw_enc = $this->encryptor0($pw);
		$iv_enc = $iv;
		$enc_video_name = 'enc_'.basename($video);


		$val = array('pw'=>$key, 'iv'=>$iv, 'file'=>$vidName);
		$this->insert2SHK('mediastorage', $val);

		return $vidName;
	}

	public function videoDecryptor($tmp_video_enc, $cat_folder){
		$storage_dir = 'videos/'.$cat_folder.'/';
		$file_name = $tmp_video_enc;
		$file_path = $storage_dir.$file_name;

		if(file_exists($file_path)){
			$enc_video_file = file_get_contents($file_path);

			//get filename frm db
			$mediaData = $this->select2('mediastorage', ' WHERE file = ?', $tmp_video_enc);

			$iv = $mediaData[0]['iv'];
			$key = $mediaData[0]['pw'];

			$method = "AES-256-CBC";
			$dec_video_file = openssl_decrypt($enc_video_file, $method, $key, 0, $iv);

			$temp_file = tempnam(sys_get_temp_dir(), 'veo');
/*		file_put_contents($temp_file, $dec_video_file);

		return $temp_file;
*/	   
   	file_put_contents('videos/'.$cat_folder.'/dec/'.$file_name.'.webm', $dec_video_file);
			return 'videos/'.$cat_folder.'/dec/'.$file_name;
	   }
	}
	public function videoDecryptor22($tmp_video_enc, $cat_folder){
		$storage_dir = '../videos/'.$cat_folder.'/';
		$file_name = $tmp_video_enc;
		//var_dump($file_name);
		$file_path = $storage_dir.$file_name;//.'.webm';

		//if(file_exists($file_path)){
		//	var_dump('file exist');
			$enc_video_file = file_get_contents($file_path);

			//get filename frm db
			$mediaData = $this->select2('mediastorage', ' WHERE file = ?', $tmp_video_enc);

			$iv = $mediaData[0]['iv'];
			$key = $mediaData[0]['pw'];
//var_dump($iv.' :videnc: '.$tmp_video_enc);
			$method = "AES-256-CBC";
			$dec_video_file = openssl_decrypt($enc_video_file, $method, $key, 0, $iv);
	
		   	file_put_contents('../videos/'.$cat_folder.'/dec/'.$file_name.'.webm', $dec_video_file);
			return 'videos/'.$cat_folder.'/dec/'.$file_name;
	   //}else{var_dump($file_path);}
	}
	public function checkClassTime($chatAudience, $class_date){
		return $this->checkClassDate($chatAudience, $class_date);
  }
	public function getGChatTopicDesc($lectureID){
		$lectureID = str_replace(' ', '+', $lectureID);
		$data = $this->select('classes', ' WHERE lecture_id = ?', $lectureID);
		return $this->dec_cons($data[0]['topic_desc']);
	}
	public function postSoloChat($cat, $que, $thumbnail, $media, $contentID_enc, $insight, $datetime){

	    $aoi_array = $this->aoi($cat);
       	$queCol = $aoi_array['queCol'];
		$user_id_col = $aoi_array['user'];
		$cat_id = $aoi_array['cat_id'];
		$cat_tbl = $aoi_array['topic'];
		$expert = $aoi_array['expert'];
		$folder = $aoi_array['folder'];

		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];

		//prevent double posting
		$catVal = $que.', '.$user_id_col;
		$checkerData = $this->select($cat_tbl, ' WHERE '.$queCol.'=? AND '.$user_id_col.'=?', $catVal);

		if(count($checkerData)==0){
  		$vals = array($queCol=>$que, $user_id_col=>$me);
		  $this->insert2Db($cat_tbl, $vals);
     }
        //send to the right folder from temp dir
/*        if($media == 3 ){
        	rename('../videos/temp/'.$que, '../videos/'.$folder.'/'.$que);
        }
*/
		$valu = $que.', '.$me;
		$data = $this->select($cat_tbl, ' WHERE '.$queCol.'= ? AND '.$user_id_col.'= ?', $valu);
			$colVal = $data[0][$cat_id]; 


//prevent Double posting
			$checkerVal = $me.', '.$contentID_enc.', '.$media.', '.$colVal.', '.$thumbnail.', '.$cat;

			$checkerData2 = $this->select('solochat', ' WHERE scriptor_id = ? AND content_id = ? AND media = ? AND '.$cat_id.' = ? AND thumbnail = ? AND category_id = ?', $checkerVal);

		if(count($checkerData2) == 0){
			!empty($datetime) ? 
			$val2 = array('scriptor_id'=>$me, 'content_id'=>$contentID_enc, 'media'=>$media, $cat_id=>$colVal, 'thumbnail'=>$thumbnail, 'category_id'=>$cat, 'cdate'=>$datetime, 'insight'=>$insight) :
			$val2 = array('scriptor_id'=>$me, 'content_id'=>$contentID_enc, 'media'=>$media, $cat_id=>$colVal, 'thumbnail'=>$thumbnail, 'category_id'=>$cat);


			$this->insert2Db('solochat', $val2);
		}
	}
	public function fetchPending(){
    	$userData = $this->fetchUser();
    	$me = $userData[0]['profile_id'];
    	$_me = $me;//$this->usercode($me); 
    	
    	$vals = $me.', %.'.$_me.'.%';
    	
    	$pendingData = $this->select('pending', ' WHERE owner = ? or contributor LIKE ?', $vals);
    	return $pendingData;
    }
    
    public function addToPending($catid, $title, $projectID, $mediaType, $owner, $contributors, $projectType){

    	$vals = $projectID;
    	$pendingData = $this->select('pending', ' WHERE projectID = ?', $vals);
      	
      	!empty($pendingData[0]['contributor']) ? $contributors = $pendingData[0]['contributor'].$contributors.'.' : $contributors ='.'.$contributors.'.';

    	$vals = array('projectCat'=>$catid, 'projectTitle'=>$title, 'projectID'=>$projectID, 'contributor'=>$contributors, 'projectType'=>$projectType, 'owner'=>$owner);
    	count($pendingData) == 0 ? $this->insert2Db('pending', $vals) : '';

    }
    
    public function updatePending($catid, $title, $projectID, $mediaType, $owner, $contributors){
    
    	$catid = $pendingData[$n]['projectCat'];
    	$title = $pendingData[$n]['projectTitle'];
    	$projectID = $pendingData[$n]['projectID'];
    	$mediaType = 1;
    
    	$dateNow = time();
    	$vals = $catid.', '.$title.', '.$dateNow.', '.$projectID;
    
    	$this->updateStmt('pending', 'projectCat = ?, projectTitle = ?, newupdate = ? WHERE projectID = ?', $vals);
    }
    public function countDownStyled(){
        $cd = "<div id='activeTimer2' style='position:fixed; top:48%; bottom:49%; display:flex; justify-content:center; align-items:center; width:100%; z-index:101; filter:drop-shadow(1px 1px 1px #fff); -webkit-text-stroke-width:1.5px; text-stroke-width:1.5px; -webkit-text-stroke-color:#fff; text-stroke-color:#fff; color:rgba(255,255,255, .05); font-size:200px; font-weight:1000;'></div>"; 
        return $cd;
    }
	public function soloscript($contentID_enc, $cat, $thirdparty){

		$thirdparty === true ? $soloChats = $this->fetch3rdparty($contentID_enc) : $soloChats = $this->fetchsolochat($contentID_enc);
		$ln = count($soloChats) - 1;

		if($ln > 0){
		$title = $soloChats[$ln]['title'];
		$chats = "";
        $ndata = $this->fetchUser();
        $this_user = $ndata[0]['profile_id'];
		while($ln >= 0){
			$que = $soloChats[$ln]['que'];
			$catid = $soloChats[$ln]['catid'];
			$mode = $soloChats[$ln]['mode'];
			$chatDir = $soloChats[$ln]['type'];
			$chat_id = $soloChats[$ln]['chatid'];
			$content_id = $soloChats[$ln]['cid'];
			$lock = $soloChats[$ln]['locked'];
			$flag = $soloChats[$ln]['flag'];
			$scrolletDate = $soloChats[$ln]['sol_date'];

			!empty($soloChats[$ln]['insight']) ? $scrollet_insight = $soloChats[$ln]['insight'] : $scrollet_insight = "Insight about this scrollet appears here. Click here to edit and add concise, meaningful and descriptive insight to buttress this scrollet.";

			$recipient_id_enc = $this->enc_cons(0);
			$close = 0;
			$action = $this->encryptor0('APPROVED');
   			$soloPublish = $this->encryptor0('soloPublish');
	
			$timeStmp = $soloChats[$ln]['sol_date'];
			$mode == 1 ? $long_url = 'sounds/'.$chatDir.'/'.$audioUrl.'.webm' : ($mode == 2 ? $long_url ='img/'.$cat.'/'.$que.'.webp' :( $mode == 3 ? $long_url = 'videos/'.$cat.'/'.$que.'.webm' : $long_ur = ''));

//move the file from temp to main folder
    		$mode == 3 ? 
			$xx = $this->videoDecryptor($que, $chatDir).'.webm' : $xx="";
//header('Content-Type: video/webm');
//readfile($xx);
			$_cat_enc = $this->encryptor0($catid);

	    	$mode == 1 ? 
			$format = "<audio id='".$chat_id."' controls style='' class='audiostyle each-audio'><source src='' type='audio/webm'></audio>" : ($mode == 2 ? $format = "<div style='width:100%; height:500px;'><div id='bg".$chat_id."'><img loading='lazy' class='chatimg flexible' id='".$content_id.$chat_id."' src='img/".$chatDir."/".$que.".webp' style='width:100%; height:500px; object-fit:cover;' /></div></div>" : ($mode == 3 ? $format = "<video id='v".$chat_id."' width='100%' height='500px' class='flexible2' controls loading='lazy' style='object-fit:cover;' src='".$xx."' type='video/webm'></video>" :
			$format = "<span id='".$chat_id."' style='font-size:14px;'></span>
        			    <script>
        			        var sc = localStorage.getItem('shrd' + '$contentID_enc');
            			    getDecrypted('$que', '$chat_id');
            			
            			 </script>"));
			//if($flag != 0){
				/*
<div style='display:flex; position:fixed; width:100%; top:0; left:0; background:rgba(0,0,0,0.3); z-index:20;'>
				  			<span style=' font-weight:bold; font-size:18px; text-align:center; color:#fff; width:100%;'>$title</span>
								<div onclick='$(\"#modal\").slideDown();' style='color:#fff; margin-left:auto; margin-left:-10px;'><span class='material-icons' style='color:#fff; font-size:30px;'>&#xe5d4;</span>
        					</div>
						</div>
				*/

			/*	$chats.="
				  
				  		<div id='modal' class='menulist' style='display:none; z-index:5421; position:fixed; top:25px; right:5px;'>
				  			<div style='display:flex; justify-content:flex-end;'>
				  				<div style='border-bottom-right-radius:5px; border-bottom-left-radius:5px; background:#fff; filter:drop-shadow(-1px 1px 1px #888); padding:10px; padding-left:24px; font-size:16px;'>
									<p style='margin:-5px -8px 5px -14px; text-align:left;' onclick='$(\"#modal\").slideUp(20);'>&times;</p>
									<p style='margin-bottom:4px; margin-left:-4px; padding-bottom:4px; border-bottom:1px solid #ccc;'><a style='text-decoration:none; font-size:14px;' href='index.php?page=publish&val=$contentID_enc&ab=$soloPublish&cat=$_cat_enc&ttl=$title'>Publish</a></p>";
			  if($close == '0'){
			    	$chats.="		<p style='margin-bottom:4px; margin-left:-4px; padding-bottom:4px; font-size:14px;' id='close".$chat_id."' onclick='$(\"#dialog".$chat_id."\").slideDown(20);'>Close</p>";
              }
			$chats.="
									<input type='hidden' name='chatID' value='".$chat_id."' />
									<input type='hidden' name='category' value='".$cat."'/>
					       
								</div>
							</div>
						</div>";
*/
			//}else{
if($flag==0){
			$chats .= "<div class='each-section newchat' style='display:flex; justify-content:center; font-size:16px; margin-bottom:0px;' id='".$chat_id."b'>
						 <input type='hidden' name='mode' id='m".$chat_id."' value='".$mode."' />
					        <input type='hidden' name='q' id='q".$chat_id."' value='".$que."' />
							<input type='hidden' name='c' id='cat".$chat_id."' value='".$chatDir."' />
							<input type='hidden' name='scrolletDate' id='date".$chat_id."' value='".$scrolletDate."' />
					        <div style='width:100%;'>
					            <div style='position:relative; color:#000; background:#fff; width:100%;' id='".$chat_id."a'>
					 	            <div><a id='".$chat_id."' href='#".$chat_id."' style='color:#000; text-decoration:none;'></a></div>
                                        ".$format."
    					            <figcaption id='ins".$chat_id."' style='position:absolute; top:0; left:0; font-size:14px; height:100%; display:none; justify-content:center; align-items:center; width:100%; z-index:10;'>
    					            	<div style='display:flex; flex-direction:column; z-index:10; width:100%; color:#fff; text-shadow:1px 1px #222; height:500px;'>
    					            		<div style='border-top-right-radius:20px; border-top-left-radius:20px; padding:20px; width:100%; margin-top:auto; padding-bottom:50px; text-align:justify;  background:rgba(255, 255, 255, .05);'>
																<div onclick='$(\"#ins".$chat_id."\").slideUp(1000);' style='display:flex; justify-content:center; margin:0 auto 20px auto;'>
																	<div onclick='$(\"#ins".$chat_id."\").slideUp(1000);' style='height:4px; width:30px; background:#fff; border:1px solid #fff; border-radius:20px;'>
																	</div>
																</div>
				    					            <div id='cntted".$chat_id."' contenteditable='true' onclick='clearContent(\"cntted".$chat_id."\");' style='width:100%;'>".$scrollet_insight."
				    					            </div>
				    					            <p style='text-align:center; margin:25px auto 5px auto;'><span style='color:yellow;' onclick='addContent(\"cntted".$chat_id."\");'>Add</span></p>
    					            	  </div>
    					           		</div>
    					          	</figcaption>
    					            <div style='display:flex; align-items:center; justify-content:center; padding-bottom:-5px;'>
    					             <div style='font-size:10px; color:#000; margin-left:5px;'>".$timeStmp."</div>";

    					            if($lock==1){$chats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$chat_id.", 0)' style='margin-left:10px; margin-right:15px;' id='lock".$chat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:skyblue;'>&#xe897;</span>
    					            </div>";}

    					            elseif($lock == 0){
    					            	$chats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$chat_id.", 1)' style='margin-left:10px; margin-right:15px;' id='lock".$chat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:#aaa;'>&#xe898;</span></div>";
    					            }
    					          
    					          
    					       if($mode == 2 || $mode == 3){
    					           $chats .="<span style='font-size:14px; margin-left:auto; margin-right:10px;' onclick='$(\"#ins".$chat_id."\").slideDown();' class='material-icons'>&#xe8fe;</span>";
								}
    					        $chats .="
    					            </div>
    					            
                                </div>
    					     </div>
					       </div>";}
		$ln--;
		}

		return $chats;
	}
	}


	public function groupChats($lectureID_enc){
		//$lectureID_enc = $this->dec_cons($lectureID_enc);
		$allGrpChats = $this->fetchgchat($lectureID_enc);
		
		$ln = count($allGrpChats)-1;
		$gChats = "";
		$topicDesc = $this->getGChatTopicDesc($lectureID_enc);

		$lectureID = $this->dec_cons($lectureID_enc);
		$uniqConverse_enc = $lectureID_enc;

		$lectureID_array = explode('_', $lectureID);
		$tutor = $lectureID_array[0];
		$cat_id = $lectureID_array[1];
		$tutor_id_enc0 = $this->encryptor0($tutor);
		$aoi_data = $this->fetchaoi($cat_id);
		$chat_flag1 = strtoupper($aoi_data[0]['category']);
		$chat_flag2 = ucfirst($aoi_data[0]['subcategory']);
		$checkMark = $this->veriCheckMark($tutor, $cat_id, '3', '#888');
		$imageView = $this->generate_DP($tutor, '30px', '');
		$imageView2 = $this->generate_DP($tutor, '100px', '');

		count($allGrpChats) > 0 ?	$time_future = strtotime($allGrpChats[0]['class_date']) : $time_future = 1;
  		$current_time=time();
  		$diff = ($time_future - $current_time) * 1000;
  		$tutorData = $this->fetchProfile($tutor);
			
			$fullname = strtoupper($this->decryptor0($tutorData[0]['lastname'])).' '.strtoupper($this->decryptor0($tutorData[0]['firstname']));
			$totalPub =	$tutorData[0]['works'];
 			$totalFolo = $tutorData[0]['tf'];
						    

			$userData = $this->fetchUser();
			$this_user = $userData[0]['profile_id'];
			$me_enc0 = $this->encryptor0($this_user);
			$visibility = 1;

	  $action = $this->encryptor0('APPROVED');
   	$xpertPublish = $this->encryptor0('xpertPublish');
	$g_cat = $allGrpChats[0]['catid'];
	$_cat_enc = $this->encryptor0($g_cat);
		
		while( $ln >= 0 ){
		//	$time_future = strtotime($allGrpChats[$ln]['class_date']);
  		$sender = $allGrpChats[$ln]['s'];
			$que = $allGrpChats[$ln]['que'];
			$recipient_id = $allGrpChats[$ln]['r']; 
			$recipient_id_enc_cons = $this->enc_cons($recipient_id);
			$recipient_id_enc =  $this->encryptor0($recipient_id);

			$flag = $allGrpChats[$ln]['flag'];
			$mode = $allGrpChats[$ln]['mode'];
			$gchat_id = $allGrpChats[$ln]['chat_id'];
			$chatDir = $allGrpChats[$ln]['type'];


			$timeStmp = $this->time($allGrpChats[$ln]['tstamp']);
			////////////////////////////////////////////////////////////////////////

	      $replyto = $allGrpChats[$ln]['replyto'];
				$vet_id = '';
				$agro_id = '';
				$hth_id = '';
				$cook_id = '';
				$guide_id = '';
				$uniq_id = '';
				$uniq ='';
			
			$replyTomsg = '';
			$lock = '';
			$recip_id = '';
			$quoteSender ='';
			if(!is_null($replyto) && $replyto > 0){
		       $sql = "SELECT * from chat WHERE chat_id = ".$replyto;
				$replyStmt = $this->connect()->query($sql);
				$data = $replyStmt->fetch();
				$vet_id .= $data['vet_id'];
				$agro_id .= $data['agro_id'];
				$hth_id .= $data['hth_id'];
				$guide_id .= $data['guide_id'];
				$cook_id .= $data['cook_id'];
				$lock .= $data['locked'];
				$recip_id .= $data['recipient_id'];

				//check quote view permission
				$lock == 1 ? $quote_visibility = $this->permissionStatus($cat_id, $recip_id) : $quote_visibility = 1;

			    $array = $this->_aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			 $queCol = $array['queCol'];
			 //$que = $data[$queCol];
			 $chatType = $array['strDir'];
             $col_id = $array['col_id'];
             $col_val = $array['colval'];
             $topic = $array['topic'];
		        $sql = "SELECT * from ".$topic." WHERE ".$col_id." = ".$col_val;
             	$topicStmt = $this->connect()->query($sql);
				$data = $topicStmt->fetch();
				$quote_visibility == 1 ? $replyTomsg .= $data[$queCol] : $replyTomsg = '';
				$prefix = mb_substr($topic, 0, 1);
				$quoteSender .= $data[$prefix.'_user_id'];
				
				$uniq_id .= 'reply'.$replyto;
				$uniq .=$replyto;
		    }

      $close = $allGrpChats[$ln]['close'];
			$que = $allGrpChats[$ln]['que'];
			$cat = str_replace('_chats', '', $chatDir);
			
	///////////////////////////////////////////////////
			   	$flag > 0 ? $gChats .= "</div><div id='chats".$lectureID_enc."'>" : $gChats .="";
			   	$audioUrl =$que;

			$mode == 1 ? $long_url = 'sounds/'.$chatDir.'/'.$audioUrl.'.webm' : ($mode == 2 ? $long_url ='img/'.$cat.'/'.$que.'.webp' :( $mode == 3 ? $long_url = 'videos/'.$cat.'/'.$que.'.webm' : $long_ur = ''));

	        $quoteSender == $this_user ? $qbg = '#eee' : $qbg = 'skyblue';

				//set full with for pictures chat
		  $mode == 2 ? $cWidth = 'max-width:80%; min-width:80%;' : ($mode == 3 ? $cWidth = 'max-width:80%; min-width:80%;' : $cWidth='max-width:80%;');

			$mode == 1 ? 
			$format = "<audio id='".$gchat_id."' controls style='' class='audiostyle each-audio'><source src='' type='audio/webm'></audio>" : ($mode == 2 ? $format = "<div style='width:100%; height:300px;'><div id='bg".$gchat_id."'><img loading='lazy' class='chatimg flexible' id='".$gchat_id."' src='' style='width:100%; height:300px; object-fit:cover;' /></div></div>" : ($mode == 3 ? $format = "<video id='".$gchat_id."' width='100%' height='280px' class='flexible2' controls style='object-fit:cover;'><source src='' type='video/webm'></video>" :
			$format = "<span id='".$gchat_id."' style='font-size:14px;'></span>
        			    <script>
        			        var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        localStorage.setItem('rK', '$recipient_id_enc_cons');
            			    getDecrypted('$que', '$gchat_id', '$cat_id');
            			
            			 </script>"));
  
if($flag != 0){
	$tutor == $this_user ? $chatrecipient = "<div style='width:30px; height:30px; border-radius:50%; border:1px solid #000; background:#fff; display:flex; justify-content:center; align-items:center; font-size:8px;'>Group</div>": $chatrecipient = $imageView;
	$tutor == $this_user ? $chatrecipientName = 'Class': $chatrecipientName = 'Tutor';

			$gChats .="<div class='each-sectio pt2' style='display:flex; width:100%; align-items:center; justify-content:space-between; margin-top:0px; margin-bottom:20px; padding:3px; color:#fff; font-size:14px; position:fixed; top:0.2px; left:0px; z-index:100; border-bottom:1px solid #888;'>
					
					<div style='display:flex;'>
							<a href='index.php?page=profile&pid=$tutor_id_enc0' style='color:#000; text-decoration:none;'>".$chatrecipient."</a>
					    <div style='display:flex column; align-items:space-between; margin-left:5px; color:#000;'>
						  	  <div style='display:flex; font-size:12px;'>
							  		  <div><a href='index.php?page=profile&pid=$tutor_id_enc0' style='color:#000; text-decoration:none;'>$chatrecipientName</a></div>
											<div style='margin:2px auto auto 2px;'>
												<span>
												$checkMark
												</span>
										  </div>

						    	</div>
									<div style='display:flex; margin-top:-2px; align-items:center; font-size:10px;'>status&nbsp;<div id='indicator".$recipient_id."' style='height:8px; width:8px; background:#4CBB17; border-radius:50%; border:1.4px solid #fff; margin-left:2px;'></div>
									</div>
							</div>
					</div>
    			<div style='font-size:16px; font-weight:bold;'>
    			 		<div style='display:flex; flex-direction:column; align-items:center;'>
    					    <div style='margin:-2px auto -6px auto; color:#2166f3;'>$chat_flag1</div>
    					    <div style='font-size:12px; font-style:italic; color:red;'>$chat_flag2</div>
    					</div>
    			</div>
					<div style='display:flex; justify-content:center; align-items:center;'>
						    <div style='margin-left:auto; margin-right:10px;'><a href='index.php?page=profile&pid=$me_enc0' style='color:#000; text-decoration:none;'><span style='font-size:16px;' class='material-icons'>&#xe7fd;</span></a>
						    </div>
				
        				<div style='color:#000; display:flex; justify-content:center; align-items:center;'><span>$timeStmp</span><span class='material-icons' style='margin-left:10px;'  onclick='$(\"#modal".$gchat_id."\").slideDown(200);'>&#xe5d4;</span>
        				</div>
					</div>
				</div>";
				//////////////////GRP CHAT MODAL PAGE STARTS
				$gChats .="<div id='modal".$gchat_id."' class='menulist' style='display:none; z-index:21; position:fixed; top:45px; right:5px;'><div style='display:flex; justify-content:flex-end;'><div style='border-bottom-right-radius:5px; border-bottom-left-radius:5px; background:#fff; filter:drop-shadow(-1px 1px 1px #888); padding:18px; padding-left:24px; font-size:13px;'>
					<p style='margin:-15px -8px 5px -10px; text-align:left;' onclick='$(\"#modal".$gchat_id."\").slideUp(20);'>&times;</p>";

					if($tutor == $this_user){

					$gChats .="<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc; color:#fff;'><a style='text-decoration:none; color:#000;' href='index.php?page=publish&val=$uniqConverse_enc&ab=$xpertPublish&cat=$_cat_enc'>Publish script</a></p>";
					}
					$gChats.="
					<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc;' onclick='saveChat(\"$_cat_enc\", \"$uniqConverse_enc\", \"$recipient_id_enc\");'>Save locally</p>";
			  if($close == '0'){
			    	$gChats.="<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc;' id='close".$gchat_id."' onclick='$(\"#dialog".$gchat_id."\").slideDown(20);'>Close chat</p>";
              }
			//saveChat($_cat_enc, $uniqConverse_enc, $recipient_id_enc)
			$gChats.="
					<input type='hidden' name='chatID' value='".$gchat_id."' />
					<input type='hidden' name='category' value='".$g_cat."'/>
					       
				</div></div></div>";
				/////////////////ENDS AAA
//////////////////////////////////CLASS PREAMBLE STARTS
				$gChats.="<div style='width:100%; min-height:85vh; display:flex; flex-direction:column; justify-content:center; 	align-items:center; padding-top:10px;' id='title'>
							<div style='border:.5px solid #000; border-radius:10px; padding:15px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#eee;'>$imageView2
							<div style='font-size:12px; margin-top:6px; font-weight:bold;'>$fullname</div>
   						<div style='font-size:10px; margin-top:6px;'>$totalPub Publications</div>
							<div style='font-size:8px;'>$totalFolo Followers</div>

							<a href='' style='font-size:10px; margin-top:10px; padding:5px 25px; border:.5px solid #888; border-radius:6px; background:#ccc; color:#000;'>Follow</a>
							</div>
						<div style='display:flex; margin-bottom:20px;'>
							<div style='text-align:center; color:#2166f3; background:#fff; padding:10px; filter:drop-shadow(2px 2px 1px #ccc); border-radius:10px; font-family:serif; margin-top:40px;'>
								<div style='font-size:20px;'>Topic</div>
								<div style='margin-left:10px; font-size:14px; color:#000; background:#eee; padding:2px;'>$topicDesc</div>
							</div>
							</div>";
			(intval($diff)/1000) > 1 ?	$gChats .= $this->countDown($diff) : $gChats .= '';

				$gChats .= "</div>";
//////////////////////////////////CLASS PREAMBLE ENDS

}else{
	
					if($sender == $this_user){
			$gChats .=	$this->estimateDate($allGrpChats[$ln]['tstamp']);
			$this_user == $tutor ? $bg = 'cyan' : $bg = '#fff';

					$gChats .= "<div class='each-section newchat' style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; font-size:16px; margin-right:10px; margin-bottom:7px;' id='".$gchat_id."b'>
						 <input type='hidden' name='mode' id='m".$gchat_id."' value='".$mode."' />
					        <input type='hidden' name='q' id='q".$gchat_id."' value='".$que."' />
							<input type='hidden' name='c' id='cat".$gchat_id."' value='".$chatDir."' />
				
					        <div style='".$cWidth."'>
					            <div style='color:#000; background:$bg; padding:10px; border-radius:20px 20px 0 20px; width:100%;' id='".$gchat_id."a'>
					 	            <div><a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a></div>
                                        ".$format."
    					            <div style='display:flex; align-items:center; justify-content:center; padding-bottom:-5px;'>
    					             <div style='font-size:10px; color:#000; margin-left:5px;'>".$timeStmp."</div>";
    					            
    					            if($lock==1){$gChats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$gchat_id.", 0)' style='margin-left:10px; margin-right:15px;' id='lock".$gchat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:skyblue;'>&#xe897;</span>
    					            </div>";}
    					            elseif($lock == 0 && $tutor == $this_user){
    					            	$gChats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$gchat_id.", 1)' style='margin-left:10px; margin-right:15px;' id='lock".$gchat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:#aaa;'>&#xe898;</span></div>";
    					            }
    					            $gChats .="<div style='font-size:14px; margin-left:auto;' onclick='replythis(\"$gchat_id\", \"$que\");' class='material-icons'>&#xe15e;</div>
    					   
    					            </div>
    					        </div>
    					     </div>
					       </div> 
					       <script>
	                   // isOnline(\"$recipient_id_enc_cons\");
					       var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        var replyMsg = sym_decrypt('$replyTomsg', sc);
                            
            		        //if(Number.isInteger($replyto) && '$replyto' > 0){
                            //if(isNaN($replyto) || $replyto == 0){
            		if('$replyto' !== '' ){
            			      if('$replyto' !== '0'){
            			        document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
            			        $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'".$qbg."'});
            			    }  
            		    
            		}
        				</script>";
				}
				elseif( $sender != $this_user && $visibility == 1 ){
									$senderData = $this->fetchProfile($sender);
									$fullname = ucfirst($this->decryptor0($senderData[0]['firstname'])).' '.ucfirst($this->decryptor0($senderData[0]['lastname']));
					$dp = $this->generate_DP($sender, '20px', '');

					$sender == $tutor ? $bg = 'cyan' : $bg = '#fff';//iceberg#74b3ce';
					$sender == $tutor ? $admin = "<div style='display:flex; color:red; align-items:center; justify-content:space-between; min-width:30px; font-size:10px; font-weight:bold;'>$dp Tutor <div style=' margin-left:10px; margin-right:10px; height:2px; width:2px; background:red; border-radius:50%;'></div> <i class='fa fa-microphone'></i></div>" : $admin = "<div style='display:flex; align-items:center; font-size:10px; color:#2186f3; font-weight:bold; padding-right:10px;'>$dp<div style=' margin-left:8px; margin-right:8px; height:2px; width:2px; background:#aaa; border-radius:50%;'></div>$fullname</div>";
					$this_user == $tutor ? $bg = '#fff' : $bg;
//					$this_user == $tutor ? $userBG = 'background:#eee; border-radius:5px;' : $userBG='';
//   microphone  <span style='font-size:14px;' onclick='replythis(\"$gchat_id\", \"$que\");' class='material-icons'>&#xe15e;</span>
    					           
					$gChats .=	$this->estimateDate($allGrpChats[$ln]['tstamp']);
					$gChats .= "<div class='each-section newchat' style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-start; font-size:16px; margin-left:10px; margin-bottom:7px;' id='".$gchat_id."b'>
					     <input type='hidden' name='mode' id='m".$gchat_id."' value='".$mode."' />
					        <input type='hidden' name='q' id='q".$gchat_id."' value='".$que."' />
						   	<input type='hidden' name='c' id='cat".$gchat_id."' value='".$chatDir."' />
				
					        <div style='background:$bg; padding:10px; border-radius:20px 20px 20px 0; ".$cWidth."' id='".$gchat_id."a'>
					<div style='margin:-5px 20px 5px auto; padding:-10px; width:100%; text-align:left;'>$admin</div>
					<div><a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a></div>
                            ".$format."
					        <div style='display:flex; padding-bottom:-5px;'>
    					           <i class='fa fa-microphone' style='font-size:10px; color:red;' onclick='replythis(\"$gchat_id\", \"$que\");'></i>
    					             <span style='font-size:10px; color:#fff; margin-left:auto;'>".$timeStmp."</span>
    					            
    					   </div>
					
                        </div></div> <script>
                        //isOnline(\"$recipient_id_enc_cons\");
        			        var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        var replyMsg = sym_decrypt('$replyTomsg', sc);

            			    if('$replyto' !== '' && '$replyto' !== '0'){

                			    document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
                			    $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'".$qbg."'});
            			    }
            			    
            			</script>";
				}
		    

}

$ln--;

		}

		return $gChats;
	}

	public function countDown($diff){

		$count = "<div id='countdown'>
								<div id='tiles'>
									<span>0</span>
									<span>0</span>
									<span>0</span>
									<span>0</span>
								</div>
								<div class='labels'>
									<li>Days</li>
									<li>Hours</li>
									<li>Mins</li>
									<li>Secs</li>
								</div>
							</div>
							<script>countDownJs($diff);</script>";
		return $count;
	}
	public function countDown2($diff){

		$count = "<div>
								<div id='tiles' style='color:#444; font-size:12px;'>
									<span>0</span>
									<span>0</span>
									<span>0</span>
									<span>0</span>
								</div>
							</div>
							<script>countDownJs($diff);</script>";
		return $count;
	}

	public function getUniqId($cat, $me){
		return $cat.$me.time();
	}
	public function getClasses(){
		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];
		$xpt = $userData[0]['xpt'];
		$vals = '%_'.$me.'_%, '.$me;

		$all_classes = $this->select('classes', ' INNER JOIN profile USING (profile_id) WHERE foloas LIKE ? OR profile_id = ? ORDER BY class_date DESC', $vals);
		$n = count($all_classes);
		 $xpt == 1 ? $addClassBtn = "<div style='margin-left:auto;'><a href='newclass' style='text-decoration:none; color:#2166f3; font-size:50px;'>+</a></div>" : $addClassBtn ="<div style='margin-left:auto;'></div>";

		$eachClass = "<div style='display:flex; width:100vw; align-items:center; justify-content:center; background:#eee;'>
										<div class='enquiry-form' style='display:flex; flex-direction:column; font-size:12px; padding:10px; width:100%;'>
											<div style='display:flex; align-items:center; justify-content:center; padding:5px 20px 5px 20px;'>
		 										<div style='font-size:20px; color:#2166f3; margin-left:auto;'>Classes</div>
		 										$addClassBtn
		 									</div>";
		if(count($all_classes) == 0){
			$eachClass .="<div style='display:flex; margin-bottom:20px; align-items:flex-end;'>Sorry, No impending lecture is available. Kindly check back.</div>";
		}
		
		foreach($all_classes as $class){
				//$redirectURL = "../index.php?page=groupchat&lectureid=".$class['lecture_id'];

				$lecture_id_dec_cons = $this->dec_cons($class['lecture_id']);
						$lectureIDarr = explode('_', $lecture_id_dec_cons);
						$cat = $lectureIDarr[1];
						$aoiData = $this->fetchaoi($cat);
						$topicCat = $aoiData[0]['subcategory'];
						$uniqid = $this->getUniqId($cat, $me);
				$class_id = $class['class_id'];
//				$lecture_id_enc0 = $this->encryptor0($lecture_id_dec_cons);
				$class_date_enc = $this->enc_cons($class['class_date']);

	      $redirectURL = "index.php?page=confirmPay&lectureid=".$class['lecture_id'];
	
	      $amount = $class['lecture_fee'];
	      $email = $this->dec_cons($userData[0]['email']);
	      $contact = $this->decryptor0($userData[0]['contact']);
	      $fullname = $this->decryptor0($userData[0]['lastname']).'-'.$this->decryptor0($userData[0]['firstname']);
	      $scriptTopic = $this->dec_cons($class['topic_desc']);
	      $productID = $class['lecture_id'];

	      !empty($userData[0]['email']) ? $email : $email = 'xkrolly@gmail.com';
	
	      $time_future = strtotime($class['class_date']);

				$_classDate = date('M d, H:i', $time_future);//class['class_date']);
	      
	      $current_time=time();
    		$diff = intval($time_future) - intval($current_time);
//$diff <= 0 ? $diffInMin = -1 
    		$diff <= 0 ? $classDur = 29 - round((-1 * ($diff/60))) : $classDur = 0;
  $classDur < 0 ? $classDur = 0 : $classDur;  

//var_dump($diff.'='.$classDur);

  //	var_dump($diffInMin);
	  //  $this->pay($amount, $me, $redirectURL, $scriptTopic);

				// makePayment(uniqid, amount, email, contact, fullname, redirectURL, scriptTopic, productID)
$_xpid = $this->enc_cons($class['profile_id']);
$xpid_ = $this->cutSpecialChars($_xpid);
$check = $this->checkFoloa($class['profile_id'], $me);
												    
	      $imgUrl_tutor = $this->generate_DP($class['profile_id'], '94px', '');
$eachClass .= "<div style='margin-bottom:20px; border-radius:105px; filter:drop-shadow(1px 1px 1px #ddd) drop-shadow(-1px -1px 1px #eee); background:#fff;'><div style='display:flex;'>
									<div style='height:98px; padding:3px; display:flex; justify-content:center; align-items:center;'>".
									$imgUrl_tutor;
																       if(count($check) == 0 && $class['profile_id'] != $me){
							        $eachClass .= "<div class='folo".$xpid_."' style='display:flex; justify-content:center; align-items:center; font-size:20px; margin-left:-20px;; margin-right:auto; padding:2px; width:16px; height:16px; background:#fff; border-radius:50%; filter:drop-shadow(1px 1px 1px #ccc); color:red; margin-top:55px;' onclick='foloDis(\"$_xpid\")' >+</div>";
																}

intval($class['lecture_fee']) <= 0 ? $fee = 'Free' : $fee = '#'.intval($class['lecture_fee']);
					
$eachClass	.="		</div><div style='width:100%;'>
										<div style='display:flex; flex-direction:column; justify-content:flex-start; height:90px; width:100%; margin-right:10px;'>
														<div style='width:100%; text-align:center; font-weight:bold; font-size:13px; margin-top:4px; margin-bottom:4px; display:flex; justify-content:center;'>".ucfirst($topicCat)."</div>
														<div style='font-size:11px; padding-top:5px 10px -4px 10px; text-align:center;'>".$this->dec_cons($class['topic_desc'])."...
														</div>
														<div style='display:flex; align-items:flex-end; margin-top:auto; margin-bottom:-2px; justify-content:space-around; width:100%;'>
															<div style='font-size:7px; color:#000;'>500 Pub</div>
															<div style='font-size:14px; font-weight:bold; color:#999;'>".$fee."</div>
															<div style='font-size:7px; color:#2166f3;'>";

																			if($diff > 1){
																				$eachClass .="
																				<div style='font-size:6px;'>$_classDate</div>";
																				//".$this->countDown2($diff)."Days::Hours::Mins::Secs</div>";
																			}else{
																				$classDur == 0 ? $col = '#888' : $col = '#2166f3';
																				
																				$eachClass .="<div style='font-size:7px; color:$col; display:flex; justify-content:flex-end;'><div id='min_span$class_id'>30</div>:<div id='sec_span$class_id'>00</div></div>
																				<script> countDownTimer($classDur, $class_id); </script>";

																			}
																			$eachClass .="
															</div>
														</div>
														
										</div>
													
									</div>
									<div>
										<div style='height:96px; padding:10px 10px 10px 2px; border-bottom-right-radius:50px; border-top-right-radius:50px; display:flex; justify-content:center; align-items:center;'><button class='hover' style='border:transparent; background:transparent; font-size:16px; color:red; font-weight:bold;' onclick='pay(\"$uniqid\", \"$amount\", \"$email\", \"$contact\", \"$fullname\", \"$redirectURL\", \"$scriptTopic\", \"$productID\")'>Join</button>
										</div>
									</div>
							</div></div>";
		}
			$eachClass .="</div></div>";
		return $eachClass;
		
	}
	public function createClass($topic, $topicDesc, $classTime, $lecturefee){
		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];

		$creationTime = time();
		$host = $me;

		$classID = $host.'_'.$topic.'_'.$classTime.'_'.$creationTime;
		$classID_enc = $this->enc_cons($classID);

		$vals = array('profile_id'=>$host, 'lecture_id'=>$classID_enc, 'topic_desc'=>$topicDesc, 'lecture_fee'=>$lecturefee, 'class_date'=>$classTime);
		$this->insert2Db('classes', $vals);

		$class_data = $this->select('classes', ' WHERE lecture_id = ?', $classID_enc);
		$class_id = $class_data[0]['class_id'];
/*

			return array('queCol'=>$queCol, 'user'=>$user_id_col, 'cat_id'=>$cat_id, 'topic'=>$topic, 'folder'=>$folder, 'expert'=>$expert, 'brd_cat'=>$brd_category);
*/

		$aoiDATA = $this->aoi($topic);

		$cat_table = $aoiDATA['topic'];
		$queCol = $aoiDATA['queCol'];
		$hostColumn = $aoiDATA['user'];
		
		$vals2 = array($hostColumn=>$host, $queCol=>'Starts');
		$this->insert2Db($cat_table, $vals2);

		$sel_val = $host.', Starts';
		$data = $this->select($cat_table, ' WHERE '.$hostColumn.' = ? AND '.$queCol.' = ?', $sel_val);
		$cat_id = $aoiDATA['cat_id'];
		$cat_val = $data[0][$cat_id];

		$cat_idCol = $aoiDATA['cat_id'];
		$catID_val = $cat_val;


		$vals2 = array('host'=>$host, 'sender_id'=>$host, 'recipient_id'=>$host, 'flag'=>$topic, 'class_id'=>$class_id, $cat_idCol=>$catID_val);
		$this->insert2Db('chat', $vals2);

		return $classID_enc;

	}

	/*public function compareBills($cat_quota, $category ){
		$oldApplied = $this->select('aoi', ' WHERE aoi_id = ?', $cat_quota);
		$newApplied = $this->select('aoi', ' WHERE aoi_id = ?', $category);
		$chargesDiff = intval($oldApplied[0]['charges']) - intval($newApplied[0]['charges']);

		$oldCat = $oldApplied[0]['subcategory'];
		$newCat = $newApplied[0]['subcategory'];
		$ncat_id = $this->enc_cons($category);
		$_chargesDiff = $this->enc_cons($chargesDiff);
//	$chargesDiff < 0 ? $link = 'index.php?page=changecateg&more='.$_chargesDiff : $link = 'index.php?page=changecateg&more='.$_chargesDiff;
	
		$link = 'index.php?page=changecateg&more='.$_chargesDiff.'&old='.$oldCat.'&new='.$newCat.'&ncat='.$ncat_id;
		header('Location: '.$link);

	}*/
	public function generateSoloSharedKey($cat){
		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];
    return $me.$cat.time();
  }
	public function getSharedKey($uc){
		$shrd_data = $this->select2('sharedkey', ' WHERE ucid = ?', $uc);
		return $this->dec_cons($shrd_data[0]['sk']);
	
	}
	public function quota($recipient, $divFactor, $trnx, $ProdID, $cat_id){
			$check_productPrice = false;
			$check_classFee = false;

			$aoi_data = $this->select('aoi', ' WHERE aoi_id = ?', $cat_id);

//			$trnx == 'consult' ? $price = $aoi_data[0]['charges'] : ($trnx == 'sub' ? $price = $aoi_data[0]['sub'] : $check_productPrice = true);
			$trnx == 'consult' ? $price = $aoi_data[0]['charges'] : ($trnx == 'sub' ? $price = $aoi_data[0]['sub'] : ($trnx == 'class' ? $check_classFee = true : $check_productPrice = true) );

			$product_ID = $ProdID;

//			$check_productPrice == true ? $pubData = $this->select('publish', ' WHERE published = ?', $product_ID);
			$check_productPrice == true ? $pubData = $this->select('publish', ' WHERE published = ?', $product_ID) : ($check_classFee == true ? $priceData = $this->select('classes', ' WHERE lecture_id = ?', $product_ID) : '');
			$check_productPrice == true ? $price = $pubData[0]['price'] : ($check_classFee == true ? $price = $priceData[0]['lecture_fee'] : $price); 

			$priceInCoin = $this->changeToCoin($price);

			if($recipient == 0 ){
						//recipient is ADMIN
						$glitData = $this->selectStmt2('glitsum', ' WHERE glit_id = ?', $cat_id);
						$_precoin = $glitData[0][$trnx];
						count($glitData) > 0 ? $preCoin = $this->dec_cons($_precoin) : $preCoin = 0;
						$CoinEquiv = $divFactor * intval($priceInCoin);
						//var_dump('PRICE: '.$price);

						$_newTotalCoin = intval($preCoin) + intval($CoinEquiv);

						$newTotalCoin = $this->enc_cons($_newTotalCoin);
		
						$vals = $newTotalCoin.', '.$cat_id;
						$this->update2Stmt('glitsum', $trnx.' = ? WHERE glit_id = ?', $vals);
			}elseif($recipient > 0){
					$recipientData = $this->select('skyman_user', ' WHERE user_id = ?', $recipient);
					$recipientAssets = $recipientData[0]['asset'];
					$_totalInCoin = $divFactor * intval($priceInCoin);
					$CoinEquiv = $_totalInCoin;

					$_recipientAssetsTotal = intval( $this->dec_cons($recipientAssets) ) + $CoinEquiv;
					$recipientAssetsTotal = $this->enc_cons($_recipientAssetsTotal);
//var_dump('Recipient earning total: '.$_recipientAssetsTotal.'::::'.$recipientAssetsTotal);
					$recipientVals = $recipientAssetsTotal.', '.$recipient;
					count($recipientData) > 0 ? $this->updateStmt('skyman_user', 'asset = ? WHERE user_id = ?', $recipientVals) : '';
			}
	}
	public function changeToCoin($amountInNaira){
		$amount = intval($amountInNaira) / 1000;
		return $amount;
	}
	public function getCoinBalance(){
	    $userData = $this->fetchUser();
	    $me = $userData[0]['profile_id'];
	    $coinData = $this->select('coin', ' WHERE owner_id = ?', $me);
	    $coinBal = $coinData[0]['Gcoin'];
	    return $coinBal;
	}
	public function manageConsultSession($tutor, $client, $appoStartDate, $appoEndDate, $cost){
        $insval = array('tutor'=>$tutor, 'client'=>$client, 'cost'=>$cost, 'sess_start'=>$appoStartDate, 'sess_end'=>$appoEndDate);
        $this->insert2Db('sess_manager', $insval);
	}
  public function chat_session(){

	    if(isset($_SESSION['chat-timeout'])){
	        $diff=time() - intval($_SESSION['chat-timeout']);
			       var_dump('DIFF: '.$diff);
	        if($diff>18000000){
	        	session_destroy();
	    	    header("location:../index.php");
	        	exit();
	        }
        }
		$_SESSION['chat-timeout']=time();
  }

	public function lockClientFeeForFutureTrnx($xpertConsultFee, $lockedCodeNew, $client){

		$coinData = $this->select('coin', ' WHERE owner_id = ?', $client);
		$Gcoin = $coinData[0]['Gcoin'] - intval($xpertConsultFee);
//		$locked = $coinData[0]['locked'] + intval($xpertConsultFee);
			$lockedCode = $this->dec_cons($coinData[0]['locked'])." ".$this->dec_cons($lockedCodeNew);
			$lockedCode_enc = $this->enc_cons($lockedCode);
	
		$vals2 = $Gcoin.', '.$lockedCode_enc.', '.$client;

		$this->updateStmt('coin', 'Gcoin = ?, locked = ? WHERE owner_id = ?', $vals2);

	}
	public function coin_TRNX($trxnAmnt, $trxnType, $buyer, $redirectURL){
		$trxnAmnt = $this->changeToCoin($trxnAmnt);
		$trxnType == 'coin4value' ? $_trxnAmnt = $trxnAmnt * -1 : ($trxnType == 'cash4coin' ? $_trxnAmnt = $trxnAmnt : '');  

	    $totalSupply = 1000000000; //1Billion GlitCoins
	  //  $buyer = $this->dec_cons($buyer);
		$coinData = $this->select('coin', ' WHERE owner_id = ?', $buyer);
		$valu = array('owner_id'=>$buyer);
		count($coinData) > 0 ? $mycoinBalance = intval($coinData[0]['Gcoin']) : $this->insert2Db('coin', $valu);
        count($coinData) > 0 ? $mycoinBalance : $mycoinBalance=0;
   		$newBalance = $mycoinBalance + $_trxnAmnt;
		$newBalance >= 0 ? $youAreOutaCoin = false : $youAreOutaCoin = true;

//set seesion for tutor page usage about previous balance b4 deduction
	    $_SESSION['Gb4'] = $this->enc_cons($coinData[0]['Gcoin']);
   
		$vals2 = $newBalance.', '.$buyer;

		$youAreOutaCoin == false ? $this->updateStmt('coin', 'Gcoin = ? WHERE owner_id = ?', $vals2) : header('Location: buycoin');
   
		$gcoinData = $this->select2('Gcoin', ' WHERE gcoin_id = ?', 1);
  
        $cum_spent_coin = $gcoinData[0]['cum_spent_coin']; 
        $cum_wallet_bal = $gcoinData[0]['cum_wallet_bal'];
        $total_purchased_coin = $gcoinData[0]['total_purchased_coin'];

    	$trxnType == 'cash4coin' ? $cum_wallet_bal = intval($cum_wallet_bal) + intval($trxnAmnt) : $cum_wallet_bal; 
		$trxnType == 'cash4coin' ? $total_purchased_coin = intval($total_purchased_coin) + intval($trxnAmnt) : $total_purchased_coin; 

		$trxnType == 'coin4value' ? $cum_spent_coin = intval($cum_spent_coin) + intval($trxnAmnt) : $cum_spent_coin; 
		$trxnType == 'coin4value' ? $cum_wallet_bal = intval($cum_wallet_bal) + intval($trxnAmnt) : $cum_wallet_bal;
    
		//update gcoin server. $trxnAmnt -ve for coin purchase and +ve for solscript purchase
		$vals = $cum_spent_coin.', '.$cum_wallet_bal.', '.$total_purchased_coin.', 1';
		$youAreOutaCoin == false ? $this->update2Stmt('Gcoin', 'cum_spent_coin = ?, cum_wallet_bal = ?, total_purchased_coin = ? WHERE gcoin_id = ?', $vals) : header('Location: buycoin');

//		$proceedToBuyNewCoin == false ? $this->update2Stmt('Gcoin', 'cum_spent_coin = ?, cum_wallet_bal = ?, total_purchased_coin = ? WHERE gcoin_id = ?', $vals) : header('Location: buycoin');

        !empty($redirectURL) ? header('Location:'.$redirectURL) : $newBalance;
        
        return $newBalance;


	}

	/*public function categoryPass($_cat){
			$userData = $this->fetchUser();
			$tutorQuota = $userData[0]['tutorQuota'];
				
				//check if the same category paid for is being used
			if(!empty($tutorQuota)){
				$_tutorQuota = $this->dec_cons($tutorQuota);
				$_tutor_Quota = explode('/==', $_tutorQuota);
				$cat_quota = $_tutor_Quota[0];
				$cat_quota == $_cat ? '' : $this->compareBills($cat_quota, $_cat);
			}
	}*/

	public function share_SessionPayment($admin, $buyer, $cat_id){
			$cat_id_dec = $this->dec_cons($cat_id);
			//var_dump('CATID: '.$cat_id.'===CATIDDEC: '.$cat_id_dec);
			$aoi_data = $this->select('aoi', ' WHERE aoi_id = ?', $cat_id_dec);
			$price = $aoi_data[0]['charges'];

			/*Admin share*/
			$this->quota($admin, '0.3', 'consult', '', $cat_id_dec);

			/*update buyer about it for tutor benefit as consult fee*/
			$_tutorQuota = 0.7 * intval($price);
			$_cat_tutorQuota = $cat_id_dec.'/=='.$_tutorQuota;
			$cat_tutorQuota = $this->enc_cons($_cat_tutorQuota);
			
			$vals= $cat_tutorQuota.', '.$buyer;
			$this->updateStmt('profile', 'tutorQuota = ? WHERE profile_id = ?', $vals);
	}
	
	public function share_ProductPayment($admin, $tutor, $client, $product_ID, $cat){
			
			/*Admin share*/
			$this->quota($admin, '0.5', 'purchase', $product_ID, $cat);
			/*Tutor share*/
			$this->quota($tutor, '0.3', 'purchase', $product_ID, $cat);

			/*Client share*/
			$this->quota($client, '0.2', 'purchase', $product_ID, $cat);

	}

	public function recordSharedContent($_id){
		$_id = str_replace(' ', '+', $_id);
    $id = $this->decryptor0($_id);

    $pubData = $this->select('publish', ' WHERE pub_id = ?', $id);
    $share = $pubData[0]['share'];
    $newshare = intval($share) + 1;
		$vals2 = $newshare.', '.$id;
    $this->updateStmt('publish', 'share = ? WHERE pub_id = ?', $vals2);
	}


	public function usercode($userDigit){
		$first = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
		$second = ['t', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k'];
		$userDigit = str_split($userDigit);
		$len = count($userDigit);

		$n = 0;
		$nlen = $len - 1;
		$output = array();

		while($n <= $nlen){
			 intval($userDigit[$n]) == 0 ? $_x = 10 : $_x = intval($userDigit[$n]);
			 $x = $_x - 1;

			($n+1) % 2 == 0 ? $userDigitCode = $second[$x] : $userDigitCode = $first[$x];
			$output[] = $userDigitCode; 
			
			$n++;
		}
		$output = implode('', $output);
		return $output;

	}
public function usercode2($userDigit){
		$first = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
		$second = ['k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];
		$userDigit = str_split($userDigit);
		$len = count($userDigit);

		$n = 0;
		$nlen = $len - 1;
		$output = array();

		while($n <= $nlen){
			 intval($userDigit[$n]) == 0 ? $_x = 10 : $_x = intval($userDigit[$n]);
			 $x = $_x - 1;

			 ($n+1) % 2 == 0 ? $userDigitCode = $second[$x] : $userDigitCode = $first[$x];
			 $output[] = $userDigitCode; 
			
			 $n++;
		}
		$output = implode('', $output);
		return $output;

	}
public function usercode3($userDigit){
		$first = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
		$second = ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		$userDigit = str_split($userDigit);
		$len = count($userDigit);

		$n = 0;
		$nlen = $len - 1;
		$output = array();

		while($n <= $nlen){
			 intval($userDigit[$n]) == 0 ? $_x = 10 : $_x = intval($userDigit[$n]);
			 $x = $_x - 1;

			 ($n+1) % 2 == 0 ? $userDigitCode = $second[$x] : $userDigitCode = $first[$x];
			 $output[] = $userDigitCode; 
			
			 $n++;
		}
		$output = implode('', $output);
		return $output;

	}
 public function coinBalance($me){
 	$cData = $this->select('coin', ' WHERE owner_id = ?', $me);
 	return $cData[0]['Gcoin'];
 }
	public function alphaA_Num($code){

		$alphas = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'k', 'l', 'm', 'n', 'o', 'p'];

		$digit = str_split($code);
		$len = count($digit);
		$n = 0;
		$nlen = $len - 1;
		$output = array();

		while($n <= $nlen){
			
      $position = array_search($digit[$n], $alphas, false);
			strlen($position) > 1 ? $output[] = substr($position, -1) : $output[] = $position;

		 $n++;	
		}		
				$output = implode('', $output);
$output = intval($output) * 1;
		return $output;
	}
	public function num_AlphaA($_digit){
    
		$first = ['j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a'];
		$second = ['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
		$third = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
		$fourth = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'];

		$fifth = ['U', 'V', 'W', 'X', 'Y', 'Z', 'k', 'l', 'm', 'n', 'o', 'p'];
		
		$digit = str_split($_digit);
		$len = count($digit);
		$len < 7 ? $digit = str_split('00000'.$_digit) : $digit = str_split($_digit);
		$len = count($digit);

		$n = 0;
		$nlen = $len - 1;
		$output = array();

		while($n <= $nlen){
			 $num =	rand(0, 5);

			 switch ($num) {
			 	case 1 :
			 		$option = $first;
			 		break;
			 	case 2 :
			 		$option = $second;
			 		break;
			 	case 3 :
			 		$option = $third;
			 		break;
			 	case 4 :
			 		$option = $fourth;
			 		break;
			 	
			 	default:
			 		$option = $fifth;
			 		break;
			 }

     	 $output[] = $option[intval($digit[$n])];
			
		 $n++;
		}

		$output = implode('', $output);
		return $output;

	}
	public function share_ClassPayment($admin, $tutor, $product_ID, $cat){
			
			/*Admin share*/
			$this->quota($admin, '0.3', 'class', $product_ID, $cat);
			/*Tutor share*/
			$this->quota($tutor, '0.7', 'class', $product_ID, $cat);

	}
	public function verifyFlutterwavePayment($txid){
         $secretKey = 'FLWSECK_TEST-ef7da8f15c6185ca459c42fefb4ea413-X';//'FLWSECK_TEST-1bec3883bd45619e18cefd2c58944be0-X';
        $url = 'https://api.flutterwave.com/v3/transactions/'.$txid.'/verify';
        $headers = [
            'Authorization: Bearer'.$secretKey,
            'Content-Type: application/json',
            ];
        $options = [
            'http' => [
		'method'=>'GET',
		'header'=>implode("\r\n", $headers)
            ]
	];

	$context = stream_context_create($options);
	$response = file_get_contents($url, false, $context);
	if($response === FALSE){
	  $result = 'false';//json_decode($response, false);
	  return $result;  
	  
	}else{
	  $result = json_decode($response, true);
	  return $result;  
	 /*if($result['status'] == 'success'){
	      $paymentStatus = $result['data']['status'];
	      $amount = $result['data']['amount'];
	      $currency = $result['data']['currency'];
	      echo 'Transaction verified: $paymentStatus | Amount: $amount $currency';
	   }else{
	      echo 'verification failed: '.$result['message'];
	   }*/
	}    
        
    }
    public function pay_now2($cat, $amount, $redirectURL, $payfor, $productID){
        $amount=50;
		$userData = $this->fetchUser();
	    $me = $userData[0]['profile_id'];
		$uniqid = $this->getUniqId($cat, $me);
		$email = $this->dec_cons($userData[0]['email']);
		$contact = $this->decryptor0($userData[0]['contact']);
		$fullname = $this->decryptor0($userData[0]['firstname']).'-'.$this->decryptor0($userData[0]['lastname']);
        //$this->inKam($amount, $me, $payfor, $productID);
       
       	echo "<script src='https://checkout.flutterwave.com/v3.js'></script>
					<script>


		function jspay(uniqid, amount, email, contact, fullname, redirectURL, paymentFor, productID){
	    	FlutterwaveCheckout({
	    		public_key: 'FLWPUBK_TEST-9361b6f6f68c22825a62da947fc20c1b-X',
	    		
				tx_ref: uniqid,
				amount: amount,
				currency: 'NGN',
				payment_options: 'card, ussd',
        		
        		callback: function(payment) {
                    verifyBackend(payment.id, amount, 'NGN');
                },
                onclose: function(incomplete) {
                    if (incomplete || window.verified === false) {
                      document.querySelector('#payment-failed').style.display = 'block';
                    } else {
                      if (window.verified == true) {
                            window.location = redirectURL;
                      } else {
                            
                      }
                   }
                },
            	meta: {
	    		    source: 'docs-inline-test',
					consumer_id: productID,
					consumer_mac: '',
				},
				customer: {
					email: email,
					phone_number: contact,
					name: fullname,
				},
				customizations: {
					title: 'Glit solution script',
					description: paymentFor,
					logo: 'img/glit192.png'
				},
				    
            });
        
        }

      function verifyBackend(transactionId, amount, currency) {
        $.ajax({
            url: '../includes/verifyPayment.inc.php',
            method: 'post',
            data: {tid:transactionId, amount:amount, currency:currency},
            dataType: 'json',
            contentType: false,
            cache: false,
            processData: false,
            success: function(data){
                setTimeout(function() {
                  window.verified = true;
                }, 200);
            },
            error: function(data){
                setTimeout(function() {
                  window.verified = false;
                }, 200);
            }
        });
        
      }
    </script>";
    
    //header('Location: index.php?page=paynow&amount='.$amount.'&pid='.$productID);
    }
  
/*   public function payCoin($cat, $amount, $redirectURL, $payfor, $productID){
    //$amount=50;
		$userData = $this->fetchUser();
	    $me = $userData[0]['profile_id'];
		$uniqid = $this->getUniqId($cat, $me);
		$email = $this->dec_cons($userData[0]['email']);
		$contact = $this->decryptor0($userData[0]['contact']);
		$fullname = $this->decryptor0($userData[0]['firstname']).'-'.$this->decryptor0($userData[0]['lastname']);
//$this->inKam($amount, $me, $payfor, $productID);
//header('Location: return');
//FLWPUBK_TEST-276b68eb43ad340bb5d4a563481ae18c-X',
						
		echo "<script src='https://checkout.flutterwave.com/v3.js'></script>
					<script>


				function jspay(uniqid, amount, email, contact, fullname, redirectURL, paymentFor, productID){
					FlutterwaveCheckout({
						public_key: 'FLWPUBK_TEST-276b68eb43ad340bb5d4a563481ae18c-X',
						tx_ref: uniqid,
						amount: amount,
						currency: 'NGN',
						payment_options: 'card, ussd',
						redirect_url: redirectURL,
						
						meta: {
	    			 		consumer_id: productID,
							consumer_mac: '',
						},
						customer: {
						email: email,
						phone_number: contact,
						name: fullname,
						},
						customizations: {
						title: 'Glit solution script',
						description: paymentFor,
						logo: 'img/glit192.png',

						},
                        onclose: function() {
                          console.log('Payment cancelled!');
                        },

					});
				}
				
   
                jspay(\"$uniqid\", \"$amount\", \"$email\", \"$contact\", \"$fullname\", \"$redirectURL\", \"$payfor\", \"$productID\");
			</script>";
		$amount > 0 ?	jspay(\"$uniqid\", \"$amount\", \"$email\", \"$contact\", \"$fullname\", \"$redirectURL\", \"$payfor\", \"$productID\") : window.location.href= $redirectURL;

	}
*/
    public function flutterPay($amount, $redirectURL){
		$userData = $this->fetchUser();
	    $me = $userData[0]['profile_id'];
	    $cat = '0';
		$uniqid = $this->getUniqId($cat, $me);
		$email = $this->dec_cons($userData[0]['email']);
		$contact = $this->decryptor0($userData[0]['contact']);
		$fullname = $this->decryptor0($userData[0]['firstname']).'-'.$this->decryptor0($userData[0]['lastname']);

		echo "<script src='https://checkout.flutterwave.com/v3.js'></script>
					<script>


				function jspay(uniqid, amount, email, contact, fullname, redirectURL){
					FlutterwaveCheckout({
						public_key: 'FLWPUBK_TEST-276b68eb43ad340bb5d4a563481ae18c-X',
						tx_ref: uniqid,
						amount: amount,
						currency: 'NGN',
						payment_options: 'card, ussd',
						redirect_url: redirectURL,
						
						meta: {
	    			 		consumer_id: '',
							consumer_mac: '',
						},
						customer: {
						email: email,
						phone_number: contact,
						name: fullname,
						},
						customizations: {
						title: 'Glit solution script',
						description: 'coin',
						logo: 'img/glit192.png',

						},
                        onclose: function() {
                          console.log('Payment cancelled!');
                        },

					});
				}
				

                jspay(\"$uniqid\", \"$amount\", \"$email\", \"$contact\", \"$fullname\", \"$redirectURL\");
			</script>";
	}


   /* public function pay_nowWorking($cat, $amount, $redirectURL, $payfor, $productID){
    $amount=50;
		$userData = $this->fetchUser();
	    $me = $userData[0]['profile_id'];
		$uniqid = $this->getUniqId($cat, $me);
		$email = $this->dec_cons($userData[0]['email']);
		$contact = $this->decryptor0($userData[0]['contact']);
		$fullname = $this->decryptor0($userData[0]['firstname']).'-'.$this->decryptor0($userData[0]['lastname']);
       //$this->inKam($amount, $me, $payfor, $productID);
//header('Location: return');
		echo "<script src='https://checkout.flutterwave.com/v3.js'></script>
					<script>


				function jspay(uniqid, amount, email, contact, fullname, redirectURL, paymentFor, productID){
					FlutterwaveCheckout({
						public_key: 'FLWPUBK_TEST-9361b6f6f68c22825a62da947fc20c1b-X',
						tx_ref: uniqid,
						amount: amount,
						currency: 'NGN',
						payment_options: 'card, ussd',
						redirect_url: redirectURL,
						
						meta: {
	    			 		consumer_id: productID,
							consumer_mac: '',
						},
						customer: {
						email: email,
						phone_number: contact,
						name: fullname,
						},
						customizations: {
						title: 'Glit solution script',
						description: paymentFor,
						logo: 'img/glit192.png',

						},
                        onclose: function() {
                          console.log('Payment cancelled!');
                        },

					});
				}
				
				
 
  
                jspay(\"$uniqid\", \"$amount\", \"$email\", \"$contact\", \"$fullname\", \"$redirectURL\", \"$payfor\", \"$productID\");
			</script>";
	
	}
*/	public function share_SubPayment($admin, $tutor, $client, $cat_id){
		//quota(recipient, share, type, prodID, cat)
		//WORK ON PRICE OF PRODUCT BUY & SUBSCRIPTION 2ru aoi table through share_SubPayment($cat_id) & share_ProductPayment($product_ID)
			//	public function quota($recipient, $divFactor, $trnx, $ProdID, $cat_id)

			/*Admin share*/

			$this->quota($admin, '0.7', 'sub', '', $cat_id);

			/*$Tutor share*/
			$this->quota($tutor, '0.2', 'sub', '', $cat_id);

			/*Client share*/
			$this->quota($client, '0.1', 'sub', '', $cat_id);
	
	}
    public function buyCoin($price){

		$payfor = 'Glitcoin';
		$cat = '0';
		$coins = intval($price)/1000;
		$now = time();
		$userData = $this->fetchUser();
		$buyer = $userData[0]['profile_id'];
		$_link = $buyer.'_'.$coins.'_'.$now;
		$link = $this->enc_cons($_link);
		$redirectURL = '../index.php?page=confirmcoinbuy&link='.$link;
		$product_ID = '';
//		$this->pay_now($cat, $price, $redirectURL, $payfor, $product_ID);
		$this->flutterPay($price, $redirectURL);

    }
    
    public function depositCoin($coins, $buyer){
        $coinBalData = $this->select('coin', ' WHERE owner_id = ?', $buyer);
        $coinBal = $coinBalData[0]['Gcoin'];
        $totalCoin = intval($coinBal) + intval($coins);
        
        $vals = $totalCoin.', '.$buyer;
        $this->updateStmt('coin', 'Gcoin = ? WHERE owner_id = ?', $vals);
        return $totalCoin;
    }
    
	public function buyProduct($product_ID){
		//include('includes/autoloader.inc.php');
		$publicKey = $this::PUBLIC_KEY;
		$secretKey = $this::SECRET_KEY;

		$myData = $this->fetchUser();
		$_buyer = $myData[0]['profile_id'];
		$buyer = $this->num_AlphaA($_buyer);		
		//$buyer = str_replace('==', '', $buy_er);
		
		//get the sharedKey
		$_product_ID = str_replace(' ', '+', $product_ID);

		$productData = $this->select2('sharedkey', ' WHERE ucid = ?', $_product_ID);
		$_key = $productData[0]['sk'];
		$key = str_replace(' ', '+', $_key);

    	//get the product name
		$productData2 = $this->select('publish', ' WHERE published = ?', $_product_ID);
	  	$productName = $productData2[0]['heading'];
		$price = $productData2[0]['price'];
		$cat_id = $productData2[0]['topic_id'];
		
		$vals = $buyer.', '.$product_ID.', '.$_product_ID.', '.$price.', '.$cat_id;

		$vals_enc = $this->enc_cons($vals);
		$redirectURL = 'index.php?page=paid&link='.$vals;
		header('Location: '.$redirectURL);//_Link);
		
		$payfor = $productName;
//		$this->pay_now($cat, $price, $redirectURL, $payfor, $product_ID);
        $trxnType = 'coin4value';

        $this->coin_TRNX($price, $trxnType, $_buyer, $redirectURL);

		//$userPay->pay($price, $email, $redirect_Link);
	}


	public function checkPurchase($product_ID){
			//is it bought already???
		$myData = $this->fetchUser();
		$_me = $myData[0]['profile_id'];
		$me = '%.'.$this->usercode($_me).'.%';
		$vals = $product_ID.', '.$me;
		$purchaseData = $this->select('purchase', ' WHERE product_id = ? AND buyer LIKE ?', $vals);
		//if bought already, pass else buy
		//count($purchaseData) > 0 ? $key = $purchaseData[0]['productKey'] : $this->buyProduct($product_ID);
		count($purchaseData) == 0 ? $this->buyProduct($product_ID) : $key = $purchaseData[0]['productKey'];
		$_SESSION['product_keyx'] = $key;
	}
	
	public function check_PurchasedSessions($catid_enc){
		$userData = $this->fetchUser();
		$_paidSession = $userData[0]['purchasedSession'];
		!empty($_paidSession) ? $paid_Session = $this->dec_cons($_paidSession) : $paid_Session = 0;
		$paidSession = intval($paid_Session);

		$totalPaidSession = $paidSession + 1;
		$totalPaidSession_enc = $this->enc_cons($totalPaidSession);
		
		//set approval for purchase action 
		$_SESSION['approve_purchase'] = true;
		$pid = $this->enc_cons( $userData[0]['profile_id'] );
		$redirectURL = 'index.php?page=paid&tsess='.$totalPaidSession_enc.'&id='.$pid.'&cat='.$catid_enc;
		
		$catid = $this->dec_cons($catid_enc);
		$aoiData = $this->fetchaoi($catid);
		$price = $aoiData[0]['charges'];

		$payfor = 'session';
		$product_ID = 'SESS_'.time().'_'.$catid;
//		$paidSession > 0 ? '' : $this->pay_now($catid, $price, $redirectURL, $payfor, $product_ID);
		$paidSession > 0 ? '' : $this->flutterPay($price, $redirectURL);

		//$paidSession > 0 ? '' : header('Location: '.$redirectURL);
		
	}
 	public function removeExpiredSub($checkMarkDues, $aoid, $checkDate, $me){
		$subscription = '-.'.$aoid.'./'.$checkDate;

		$newCheckMark = str_replace($subscription, '', $checkMarkDues);
		!empty($newCheckMark) ? $_newCheckMark = $this->enc_cons($newCheckMark) : $_newCheckMark = '';
		
		$vals = $_newCheckMark.', '.$me;
		strlen($checkMarkDues) > strlen($newCheckMark) ? $this->updateStmt('profile', 'checkMark_dues = ? WHERE profile_id = ?', $vals) : '';
	}

 	public function subscribe($category, $dur){

    $_cat_arr = explode('_', $category);
    $cat_arr = array_slice($_cat_arr, 1, -1, true);
		$nCat = count($cat_arr);
		$_cat = implode('.', $cat_arr);
		$cat = '.'.$_cat.'.';

		$thirtyDays = 20;// * 24 * 60 * 60;
		$twoMonths = 2 * $thirtyDays;
		$sixMonths = 6 * $thirtyDays;
	
		switch (true) {
			case $dur == 1:
				$dueDate = time() + $thirtyDays;
				$charges = 1000 * $nCat;
				$sess = 0;

				break;

			case $dur == 2:
				$dueDate = time() + $thirtyDays;
				$charges = 3000 * $nCat;
				$sess = 1*$nCat;

				break;

			case $dur == 3:
				$dueDate = time() + $thirtyDays;
				$sess = 3*$nCat;
				$charges = 5000 * $nCat;
				
				break;		

			default:
				$dueDate = time();
				$charges = 0;
				$sess = 0;

				break;
		}

		$myData = $this->fetchUser();
		$email = $myData[0]['email'];
		
		$dueDateSchedule = '-'.$cat.'/'.$dueDate;
		$checkMarkDues = $myData[0]['checkMark_dues'];
		$checkMarkDues_dec = $this->dec_cons($checkMarkDues);

		$newCheckMarkDues = $checkMarkDues_dec.$dueDateSchedule;
		$newCheckMarkDues_enc = $this->enc_cons($newCheckMarkDues);

		$data = $this->fetchUser();
		$me = $data[0]['profile_id'];
		$purchasedSession = $data[0]['purchasedSession'];
		$purchasedSession_dec = $this->dec_cons($purchasedSession);
		$newTotalSession = intval($purchasedSession_dec) + $sess;
		$newTotalSession_enc = $this->enc_cons($newTotalSession);

		//$_dueDate = date('Y-m-d H:i:s', $dueDate);

		$vals = $newTotalSession_enc.', '.$newCheckMarkDues_enc.', '.$me;
		$vals_enc = $this->enc_cons($vals);
		$cat = str_replace('.', '_', $cat);
		$cat_enc = $this->enc_cons($cat);
		$redirectURL = 'index.php?page=subscribed&link='.$vals_enc.'&sublink='.$cat_enc;
		$publicKey = 'r33234';
		$secretKey = '6465';

	//	header('Location: '.$redirect_Link);
		$valueOffered = 'sub';
		$product_ID = ''; 
	    //$this->pay_now($cat, $charges, $redirectURL, $valueOffered, $product_ID);
		return $cat.', '.$charges.', '.$redirectURL.', '.$valueOffered.', '.$product_ID;
	}

  public function checkSubscription( $cat, $product_ID ){
   		$myData = $this->fetchUser(); $me = $myData[0]['profile_id'];
   		$checkMarkDues = $myData[0]['checkMark_dues'];
   		!empty($checkMarkDues) ? $checkMarkDues_dec = $this->dec_cons($checkMarkDues) : header('Location: sub');

   		$checkMarkDues_arr = explode('-', $checkMarkDues_dec);
   		//$checkMarkDues_arr = array_slice($checkMarkDues_arr, 1);
   		$terminateSub = array();
   		
   		$go_on = array();
   		$updatedCheckMark = array();

   		foreach ($checkMarkDues_arr as $eachDueDate) {
   			if(strlen($eachDueDate) > 14){
		   			$dueStr = explode('/', $eachDueDate);
		   			$_dueDate = $dueStr[1];
		   			$dueDate = intval($_dueDate);
		   		
		   			$now = time();
		   			$checkMarks = '.'.$dueStr[0];
		   			$_cat = '.'.$cat.'.';
					  
						stripos($checkMarks, $_cat) && $now <= $dueDate ? $go_on[] = '1' : $go_on[] = '0';

				 		//remove outdated sub frm database
						stripos($checkMarks, $_cat) && $now > $dueDate ? '' : $updatedCheckMark[] = $eachDueDate;
			  }
	 	  }
	  $_updatedCheckMark = '-'.implode('-', $updatedCheckMark);
		strlen($_updatedCheckMark) > 0 ? $_updatedCheckMark_enc = $this->enc_cons('-'.$_updatedCheckMark) : $_updatedCheckMark_enc = '';
		$vals_enc = $_updatedCheckMark_enc.', '.$me;

		$this->updateStmt('profile', 'checkMark_dues = ? WHERE profile_id = ?', $vals_enc);
		$status = '.'.implode('.', $go_on);
			stripos($status, '1') ? '' : $this->checkPurchase($product_ID);
		
	}

  public function encryptorReg($data, $key){
		return $this->encReg($data, $key);
	}
	public function decryptorReg($data, $key){
		return $this->decReg($data, $key);
	}

   	public function addToEnc0($tableName, $columnIndicator, $columnIndicatorVal, $columnToSelect, $addMode, $valToAdd){
		
		$rowData = $this->selectStmt($tableName, ' WHERE '.$columnIndicator.'=?', $columnIndicatorVal);
		if(count($rowData) !=0 ){
			$columnData = $rowData[0][$columnToSelect];
			$columnData_dec0 = $this->decryptor0($columnData);
			$addMode == '+' ? $new_columnData = intval($columnData_dec0) + intval($valToAdd) : $new_columnData = $columnData_dec0 . $valToAdd;

			$new_columnData_enc0 = $this->encryptor0($new_columnData);
			$newData = $new_columnData_enc0.', '.$columnIndicatorVal;
		
			return $this->updateStmt($tableName, $columnToSelect.'=? WHERE '.$columnIndicator.'=?', $newData);
		}else{
			$new_columnData_enc0 = $this->encryptor0($valToAdd);
			$data = array($columnIndicator=>$columnIndicatorVal, $columnToSelect=>$new_columnData_enc0);
			return $this->insert2Db($tableName, $data);
		}
	}

    public function slice_enc0($data){
       	$slice = substr($data, 20, -14);
      return $slice;
    }
    public function decryptor0($data){
	  if(!empty($data)){
	  	$data = str_replace(' ', '+', $data);
	  	$slice = $this->slice_enc0($data);
		return $this->decr0($slice);
	  }
	}
	public function encryptor0($data){
		//works not for zero
		if(!empty($data)){
		$encryptd2 = $this->encryptor2($data);
		$halfA = substr($encryptd2, 0, 20);
		$halfB = substr($encryptd2, -14);
		$final = $halfA.substr($this->encr0($data), 0, 22).$halfB;
		return $final;
	   }
	}
  public function enc_cons($data){
  	//non-changing code encryption. works for zero
		return $this->encr0($data);
	}
	
  public function dec_cons($data){
  	$data = str_replace(' ', '+', $data);
  	//non-changing code decryption
		return $this->decr0($data);
	}
	
	public function genPubKey($pw_enc_privKey, $enc_pwd, $qprime, $alpha){
		return $this->gen_pub($pw_enc_privKey, $enc_pwd, $qprime, $alpha);
	}

	public function genSharedKey($priv_1, $enc_pwd, $pub_2, $qprime){
		return $this->gen_shared($priv_1, $enc_pwd, $pub_2, $qprime);
	}

	public function decryptor2x($data, $key){
		//testing only//
	 if(!empty($data)){
		return $this->decr2($data, $key);
	 }
	}
	public function encryptor2x($data, $key){
		//testing only
	 if(!empty($data)){
			return $this->encr2($data, $key);
	  }
  }
	
	public function decryptor2($data){
	 if(!empty($data)){
    	$key = $this->key();
			return $this->decr2($data, $key);
	 	}
	}
	public function encryptor2($data){
	 if(!empty($data)){
    	$key = $this->key();
			$data = $this->sanitise($data);
			return $this->encr2($data, $key);
	  }
  }
	
	public function decryptor3($data){
		$key = $this->key();
		return $this->decr3($data, $key);
	}
	public function encryptor3($data){
		$key = $this->key();
		$data = $this->sanitise($data);
		return $this->encr3($data, $key);
	}
	public function to_appoStr($date){
		date_default_timezone_set('Africa/Lagos');
		$date==''? $date = time() : $date;
		$day = date('w', $date)+1;
		$time = date('H', $date);
		$timeStr = $day.$time;
		return $timeStr;

		//$timestamp = date('Y-m-d H:i:s', time());
	}
	public function mobile4mat($prefix, $contact, $uniqDigit){
		 $neg_uniqDigit = -1 * $uniqDigit;
		 $mobile = $prefix.substr($contact, $neg_uniqDigit);
 		return $mobile;
	}
	public function getSignupCode($user_phoneNum){
	    $code=rand(10000, 99999);
	    $enc0_code = $this->encryptor0($code);
	    $user_Mobile=$this->mobile4mat('234', $user_phoneNum, 10);
	    $enc0_userMobile = $this->encryptor0($user_Mobile);
	    $reply = '';

	    if(!empty($user_Mobile)){

	      $streamlined_enc0_userMobile = $this->slice_enc0($enc0_userMobile);
	      $_streamlined_enc0_userMobile = '%'.$streamlined_enc0_userMobile.'%';

	      $userData = $this->select('profile', ' WHERE contact LIKE ?', $_streamlined_enc0_userMobile);

	      if(count($userData) == 0 || ( count($userData) > 0 && empty($userData[0]['firstname']) && empty($userData[0]['lastname']) ) ){
	        $userInfo = $this->select('rac', ' WHERE contact LIKE ?', $_streamlined_enc0_userMobile);

	        if(count($userInfo) == 0){
	            $data=array('contact'=>$enc0_userMobile, 'code'=>$enc0_code);
	            $this->insert2Db('rac', $data);
	          }else{
	            $code_n_mobile = $enc0_code.', '.$_streamlined_enc0_userMobile;
	            $this->updateStmt('rac', 'code = ? WHERE contact LIKE ?', $code_n_mobile);

	          }
	          
	          $reply .= "1";
	        }else{$reply.="3";}
	    }else{$reply .="4";}
	          return array($reply, $user_phoneNum, $code);
	}

	public function createNewUserAccount($username, $pwd, $email, $firstname, $surname, $public_key, $private_key, $enc_pwd){
		$userData = $this->fetchUser();
		$uid = $userData[0]['profile_id'];
		$fn = $this->encryptor0($firstname);
		$sn = $this->encryptor0($surname);
		$email = $this->enc_cons($email);

		//check if the key exists already
		$checker = $this->selectStmt2('prevkey', ' WHERE uid = ?', $uid);

	    if(count($checker) > 0){
	    	$this->deleteStmt2('prevkey', ' WHERE uid = ?', $uid);
	    }
		    //save dis privK for future need
	    	$vals = array('prevPK'=>$private_key, 'uid'=>$uid);
	    	$this->insert2SHK('prevkey', $vals);
	    
		$uname = $this->encryptor0($username);
	    $pw=password_hash($pwd, PASSWORD_DEFAULT);

		$data = $fn.", ".$sn.", ".$email.", 1, ".$uid;
		$this->updateStmt('profile', 'firstname=?, lastname=?, email=?, regCompleted=? WHERE profile_id=?', $data);

		$data2 = $uname.", ".$pw.", ".$uid.", ".$public_key.", ".$uid;
		$this->updateStmt('skyman_user', 'username=?, password=?, profile_id=?, pub=? WHERE user_id=?', $data2);

		//create a new coin row for New user
     	$values = array('Gcoin'=>'0', 'owner_id'=>$uid);
			$this->insert2Db('coin', $values);

		return "Successful";
	}

	public function imgProcessor($file_name, $file_tmp_name, $destination_URL){
		$maxDimW= 1000;
		$maxDimH=800;
  			$check=getimagesize($file_tmp_name);
			  $imageFileType = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
     	  $reqResp="";
     	   if($check!== false){
        // Allow certain file formats
	            if($imageFileType == "jpg" || $imageFileType == "png"  || $imageFileType == "webp" || $imageFileType == "jpeg" || $imageFileType == "gif" ){
     	  
	            	  $target = $destination_URL.'/'.$file_name;
	     
	                if (move_uploaded_file($file_tmp_name, $target)){

	                  return true;
	                }else{return false;}
	            }
	            else{
	               $reqResp.="<strong>Only PDF, DOC, JPG, PNG & JPEG files are allowed!</strong>";
	            }
	        }
	        else{
	              $reqResp.="<strong>Sorry, file size too large!</strong>";
            }
	}   	
   	
  public function generate_spec($pid, $vericheck_application_categories){
   		!empty($pid) ? $pData = $this->select('profile', ' WHERE profile_id = ?', $pid) : '';
		!empty($pid) ? $aoi = $pData[0]['aoi'] : $aoi = $vericheck_application_categories;

	if(!empty($aoi)){

		$_aoi_arr = explode('_', $aoi);
		$aoi_arr = array_slice($_aoi_arr, 1, -1, true);
		$all_specs = array();
		foreach($aoi_arr as $spec){
			if($spec !=''){
				$aoi_data = $this->select('aoi', ' WHERE aoi_id = ?', $spec);

				$thisSpec = ucfirst($aoi_data[0]['subcategory']);
				array_push($all_specs, $thisSpec);
			}
		}

		return $all_specs;
		}else{
		
			return '';
		}
 	}

	public function applyForVerificationMark($category, $cert_tmp_name){

		$userData = $this->fetchUser();
		$applicant = $userData[0]['profile_id'];

		$cert_name = $applicant.'C'.time().'.webp';
		$destination_URL = '../admin/img/vericheckCert';

		$this->imgProcessor($cert_name, $cert_tmp_name, $destination_URL);

		$appData = array("cert"=>$cert_name, "applicant"=>$applicant, "category"=>$category);
		$this->insert2Db('application', $appData);

		$valsz = 'applying, '.$applicant;
		$this->updateStmt('profile', 'professional_cert = ? WHERE profile_id = ?', $valsz);
	}

	public function sanitise($input){
		$data = trim($input);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		$data = strip_tags($data);
	    $data = filter_var($data, FILTER_SANITIZE_STRIPPED);
//	    $data = str_replace(',', '..', $data);
	    $data = str_replace("'", "\'", $data);

		return $data;
	}

	public function paragrafin($input){
	    $data = str_replace('  ', '\n', $input);
		return $data;
	}

	public function comma($data){
		$data = str_replace('..', ',', $data);

		return $data;
	}
	
	
   	public function logout(){
		$home_url='index';		
		//$home_url= 'index.php?page=login&impostor=TRUE';

		if(isset($_SESSION['user_id'])){
			$userData = $this->fetchUser();
			$user = $userData[0]['profile_id'];

		  $vals = " , 0, 0, " . $user;
		  $this->updateStmt('skyman_user', 'session = ?, online = ?, eternity = ? WHERE user_id = ?', $vals);

		    $_SESSION=array();
		    if(isset($_COOKIE[session_name()])){
			    setcookie(session_name(),'', time()-3600);
				
				session_destroy();
				
		    }
		}
		   //add dis
	//	   unset($_COOKIE['hello']); setcookie("hello", "", time() - 300,"/");
		   
		if(isset($_COOKIE['id']) && isset($_COOKIE['sess'])){
		    setcookie('id', '', time() - 60*60*24*30, '/');
		    setcookie('sess', '', time() - 60*60*24*30, '/');
		    header('Location: ' .$home_url);
		    die();
		}
		if(isset($_COOKIE['uid']) && isset($_COOKIE['eternity'])){
		    setcookie('uid', '', time() - 60*60*24*30, '/');
		    setcookie('eternity', '', time() - 60*60*24*30, '/');
		    header('Location: ' .$home_url);
		    die();
		}
		header('Location: ' .$home_url);
   	}

   	public function session(){
   		$userData = $this->fetchUser();
		$user_id = $userData[0]['profile_id'];
		isset($_SESSION['user_id']) ? $vals=  $user_id . ', 1' : $vals='0, 1';
		
		$keepLoggedIn = $this->select('skyman_user', ' WHERE user_id = ? AND eternity = ?', $vals);
		
		if(count($keepLoggedIn)==0){
		
		    if(isset($_SESSION['timeout'])){
		        $diff=time()-$_SESSION['timeout'];
			     $session_duration = 60*30;
		        if($diff > $session_duration){//960
					session_destroy();
		    	    //header("location:./");
		    	    header("location:../index.php");
		        	exit();
		        }
		     }
		}
		$_SESSION['timeout']=time();

   	}

   
 	public function addScript( $src ){
		$this->scriptElements .= "<script src='$src'></script>";
	}
	public function addCSS( $href ){
		$this->css .= "<link href='$href' rel='stylesheet'/>";
	}

	
	public function getIP(){
		if(!empty($_SERVER['HTTP_CLIENT_IP'])){
			$ip=$_SERVER['HTTP_CLIENT_IP'];
		}
		elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
			$ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
		}
		else{
			$ip=$_SERVER['REMOTE_ADDR'];
		}
		return $ip;
	}
	
	public function cutSpecialChars($word){
		$word = str_replace('+', '', $word);
    $word = str_replace('/', '', $word);
    $word = str_replace('-', '', $word);
    $word = str_replace('_', '', $word);
    $word = str_replace('=', '', $word);
    $word = str_replace(':', '', $word);
    $word = str_replace('\'', '', $word);
	return $word;
	}
	public function harvesineF($lat1, $lng1, $lat2, $lng2) {
		return $this->harvesine($lat1, $lng1, $lat2, $lng2);
	}

	public function settingsPage(){
		$rows= $this->fetchUser();

		$pag = include('views/settings-fm');
		return $pag;
	}

	/*below is solely for interactive button updates*/

	public function select($a, $b, $c) {
		$result = $this->selectStmt($a, $b, $c);
		return $result;
	}

	public function select2($a, $b, $c) {
		return $this->selectStmt2($a, $b, $c);
	}
	public function select3($a, $b, $c) {
		return $this->selectStmt3($a, $b, $c);
	}

	public function fetchUser() {
		return $this->userId();
	}
	public function fetchProfile($where) {
		return $this->userProfile($where);
	}
	public function fetchaoi($where){
		$data = $this->select('aoi', ' WHERE aoi_id = ?', $where);
		return $data;
	}
	public function fetchProfiles($where, $whereVal) {
		return $this->userProfiles($where, $whereVal);
	}

	public function timeline($table, $userColumnName, $dateColumnName){
		$userData = $this->fetchUser();
		$user_id = $userData[0]['profile_id'];

		$rqst_Data = $this->selectStmt($table, ' WHERE '.$userColumnName.' = ? ORDER BY '.$dateColumnName.' DESC', $user_id);
		return $rqst_Data;
	}
	public function numOfYears($time){
		$time_ago=strtotime($time);
    $current_time=time();
    $time_diff=$current_time-($time_ago+32450);
    $days=($time_diff-10368000)/86400;
    $years=round($days/365.25);
    	return $years;
	}

    public function estDate($projectStartDate, $vidDate){
		$startDateArr = explode(' ', $projectStartDate);
		$startDayBegins = $startDateArr[0].' 00:00:00';
		$startDayBegins_strTotime = strtotime($startDayBegins);
		$vidDate_strTotime = strtotime($vidDate);
		$_24Hrs = 86400;
		$dateDiff = intval($vidDate_strTotime) - intval($startDayBegins_strTotime);
//		$daysTotal = intval($dateDiff/$_24Hrs);
		($dateDiff/$_24Hrs) - intval($dateDiff/$_24Hrs) > 0 ? $daysTotal = intval($dateDiff/$_24Hrs) + 1 : $daysTotal = intval($dateDiff/$_24Hrs);
		$daysTotal < 10 ? $daysTotal = '0'.$daysTotal : $daysTotal;
		$daysInStr =  'DAY '.$daysTotal;//.' | '.$vidDate; 
		return $daysInStr;//$daysInStr.date('M d, Y', $vidDate);//.'=='.$vidDate.'///'.$startDayBegins;
    }
	
	public function time($timestamp){
		date_default_timezone_set('Africa/Lagos');
 		$_date = strtotime($timestamp); 
		$date = date('H:i', $_date);

  	    return $date;
	}

	
	public function time2($timestamp){
	  		date_default_timezone_set('Africa/Lagos');
			/*			/*$Dir == 'agro_chats' ? $cat = 'agro' : ($chatDir == 'health_chats' ? $cat = 'health' : $cat = 'guidance');*/
			//$timestamp = date('Y-m-d H:i:s', time());
			//$timestamp = date('H:i', $_timestamp);


	  	$time_ago=strtotime($timestamp);
  		$current_time=time();
		$time_diff=$current_time-($time_ago);
  		$time = "<label style='color:#444; font-size:12px; font-style:italic;'> ~".$this->getTimeDiff($time_diff)."</label>";

}

public function updateView(){
    $userData = $this->fetchUser();
    $me = $userData[0]['profile_id'];
    $x = rand(1, 9);
    $vals = $x.', '.$me;
    $this->updateStmt('profile', 'view = ? WHERE profile_id = ?', $vals);
} 
public function getTimeDiff($time_diff){
  		$seconds=intval($time_diff);
  		$minutes=round($seconds/60);
			$hours=round($seconds/3600);
			$days=round($seconds/86400);
			$weeks=round($seconds/604800);
			$months=round($seconds/2629440);
			$years=round($seconds/31553280);
		  
		  $r ="";
		  if($seconds<=2){
		  	$r .= $seconds;//"Just now";
		  }
		  elseif($seconds>2 && $seconds<=59){
		  	$r .= $seconds."secs";
		  }
		  elseif($seconds>=60 && $seconds<120){
//		  elseif($minutes<=59){
  			$r .= "1min";
   			}
   			elseif($seconds>120 && $seconds<3600){
   				$r .= $minutes."mins";	
   			}
  		  elseif($seconds>=3600 && $seconds<7200){
    			$r .= "1hr";
   			}
          elseif($seconds>=7200 && $seconds <86400){$r .= $hours."hrs";
      		}

  		  elseif($seconds >= 86400 && $seconds<172800){
    			$r .= $days."days";//"yesterday";
    		}
     	  elseif($seconds >= 172800 && $seconds < 604800) {
/*   				$datetime = date('D', $time_ago);
   				$r .= $datetime;*/
   			$r .= $days."days";

   		  }
  		  elseif($seconds > 604800 && $seconds < 1190000){
  				$r .= "1wk";
//     				$datetime = date('D', $time_ago);
  // 				$r .= $datetime;
 		  	//$r .= date('M d', $time_ago);

  		  }
  		  elseif($seconds >= 1190000 && $seconds < 2419200){
  				$r .= $weeks."wks";
   		  	//$r .= date('M d', $time_ago);

  		  }
  		  elseif($seconds >= 2419200 && $seconds < 31553280){//  				$r .= date('M d', $time_ago);
			$r .= $months."mons";
   		  
  		  }
  		  elseif($seconds > 31553280){
    			$r .= $years.'Yrs';

  	      }
  	      /*elseif($seconds > 31553280){
    			$r .= date('M, Y', $time_ago);
  	      }*/
  	      return $r;
	}

public function timeBanner($timestamp){
	  		date_default_timezone_set('Africa/Lagos');

	  	$time_ago=strtotime($timestamp);
  		$current_time=time();
  
			$time_diff=$current_time-($time_ago);
  		$seconds=intval($time_diff);
  		$minutes=round($seconds/60);
			$hours=round($seconds/3600);
			$days=round($seconds/86400);
			$weeks=round($seconds/604800);
			$months=round($seconds/2629440);
			$years=round($seconds/31553280);
		  
		  $r ="";
			if($seconds < 86400){
    			$r .= "Today";
    		}
  		elseif($seconds >= 86400 && $seconds<172800){
    			$r .= "Yesterday";
    		}
   		elseif($seconds >= 172800 && $seconds < 604800) {
   				$datetime = date('D', $time_ago);
   				$r .= $datetime;

   		  }
  		  elseif($seconds > 604800 && $seconds < 1190000){
 		  	$r .= date('M d, Y', $time_ago);

  		  }
  		  elseif($seconds >= 1190000 && $seconds < 2419200){
  				//$r .= $weeks." weeks";
   		  	$r .= date('M d, Y', $time_ago);

  		  }
  		  elseif($seconds >= 2419200 && $seconds < 31553280){// && $seconds <31449600){
   				$r .= date('M d, Y', $time_ago);

  		  }
  		  elseif($seconds > 31553280){
    			$r .= date('M d, Y', $time_ago);
  	      }
  	      return $r;
	}
	
/*	public function profile_page(){
		$Rquests=$this->timeline('feed', 'tuser_id', 'd_date');
		$Rpts=$this->timeline('lst_item', 'user_id', 'reporting_date');
		$Rtns=$this->timeline('found_asset', 'user_id', 'reporting_date');
		$DonList=$this->timeline('donlist', 'user_id', 'feed_date');
	
		$row = $this->fetchUser();
		$profilePage=include('views/profile.php');
		return $profilePage;	
	}*/

	public function btnUpd($don_id){
		$row = $this->select('feed', ' WHERE feed_id = ?', $don_id);
		$emp = $row[0]['empathy']; 
		$ban = $row[0]['nonreal']; 
		$fid = $row[0]['feed_id'];
        return json_encode(array("upd_emp" => $emp, "upd_ban" =>$ban, "id"=>$fid));
	}

	public function showModal2($modalContent, $selector, $contentType, $display){
   		$contentType == 'file' ? $modalContent = include($modalContent) : $modalContent;

		$modal="<div id='".$selector."' class='".$selector."' style='display:".$display."; position: fixed; z-index: 22; left: 0; top: 0; width: 100%; height: 200vh; overflow: auto; background: rgba(0,0,0,0.6);'>
				<div style='display:flex; justify-content:center; align-items:center; text-align:center; overflow:auto;'>
			
					<div style='background:white; height:auto; border-radius:10px; position: fixed; left: auto; top: 6%; z-index:1; padding:5px 10px 5px 10px; overflow:auto;'>
						<div class='' onclick=$('#".$selector."').fadeOut(-500) style='text-align:right;'>
            	          <span class='close md'><strong>&times</strong></span>
                	    </div>
            	        <div style='padding: 20px; text-align:center; overflow:auto;'>";
		$modal.= $modalContent;
		$modal.="		</div>
					</div></div>
				</div>";
 		return $modal;
	}

	public function myChatHistory(){
		//resumingCID is made empty for history fetch
		$data = $this->fetchUser();
		$me = $data[0]['profile_id'];
        $_SESSION['SET_CHAT'] = TRUE;
        $_POST['category'] = '1';

		$all = $this->fetchChats($me, 1, true, '', false);
		$ln = count($all) - 1;
		$history = "<div style='duisplay:flex column; justify-content:center; background:#eee;'>
						<div style='display:flex; justify-content:space-around; font-size:20px; background:#ddd; padding:5px; width:100%;'>
							<div style='width:45%;'>Chats</div>
							<div style='width:17%; text-align:center; font-size:14px; padding:4px;'>Category</div>

							<div style='width:17%; text-align:center; font-size:14px; padding:4px;'>Tutor</div>

							<div style='width:17%; text-align:center; font-size:14px; padding:4px;'>action</div>
						</div>";
		if(count($all)>0){
			$n = 0;
			while($ln >= $n){
			$que = $all[$n]['que'];
			$chat_id = $all[$n]['chat_id']; 
			$cat_id = $all[$n]['catid']; 
			$converse_id = $all[$n]['conv_id'];
			$r_id = $all[$n]['r'];
			$s_id = $all[$n]['s'];

			//only for resuming frm hmpg
			$receiver = $all[$n]['receiver'];

		$userData = $this->fetchUser();
		$this_user = $userData[0]['profile_id'];
		$this_user_xpt = $userData[0]['xpt'];
		
		$this_user_aoi = $userData[0]['aoi'];
		//check if thisuser is a tutor
		
		$this_user_xpt == 1 && strpos($this_user_aoi, $cat_id) ? $tutor = $this_user : $tutor = $r_id;
		$this_user_xpt == 1 && strpos($this_user_aoi, $cat_id) ? $learner = $r_id : $learner = $this_user;

            $uniqConverse_enc = $this->getUniqConv($tutor, $learner, $converse_id, 'duo');
			//get recipient for each conversation
			$recipient_id_enc = $this->encryptor0($receiver);
			$recipient_enc_cons = $this->enc_cons($receiver);
			$sender_enc_cons = $this->enc_cons($s_id);

			$catid_enc = $this->encryptor0($cat_id);

			$data = $this->select('aoi', ' WHERE aoi_id = ?', $cat_id);
			$chat_category = $data[0]['category'];
			
			//$receiver
			$this_user_xpt == 2 ? $receiver = $s_id : $receiver;
			$tutor_uname = $this->select('skyman_user', ' WHERE user_id = ?', $receiver);
	    	$rPub = $tutor_uname[0]['pub'];
	    	
	    	$this_user_xpt == 2 ? $recipient_enc_cons = $sender_enc_cons : $recipient_enc_cons;

//substr(string, start)
//			var_dump(substr($que, 10, 10));clos
			$history .= "<div style='display:flex; justify-content:space-around; background:#fff; padding:4px; margin:5px auto 5px auto; font-size:14px;'>
							
			<div style='width:46%; padding:4px;'><a id='dec3".$chat_id."' href='views/chat.php?&cid=$uniqConverse_enc&rid=$recipient_id_enc&catid=$catid_enc' style='color:#000;'></a></div>
							<div style='width:18%; font-size:14px; padding:4px;'>".$chat_category."</div>
							<div style='width:18%; font-size:14px; padding:4px; color:green;'>Online</div>
							<div style='width:18%; font-size:14px; padding:4px;'><a class='sm-btn' href='views/chat.php?&cid=$uniqConverse_enc&rid=$recipient_id_enc&catid=$catid_enc'>Resume</a></div>
						</div>
		

											<input type='hidden' name='category' id='category' value='2'/>
			<script>
  				        
  				        	var enc_pwd = localStorage.getItem('encP'); 
              	var pwd_enc_pk = localStorage.getItem('prv'); 
			    var code = gen_shared(pwd_enc_pk, enc_pwd, '$rPub');
			       localStorage.setItem('shrd'+'$recipient_enc_cons', code);
					    
                    var x = sym_decrypt('$que', code);
                            x.length > 25 ? trail = '...' : trail = ''; 
					        x = x.substring(0, 25)+trail;
								  document.getElementById('dec3'+'$chat_id').innerHTML = x;
				    
			</script>";
$n++;
				}
				$history .="<div style='background:#ccc; width:100%; height:.5px;'></div>";
			}
			else{$history.="<div style='display:flex; width:100vw; height:90vh; justify-content:center; align-items:center; font-size:20px; background:#fff; color:red;'>No conversation is available!</div>";}
		$history .= "</div>";
		return $history;
	}

    public function initials($fn, $ln){
    	$fn = $this->decryptor0($fn);
        $ln =  $this->decryptor0($ln);
        $initial=strtoupper(substr($fn, 0,1).'.'.substr($ln, 0,1));
        return $initial;
    }
    public function getUniqConv2($tutor, $learner, $converse_id, $chatpop){

			  	
  	 		$chatpop == 'multiple' ? 
   			$uniqConverse = $converse_id :
   			$uniqConverse = $tutor.'_'.$learner.'_'.$converse_id;
    		
    		$_uniqconv_enc = $this->enc_cons($uniqConverse);
        
        $_SESSION['alreadygetUniqConv'] = TRUE;
            return $_uniqconv_enc;
    }
    public function getUniqConv($tutor, $learner){
        	
   			$uniqConverse = $tutor.'_'.$learner.'_'.time();
    		$_uniqconv_enc = $this->enc_cons($uniqConverse);
        return $_uniqconv_enc;
    }
    public function savelocally($uniq_conv, $cat){
        return $this->savelocal($uniq_conv, $cat);
    }
    public function getQuote($replyto){
          $sql = "SELECT * from chat WHERE chat_id = ".$replyto;
				$xStmt = $this->connect()->query($sql);
				$data = $xStmt->fetch();
						$vet_id = $data['vet_id'];
				$agro_id = $data['agro_id'];
				$hth_id = $data['hth_id'];
				$guide_id = $data['guide_id'];
				$cook_id = $data['cook_id'];

			    $array = $this->_aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			 $queCol = $array['queCol'];
			 //$que = $row1[$queCol];
			 $chatType = $array['strDir'];
             $col_id = $array['col_id'];
             $col_val = $array['colval'];
             $topic = $array['topic'];
		        $sql = "SELECT * from ".$topic." WHERE ".$col_id." = ".$col_val;
             	$topicStmt = $this->connect()->query($sql);
				$data2 = $topicStmt->fetch();
	/*			$replyTomsg .= $data2[$queCol];
				
				$uniq_id .= 'reply'.$replyto;
				$uniq .=$replyto;*/
				return $data2[$queCol];
    }

    
    public function todate($date){
			$_day = substr($date, 0, 1);
			$day = '';
			switch($_day){
				case 1 :
				$day .= 'Sunday';
				break;

				case 2 :
				$day .= 'Monday';
				break;
				
				case 3 :
				$day .= 'Tuesday';
				break;
				
				case 4 :
				$day .= 'Wednesday';
				break;
				
				case 5 :
				$day .= 'Thursday';
				break;
				
				case 6 :
				$day .= 'Friday';
				break;
				
				case 7 :
				$day .= 'Saturday';
				break;
			}
			$time = substr($date, 1, 2);
			$time < 9 ? $time = substr($time, 1, 1) : $time = substr($time, 0, 2);
			$time > 12 ? $m = $time - 12 : $m = $time;
			
			$time > 11 ? $time = $m .'pm' : $time = $m .'am';
			$date = $day.' @'.$time;
			return $date;
					
	}
	
	public function makeTutor($uid, $cat_array){
		//function make a user become tutor acct
		$userData = $this->select('appointment', ' WHERE profile_id = ?', $uid);

		$val = array('profile_id'=>$uid);
		count($userData) == 0 ? $this->insert2Db('appointment', $val) : '';

		//update profile tb to xpert 
		$cat = implode('-', $cat_array);
		empty($cat) ? $cat ='' : $cat = '-'.$cat.'-';

		$valus = '1, '.$cat.', '.$uid;
		$this->updateStmt('profile', 'xpt = ?, aoi = ? WHERE profile_id = ?', $valus);
	
	}

	public function makeTutorForm($pid){
		$aoi = $this->select('aoi', ' WHERE aoi_id > ? ORDER BY aoi_id DESC LIMIT 52', 0);

		$_ln = count($aoi);
		$ln = $_ln - 1;
		$_pid = '';
		$categ = '';//<form id='upgrade_data".$pid."' method='post' action='../includes/upgrade.inc.php'>
		    $categ .="<div style='display:flex; flex-direction:column; justify-content:center; align-items:center; overflow:auto;'><span>
		                <input type='hidden' name='cats' value='$ln'>
		                ";
		  while($ln > 0){

		        $aoid = $aoi[$ln]['aoi_id'];
		        if($aoid == 1 || $aoid == 11 || $aoid == 21 || $aoid == 31 || $aoid == 41 || $aoid == 51 || $aoid == 61 || $aoid == 71 || $aoid == 81 || $aoid == 91 || $aoid == 101 || $aoid == 111 || $aoid == 121){
		            $categ .="<br><br><h6 style='text-align:left; font-weight:bold; color:#2166f3;'>".ucfirst($aoi[$ln]['category'])."</h6>";
		        }

		        $categ .="<div style='display:flex; justify-content:flex-left;'><label><input name='cat$aoid' type='checkbox' value='$aoid'><span style='margin-left:10px;'>".$aoi[$ln]['subcategory']."</span></label></div>";
		 	 $ln--;
		  }
		  $categ .="<input type='submit' name='Upgrade' value='upgrade'>
	
		  </span></div>";
		return $categ;
	}
	
	public function userList(){
		$val = 0;
		 $userData = $this->select('profile', ' INNER JOIN skyman_user USING(profile_id) WHERE profile_id > ? ORDER BY xpt ASC', $val);
		 return $userData;
	}
	public function lockChat($action, $chid){
		$vals = $action.', '.$chid; 
		$this->updateStmt('chat', 'locked = ? WHERE chat_id = ?', $vals);
	}
	public function makeCVE($cveType, $chid){
		$vals = $cveType.', '.$chid;
		
		$this->updateStmt('chat', 'cve = ? WHERE chat_id = ?', $vals);
		$chatData = $this->selectStmt('chat', ' WHERE chat_id = ?', $chid);
		$cid = $chatData[0]['uniq_conv'];

		$vals2 = '0, '.$cid.', '.$cveType.', '.$chid;
		$this->updateStmt('chat', 'cve = ? WHERE uniq_conv = ? AND cve = ? AND chat_id != ?', $vals2);
	}

	public function delegateTask($expert, $client, $delegate, $cat, $delegTime, $conversation_id){
		if(empty($conversation_id)){
			//join for new upcoming conversation
			$_delegate = '_'.$delegate.'.'.$delegTime.'.'.$client.'.'.$cat.'_';
			$vals = $_delegate.', '.$expert;
			$this->updateStmt('appointment', 'delegate = ? WHERE profile_id = ?', $vals);

			$fixedtime = '_'.$delegTime.'.'.$client.'_';
			$val = $fixedtime.', '.$delegate;
			$this->updateStmt('appointment', 'fixedtime = ? WHERE profile_id = ?', $val);

		}
		else{
				//join existing conversation
			$this->updateStmt('appointment', '');
				//update converse ID
			$valss = $delegate.', '.$chat_id;
			$this->updateStmt('chat', 'delegate = ? WHERE chat_id= ?', $valss);
		
		}
	}

	public function veriCheckMark($owner, $cat, $size, $parentBg){
		$_cat = '_'.$cat.'_';
		$_vals = "$owner, %$_cat%";

		$userData = $this->select('profile', ' WHERE profile_id = ? AND aoi LIKE ?', $_vals);
		
		$bg = ''; $checkMark = '';

		if(count($userData) > 0 || $owner == 0){
			$checkMarkBorder ='';
			if(count($userData) > 0){
			  $userData[0]['xpt'] == 1 ? $checkMarkBorder .= 'dotted' : $checkMarkBorder .= 'solid';
			}
			$owner == 0 ? $checkMarkBorder .= 'solid' : $checkMarkBorder;
			switch(true){
				case $cat <= 10 :
				$checkMark .= 'A';
				$bg .= 'green';
				break;

				case $cat <= 20 :
				$checkMark .= 'V';
				$bg .= 'red';
				break;

				case $cat <= 30 :
				$checkMark .= 'H';
				$bg .= 'blue';
				break;

			}
			
			$size == 1 ? $dim = '24px' : ($size == 2 ? $dim = '20px' : $dim = '16px');
			$size == 1 ? $fs = '14px' : ($size == 2 ? $fs = '12px' : $fs = '10px');
			
		
			return "<div class='animated bounce' style='height:$dim; width:$dim; font-size:$fs; padding-top:2px; border-radius:50%; display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #aaa); background:$bg; border: 2px $checkMarkBorder $parentBg; color:#fff; margin-left:5px; font-weight:bold;'>$checkMark</div>";
		}

	}
	

	public function paidCheck($checkMarkDues){
	/*	$due = strtotime($validity);
		$now > $due ? $validity = 0 : $validity = 1;

		$check_ = explode('_', $_check);
		$check = array_slice($check_, 1, -1, true);
		
		$check = $check[count($check)];
*/		$checkMarkDues = $this->dec_cons($checkMarkDues);

			$checkMarkDues_arr = explode('-', $checkMarkDues);
			$checkLogo_arr = array();
			$agro = array();
			$vet = array();
			$med = array();
			$law = array();
					
			foreach($checkMarkDues_arr as $eachCheck){
				if(!empty($eachCheck)){
					$eachCheck_arr = explode('/', $eachCheck);
					//-.1.2.11./1694767517
//					var_dump($eachCheck_arr);
					$due = $eachCheck_arr[1]; $now = time();
					$now > $due ? $validity = 0 : $validity = 1;
					
					$aoid_arr = explode('.', $eachCheck_arr[0]);
					$display = 'none';
					
					foreach($aoid_arr as $check){
						$checkMark = '';
						$bg = '';
					
						if(!empty($check) && $check != '-'){
								$check = intval($check);
								$spec = $this->generate_spec('', '_'.$check.'_');
								$spec = implode('', $spec); 

							
								switch(true){
									case $check <= 10 :
									$checkMark .= 'a';
									$bg .= 'green';
									$display = 'block';
								
									break;

									case $check <= 20 :
									$checkMark .= 'v';
									$bg .= 'red';
									$display = 'block';
									break;

									case $check <= 30 :
									$checkMark .= 'h';
									$bg .= 'blue';
									$display = 'block';

									break;

									case $check <= 40 :
									$checkMark .= 'l';
									$bg .= 'yellow';
									$display = 'block';
									break;

								}


/*							$checkLogo = "<div><div class='animated bounce' style='height:16px; width:16px; font-size:12px; border-radius:50%; display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #aaa); background: $bg; color:#fff; margin-left:5px; font-weight:bold;'>$checkMark</div></div>";*/

							$validity == 1 ? $checkLogo = "<span class='animated bounce' style='height:16px; width:16px; font-size:12px; border-radius:50%; display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #aaa); background: $bg; color:#fff; margin-left:-14px; border:2px solid #fff; font-weight:bold;' title='$spec'>$checkMark</span>" : $checkLogo=""; 			
							$check <= 10 ? $agro[] = $checkLogo :($check <=20 ? $vet[] = $checkLogo : ($check <= 30 ? $med[] = $checkLogo : $law[] = $checkLogo));

						}
			}
		}}
		$divider = '<div style="width:2px; height:2px; background:#aaa; border-radius:50%; margin-left:12px; margin-right:25px;"></div>';
!empty(implode('', $agro)) && !empty(implode('', $vet)) ? $divider_1 = $divider : $divider_1 = '';
!empty(implode('', $vet)) && !empty(implode('', $med)) ? $divider_2 = $divider : $divider_2 = '';
!empty(implode('', $med)) && !empty(implode('', $law)) ? $divider_3 = $divider : $divider_3 = '';

					$checkLogoAll = '<div style="display:flex; margin-left:15px; justify-content:center; align-items:center;">'.implode('', $agro).$divider_1.implode('', $vet).$divider_2.implode('', $med).$divider_3.implode('', $law).'</div>';		

					return $checkLogoAll;
	}

	public function unsetAppo($tutor){
		$tutorData = $this->select('appointment', ' WHERE profile_id = ?', $tutor);
		$_fixed = $tutorData[0]['fixedtime'];
		$freetime = $tutorData[0]['freetime'];
		empty($freetime) ? $_freetime = '_' : $_freetime = $freetime;
   		$fixed = explode('_', $_fixed);
		$eachFixed = array_slice($fixed, 1, -1, true);
		$futureAppo = array();
		$pastAppo = array();

		foreach($eachFixed as $fix){
			$_now = $this->to_appoStr( time() );
			$now = intval($_now);
			$_fix = explode('.', $fix);

			$now > $_fix[0] ? array_push($pastAppo, $_fix[0]) : array_push($futureAppo, $fix);
				
		}
		//update freetime and fixedtime
/*		count($pastAppo) > 0 ? $_pastAppo = implode('_', $pastAppo) : $_pastAppo = '';
		!empty($_pastAppo) ? $allFree = $freetime.$_pastAppo.'_' : $allFree = $freetime;
*/

		$_pastAppo = implode('_', $pastAppo);
		count($pastAppo) > 0 ? $allFree = $_freetime.$_pastAppo.'_' : $allFree = $freetime;

		$valu = $allFree.', '.$tutor;
		$this->updateStmt('appointment', 'freetime = ? WHERE profile_id = ?', $valu);


		$_futureAppo = implode('_', $futureAppo);
		count($futureAppo) > 0 ? $allFixed = '_'.$_futureAppo.'_' : $allFixed = '';
		$valux = $allFixed.', '.$tutor;
	
		$this->updateStmt('appointment', 'fixedtime = ? WHERE profile_id = ?', $valux);

	}
    public function permission($category_id, $user){
		return $this->permissionStatus($category_id, $user);
	}

	public function generate_DP($PID, $diameter, $path){
      $fsize = intval(str_replace('px', '', $diameter))/2.4;
		$d2 = $fsize * 2.5; 
		$diameter2 = $d2.'px';
		$rData = $this->fetchProfile($PID);
	    $initial = $this->initials($rData[0]['firstname'], $rData[0]['lastname']);
	   	count($rData) > 0 ? $imageDir = $rData[0]['picture'] : '';
		$url = $this::PROFILE.$imageDir;

		!empty($imageDir) ? 
	      $imageView = "<img src='".$path.$url.".webp' name='' id='img$PID' class='flexible' loading='lazy' style='height:$diameter; width:$diameter; border-radius:50%; border: .5px solid #fff; box-size:border-box; background:#fff;'/>" : $imageView = "<div style='border:1px solid #aaa; display:flex; align-items:center; justify-content:center; border-radius:50%; width:$diameter2; height:$diameter2; background:#fff; font-size:".$fsize."px; color:#444;'>$initial</div>";
	       
		return $imageView;
	}
public function removeChars($str){
				   $str = str_ireplace('/', '', $str);
						$str = str_ireplace('.', '', $str);
						$str = str_ireplace('=', '', $str);
						$str = str_ireplace('+', '', $str);
return $str;				
}
public function post_Chat2DB($lectureID, $que, $_cat, $msgReply, $mediaUsed, $chatLock, $rcid, $upload_name, $upload_tmp, $i, $chatpop){

		//get class_id
	$lectureID = str_replace(' ', '+', $lectureID);
	$classData = $this->select('classes', ' WHERE lecture_id = ?', $lectureID);
	$chatpop == 'duo' ? $class_id = '' : $class_id = $classData[0]['class_id'];

	if(!empty($rcid)){

		$uniqconv_id_code = $this->dec_cons($rcid);
		$uniqconv_array = explode("_", $uniqconv_id_code);
			  
		$tutor = $uniqconv_array[0];
	    $learner = $uniqconv_array[1];
	    $_SESSION['converse_id_resume'] = $uniqconv_array[2];

	    //send direct connection link to tutor for chat
	    $link = 'index';
  }

	$catData = $this->select('aoi', ' WHERE aoi_id = ?', $_cat);
	$table = $catData[0]['category'];
	$catId_val = '';

 	$aoi_array = $this->aoi($_cat);
	$queCol = $aoi_array['queCol'];
	$user_id_col = $aoi_array['user'];
	$cat_id = $aoi_array['cat_id'];
	$cat_tbl = $aoi_array['topic'];
	$folder = $aoi_array['folder'];
	$expert = $aoi_array['expert'];
	$brd_category = $aoi_array['brd_cat'];
	            
    $userData = $this->fetchUser();
    $user_id = $userData[0]['profile_id'];
    $recipient_id = $userData[0]['engager'];
	        
	//save dis sdk for future need
	$this_user_xpt = $userData[0]['xpt'];

	//check if thisuser is a tutor
	$this_user_xpt == 1 ? $tutor = $user_id : $tutor = $recipient_id;
	$this_user_xpt == 1 ? $learner = $recipient_id : $learner = $user_id;

	//get conversation ID weda resuming conversatn or not 
    !empty($rcid) ? $converse_id = $_SESSION['converse_id_resume'] : $converse_id = $userData[0]['converse_id'];
	    	
  $chatpop == 'duo' ? $uniqConverse = $tutor.'_'.$learner.'_'.$converse_id : $uniqConverse = $this->dec_cons($lectureID);
	$media_val='';
	$reformedQUE = '';

	switch (true) {
			case $mediaUsed == 3:
				 $media_val .= $mediaUsed;
				break;

			case $mediaUsed == 2:
			 	  $media_val .= $mediaUsed;
				 	$multiple_imgUpload_arr = array();

						while($i >=0 ){

					    $file_tmp_name = $upload_tmp[$i];
							$_file_name = $this->removeChars($que).$i;
							$file_name = $_file_name.'.webp';

							$multiple_imgUpload_arr[] = $_file_name;
							$destination_URL = '../img/'.$folder;
							$this->imgProcessor($file_name, $file_tmp_name, $destination_URL);
						 
						  $i--;
						}
						$que = implode('/==', $multiple_imgUpload_arr);

	  		break;
	                
	    case $mediaUsed == 1:
		      $media_val .= $mediaUsed;
	      break;
	                    
			case $mediaUsed == 0:
				 $media_val .= $mediaUsed;
				break;
		
	}			

	if(!empty($que)){
    $que_arr = explode('/==', $que);

		foreach($que_arr as $que){
 				$mediaUsed == 0 ? $que : $que = $this->removeChars($que);
							   
		    $data = array($queCol=>$que, $user_id_col => $user_id);
		    !empty($que) ? $this->insert2Db($table, $data) : '';

		    $val = $que.', '.$user_id;
		    $catvalData = $this->select($table, ' WHERE '.$queCol.' = ? AND '.$user_id_col.' = ?', $val);
		    $cat_val = $catvalData[0][$cat_id];

		    $_uniqconv_enc = $this->enc_cons($uniqConverse);
			
			$chatpop == 'duo' ? $conv_pop = '1' : $conv_pop = '2';
		    $data = array('locked'=>$chatLock, 'class_id'=>$class_id, 'conv_pop'=>$conv_pop, 'conv_id'=>$converse_id, 'replyto'=>$msgReply, 'uniq_conv'=>$_uniqconv_enc, $cat_id=>$cat_val, 'sender_id'=>$user_id, 'recipient_id'=>$recipient_id, 'media'=>$media_val, 'category_id' => $_cat);
			
			if(!empty($converse_id) && !empty($_uniqconv_enc) && (!empty($userData[0]['tmp_aud']) || !empty($que) || !empty($upload_tmp) )){
			    $this->insert2Db('chat', $data);
			}
			
			//remove tmp_aud if available
			   $vals = ' , '.$user_id;
			   $this->updateStmt('profile', 'tmp_aud = ? WHERE profile_id = ?', $vals);
		}

		$userData[0]['tmp_aud']=''; 
		$que=''; 
		$_FILES['upload']['tmp_name']='';
	}
	
return $_cat;
}
public function postChat2DB($_uniqconv_enc, $que, $_cat, $msgReply, $mediaUsed, $chatLock, $upload_name, $upload_tmp, $i, $chatpop){

	$catData = $this->select('aoi', ' WHERE aoi_id = ?', $_cat);
	$table = $catData[0]['category'];
	$catId_val = '';

 	$aoi_array = $this->aoi($_cat);
	$queCol = $aoi_array['queCol'];
	$user_id_col = $aoi_array['user'];
	$cat_id = $aoi_array['cat_id'];
	$cat_tbl = $aoi_array['topic'];
	$folder = $aoi_array['folder'];
	$expert = $aoi_array['expert'];
	$brd_category = $aoi_array['brd_cat'];
	            
    $userData = $this->fetchUser();
    $user_id = $userData[0]['profile_id'];
    $recipient_id = $userData[0]['engager'];
	        
	//save dis sdk for future need
	$this_user_xpt = $userData[0]['xpt'];

	//check if thisuser is a tutor
	$this_user_xpt == 1 ? $tutor = $user_id : $tutor = $recipient_id;
	$this_user_xpt == 1 ? $learner = $recipient_id : $learner = $user_id;

	$media_val='';
	$reformedQUE = '';

	switch (true) {
			case $mediaUsed == 3:
				 $media_val .= $mediaUsed;
				break;

			case $mediaUsed == 2:
			 	  $media_val .= $mediaUsed;
				 	$multiple_imgUpload_arr = array();

						while($i >=0 ){

					    $file_tmp_name = $upload_tmp[$i];
							$_file_name = $this->removeChars($que).$i;
							$file_name = $_file_name.'.webp';

							$multiple_imgUpload_arr[] = $_file_name;
							$destination_URL = '../img/'.$folder;
							$this->imgProcessor($file_name, $file_tmp_name, $destination_URL);
						 
						  $i--;
						}
						$que = implode('/==', $multiple_imgUpload_arr);

	  		break;
	                
	    case $mediaUsed == 1:
		      $media_val .= $mediaUsed;
	      break;
	                    
			case $mediaUsed == 0:
				 $media_val .= $mediaUsed;
				break;
		
	}			

	if(!empty($que)){
    $que_arr = explode('/==', $que);

		foreach($que_arr as $que){
 				$mediaUsed == 0 ? $que : $que = $this->removeChars($que);
							   
		    $data = array($queCol=>$que, $user_id_col => $user_id);
		    !empty($que) ? $this->insert2Db($table, $data) : '';

		    $val = $que.', '.$user_id;
		    $catvalData = $this->select($table, ' WHERE '.$queCol.' = ? AND '.$user_id_col.' = ?', $val);
		    $cat_val = $catvalData[0][$cat_id];
			
			$chatpop == 'duo' ? $conv_pop = '1' : $conv_pop = '2';
		    $data = array('locked'=>$chatLock, 'replyto'=>$msgReply, 'uniq_conv'=>$_uniqconv_enc, $cat_id=>$cat_val, 'sender_id'=>$user_id, 'recipient_id'=>$recipient_id, 'media'=>$media_val, 'category_id' => $_cat);
			
			if(!empty($_uniqconv_enc) && (!empty($userData[0]['tmp_aud']) || !empty($que) || !empty($upload_tmp) )){
			    $this->insert2Db('chat', $data);
			}
			
			//remove tmp_aud if available
			   $vals = ' , '.$user_id;
			   $this->updateStmt('profile', 'tmp_aud = ? WHERE profile_id = ?', $vals);
		}

		$userData[0]['tmp_aud']=''; 
		$que=''; 
		$_FILES['upload']['tmp_name']='';
	}
	
return $_cat;
}

public function estimateDate($timestamp){
	$time_ago=strtotime($timestamp);
	$current_time=time();
	$time_diff=$current_time-($time_ago);
	$date = $this->timeBanner($timestamp);

	$dateDiv = "<div style='display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; padding-top:20px; margin-bottom:20px;'>
			<!--<div style='height:4px; background:#eee; border:1px inset #ccc; width:100%;'></div>-->
				<div style='font-size:12px; margin-left:auto; margin-right:auto; margin-top:-20px; padding:10px; background:#fff; color:#aaa; border-radius:10px; filter:drop-shadow(1px 1px 1px #ccc);'>
					$date
				</div>
			</div>
		</div>";
$output = '';
	//$time_diff > 86400 && 
	if( $date != $_SESSION['newDate'] ){
		 $output .= $dateDiv;
	   $_SESSION['newDate'] = $date;

	}else{$output .= ""; }
//	$time_diff > 86400 ? $output = "<div style='display:flex; align-items:center; justify-content:center; margin:50px 0 20px 0; width:100%; background:#ccc; color:#000; font-size:10px;'>$date</div>" : $output = "";

return $output;
  		
}

public function fetchLovableContent($userID){

        $output = '';
        $myGlue = $this->select('prd_interactions', ' WHERE profile_id = ?', $userID);
       
       if(!empty($myGlue[0]['likes']) || !empty($myGlue[0]['favs'])){
           
        $sql = "WITH userLikedContent AS (
            SELECT 
                profile_id,
                likes,
                favs,
                TRIM(SUBSTRING_INDEX(SUBSTRING_INDEX(likes, '.', n.n), '.', -1)) AS number
            FROM 
                prd_interactions t2
            JOIN 
                (SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL SELECT 10
                 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL SELECT 15) n 
            ON CHAR_LENGTH(likes) - CHAR_LENGTH(REPLACE(likes, '.', '')) >= n.n - 1
            WHERE t2.profile_id = $userID
        ),
        matches AS (
            SELECT 
                t1.profile_id,
                t1.likes,
                t1.favs,
                LENGTH(t1.likes) - LENGTH(REPLACE(t1.likes, '.', '')) + 1 AS num_elements,
                SUM(
                    LENGTH(t1.likes) - LENGTH(REPLACE(t1.likes, rn.number, ''))
                ) / LENGTH(rn.number) AS match_count
            FROM 
                prd_interactions t1
            JOIN userLikedContent rn ON FIND_IN_SET(rn.number, REPLACE(t1.likes, '.', ',')) > 0
            WHERE t1.profile_id != $userID
            GROUP BY t1.profile_id, t1.likes
        )
        SELECT 
            profile_id,
            likes,
            favs,
            num_elements,
            match_count
        FROM matches
        ORDER BY match_count DESC
        LIMIT 50";
        
       	$replyStmt = $this->connect()->query($sql);
		$stmt = $this->connect()->prepare($sql);
		$stmt->execute();
		$this->count = $stmt->rowCount();
		$glueData = $stmt->fetchAll();

		$n = count($glueData) - 1;
		$all_matchDiff_array =array();

        $myLikes = explode('.', $myGlue[0]['likes']);
        $myFavs = explode('.', $myGlue[0]['favs']);

		while($n >= 0){
		    $matchedLikes = explode('.', $glueData[$n]['likes']);
		    $matchDiff_array = array_diff($matchedLikes, $myLikes);
			$all_matchDiff_array = array_merge($all_matchDiff_array, $matchDiff_array);

		    $matchedFavs = explode('.', $glueData[$n]['favs']);
		    $matchfavDiff_array = array_diff($matchedFavs, $myFavs);
			$all_matchDiff_array = array_merge($all_matchDiff_array, $matchfavDiff_array);
	    
		    $n--;
		}
        return array_unique($all_matchDiff_array);
    }else{ return '';}
}
public function getCheckout($pubid){
	$pubData = $this->select('publish', ' WHERE pub_id = ?', $pubid);
	$published = $pubData[0]['published'];	
			$val = $published.', 1';
			$chat = $this->select('solochat', ' WHERE content_id = ? AND media > ?', $val);
      count($chat) == 0 ? $chat = $this->select('chat', ' WHERE uniq_conv = ? AND media > ?', $val) : $chat;
		
//			var_dump($chat);
			$mediaInUse = $chat[0]['media'];
			$vet_id = $chat[0]['vet_id'];
			$agro_id = $chat[0]['agro_id'];
			$hth_id = $chat[0]['hth_id'];
			$guide_id = $chat[0]['guide_id'];
			$cook_id = $chat[0]['cook_id'];
			$startDate = $chat[0]['cdate'];

   		$aoi_array = $this->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			$topic = $aoi_array['topic'];
			$col_id = $aoi_array['col_id'];
			$colval = $aoi_array['colval'];
			$queCol = $aoi_array['queCol'];
			$strDir = $aoi_array['strDir'];

			$med = $this->select($topic, ' WHERE '.$col_id.' = ?', $colval);
			$que = $med[0][$queCol];
			$col_val = $colval;
  
			$mediaInUse == 3 && !file_exists('videos/'.$strDir.'/dec/'.$que.'.webm') ? $this->videoDecryptor22($que, $strDir) : '';
			$url = 'videos/'.$strDir.'/dec/'.$que.'.webm';
	


$n = count($chat) - 1;
			$_mediaInUse = $chat[$n]['media'];
	  	$_vet_id = $chat[$n]['vet_id'];
			$_agro_id = $chat[$n]['agro_id'];
			$_hth_id = $chat[$n]['hth_id'];
			$_guide_id = $chat[$n]['guide_id'];
			$_cook_id = $chat[$n]['cook_id'];
			$_endDate = $chat[$n]['cdate'];
	
		
   		$_aoi_array = $this->aoi_cht($_agro_id, $_vet_id, $_hth_id, $_guide_id, $_cook_id);
			$_topic = $_aoi_array['topic'];
			$_col_id = $_aoi_array['col_id'];
			$_colval = $_aoi_array['colval'];
			$_queCol = $_aoi_array['queCol'];
			$_strDir = $_aoi_array['strDir'];

			$_med = $this->select($_topic, ' WHERE '.$_col_id.' = ?', $_colval);
			$_que = $_med[0][$_queCol];
			  
			$_url = 'videos/'.$_strDir.'/dec/'.$_que.'.webm';
    	$_mediaInUse == 3 && !file_exists('videos/'.$_strDir.'/dec/'.$_que.'.webm') ? $this->videoDecryptor22($_que, $_strDir) : '';
    
      return array($mediaInUse, $_mediaInUse, $url, $_url);

			
}
public function thirdPPL($user){
	$userInt = $this->select('prd_interactions', ' WHERE profile_id = ?', $user);

	$data = array('profile_id'=>$user, 'likes'=>'', 'favs'=>'');
    count($userInt) == 0 ? $this->insert2Db('prd_interactions', $data) : '';
    count($userInt) == 0 ? $userInt = $this->select('prd_interactions', ' WHERE profile_id = ?', $user) : '';

    $myLovedContents = $userInt[0]['3pplikes'];
    $myFavContents = $userInt[0]['3ppfavs'];
    $matchDiff_array = $this->fetchLovableContent($user);
	$query = '';
/*
	if(!empty($matchDiff_array) && count($matchDiff_array) >= 5){ 
    	    
    	$matchDiff_str = implode(", ", $matchDiff_array);
    	foreach($matchDiff_array as $match){
    		$query == '' ? $query .= "?" : $query .=", ?";
    	}
	    $pub = $this->select('3rdpartyproduct', " WHERE product_id IN ($query)", $matchDiff_str);
	}else{
	    $pub = $this->select('3rdpartyproduct', " WHERE product_id > ?", 0);
	}*/
    
	$pub = $this->select('3rdpartyproduct', " WHERE product_id > ? ORDER BY product_id DESC", 0);
	$ln = count($pub) - 1;
	$all = '';
	$que = '';
	$me = $user;

	$previousLiked = '';
	
	while($ln >= 0){
		$_me = '_'.$me.'_';

		strpos($myLovedContents, $pub[$ln]['product_id']) !== false ? $likeStatus = 1 : $likeStatus = 0;
		strpos($myFavContents, $pub[$ln]['product_id']) !== false ? $favStatus = 1 : $favStatus = 0;

			$published_dec = $this->dec_cons($pub[$ln]['product_uniq']);
			$pub_array = explode("_", $published_dec);
				$tutorID = $this->dec_cons($pub[$ln]['rsP']);
				$tutorID_enc_con = $this->enc_cons($tutorID);
				$tutorID_enc0 = $this->encryptor0($tutorID);
				$tutor = $this->fetchProfile($tutorID);

				$_tutorImgUrl = $tutor[0]['picture'];
				$tutorImgUrl = $this::PROFILE.$_tutorImgUrl;

            //check if user is the creator
            $tutorID == $me ? $consultancy = false : $consultancy = true;
            
            //fetch user username
            $uData = $this->select('skyman_user', ' WHERE profile_id = ?', $tutorID);
            $username = $this->decryptor0($uData[0]['username']);
 
			$pub[$ln]['chatpop'] == 'm' ? $recipient = 0 :
			$recipient = $this->encryptor0($pub_array[1]);
			//$convid = $this->encryptor0($pub_array[2]);
//			$pub_id_enc = $this->encryptor0($pub[$ln]['pub_id']);
			$pub_id_enc = $this->num_AlphaA($pub[$ln]['product_id']);
			$pub_id = $pub[$ln]['product_id'];

			$ccc = $this->dec_cons($pub[$ln]['product_uniq']);
			$productUniq_dec = $this->dec_cons($pub[$ln]['product_uniq']);
			$productUniqArr = explode('_', $productUniq_dec);
			$product_image = $productUniqArr[6];
		  $chat = $this->select('productscript', ' WHERE productUniq = ? AND media > ?', $pub[$ln]['product_uniq'].', 1');

			$chatPOP = $this->encryptor0($pub[$ln]['chatpop']);
		if(count($chat) > 0){
			$n = count($chat) - 1;
			$catPass = $this->enc_cons('FALSE');
	//STARTING MEDIA
			$category_id = $chat[0]['category_id'];
			$vet_id = $chat[0]['vet_id'];
			$agro_id = $chat[0]['agro_id'];
			$hth_id = $chat[0]['hth_id'];
			$guide_id = $chat[0]['guide_id'];
			$cook_id = $chat[0]['cook_id'];
			$startDate = $chat[0]['sDate'];
			$mediaInUse = $chat[0]['media'];
			$thumb = $chat[0]['thumbnail'];
			empty($mediaInUse) ? $mediaInUse =0 : $mediaInUse; 
            
            $_addVideoMedia = array();
            $_addImageMedia = array();
            $_addAudioMedia = array();
            $_addText = array();
        		
            foreach($chat as $each){
	            $each['media'] == 3 ? $_addVideoMedia[] = '3' : ($each['media'] == 2 ? $_addImageMedia[] = '2' : 
                ($each['media'] = 1 ? $_addAudioMedia = '1' : $_addText = '0'));
            }
            $addVideoMedia = count($_addVideoMedia);
            $addImageMedia = count($_addImageMedia);
            $addAudioMedia = count($_addAudioMedia);
            $addText = count($_addText);
		      
            
			$aoi_array = $this->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			$topic = $aoi_array['topic'];
			$col_id = $aoi_array['col_id'];
			$colval = $aoi_array['colval'];
			$queCol = $aoi_array['queCol'];
			$strDir = $aoi_array['strDir'];

			$med = $this->select($topic, ' WHERE '.$col_id.' = ?', $colval);
			$que = $med[0][$queCol];
			$col_val = $colval;
            $mediaInUse == 3 && !file_exists('../videos/'.$strDir.'/dec/'.$que.'.webm') ? $this->videoDecryptor22($que, $strDir) : '';

			//ENDING MEDIA
			$_vet_id = $chat[$n]['vet_id'];
			$_agro_id = $chat[$n]['agro_id'];
			$_hth_id = $chat[$n]['hth_id'];
			$_guide_id = $chat[$n]['guide_id'];
			$_cook_id = $chat[$n]['cook_id'];
			$_mediaInUse = $chat[$n]['media'];
			$endDate = $chat[$n]['sDate'];
			$thumb2 = $chat[$n]['thumbnail'];

			$_aoi_array = $this->aoi_cht($_agro_id, $_vet_id, $_hth_id, $_guide_id, $_cook_id);
			$_topic = $_aoi_array['topic'];
			$_col_id = $_aoi_array['col_id'];
			$_colval = $_aoi_array['colval'];
			$_queCol = $_aoi_array['queCol'];
			$_col_val = $_colval;

			$_strDir = $_aoi_array['strDir'];
			$_med = $this->select($_topic, ' WHERE '.$_col_id.' = ?', $_colval);
			$_que = $_med[0][$_queCol];
            
            $_mediaInUse == 3 && !file_exists('../videos/'.$_strDir.'/dec/'.$_que.'.webm') ? $this->videoDecryptor22($_que, $_strDir) : '';
  	    $boughtOrNot = $this->boughtOrNot($pub[$ln]['product_uniq']);
        
            $balance = $this->getCoinBalance();            
            $chatDur = strtotime($endDate) - strtotime($startDate);
            $timespan = "<span style='color:#fff;'>".$this->getTimeDiff($chatDur)."</span>";
            $_endDate = substr($endDate, 0, 10);

	    $all .= ', '.$pub[$ln]['topic_id'].'__'.$pub[$ln]['heading'].'__L('.$pub_id.'.'.$pub[$ln]['tL'].'.'.$likeStatus.')L__'.$pub[$ln]['product_uniq'].'__'.$pub[$ln]['price'].'__'.$mediaInUse.'__'.$_mediaInUse.'__'.$tutorImgUrl.'__'.$_colval.'__'.$col_id.'__'.$_col_id.'__'.$ln.'__'.$strDir.'__'.$_strDir.'__'.$que.'__'.$_que.'__'.$pub_id.'__'.$recipient.'__'.$tutorID_enc_con.'__'.$likeStatus.'__'.$category_id.'__'.$catPass.'__'.$pub[$ln]['tshare'].'__'.$pub[$ln]['timespan'].'__'.$pub_id_enc.'__'.nl2br(str_replace(', ', '~ ', $pub[$ln]['insight'])).'__'.$consultancy.'__'.$username.'__'.$addVideoMedia.'__'.$addImageMedia.'__'.$addAudioMedia.'__'.$addText.'__'.$tutorID_enc0.'__F('.$pub_id.'.'.$pub[$ln]['tF'].'.'.$favStatus.')F__'.$favStatus.'__'.$_endDate.'__'.$balance.'__'.$boughtOrNot.'__'.$thumb.'__'.$thumb2.'__'.$product_image;
	}
	$ln--;
	}
	return substr($all, 2);
}
public function newList($user){
    
	$userInt = $this->select('prd_interactions', ' WHERE profile_id = ?', $user);

	$data = array('profile_id'=>$user, 'likes'=>'', 'favs'=>'');
    count($userInt) == 0 ? $this->insert2Db('prd_interactions', $data) : '';
    count($userInt) == 0 ? $userInt = $this->select('prd_interactions', ' WHERE profile_id = ?', $user) : '';

    $myLovedContents = $userInt[0]['likes'];
    $myFavContents = $userInt[0]['favs'];
    $matchDiff_array = $this->fetchLovableContent($user);

	$query = '';
  //var_dump($matchDiff_array);
			/*if(!empty($matchDiff_array) && count($matchDiff_array) >= 5){ 
			    	    
				    	$matchDiff_str = implode(", ", $matchDiff_array);
				    	foreach($matchDiff_array as $match){
				    		$query == '' ? $query .= "?" : $query .=", ?";
				    	}
				    $pub = $this->select('publish', " WHERE pub_id IN ($query)", $matchDiff_str);
				}else{
				    $pub = $this->select('publish', " WHERE pub_id > ?", 0);
			}*/
	        $pub = $this->select('publish', " WHERE pub_id > ? ORDER BY pub_id DESC", 0);
	$ln = count($pub) - 1;
	$all = '';
	$que = '';
	$me = $user;

	$previousLiked = '';
   	
	while($ln >= 0){
		$_me = '_'.$me.'_';

		strpos($myLovedContents, $pub[$ln]['pub_id']) !== false ? $likeStatus = 1 : $likeStatus = 0;
		strpos($myFavContents, $pub[$ln]['pub_id']) !== false ? $favStatus = 1 : $favStatus = 0;

			$published_dec = $this->dec_cons($pub[$ln]['published']);
			$pub_array = explode("_", $published_dec);
				$tutorID = $this->dec_cons($pub[$ln]['rsP']);
				$tutorID_enc_con = $this->enc_cons($tutorID);
				$tutorID_enc0 = $this->encryptor0($tutorID);
				$tutor = $this->fetchProfile($tutorID);
				$_tutorImgUrl = $tutor[0]['picture'];
				$tutorImgUrl = $this::PROFILE.$_tutorImgUrl;

            //check if user is the creator
            $tutorID == $me ? $consultancy = false : $consultancy = true;
            
            //fetch user username
            $uData = $this->select('skyman_user', ' WHERE profile_id = ?', $tutorID);
            $username = $this->decryptor0($uData[0]['username']);
 
			$pub[$ln]['chatpop'] == 'm' ? $recipient = 0 :
			$recipient = $this->encryptor0($pub_array[1]);
			//$convid = $this->encryptor0($pub_array[2]);
//			$pub_id_enc = $this->encryptor0($pub[$ln]['pub_id']);
			$pub_id_enc = $this->num_AlphaA($pub[$ln]['pub_id']);

			
			$pub_id = $pub[$ln]['pub_id'];

			
		$pub[$ln]['chatpop'] == 'd' ? 
		$chat = $this->select('chat', ' WHERE uniq_conv = ? AND media > ?', $pub[$ln]['published'].', 1') :
		( $pub[$ln]['chatpop'] == 's' ? 
		$chat = $this->select('solochat', ' WHERE content_id = ? AND media > ?', $pub[$ln]['published'].', 1') : $chat = $this->select('grpchat', ' WHERE uniq_conv = ? AND media > ?', $pub[$ln]['published'].', 1') );

	$chatPOP = $this->encryptor0($pub[$ln]['chatpop']);
		if(count($chat) > 0){
			$n = count($chat) - 1;
			$catPass = $this->enc_cons('FALSE');
	//STARTING MEDIA
			$category_id = $chat[0]['category_id'];
			$vet_id = $chat[0]['vet_id'];
			$agro_id = $chat[0]['agro_id'];
			$hth_id = $chat[0]['hth_id'];
			$guide_id = $chat[0]['guide_id'];
			$cook_id = $chat[0]['cook_id'];
			$startDate = $chat[0]['cdate'];
			$mediaInUse = $chat[0]['media'];
			$thumb = $chat[0]['thumbnail'];
			empty($mediaInUse) ? $mediaInUse =0 : $mediaInUse; 
            
            $_addVideoMedia = array();
            $_addImageMedia = array();
            $_addAudioMedia = array();
            $_addText = array();
        		
            foreach($chat as $each){
	            $each['media'] == 3 ? $_addVideoMedia[] = '3' : ($each['media'] == 2 ? $_addImageMedia[] = '2' : 
                ($each['media'] = 1 ? $_addAudioMedia = '1' : $_addText = '0'));
            }
            $addVideoMedia = count($_addVideoMedia);
            $addImageMedia = count($_addImageMedia);
            $addAudioMedia = count($_addAudioMedia);
            $addText = count($_addText);
		      
            
			$aoi_array = $this->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			$topic = $aoi_array['topic'];
			$col_id = $aoi_array['col_id'];
			$colval = $aoi_array['colval'];
			$queCol = $aoi_array['queCol'];
			$strDir = $aoi_array['strDir'];

			$med = $this->select($topic, ' WHERE '.$col_id.' = ?', $colval);
			$que = $med[0][$queCol];
			$col_val = $colval;
            $mediaInUse == 3 && !file_exists('../videos/'.$strDir.'/dec/'.$que.'.webm') ? $this->videoDecryptor22($que, $strDir) : '';

//     $mediaInUse == 3 && !file_exists('../videos/'.$strDir.'/dec/'.$que.'.webm') ? var_dump('POST') : var_dump('NOpost');
//$this->videoDecryptor22($que, $strDir);
            //if($mediaInUse == 3){$this->videoDecryptor22($que, 'vet');}

	//ENDING MEDIA
			$_vet_id = $chat[$n]['vet_id'];
			$_agro_id = $chat[$n]['agro_id'];
			$_hth_id = $chat[$n]['hth_id'];
			$_guide_id = $chat[$n]['guide_id'];
			$_cook_id = $chat[$n]['cook_id'];
			$_mediaInUse = $chat[$n]['media'];
			$endDate = $chat[$n]['cdate'];
			$thumb2 = $chat[$n]['thumbnail'];

			$_aoi_array = $this->aoi_cht($_agro_id, $_vet_id, $_hth_id, $_guide_id, $_cook_id);
			$_topic = $_aoi_array['topic'];
			$_col_id = $_aoi_array['col_id'];
			$_colval = $_aoi_array['colval'];
			$_queCol = $_aoi_array['queCol'];
			$_col_val = $_colval;

			$_strDir = $_aoi_array['strDir'];
			$_med = $this->select($_topic, ' WHERE '.$_col_id.' = ?', $_colval);
			$_que = $_med[0][$_queCol];
            
            $xxx = $this->videoDecryptor22($_que, $_strDir);
            //var_dump($_que.'()'.$_strDir.' '.$xxx);
            $_mediaInUse == 3 && !file_exists('../videos/'.$_strDir.'/dec/'.$_que.'.webm') ? $this->videoDecryptor22($_que, $_strDir) : '';
      
      $boughtOrNot = $this->boughtOrNot($pub[$ln]['published']);
        
      $product_image = '';      
            $balance = $this->getCoinBalance();            
            $chatDur = strtotime($endDate) - strtotime($startDate);
            $timespan = "<span style='color:#fff;'>".$this->getTimeDiff($chatDur)."</span>";
            $_endDate = substr($endDate, 0, 10);
		    $all .= ', '.$pub[$ln]['topic_id'].'__'.$pub[$ln]['heading'].'__L('.$pub_id.'.'.$pub[$ln]['tL'].'.'.$likeStatus.')L__'.$pub[$ln]['published'].'__'.$pub[$ln]['price'].'__'.$mediaInUse.'__'.$_mediaInUse.'__'.$tutorImgUrl.'__'.$_colval.'__'.$col_id.'__'.$_col_id.'__'.$ln.'__'.$strDir.'__'.$_strDir.'__'.$que.'__'.$_que.'__'.$pub_id.'__'.$recipient.'__'.$tutorID_enc_con.'__'.$likeStatus.'__'.$category_id.'__'.$catPass.'__'.$pub[$ln]['share'].'__'.$pub[$ln]['timespan'].'__'.$pub_id_enc.'__'.nl2br(str_replace(', ', '~ ', $pub[$ln]['insight'])).'__'.$consultancy.'__'.$username.'__'.$addVideoMedia.'__'.$addImageMedia.'__'.$addAudioMedia.'__'.$addText.'__'.$tutorID_enc0.'__F('.$pub_id.'.'.$pub[$ln]['tF'].'.'.$favStatus.')F__'.$favStatus.'__'.$_endDate.'__'.$balance.'__'.$boughtOrNot.'__'.$thumb.'__'.$thumb2.'__'.$product_image;
		}
	$ln--;
	}
	return substr($all, 2);
}
public function completeRegFirst(){

return "<div style='width:100%; height:92vh; display:flex; flex-direction:column; margin:40px; justify-content:center; align-items:center; padding:40px;'>
    <div style='margin-left:auto; margin-right:auto; '>Your registration is incomplete, kindly refresh this page and fill the form to complete it before you can proceed.</div>
    <div><a href='scrolls'>Refresh</a></div>
    </div>";
}    
public function scripts(){
	$userData = $this->fetchUser();

isset($_SESSION['user_id']) ? $xpt = $userData[0]['xpt'] : $xpt = 0;
$rand = rand(6, 10);//$userData[0]['view'];
//get new notes notification set
if(isset($_SESSION['user_id'])){
	$vals = '0, '.$userData[0]['profile_id'];
	$newNotes = $this->select('xnote', ' WHERE iview = ? AND target_id = ?', $vals);
	$n = count($newNotes);
	$n > 0 ? 
$allnew = "<sub style='display:flex; justify-content:center; align-items:center; margin-left:-10px; margin-top:5px; color:#fff; font-size:12px; background:#2166f3; height:16px; width:16px; border-radius:50%; font-weight:bold;'>$n</sub>"
: $allnew = '';
	}
	$xpt == 0 ? $url = 'enquiry' : $url = 'response';

		$xpt == 1 ? $calender ="
		<span style='background:transparent;' onClick='$(\".showpanel\").slideDown()'>
		<span class='material-icons' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'>&#xebcc;</span>
		</span>" : $calender ='';
//h8 w13.6
$scriptPanel = "
	  <img id='productIMG' class='flexible' src='' style='display:none; justify-content:center; align-items:center; position:fixed; top:39%; left:33%; height:100px; width:100px; z-index:5001; opacity:0.9; border-radius:50%; object-fit:cover; border:.5px solid #fff; filter:drop-shadow(.5px .5px .5px #eee) drop-shadow(-.5px -.5px .5px #eee);'>
	  <img id='productIMG2' class='flexible' src='' style='display:none; justify-content:center; align-items:center; position:fixed; top:39%; left:39%; height:100px; width:100px; z-index:5000; opacity:0.9; border-radius:50%; object-fit:cover; border:.5px solid #fff; filter:drop-shadow(.5px .5px .5px #eee) drop-shadow(-.5px -.5px .5px #eee);'>

<div style='display:flex; flex-direction:column; width:100%; height:100vh; overflow:hidden; background:#ddd; justify-content:center; align-items:center;'>

	<nav class='hm-na' style='display:flex; align-items:center; min-width:100%; padding:5px; margin-top:5px; border-radius:10px; position:fixed; top:0; background:transparent; z-index:20; font-size:20px;'>

			<div style='width:50%; display:flex; align-items:center;'>
	            <div style='align-self:left; justify-content:center; margin-right:auto; margin-left:10px; margin-top:-15px; display:flex; color:#2166f3; font-weight:bold; font-size:16px; background:transparent; padding:5px; border-radius:90px;'> <a href='scrolls' style='background:transparent; color:#fff;'><img src='img/glit192.png' alt='gLIT logo' style='height:30px; width:30px; border-radius:50%;'>lit</a></div>
				
				<a href='$url' style='font-size:16px; font-weight:bold; color:#fff; text-decoration:none; margin-top:20px; filter:drop-shadow(1px 1px .5px #444);'>Consult</a>
			</div>		
			<span style='width:2px; height:14px; background:#fff; filter:drop-shadow(1px 1px 1px #666); margin-left:15px; margin-right:15px; margin-top:20px;'></span>

			<div style='width:50%; display:flex; align-items:center;'>
	    		<a href='solscript' style='font-size:16px; margin-top:20px; font-weight:bold; color:#fff; text-decoration:none; filter:drop-shadow(1px 1px .5px #444);'>Create</a>
				
				<span style='margin-top:2px; background:transparent; margin-left:auto;'  onclick='$(\"#searchPanel\").slideDown();' ><span class='material-icons' style='color:#fff; font-size:28px; filter:drop-shadow(1px 1px 1px #666);' >&#xe8b6;</span></span>

				<a href='note' style='margin-top:-10px; text-decoration:none; background:transparent; margin-left:15px; margin-right:15px; display:flex;'><span class='material-icons' style='color:#fff; filter:drop-shadow(1px 1px 1px #666); font-size:22px;'>&#xe7f4;</span>$allnew</a>		
			</div>

	</nav>

		<div id='scrollet' class='page' style='overflow:none; height:100vh; background:#ddd; width:100vw;'>
			<div id='topscript' style='display:none;'>
			</div>
			<div id='focusscript' class='content' style='height:100vh; width:100vw; background:#ddd; display:flex; justify-content:center; align-items:center;'>

				<div class='scrollet' style='height:100vh; min-width:38%; display:flex; flex-direction:column; background:#ddd; justify-content:center; align-items:center; font-weight:bold; font-size:30px;'>
                    <div style='position:relative; height:100%; width:100%; text-align:center; z-index:2;'>";
 	
// $displayType = 'stash';
if($rand <= 5 ){
$scriptPanel .="<div id='box' style='margin-bottom:1px; height:100vh; border-bottom:2px solid #aaa; background:#fff;'>
	                      <figcaption id='caption1colval' style='z-index:10; position:absolute; margin-top:auto; left:0; width:100%; height:100%; font-size:12px; display:flex; flex-direction:column; justify-content:center; align-items:center; pointer-events:none;'>
	                        <div style='display:flex; margin-top:31%; margin-bottom:auto; flex-direction:column; justify-content:center; align-items:center;'>
		                        	 <div style='margin-top:auto; margin-bottom:auto; color:rgba(255,255,255); min-width:100px; padding:20px; pointer-events:auto;'>
		                       			<span onclick='paymentSubpage();' id='_contentScript' style='text-decoration:none; width:100%;'>
		                        			<span id='headingA' style='font-size:18px; text-shadow:2px 2px 2px #2166f3; color:#fff;'>
		                            	    </span>
											<span id='insightBtn' onclick='viewInsight();' class='material-icons spinna' style='display:inline; color: deepskyblue; font-size:30px; margin-left:10px; pointer-events:auto;'>&#xe88e;</span>
		                                </span>
		                       		 </div>     
	                        </div>
	                        <div id='insight' style='z-index:25; background:rgba(210,255,255,.6); display:none; width:100%; margin-top:auto; text-align:justify; color:#fff; padding:20px; padding-right:20px; overflow:scroll-y; border-top-right-radius:20px; border-top-left-radius:20px;'></div>

	                      </figcaption>
	                      <img src='' loading='lazy' id='imgA' class='flexible' class='flexible' style='width:100%; height:100%; object-fit:cover; display:none;'/>
	                      <video autoplay id='mediaA' class='flexible2' style='width:100%; height:100%; object-fit:cover; display:none;'>
	          					<source src='videos/vet/aaa.mp4#t=0,15' id='srcmediaA'/>
	          			  </video>
 	                      <div id='wordingsA' style='height:50%; display:none;'>
	 	                    <div style='height:100%; width:100%; display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; background:transparent; font-style:italic; border-bottom-left-radius:25px; border-bottom-right-radius:25px; border-top-left-radius:25px; border-top-right-radius:25px;'>
	                    		<div id='caption1colval+' style='height:50%; z-index:10; font-size:16px; display:flex; justify-content:center; align-items:center; width:100%;'>
	                      			<div style='color:#000; padding:10px; border-radius:10px; min-width:100px; font-size:22px; font-family:Lucida Calligraphy;'>
	                        		</div>
	                      		</div>
		                        
                 			</div>
                 		  </div>
 	                    </div>
 	               			<div id='boxB' style='height:600px; width:100%; position:absolute; top:40%; background:transparent; display:flex; z-index:200; pointer-events:none;'>
	        					<div style='align-self:center; width:80%; pointer-events: auto; margin-left:auto; margin-right:auto; display:flex; flex-direction:column; justify-content:center; align-items:center; filter:drop-shadow(.5px 0 .5px #888) drop-shadow(-.5px -.5px .5px #888);'>
										
										<div style='margin-bottom:-30px; z-index:20; border-radius:50%; width:50px; height:50px;'>	
											<span class='material-icons spinna' style=' background:rgba(255, 255, 255, .2); padding:7px; border-radius:50%; font-size:30px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xea5b;</span>
		                            
				                    		<p id='timespan' style='font-size:10px; filter:drop-shadow(1px 1px .5px #444); margin-top:-5px; color:#fff; font-weight:500;'>
				                    		0
				                    		</p>
				                  		</div>

		                            <img src='' loading='lazy' id='imgB' class='flexible' style='background:rgba(255,255,255, .1); width:100%; object-fit:cover; height:250px; position:relative; top:0; margin-top:0; display:none; border-top-right-radius:20px; border-top-left-radius:20px; '/>
		                            <video autoplay loop id='mediaB' class='flexible2' style='width:100%; object-fit:cover; height:252px; position:relative; top:0; bottom:-2px; display:none; border-top-right-radius:20px; border-top-left-radius:20px;'>
												        	<source src='videos/vet/aaa.mp4' id='srcmediaB'/>
		        										</video>

																
                            <figcaption style='height:180px; text-align:left; z-index:10; padding:2px; position:absolute; left:1.5%; color:#fff; width:60%;'>
                                <div style='z-index:11; padding:15px 10px 15px 15px; width:100%; border-radius:10px; background:rgba(0, 0, 0, .1); border:5px solid rgba(0, 0, 0, .1);'>
                                <div style='font-size:17px; text-shadow:1px 1px 1px #444;' id='uname'>@username</div>
                                <div style='font-size:12px; text-shadow:1px 1px 1px #444; margin-top:2px;'>G258 | Sol223 | Tutor</div>
                                <div style='font-size:13px; text-shadow:1px 1px 1px #444; color:#fff; margin-top:10px'>Trials <span style='color:#0f0;'>054</span> | <span style='color:red;'>02</span></div>
                                <div style='font-size:13px; text-shadow:1px 1px 1px #444; color:#fff; margin-top:1px; display:flex; justify-content:flex-start; align-items:center;'>
                                    <span class='material-icons' style='color:#fff; margin-right:2px; font-size:14px;'>&#xe410;</span><span id='solscriptImgTotal'>0</span>
                                    <span class='material-icons' style='color:#fff; margin-left:5px; margin-right:2px; font-size:14px;'>&#xe41b;</span><span id='solscriptVidTotal'>0</span>

                                </div>
                                <div style='font-size:13px; text-shadow:1px 1px 1px #444; color:#fff; display:flex; justify-content:flex-start; align-items:center;'>
                                    <span class='material-icons' style='color:#fff; margin-right:2px; font-size:16px;'>&#xe0c8;</span>
		                            Ibadan</div>
                                <div style='font-size:12px; text-shadow:1px 1px 1px #444; color:yellow; display:flex; justify-content:flex-start; align-items:center;'>
                                <span class='material-icons' style='color:#fff; margin-right:2px; font-size:18px;'>&#xebcc;</span><span id='pubDate'>00.00.2024</span></div> 
                                <div style='font-size:13px; text-shadow:1px 1px 1px #444; color:yellow; display:flex; justify-content:flex-start; align-items:center;'><span class='material-icons' style='color:#fff; margin-right:2px; font-size:18px;'>&#xe8b5;</span><span id='timespan2'>3mins</span></div>
                                </div>
                            </figcaption>
        				
		        					<div style='display:flex; background:rgba(255,255,255, .1); border:1px solid #fff; border-top:0.5px solid #fff; border-bottom-right-radius:20px; border-bottom-left-radius:20px; padding-top:1px; padding-bottom:-10px; justify-content:space-between; align-items:center; width:100%; margin-top:2px;'>
				                  			
				                  		<div style='display:flex; flex-direction:column; justify-content:center; align-items:center; padding:0; margin-left:20px; margin-right:auto;' href='index.php?page=tutor&category=category_id&categoryPass=catPass'>
	                                		<span class='material-icons' style='font-size:16px; font-weight:500; color:deepskyblue; background:#fff; border-radius:50%; margin-top:10px; margin-bottom:-10px; z-index:10; filter:drop-shadow(0 0 0 0);'>&#xe147;</span>
	                                		</span>
		                                	<img id='tutorImg' src='' class='flexible' loading='lazy' style='height:32px; width:32px; border-radius:50%; border: 2px solid #fff; box-size:border-box; background:#fff;'>
		                            		<a id='tutorImgLink' href='index.php?page=tutor&category=category_id&categoryPass=catPass'>
	    	                            	<p style='font-size:10px; filter:drop-shadow(1px 1px .5px #444); color:#fff;' id='meetTutor'>Consult</p>
	        	                    		</a>
	        	                     	</div>

		        						<span style='padding:0; margin-left:auto; margin-right:auto;'>
	                                        <span class='material-icons' style='padding:5px; font-size:24px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xe866;</span>
		  		                    		<p id='bkmark' style='font-size:10px; filter:drop-shadow(1px 1px .5px #444); margin-top:-12px; color:#fff; font-weight:600;'>
				                    		0
				                    		</p>
				                  		</span>
				                  		<div style='padding:0; margin-left:auto; margin-right:auto;'>
				                  			<span onclick='paymentSubpage();' id='_contentScript2' class='hover' style='display:flex; flex-direction:column; justify-content:center; align-items:center; text-decoration:none; margin-right:auto; margin-left:auto; color:#fff;'>
				                  		      	<span class='material-icons' style='border:2px solid #fff; background:rgba(255,255,255, .3); border-radius:50%; padding:5px; font-size:36px; color:#fff'>&#xef6e;</span>
                    				        	<span style='font-size:10px; color:#fff; font-weight:400;'>
                    						        Script
                    					        </span>
                                            </span>
		        						</div>
										<div style='padding:0; margin-left:auto; margin-right:auto;'>
				                  			 <span onclick='likeDis(\"\");' id='like' class='material-icons' style='pointer-events:auto; font-size:24px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xe87d;</span>
                         			 		<p id='totalLikes' style='color:#fff; filter:drop-shadow(1px 1px .5px #555); font-weight:600; font-size:10px; margin-top:-12px;'>0
				                  			</p>
				                  		</div>
				                  		<div id='shareContent' style='padding:0; margin-left:auto; margin-right:20px;'>
			                  		    	 <span class='material-icons' style='font-size:24px; transform:rotateY(180deg); filter:drop-shadow(1px 1px .5px #555); color:#fff;'>&#xe15e;</span>
            		                  			<p id='totalShares' style='font-size:10px; filter:drop-shadow(1px 1px .5px #444); margin-top:-12px; color:#fff; font-weight:600;'>
			                  						0
			                  					</p>
			                  			</div>

		        					</div>
        						</div>
        					</div>";
 }						

 if($rand > 15){
$scriptPanel .="<div id='box' style='margin-bottom:1px; height:100vh; border-bottom:2px solid #aaa; background:#fff;'>
	                      <figcaption id='caption1colval' style='z-index:10; position:absolute; margin-top:auto; left:0; width:100%; height:100%; font-size:12px; display:flex; flex-direction:column; justify-content:center; align-items:center; pointer-events:none;'>
	                        <div style='display:flex; margin-top:25%; margin-bottom:auto; flex-direction:column; justify-content:center; align-items:center;'>
		                        	 <div style='margin-top:auto; margin-bottom:auto; color:rgba(255,255,255); min-width:100px; pointer-events:auto;'>
		                       			<span onclick='paymentSubpage();' id='_contentScript' style='text-decoration:none; display:flex; justify-content:center; align-items:center;'>
		                        			<div id='headingA' style='font-size:18px; text-shadow:2px 2px 2px #2166f3; color:#fff; margin:auto 10px auto 10px;'>
		                            	    </div>
		                          	        <span id='insightBtn' onclick='viewInsight();' class='material-icons spinna' style='display:none; color:#2166f3; font-size:20px; margin-left:10px; pointer-events:auto; background:#fff; border-radius:50%;'>&#xe88e;</span>
		                                </span>
		                       		 </div>
		                       		 <div style='font-size:50px; margin-top:100px; color:rgba(255,255,255,.2); font-family:roboto;'>BEFORE</div>
		                    </div>
	                        <div id='insight' style='z-index:25; background:rgba(210,255,255,.6); display:none; width:100%; margin-top:auto; text-align:justify; color:#fff; padding:20px; padding-right:20px; overflow:scroll-y; border-top-right-radius:20px; border-top-left-radius:20px;'></div>

	                      </figcaption>
	                      <img src='' loading='lazy' id='imgA' class='flexible' class='flexible' style='width:100%; height:100%; object-fit:cover; display:none;'/>
	                      <video autoplay id='mediaA' class='flexible2' style='width:100%; height:100%; object-fit:cover; display:none;'>
	          					<source src='videos/vet/aaa.mp4#t=0,15' id='srcmediaA'/>
	          			  </video>
 	                      <div id='wordingsA' style='height:50%; display:none;'>
	 	                    <div style='height:100%; width:100%; display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; background:transparent; font-style:italic; border-bottom-left-radius:25px; border-bottom-right-radius:25px; border-top-left-radius:25px; border-top-right-radius:25px;'>
	                    		<div id='caption1colval+' style='height:50%; z-index:10; font-size:16px; display:flex; justify-content:center; align-items:center; width:100%;'>
	                      			<div style='color:#000; padding:10px; border-radius:10px; min-width:100px; font-size:22px; font-family:Lucida Calligraphy; '>
	                        		</div>
	                      		</div>
		                        
                 			</div>
                 		  </div>
 	                    </div>

 	               			<div id='boxB' style='height:600px; width:100%; position:absolute; bottom:0; background:transparent; display:flex; z-index:200; pointer-events:none;'>

							<div style='align-self:flex-end; background:rgba(255,255,255, .4); border:1px solid #fff; width:70%; pointer-events: auto; margin-bottom:50px; margin-left:auto; margin-right:20px; border-radius:40px; padding:10px 20px; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
 	               			    <div style='display:flex; width:100%; justify-content:center; align-items:center; color:#fff; font-size:16px;'>AFTER</div>
	                            <img src='' loading='lazy' id='imgB' class='flexible' style='background:rgba(255,255,255, .1); width:250px; object-fit:cover; height:200px; position:relative; top:0; margin-top:0; display:none; border-radius:20px;'/>
	                            <video autoplay loop id='mediaB' class='flexible2' style='width:250px; object-fit:cover; height:200px; position:relative; top:0; display:none; border-radius:20px;'>
											        	<source src='videos/vet/aaa.mp4' id='srcmediaB'/>
	        										</video>

                                <div style='font-size:10px; margin-top:20px;'>
                                    <h6>Click script for detail</h6>
                                </div>															

	        					<div style='display:flex; justify-content:space-around; align-items:center; width:100%; margin-top:10px; height:50px;'>
    			                  	<div style='margin-left:auto; margin-right:auto; margin-bottom:30px;'>
    								    <a href='' id='' class='hover' style='text-decoration:none; font-size:12px; padding:10px 34px; border:1px solid #fff; background:rgba(255,255,255,.6); color:#2166f3; border-radius:50px; margin-right:auto; margin-left:auto;'>Follow</a>
    								</div>
    								<div style='margin-left:auto; margin-right:auto; margin-bottom:30px;'>
    								    <span onclick='paymentSubpage();' id='_contentScript' class='hover' style='text-decoration:none; font-size:12px; padding:10px 34px; background:#2166f3; border-radius:50px; margin-right:auto; margin-left:auto; color:#fff;'>Script</span>
    								</div>
    	        				</div>
                        	</div>
        				
        				<div style='display:flex; flex-direction:column; justify-content:space-between; margin-right:14px; align-self:center; margin-bottom:50px;'>
                                    <div style='padding:0; margin-top:10px; display:flex; flex-direction:column; pointer-events:auto; '>
        			            	<a id='tutorImgLink' href='index.php?page=tutor&category=category_id&categoryPass=catPass'>
                	                           <img id='tutorImg' src='' class='flexible' loading='lazy' style='height:65px; width:65px; border-radius:50%; border: 2px solid #fff; background:#fff;'>
                                              <span style='font-size:12px; filter:drop-shadow(1px 1px .5px #444); margin-top:1px; color:#fff; font-weight:600; display:block;' id='meetTutor'>Consult</span>
                                    </a>
                                    </div>
                                    <div style='padding:0; margin-top:30px; display:flex; flex-direction:column; pointer-events:auto; '>
                          			  <span onclick='likeDis(\"\");' id='like' class='material-icons' style='pointer-events:auto; font-size:48px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xe87d;</span>
                         			  <span id='totalLikes' style='color:#fff; margin-top:-4px; filter:drop-shadow(1px 1px .5px #444); font-weight:600; font-size:14px;'>0
                              		  </span>
                           			</div>
                                    <div id='shareContent' style='display:flex; flex-direction:column; margin-top:10px; pointer-events:auto; '>
                              		   <span class='material-icons' style='font-size:42px; transform:rotateY(180deg); filter:drop-shadow(1px 1px .5px #555); color:#fff;'>&#xe15e;</span>
            		                     <span id='totalShares' style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); color:#fff; font-weight:600; margin-top:-2px;'>
                              			0
                              	    	 </span>
                              	   </div>
                              	   	<div style='margin-top:10px;'>
                          				<span class='material-icons spinna' style=' background:rgba(0, 0, 0, .1); padding:5px; border-radius:50%; font-size:34px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xea5b;</span>
		                                <p id='timespan' style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); margin-top:-10px; color:#fff; font-weight:600;'>
                    						0
                    					</p>
                  				</div>

                              	

                                    
        				</div>
        					</div>";
 }						

 if($rand > 5){

 		$scriptPanel.="<div id='box' style=' margin-bottom:0; height:45.5%; position:relative; background:#fff;'>
	                      <figcaption id='caption1colval' style='z-index:10; position:absolute; margin-top:auto; left:0; width:100%; height:100%; font-size:12px; display:flex; flex-direction:column; justify-content:center; align-items:center; pointer-events:none;'>
	                        <div style='display:flex; margin-top:auto; margin-bottom:auto; flex-direction:column; justify-content:center; align-items:center;'>
		                        <div style='margin-top:auto; margin-bottom:auto; color:rgba(255,255,255); padding:10px 20px 10px 20px; background:rgba(255, 255, 255, 0.1); min-width:100px; border-radius:5px;'>
		                          	<div id='headingA' style='font-size:16px; text-shadow:1px 1px 1px #444;'>
		                            </div>
		                            <div style='font-size:10px; font-weight:500; text-decoration:underline; font-style:italic;'>
		                            <span onclick='paymentSubpage();' id='_contentScript' style='color:#fff; pointer-events:auto;'>View solution in script</span>
		                            </div>
		                        </div>
		                        <span id='insightBtn' onclick='viewInsight();' class='material-icons spinna' style='display:none; z-index:50; margin-top:20px; color:rgba(255, 255, 255, 0.3); font-size:35px; pointer-events:auto;'>&#xe88e;</span>
		                        
	                        </div>
	                        <div id='insight' style='pointer-events:auto; z-index:25; display:none; width:100%; margin-top:auto; text-align:justify; color:#fff; padding:20px; padding-right:20px; overflow:scroll-y; border-top-right-radius:20px; border-top-left-radius:20px;'></div>

	                      </figcaption>
	                      <img src='' loading='lazy' id='imgA' class='flexible' class='flexible' style='width:100%; height:100%; object-fit:cover; position:relative; top:0; display:none;'/>
	                      <video autoplay control loop loading='lazy' id='mediaA' class='flexible2' style='width:100%; height:100%; object-fit:cover; position:relative; top:0; display:none;'>
	          					<source src='videos/vet/aaa.mp4#t=0,15' id='srcmediaA'/>
	          			  </video>
 	                      <div id='wordingsA' style='height:50%; display:none;'>
	 	                    <div style='height:100%; width:100%; display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; background:transparent; font-style:italic; border-bottom-left-radius:25px; border-bottom-right-radius:25px; border-top-left-radius:25px; border-top-right-radius:25px;'>
	                    		<div id='caption1colval+' style='height:50%; z-index:10; font-size:16px; display:flex; justify-content:center; align-items:center; width:100%;'>
	                      			<div style='color:#000; padding:10px; border-radius:10px; min-width:100px; font-size:22px; font-family:Lucida Calligraphy;'>
	                        		</div>
	                      		</div>
		                        
                 			</div>
                 		  </div>
 	                    </div>
 	                    
						<div id='boxB' style='height:55%; background:#fff; display:block; margin-top:1px;'>
	                    
						<div id='wordingsB' style='height:100%; display:none;'>
	 	                    <div style='height:100%; width:100%; display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; background:transparent; font-style:italic; border-bottom-left-radius:25px; border-bottom-right-radius:25px; border-top-left-radius:25px; border-top-right-radius:25px;'>
	                    		<div id='caption1' style='height:50%; z-index:10; background:transparent; font-size:12px; display:flex; justify-content:center; align-items:center; width:100%;'>
	                        		<div style='color:#fff; padding:5px 15px 10px 15px; border:1px solid #aaa; background:rgba(255, 255, 255, 0.2); text-shadow:1px 1px 1px #000; border-radius:10px; min-width:100px;'>
	                          			<div style='border-bottom:1px solid #aaa; margin-bottom:10px; font-size:15px;'>
	                          				SOLUTION
	                          			</div>
	                            		<div style='font-size:14px;'>
	                            			Click script to view
	                            		</div>
	                          		</div>
	                    		</div>
                 			</div>
                 		</div>

                            <img src='' loading='lazy' id='imgB' class='flexible' style='width:100%; object-fit:cover; height:100%; position:relative; top:0; margin-top:0; display:none;'/>
                            <video autoplay loop id='mediaB' class='flexible2' style='width:100%; object-fit:cover; height:100%; position:relative; top:0; bottom:-20px; display:none;'>
					        	<source src='videos/vet/aaa.mp4' id='srcmediaB'/>
        					</video>
        				</div> 
        				<figcaption style='height:160px; text-align:left; z-index:10; padding:2px; position:absolute; top:72%; left:5px; color:#fff; width:45%;'>
                                <div style='z-index:11; padding:1px; width:100%; border-radius:10px; display:inline-flex; flex-direction:column; margin:1px; background-image:radial-gradient(rgba(255, 255, 255, 0.1), transparent);'>
                                <div style=''><span style='font-size:18px; text-shadow:1px 1px 1px #444; color:#fff; font-weight:bold;' id='uname'>@username</span></div>
                                <div style='margin-top:-6px; width:110px; height:2px; background:#fff; color:#fff; filter: drop-shadow(1px 1px 1px #444);'></div>
                                <div style='margin-top:-10px;'><span style='font-size:13px; text-shadow:1px 1px 1px #444; color:#fff; font-weight:bold;'>
                                    <span style='display:inline-flex; justify-content:flex-start; align-items:center;'>
                                       <span class='material-icons' style='color:#fff; margin-right:2px; font-size:14px;'>&#xe1b2;</span>
  		                             G158 | Sol223</span>
  		                             </span>
  		                        </div>
                                <div style='margin-top:-26px;'>
                                        <span style='display:inline-flex; justify-content:flex-start; align-items:center; font-size:13px; font-weight:600; text-shadow:1px 1px 1px #444; color:#fff;'>
                                            <span class='material-icons' style='color:#fff; margin-right:2px; font-size:14px;'>&#xeb7b;</span>
  		                                Trial 854
		                                </span>
		                        </div>

                                <div style='margin-top:-16px;'>
                                    <span style='font-size:12px; text-shadow:1px 1px 1px #444; color:#fff; margin-top:10px; border-radius:4px; display:flex; align-items:flex-start; justify-content:flex-start;'>
                                        <span class='material-icons' style='color:#fff; text-shadow:1px 1px 1px #444; margin-right:2px; font-size:14px;'>&#xe410;</span><span id='solscriptImgTotal'>0</span>
                                        <span class='material-icons' style='color:#fff; text-shadow:1px 1px 1px #444; margin-left:8px; margin-right:2px; font-size:14px;'>&#xe41b;</span><span id='solscriptVidTotal'>0</span>
                                        <span class='material-icons' style='color:#fff; text-shadow:1px 1px 1px #444; margin-left:8px; margin-right:2px; font-size:14px;'>&#xe405;</span><span id='solscriptAudTotal'>0</span>
                                    </span>
                                </div>
                                <div style='margin-top:-12px;'>
                                    <span style='font-size:12px; text-shadow:1px 1px 1px #444; color:#fff; display:inline-flex; justify-content:flex-start; align-items:flex-end;'>
                                            <span class='material-icons' style='color:#fff; margin-right:2px; font-size:15px;'>&#xe422;</span>
  		                                <span id='timespan2'>3min</span>
                                    </span>
                                </div>
                                <div style='margin-top:-24px;'>
                       
                                        <span style='display:inline-flex; justify-content:flex-start; align-items:center; font-size:13px; text-shadow:1px 1px 1px #444; color:#fff;'>
                                            <span class='material-icons' style='color:#fff; margin-right:2px; font-size:14px;'>&#xe0c8;</span>
  		                                Ibadan
		                                </span>
		               
                                </div> 
                                <div style='margin-top:-22px;'>
                                    <span style='font-size:12px; text-shadow:1px 1px 1px #444; color:#fff; display:inline-flex; justify-content:flex-start; align-items:flex-end;'>
                                        <span class='material-icons' style='color:#fff; margin-right:2px; font-size:14px;'>&#xebcc;</span>
  		                                <span id='pubDate'>01.01.2024</span>
                                    </span>
                                </div>
                        </figcaption>
        				<figcaption style='font-size:14px; height:40%; z-index:10; padding:2px 0px 2px 3px; position:absolute; top:49%; right:0; background:transparent; color:#fff;'>
                            <div style='display:flex; flex-direction:column; height:100%; align-items:flex-end; justify-content:center; width:100%; z-index:1;'>
                              <div style='display:flex; flex-direction:column; margin-left:auto; min-height:45vh; align-items:center; margin-top:0px; padding:5px 1px 5px 5px; z-index:20; border-radius:20px; margin-right:0;'>
                                <div id='pagecap' style='font-size:28px; margin-top:-5px; display:flex; flex-direction:row; filter:drop-shadow(1px 1px 1px #aaa); background:rgba(50, 50, 50, .1); padding:5px; '>
                                  <div style='width:4px; height:4px; background:#fff; border-radius:50%;'></div>
                                  <div style='width:4px; height:4px; background:#fff; border-radius:50%; margin-left:5px;'></div>
                                  <div style='width:4px; height:4px; background:#fff; border-radius:50%; margin-left:5px;'></div>
                                </div>
                                <div id='tutorImgLink' style='margin-top:3px;' href='index.php?page=tutor&category=category_id&categoryPass=catPass'>
	                                <img id='tutorImg' src='' class='flexible' loading='lazy' style='height:58px; width:58px; border-radius:50%; border: 2px solid #fff; box-size:border-box; background:#fff;'>
    	                            <a id='tutorImgLink' style='' href='index.php?page=tutor&category=category_id&categoryPass=catPass'>
    	                              <p style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); margin-top:1px; color:#fff; font-weight:600;' id='meetTutor'>Consult</p>
        	                        </a>
        	                   <div>

                  				<div style='margin-top:0.5px;'>
                  			       <span onclick='likeDis(\"\");' id='like' class='material-icons' style=' background:rgba(0, 0, 0, .1); padding:3px; border-radius:50%; font-size:38px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xe87d;</span>
		                       
                  					<p id='totalLikes' style='color:#fff; filter:drop-shadow(1px 1px .5px #555); font-weight:600; font-size:12px; margin-top:-6px;'>0
                  					</p>
                  				</div>
                  				<div style='margin-top:-16px;'>
                  					<div id='shareContent' >
                  				
                  				  <span class='material-icons' style='font-size:38px; transform:rotateY(180deg); filter:drop-shadow(1px 1px .5px #555); color:#fff; background:rgba(50, 50, 50, .1); padding:2px; border-radius:50%;'>&#xe15e;</span>
		                       
                  						<p id='totalShares' style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); margin-top:-8px; color:#fff; font-weight:600;'>
                  							0
                  						</p>
                  					</div>
                  				</div>
                  				<div style='margin-top:-10px;'>
                  					<div id='favorite' onclick = 'saveFav();'>
                  				
                  				  <span id='favIcon' class='material-icons' style='font-size:32px; filter:drop-shadow(1px 1px .5px #555); color:#fff; background:rgba(50, 50, 50, .1); padding:2px; border-radius:50%;'>&#xe866;</span>
		                       
                  						<p id='totalFavs' style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); margin-top:-6px; color:#fff; font-weight:600;'>
                  							0
                  						</p>
                  					</div>
                  				</div>

                  				<div style='margin-top:-10px;'>
                  					<span onclick='paymentSubpage();' id='_contentScript2' style=''>
                  		        		<span class='material-icons' style=' background:rgba(0, 0, 0, .1); padding:5px; border-radius:50%; font-size:30px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xef6e;</span>
		                       	
                    					<p style='font-size:13px; filter:drop-shadow(1px 1px .5px #444); margin-top:-4px; color:#fff; font-weight:600;'>
                    						Script
                    					</p>
                  					</span>
                  				</div>
                  				<div style='margin-top:-10px;'>
                  				<span class='material-icons spinna' style=' background:rgba(0, 0, 0, .1); padding:5px; border-radius:50%; font-size:24px; filter:drop-shadow(1px 1px .5px #444); color:#fff'>&#xea5c;</span>
		                       
                                    <p id='timespan' style='font-size:10px; filter:drop-shadow(1px 1px .5px #444); margin-top:-2px; color:#fff; font-weight:600;'>
                    						0
                    					</p>
                  				</div>

                			  </div>
              			    </div>
            		    </figcaption>";
    }
$scriptPanel .="    </div>
                </div>
			</div>
			<div id='bottomscript'>
				<form>
				<input type='hidden' name='A-src' id='A-src'/>
				
				<input type='hidden' name='total_Likes' id='total_Likes'/>
				<input type='hidden' name='total_Favs' id='total_Favs'/>
				<input type='hidden' name='LikeStatus' id='LikeStatus'/>
				<input type='hidden' name='favStatus' id='FavStatus'/>

				<input type='hidden' name='productID' id='productID' />
				<input type='hidden' name='pubID' id='pubID' />

				<input type='hidden' name='start' id='start' />
				<input type='hidden' name='topList' id='topList' value='' />


				<input type='hidden' name='focuspg' id='focuspg' value='' >
				<input type='hidden' name='bottomList' id='bottomList' value='' >
				</form>
			</div>
		</div>";
$scriptPanel .= $this->searchPanel();

	return $scriptPanel;
}


public function solscripts(){
	 //INNER JOIN agrovet USING (agro_id) INNER JOIN Health USING (hth_id)
	$oda = rand(1, 5);
	$pri = rand(1, 2);
	
	$oda == 1 ? $ORDER ='published' : ($oda == 2 ? $ORDER = 'tL' : $ORDER = 'heading');
	$pri == 1 ? $PRIORITY = 'ASC' : $PRIORITY = 'DESC';  
	//$PRIORITY = 
	$pub = $this->select('publish', ' WHERE pub_id > ? ORDER BY '.$ORDER.' '.$PRIORITY, 0);
	$ln = count($pub) - 1;
	$all = count($pub) - 1;

	$meData = $this->fetchUser();
	$me = $meData[0]['profile_id'];
	$xpt = $meData[0]['xpt'];


	$appo_data = $this->select('appointment', ' WHERE profile_id = ?', $me);
	count($appo_data) > 0 ? $freetime = $appo_data[0]['freetime'] : $freetime = '_'; 
	count($appo_data) > 0 ? $fixedtime = $appo_data[0]['fixedtime'] : $fixedtime = '_';

		//get new notes notification set
	$vals = '0, '.$me;
	$newNotes = $this->select('xnote', ' WHERE iview = ? AND target_id = ?', $vals);
	$xpt == 0 ? $url = 'enquiry' : $url = 'response';
	$n = count($newNotes);
	$n > 0 ? $allnew = "<sub style='margin-left:-2px; color:#fff; height:20px; width:20px; background:transparent; padding:3px; border-radius:50%; font-weight:bold; font-size:12px; margin-left:-1px;'>".$n."</sub>" : $allnew = '';

	$output = "<div style='display:flex; flex-direction:column; width:100vw; overflow:scroll; background:#ddd;'>
	<nav style='width:100%; padding:10px; position:fixed; top:0; background:rgba(0,0,0,.4); z-index:20; display:flex; justify-content:space-around; align-items:center;'>
		<a href='scrolls' style='background:transparent;'><i class='fa fa-home' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i></a>
		<a href='$url' style='background:transparent;'>
			<i class='fa fa-plus' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i>
		</a>
		<a href='index.php?page=classes' style='background:transparent;'><i class='fa fa-users' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i></a>

		<span style='background:transparent;'  onclick='$(\"#searchPanel\").slideDown();'><i class='fa fa-search' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i></span>";
		$xpt == 1 ? $output .="
		<span style='background:transparent;' onClick='$(\".showpanel\").slideDown()'><i class='fa fa-calendar' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i></span>" : $output .='';

		$output .="
		<a href='note' style='background:transparent;'><i class='fa fa-bell' style='color:#000; filter:drop-shadow(1px 1px .5px #fff) drop-shadow(-.5px -.5px .5px #fff);'></i>$allnew</a>

	</nav>";
/////////////

$output .="<div class='showpanel' style='display:none; padding:5px; position:fixed; top:40px; left:5px; right:5px; margin:10px; z-index:25; background:rgba(255, 255, 255, .1); border:1px solid #fff; border-bottom-left-radius:10px; border-bottom-right-radius:10px; filter:drop-shadow(1px 1px 1px #ccc) drop-shadow(-1px 0px 1px #ccc);'>
	                <div style='display:flex; flex-direction:column;'>
			        	<form style='width:100%;' method='post' id='appo_data'>
						<input type='hidden' name='appo' id='appo' value='$freetime'/>
					    <input type='hidden' name='appoday' id='appoday'/>
					
						<div style='width:100%; display:flex; justify-content:center;'>
						    <div style=''>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<select style='padding:10px; font-size:16px; border-radius:10px;' title='day' name='day' id='day'>
										<option value='1'>Sunday</option>
										<option value='2'>Monday</option>
										<option value='3'>Tuesday</option>
										<option value='4'>Wednesday</option>
										<option value='5'>Thursday</option>
										<option value='6'>Friday</option>
										<option value='7'>Saturday</option>
									</select>
								</div>
								<div class='am' id='am2' style='display:flex; margin-bottom: 8px;'>
									<span class='free_am' onclick='setFree(24)' ondblclick='createClass(24)' id='24'>12am</span><span class='free_am' onclick='setFree(1)' ondblclick='createClass(1)' id='1'>1am</span><span class='free_am' onclick='setFree(2)' ondblclick='createClass(2)' id='2'>2am</span><span class='free_am' onclick='setFree(3)' ondblclick='createClass(3)' id='3'>3am</span><span class='free_am' onclick='setFree(4)' ondblclick='createClass(4)' id='4'>4am</span><span class='free_am' onclick='setFree(5)' ondblclick='createClass(5)' id='5'>5am</span>
								</div>
								<div class='am' id='am1' style='display:flex; margin-bottom: 8px;'>
									<span class='free_am' onclick='setFree(6);' ondblclick='createClass(6)' id='6'>6am</span><span class='free_am' onclick='setFree(7);' ondblclick='createClass(7)' id='7'>7am</span><span class='free_am' onclick='setFree(8);' ondblclick='createClass(8)' id='8'>8am</span><span class='free_am' onclick='setFree(9);' ondblclick='createClass(9)' id='9'>9am</span><span class='free_am' onclick='setFree(10);' ondblclick='createClass(10)' id='10'>10am</span><span class='free_am' onclick='setFree(11);' ondblclick='createClass(11)' id='11'>11am</span>
								</div>
								<div class='pm' id='pm1' style='display:flex; margin-bottom: 8px;'>
									<span class='free_pm' onclick='setFree(12);' ondblclick='createClass(12)' id='12'>12pm</span><span class='free_pm' onclick='setFree(13);' ondblclick='createClass(13)' id='13'>1pm</span><span class='free_pm' onclick='setFree(14);' ondblclick='createClass(14)' id='14'>2pm</span><span class='free_pm' onclick='setFree(15);' ondblclick='createClass(15)' id='15'>3pm</span><span class='free_pm' onclick='setFree(16);' ondblclick='createClass(16)' id='16'>4pm</span><span class='free_pm' onclick='setFree(17);' ondblclick='createClass(17)' id='17'>5pm</span>
								</div>
								<div class='pm' id='pm2' style='display:flex; margin-bottom: 8px;'>
									<span class='free_pm' onclick='setFree(18);' ondblclick='createClass(18)' id='18'>6pm</span><span class='free_pm' onclick='setFree(19);' ondblclick='createClass(19)' id='19'>7pm</span><span class='free_pm' onclick='setFree(20);' ondblclick='createClass(20)' id='20'>8pm</span><span class='free_pm' onclick='setFree(21);' ondblclick='createClass(21)' id='21'>9pm</span><span class='free_pm' onclick='setFree(22);' ondblclick='createClass(22)' id='22'>10pm</span><span class='free_pm' onclick='setFree(23);' ondblclick='createClass(23)' id='23'>11pm</span>
								</div>
								<div style='text-align:center; margin-top: 20px;'>
									<button type='submit' name='save' style='padding:5px; border-radius:5px;'>Save</button>
									<div id='appoReply' style='display:none;' onclick='$(\"#appoReply\").hide();'></div>
								    
								</div>
								
							</div>

						</div>
					</form>
		        	<div style='display:flex; justify-content:space-between; margin-top:25px; padding-left:10px; padding-right:10px; margin-bottom: 2px; font-size:12px; text-shadow:1px 1px 1px #000;'>
						<div onclick='resetAppo();' style='color:#fff'>Reset</div> 
						<div style='margin-left:auto; text-shadow:1px 1px 1px #000; color:#fff' onclick='$(\".showpanel\").slideUp()'>close</div>
					</div>
            	</div></div>";
///////////////////
$output .="<div style='width:100%; padding:1px; position:fixed; background:transparent; z-index:20; display:flex; justify-content:space-around; align-items:center; margin-top:45px;'>
                  
                  <div style='width:100%; display:flex; justify-content:center; color:red;' id='typeOut'>
<p href='' class='typewriter'>...a solution can solve a million similar future problems.
</p></div>
          </div>";
$catPass = $this->enc_cons('FALSE');

$output .= $this->searchPanel();

$output .="<div id='scrollPage'><div id='scrolletY'><input type='hidden' name='scrollval' value='$all' id='scrollval'/>
	 			<input type='hidden' name='upstream' value='scrollet1' id='upstream'/>
	 			<input type='hidden' name='downstream' value='scrollet0' id='downstream'/>
	 			<input type='hidden' name='stream' value='$all' id='stream'/>
	 			<input type='hidden' name='allscr' value='$all' id='allscr'/>
	 			<input type='hidden' name='scrollTop' value='' id='scrollTop'/>
	 			<input type='hidden' name='lastScroll' value='' id='lastScroll'/>";
$category_id ='';

	while($ln >= 0){

	$chat = $this->select('chat', ' WHERE uniq_conv = ? AND media > ?', $pub[$ln]['published'].', 0');
count($chat) > 0 ? $category_id .= $chat[0]['category_id'] : '';

//	$chat2 = $this->select('chat', ' WHERE uniq_conv = ? AND media > ? ORDER BY chat_id DESC', $pub[$ln]['published'].', 0');
//	$chat = $this->select('chat', ' WHERE uniq_conv = ? AND media = ?', $pub[$ln]['published'].', MAX(media)');
	$strDir = '';
	$URL = '';
	$_URL = '';
	$col_val = '';
	$_col_val ='';
	$totalLikes = $pub[$ln]['tL'];
	$meDATA = $this->fetchUser();
	$me = $meDATA[0]['profile_id'];
	$_me = '_'.$me.'_';
    $mediaInUse = '';
	$_mediaInUse = '';
count($chat) > 0 ? $r_ID = $chat[0]['recipient_id'] : $r_ID = '';
$r_pub ='';
$recipient_enc_cons = '';
if(!empty($r_ID) ){
$recipient_enc_cons .= $this->enc_cons($r_ID);


$r_data = $this->select('skyman_user', ' WHERE user_id = ?', $r_ID);
$r_pub .= $r_data[0]['pub'];
}
$que ='';
	strpos($pub[$ln]['likes'], $_me) !== FALSE ? $likeIconColor = 'red' : $likeIconColor = '#fff';
	if(count($chat) > 0){
		$n = count($chat) - 1;
//STARTING MEDIA
$category_id = $chat[0]['category_id'];


		$vet_id = $chat[0]['vet_id'];
		$agro_id = $chat[0]['agro_id'];
		$hth_id = $chat[0]['hth_id'];
		$guide_id = $chat[0]['guide_id'];
		$cook_id = $chat[0]['cook_id'];
		$mediaInUse .= $chat[0]['media'];
		empty($mediaInUse) ? $mediaInUse .='0' : $mediaInUse; 

		$aoi_array = $this->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
		$topic = $aoi_array['topic'];
		$col_id = $aoi_array['col_id'];
		$colval = $aoi_array['colval'];
		$queCol = $aoi_array['queCol'];
		$strDir .= $aoi_array['strDir'];
		
		$med = $this->select($topic, ' WHERE '.$col_id.' = ?', $colval);
		$que .= $med[0][$queCol];
		$URL .= $strDir.'/'.$que;
		$col_val .= $colval;

//ENDING MEDIA
		$_vet_id = $chat[$n]['vet_id'];
		$_agro_id = $chat[$n]['agro_id'];
		$_hth_id = $chat[$n]['hth_id'];
		$_guide_id = $chat[$n]['guide_id'];
		$_cook_id = $chat[$n]['cook_id'];
		$_mediaInUse .= $chat[$n]['media'];

		$_aoi_array = $this->aoi_cht($_agro_id, $_vet_id, $_hth_id, $_guide_id, $_cook_id);
		$_topic = $_aoi_array['topic'];
		$_col_id = $_aoi_array['col_id'];
		$_colval = $_aoi_array['colval'];
		$_queCol = $_aoi_array['queCol'];
		$_col_val .= $_colval;

		$_strDir = $_aoi_array['strDir'];
		
		$_med = $this->select($_topic, ' WHERE '.$_col_id.' = ?', $_colval);
		//var_dump($strDir);
//var_dump($queCol);
		$_URL .= $_strDir.'/'.$_med[0][$_queCol];


	}
/*	elseif(count($chat) == 0){

	}*/

$published_dec = $this->dec_cons($pub[$ln]['published']);
$published_enc = $pub[$ln]['published'];
$pub_id = $this->encryptor0($pub[$ln]['pub_id']);


$pub_array = explode("_", $published_dec);
			
//Groupchat search check is needed here
$chatpop = $pub[$ln]['chatpop'];


$key = $published_enc;

$chatpop == 'd' ? 
	$shrd_data = $this->select2('sharedkey', ' WHERE ucid = ?', $published_enc) : '';
$chatpop == 'd' ? 
	$shrdKey = $this->dec_cons($shrd_data[0]['sk']) : 
	$shrdKey = $key;
	
	$_SESSION[$key] = $this->enc_cons($shrdKey);
	



			$sender = $this->encryptor0($pub_array[0]);
			$tutorID = $this->decryptor0($sender);
			$tutor = $this->fetchProfile($tutorID);
			//$tutorImg = $tutor[0]['picture'];
			$tutorImg = $this->generate_DP($tutorID, '50px', '');


			$chatpop == 'm' ? $recipient = 0 :
			$recipient = $this->encryptor0($pub_array[1]);

			$convid = $this->encryptor0($pub_array[2]);
$_published_enc = $this->cutSpecialChars($published_enc);
//<figcaption id='caption1".$col_val."' style='font-size:16px; height:20vh; border-radius:50%; display:flex; align-items:center; justify-content:center; width:20vh; z-index:2; background:#fff; opacity:1; position:relative; top:-15vh; right:-30%; padding:15px; filter:drop-shadow(1px 1px 1px #dcc); border:5px solid deepskyblue;' class='flexibleTxt'><span style='color:red;'>".ucfirst($pub[$ln]['heading'])."</span></figcaption>
	 $up = intval($ln)+1; 
	 $up > $all ? $up = $all : $up;
	 $down = intval($ln) - 1;
	 $down < 0 ? $down = 0 : $down;
	 $output .= "
<div id='scrollet".$ln."' class='scrollet' style='content-visibility:auto; contain-intrinsic-size: 1px 100px; scroll-snap-align: start; height:100vh; width:100%; background:#eee; display:flex; flex-direction:column; justify-content:center; align-items:center; font-weight:bold; font-size:30px; border-bottom:1px solid #ddd; margin-bottom:15px; filter:drop-shadow(2px 2px 1px #bbb) drop-shadow(-2px -2px 1px #bbb);'>
	 			<div style='position:relative; height:100%; width:100%; text-align:center; z-index:2; background:#eee; border-radius:20px;'>
	 			<input type='hidden' name='mediaURL".$ln."' value='$URL' id='mediaURL".$ln."'/>
	 			<input type='hidden' name='media_URL".$ln."' value='$_URL' id='media_URL".$ln."'/>
	 			<input type='hidden' name='mediaType".$ln."' value='$mediaInUse' id='mediaType".$ln."'/>
	 			<input type='hidden' name='media_Type".$ln."' value='$_mediaInUse' id='media_Type".$ln."'/>
	 			<input type='hidden' name='cov".$ln."' value='$col_val' id='cov".$ln."'/>
	 			<input type='hidden' name='cov2".$ln."' value='$_col_val' id='cov2".$ln."'/>
	 			<input type='hidden' name='ln".$ln."' value='".$ln."' id='ln".$ln."'/>

	 				<figure style='height:100%;'>";
 			/*

<figcaption id='caption1".$col_val."' style='z-index:10; position:relative; top:30vh; font-size:12px; display:flex; justify-content:center; align-items:center; width:100%;'>
 				<div style='color:#fff; padding:10px; background:rgba(255, 255, 255, 0.2); border:1px solid #fff; border-radius:10px; min-width:100px;'>
 					<div style='border-bottom:1px solid #eee; margin-bottom:10px;'>DISCUSS</div>
 					<div>".ucfirst($pub[$ln]['heading'])."</div>
 				</div>
 			</figcaption>

 			*/
 			$mediaInUse == 2 ? $mediaA = "<img src='' loading='lazy' id='media".$ln."' class='flexible' class='flexible' style='width:100%; height:100%; object-fit:cover; border-top-left-radius:25px; border-top-right-radius:25px; position:relative; top:0; margin-top:-14%;'/>" : ($mediaInUse == 3 ? 
 				$mediaA = "<video autoplay control loop loading='lazy' id='media".$col_val."' class='flexible2' style='width:100%; height:100%; object-fit:cover; border-top-left-radius:25px; border-top-right-radius:25px; position:relative; top:0; margin-top:-14%;'>
					<source src='videos/vet/aaa.mp4#t=0,15' id='srcmedia$col_val'/>
				</video>" : $mediaA = '');

 			!empty($URL) ? 
 			$output .= "
 			<div style='height:50%;'>
 				<figcaption id='caption1".$col_val."' style='z-index:10; position:relative; top:30%; font-size:12px; display:flex; justify-content:center; align-items:center; width:100%;'>
 					<div style='color:rgba(255,255,255); padding:5px 15px 6px 15px; background:rgba(255, 255, 255, 0.2); border-radius:10px; min-width:100px; border:1px solid #bbb;'>
 						<div style='border-bottom:1px solid #aaa; margin-bottom:5px; font-size:12px; text-shadow:-1px 1px 1px #000;'>DISCUSS</div>
 						<div style='font-size:10px; text-shadow:1px 1px 1px #000;'>".ucfirst($pub[$ln]['heading'])."</div>
 							
 					</div>
 				</figcaption>
 				$mediaA
 			</div>" :

 			$output .="<div style='height:100%; width:100%; display:flex; flex-direction:column; justify-content:flex-start; align-items:flex-start; background:transparent; font-style:italic; border-bottom-left-radius:25px; border-bottom-right-radius:25px; border-top-left-radius:25px; border-top-right-radius:25px;'>
 					<div id='caption1".$col_val."' style='height:50%; z-index:10; font-size:16px; display:flex; justify-content:center; align-items:center; width:100%; background:#fff;'>
 						<div style='color:#000; padding:10px; border-radius:10px; min-width:100px; font-size:22px; font-family:Lucida Calligraphy;'>
 							<div>".ucfirst($pub[$ln]['heading'])."</div>
 						</div>
 					</div>

					<div id='caption1".$col_val."' style='height:50%; z-index:10; background:deepskyblue; font-size:12px; display:flex; justify-content:center; align-items:center; width:100%;'>
						<div style='color:#fff; padding:5px 15px 10px 15px; border:1px solid #aaa; background:rgba(255, 255, 255, 0.2); text-shadow:1px 1px 1px #000; border-radius:10px; min-width:100px;'>
							<div style='border-bottom:1px solid #aaa; margin-bottom:10px; font-size:15px;'>SOLUTION</div>
							<div style='font-size:14px;'>Click script to view</div>
						</div>
					</div>
 			</div>";
 			$_mediaInUse == 2 ? $mediaB = "<img src='' loading='lazy' id='media2".$_col_val."' class='flexible' style='width:100%; object-fit:cover; height:100%; position:relative; top:0; margin-top:5px; border-bottom-left-radius:25px; border-bottom-right-radius:25px; margin-top:-14%;'/>" :	($_mediaInUse == 3 ? 
 				$mediaB = "<video controls autoplay id='media2".$_col_val."' class='flexible2' style='width:100%; object-fit:cover; height:100%; position:relative; top:0; margin-top:5px; border-bottom-left-radius:25px; border-bottom-right-radius:25px; margin-top:-14%;'>
					<source src='videos/vet/aaa.mp4' id='bbgb'/>
				</video>" : $mediaB = "");


 			 			!empty($_URL) ? $output .= "
 			 			<div style='height:50%;'>
							<figcaption id='caption1".$col_val."' style='z-index:9; position:relative; top:30%; font-size:12px; display:flex; justify-content:center; align-items:center; width:100%;'><div style='color:rgba(255,255,255); padding:5px 15px 6px 15px; background:rgba(255, 255, 255, 0.2); border-radius:10px; min-width:100px; border:1px solid #bbb;'><div style='border-bottom:1px solid #aaa; margin-bottom:5px; font-size:12px; text-shadow:-1px 1px 1px #000;'>SOLUTION</div><div style='font-size:10px; text-shadow:1px 1px 1px #000;'>Click script to view</div></div></figcaption>
							$mediaB
 			 			</div>
 			 			" :
 			$output .="";

					/*	$output .="<figcaption id='caption".$col_val."' style='font-size:14px; min-height:50vh; z-index:2; padding:5px 20px 2px 20px; margin-top:-50vh; background:#000; opacity:0.9; color:#fff;'>
			 				
			 				<div style='display:flex; justify-content:center; width:100%; margin-bottom:20px;'>
			 					<div onclick='$(\"#caption".$col_val."\").slideUp(1000);' style='height:3px; width:50px; border:1px solid #fff; background:#fff;'></div>
			 				</div>
			 				<h4>".ucfirst($pub[$ln]['heading'])."</h4>
			 				<div style='padding-right:50px; padding-left:50px;'>This subject has been thoroughly dealt with practically in a real life occurence and the entire happenings recorded in this solution script accessible to you for free of charge. Click the script icon to view. Thanks.</div>
				 		</figcaption>*///profile&pid=$sender
				 		
				$output .="<figcaption style='font-size:14px; min-height:35vh; z-index:10; padding:2px 3px 2px 3px; position:relative; margin-top:-48vh; background:transparent; color:#fff;'>
			 				
			 				<div style='display:flex; flex-direction:column; height:100%; align-items:flex-end; width:100%; z-index:1;'>
			 			
			 					
			 			 
				 				<div style='display:flex; flex-direction:column; margin-left:auto; min-height:45vh; align-items:center; margin-top:5px; padding:5px; z-index:20; border-radius:20px; margin-right:10px;'>
				 					<div style='font-size:28px; margin-top:-5px; display:flex; flex-direction:row; filter:drop-shadow(1px 1px 1px #aaa); background:rgba(50, 50, 50, .1); padding:5px; '>
				 						<div style='width:4px; height:4px; background:#fff; border-radius:50%;'></div>
				 						<div style='width:4px; height:4px; background:#fff; border-radius:50%; margin-left:5px;'></div>
				 						<div style='width:4px; height:4px; background:#fff; border-radius:50%; margin-left:5px;'></div>
				 					</div>
				 				
				 					<a style='margin-top:5px;' href='index.php?page=tutor&category=$category_id&categoryPass=$catPass'>
				 					$tutorImg
				 						<p style='font-size:14px; filter:drop-shadow(2px 2px 1px #aaa); margin-top:1px; color:#fff;'>Consult</p>
				 					</a>

				 					<div style='margin-top:20px;'><i onclick='likeDis(\"\");' id='like".$_published_enc."' class='fa fa-heart' style=' background:rgba(0, 0, 0, .1); padding:5px; border-radius:50%; font-size:25px; filter:drop-shadow(2px 2px 1px #aaa); color:$likeIconColor;'></i><p id='totalLikes".$_published_enc."' style='color:#fff; filter:drop-shadow(2px 2px 1px #aaa); margin-top:-1px;'>$totalLikes</p></div>
				 					<div><a href='https://wa.me/+2347037940894?text=".ucfirst($pub[$ln]['heading'])."'><i class='fa fa-share' style='font-size:25px; filter:drop-shadow(2px 2px 1px #aaa); color:rgba(255, 255, 255, 0.8); background:rgba(50, 50, 50, .1); padding:5px; border-radius:50%;'></i><p style='font-size:14px; filter:drop-shadow(2px 2px 1px #aaa); margin-top:2px; color:#fff;'>share</p></a></div>
				 					<div style='margin-top:10px;'><a href='index.php?page=peepChats&pubid=".$pub_id."&published=".$published_enc."&convid=".$convid."&s=".$sender."&r=".$recipient."' style=''><i class='fa fa-scroll' style='font-size:22px; filter:drop-shadow(2px 2px 1px #aaa); color:#fff; background:rgba(50, 50, 50, .1); padding:5px; border-radius:50%;'></i>
				 						<p style='font-size:14px; filter:drop-shadow(2px 2px 1px #aaa); margin-top:5px; color:#fff;'>script</p>
				 					</a></div>
				 				</div>
				 			</div>
				 		</figcaption>
			 		</figure>

	 			</div>

	 			</div>
<script>

                     localStorage.setItem('uploadID', 0);
                	  	var enc_pwd = localStorage.getItem('encP');
			  		var pwd_enc_pK = localStorage.getItem('prv'); 
					var shrd = gen_shared(pwd_enc_pK, enc_pwd, '$r_pub');
			  		
				    localStorage.setItem('shrd'+'$recipient_enc_cons', shrd);
   	    		    var decQ = sym_decrypt('$que', shrd);
                    document.getElementById('enqq').innerHTML = decQ;
   						var freetimeOnDb = '$freetime'.slice(1, -1);
   						var fixedtimeOnDb = '$fixedtime'.slice(1, -1);
   						localStorage.setItem('savedFreeDB', freetimeOnDb);
   						localStorage.setItem('savedFxd', fixedtimeOnDb);

					function resetAppo(){
   						localStorage.setItem('savedFree','');
   						document.getElementById('appo').value='';
				    	 document.getElementById('appoReply').innerHTML = 'Appointments reset successfully!';
   						 $('#appoReply').show();
				         $('#appoReply').css({'color':'red', 'font-weight':'weight', 'padding':'2px', 'margin-bottom':'-30px'});
     
   					}


   					$('#day').on('change', function() { 
   						var _appo = document.getElementById('appo').value;
   						var appo = _appo.slice(1, -1);
    					
    					localStorage.setItem('savedFree', appo);
                        var FT =localStorage.getItem('savedFree');
   					    
   					    FT !== '' ? FTarray = FT.split('_') : FTarray = [];
                   
   					    var FxT =localStorage.getItem('savedFxd');
   					    
   					    
   					    FxT !== '' ? FxTarray = FxT.split('_') : FxTarray = [];
                        $('.free_am').css({'background':'#fff', 'color':'#000', 'border':'1px solid black', 'border-radius':'2px'});
   						$('.free_pm').css({'background':'#ffffe6', 'color':'#000', 'border':'1px solid black', 'border-radius':'2px'});
   						
                        FTarray.forEach(colorBG);
				        FxTarray.forEach(colorBG);
   					   
   					});

					
				   	var FT_ = localStorage.getItem('savedFreeDB');
				   	var FxT_ = localStorage.getItem('savedFxd');
				   	var FT_array = FT_.split('_');
				   	var FxT_array = FxT_.split('_');
				   	
				    FT_array.forEach(colorBG);
					FxT_array.forEach(colorBG);
					    

					function colorBG(item){
                    	    let firstChar = item.substr(0, 1);
                    		let id = item.replace(firstChar, '');
                   		 	var day = document.getElementById('day').value;
                   		
                   			_id = id.substr(0, 2);
                   			_id>9 ? idx = id.substr(0, 2) : idx = id.substr(1, 1);
                
                    		if(idx !='' && firstChar == day){
                    			
                    			id.includes('.') ? bdrad = '20px' : bdrad = '20px';
                    			id.includes('.') ? bd = '3px solid red' : bd = '3px solid green';
                    			

                    			id.includes('.') ? bgc = '#fff' : bgc = '#fff';
                    			id.includes('.') ? col = 'red' : col = 'green';
                    			_id = id.substr(0, 2);
                    			
                    			_id > 9 ? idx = _id.substr(0, 2) : idx = _id.substr(1, 1);
                    			
                    			$('#'+idx).css({'background': bgc, 'color':col, 'border': bd, 'border-radius':bdrad});

                    			id.includes('.') ? document.getElementById(idx).setAttribute('onClick', 'setOptions(\"'+item+'\");') : '';

                    		}
                    }
function setFree(time){
        				let freeTime = document.querySelector('#appo').value;
        				var dayselect = document.getElementById('day').value;
                        document.getElementById('appoday').value = dayselect;
                        
        			    var bg = ''; var col ='';

                            time < 10 ? timex ='0'+time : timex = time;
        			    if(freeTime !== ''){
                            
            			    if(freeTime.includes('_'+dayselect+timex+'_')){ newFreeTime = freeTime.replace(dayselect+timex+'_', '');
            			        time > 11 && time!=24 ? bg+='#ffffe6' : bg+='#eee';
            			        col+='#000';
						        document.getElementById('appo').value = newFreeTime;    			    
            			    }
            			    else{ newFreeTime = freeTime+dayselect+timex+'_';
            			            bg+='green';        
            			        col+='#fff';
		            			document.getElementById('appo').value = newFreeTime;    
            			    } 
                    
                        $('#'+time).css({'background':bg, 'color':col});
        				
        			
        			        
        			    }else{
        		          $('#'+time).css({'background':'green', 'color':'#fff'});
        			      time < 10 ? time ='0'+time : time;
                	      freeTime += '_'+dayselect+time+'_';
        			   	  document.getElementById('appo').value = freeTime;
        			    }
   					    
   					   // storeToLocal(dayselect, timex);
        			    
   					}


</script>";
   
	$ln--;
//	$output .= "</div></div></div>";
	return $output;
	
	}
	 
//	$output .= "</div></div></div>";
//	return $output;
}
public function coinBal(){

    $userData = $this->fetchUser();
    $me = $userData[0]['profile_id'];
    $myCoinData = $this->select('coin', ' WHERE owner_id = ?', $me);
    $myBal = $myCoinData[0]['Gcoin'];
    return $myBal;
}
public function fixAppo($_rid, $qcat, $que, $a){

    $categPass = $this->enc_cons('TRUE');
    
    $rid = $this->dec_cons($_rid);
    $vals = array('profile_id'=>$rid);
    /*$rData = $usersView->select('appointment', ' WHERE profile_id = ?', $rid);
    if(count($rData) == 0){
        $usersContr->insert('appointment', $vals);
    }*/
    $rData = $this->select('appointment', ' WHERE profile_id = ?', $rid);
    $freetime2 = $rData[0]['freetime'];

    $freetime1 = explode('_', $freetime2);
    $pid = $this->fetchProfile($rid);
    $fn = $pid[0]['firstname'];
    $ln = $pid[0]['lastname'];
    //tutor consult charge
    $consultCharge = $pid[0]['cFee'];
   
    $myBal = $this->coinBal();
    
    $fullname = ucfirst($this->decryptor0($fn)).' '.ucfirst($this->decryptor0($ln));
    $freetime = array();
    foreach($freetime1 as $free){
        
        if(strlen($free) == 2){
            $char1 = substr($free, 0, 1);
            $char2 = substr($free, 1, 1);
            $free = $char1.'0'.$char2;
            $free = intval($free);
            $freetime[] = $free;
        }
        elseif(strlen($free) > 2){
            $freetime[] = intval($free);
        }
    }
    
    rsort($freetime);
 
    $output="";
    
            $sunday = array();
            $monday = array();
            $tuesday = array();
            $wednesday = array();
            $thursday = array();
            $friday = array();
            $saturday = array();

    foreach($freetime as $time){
        if(!empty($time)){
            $period = substr($time, 1, 2);
            $meriTime='';
            if($period > 12){
                $period = $period - 12;
                $meriTime .= $period.'pm';
            }else{ 
            $period > 9 ? $period = substr($period, 0, 2) : $period = substr($period, 1, 1);
            
                $meriTime .= $period.'am';
                ////
            }

            switch(true){
                case substr($time, 0, 1) == '1':
                   $sunday[] = $meriTime;
                   break;
                case substr($time, 0, 1) == '2':
                   $monday[] = $meriTime;
                  break;
                case substr($time, 0, 1) == '3':
                 $tuesday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '4':
                 $wednesday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '5':
                 $thursday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '6':
                 $friday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '7':
                 $saturday[] = $meriTime;
                 break;
            
            }

        }
    }
    $today = intval(date('w', time())) + 1;

    $weekDay = 1;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";

    $S = count($sunday)-1;
    $S >= 0 ? $sun = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Sun </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $sun='';
    while($S >= 0){
        
     $sun .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo1$sunday[$S]' onClick='fixappo(\"1$sunday[$S]_$rid\", $qcat, \"$a\");'>".$sunday[$S]."</div>";
    
        $S--;
    }
    count($sunday) > 0 ? $sun .="</div></div>" : '';

    $weekDay = 2;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $M = count($monday)-1;
    $M >= 0 ? $mon = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Mon </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $mon ='';
    while($M >= 0){
     $mon .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo2$monday[$M]' onClick='fixappo(\"2$monday[$M]_$rid\", $qcat, \"$a\");'>".$monday[$M]."</div>";
    
        $M--;
    }
    count($monday) > 0 ? $mon .="</div></div>" : '';

    $weekDay = 3;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $T = count($tuesday) - 1;
    $T >= 0 ? $tue = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Tue </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $tue = '';
    while($T >= 0){
        
     $tue .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo3$tuesday[$T]' onClick='fixappo(\"3$tuesday[$T]_$rid\", $qcat, \"$a\");'>".$tuesday[$T]."</div>";
    
        $T--;
    }
    count($tuesday) > 0 ? $tue .="</div></div>" : '';

    $weekDay = 4;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $W = count($wednesday)-1;
    $W >= 0 ? $wed = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Wed </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $wed='';
    while($W >= 0){
        
     $wed .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo4$wednesday[$W]' onClick='fixappo(\"4$wednesday[$W]_$rid\", $qcat, \"$a\");'>".$wednesday[$W]."</div>";
    
        $W--;
    }
    count($wednesday) > 0 ? $wed .="</div></div>" : '';

    $weekDay = 5;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $t = count($thursday) -1;
    $t >= 0 ? $thu = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Thu </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $thu= '';

    while($t >= 0){
        
     $thu .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo5$thursday[$t]' onClick='fixappo(\"5$thursday[$t]_$rid\", $qcat, \"$a\");'>".$thursday[$t]."</div>";
    
        $t--;
    }

    count($thursday) > 0 ? $thu .="</div></div>" : '';

    $weekDay = 6;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $F = count($friday)-1;
    $F >= 0 ? $fri = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Fri </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $fri= '';
    while($F >= 0){
        
     $fri .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo6$friday[$F]' onClick='fixappo(\"6$friday[$F]_$rid\", $qcat, \"$a\");'>".$friday[$F]."</div>";
    
        $F--;
    }
    count($friday) > 0 ? $fri .="</div></div>" : '';

    $weekDay = 7;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $s = count($saturday) - 1;
    $s >= 0 ? $sat = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:14px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Sat </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $sat = '';
    while($s >= 0){
        
     $sat .= "<div class='hover' style='background:#fff; border:1px solid #000; font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo7$saturday[$s]' onClick='fixappo(\"7$saturday[$s]_$rid\", $qcat, \"$a\");'>".$saturday[$s]."</div>";
    
        $s--;
    }
        count($saturday) > 0 ? $sat .="</div></div>" : '';
	//$a == 'viewinurl' ? i.e setting appointment from chat page else = setting appo frm tutor pg
	$a == 'viewinurl' ? $bg = 'deepskyblue' : $bg = '#fff';
	$a == 'viewinurl' ? $h = '55vh' : $h = '100vh';
	$a == 'viewinurl' ? $paddinTop = '80px' : $paddinTop = '40px';
	$a == 'viewinurl' ? $nextOrNot = 'your next ' : $nextOrNot = '';
	$a == 'viewinurl' ? $app = '' : $app = " with ".$fullname;
	$a == 'viewinurl' ? $btn = "" : $btn = "<button class='theme form-control' style='font-size:14px;'>Proceed</button>";
	 
    $output .="<div style='display:flex; flex-direction:column; align-items:center; padding:$paddinTop 20px 20px 20px; background:$bg; height:$h; overflow:auto;'>
                <div style='display:flex; flex-direction:column; font-size:12px; color:gold;'>
                    <span>Your Balance:$myBal</span>
                    <span>Charges: $consultCharge</span>
                </div>
    ";

$neededCoinForConsult = intval($consultCharge) - intval($myBal);
   $output.=" <h6 style='font-size:16px; padding:5px; margin-bottom:10px; font-weight:bold;'>Fix ".$nextOrNot."appointment".$app."</h6><h6 style='margin:5px auto 20px auto; font-size:13px;'>Select from their free time below</h6><p style='color:red; font-style:italic; font-family:serif; font-size:10px; margin-top:-20px;'>Note: Each appointment last 30mins max.</p>";

   intval($myBal) >= intval($consultCharge) ? $output .= "<div style='text-align:center;' class='chatInput'>".$sun.$mon.$tue.$wed.$thu.$fri.$sat."</div>" : 
       $output = "Sorry you need ".$neededCoinForConsult."Gc more to be able to fix appointment. Kindly <a href='buycoin'>fund your wallet</a> first!" ;
   
    $output .="    <div style='margin:auto auto 50px auto; width:100%; height:100%; display:flex; flex-direction:column;'>
                        <form action='tutor' method='post' style='display:block; margin-top:auto; padding:20px;'>
                            $btn
                            <input type='hidden' name='category' value='$qcat'>
                            <input type='hidden' name='que' value='$que'>
                            <input type='hidden' name='categoryPass' value='$categPass'>
                            <input type='hidden' name='pub' value=''>
                        </form>
                    </div>";

    $output .="<div style='display: flex; position:fixed; bottom:15%; justify-content: center; width:100%;' onClick='$(\"#apporesp\").hide();'><span id='apporesp' style='display:none; background:skyblue; color:blue; padding:3px; border-radius:5px; font-size:12px;'></span></div>
						</div>";

    return $output;
}

public function chatPg($recipient_id, $resumingCID, $aoiCurrent, $empty){
	

		$allChats = $this->fetchChats($recipient_id, $resumingCID, false, $aoiCurrent);
		$ln = count($allChats)-1;
		$Chats = "<div>";
		$userData = $this->fetchUser();
		$this_user = $userData[0]['profile_id'];
		$engager = $userData[0]['engager'];
	    $expt = $userData[0]['xpt'];
		$this_user_aoi = $userData[0]['aoi'];
		$uniqConverse_enc = $userData[0]['currConverse'];
		
		//check if thisuser is a tutor  str_contains()
	    strpos($this_user_aoi, $aoiCurrent) !== false && $expt == 1 ? $action_btn = 'Approve script' : $action_btn = 'Publish script';
	    strpos($this_user_aoi, $aoiCurrent) !== false && $expt == 1 ? $action = $this->encryptor0('APPROVED') : $action = $this->encryptor0('NO');
		strpos($this_user_aoi, $aoiCurrent) !== false && $expt == 1 ? $tutor = $this_user : $tutor = $recipient_id;
    	strpos($this_user_aoi, $aoiCurrent) !== false && $expt == 1 ? $learner = $recipient_id : $learner = $this_user;

    	$xpertPublish = $this->encryptor0('xpertPublish');

    	$sData = $this->fetchProfile($learner);
    	count($sData) > 0 ? $converse_id = $sData[0]['converse_id'] : '';
    
    	//$rData = $this->fetchProfile($recipient_id);
    	//count($rData) > 0 ? $imageDir = $rData[0]['picture'] : '';

    	$recipient_id_enc = $this->encryptor0($recipient_id);
    	$recipient_id_enc_cons = $this->enc_cons($recipient_id);
		
        $user_id_enc =  $this->encryptor0($this_user);
		
		$_SESSION['newDate'] = '';

		while( $ln >= 0 ){
			$sender = $allChats[$ln]['s'];
			$recipient_id = $allChats[$ln]['r'];
			$mode = $allChats[$ln]['mode'];
			$flag = $allChats[$ln]['flag'];
			$lock = $allChats[$ln]['lock'];
			$cve = $allChats[$ln]['cve'];
			
			$chat_id = $allChats[$ln]['chat_id'];

			/////////CHANGED STH HERE BELOW

			$_cat = $allChats[$ln]['catid'];
								//check view permission
			$lock == 1 ? $visibility = $this->permissionStatus($_cat, $this_user) : $visibility = 1;
			$chatDir = $allChats[$ln]['type'];

            $replyto = $allChats[$ln]['replyto'];
				$vet_id = '';
				$agro_id = '';
				$hth_id = '';
				$guide_id = '';
				$cook_id = '';
				$uniq_id = '';
				$uniq ='';
			
			$replyTomsg = '';
			$lock_quote = '';
			$recip_id = '';
			$category_id = '';
			$quoteSender ='';
			if(!is_null($replyto) && $replyto > 0){
		       $sql = "SELECT * from chat WHERE chat_id = ".$replyto;
				$replyStmt = $this->connect()->query($sql);
				$data = $replyStmt->fetch();
				$vet_id .= $data['vet_id'];
				$agro_id .= $data['agro_id'];
				$hth_id .= $data['hth_id'];
				$guide_id .= $data['guide_id'];
				$cook_id .= $data['cook_id'];
				$lock_quote .= $data['locked'];
				$recip_id .= $data['recipient_id'];
				$category_id .= $data['category_id'];

				//check quote view permission
				$lock_quote == 1 ? $quote_visibility = $this->permissionStatus($category_id, $recip_id) : $quote_visibility = 1;

			    $array = $this->_aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
			 $queCol = $array['queCol'];
			 //$que = $data[$queCol];
			 $chatType = $array['strDir'];
             $col_id = $array['col_id'];
             $col_val = $array['colval'];
             $topic = $array['topic'];
		        $sql = "SELECT * from ".$topic." WHERE ".$col_id." = ".$col_val;
             	$topicStmt = $this->connect()->query($sql);
				$data = $topicStmt->fetch();
				$quote_visibility == 1 ? $replyTomsg .= $data[$queCol] : $replyTomsg = '';
				$prefix = substr($topic, 0, 1);
				$quoteSender .= $data[$prefix.'_user_id'];
				
				$uniq_id .= 'reply'.$replyto;
				$uniq .=$replyto;
	
		    }
		    
            $close = $allChats[$ln]['close'];
			$timestamp = $this->time($allChats[$ln]['tstamp']);

			$que = $allChats[$ln]['que'];
			$cat = str_replace('_chats', '', $chatDir);
			//$chatDir == 'agro_chats' ? $cat = 'agro' : ($chatDir == 'health_chats' ? $cat = 'health' : $cat = 'guidance');
			//$timestamp = date('Y-m-d H:i:s', time());
			//$timestamp = date('H:i', $_timestamp);

      //$sender == $this_user ? $id = 's' : $id = 'r';
			
			$_cat_enc = $this->encryptor0($_cat);

			//generate encryptd uniq converseID wt sender, recipient, conv_id
			$converse_id = $allChats[$ln]['conv_id'];
			
			//$uniqConverse_enc = $this->getUniqConv($tutor, $learner, $converse_id, 'duo');
			$audioUrl =$que;

        //	$flag > 0 ? $Chats .= "</div><div id='chats".$converse_id."'>" : $Chats .="";
	$Chats .= "<div id='chats".$converse_id."'>";

			$mode == 1 ? $long_url = '../sounds/'.$chatDir.'/'.$audioUrl.'.webm' : ($mode == 2 ? $long_url ='../img/'.$cat.'/'.$que.'.webp' :( $mode == 3 ? $long_url = '../videos/'.$cat.'/'.$que.'.webm' : $long_ur = ''));

	        $quoteSender == $this_user ? $qbg = '#eee' : $qbg = 'skyblue';

		//set full with for pictures chat
		    $mode == 2 ? $cWidth = 'max-width:80%; min-width:80%;' : ($mode == 3 ? $cWidth = 'max-width:80%; min-width:80%;' : $cWidth='max-width:80%;');

			$mode == 1 ? 
			$format = "<audio id='".$chat_id."' controls style='' class='audiostyle each-audio'><source src='' type='audio/webm'></audio>" : 
			    ($mode == 2 ? $format = "<div style='width:100%; height:300px;'><div id='bg".$chat_id."'><img loading='lazy' class='chatimg flexible' id='".$chat_id."' src='' style='width:100%; height:300px; object-fit:cover;' /></div></div>" : 
			        ($mode == 3 ? $format = "<video id='".$chat_id."' width='100%' height='280px' class='flexible2' controls style='object-fit:cover;'><source src='' id='src".$chat_id."' type='video/webm'></video>" :
			$format = "<span id='".$chat_id."'></span>
        			    <script>
        			        var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        localStorage.setItem('rK', '$recipient_id_enc_cons');
            			    getDecrypted('$que', '$chat_id', '$cat');
            			
            			
            			 </script>"));//
            			 
            	$sql = "SELECT * from skyman_user WHERE user_id = $recipient_id";
				$stmt = $this->connect()->query($sql);
				$u_rw = $stmt->fetch();
				$recipient_name = $this->decryptor0($u_rw['username']);

    		
       
                       // !empty($imageDir) ? 
                        //$imageView = "<img src='../img/profiles/profile/".$imageDir.".webp' name='' loading='lazy' style='height:30px; width:30px; border-radius:50%; border:1px solid #fff; box-size:border-box; background:#fff;'/>" : $imageView = "<div style='border:2px solid #fff; display:flex; align-items:center; justify-content:center; border-radius:50%; width:35Px; height:35px; background:#eee; font-size:14px;'><div class='imgProf'>$initial</div></div>";
                       
                $imageView = $this->generate_DP($recipient_id, '35px', '../');


        			//get the right flag from AOI table	
    			if($flag != 0){
    				$sql = "SELECT category, subcategory from aoi WHERE aoi_id = $flag";
    				$stmt = $this->connect()->query($sql);
    			
    				$aoi_rw = $stmt->fetch();
    				$chat_flag1 = $aoi_rw['category'];
    				$chat_flag2 = $aoi_rw['subcategory'];
    
                    $content = "<h6 style='margin-top:-10px;'>Close chat</h6>
                                <div style='text-align:center; font-size:14px;'>Has the problem raised been solved?</div>
                            <div style='display:flex; justify-content:space-around; font-size:18px; margin-top:15px;'>
                                <div style='border:1px solid #000; border-radius:10px; color:#000; padding:10px;' onClick='closeChat(\"$uniqConverse_enc\", \"$chat_id\", 2)'>No</div>
                                <div style='border-radius:10px; border:1px solid #2186f3; color:#2186f3; background:#fff; padding:10px;' onClick='closeChat(\"$uniqConverse_enc\", \"$chat_id\", 1)'>Yes</div>
                            </div>";

                     $veriMark = $this->veriCheckMark($recipient_id, $_cat, '3', '#888');
                    
                     $catID = $_cat;
                     $scriptid='';
                     $chatpop = 'd';
                    
                	$Chats .= $this->showModal2($content, 'dialog'.$chat_id, '', 'none');
    				$Chats .="<div class='each-sectio' style='display:flex; width:100%; align-items:center; justify-content:space-between; margin-top:0px; margin-bottom:20px; background:rgba(0, 0, 0, .3); padding:3px; color:#fff; font-size:14px; position:fixed; top:0.2px; left:0px; z-index:100;'>
    					
            					<div style='display:flex;'>
            						<a href='../index.php?page=profile&pid=$recipient_id_enc' style='color:#000; text-decoration:none;'>".$imageView."</a>
            					    <div style='display:flex column; align-items:space-between; margin-left:5px; color:#000;'>
            						    <div style='display:flex; font-size:12px;'>
            							    <div><a href='../index.php?page=profile&pid=$recipient_id_enc' style='color:#000; text-decoration:none;'>".ucfirst($recipient_name)."</a></div>
            							<div style='margin:2px auto auto 2px;'>
            									<span>
            									$veriMark
            									</span>
            							    </div>
            
            						    </div>
            						<div style='display:flex; margin-top:-2px; align-items:center; font-size:10px;'>status&nbsp;<div id='indicator".$recipient_id."' style='height:8px; width:8px; background:#4CBB17; border-radius:50%; border:1.4px solid #fff; margin-left:2px;'></div></div>
            					</div>
            					</div>
                					<div style='font-size:16px; font-weight:bold;'>
                					    <div style='display:flex; flex-direction:column; align-items:center;'>
                					        <div style='margin:-5px auto -3px auto;'>".ucfirst($chat_flag1)."</div>
                					        <div style='font-size:12px; font-style:italic; color:yellow;'>[ ".$chat_flag2." ]</div>
                					    </div>
                					</div>
            					
            						<div style='display:flex; justify-content:center; align-items:center;'>
            						    <div style='margin-left:auto; margin-right:10px;'><a href='../index.php?page=profile&pid=$user_id_enc' style='color:#000; text-decoration:none;'><span style='font-size:16px;' class='material-icons'>&#xe7fd;</span></a>
            						    </div>
            				
                    					<div style='color:#000; display:flex; justify-content:center; align-items:center;' onclick='$(\"#modal".$chat_id."\").slideDown(200);'><span>".$timestamp."</span><span class='material-icons' style='margin-left:10px;'>&#xe5d4;</span>
                    					</div>
            					    </div>
            					</div>
            					
            				    <div id='modal".$chat_id."' class='menulist' style='display:none; z-index:21; position:fixed; top:45px; right:5px;'><div style='display:flex; justify-content:flex-end;'><div style='border-bottom-right-radius:5px; border-bottom-left-radius:5px; background:#fff; filter:drop-shadow(-1px 1px 1px #888); padding:18px; padding-left:24px; font-size:16px;'>
            					<p style='margin:-15px -8px 5px auto; text-align:left;' onclick='$(\"#modal".$chat_id."\").slideUp(20);'>&times;</p>";
        
                                if($action_btn == 'Approve script'){
        			        		$Chats .="<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc; color:#fff;'><a style='text-decoration:none;' href='../index.php?page=publish&val=$uniqConverse_enc&ab=$xpertPublish&cat=$_cat_enc'>Publish script</a></p>";
                                }
    			       $Chats.="<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc;'><a href='chat.php?&cid=$uniqConverse_enc&rid=$recipient_id_enc&catid=$_cat_enc' style='color:#000'>Resume chat</a></p>
    				        	<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc;' onclick='saveChat(\"$_cat_enc\", \"$uniqConverse_enc\", \"$recipient_id_enc\");'>Save locally</p>";

    			    	$Chats.="<a href='../index.php?page=download&konsult=1&catid=$_cat&convid=$uniqConverse_enc&chat=$chatpop' style=''>Download</a>"; 
						
                     		  if($close == '0'){
            		        	    $Chats.="<p style='margin-bottom:4px; padding-bottom:4px; border-bottom:1px solid #ccc;' id='close".$chat_id."' onclick='$(\"#dialog".$chat_id."\").slideDown(20);'>Close chat</p>";
                                }
			//saveChat($_cat_enc, $uniqConverse_enc, $recipient_id_enc)
    			$Chats.="
    			    <p style='margin-bottom:5px;'><a href='#' style='color:red; text-decoration:none;' onClick='$(\".showpanel\").slideDown()' ondblclick='$(\"#appo".$chat_id."\").slideDown(20);'>Next Appointment</a></p>
    					<input type='hidden' name='chatID' value='".$chat_id."' />
    					<input type='hidden' name='category' value='".$_cat."'/>
    			</div>";
                $appointment = $this->fixAppo($recipient_id_enc_cons, $_cat, '', 'viewinurl');

                $Chats .="<div class='showpanel' style='display:none; padding:5px; position:fixed; top:20px; left:5px; right:5px; margin:10px; z-index:20; background:deepskyblue; border-bottom-left-radius:10px; border-bottom-right-radius:10px; filter:drop-shadow(1px 1px 1px #ccc) drop-shadow(-1px 0px 1px #ccc);'>
	            ".$appointment."
            		<div style='margin-right:auto; color:#fff' onclick='$(\".showpanel\").slideUp()'>close</div>
    			</div>
			</div>
		</div>";
		/*
		
					$Chats.="
			    <p style='margin-bottom:5px;'><a href='#' style='color:red; text-decoration:none;' onClick='$(\".showpanel\").slideDown()' ondblclick='$(\"#appo".$chat_id."\").slideDown(20);'>Next Appointment</a></p>
			    </div>";

//var_dump($_cat.'==expression=='.$recipient_id);
$appointment = $this->fixAppo($recipient_id_enc_cons, $_cat, '');

$Chats .="<div class='showpanel' style='display:none; padding:5px; position:fixed; top:20px; left:5px; right:5px; margin:10px; z-index:20; background:skyblue; border-bottom-left-radius:10px; border-bottom-right-radius:10px; filter:drop-shadow(1px 1px 1px #ccc) drop-shadow(-1px 0px 1px #ccc);'>
	            ".$appointment."
 
						<div style='margin-left:auto; color:#fff' onclick='$(\".showpanel\").slideUp()'>close</div>
	            </div>";
*/
		
$Chats .="<p style='font-size:12px; z-index:20; margin-bottom:50px; position:fixed; top:50px; left:0; right:0; color:red; text-align:center; font-style:italic;'><span style='padding:5px 10px 5px 10px; background:#fff; filter:drop-shadow(1px 1px 1px #bbb); opacity:.8; border-radius:50px;'> Chats allowed here are strictly on $chat_flag2</span></p>";
$Chats .="<p style='margin-top:80px;'></p>"; 
			}else{
			if($sender == $this_user && $que != ''){
			$Chats .=	$this->estimateDate($allChats[$ln]['tstamp']);
		
					$Chats .= "<div class='each-section newchat' style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; font-size:16px; margin-right:10px; margin-bottom:7px;' id='".$chat_id."b'>
						 <input type='hidden' name='mode' id='m".$chat_id."' value='".$mode."' />
					        <input type='hidden' name='q' id='q".$chat_id."' value='".$que."' />
							<input type='hidden' name='c' id='cat".$chat_id."' value='".$chatDir."' />
				
					        <div style='".$cWidth."'>
					            <div style='color:#000; background:#fff; padding:10px; border-radius:20px 20px 0 20px; width:100%;' id='".$chat_id."a'>
					 	            <div><a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a></div>
                                        ".$format."
                                        
    					            <div style='display:flex; align-items:center; justify-content:center; padding-bottom:-5px;'>
    					             <div style='font-size:10px; color:#000; margin-left:5px;'>".$timestamp."</div>";
    					            
    					            if($lock==1){$Chats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$chat_id.", 0)' style='margin-left:10px; margin-right:15px;' id='lock".$chat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:deepskyblue;'>&#xe897;</span>
    					            </div>
    					            ";}
    					            elseif($lock == 0 && $tutor == $this_user){
    					            	$Chats .="<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div><div onClick='lock(".$chat_id.", 1)' style='margin-left:10px; margin-right:15px;' id='lock".$chat_id."'>
	            			                <span class='material-icons' style='font-size:14px; color:#aaa;'>&#xe898;</span></div>
	            			                ";
    					            }
    					            if($tutor == $this_user && ($mode == 2 || $mode == 3) ){
        					            //$cve > 0 ? $cveColor = '#0f0' : $cveColor = '#bbb';
        					            $cve == 1 ? $cveColor = 'orange' : ($cve == 2 ? $cveColor = '#0f0' : $cveColor = '#bbb');
        					            $cve == 0 ? $nxtcve = 1 : ($cve == 1 ? $nxtcve = 2 : $nxtcve = 0);
                                        $nxtcve == 1 ? $cveClass = 'problemCVE' : ($nxtcve == 2 ? $cveClass = 'solutionCVE' : $cveClass = '');
        					                $Chats .="<div style='width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div>
                                        <div onClick='makeCVE(".$chat_id.", $nxtcve)' style='margin-left:10px; margin-right:auto;' id='cve".$chat_id."' class='$cveClass'>
    	            			                <span class='material-icons' style='font-size:14px; color:".$cveColor.";'>&#xe8f4;</span>
        					            </div>";
    					            }
    					            $Chats .="<div style='font-size:14px; margin-left:auto;' onclick='replythis(\"$chat_id\", \"$que\");' class='material-icons'>&#xe15e;</div>
    					   
    					            </div>
    					        </div>
    					     </div>
					       </div> 
					       <script>
	                   // isOnline(\"$recipient_id_enc_cons\");
					       var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        var replyMsg = sym_decrypt('$replyTomsg', sc);
                            
            		        //if(Number.isInteger($replyto) && '$replyto' > 0){
                            //if(isNaN($replyto) || $replyto == 0){
            		if('$replyto' !== '' ){
            			      if('$replyto' !== '0'){
            			        document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
            			        $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'".$qbg."'});
            			    }  
            		    
            		}
        				</script>";
				}
				elseif( $sender != $this_user && $visibility == 1 && $que != '' ){
					$Chats .=	$this->estimateDate($allChats[$ln]['tstamp']);
					$Chats .= "<div class='each-section newchat' style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-start; font-size:16px; margin-left:10px; margin-bottom:7px;' id='".$chat_id."b'>
					     <input type='hidden' name='mode' id='m".$chat_id."' value='".$mode."' />
					        <input type='hidden' name='q' id='q".$chat_id."' value='".$que."' />
						   	<input type='hidden' name='c' id='cat".$chat_id."' value='".$chatDir."' />
				
					        <div style='background:cyan; color:#000; padding:10px; border-radius:20px 20px 20px 0; ".$cWidth."' id='".$chat_id."a'>
					<div><a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a></div>
                            ".$format."
					        <div style='display:flex; align-items:center; padding-bottom:-5px;'>
					        
					        
						           <span style='font-size:14px;' onclick='replythis(\"$chat_id\", \"$que\");' class='material-icons'>&#xe15e;</span>
						           <div style='margin-left:auto; display:flex; align-items:center;'>";
    
    				              if($tutor == $this_user && ($mode == 2 || $mode == 3) ){
        					            //$cve > 0 ? $cveColor = '#0f0' : $cveColor = '#bbb';
        					            $cve == 1 ? $cveColor = 'orange' : ($cve == 2 ? $cveColor = '#0f0' : $cveColor = '#bbb');
        					          $cve == 0 ? $nxtcve = 1 : ($cve == 1 ? $nxtcve = 2 : $nxtcve = 0);
                                      $nxtcve == 1 ? $cveClass = 'problemCVE' : ($nxtcve == 2 ? $cveClass = 'solutionCVE' : $cveClass = '');
//                                        $cve == 2 ? $cveType = "<span style='font-size:6px; color:deepskyblue;'>2</span>" : $cveType = ''; 
        					  $Chats .="<div onClick='makeCVE(".$chat_id.", $nxtcve)' style='margin-right:10px;' id='cve".$chat_id."' class='$cveClass'>
    	            			                <span class='material-icons' style='font-size:14px; color:".$cveColor.";'>&#xe8f4;</span>
        					            </div>
        					            <div style='width:3px; height:3px; margin-right:10px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div>";
    					            }
    
    
$Chats .="    					             <span style='font-size:10px; color:#000; margin-left:10px;'>".$timestamp."</span></div>
    					            
    					   </div>
					
                        </div></div> <script>
                        //isOnline(\"$recipient_id_enc_cons\");
        			        var sc = localStorage.getItem('shrd' + '$recipient_id_enc_cons');
        			        var replyMsg = sym_decrypt('$replyTomsg', sc);

            			    if('$replyto' !== '' && '$replyto' !== '0'){

                			    document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
                			    $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'".$qbg."'});
            			    }
            			    
            			</script>";
				}
		    
		
			}
	 
			$ln--;
		}
	 $Chats .= "</div>";
		return $Chats;
	}
	
	public function chatUpd($recipient_id, $chatAudience){
		return $this->getnewchats($recipient_id, $chatAudience);
	}

	public function paynow($customer_mail, $amount){
		
//		return $this->($customer_mail, $amount);	
	
	}
	
	public function checkFoloa($xpt, $newFoloa){
		
		$_newFoloa = '_'.$newFoloa.'_';
		$_vals = "$xpt, %$_newFoloa%";

		$data =  $this->select('profile', ' WHERE profile_id = ? AND foloas LIKE ?', $_vals);
		return $data;
	}
	
	/*public function checkLike($prdID, $newLike){
		
		$_newLike = '_'.$newLike.'_';
		$_vals = "$prdID, %$_newLike%";

		$data =  $this->select('publish', ' WHERE published = ? AND likes LIKE ?', $_vals);
		count($data) == 0 ? $proceed = TRUE : $proceed = FALSE;
		return $proceed;
	}
	public function checkFav($prdID, $newFav){
		
		$_newFav = '_'.$newFav.'_';
		$_vals = "$prdID, %$_newFav%";

		$data =  $this->select('publish', ' WHERE published = ? AND favs LIKE ?', $_vals);
		count($data) == 0 ? $proceed = TRUE : $proceed = FALSE;
		return $proceed;
	}*/
	public function informFoloas($xpt, $publish_id){

		$xptData = $this->select('profile', ' WHERE profile_id = ?', $xpt);

		$_foloas = $xptData[0]['foloas'];
		$foloas = explode('_', $_foloas);
		$foloasArr = array_slice($foloas, 1, -1, true);
	
		foreach($foloasArr as $foloee){

			$type='2'; $msg=$publish_id; $cat = 0;
			$this->msgUser($xpt, $foloee, $type, $cat, $msg, $msg);

		}

	}

	public function msgUser($sender, $recipient, $type, $cat, $msg, $pubid){
		$vals = $sender.', '.$recipient.', '.$type.', '.$cat.', '.$pubid.', '.$msg;
		$msgData = $this->select('xnote', ' WHERE sender_id = ? AND target_id = ? AND mtype = ? AND cat_id = ? AND pubid = ? AND msg = ?', $vals);

		$data = array('target_id'=>$recipient, 'sender_id'=>$sender, 'cat_id'=>$cat, 'mtype'=>$type, 'pubid'=>$pubid, 'msg'=>$msg );
		count($msgData) == 0 ? $this->insert2Db('xnote', $data) : '';

	}
/*    public function getThumbnail($cat, $chatpop, $cid){
        $cid = '9U6i575VTy4xCK8KNHnnXKLRL6S/Vw71lTTYvBo4Md8=';
  		    $chatpop == 's' ? $uniqColumn = 'content_id' : ($chatpop == 'd' ? $uniqColumn = 'uniq_conv' : $uniqColumn = 'class_id');
  		    $chatpop == 's' ? $media = '3' : $media = '2';
  	$chatpop == 's' ? $table = "solochat" : ($chatpop == 'd' ? $table = 'chat' : $table = 'grpchat');
  		
  			$aoi_data = $this->aoi($cat);
  			$columnID = $aoi_data['cat_id'];
  			$topicTbl = $aoi_data['topic'];
  			$queCol = $aoi_data['queCol'];
*/	//	return $table.' '.$topicTbl.' '.$columnID.' '.$uniqColumn.' '.$cid.' '.$media.' '.$queCol.' '.$cid;//array($thumbnail, $mediaUsed);
 
  	//		$vals =  $cid.', 2, '.$cid.', 3';
    	//	$tbData = $this->select('solochat', " INNER JOIN ".$topicTbl." USING(".$columnID.") WHERE ".$uniqColumn." = ? AND media = ? OR ".$uniqColumn." = ? AND media = ?", $vals);
	//	$tbData = $this->select($table, " WHERE solo_id = ?", '241');//INNER JOIN ".$topicTbl." USING(".$columnID.") WHERE ".$uniqColumn." = ? AND media = ? OR ".$uniqColumn." = ? AND media = ?", $vals);

  //  		$thumbnail = $tbData[0][$queCol];
//    		$mediaUsed = $tbData[0]['media'];
//        count($tbData) > 0 ? $return = array($thumbnail, $mediaUsed) : $return = 'NONE';
//  		return $chatpop.' '.$table;//.' '.$uniqColumn.' '.$media;//array($thumbnail, $mediaUsed);*/
  //  }
    public function getThumbnail($cat, $chatpop, $cid){
  		  	$chatpop == 's' ? $table = "solochat" : ($chatpop == 'd' ? $table = 'chat' : $table = 'grpchat');
  		    $chatpop == 's' ? $uniqColumn = 'content_id' : ($chatpop == 'd' ? $uniqColumn = 'uniq_conv' : $uniqColumn = 'class_id');
  		    $chatpop == 's' ? $media = '3' : $media = '2';
  			$aoi_data = $this->aoi($cat);
  			$columnID = $aoi_data['cat_id'];
  			$topicTbl = $aoi_data['topic'];
  			$queCol = $aoi_data['queCol'];

  			$vals =  $cid.', 2, '.$cid.', 3';
    	    $tbData = $this->select($table, " INNER JOIN ".$topicTbl." USING(".$columnID.") WHERE ".$uniqColumn." = ? AND media = ? OR ".$uniqColumn." = ? AND media = ?", $vals);
    		$thumbnail = $tbData[0][$queCol];
    		$mediaUsed = $tbData[0]['media'];
        
        return array($thumbnail, $mediaUsed);
    }

	public function getPubchat($search_input){

		$clean_search=str_replace(',', ' ', $search_input);
		$search_word = explode(' ', $clean_search);
		$srchWord_Array=array();
		
		if(count($search_word)>0){
			foreach($search_word as $word){
	        	if(!empty($word) && strlen($word)>2){
				   $srchWord_Array[]=$word;
				}
			}
		}

		$where_list=array();
		$whereVal=array();
        
        function suffixNounRemove($word){
    	    $list = 'ments ships ers ments ships hoods ages isms tions ions s er tion ion ment ship hood age ery ry ism';
      		$search_word = explode(' ', $list);
    	    foreach($search_word as $suffix){
    	        if(substr($word, -strlen($suffix)) === $suffix){
    	            $nword = substr($word, 0, -strlen($suffix));
    	            strlen($nword) > 2 ? $nword : $nword = $word; 
    	            return $nword;
    	        }else{
    	            return $word;
    	        }
    	    }
        }


      if(count($srchWord_Array)>0){
        	foreach($srchWord_Array as $_word){
        	  $word = suffixNounRemove($_word);
        	  
       	      $where_list[]="heading LIKE ? AND approval = ? OR searchKeys LIKE ? AND approval = ? OR insight LIKE ? AND approval = ?";
		      $whereVal[] = "%$word%, 1, %$word%, 1, %$word%, 1"; 

     		}  
	  	}

	  $_where_clause =implode(' OR ', $where_list);
		$where_clause = $_where_clause . ' ORDER BY pDate DESC';

		if(!empty($where_clause)){
				$whereVal = implode(', ', $whereVal);
			//	var_dump($whereVal);
				return $this->selectStmt('publish', ' WHERE '.$where_clause, $whereVal);
		
			/*while(count($row) > 0){
						$heading = $row[0]['heading'];
						$published = $row[0]['published'];
						$published_dec = $this->decryptor0($published);
						$pub_array = explode("_", $published_dec);
						$sender = $pub_array[0];
						$recipient = $pub_array[1];
						$converse_id = $pub_array[2];

						$pubVals = $sender.', '.$recipient.', '.$converse_id;
						return array('sender'=>$sender, 'recipient'=>$recipient, 'converse_id'=>$converse_id, 'heading'=>$heading);

						//return $this->select('chat', ' INNER JOIN agrovet USING (agro_id) INNER JOIN Health USING (hth_id) INNER JOIN Guidance USING (guide_id) WHERE sender_id = ? AND recipient_id = ? AND conv_id = ?', $pubVals);
				}*/
		}
	}
	public function verify_AuthAccess($user, $auth_access){
		$auth_access = '%_'.$auth_access.'_%'; 

		$vals = $user.', '.$auth_access;
		$auth_data = $this->select('application', ' WHERE applicant = ? AND category LIKE ?', $vals);
		count($auth_data) > 0 ? $access = TRUE : $access = FALSE;
		return $access;
	}

	public function searchPanel(){
	  
		$panel='<div class="them" id="searchPanel" style="background:#fff; border:1px solid #ccc; filter:drop-shadow(2px 2px 150px #aaa); padding:1px; position:fixed; right:0; left:0; top:8%; z-index:20; display:none;">
				<div id="glitsearch" style="display:none;"></div>
        <form id="search_data" class="search_data">
        <div style="background:#fff; padding:10px; display:flex; align-items:center; justify-content:center;">

              <div style="border:2px solid #aaa; border-radius:20px; display:flex; justify-content:center; align-items:center;">
              <button type="submit" name="submit" tabindex=3 class="" id="search_btn" style="width:9vw;  background:transparent; border:transparent; border-top-left-radius:15px; border-bottom-left-radius:15px; padding:3px; text-align:center;">
                  <span class="material-icons" style="color:#000; font-size:30px; margin-right:2px; margin-left:5px;">&#xe8b6;</span>
              </button>
              <input type="search" id="searchInput" incremental name="search_input" placeholder="Search any solution..." aria-label="Search the pool of published practical solutions" style="padding-left:8px color:#fff; font-size:16px; width:70vw; border:transparent; background:#fff; border-bottom-right-radius:15px; border-top-right-radius:15px;">
							
							<div style="text-align:center; margin-right:10px;" onclick="document.getElementById(\'searchInput\').value=\'\';"> x </div>
           </div>
          </div>
        </form>
        </div>
        
       </div>
      <div style="padding:2px; margin-bottom:0px;">
          <span id="search_results"></span>
      </div>';
return $panel;
	}
	public function searchPanellll2(){
	  
		$panel='<div class="them" id="searchPanel" style="background:transparent; border:1px solid #ccc; filter:drop-shadow(2px 2px 150px #aaa); padding:1px; position:fixed; right:0; left:0; top:0; z-index:20; display:none;">

        <form id="search_data" class="search_data">
          <div style="display:flex; flex-direction:column; align-items:center; margin:2px;">
            <div style="display:flex; justify-content:center; align-items:center; font-size:20px; border:3px solid #fff; border-radius:15px; background:transparent; color:#fff; margin-top:20px;">
              <button type="submit" name="submit" tabindex=3 class="" id="search_btn" style="width:9vw;  background:rgba(0,0,0,.1); border:transparent; border-top-left-radius:15px; border-bottom-left-radius:15px; padding:6px;">
                  <span class="material-icons" style="color:#fff; font-size:30px; margin-right:2px;">&#xe8b6;</span>
              </button>
              <input type="search" incremental name="search_input" placeholder="Search any solution..." aria-label="Search the pool of published practical solutions" style="padding-left:8px color:#fff; font-size:16px; width:70vw; border:transparent; background:transparent; border-bottom-right-radius:15px; border-top-right-radius:15px;">
                       
            </div>
          </div>

        </form>
        <div style="text-align:center; margin-top:10px;"><span onclick=$("#searchPanel").slideUp("slow");>
        
            <span class="material-icons" style="font-size:20px; color:#fff;" onclick=$("nav").slideDown();>&#xe5cd;</span>
            </span>
        </div>
        
       </div>
      <div style="padding:2px; margin-bottom:0px;">
          <span id="search_results"></span>
      </div>';
return $panel;
	}

/*	public function searchPanel(){
	
		$panel='<div class="them" id="searchPanel" style="background:rgba(255,255,255,.6); border:1px solid #ccc; filter:drop-shadow(2px 2px 150px #aaa); padding:1px; position:fixed; right:0; left:0; bottom:0; z-index:20; display:none;">
        <div style="text-align:center;">
        
      <span class="material-icons" style="font-size:20px; color:#2166f3; margin-top:-2px;" onclick=$("#searchPanel").slideUp("slow");>&#xe15b;</span>
        </div>

        <form id="search_data" class="search_data">
          <div style="display:flex; flex-direction:column; align-items:center; margin:2px;">
            <div style="display:flex; font-size:20px; border:2px solid #fff; border-radius:15px; background:rgba(0,0,0,.1);">
              <button type="submit" name="submit" tabindex=3 class="" id="search_btn" style="width:9vw;  background:rgba(0,0,0,.1); border:transparent; border-top-left-radius:15px; border-bottom-left-radius:15px; padding:6px;">
                  <span class="material-icons" style="color:#2186f3; font-size:20px; margin-right:2px;">&#xe8b6;</span>
              </button>
              <input type="search" incremental name="search_input" placeholder="Search any solution..." aria-label="Search the pool of published practical solutions" style="padding:6px; color:#fff; font-size:16px; width:70vw; border:transparent; background:rgba(0,0,0,.1); border-bottom-right-radius:15px; border-top-right-radius:15px;">
                       
            </div>
          </div>

        </form>
        <hr>
        
       </div>
      <div style="padding:2px; margin-bottom:0px;">
          <span id="search_results"></span>
      </div>';
return $panel;
	}
*/
	public function aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id){
        return $this->_aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
	}

	public function aoi($_cat){
        return $this->_aoi($_cat);
	}

	/*public function fetchTutor($aoi){
		$_aoi = '-'.$aoi.'-';
		$_vals = "1, %$_aoi%";

		return $this->select('profile', ' WHERE xpt = ? AND aoi LIKE ?', $_vals);
		
	}*/

	public function fetchFreeTutor($aoi){
		$_aoi = '-'.$aoi.'-';
		$fixed = '%.'.$aoi.'.%';
		$_vals = $fixed.", 1, %$_aoi%";

		return $this->select('profile', ' INNER JOIN appointment USING(profile_id) WHERE fixedtime NOT LIKE ? AND xpt = ? AND aoi LIKE ?', $_vals);
	}
    public function learnMore($a, $fontsize){
    	$dim = $fontsize * 1.4;
    	$lm = "<a href='learnmore#lm$a' title='Learn more' style='text-decoration:none'><div style='display:flex; justify-content:center; align-items:center; height:".$dim."px; width:".$dim."px; border:2px solid deepskyblue; color:deepskyblue; border-radius:50%; font-size:".$fontsize."px; font-family:serif; font-style:italic; font-weight:1000;' onclick='learnmore($a);'>i</div></a>";
    	return $lm;
    }
	
	public function learnmore2($lm_code){
$lm = "";//<div style='padding:20px; background:#eee; display:flex; justify-content:center;'><div class='scrollet'>"//;
		if($lm_code == 1){
			$lm .="<div id='lm1' style='font-size:14px; margin-bottom:520px;'> I Am learning more 1</div>";}
		elseif($lm_code == 2){

		$lm .="<div id='lm2' style='font-size:14px; margin-bottom:20px;'> I Am learning more 1</div>";}
		elseif($lm_code == 3){$lm .="<div id='lm3' style='font-size:14px; margin-bottom:20px;'> I Am learning more 1</div>";}
		elseif($lm_code == 4){
			$lm .="<div id='lm4' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px;'>
		 		<h4 style='color:#2166f3; font-weight:bold; text-align:center; margin-top:10px;'>Joining a solution trial</h4>
						<div style='font-size:14px; padding:10px;'>-For any trial you join, you will win back 70% of the purchasing price of that product only after you must have successfully documented all your reality of each trial steps involved in that solscript on Glit accurately following the laid down guides in the solscript.</div>
						<div style='font-size:14px; padding:10px;'>
						-Also note that a solution on trial is already sold at 30% discounted price. So joining a trial for such will mean you are buying it at 20% of its worth.</div>
						<div style='font-size:14px; padding:10px;'>
						-Also note that if you do this dilligently and successfully, the value of the product is increased by 25% and you are entitled to part of the royalties from all the subsequent sales of the product.
						</div>
						<div style='font-size:14px; padding:10px;'>
						-No refund for any solution bought whether on trial or not if it does not work for you.
						</div>
						<div style='font-size:14px; padding:10px;'>
						-A successful trial you create is published under that solscript and you are forever entitled to a share of the royalties of the trial each time it is bought.
						</div>
		 </div>";}
		elseif($lm_code == 5){
			$lm .="<div id='lm5' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px;'>
					<h4 style='color:#2166f3; font-weight:bold; text-align:center; margin-top:10px;'>Joining a solution trial</h4>
					<div style='font-size:14px; padding:10px;'>-For any trial you join, you will win back a %discount (depending on the trial #) of the purchasing price of that Solscript only after you must have successfully documented all your reality of each trial steps involved in that Solscript on Glit accurately following the laid down guides in the Solscript.</div>

					<div style='font-size:14px; padding:10px;'>
					-These are the guidelines binding Trials and they only work for successful and publised trials :
					<div style='padding:10px; font-size:12px; font-style:italic;'>
					<p style='margin-bottom:5px;'>Trial #1 - 50% discount is given and 25% value is added at the end of a successful trial.</p>
					<p style='margin-bottom:5px;'>Trial #2 - 25% discount is given and 12.5% value is added at the end of a successful trial.</p>
					<p style='margin-bottom:5px;'>Trial #3 - 12.5% discount is given and 5% value is added at the end of a successful trial.</p>
					<p style='margin-bottom:5px;'>Trial #4 - 5% discount is given and 2.5% value is added at the end of a successful trial.</p>
					</div>
					 -Trial ends at #4 after which the Solscript is fully sold at its newly attained price. All trials associated with a solscript are as well accessible to any buyer of such solscript.
					</div>
					
					<div style='font-size:14px; padding:10px;'>
					-A solution on trial is already sold at a discounted price. So joining a trial you will be refunded part of your payment, such will mean you are buying it at even more discounted price.</div>
					<div style='font-size:14px; padding:10px;'>
					-If you do this dilligently and successfully, the value of the product is increased by a % depending on the Trial # you joined as detailed above and you are entitled to part of the royalties from all the subsequent sales of the product.
					</div>
					<div style='font-size:14px; padding:10px;'>
					-No refund for any solution bought whether on trial or not if it does not work for you.
					</div>
					<div style='font-size:14px; padding:10px;'>
					-A successful trial you create is published under that solscript and you are forever entitled to a share of the royalties of the trial each time it is bought.
					</div>
		</div>";}
		elseif($lm_code == 6){
			$lm .="<div id='lm6' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px;'> 
						<h4 style='color:#2166f3; font-weight:bold; text-align:center; margin-top:10px;'>Creating a CTT</h4>
				<div style='font-size:14px; padding:10px;'>
				-CTT stands for Category-Topic-Title.
				</div>
				<div style='font-size:14px; padding:10px;'>
				-An accurate CTT is vital for every problem you are solving. Picking the right CTT will grant you high chances of getting approval without delay. If you are having trouble forming the right CTT, kindly watch this <a href='#'>short tutorial on our youtube channel</a>.
				</div>
				<div style='font-size:14px; padding:10px;'>
				-If none of the categories or topics listed matches the solution you want to create, kindly pick the option 'Others' and a space is provided to write out what you feel is the best for the category. This will be reviewed and approved as appropriate.
				</div>
				<div style='font-size:14px; padding:10px;'>
				-Picking a succinctly descriptive title is very important and to arrive at this, the following guidelines should be followed:


					<div style='padding:10px; font-size:12px; font-style:italic;'>
						<p style='margin-bottom:5px;'>
						Title should reflect the uniqueness of your solution approach by quantifying all or either of the following parameters in figures:</p>
						<p style='margin-bottom:5px;'>
				          1) Material input or output E.g. How to cultivate and harvest 50tons of cassava on 1acre of land</p>
						<p style='margin-bottom:5px;'>
				              2) % efficiency E.g. How to raise broilers to market weight in just 4weeks with 50% of feed requirement
				        </p>
						<p style='margin-bottom:5px;'>
							  3) Duration E.g. How to cultivate and harvest cassava in just 2 months</p>
		    		</div>
				</div>
		</div>";}
		elseif($lm_code == 7){
			$lm .="<div id='lm7' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px;'>		
					<h4 style='color:#2166f3; font-weight:bold; text-align:center; margin-top:10px;'>Creating a CVE</h4>
					<div style='font-size:14px; padding:10px;'>
					-CVE stands for Confirmatory Visual Evidence.</div>
					<div style='font-size:14px; padding:10px;'>
					-CVE could only be either of these 2 things namely, video evidence or pictorial evidence.</div>
					<div style='font-size:14px; padding:10px;'>
					-CVE exist at the begining (problem CVE) and at the end(solution CVE) of every solution script you are creating.</div>
					<div style='font-size:14px; padding:10px;'>
					-It represents the captured image or video detail of the problem you want to solve OR the end-result of the problem you are solving after the solution approach has been applied. This end-result is then captured in video or snapped as image for posting and eventual publication along with the captured detail of the entire solution application steps.</div>
					
					<div style='font-size:14px; padding:10px;'>
					-When capturing CVE, ensure that all the indicative pointers that the problem exist(Problem CVE) or that the solution has been achieved(solution CVE) are captured and explained in detailed in the video. 
					</div>
					<div style='font-size:14px; padding:10px;'>
					-When capturing CVE, ensure that it is done in a well illuminated environment for clarity to avoid shades and unclear CVE as unclear CVE may not scape through approval stage.
					</div>
			</div>";}
		elseif($lm_code == 8){
			$lm .="<div id='lm8' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px; text-align:left;'>
		               
                   A quick overall insight into the solution you just created that will give the Glites a concise information on what your solution is all about. 
                   This should not contain the real content or technical detail of your solution that is meant to be paid for.
                   You may use the following as a guide:
                   <div>1) Material items used</div>  
                   <div>2) Immaterial items</div>
                   <div>3) Total duration</div>  
                   <div>4) Effectiveness/efficiency of the procedure</div>
                   <div>5) Expectations/End results</div> 
			       </div>";
		}
		elseif($lm_code == 9){
			$lm .="<div id='lm9' style='font-size:14px; margin-bottom:20px; width:70vw; margin-bottom:50px; text-align:left;'> 
			        <h5>Accessible to Everyone</h5> 
			        <div>All Glites are priviledged to view the content.</div><br>
			        <h5>Accessible to Only Specialists</h5>
			        <div>Only the Glites which are registered and verified as specialists on Glit are granted the authorized access for such category of content.</div> 
			        </div>";}
			else{
				$lm .="<div id='lm9' style='font-size:14px; margin-bottom:20px; width:70vw; height:100vh;'> I Am learning more 1</div>";
			}
	//	$lm.="</div></div>";		
		return $lm;

	}

	public function showModal3($modalContent, $selector, $contentType, $display){
   		$contentType == 'file' ? $modalContent = include($modalContent) : $modalContent;

		$modal="<div id='".$selector."' class='".$selector."' style='display:".$display."; position: fixed; z-index: 22; left: 0; top: 0; width: 100%; overflow: auto; background: rgba(0,0,0,0.6); min-height:100vh;'>
				<div style='display:flex; justify-content:center; align-items:center; text-align:center; overflow:auto; padding-top:140px; padding-bottom:140px;'>
			
					<div style='background:white; border-radius:20px; z-index:1; padding:5px 10px 5px 10px;'>
						<div class='' onclick=$('#".$selector."').fadeOut(-500) style='text-align:right;'>
            	          <span class='close md'><strong>&times</strong></span>
                	    </div>
            	        <div style='padding: 20px; text-align:center;'>";
		$modal.= $modalContent;
		$modal.="		</div>
					</div></div>
				</div>";
 		return $modal;
	}


}
