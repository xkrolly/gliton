<?php
//include('../includes/autoloader.inc.php');

	$usersContr = new usersContr();
	$usersView = new usersView();
$chatPage = '';
if(isset($_GET['lectureid'])){

	$lectureID_enc_cons = $_GET['lectureid'];
	$class_date = $_GET['date'];
	$chatAudience = 'group';
	$beginClass = $usersView->checkClassTime($chatAudience, $class_date);

	$lectureID = $usersView->dec_cons($lectureID_enc_cons);
	$lectureID_enc_cons = str_replace(' ', '+', $lectureID_enc_cons);
	
	$lectureIDarr = explode('_', $lectureID); 
	//$topic.'_'.$host.'_'.$classTime.'_'.$creationTime;
	
	$category = $lectureIDarr[1];
                $aoi_array = $usersView->aoi($category);
            	$queCol = $aoi_array['queCol'];
				$user_id_col = $aoi_array['user'];
				$cat_id = $aoi_array['cat_id'];
				$cat_tbl = $aoi_array['topic'];
				$expert = $aoi_array['expert'];

$lectureID_enc_cons2 = $usersView->enc_cons($lectureID_enc_cons);
$lectureID_enc_cons2Dec = $usersView->dec_cons($lectureID_enc_cons2);
	$chatPage .="<script src='scripts/jquery-3.6.0.min.js'></script>
					
				<script type='text/javascript' src='scripts/crypto-js.js'></script>
				<script type='text/javascript' src='scripts/key.js'></script>
	            <script type='text/javascript' src='scripts/autoupd.js'></script>

				<script>
//grp chat shrd key stored this way
	    		localStorage.setItem('rid_enc_cons', '$lectureID_enc_cons');

	    		//alert('LectIDEnc_cons: '+'$lectureID_enc_cons'+' ==== enc_con2: '+'$lectureID_enc_cons2'+' ==== lectureIDEnc_con2_dec: '+'$lectureID_enc_cons2Dec');

			   	localStorage.setItem('shrd'+'$lectureID_enc_cons', '$lectureID_enc_cons');
	    		localStorage.setItem('rid', '0');
			   	localStorage.setItem('chatpop', 'multiple');
   	
			      function getDecrypted(msg, chid, cat){
			        var sh = localStorage.getItem('shrd'+'$lectureID_enc_cons');
			        var xy = sym_decrypt(msg, sh);
			        document.getElementById(chid).innerHTML = xy;
					localStorage.setItem('dir'+chid, cat+'/'+msg);
			      }
				</script>

			   <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
			   <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
			        <source id='webcam' src='' type='video/webm'>
			   </video>
			   			   <span id='log'></span>
                <div id='activeTimer2' style='position:fixed; bottom:48%; left:48%; z-index:101; color:red; font-size:25px;'></div>    
			   <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
			   </div>
     
			<div id='response' style='display:none; z-index:80; font-size:16px; font-family:roboto; border-radius:5px; text-align:center; padding:5px; color:#fff; background-color:#2176f3;'></div>";
			
			$chatPage .= "<form method='post' role='form' id='enquiry_data' enctype='multipart/form-data'>
			<input type='hidden' id='sdk' name='sdk'/>

			 <input type='hidden' name='loginAudio' id='loginAudio' value='0'>
			 <input type='hidden' name='mediaUsed' id='mediaUsed' value='0'>
			 <input type='hidden' name='msgReply' id='msgReply' value=''>
			<input type='hidden' name='quote' id='quote' value=''>
			<input type='hidden' name='cat' id='cat' value='$cat_tbl'>
			<input type='hidden' name='cid' id='cid' value='$lectureID_enc_cons'>
			<input type='hidden' name='rcid' id='rcid' value=''>
			<input type='hidden' name='chatpop' id='chatpop' value='multiple'>
			<input type='hidden' name='categoryg' id='category' value='$category'>

			<input type='hidden' name='encmsg' id='encmsg' value=''>";
			if($xpat == 1 ){
	       		$chatPage .="<input type='hidden' name='lock' id='lock' value='0'>";
			}

			$chatPage .= "<div style='padding-bottom:80px;'><div id='all_chat' style='min-height:6vh; scroll-snap-type:x mandatory;'>".$usersView->groupChats($lectureID_enc_cons)."</div></div><br>";
	
			if($xpat !== '1'){

				$chatPage .="<span style='display:none;' id='countdownSpan'><div style='display:flex; justify-content:center; align-items:center; filter:drop-shadow(1px 1px 1px #ccc); width:40px; position:fixed; bottom:80px; right:.1%; border-top-left-radius:35%; border-bottom-left-radius:35%; background:#fff; height:40px;'><span style='width:25px; height:25px; background:red; color:#fff; display:flex; justify-content:center; align-items:center; font-size:16px; border-radius:50%;' id='session_elapse'></span>
					<span class='material-icons'>&#xe5d4;</span>
				</div></span>";
			}
		
			$xpat == 1? $recipient = 'clients' : $recipient = $expert;
						$chatPage .= "<div style='position:fixed; bottom:12%; right:7%; z-index:20; border-radius:50%;' id='chatLock'></div>"; 

			$beginClass == '1' ? $display = 'flex' : $display = 'none';

			$chatPage .= "<div style='display:none; position:fixed; bottom:10%; margin-left:10px; justify-content:center; width:80%; border-top-left-radius:10px;  border-top-right-radius:10px; background:#ddd; padding:5px 10px 5px 10px; z-index:2; font-size:16px;' id='replyPanel' onclick='removePanel()'></div>
			
			<div style='display:flex; position:fixed; bottom:10%; margin-right:10px; justify-content:center; width:100%;  z-index:2; font-size:22px; color:#888;' id='ideasPanel' onclick='openIdeasPanel()'><i class='fa fa-hands'></i></div>
			

			            <div style='display:$display; justify-content:center; width:100%; padding:0 10px 0 10px; z-index:2;' id='chatInputShell'>
			        
							<div style='display:flex; align-items:center; justify-content:center; background:#fff; border:1px solid #ccc; border-radius:10px; filter:drop-shadow(1px 1px 1px #333);' class='chatInput'>
								<textarea value='' oninput='changeSubBtnId()' name='enquiry' id='enquiry' class='form-control' style='width:70%; font-size:16px; height:40px; max-height:200px; padding:8px; border:0px;' placeholder='Chat with a ".$recipient."...'></textarea>
								<div style='display:flex; justify-content:space-around; width:25%; align-items:center;'>
								 <div id='recordButton' style='border:transparent; background:transparent; padding:0; margin-right:8px;'>
								       <span class='material-icons dropshadow' id='mic' style='color:#222;'>&#xe029;</span>
									</div>
									<input type='file' name='upload[]' id='upload' class='upload' multiple onchange='loadImg()' style='width:2px; height:2px;'>
									<div id='imgUpload' style='border:transparent; background:transparent; padding:0;'><span id='uploadIcon' class='uploadIcon material-icons' style='margin-bottom:2px;'>&#xe226;</span>
									</div>
									<div style='border:transparent; background:transparent; padding:0; margin-left:8px;' id='vidrec'><span class='material-icons off-theme2'>&#xe412;</span></div>
								</div>
							</div>
							<button type='submit' id='post_enq' style='display:flex; height:50px; width:50px; border-radius:50%; justify-content:center; align-items:center; border:2px solid #2186f3; background:#2186f3; color:#fff; margin-left:5px; filter:drop-shadow(1px 1px 1px #333);'><span id='activeTimer' style='font-size:12px'></span><span id='setInner'>
								<span class='material-icons' style='font-size:26px;' id='stopRecord'>&#xe163;</span></span>
							</button>
						</div>
						</form>";


$chatPage .="
						<script src='scripts/chat.js'></script>
						<script src='scripts/app.js'></script>
			        	<script>
			        	        var imgArray = []; //used on recorder2.js

                          $(window).on('load', function () {
                                $('#loader').hide();
                                $('#loaderBg').hide();
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
                            var sh = localStorage.getItem('shrd'+'$lectureID_enc_cons');
        			         var xy = sym_decrypt(msg, sh);
        			                xy !== '' ? panel.innerHTML = xy : panel.innerHTML = '<i>picture or audio file selected</i>';
        			      document.getElementById('quote').value = xy;
        			      document.getElementById('enquiry').focus();
                        }
                        
                        function removePanel(){
                            document.getElementById('msgReply').value = '';
                            $('#replyPanel').hide();
                            
                        }
//			      $beginClass == '1' ? document.getElementById('chatInputShell').style.display = 'flex' : document.getElementById('chatInputShell').style.display = 'none';

    					</script>";

return $chatPage;
}