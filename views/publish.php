<?php
if(isset($_POST['publish'])){

  include('../includes/autoloader.inc.php');
  $usersContr = new usersContr();
  $usersView = new usersView();

  $publish_mode = $_POST['pubmode'];
  $publish_mode == 1 ? $price = 1.1 * intval($_POST['price']) : ($publish_mode == 2 ? $price = $_POST['launchfund'] : $price = 0);

  $projectID = '';
  if(isset($_POST['project'])){
    $sdID = $_POST['project'];
    $sdData = $usersView->select('seeder', ' WHERE sd_id = ?', $sdID);
    $projectID .= $sdData[0]['content_id'];
  }
  !empty($projectID) ? $publink = $projectID : $publink = $_POST['publink'];
  $caption = $_POST['caption'];
  //IS BELOW LINE ACCURATE?? CHECK LATER
  isset($_POST['sk']) ? $shrdKey = $_POST['sk'] : $shrdKey = $publink;

  $timespan = $_POST['timespan'];
  $insight = $_POST['insight'];
  $insight = str_replace('  ', '\n', $insight);
  

  $searchkeys = $_POST['k1']." ".$_POST['k2']." ".$_POST['k3']." ".$_POST['k4']." ".$_POST['k5']." ".$_POST['k6'];
  $authorization = $_POST['authorization'];

  $topic_id = $_POST['cat_id']; 
  $chatpop = $_POST['chatpop'];
  $pubtype = $_POST['pubtype'];
  
  $pubtype == 'thirdparty' ? $publishTo = '3rdpartyproduct' : $publishTo = 'publish';

  $usersView->publish($publink, $caption, $insight, $searchkeys, $topic_id, $chatpop, $publish_mode, $authorization, $price, $timespan, $shrdKey, $publishTo);

  
    echo "<div style='display:flex; height:100vh; width:100vw; justify-content:center; align-items:center;'>
        <div style='font-size:38px; width:70%; text-align:center; font-family:serif;'>
                <span class='material-icons' style='color:#2166f3; font-size:60px;'>&#xe86c;</span>
        <h3>Cheers!!!</h3>
          <p style='font-family:serif;'>
          Your Glit solution has been successfuly submited for publication. Kindly wait while it is reviewed and approved by the admin. It will offer for sale at #".$price." only. Thanks.</p>
                    <p><a href='../index.php'>&lt&lt;Back</a></p>
        </div>
      </div>";

  //prevent posting flag and chat on going back
  $_POST['flag'] = '';
  $_POST['chat'] = '';
  $_SESSION['SET_FLAG'] = FALSE;
  $_SESSION['SET_CHAT'] = FALSE;

}else{
  $usersContr = new usersContr();
  $usersView = new usersView();
  $keyWords = "<div style='display:flex; align-items:center; justify-content:center; height:100vh; width:100vw;'>
            <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
            <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
              <source id='webcam' src='' type='video/webm'>
            </video>
              <span id='log'></span>
              ".$usersView->countDownStyled()."

              <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
          </div>";
  $_uniqconv_id = str_replace(' ', '+', $_GET['val']);
  $uniqconv_id = $usersView->dec_cons($_uniqconv_id);

  $ab = str_replace(' ', '+', $_GET['ab']);
  $action = $usersView->decryptor0($ab);
  $action == 'soloPublish' ? $title = $_GET['ttl'] : $title='';
  $cat = str_replace(' ', '+', $_GET['cat']);
  $catid = $usersView->decryptor0( $cat );
  $row = $usersView->select('approval', ' WHERE uniqconvID = ? LIMIT 1', $uniqconv_id);
 
    if($action == 'xpertPublish' || $action == 'soloPublish' || $action == 'thirdparty'){

        $conv_pop = '';
        $startDate = '';
        $endDate = '';
        $timespan = '';
        $chatpop = '';
        
        $val2 = '1, '.$_uniqconv_id;
        if($action == 'soloPublish'){
          $usersContr->update('solochat', 'close = ? WHERE content_id = ?', $val2);
          //get chatpop from chat table
          $data = $usersView->select('solochat', ' WHERE content_id = ?', $_uniqconv_id);
          $conv_pop = 0;
          $startDate = $data[0]['cdate'];
          $n = count($data) - 1;
          $endDate = $data[$n]['cdate'];
          $_timespan = strtotime($endDate) - strtotime($startDate);
          $timespan .= $usersView->getTimeDiff($_timespan);
          $chatpop .= 's';

        }

        if($action == 'xpertPublish'){
          $usersContr->update('chat', 'close = ? WHERE uniq_conv = ?', $val2);

          //get chatpop from chat table
          $data = $usersView->select('chat', ' WHERE uniq_conv = ?', $_uniqconv_id);
          $conv_pop = $data[0]['conv_pop'];
          $startDate = $data[0]['cdate'];
          $n = count($data) - 1;
          $endDate = $data[$n]['cdate'];
          $_timespan = strtotime($endDate) - strtotime($startDate);
          $timespan .= $usersView->getTimeDiff($_timespan);
          $conv_pop == '1' ? $chatpop .= 'd' : $chatpop .= 'm';

        }
        if($action == 'thirdparty'){

          $usersContr->update('productscript', 'close = ? WHERE productUniq = ?', $val2);

          //get chatpop from chat table
          $data = $usersView->select('productscript', ' WHERE productUniq = ?', $_uniqconv_id);
          $conv_pop = 0;
          $startDate = $data[0]['sDate'];
          $n = count($data) - 1;
          $endDate = $data[$n]['sDate'];
          $_timespan = strtotime($endDate) - strtotime($startDate);
          $timespan .= $usersView->getTimeDiff($_timespan);
          $chatpop .= 's';

        }

    $rid='0';
    $chid='';
    $lck='0';
    $action == 'thirdparty' ? $uploadURL ='views/thirdparty_vid_upload.php' : $uploadURL ='views/solo_vid_upload.php';
    $addVideoFrame = 0;
    $addSpanPadin = 0;
        $height='500px';
        $contentID_enc = $_uniqconv_id;
        $catid = $catid;
        
        $aoi_array = $usersView->aoi($catid);
        $directory = $aoi_array['folder'];

        $userData = $usersView->fetchUser();
        $me = $userData[0]['profile_id'];
        
        $lm = $usersView->learnMore(8, 16);

        $keyWords .= $usersView->showModal3($lm, 'imodal', '', 'none');
        $lm = $usersView->learnMore(9, 16);
        $keyWords .= $usersView->showModal3($lm, 'imodal2', '', 'none');

        $keyWords .= "<form action='views/publish.php' method='POST' enctype='multipart/form-data' autocomplete='off' style='padding:40px;'>
        <input type='hidden' name='cat_id' class='category' id='category' value='".$catid."'>";
if($chatpop == 's'){ 
      $keyWords.="<input type='hidden' name='mediaproof' id='mediaproof' value=''>
        <input type='hidden' name='mediaType' id='mediaType' value=''>
        <input type='hidden' name='user' id='user' value='$me'>
        <input type='hidden' name='encmsg' id='encmsg' value=''>";
  }
$keyWords.="<div class='error-text'></div>
            <h4 style=' text-align:center; font-weight:1000; margin-bottom:-5px; font-size:25px;'>Publish Your SolScript</h4>     
            <div style='width:100%; text-align:center;'><i style='font-size:10px; color:#555;'>(Earn massively. Let the whole world pay for your secret sauce!)</i></div><br>     
            <div class='form-group'>
              <div>
                <label style='color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>Heading</label>
              </div>
              <div>
                <input type='text' name='caption' placeholder='Concise decriptive heading' value='".$title."' class='form-control' required style='font-size:12px;'>
              </div>
            </div>
            <div class='form-group'>
                <label style='color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>6 Search Index keywords</label>
                <div>
                  <input type='text' style='width:49%;' name='k1' placeholder='keyword/phrase 1' required>
                  <input type='text' style='width:49%;' name='k2' placeholder='keyword/phrase 2' required>
                </div>
                <div>
                  <input type='text' style='width:49%;' name='k3' placeholder='keyword/phrase 3' required>
                  <input type='text' style='width:49%;' name='k4' placeholder='keyword/phrase 4' required>
                </div>
                <div>
                  <input type='text' style='width:49%;' name='k5' placeholder='keyword/phrase 5' required>
                  <input type='text' style='width:49%;' name='k6' placeholder='keyword/phrase 6' required>
                </div>
            </div>
            <div class='form-group'>
              <div style='display:flex;'>
                <label style='margin-right:10px; color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>Insight from your solution
                <span class='material-icons' style='margin-left:10px; color:#2166f3; font-size:22px;' onclick='$(\"#imodal\").slideDown(20);'>&#xe88e;</span></label>
              </div>
              <div>
                <textarea name='insight' autocomplete='off' value='' 
                   placeholder='
                   In 50words max, give INSIGHT on:
                   1) Material items used  
                   2) Immaterial items
                   3) Total duration  
                   4) Product/procedure efficiency
                   5) Expectations/End results' class='form-control' cols='6' rows='6' required style='font-size:12px; padding:5px;' value=''></textarea>
              </div>
            </div>";
            
if($chatpop == 's'){ 
  $keyWords.="<div class='form-group'>
                <fieldset style='border:2px solid deepskyblue; padding:10px 0 20px 0; background:#fff;'>
                    <legend style='background:deepskyblue; color:#fff; font-size:18px; max-width:80%; font-weight:bold; padding:5px;'>Add solution proof<span style='color:red; margin-left:10px;'>(CVE)</span></legend>
                
                      <div class='col-sm-12' style='display:flex; justify-content:space-around'>

                          <div onclick='accessCamera();' style='display:flex; flex-direction:column; align-items:center;'>
                              <span class='material-icons' style='color:deepskyblue; font-size:30px; filter:drop-shadow(1px 1px .5px #444);'>&#xe412;</span>
                              <span style='font-size:12px;'>Snap image</span>
                          </div>
                          <div>OR</div>            
                          <div onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"$height\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"10\", \"\");' class='hover' style='display:flex; flex-direction:column; align-items:center;'>
                              <span class='material-icons' style='color:deepskyblue; font-size:30px; filter:drop-shadow(1px 1px .5px #444);'>&#xe04b;</span>
                          
                              <span style='font-size:12px;'>Take 10s video</span>
                          </div>
                      </div>
                </fieldset>
            </div>
            <video style='z-index:10; display:none; background:#fff; height:100vh; width:100%; object-fit:cover; position:fixed; top:0; left:0;' id='camera-preview' class=''>
            </video>
            <div id='snap' style='z-index:12; color:#fff; position:fixed; bottom:10px; background:transparent; display:none; width:100%; padding:5px;'>
                <span id='link' style='padding:10px; background:transparent; border:2px solid #fff; border-radius:10px; margin-left:2px;'>snap</span>
            </div>
            <div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:30px;'>
                  <canvas id='canvas' style='background:transparent; border:1px solid #000; width:100%; height:400px; z-index:11; display:none;'>
                  </canvas>
                  <div id='cancel' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-80px;'>
                      <div style='display:flex; justify-content:space-around;'>
                          <div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:#2166f3; border:2px solid 2166f3;'>
                             <span class='material-icons' style='font-size:25px; font-weight:1000; color:#fff;'>&#xe5c9;</span>
                          </div>
                          <div id='proceed' onclick='proceedUpload();' style='display:flex; justify-content:center; align-items:center; background:#fff; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-left:auto;'>
                          <span class='material-icons' style='font-size:25px; font-weight:1000; color:#2166f3;'>&#xe86c;</span>
                          </div>
                      </div>
                  </div>

            </div>";

}
$keyWords.="<div id='all_chat'></div>";

$aoi_data = $usersView->select('aoi', ' WHERE aoi_id = ?', $catid);
$specialist = $aoi_data[0]['specialist'];


$keyWords.="
      <div class='form-group' style='margin-top:20px;'>
                 <label style='color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>Publish type:
                <span class='material-icons' style='margin-left:10px; color:#2166f3; font-size:22px;' onclick='$(\"#imodal2\").slideDown(20);'>&#xe88e;</span></label>

                  
                <div style='display:flex; flex-direction:column; margin-right:auto; padding:10px; width:100%;'>
                  <label onclick='$(\".solPrice\").show();' style='font-size:16px; width:100%; display:flex; justify-content:flex-start; align-items:center; background:#eee; padding:10px;'>
                      <div style='margin-right:20px;'>
                          <input type='radio' class='' name='pubmode' value='1' style='width:14px; height:14px;' id='checked'  onclick='$(\".pubtype\").hide();'/>
                      </div>
                      <div style='display:flex; flex-direction:column;'>
                        <div style='font-weight:bold; font-size:14px; margin-bottom:6px;'>Direct Public Release</div>
                        <div class='solPrice pubtype' style='display:none; font-size:12px; width:100%; margin-right:1%;'>
                          This solscript becomes available and accessible online through search and scrollpage of this app at your proposed price immediately you publish it.
                            <div style='margin-top:10px; text-align:center; width:100%; display:flex; justify-content:center;'>
                              <div style='width:100%; text-align:left;'>
                                <input type='number' class='form-control' name='price' placeholder='Input your price per copy' style='font-size:12px; width:100%; margin-bottom:-1px;'>
                                <i style='color:#555; font-size:10px;'>10% Glit charges will be added</i>
                              </div>
                            </div>
                        </div>
                      </div>
                  </label>
                  <label onclick='$(\".fundtarget\").show();' style='font-size:12px; width:100%; display:flex; justify-content:flex-start; align-items:center; background:#eee; padding:10px;'>
                      <div style='margin-right:20px;'>
                          <input type='radio' class='' name='pubmode' value='2' style='width:14px; height:14px;' id='checked' onclick='$(\".pubtype\").hide();'/>
                      </div>
                      <div style='display:flex; flex-direction:column;'>
                        <div style='font-weight:bold; font-size:14px; margin-bottom:6px;'>Prelaunch Crowdfunding</div>
                        <div class='fundtarget pubtype' style='display:none; font-size:12px; width:100%; margin-right:1%;'>
            
                        Solscript is accessible only when either the <span style='text-decoration:underline;'>launch fund target</span> or 90days is reached after launch. Launch fund target is contributed through early adopters purchase at a presale price(50% discount).

                          <label class='prelaunchTarget fundtarget' style='display:none; font-size:14px; width:100%; background:#fff; padding:5px; margin-top:10px; border-radius:10px;'>
                            <div class='form-group' style='width:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; padding:2px;'>
                                  <label style='font-size:12px; font-weight:bold; margin-top:10px;'>Choose Crowdfunding Target</label>
                                  <div style='width:100%; padding:0 20px;'>
  <input style='width:100%;' name='launchfund' type='range' min='0' max='1000000' step='10000' value='' id='range' oninput='document.getElementById(\"nprice\").innerHTML=\"#\"+this.value'></div>
                            <div style='font-size:16px; width:100%; margin-top:-5px; text-align:center; color:green; font-weight:bold;'><span id='nprice'></span></div>
                            </div>
                          </label>


                        </div>
                      </div>
                  </label>
                  <label onclick='$(\"#charity\").show();' style='font-size:12px; width:100%; display:flex; justify-content:flex-start; align-items:center; background:#eee; padding:10px; margin-top:5px;'>
                        <div style='margin-right:20px;'>
                          <input type='radio' class='' name='pubmode' value='3' style='width:14px; height:14px;' onclick='$(\".pubtype\").hide();'/>
                        </div>
                        <div style='display:flex; flex-direction:column;'>
                          <div style='font-weight:bold; font-size:14px; margin-bottom:6px;'>Charitable Cause</div>
                          <div id='charity' class='pubtype' style='display:none; font-size:12px; width:100%; margin-right:1%;'>Your solscript is made accessible free of charge to Glit community. Any user or Glite can access, distribute and own its content free of charge via scrollpage and/or by search.
                          </div>
                        </div>                            
                  </label>

                </div>

             <div class='form-group' style='margin-top:20px;'>
                 <label style='color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>Accessible to:
                <span class='material-icons' style='margin-left:10px; color:#2166f3; font-size:22px;' onclick='$(\"#imodal2\").slideDown(20);'>&#xe88e;</span></label>
                  <div class='form-control' style='display:flex; justify-content:space-around; align-items:center; padding:5px;'>
                  <label style='font-size:12px; display:flex; justify-content:center; align-items:center;'><input type='radio' checked class='' name='authorization' value='0' style='margin-right:10px;'/>Everyone</label>
                  <label style='font-size:12px; display:flex; justify-content:center; align-items:center;'><input type='radio' class='' name='authorization' value='".$catid."' style='margin-right:10px;'/>".ucfirst($specialist)."s only</label>
                  </div>

            </div>
        <div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:30px;'>


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

  </div>";


  $keyWords.="<div style='display:flex; justify-content:space-between; margin-top:-20px;'>
              <div class='form-group'>
                <input type='submit' name='publish' value='Publish' style='font-size:16px;'>
                <input type='hidden' name='publink' value='".$_uniqconv_id."'>
                <input type='hidden' name='timespan' value='".$timespan."'>
                <input type='hidden' id='sk' name='sk' value=''>
                <input type='hidden' id='pubtype' name='pubtype' value='".$action."'>
                <input type='hidden' id='chatpop' name='chatpop' value='".$chatpop."'>
                <script>
                  var rid = localStorage.getItem('rid_enc_cons');
                  var shrd = localStorage.getItem('shrd'+ rid);
                  $('#sk').val(shrd);
          /*              var rK = localStorage.getItem('rK');
                         var shrd = localStorage.getItem('shrd'+rK);
                        var chatpop = $('#chatpop').val();
                        $('#chat_pop').val(chatpop); */
                </script>
            </div>
            
            <div style='font-size:10px; background:#fff; border:1px solid #eee; color:#2166f3; margin-left:20px; padding:10px; text-align:left;'>NOTE: Ensure relevant Keyphrases, succint insight, accurate CVE(confirmatory visual evidence) before you publish or launch</div>
             </div>
             </div> 
            </form>";
      
  }
    
  $keyWords.="</div>";
        return $keyWords;
}
