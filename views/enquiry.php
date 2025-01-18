<?php
$_SESSION['TUTOR_ACCESS'] = TRUE;
//COUNSELLING: school, career, behavioral therapist, rehabilitation, substance abuse, marriage n family
$usersContr = new usersContr();
$usersView = new usersView();

$userData = $usersView->fetchUser();
$uid = $userData[0]['profile_id']; $engager = $userData[0]['engager'];
$fn = $userData[0]['firstname'];
$ln = $userData[0]['lastname'];
$pn = $userData[0]['contact'];
$categPass = $usersView->enc_cons('FALSE');

$xpt = $userData[0]['xpt'];
$regCompleted = $userData[0]['regCompleted'];

//set empty global variable for date
$_SESSION['newDate'] = '';

$rForm ='';

$pid = $usersView->encryptor0($uid);
//reselect prv
  $prvdata = $usersView->select2('prevkey', ' WHERE uid = ?', $uid);
  !empty($prvdata[0]['prevPK']) ? $pk = $prvdata[0]['prevPK'] : $pk = '';

//var_dump('NEXT: WORK ON PRICE OF PRODUCT BUY & SUBSCRIPTION 2ru aoi table through share_SubPayment($cat_id) & share_ProductPayment($product_ID)');

if($regCompleted == 1){
$vals = '0, 0, '.$uid;
$usersContr->update('profile', 'engaged = ?, engager = ? WHERE profile_id = ?', $vals);

$vals2= '0, 0, '.$uid;

$xnoteVals = $uid.', 0';
$notedata = $usersView->select('xnote', ' WHERE target_id = ? AND iview = ?', $xnoteVals);

$n = count($notedata);
$n > 0 ? $notes= "<div style='display:flex; justify-content:center; align-items:center; color:red; background:#fff; padding:5px; height:12px; width:12px; font-size:8px; border-radius:50%; border:2px solid red; font-weight:bold; margin-top:15px; margin-left:-7px;' id='xnote'>$n</div>" : $notes = "";

$usersContr->update('profile', 'engaged = ?, engager = ? WHERE engager = ?', $vals2);
$user_id_enc = $usersView->enc_cons($uid);

////////////////TEST

/*$val = $usersView->dec_cons('N97SRNoqzgrVQzW/7T0bFWgFmKMQYHJWTdu6nwnU46o=');
var_dump($val);
*/
///////////////TEST ENDS

$catid='';
$contentID = 'tempID';
$contentID_enc = $usersView->enc_cons($contentID);

$directory='';
$rid='';
$chid='';
$height='500px';
$lck=0;
$uploadURL='views/solo_vid_upload.php';
$empty=0;
$addVideoFrame=0;
$addSpanPadin=0;


/////////////
$rForm .= $usersView->topBar($notes);        
$rForm .= $usersView->bottomNavigation();        
        

$rForm .="<div style='margin-top:80px;'>
                  <hr>
                  <div style='width:100%; display:flex; justify-content:center; color:red;' id='typeOut'>
<p href='' class='typewriter'>...a solution can solve a million similar future problems.
</p></div>
            <hr style=''>
          </div>
";

$rForm .="<div style='display:flex; min-height:50vh; align-items:center; justify-content:center; width:100%; z-index:20; margin-bottom:100px;'>
              
              <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
                <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
                  <source id='webcam' src='' type='video/webm'>
                </video>
                <span id='log'></span>
                ".$usersView->countDownStyled()."

                <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
            </div>
            
                
            <form method='POST' action='tutor' class='col-sm-12 enquiry-form' role='form' id='return_data' style='background: #fff;'>
            <input type='hidden' name='mymsg' id='mymsg' value=''>

            <input type='hidden' name='u_type' value='1'>
            <input type='hidden' name='loginAudio' id='loginAudio' value='1'>
            <input type='hidden' name='categoryPass' value='$categPass'>

            <input type='hidden' name='resetPRV' id='resetPRV' value=''>
            <input type='hidden' name='recipient_id' id='recipient_id' value='$engager'>
            <input type='hidden' name='mediaUsed' id='mediaUsed' value='0'>
            <input type='hidden' name='category' id='category' value='0'>
        
            <header class='header1' style='border-bottom: 1px solid red; padding-bottom:7px;'>Glit consult</header>
            <div style='text-align:right; margin-bottom:3px; font-size:11px;'>Accessing the best professional solutions</div>
     
            <div style='display:flex column; align-items:center; justify-content:center; width:100%;'>
             <div style=''>
              <div style='padding:5px;'>
                <div class='form-group'>
                    <div class='' style=''>
                    <select class='form-control property' name='topic' id='topic' title='topic' onchange='showSublist()' style='height:40px; font-size:14px; margin-top:35px;'>
                      <option value=''>Select category</option>
                        <option value='a'>Agro/ Farming</option>
                        <option value='b'>Veterinary</option>
                        <option value='c'>Alternative Medicine</option>
                        <option value='d'>Guidance/Counselling</option>
                        <option value='e'>Cooking/Diet</option>
                    </select>
                    <span id='check_property'></span>
                    </div>
                </div>
                <div id='subList-panel'>
                  <hr>
                    <div style='display:flex; width:100%;'><input type='hidden' name='categoryval' id='categoryval'>
                      <p class='list-ring'>
                      <label><input type='radio' name='category' class='category' value='1' onclick='selectThis(1)'>&nbsp;&nbsp;Agrochemicals</label>
                      <label><input type='radio' name='category' class='category' value='2' onclick='selectThis(2)'>&nbsp;&nbsp;Seed</label>
                      <label><input type='radio' name='category' class='category' value='3' onclick='selectThis(3)'>&nbsp;&nbsp;Farm machinery</label>
                      </p>
                      <p class='list-ring'>
                          <label><input type='radio' name='category' class='category' value='4' onclick='selectThis(4)'>&nbsp;&nbsp;Plant diseases</label>
                          <label><input type='radio' name='category' class='category' value='5' onclick='selectThis(5)'>&nbsp;&nbsp;Farm operations</label>
                          <label><input type='radio' name='category' class='category' value='6' onclick='selectThis(6)'>&nbsp;&nbsp;Agro market</label>
                      </p>
                      
                    </div>
                   </div>
                </div>
              </div>
                <div class='form-group'>
                  <div class='col-sm-12' style='background:#eff; width:100%;'>

                    <div class='' style='display:flex; justify-content:space-around; align-items:center;'>
                     <div onclick='checkSelection();'>
                      <span>
                        <span class='material-icons' style='color:#666; font-size:30px; filter:drop-shadow(1px 1px 1px #ccc);'>&#xe312;</span>
                      </span>
                     </div>            
                     <div style='height:5px; width:5px; background:#777; border-radius:50%;'></div>
                     <div style='border:.5px solid #eff; border-radius:50%; padding:20px;' onclick='checkSelection();'>
                                          <span id='chatMicSpan' class='hover'><span class='material-icons' style='color:#222; font-size:50px; filter:drop-shadow(2px 2px 1px #aaa);'>&#xe029;</span></span>
                     </div>
                     <div style='height:5px; width:5px; background:#777; border-radius:50%;'></div>
                     <div  onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"$height\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"15\", \"\");'>
                      <span>
                        <span class='material-icons hover' style='color:#666; font-size:30px; filter:drop-shadow(1px 1px 1px #ccc);'>&#xe04b;</span>
                      </span>
                     </div>            
                                         
                    </div>
                    <div style='display:flex; color:red; font-size:12px; margin-top:10px;'>*Type or record your question<div id='activeTimer' style='margin-left:auto;'></div></div>
                    <div id='check_item' style='text-align:center; color:red;'></div>
                  </div>
                </div>
                    <div class='form-group collapse' id='textQ'><textarea name='que' class='form-control' id='textspace' placeholder='Input your question here...'></textarea></div>                 

                    <div id='all_chat' style='width:100%;'></div>
                    <div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:20px;'>
                        <canvas id='canvas' style='background:transparent; width:100%; height:400px; z-index:11; display:none;'>
                        </canvas>
                        <div id='cancel' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-80px;'>
                            <div style='display:flex; justify-content:space-around;'>
                                <div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:#fff;'>
                                    <span class='material-icons' style='color:red; font-size:30px;'>&#xe5c9;</span>
                                </div>
                                <div id='proceed' onclick='proceedUpload();' style='display:flex; justify-content:center; align-items:center; background:#fff; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-left:auto;'>
                                    <span class='material-icons' style='color:#2166f3; font-size:30px;'>&#xe86c;</span>
                                </div>
                            </div>
                        </div>
                    </div>
   
                <div class='form-group' style='margin-top:25px;'>
                    <div class='col-sm-12 center' onclick='inlineLoader(\"inLoader\");'>
                            <button type='submit' disabled onclick='checkSelection()' name='proceed' class='col-sm-12 btn btn-default em hover2 theme' id='post_enq' style='display:flex; align-items:center; justify-content:center; padding:8px 15px 8px 15px; font-size:16px; border:2px solid #2186f3; border-radius:30px;'><span>Ask Expert</span><span id='inLoader' style='display:none;'></span></button>
                    </div>
                </div>
                
              </div>

            </div>
             
            </form>
        </div>
    <p style='margin-bottom:80px;'></p>
              
        ";

  /*if($sub >= 0){$rForm.= $usersView->showModal2('views/getsession.php', 'buysession', 'file', 'none');
  
  }*/
}
else{
    $rForm .= $usersView->completeRegFirst();
}
$rForm.=$usersView->searchPanel();
return $rForm;