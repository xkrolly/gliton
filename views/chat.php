<?php
$chatPage ='';

include('../includes/autoloader.inc.php');

	$usersContr = new usersContr();
	$usersView = new usersView();
	//$usersView->chat_session();

$_SESSION['SET_FLAG'] = FALSE;

if( !isset($_SESSION['user_id']) || !isset($_POST['category']) ){
	header('location: ../index.php');
}

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$myXpatStatus = $userData[0]['xpt'];
$engager = $userData[0]['engager'];

$tutorID = $usersView->AlphaA_num($_POST['tt']);
//$tutorID == $me ? $engager = $engager : $engager = $tutorID;

//Below update for students only
if($tutorID != $me){
	//update my tutor profile about me
	$updVals = '1, '.$me.', '.$tutorID;
	$usersContr->update('profile', 'engaged = ?, engager = ? WHERE profile_id = ?', $updVals);

	//update student profile wt new converse_id, sessnEnd & engagement detail
	$updVals = '1, '.$tutorID.', 0, '.$me;
	$usersContr->update('profile', 'engaged = ?, engager = ?, tmp_aud = ? WHERE profile_id = ?', $updVals);
}
//FETCH USER DATA again for the engager
$userData = $usersView->fetchUser();

isset($_POST['cid']) ? $recipient_id = $usersView->decryptor0($_POST['recipient_id']) : $recipient_id = $userData[0]['engager'];

$mediaUsed = $userData[0]['tmp_aud'];

!empty($mediaUsed) ? $que = $mediaUsed : $que = $_POST['que'];
!empty($mediaUsed) ? $media = 1 : $media = 0;

$_cat = $_POST['category'];
$que = $_POST['que'];

//fetch tutor DATA
$tutorData = $usersView->fetchProfile($tutorID);
$xpertConsultFee = $tutorData[0]['cFee'];

//get category detail of the chat
$catData = $usersView->select('aoi', ' WHERE aoi_id = ?', $_cat);
$categName = $catData[0]['category'];


$_SESSION['alreadygetUniqConv'] == TRUE ? $_uniqconv_id_enc = $userData[0]['currConverse'] : $_uniqconv_id_enc = $usersView->getUniqConv($tutorID, $me);

$_SESSION['alreadygetUniqConv'] = TRUE;

isset($_POST['cid']) ? $_uniqconv_id_enc = $_POST['cid'] : $_uniqconv_id_enc;
$_SESSION['converse_id'] = $_uniqconv_id_enc;

$aoi_array = $usersView->aoi($_cat);
$queCol = $aoi_array['queCol'];
$user_id_col = $aoi_array['user'];
$catid_col = $aoi_array['cat_id'];
$cat_tbl = $aoi_array['topic'];
$expertDesc = $aoi_array['expert'];


$chatPage .="<html><head>
			    <meta http-equiv='Content-Type' content='text/html' charset='utf-8'>
			    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
			    <meta http-equiv='x-ua-compatible' content='ie=edge'>
			    <link rel='canonical' href='https://xkroll.com/' />
			    <link rel='manifest' href='manifest.json' />
				<link rel='stylesheet' href='../css/index.css' />
			    <link rel='stylesheet' href='../css/style.css' />
				<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons' />";

if( $myXpatStatus == 0){
//AT session END, take lock amnt from client, delete sess from sess_man
    $vals = array($queCol => $que, $user_id_col => $me);
    $usersContr->insert($categName, $vals);

	//get the cat_id value that indexed the que
	$valu = $me.', '.$que; $catId_val = '';
	$catData = $usersView->select($categName, ' WHERE '.$user_id_col.' = ? AND '.$queCol.' = ?', $valu);
	$catId_val = $catData[0][$catid_col];

	//check if flag not already exist & post student flag to chat table
	$checkVal = $_cat.', '.$me.', '.$tutorID.', '.$_uniqconv_id_enc;
	$flagExist = $usersView->select('chat', ' WHERE flag = ? AND sender_id = ? AND recipient_id = ? AND uniq_conv = ?', $checkVal);
					

//if(!empty($_POST['flag']) && $_SESSION['SET_FLAG'] == TRUE){


	if( (count($flagExist) == 0  || $flagExist[0]['close']>0 ) && $_SESSION['ISSET_FLAG'] == FALSE ){ 
		//message tutor that a stuident is ready;
		$usersView->msgUser($me, $recipient_id, '9', '_'.$_cat.'_', '', '');

	    $chat_vals = array($catid_col=>$catId_val, 'flag'=>$_cat, 'category_id'=>$_cat, 'uniq_conv'=>$_uniqconv_id_enc, 'note'=>'1', 'view'=>$tutorID, 'sender_id'=> $me, 'recipient_id'=>$recipient_id);
		$usersContr->insert('chat', $chat_vals);
		
		//set flag to empty
		$_POST['flag'] = '';
		
		$_SESSION['ISSET_FLAG'] = TRUE;

	}
	//check if chat not already exist
		$checkVal = $catId_val.', '.$que.', '.$me.', '.$recipient_id.', 0';
		$chatExist = $usersView->select('chat', ' INNER JOIN '.$cat_tbl.' USING ('.$catid_col.') WHERE '.$catid_col.' = ? AND '.$queCol.' = ? AND sender_id = ? AND recipient_id = ? AND flag = ?', $checkVal);
						
	//post student chat to chat table
	if( count($chatExist) == 0 && $_SESSION['ISSET_CHAT'] == FALSE ){ 

		$viewer = '-'.$me.'-';
	    //$_uniqconv_id_enc = $usersView->getUniqConv($tutorID, $me);

		$chat_vals2= array($catid_col=>$catId_val, 'uniq_conv'=>$_uniqconv_id_enc, 'category_id'=>$_cat, 'cat_grp'=>$_POST['cat_code'], 'note'=>'1', 'view'=>$viewer, 'sender_id'=> $me, 'recipient_id'=>$recipient_id);
		$usersContr->insert('chat', $chat_vals2);

		//SET current converse uniqCode for tutor and client
		$vals = $_uniqconv_id_enc.', '.$tutorID;
		$usersContr->update('profile', 'currConverse = ? WHERE profile_id = ?', $vals);

		$vals2 = $_uniqconv_id_enc.', '.$me;
		$usersContr->update('profile', 'currConverse = ? WHERE profile_id = ?', $vals2);

		//Add sharedKey to db
		if($_SESSION['insertToScd'] == TRUE){
                    
  		    //get shrdk to sharedkey db
			$cData = $usersView->select2('sharedkey', ' WHERE ucid = ?', $_uniqconv_id_enc);
                    
            //delete row with empty sk
            $usersContr->delete2('sharedkey', ' WHERE sk=?', '');	
            $sk_enc = $usersView->encryptor2($_POST['sk']);
 
            $data = array('sk'=>$sk_enc, 'ucid'=>$_uniqconv_id_enc);
            count($cData) == 0 ? $usersContr->insert2('sharedkey', $data) : $donothing='';
        	$_SESSION['insertToScd'] = FALSE;
        }

		$_SESSION['ISSET_CHAT'] = TRUE;
	}
}

elseif( $myXpatStatus == 1){

	$tutorData = $usersView->fetchUser();
	$client = $tutorData[0]['engager'];
	$tutorID = $tutorData[0]['profile_id'];
	//$_uniqconv_id_enc = $tutorData[0]['currConverse'];

	//AT session END, take lock amnt from client, delete sess from sess_man
    $vals = array($queCol => $que, $user_id_col => $me);
    $usersContr->insert($categName, $vals);

	//get the cat_id value that indexed the que
	$valu = $me.', '.$que;
	$catData = $usersView->select($categName, ' WHERE '.$user_id_col.' = ? AND '.$queCol.' = ?', $valu);
	$catId_val = $catData[0][$catid_col];

	//check if chat not already exist
	$checkVal = $catId_val.', '.$tutorID.', '.$client.', '.$_uniqconv_id_enc;
	$chatExist = $usersView->select('chat', ' WHERE '.$catid_col.' = ? AND sender_id = ? AND recipient_id = ? AND uniq_conv = ?', $checkVal);

	//post tutor chat to chat table
	if( count($chatExist) == 0 && $_SESSION['ISSET_CHAT'] == FALSE ){ 

		$viewer = '-'.$tutorID.'-';
		$chat_vals2= array($catid_col=>$catId_val, 'uniq_conv'=>$_uniqconv_id_enc, 'category_id'=>$_cat, 'cat_grp'=>$_POST['cat_code'], 'note'=>'1', 'view'=>$viewer, 'sender_id'=> $tutorID, 'recipient_id'=>$client);
		$usersContr->insert('chat', $chat_vals2);

		$_SESSION['ISSET_CHAT'] = TRUE;
	}

	//add the chat to pending
	$title = $que;
	$projectID = $_uniqconv_id_enc;
	$mediaType = 0;
	$owner = $tutorID;
	$contributors = $client;
	$projectType = '2 ';

	$usersView->addToPending($_cat, $title, $projectID, $mediaType, $owner, $contributors, $projectType);
}


			
$tutorData = $usersView->fetchProfile($tutorID);
$client = $tutorData[0]['engager'];

$recipient_enc_cons = $usersView->enc_cons($recipient_id);

$currentTime = time();

$vals = $tutorID.', '.$client.', '.$currentTime.', '.$currentTime;
//var_dump($vals);
$sessData = $usersView->select('sess_manager', ' WHERE tutor = ? AND client = ? AND sess_start < ? AND sess_end > ?', $vals);
count($sessData) > 0 ? $rem_sess_time = intval($sessData[0]['sess_end']) - intval($currentTime) : $rem_sess_time = 6000;
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
/*			$resumingCID
			isset($_GET['cid']) || isset($_POST['cid']) ? $resumingCID = _uniqconv_id_enc$_SESSION['converse_id'] : $resumingCID = 0;//-1; 
			isset($_GET['cid']) || isset($_POST['cid']) ? $cidLimit = FALSE : $cidLimit = TRUE;
*/			  
			$chatPage .= "<form method='post' role='form' id='enquiry_data' enctype='multipart/form-data'>
			<input type='hidden' id='sdk' name='sdk'/>
			<input type='hidden' name='recipient_id' id='recipient_id' value='".$recipient_id."'>

			 <input type='hidden' name='loginAudio' id='loginAudio' value='0'>
			<input type='hidden' name='rem_time' id='rem_time' value='$rem_sess_time'>
			<input type='hidden' name='encmsg' id='encmsg' value=''>
			<input type='hidden' name='rcid' id='rcid' value='$_uniqconv_id_enc'>
			<input type='hidden' name='category' id='category' value='$_cat'>
			<input type='hidden' name='cat' id='cat' value='$cat_tbl'>
			<input type='hidden' name='cid' id='cid' value='$_uniqconv_id_enc'>
	        <input type='hidden' name='msgReply' id='msgReply' value=''>
			<input type='hidden' name='quote' id='quote' value=''>
			<input type='hidden' name='guid' id='guid' value='$me'>
			<input type='hidden' name='chatpop' id='chatpop' value='duo'>
			<input type='hidden' name='mediaUsed' id='mediaUsed' value='0'>";

			if($myXpatStatus == 1 ){
	       		$chatPage .="<input type='hidden' name='lock' id='lock' value=''>";
			}


			$chatPage .= "<div style='padding-bottom:100px;'><div id='all_chat' style='min-height:60vh; margin-bottom:100px; scroll-snap-type:x mandatory;'>".$usersView->chatPg($recipient_id, $_uniqconv_id_enc, $_cat, '')."</div></div><br>";
	
			/*$secondClt = '1';
			$_engagerList = substr($engagerList, 1, -1);

			$each_recipient = explode('-', $_engagerList);
			
			$recip_num = count($each_recipient);
			$others_num = $recip_num - 1;*/

/*			if( $recip_num > 1 && $xpat == '1'){
				$chatPage .="<div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:30px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:30px;'><span style='width:15px; height:15px; background:#2166f3; color:#fff; display:flex; justify-content:center; align-items:center; font-size:10px; border-radius:50%;'>$others_num</span>
						<span class='material-icons'>&#xe5d4;</span>
					</div>";
			}
*/
			if($myXpatStatus == 0){

				$chatPage .="<span style='display:none;' id='countdownSpan'><div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:40px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:40px;'><span style='width:25px; height:25px; background:red; color:#fff; display:flex; justify-content:center; align-items:center; font-size:16px; border-radius:50%;' id='session_elapse'></span>
					<span class='material-icons'>&#xe5d4;</span>
				</div></span>";
			}
		
			$myXpatStatus == 1? $recipient = 'client' : $recipient = $expertDesc;
						$chatPage .= "<div style='position:fixed; bottom:12%; right:7%; z-index:20; border-radius:50%;' id='chatLock'></div>"; 
			
			$chatPage .= "<span style='position:fixed; bottom:6.5%; display:none; margin-left:10px; justify-content:center; width:80%; border-top-left-radius:10px;  border-top-right-radius:10px; background:rgba(0,0,0,.2); padding:5px 10px 5px 10px; z-index:2; font-size:16px;' id='replyPanel' onclick='removePanel();'></span>
			
			            <div style='align-items:flex-end; justify-content:flex-end; display:flex; justify-content:center; width:100%; padding:0 10px 0 10px; z-index:2;' id='chatInputShell'>
			<span style='display:none; margin-left:10px; justify-content:center; width:80%; border-top-left-radius:10px;  border-top-right-radius:10px; background:#ddd; padding:5px 10px 5px 10px; z-index:2; font-size:16px;' id='replyPanel' onclick='removePanel();'></span>        
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
		/*}else{
		    //else for haltResponse
			$chatPage .="<div style='display:flex; font-size:55px; align-items:center; justify-content:center; height:100vh; width:100vw;'>No current task available</div>";
		}*/

/*	}else{
	
	$chatPage.='<div>Sorry, an error occured!</div>';
}
*/
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
