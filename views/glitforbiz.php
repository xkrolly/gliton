<?php
//include('includes/autoloader.inc.php');
  $usersContr = new usersContr();
  $usersView = new usersView();

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];

$regCompleted = $userData[0]['regCompleted'];
$sol ='';
if($regCompleted == 1){

$xnoteVals = $me.', 0';
$notedata = $usersView->select('xnote', ' WHERE target_id = ? AND iview = ?', $xnoteVals);

$user_id_enc = $usersView->enc_cons($me);

$n = count($notedata);
$n > 0 ? $notes= "<div style='display:flex; justify-content:center; align-items:center; color:red; background:#fff; padding:5px; height:12px; width:12px; font-size:8px; border-radius:50%; border:2px solid red; font-weight:bold; margin-top:15px; margin-left:-7px;' id='xnote'>$n</div>" : $notes = "";

$catid='';
$contentID = $me.'_0_'.$catid.'_'.time();
$contentID_enc = $usersView->enc_cons($contentID);

$directory='';
$rid='';
$chid='';
$height='500px';
$lck=0;
$uploadURL='views/solo_vid_upload.php';
$contentID = $me.'_0_'.$catid.'_'.time();
$contentID_enc = $usersView->enc_cons($contentID);
$empty=0;
$addVideoFrame=0;
$addSpanPadin=0;

$sol .= $usersView->topBar($notes);
$sol .= $usersView->bottomNavigation();

$lm = $usersView->learnMore(6, 10);
$sol .=$usersView->showModal3($lm, 'imodal', '', 'none');

$sol .="<video style='z-index:10; display:none; background:#fff; height:100vh; width:100vw; object-fit:cover; position:fixed; top:0; left:0; right:0; bottom:0;' id='camera-preview' class=''>
        </video>
        <div id='snap' style='z-index:12; color:#fff; position:fixed; bottom:15%; text-align:center; background:transparent; display:none; width:100%; padding:5px;'>
            <span id='link' style='padding:10px; background:transparent; border:2px solid #fff; border-radius:10px; margin-left:2px;'>snap</span>
        </div>

        <div style='display:flex; flex-direction:column; min-height:100vh; width:100%; background:#eee; align-items:center; justify-content:center;'>
            <div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
                <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
                  <source id='webcam' src='' type='video/webm'>
                </video>
                <span id='log'></span>
                ".$usersView->countDownStyled()."

                <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>
            </div>
            <div style='display:flex; min-height:50vh; align-items:center; justify-content:center; width:100%; z-index:5; margin-bottom:100px;'>
               <form action='bizscript' method='post' id='' class='col-sm-12 enquiry-form' role='form' style='background:#fff; padding:20px; margin-top:60px;'>
                    <input type='hidden' name='mediaproof' id='mediaproof'/>
                    <input type='hidden' name='mediaType' id='mediaType'/>
                    <input type='hidden' name='encmsg' id='encmsg'/>
                    <input type='hidden' name='user' id='user' value='$me'/>
                    <input type='hidden' name='category' id='category' class='category' value=''/>

                    <header class='header1' style='border-bottom: 1px solid red; padding-bottom:7px; display:flex;'>
                        <div style='margin-right:auto; font-size:22px; color:green;'>Create product Solscript</div>
                    </header>
                    <div style='text-align:right; margin-bottom:30px; font-size:11px;'>Scripting product application(s)</div>
               
                    <div style='margin-top:15px; padding:10px;'>
                        <div class='form-group'>
                            <h5 style='font-weight:bold; display:flex; margin-left:-18px; width:100%; display:flex; justify-content:flex-start; align-items:center;'>
                                <span style='font-size:10px;'>Create product CTT</span>
                            </h5>
                            <select class='form-control property col-sm-12' name='topic' id='topic' title='topic' onchange='showSublist()' style='height:40px; font-size:14px; margin-top:20px; border-radius:20px; background:#fff;'>
                                <option value=''>Select category</option>
                                <option value='a'>Agro/ Farming</option>
                                <option value='b'>Veterinary</option>
                                <option value='e'>Nutrition/Diet</option>
                            </select>
                            <div id='subList-panel' style='margin-bottom:10px;'>
                                <div class='cat-list-panel' style=''>
                                    <div style='display:flex; width:100%;'><input type='hidden' name='categoryval' id='categoryval'>
                                        <p class='list-ring'>
                                            <label><input type='radio' name='category' class='category' value='1'>&nbsp;&nbsp;Agrochemicals</label>
                                            <label><input type='radio' name='category' class='category' value='2'>&nbsp;&nbsp;Seed</label>
                                            <label><input type='radio' name='category' class='category' value='3'>&nbsp;&nbsp;Farm machinery</label>
                                        </p>
                                        <p class='list-ring'>
                                            <label><input type='radio' name='category' class='category' value='4'>&nbsp;&nbsp;Plant diseases</label>
                                            <label><input type='radio' name='category' class='category' value='5'>&nbsp;&nbsp;Farm operations</label>
                                            <label><input type='radio' name='category' class='category' value='6'>&nbsp;&nbsp;Agro market</label>
                                        </p>
                                    </div>
                                </div>
                        </div>
                        <div class='form-group' id='textQ' style='display:none; padding:5px; margin-bottom:20px;'>
                                <input type='text' name='title' id='textspace' class='form-control' placeholder='Title for the product application' style='font-size:14px; border-radius:20px;'/>
                                <div style='display:flex; flex-direction:column; font-size:12px; padding:5px 10px 5px 20px; margin-top:10px; background:#fff; border-radius:10px;' >
                                      <div style='font-size:10px; text-align:left; font-style:italic; color:#2166f3;'>NOTE: Title should reflect only the problem the product is solving in your use case</div>
                                      <div style='display:flex; width:100%;'><div style='display:flex; margin-left:auto; justify-content:center; align-items:center; height:14px; width:14px; border:1px solid #2166f3; color:#2166f3; border-radius:50%; font-size:10px; font-family:serif; font-style:italic; font-weight:1000;' onclick='learnmore(6);'>i</div></div>
                                </div>
                        </div>
                    </div>
                    </div>
                    
                        <div class='form-group' style=''>
                            <div class='col-sm-12' style='width:100%; margin-top:20px; padding:10px;'>
                                <h5 style='font-weight:bold; display:flex; align-items:center; width:100%; margin-left:-18px; margin-bottom:20px;'>
                                    <span style='font-size:10px;'>Problem Confirmatory Visual evidence</span>
                                </h5>
                                <hr style=' margin-top:5px;'>
                                <div class='' style='display:flex; justify-content:space-around; align-items:center;'>
                                    <div onclick='useCamera();'>
                                        <span>
                                           <span class='material-icons' style='color:deepskyblue; font-size:35px; filter:drop-shadow(1px 1px .5px #444);'>&#xe412;</span>
                                        </span>
                                        <div style='font-size:10px;'>Image proof</div>
                                    </div>            
                                    <div style='width:30px; height:30px; background:transparent; border:6px solid #bbb; border-radius:50%;' onclick='checkSelection();'>
                                </div>
                                <div onclick='checkSelection();'>
                                    <span id='chatMicSpan' onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"$height\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"15\", \"\");' class='hover'>
                                        <span class='material-icons' style='color:deepskyblue; font-size:35px; filter:drop-shadow(1px 1px .5px #444);'>&#xe04b;</span>
                                    </span>
                                    <div style='font-size:10px;'>Video proof</div>
                                </div>
                            </div>
                            <hr style=' margin-top:35px;'>
                            <div style='width:100%; text-align:center; font-size:10px; color:#2166f3;'>Snap or videoshoot the problem</div>               
                            <div id='check_item' style='text-align:center; color:red;'></div>
                        </div>
                </div>

                <div class='form-group' style='padding:5px; margin-bottom:20px;'>
                                <label>Product detail</label>
                                <input type='text' name='productname' id='productname' class='form-control' placeholder='Product name' style='font-size:14px; border-radius:20px;'/>
                                <input type='text' name='Company/brand name' id='brandname' class='form-control' placeholder='Company name' style='font-size:14px; border-radius:20px;'/>
                                <input type='text' name='batchno' id='batchno' class='form-control' placeholder='Product batch No' style='font-size:14px; border-radius:20px;'/>
                                <input type='text' name='source' id='source' class='form-control' placeholder='Purchased from?' style='font-size:14px; border-radius:20px;'/>
                </div>

                    <div id='all_chat' style='width:100%;'></div>
                    <div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:10px;'>
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

                    <div style='font-size:10px; color:red; padding:10px; text-align:left; font-style:italic;'>NOTE: Ensure CTT and CVE are accurate before you start</div>
                    <div class='form-group' onclick='inlineLoader(\"inLoader\");'>
                      <button type='submit' id='post_enq' class='' style='display:flex; align-items:center; justify-content:center; padding:10px; font-size:20px; width:100%; border-radius:12px; background:green; color:#fff; border:transparent;' name='create'><span>Start</span> <span id='inLoader' style='display:none;'></span></button>
                    </div>
                </form>
            </div>
        </div>";

}
else{
    $sol.= $usersView->completeRegFirst();

}


$sol.=$usersView->searchPanel();

return $sol;
