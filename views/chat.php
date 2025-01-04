<?php
$chatPage ='';
$_SESSION['TUTOR_ACCESS'] = FALSE;

include('../includes/autoloader.inc.php');

	$usersContr = new usersContr();
	$usersView = new usersView();
	$usersView->chat_session();

if( !isset($_SESSION['user_id']) ){
	header('location: ../index.php');
}
if(!isset($_POST['category']) ){
	header('location: ../index.php');
 }
!empty($_POST['category']) ? $_cat = $_POST['category'] : $_cat = $_GET['catid'];

$recipient_enc_cons = '';

if( !defined('tutortochat') || !defined('stdtochat') || !defined('resume')) {
	//CHECK WETHER TO RESUME PREVIOUS CHAT
	$_uniqconv_id_enc = '';
	isset($_GET['cid']) ? $_uniqconv_id_enc = str_replace(' ', '+', $_GET['cid']) : $_uniqconv_id_enc ='';
	isset($_GET['catid']) ? $_catid_dec = $usersView->decryptor0(str_replace(' ', '+', $_GET['catid'])) : $_catid_dec ='';

	isset($_GET['cid']) ? $_SESSION['category'] = $_catid_dec : $_SESSION['category'] = $_POST['category'];
		//END OF RESUME CHAT CODE

	!isset($_GET['cid']) ? $que = $usersView->sanitise($_POST['que']) : $que = '';
	//to prevent submit btn from posting a response to empty que 
	!isset($_GET['cid']) ? $haltResponse = $_POST['haltResponse'] : $haltResponse = '0';

		if($haltResponse !='1'){
			isset($_POST['cat_code']) ? $cat_code = $_POST['cat_code'] : $cat_code = ''; 
			
			!empty($_POST['category']) ? $_cat = $_POST['category'] : $_cat = $_GET['catid'];

			isset($_GET['cid']) ? $_cat = $_catid_dec : $_cat = $_cat;

                $aoi_array = $usersView->aoi($_cat);
            	$queCol = $aoi_array['queCol'];
				$user_id_col = $aoi_array['user'];
				$cat_id = $aoi_array['cat_id'];
				$cat_tbl = $aoi_array['topic'];
				$expert = $aoi_array['expert'];
            
			//only set converse ID to session if not resuming chat, else grab the converse ID already set
			if(isset($_GET['cid'])){

				$uniqconv_id_code = $usersView->dec_cons($_uniqconv_id_enc);
				$uniqconv_array = explode("_", $uniqconv_id_code);
				$tutor = $uniqconv_array[0];
		      $learner = $uniqconv_array[1];
			   $_SESSION['converse_id_resume'] = $uniqconv_array[2];
		  	}

		  	$userData = $usersView->fetchUser();
			$user_id = $userData[0]['profile_id'];
			
			$_paidSession = $userData[0]['purchasedSession'];
			$paidSession = $usersView->decryptor2($_paidSession);
			$new_paidSession = $paidSession - 1;

			isset($_GET['cid']) ? $_SESSION['converse_id'] = $_SESSION['converse_id_resume'] : $_SESSION['converse_id'] = $userData[0]['converse_id'];

			//is que format audio/video/txt?
			$mediaUsed = $userData[0]['tmp_aud'];
			!empty($mediaUsed) ? $que = $mediaUsed : $que;
			!empty($mediaUsed) ? $media = 1 : $media = 0;

			//get category detail of the chat
			$catData = $usersView->select('aoi', ' WHERE aoi_id = ?', $_cat);
			$cat = $catData[0]['category'];
			$aoi_id = $_cat; //catData[0]['aoi_id'];

			//get recipient(tutor/stdnt)
			isset($_GET['cid']) ? $rID = $_GET['rid'] : $rID = $_POST['recipient_id'];

			$recipient_id = $usersView->decryptor0(str_replace(' ', '+', $rID));
			
			//get user sub + other peculiar info
			$sub = $userData[0]['purchasedSession'];
			$xpat = $userData[0]['xpt'];
			$engaged = $userData[0]['engaged'];
			$engagerList = $userData[0]['engager_list'];
			$tutorQuota = $userData[0]['tutorQuota'];
		
			$prevSession_exhaust_time = strtotime($userData[0]['session_end']) - time();

			//check if u have not been paired already
			$chatPage .="<html><head>
			    <meta http-equiv='Content-Type' content='text/html' charset='utf-8'>
			    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
			    <meta http-equiv='x-ua-compatible' content='ie=edge'>
			    <link rel='canonical' href='https://xkroll.com/' />
			    <link rel='manifest' href='manifest.json' />
				<link rel='stylesheet' href='../css/index.css' />
			    <link rel='stylesheet' href='../css/style.css' />
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />";

			//post que to the column it belongs
				if( $xpat == 0 && (!empty($_POST['category']) || !empty($_catid_dec))){
    				//check if the same category paid for is being used
					$tutor_Quota='';
					if(!empty($tutorQuota)){
						$_tutorQuota = $usersView->dec_cons($tutorQuota);
						$_tutor_Quota = explode('/==', $_tutorQuota);

						$tutor_Quota .=$_tutor_Quota[1];
						$cat_quota = $_tutor_Quota[0];


		    	          $usersView->dec_cons($_POST['categoryPass']) === 'TRUE' ? $pass=true : $usersView->categoryPass($_POST['category']);

			          $coinCheck = $usersView->select('coin', ' WHERE coin_id = ?', $recipient_id);
		          	
			          	count($coinCheck) > 0 ? $coinTotal = $coinCheck[0]['Gcoin'] + intval($tutor_Quota) : $coinTotal = intval($tutor_Quota);
			          	$coinVals = $coinTotal.', '.$recipient_id;
			          	$values = array('Gcoin'=>$coinTotal, 'coin_id'=>$recipient_id);
			          	count($coinCheck) > 0 ? $usersContr->update('coin', 'Gcoin = ? WHERE coin_id = ?', $coinVals) : $usersContr->insert('coin', $values);
				   }
					$_SESSION['tutor'] = $recipient_id;
					$_SESSION['learner'] = $user_id;
	                
  			    //update newly generated pub to DB if any.		
				//check if the que not already exist
					$_checkVal = $que.', '.$user_id;
					$queExist = $usersView->select($cat, ' WHERE '.$queCol.' = ? AND '.$user_id_col.' = ?', $_checkVal);

				//post student chat to category table
				    if(!isset($_GET['cid'])){
					    $vals = array($queCol => $que, $user_id_col => $user_id);
					    $usersContr->insert($cat, $vals);
					}
  		     			
     			//get the cat_id value that indexed the que
				   	$valu = $user_id.', '.$que; $catId_val = '';
					$catIdData = $usersView->select($cat, ' WHERE '.$user_id_col.' = ? AND '.$queCol.' = ?', $valu);
					$catId_val .= $catIdData[0][$cat_id];

				//update student profile wt new converse_id, sessnEnd & engagement detail
					$converse_id = $_SESSION['converse_id'];
					$sess_dur = $usersView::session_duration;
					$session_end = date('Y-m-d H:i:s', (time()+intval($sess_dur)));//30mins session at a go
				    $_SESSION['new_sess'] == TRUE ? $sess_col = 'session_end = ?, ' : $sess_col = '';
				    $_SESSION['new_sess'] == TRUE ? $sess_val = $session_end.', ' : $sess_val = '';
					$_SESSION['new_sess'] == TRUE ? $tutorQuotaQuery = 'tutorQuota = ?, ' : $tutorQuotaQuery = '';
					$_SESSION['new_sess'] == TRUE ? $tutorQuotaVal = ', ' : $tutorQuotaVal = '';
					
					$_SESSION['new_sess'] == TRUE ? $paidSessionQuery = 'purchasedSession = ?, ' : $paidSessionQuery = '';
					$_SESSION['new_sess'] == TRUE ? $new_paidSessionVal = $_SESSION['nPaidSess'].', ' : $new_paidSessionVal = '';


				    $updVals = $tutorQuotaVal.'1, '.$recipient_id.', '.$new_paidSessionVal.$sess_val.'0, '.$user_id;

					$usersContr->update('profile', $tutorQuotaQuery.'engaged = ?, engager = ?, '.$paidSessionQuery.$sess_col.'tmp_aud = ? WHERE profile_id = ?', $updVals);
            	//post tutor share of d client payment to tutor acct
					$tutorData = $usersView->select('skyman_user', ' WHERE user_id = ?', $recipient_id);

					count($tutorData) > 0 ? $_tutorAsset = $usersView->dec_cons($tutorData[0]['asset']) : $_tutorAsset = '0';
					$tutorAsset = intval($_tutorAsset);

					if($_SESSION['new_sess'] == TRUE){
						//post tutor payment to their acct
						$_tutorAssetNew = intval($tutorAsset) + $usersView->changeToCoin( intval($tutor_Quota) );
//						var_dump('NEW ASSET GAINED BY TUTOR: '.$_tutorAssetNew);

						$tutorAssetNew = $usersView->enc_cons($_tutorAssetNew);


						$asset_val = $tutorAssetNew.', '.$recipient_id;
						$usersContr->update('skyman_user', 'asset = ? WHERE user_id = ?', $asset_val);
	                   	$_SESSION['new_sess'] = FALSE;
					}

                   	$_SESSION['new_sess'] = FALSE;
					$_SESSION['nPaidSess'] ='';

				//update tutor profile with learner n converse id
					$updVals = '1, '.$user_id.', 0, '.$converse_id.', '.$recipient_id;
					$usersContr->update('profile', 'engaged = ?, engager = ?, tmp_aud = ?, converse_id = ? WHERE profile_id = ?', $updVals);

				//check if flag not already exist
					$checkVal = $aoi_id.', '.$user_id.', '.$recipient_id.', '.$converse_id;
					$flagExist = $usersView->select('chat', ' WHERE flag = ? AND sender_id = ? AND recipient_id = ? AND conv_id = ?', $checkVal);
					
				//post student flag to chat table
					if( (count($flagExist) == 0  || $flagExist[0]['close']>0 ) && !isset($_GET['cid'])){ 
						//message tutor that a stuident is ready;
						$usersView->msgUser($user_id, $recipient_id, '9', '_'.$_cat.'_', '', '');

	    			//update converse_id
					 	$new_converse_id = $converse_id + 1;
					 	$_SESSION['converse_id'] = $new_converse_id;
						$viewer = '-'.$user_id.'-';
							
			            $uniqConv_enc = $usersView->getUniqConv($_SESSION['tutor'], $_SESSION['learner'], $new_converse_id, 'duo');
			
						if(!empty($_POST['flag']) && $_SESSION['SET_FLAG'] == TRUE){

						    $chat_vals = array($cat_id=>$catId_val, 'flag'=>$aoi_id, 'category_id'=>$aoi_id, 'conv_id'=>$new_converse_id, 'uniq_conv'=>$uniqConv_enc, 'note'=>'1', 'view'=>$viewer, 'sender_id'=> $user_id, 'recipient_id'=>$recipient_id);
							$usersContr->insert('chat', $chat_vals);
            					
			   	 			$updVals = $new_converse_id.', '.$user_id;
			   				$usersContr->update('profile', 'converse_id = ? WHERE profile_id = ?', $updVals);

				      	    $updVals2 = $new_converse_id.', '.$recipient_id;
			    			$usersContr->update('profile', 'converse_id = ? WHERE profile_id = ?', $updVals2);
							
                            $_POST['flag'] = '';
                            $_SESSION['SET_FLAG'] = FALSE;
						};
					}

				//check if chat not already exist
					$checkVal = $catId_val.', '.$que.', '.$user_id.', '.$recipient_id.', 0';
					$chatExist = $usersView->select('chat', ' INNER JOIN '.$cat_tbl.' USING ('.$cat_id.') WHERE '.$cat_id.' = ? AND '.$queCol.' = ? AND sender_id = ? AND recipient_id = ? AND flag = ?', $checkVal);
						
				//post student chat to chat table
					if(count($chatExist) == 0){ 

						$viewer = '-'.$user_id.'-';
						
	                    $uniqConv_enc = $usersView->getUniqConv($_SESSION['tutor'], $_SESSION['learner'], $_SESSION['converse_id'], 'duo');
									
						$chat_vals2= array($cat_id=>$catId_val, 'conv_id'=>$_SESSION['converse_id'], 'uniq_conv'=>$uniqConv_enc, 'category_id'=>$_cat, 'cat_grp'=>$cat_code, 'note'=>'1', 'view'=>$viewer, 'sender_id'=> $user_id, 'recipient_id'=>$recipient_id);
								$usersContr->insert('chat', $chat_vals2);
						$que = '';
								
		

						if($_SESSION['insertToScd'] == TRUE){
                    
            		    //get shrdk to scd db
               				$cData = $usersView->select('scd', ' WHERE uniq_conv = ?', $uniqConv_enc);
                    
                        //delete row with empty sc
                    		$usersContr->delete('scd', ' WHERE sc=?', '');	
                    		$sk_enc = $usersView->encryptor2($_POST['sk']);
                    
                    		$data = array('sc'=>$sk_enc, 'uniq_conv'=>$uniqConv_enc);
                    		count($cData) == 0 ? $usersContr->insert('scd', $data) : $donothing='';
                    		$_SESSION['insertToScd'] = FALSE;
                    
                    	}

                        $_SESSION['SET_CHAT'] = FALSE;
                        $_POST['chat'] = '';
    				}

          
			}
			
			elseif( $xpat == 1 && $_SESSION['SET_CHAT'] == TRUE){   
				$_SESSION['learner'] = $recipient_id;
				$_SESSION['tutor'] = $user_id;
				$viewer = '-'.$user_id.'-';
			    $uniqConv_enc = $usersView->getUniqConv($_SESSION['tutor'], $_SESSION['learner'], $_SESSION['converse_id'], 'duo');
				
			//post tutor chat to category table
				$vals = array($queCol => $que, $user_id_col => $user_id);
				$usersContr->insert($cat, $vals);
				
			//get the cat_id value that indexed the que
				$valu = $user_id.', '.$que;
				$catIdData = $usersView->select($cat, ' WHERE '.$user_id_col.' = ? AND '.$queCol.' = ?', $valu);
				$catId_val= $catIdData[0][$cat_id];

			//post tutor chat to chat table by checking first
				$checkVal = $catId_val.', '.$que.', '.$user_id.', '.$recipient_id;
				$chatExist = $usersView->select('chat', ' INNER JOIN '.$cat_tbl.' USING ('.$cat_id.') WHERE '.$cat_id.' = ? AND '.$queCol.' = ? AND sender_id = ? AND recipient_id = ?', $checkVal);
					
				if(count($chatExist) == 0 && !empty($_POST['category']) ){ 
					$chat_vals2 = array($cat_id => $catId_val, 'category_id'=>$_cat, 'cat_grp'=>$cat_code, 'view'=>$viewer, 'media'=>$media, 'sender_id'=> $user_id, 'recipient_id'=>$recipient_id, 'conv_id'=>$_SESSION['converse_id'], 'uniq_conv'=>$uniqConv_enc);

					$usersContr->insert('chat', $chat_vals2);

					//add the chat to pending
						$catid = $_POST['category'];
						$title = '';
						$projectID = $uniqConv_enc;
						$mediaType = 0;
						$owner = $user_id;
						$contributors = $recipient_id;
						$projectType = '2 ';

					    $usersView->addToPending($catid, $title, $projectID, $mediaType, $owner, $contributors, $projectType);

           		}
			
			    $_SESSION['SET_CHAT'] = FALSE;
			}

			//CHECK THE CHAT_ID BELOW around line 130, WANNA USE IT FOR PROMPT POSTING OF AUDIO MSG TO CHAT PAGE
			$data = $usersView->fetchUser();
			$recipient_id = $data[0]['engager'];
			$recipient_enc_cons .= $usersView->enc_cons($recipient_id);

			$me = $data[0]['profile_id'];
			$engagerList = $data[0]['engager_list'];
			$xpat = $data[0]['xpt'];

			$sess_ends = strtotime($data[0]['session_end']);
		    $rem_sess_time = intval($sess_ends) - time();
			date_default_timezone_set('Africa/Lagos');

			$currentTime = date('H:i', time()-3420);
			$shdki = '';

			$chatPage .= "
				<script src='../scripts/jquery-3.6.0.min.js'></script>
					
				<script type='text/javascript' src='../scripts/crypto-js.js'></script>
				<script type='text/javascript' src='../scripts/key.js'></script>
	            <script type='text/javascript' src='../scripts/autoupd.js'></script>

				<script>

		        localStorage.setItem('usa', '$me');
   			    localStorage.setItem('rid_enc_cons', '$recipient_enc_cons');
   			    localStorage.setItem('rid', '$recipient_id');
   	   			localStorage.setItem('chatpop', 'duo');

			      function getDecrypted(msg, chid, cat){
			        var sh = localStorage.getItem('shrd'+'$recipient_enc_cons');
//alert(sh);
			        var xy = sym_decrypt(msg, sh);
			        document.getElementById(chid).innerHTML = xy;
					localStorage.setItem('dir'+chid, cat+'/'+msg);
			      }
				</script>

			</head>
			<body id='flexible'>
                <div id='loaderBg'></div><div id='loader'></div>
			   <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
			   <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
			        <source id='webcam' src='' type='video/webm'>
			   </video>
			   			   <span id='log'></span>
                <div id='activeTimer2' style='position:fixed; bottom:48%; left:48%; z-index:101; color:red; font-size:25px;'></div>    
			   <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
			   </div>
     
			<div id='response' style='display:none; z-index:80; font-size:16px; font-family:roboto; border-radius:5px; text-align:center; padding:5px; color:#fff; background-color:#2176f3;'></div>";

			//get the resuming cid to pass across
			isset($_GET['cid']) ? $resumingCID = $_SESSION['converse_id'] : $resumingCID = 0;//-1; 
			isset($_GET['cid']) ? $cidLimit = FALSE : $cidLimit = TRUE;
			
			$c_id = $_SESSION['converse_id'];
		
			$chatPage .= "<form method='post' role='form' id='enquiry_data' enctype='multipart/form-data'>
			<input type='hidden' id='sdk' name='sdk'/>
			<input type='hidden' name='recipient_id' id='recipient_id' value='".$rID."'>

			 <input type='hidden' name='loginAudio' id='loginAudio' value='0'>
			<input type='hidden' name='rem_time' id='rem_time' value='$rem_sess_time'>
			<input type='hidden' name='encmsg' id='encmsg' value=''>
			<input type='hidden' name='rcid' id='rcid' value='$_uniqconv_id_enc'>
			<input type='hidden' name='category' id='category' value='$_cat'>
			<input type='hidden' name='cat' id='cat' value='$cat_tbl'>
			<input type='hidden' name='cid' id='cid' value='$c_id'>
	        <input type='hidden' name='msgReply' id='msgReply' value=''>
			<input type='hidden' name='quote' id='quote' value=''>
			<input type='hidden' name='guid' id='guid' value='$me'>
			<input type='hidden' name='chatpop' id='chatpop' value='duo'>
			<input type='hidden' name='mediaUsed' id='mediaUsed' value='0'>";

			if($xpat == 1 ){
	       		$chatPage .="<input type='hidden' name='lock' id='lock' value=''>";
			}

			$chatPage .= "<div style='padding-bottom:100px;'><div id='all_chat' style='min-height:60vh; margin-bottom:100px; scroll-snap-type:x mandatory;'>".$usersView->chatPg($recipient_id, $resumingCID, $_cat, '', $cidLimit)."</div></div><br>";
	
			$secondClt = '1';
			$_engagerList = substr($engagerList, 1, -1);

			$each_recipient = explode('-', $_engagerList);
			
			$recip_num = count($each_recipient);
			$others_num = $recip_num - 1;

			if( $recip_num > 1 && $xpat == '1'){
				$chatPage .="<div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:30px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:30px;'><span style='width:15px; height:15px; background:#2166f3; color:#fff; display:flex; justify-content:center; align-items:center; font-size:10px; border-radius:50%;'>$others_num</span>
						<span class='material-icons'>&#xe5d4;</span>
					</div>";
			}

			if($xpat == '0'){

				$chatPage .="<span style='display:none;' id='countdownSpan'><div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:40px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:40px;'><span style='width:25px; height:25px; background:red; color:#fff; display:flex; justify-content:center; align-items:center; font-size:16px; border-radius:50%;' id='session_elapse'></span>
					<span class='material-icons'>&#xe5d4;</span>
				</div></span>";
			}
		
			$xpat == 1? $recipient = 'client' : $recipient = $expert;
						$chatPage .= "<div style='position:fixed; bottom:12%; right:7%; z-index:20; border-radius:50%;' id='chatLock'></div>"; 
			
			$chatPage .= "<div style='display:none; position:fixed; bottom:10%; margin-left:10px; justify-content:center; width:80%; border-top-left-radius:10px;  border-top-right-radius:10px; background:#ddd; padding:5px 10px 5px 10px; z-index:2; font-size:16px;' id='replyPanel' onclick='removePanel()'></div>
			
			            <div style='display:flex; justify-content:center; width:100%; padding:0 10px 0 10px; z-index:2;' id='chatInputShell'>
			        
							<div style='display:flex; align-items:center; justify-content:center; background:#fff; border:1px solid #ccc; border-radius:10px; filter:drop-shadow(1px 1px 1px #333);' class='chatInput'>
								<textarea value='' oninput='changeSubBtnId()' name='enquiry' id='enquiry' class='form-control' style='width:70%; font-size:16px; height:40px; max-height:200px; padding:8px; border:0px;' placeholder='Chat with a ".$recipient."...'></textarea>
								<div style='display:flex; justify-content:space-around; width:25%; align-items:center;'>
					
									<div style='border:transparent; background:transparent; padding:0; margin-right:8px;' id='vidrec'><span class='material-icons off-theme2'>&#xe226;</span></div>
					
								    <div id='recordButton' style='border:transparent; background:transparent; padding:0;'>
								       <span class='material-icons dropshadow' id='mic' style='color:#222;'>&#xe029;</span>
									</div>
									<input type='file' name='upload[]' id='upload' class='upload' capture='camera' accept='video/*' multiple onchange='loadImg()' style='width:2px; height:2px;'>
									<div id='imgUpload' style='border:transparent; background:transparent; padding:0; margin-left:8px;'><span id='uploadIcon' class='uploadIcon material-icons' style='margin-bottom:2px;'>&#xe412;</span>
									</div>
								</div>
							</div>
							<button type='submit' id='post_enq' style='display:flex; height:50px; width:50px; border-radius:50%; justify-content:center; align-items:center; border:2px solid #2186f3; background:#2186f3; color:#fff; margin-left:5px; filter:drop-shadow(1px 1px 1px #333);'><span id='activeTimer' style='font-size:12px'></span><span id='setInner'>
								<span class='material-icons' style='font-size:26px;' id='stopRecord'>&#xe163;</span></span>
							</button>
						</div>
						</form>";
		}else{
		    //else for haltResponse
			$chatPage .="<div style='display:flex; font-size:55px; align-items:center; justify-content:center; height:100vh; width:100vw;'>No current task available</div>";
		}

	}else{
	
	$chatPage.='<div>Sorry, an error occured!</div>';
}

$chatPage .="
                    	<script src='../scripts/script.js'></script>
						<script src='../scripts/login.js'></script>
						<script src='../scripts/processor.js'></script>
						<script src='../scripts/chat.js'></script>
			            <script src='../scripts/recorder2.js'></script>
			            <script src='../scripts/mediaHandler.js'></script>
			            <script src='../scripts/recorder.js'></script>
			        	<script src='../scripts/app.js'></script>
			        	<script src='../notification.js'></script>
			        	<script>
			        	        var imgArray = []; //used on recorder2.js

			        	     $(window).on('load', function () {
                                $('#loader').hide();
                                $('#loaderBg').hide();
                                randomNotification(\"Appointment\", \"It is time to meet the expert\", \"APPO\");
                                //on();
                              }); 
                         
                         ///uploading image
                         
                         $(document).on('click', '#imgUpload', function(){
                             document.getElementById('mediaUsed').value = '2';
                         });
                         $(document).on('click', '#mic', function(){
                             document.getElementById('mediaUsed').value = '1';
                         });
                         $(document).on('click', '#vid_rec', function(){
                             document.getElementById('mediaUsed').value = '3';
                         });

                         function replythis(chat_id, msg){
                            document.getElementById('msgReply').value = chat_id;
                            const panel = document.getElementById('replyPanel');
                            panel.style.display = 'block';
                            var sh = localStorage.getItem('shrd'+'$recipient_enc_cons');
        			         var xy = sym_decrypt(msg, sh);
        			                xy !== '' ? panel.innerHTML = xy : panel.innerHTML = '<i>picture or audio file selected</i>';
        			      document.getElementById('quote').value = xy;
        			      document.getElementById('enquiry').focus();
                        }
                        
                        function removePanel(){
                            document.getElementById('msgReply').value = '';
                            $('#replyPanel').hide();
                            
                        }

    					</script>
			</body></html>";

echo $chatPage;