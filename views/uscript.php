<?php
$usersContr = new usersContr();
$usersView = new usersView();

$chatPage = '';
if(isset($_POST['category']) && !empty($_POST['title']) && !empty($_POST['mediaType'])){

	$catid = $_POST['category'];
	$title = $_POST['title'];
//	$media_proof_init = $_POST['mediaproof'];
	$mediaType = $_POST['mediaType'];

                $aoi_array = $usersView->aoi($catid);
            	$queCol = $aoi_array['queCol'];
				$user_id_col = $aoi_array['user'];
				$cat_id = $aoi_array['cat_id'];
				$cat_tbl = $aoi_array['topic'];
				$expert = $aoi_array['expert'];
				$directory = $aoi_array['folder'];
				
	///$storageKey = rand(1000, 9999).rand(1000, 9999).rand(1000, 9999).rand(1000, 9999).rand(1000, 9999);
//	var_dump('cat TAble: '.$cat_tbl.' ==== queCol: '.$colVal.'====='.$storageKey);
	////$storageKeyEnc = $usersView->enc_cons($storageKey);

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$que = $userData[0]['save_que'];

//check for double prevention
$checkData = $usersView->select($cat_tbl, ' WHERE '.$queCol.'= ?', $que);//media_proof_init);
if(isset($_POST['cid'])){
    $cid = $_POST['cid'];
    $now = time();
    $vals2 = $now.', '.$cid;
    $usersContr->update('pending', 'newupdate = ? WHERE projectID = ?', $vals2);
	
}
if(count($checkData) == 0 && !isset($_POST['cid']) ){
    //get the que from profile save_que
	$vals = array($queCol=>$que, $user_id_col=>$me);
	$usersContr->insert($cat_tbl, $vals);
	
	//move the file from temp folder to dec folder
	$oldPath = 'videos/temp/'.$que;
	$newPath = 'videos/'.$directory.'/'.$que;
	copy($oldPath, $newPath);
	unlink($oldPath);

/////generate contentID
	$contentID = $me.'_0_'.$catid.'_'.time();
	$contentID_enc =  $usersView->enc_cons($contentID);

	$valu = $que.', '.$me;
	$data = $usersView->select($cat_tbl, ' WHERE '.$queCol.'= ? AND '.$user_id_col.'= ?', $valu);
	$colVal = $data[0][$cat_id]; 

	$val = array('scriptor_id'=>$me, 'category_id'=>$catid, 'content_id'=>$contentID_enc, 'title'=>$title, 'media'=>$mediaType, 'flag'=>$catid, $cat_id=>$colVal);
	$usersContr->insert('solochat', $val);

	$val2 = array('scriptor_id'=>$me, 'category_id'=>$catid, 'content_id'=>$contentID_enc, 'media'=>$mediaType, $cat_id=>$colVal);
	$usersContr->insert('solochat', $val2);
    
        //add to pending
        $projectID = $contentID_enc;
        $mediaType = 3; 
        $owner = $me;
        $contributors = 0;
        $projectType = 1;
        $usersView->addToPending($catid, $title, $projectID, $mediaType, $owner, $contributors, $projectType);
}

$valu = $que;
$tablData = $usersView->select($cat_tbl, ' WHERE '.$queCol.' = ?', $valu);
$col_id = $tablData[0][$cat_id];

$soloData = $usersView->select('solochat', ' WHERE '.$cat_id.' = ?', $col_id);
$contentID_enc = $soloData[0]['content_id'];
$startDate = $soloData[0]['cdate'];
$timeOfDay = $usersView->estDate($startDate, $soloData[0]['cdate']);
//$timeOfDay = $usersView->estDate('2024-11-01 06:00:00', '2024-11-04 06:00:00');
//$timeOfDay = $usersView->timeBanner($soloData[0]['cdate']);
    
        $catid = $catid;
        $directory = $directory;
		$rid='';
		$chid='';
		$lck='0';
		$uploadURL ='views/solo_vid_upload.php';
		$addVideoFrame = 0;
		$addSpanPadin = 0;

	$chatPage .="<script src='scripts/jquery-3.6.0.min.js'></script>
					
				<script type='text/javascript' src='scripts/crypto-js.js'></script>
				<script type='text/javascript' src='scripts/key.js'></script>
	            <script type='text/javascript' src='scripts/autoupd.js'></script>
	            <script type='text/javascript' src='scripts/mediaHandler.js'></script>

				<script>
					//grp chat shrd key stored this way
	    		localStorage.setItem('rid_enc_cons', \"$contentID_enc\");
			        var sh = localStorage.getItem('solokey');
	    		localStorage.setItem('shrd'+'$contentID_enc', sh);

		        function getDecrypted(msg, chid, cat){
			        var sh = localStorage.getItem('solokey');
			        var xy = sym_decrypt(msg, sh);
			        document.getElementById(chid).innerHTML = xy;
					localStorage.setItem('dir'+chid, cat+'/'+msg);
		        }
		        
		          function hideDashboard(){
		        	$(\"#dashboard\").slideUp();
		        	$(\"#dashboardCaller\").slideDown();
		        		
		        }
   		        function showDashboard(){
		        	$(\"#dashboard\").slideDown();
		        	$(\"#dashboardCaller\").slideUp();
		        		
		        }

				</script>

				 <div onclick='showDashboard()' id='dashboardCaller' style='display:flex; padding-bottom:20px; width:100%; position:fixed; bottom:0; justify-content:center;'><span  style='width:50px; height:50px; filter:drop-shadow(1px 1px 1px #ccc); border-radius:50%; background:deepskyblue; border:5px solid #fff; margin-left:auto; margin-right:auto;'></span></div> 

    		         <div style='width:100%; text-align:center; position:fixed; top:0; z-index:25; margin-top:34px; font-size:10px;'><span id='timeBanner' style='padding:5px; background:#fff; border-radius:5px; color:#444;'>$timeOfDay</span></div>

                    <div style='width:100%; background:transparent; display:flex; justify-content:center;'>
                        <div  onclick='hideDashboard()' id='dashboard' class='each-section newchat' style='display:flex; position:fixed; bottom:0; justify-content:center; width:85%; background:rgba(255, 255, 255, 0.1); filter:drop-shadow(1px 1px .5px #000); padding-top:30px; border-top-right-radius:100%; border-top-left-radius:100%; z-index:50; padding-bottom:10px;'>
					        <div style='width:60px; height:60px; border-radius:50%; margin-right:20px; display:flex; justify-content:center; align-items:center; border:6px solid #888;'>
                                 <span class='material-icons' style='font-size:30px; color:rgba(0, 0, 0, .6);' onclick='accessCamera();'>&#xe412;</span>
					        </div>
					        <div onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"500px\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"60\", \"\");' style='width:35px; height:35px; border-radius:50%; display:flex; justify-content:center; align-items:center; border:2px solid #2166f3; background:#2166f3;'>	
					        	<div style='font-size:14px; border:transparent; background:rgba(0 0 0 .4); color:#fff; padding:0;'>
					        		60s
					        	</div>
							</div>

					        <div onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"500px\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"120\", \"\");' style='width:60px; height:60px; border-radius:50%; display:flex; justify-content:center; align-items:center; border:6px solid #fff; filter:drop-shadow(1px 1px 0.5px #aaa); background:#2166f3;'>	
					            <div style='display:flex; align-items:center; justify-content:center; border:transparent;'>
                                     <span class='material-icons' style='font-size:34px; color:#fff;'>&#xe04b;</span>
    					        </div>
							</div>

					        <div onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"500px\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"5\", \"\");' style='width:35px; height:35px; margin-right:20px; border-radius:50%; display:flex; justify-content:center; align-items:center; border:2px solid #2166f3; background:#2166f3;'>	
					        	<div style='font-size:14px; border:transparent; background:transparent; color:#fff; padding:0;'>
					        		5s
					        	</div>
							</div>

					        <div style='width:60px; height:60px; border-radius:50%; display:flex; justify-content:center; align-items:center; border:6px solid #fff; filter:drop-shadow(1px 1px 0.5px #aaa); background:rgba(0, 0, 0, .1);'>
					        	<div id='recordAudio' style='border:transparent; background:transparent; padding:0; 
					        	display:flex; flex-direction:column; justify-content:center; align-items:center;'>
								    <span id='setInner' style='display:flex; justify-content:center; align-items:center;'>
                                       <span class='material-icons' id='mic' style='font-size:36px; color:#fff; filter:drop-shadow(.5px .5px 0.5px #444);'>&#xe029;</span>
								    </span>
								    <span id='activeTimer' style='color:red; font-size:10px;'></span>
								</div>
							</div>
							<div id='cancelAudio' style='width:20px; height:20px; border-radius:50%; background:red; color:#fff; display:none; justify-content:center; align-items:center;'>x</div>
						</div></div>

			   <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
			   <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
			        <source id='webcam' src='' type='video/webm'>
			   </video>
			   
			   			   <span id='log'></span>
                ".$usersView->countDownStyled()."

			   <button id='switch' class='sm' style='position:fixed; bottom:20px; left:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Switch</button>
			   <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
			   </div>
     
			<div id='response' style='display:none; z-index:80; font-size:16px; font-family:roboto; border-radius:5px; text-align:center; padding:5px; color:#fff; background-color:#2176f3;'></div>";
			
			$chatPage .= "<form method='post' role='form' id='enquiry_data' enctype='multipart/form-data'>
			<input type='hidden' id='sdk' name='sdk'/>

			 <input type='hidden' name='loginAudio' id='loginAudio' value='0'>
			 <input type='hidden' name='msgReply' id='msgReply' value=''>
			<input type='hidden' name='quote' id='quote' value=''>
			<input type='hidden' name='category' id='category' class='category' value='$catid'>
			 <input type='hidden' name='mediaproof' id='mediaproof' value=''>
			 <input type='hidden' name='user' id='user' value=''>
			 <input type='hidden' name='encmsg' id='encmsg' value=''>
			 <input type='hidden' name='dir' id='dir' value='$directory'>
			 <input type='hidden' name='cat' id='cat' value='$directory'>
			 <input type='hidden' name='chatpop' id='chatpop' value='1'>
			 <input type='hidden' name='cid' id='cid' value='$contentID_enc'>
			 <input type='hidden' name='mediaType' id='mediaType' value='0'>
			 <input type='hidden' name='recipient_id' id='recipient_id' value='0'>
			 <input type='hidden' name='enquiry' id='enquiry' value=''>
			 <input type='hidden' name='chat_id' id='chat_id' value=''>";

			if($xpat == 1 ){
	       		$chatPage .="<input type='hidden' name='lock' id='lock' value='0'>";
			}

			$chatPage .= "
			<div style='padding-bottom:80px;'><div id='all_chat' style='min-height:6vh; scroll-snap-type:x mandatory; content-visibility:auto; contain-intrinsic-size:1px 5000px;'>".$usersView->soloscript($contentID_enc, $cat_tbl)."</div></div><br>";
	
			if($xpat !== '1'){

				$chatPage .="<span style='display:none;' id='countdownSpan'>
				<div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:40px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:40px;'>
				    <span style='width:25px; height:25px; background:red; color:#fff; display:flex; justify-content:center; align-items:center; font-size:16px; border-radius:50%;' id='session_elapse'></span>
					<span class='material-icons'>&#xe5d4;</span>
				</div></span>";
			}

			$xpat == 1? $recipient = 'clients' : $recipient = $expert;
						$chatPage .= "<div style='position:fixed; bottom:12%; right:7%; z-index:20; border-radius:50%;' id='chatLock'></div>"; 

			$chatPage .= "<div style='display:none; position:fixed; bottom:10%; margin-left:10px; justify-content:center; width:95%; border-top-left-radius:10px;  border-top-right-radius:10px; background:#ddd; padding:5px 10px 5px 10px; z-index:2; font-size:16px;' id='replyPanel' onclick='removePanel()'></div>
			<div id='setInner'></div>
			<div id='post_enq'></div>
			          
				        
						</form>

<video style='z-index:10; display:none; background:#fff; height:100vh; width:100%; object-fit:cover; position:fixed; top:0; left:0;' id='camera-preview' class=''>
</video>
	<div id='snap' style='z-index:120; color:#fff; position:fixed; bottom:10px; background:transparent; display:none; width:100%; padding:5px;'>
		<span id='link' style='padding:10px; background:transparent; border:2px solid #fff; border-radius:10px; margin-left:2px;'>snap</span>
	</div>
<div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:30px;'>

<canvas id='canvas' style='background:transparent; border:1px solid #000; width:100%; height:100vh; z-index:11; display:none; position:fixed; top:0; left:0;'>
</canvas>
	<div id='cancel' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-250px;'>
		<div style='display:flex; justify-content:center;'>
				<div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:#fff; margin-right:30px; margin-left:auto;'>
			    <span class='material-icons' style='color:red; font-size:30px;'>&#xe5c9;</span>
            	</div>
				<div id='proceed' onclick='proceedWithUpload(\"$contentID_enc\", \"$cat_tbl\", \"$que\");' style='display:flex; justify-content:center; align-items:center; background:#fff; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-right:auto; margin-left:30px;'>
		            <span class='material-icons' style='color:#2166f3; font-size:30px;'>&#xe86c;</span>
            	</div>
   	</div>
	</div>

</div>
";



return $chatPage;
}
else{
	$reply ="<div style='position:fixed; bottom:20px; left:100px; padding:50px; font-size:14px; color:#2166f3;'>
				<div style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:70px; width:70px; background:#fff; border:2px solid red; margin-bottom:20px;'>
					<span class='material-icons' style='font-size:35px; font-weight:1000; color:red;'>&#xe5c9;</span>
				</div>
				<p>Sorry! Both the title and proof of existence of the problem are required to proceed. Kindly add both. Thanks.</p>
				<a href='solscript'>&lt;&lt;Back</a>
			</div>";
	return $reply;
}