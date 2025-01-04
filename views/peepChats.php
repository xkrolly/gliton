<?php
  $usersContr = new usersContr();
  $usersView = new usersView();

  $udata = $usersView->fetchUser();
  $me = $udata[0]['profile_id'];
  $regCompleted = $udata[0]['regCompleted'];

if($regCompleted == 1){
    
        if(isset($_GET['pub'])){
          //$_GET['solo'] == $usersView->encryptor0('solo');
          $pub_id = $usersView->decryptor0( str_replace(' ', '+', $_GET['pub']) );
    
          //get the pub_id
          $pub_data = $usersView->select('publish', ' WHERE pub_id = ?', $pub_id);
          $published = $pub_data[0]['published'];
          $product_ID = $published;

          //CHECK to prevent double purchase
          $usersView->checkPurchase($product_ID); //checkSubscription will work

    	  //Access only to paid user
    	  $buyer = $usersView->enc_cons($me);
    	    //check the sharedKey
    	  $sharedK = $usersView->getSharedKey($product_ID);
    	  $sharedK_enc_cons = $usersView->enc_cons($sharedK);
    	  $_vals = $product_ID.', '.str_replace('==', '', $buyer);
          $purchData = $usersView->select('purchase', ' WHERE product_id = ? AND buyer = ?', $_vals);

      if(count($purchData) > 0){
        //////////////////////////////////
          $published_dec = $usersView->dec_cons($published);
          $pub_array = explode("_", $published_dec);
          $sender = $usersView->encryptor0($pub_array[0]);
    
          $pub_data[0]['chatpop'] == 'd' ? $recipient = $usersView->encryptor0($pub_array[1]) : $recipient = 0;
    ///////////////////////////////

          $vals = str_replace(' ', '+', $published);
          $pub_data[0]['chatpop'] == 'd' ? 
          $resultChats = $usersView->select('chat', ' INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) WHERE uniq_conv = ? ORDER BY chat_id DESC', $vals) : 
          ($pub_data[0]['chatpop'] == 's' ? 
            $resultChats = $usersView->select('solochat', ' INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) WHERE content_id = ? ORDER BY solo_id DESC', $vals) : 
            $resultChats = $usersView->select('grpchat', ' INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) WHERE uniq_conv = ? ORDER BY chat_id DESC', $vals));
    
          $cat = $resultChats[1]['category_id'];
         // $usersView->checkSubscription( $cat, $product_ID );
   
          $ln = count($resultChats) - 1;
          $Chats = "<div id='all_chat'>";   
          $pub_data[0]['chatpop'] == 's' ? $learner = $resultChats[$ln]['scriptor_id'] : $learner = $resultChats[$ln]['sender_id'];
    
          $Chats .="<div style='position:fixed; top:0; left:0; height:100vh; width:100vw; z-index:0; background:transparent;'>
                    <div style='display:flex; flex-direction:column; height:100%; justify-content:center; align-items:center;'>
                      <div style='display:flex; flex-direction:column; justify-content:center; align-items:center; color:#fff; border-radius:50%; font-weight:bold; font-family:sans-serif; font-size:20px; background:#eee; height:110px; width:110px;'>
                        <div>GLIT</div>
                        <div style='font-size:10px; color:#2196f3; margin-top:-8px; opacity:.3;'>solution</div>
                      </div>
                    </div>
                    </div>
                  ";
    
          while($ln >= 0){
            $flag = $resultChats[$ln]['flag'];
            $replyto = $resultChats[$ln]['replyto'];
            $pub_data[0]['chatpop'] == 's' ? $uniqconv_ID = $resultChats[$ln]['content_id'] : $uniqconv_ID = $resultChats[$ln]['uniq_conv'];
    
            $sc = $usersView->getSharedKey($uniqconv_ID);
    
            $pub_data[0]['chatpop'] == 's' ? $chat_id = $resultChats[$ln]['solo_id'] : ($pub_data[0]['chatpop'] == 'm' ? $chat_id = $resultChats[$ln]['gchat_id'] : $chat_id = $resultChats[$ln]['chat_id']);
            $pub_data[0]['chatpop'] == 's' ? $sender = $resultChats[$ln]['scriptor_id'] : $sender = $resultChats[$ln]['sender_id'];
        // $xptID = $resultChats[$ln]['sender_id'];
           
            $pub_data[0]['chatpop'] == 'd' ? $recipient = $resultChats[$ln]['recipient_id'] : $recipient=0;;
            
            $agro_id = $resultChats[$ln]['agro_id'];
            $hth_id = $resultChats[$ln]['hth_id'];
            $guide_id = $resultChats[$ln]['guide_id'];
            $vet_id = $resultChats[$ln]['vet_id'];
            $cook_id = $resultChats[$ln]['cook_id'];
            $insight = $resultChats[$ln]['insight'];
            
            $category_id = $resultChats[$ln]['category_id'];
            $locked = $resultChats[$ln]['locked'];
            
            $mode = $resultChats[$ln]['media'];
    
            $mode == 2 ? $cWidth = 'width:80%;' : ($mode == 3 ? $cWidth = 'width:80%;' : $cWidth='max-width:80%;');
            $pub_data[0]['chatpop'] == 's' ? $cWidth = 'width:100%;' : $cWidth; 
            /////////////////////replyto code
            $locked == 1 ? $visibility = $usersView->permission($category_id, $me) : $visibility = 1;
    
            $uniq_id = '';
    				$uniq ='';
    			  $replyTomsg = '';
    			
            if(!is_null($replyto) && $replyto > 0){
    		        $quote = $usersView->getQuote($replyto);
    		       	$replyTomsg .= $quote;
    				    $uniq_id .= 'reply'.$replyto;
    				    $uniq .=$replyto;
    		    }
    		    
            $array = $usersView->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
    	 			
            $queCol = $array['queCol']; 
            $user_id_col = $array['user_id_col'];
            $cat_id = $array['col_id'];
            $catID_val = $array['colval'];
            $cat_tbl = $array['topic'];
            $expert = $array['expert'];
            $chat_msg = $resultChats[$ln][$queCol];
            $chatDir = $array['strDir'];
                
            $_timestamp = strtotime($resultChats[$ln]['cdate']);
            $timestamp = date('H:i', $_timestamp);
            $timeOfDay = $usersView->timeBanner($resultChats[$ln]['cdate']);
    
            $mode = $resultChats[$ln]['media'];
            $recipient_enc = $usersView->enc_cons($learner);
            $audioUrl =$chat_msg;// $this->decryptor0($que);
            $mode == 3 ? $usersView->videoDecryptor($audioUrl, $chatDir) : '';
    
            $mode == 1 ? $format = "<audio controls style='' class='audiostyle'><source src='sounds/".$chatDir."/".$audioUrl.".webm' type='audio/webm' /></audio>" : ($mode == 2 ? $format = "<div style='width:100%; height:500px;' id='div".$_timestamp."'><img src='img/".$chatDir."/".$chat_msg.".webp' class='chatimg flexible' style='width:100%; height:500px; object-fit:cover;' id='peep".$chat_id."'/></div>" : ($mode == 3 ? $format = "<video class='flexible2' id='vid".$chat_id."' style='width:100%; height:500px; object-fit:cover;' src='videos/".$chatDir."/dec/".$audioUrl.".webm'></video>" : $format = "<span id='decr".$chat_id."'></span><script>
    
                var chat_m = sym_decrypt('$chat_msg', '$sc');
                document.getElementById('decr' + '$chat_id').innerHTML = chat_m;
                </script>"));
    
            if(!empty($flag)){
              $chat_flag = $cat_tbl;
          $pub_data[0]['chatpop'] == 's' ? $dp = $usersView->generate_DP($sender, '20px', '') : $dp = $usersView->generate_DP($recipient, '20px', '');
    
              $Chats .="<div class='each-sectio' onclick='$(\".each-sectio\").slideUp();' style='display:flex; position:fixed; z-index:2; top:0; width:100vw; align-items:center; justify-content:space-between; margin-top:0; margin-bottom:5px; background:rgba(0,0,0,.4); padding: 5px; color:#fff; font-size:12px;'>
                    <div style='color:yellow; width:33%;'>".$dp." ".$expert."</div>
                    <div style='font-size:14px; font-weight:bold; width:33%; text-align:center;'>".ucfirst($chat_flag)."</div>
                      <div style='color:deepskyblue; font-weight:bold; width:33%; text-align:right'>
                          <span class='material-icons' style='margin-left:10px; color:#fff; font-size:20px;'>&#xe5d4;</span>
                      </div>
                    </div>";
             $Chats .="<div></div>
             <div style='width:100%; text-align:center; position:fixed; top:0; z-index:25; margin-top:34px; font-size:10px;'><span id='timeBanner' style='padding:5px; background:#fff; border-radius:5px; color:#444;'>DAY 1 <span style='height:7px; width:2px; border:1px inset #eee; margin-left:5px; margin-right:5px;'></span> $timeOfDay</span></div>
             ";
            }
      
    $Chats.="<div style='display:flex; justify-content:center; margin-top:5px;'>";
            if($sender == $learner && $flag == 0 ){// && is_null($flag) ){
                  $pub_data[0]['chatpop'] == 's' ? $style = 'z-index:1;' : $style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; margin-right:5px;';
                  $pub_data[0]['chatpop'] == 's' ? $style2 = 'z-index:1;' : $style2 = 'padding:10px; border-radius:20px 20px 0 20px;';
                  $pub_data[0]['chatpop'] == 's' ? $class = '' : $class = 'each-section chatInput';
    
                $Chats .= "<div class='$class' id='".$chat_id."' style='$style; font-size:16px; margin-bottom:4px;' class='newchat'>
                            <div style='position:relative; color:#000; background:#fff; $style2; ".$cWidth."' id='iaudio'>
                                <div>
                                    <a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a>
                                </div>".
                                $format."
                               					            <figcaption id='ins".$chat_id."' style='position:absolute; top:0; left:0; font-size:14px; max-height:50%; display:none; justify-content:center; align-items:center; width:100%; z-index:610;'>
    					            	<div style='display:flex; flex-direction:column; z-index:10; width:100%; color:#fff; text-shadow:1px 1px #222; height:500px;'>
    					            		<div style='border-top-right-radius:20px; border-top-left-radius:20px; padding:20px; width:100%; margin-top:auto; padding-bottom:50px; text-align:justify;  background:rgba(255, 255, 255, .05);'>
																<div onclick='$(\"#ins".$chat_id."\").slideUp(1000);' style='display:flex; justify-content:center; margin:0 auto 20px auto;'>
																	<div onclick='$(\"#ins".$chat_id."\").slideUp(1000);' style='height:4px; width:30px; background:#fff; border:1px solid #fff; border-radius:20px;'>
																	</div>
																</div>
				    					            <div id='cntted".$chat_id."' style='width:100%;'>".$insight."
				    					            </div>
    					            	  </div>
    					           		</div>
    					          	</figcaption>
     
                                    <span style='font-size:12px; color:#999; text-align:right; padding-left:5px; width:100%;'>".$timestamp."</span>";
                                    if(!empty($insight)){$Chats .="<span onclick='$(\"#ins".$chat_id."\").slideDown();' style='margin-left:20px; color:deepskyblue;' class='material-icons'>&#xe88e;</span>";}
                                 $Chats .="</div>
                        </div>
                  <script>
                			 var replyMsg = sym_decrypt('$replyTomsg', '$sc');
    
                    		if('$replyto' !== '' ){
                    			      if('$replyto' !== '0'){
                    			        document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
                    			        $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'#eee'});
                    			    }  
                    		}
                	</script>";
            }
    
            if($sender != $learner && $flag == 0  && $visibility == 1){
      $dp = $usersView->generate_DP($sender, '20px', '');
    $profileData = $usersView->fetchProfile($sender);
    $fullname = ucfirst($usersView->decryptor0($profileData[0]['firstname'])).' '.ucfirst($usersView->decryptor0($profileData[0]['lastname']));
    
    $colorr = 'red';
        $sender == $learner ? 
        $admin = "<div style='display:flex; color:red; align-items:center; justify-content:space-between; min-width:30px; font-size:10px; font-weight:bold;'>$dp <div style=' margin-left:5px; margin-right:5px; height:2px; width:2px; background:red; border-radius:50%;'></div> $expert <i class='fa fa-microphone' style=' margin-left:auto;'></i></div>"
         : $admin = "<div style='display:flex; align-items:center; font-size:10px; color:$colorr; font-weight:bold; padding-right:10px;'>$dp<div style=' margin-left:8px; margin-right:8px; height:2px; width:2px; background:#aaa; border-radius:50%;'></div>$fullname</div>";
                  $Chats .= "<div class='each-section chatInput' id='".$chat_id."' style='filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-start; font-size:16px; margin-left:10px; margin-bottom:4px;' class='newchat'><span style='background:deepskyblue; color:#fff; padding:10px; border-radius:20px 20px 20px 0; ".$cWidth."' id='uaudio'><div><a id='".$uniq_id."' href='#".$uniq."' style='color:#000; text-decoration:none;'></a></div>
    <div style='margin:-5px 20px 5px auto; padding:-10px; width:100%; text-align:left;'>$admin</div>
              
                  ".$format."<span style='font-size:12px; color:#bbb; margin-left:5px;'>jjj".$timestamp."</span></span></div>
                  <script>
                			        var replyMsg = sym_decrypt('$replyTomsg', '$sc');
                    			    if('$replyto' !== '' && '$replyto' !== '0'){
    
                        			    document.getElementById('reply' + '$replyto').innerHTML = replyMsg;
                        			    $('#reply' + '$replyto').css({'font-size' : '14px', 'text-align':'justify', 'border-radius':'7px', 'padding':'3px', 'background':'skyblue'});
                    			    }
                				</script>";
            }
    $Chats.="</div>";
    
        $ln--;
      }  
    
    //  $Chats .="  <br><div style='display:flex; justify-content:center; align-items:center; height:50px; width:50px; background:green; color:#fff; z-index:21; font-weight:bold; font-family:serif; border-radius:50%; font-size:10px; margin-left:auto; margin-right:auto;'>Solved</div>";
    $Chats .="<div style='display:flex; justify-content:center; align-items:center; width:100%; margin-bottom:50px; margin-top:20px;'>
    <div style='min-width:35%; height:2px; border:1px solid #aaa;'></div>";
      $Chats.="<div style='text-align:center; font-size:12px; color:#999; padding:10px; z-index:1; font-family:serif;'> ~ End of SCRIPT ~ </div>
          <div style='min-width:35%; height:2px; border:1px solid #aaa;'></div>
        </div><br>";
    
    /*  $Chats.="<hr><div style='text-align:center; margin-top:-25px; margin-bottom:100px; font-size:12px; color:#999;'><span style='padding:10px; border-radius:10px; z-index:1; background:#fff; font-family:serif;'> End of SCRIPT </span></div><br><br>";
    */
    
      $Chats .="</div>";
    
      return $Chats;
        }else{ 
        return "
        <div style='height:100vh; width:100vw; padding:35px; font-size:14px; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
            <p>If you are not redirected in few seconds, kindly go back and retry!</p>
            <p><a href='scrolls'>&lt;&lt;Back</a></p>
        </div>";
            
        }
    }
}
else{
		return $usersView->completeRegFirst();
}