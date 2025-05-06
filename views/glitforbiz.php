<?php

  $usersContr = new usersContr();
  $usersView = new usersView();

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$regCompleted = $userData[0]['regCompleted'];
$sol ='';

$usersView->clearProductImage();

if($regCompleted == 1){

$catid='';
$contentID = $me.'_0_'.$catid.'_'.time();
$contentID_enc = $usersView->enc_cons($contentID);

$directory='';
$rid='';
$chid='';
$height='500px';
$lck=0;
$uploadURL='views/thirdparty_vid_upload.php';///solo_vid_upload.php';
$contentID = $me.'_0_'.$catid.'_'.time();
$contentID_enc = $usersView->enc_cons($contentID);
$empty=0;
$addVideoFrame=0;
$addSpanPadin=0;

$sol .="
<video style='z-index:10; display:none; background:#fff; height:100vh; width:100vw; object-fit:cover; position:fixed; top:0; left:0; right:0; bottom:0;' id='camera-preview' class=''>
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
     


               <form action='prodscript' method='post' id='' class='col-sm-12 enquiry-form' role='form' style='background:#fff; padding:20px; margin-top:60px;'>
                    <input type='hidden' name='mediaproof' id='mediaproof'/>
                    <input type='hidden' name='mediaproof2' id='mediaproof2'/>
                    <input type='hidden' name='mediaType' id='mediaType'/>
                    <input type='hidden' name='prdImg' id='prdImg'/>
                    <input type='hidden' name='encmsg' id='encmsg'/>
                    <input type='hidden' name='user' id='user' value=''/>
                    <input type='hidden' name='categoryval' id='categoryval' class='categoryval' value=''/>
	
					<h6 style='margin-top:10px; text-align:center; font-weight:bold;'><span style='background:deepskyblue; padding:10px; border-radius:20px; filter:drop-shadow(1px 1px 1px #ccc);'>3<sup>rd</sup> Party Product Scripting</h6><br>

                        <div class='form-group'>
                            <label class='numberedWall'> <span class='numbered'>1</span>
                                   Product detail</label>
                            <input type='text' value='' placeholder='Product name' class='form-control property col-sm-12' name='product-name' style='height:40px; font-size:14px; border-radius:20px;' />
                            <input type='text' value='' placeholder='Company name' class='form-control property col-sm-12' name='company-name' style='height:40px; font-size:14px; border-radius:20px;' />
                            <input type='text' value='' placeholder='Batch number' class='form-control property col-sm-12' name='batch-no' style='height:40px; font-size:14px; border-radius:20px;' />
                            <input type='text' value='' placeholder='Purchased from?' class='form-control property col-sm-12' name='store-name' style='height:40px; font-size:14px; border-radius:20px;' />
                        </div>
                        <div class='form-group' style='margin-top:40px;'>
                            <label class='numberedWall'> <span class='numbered'>2</span>
                            Use-case category</label>
                            
                            <div style='height:200px; overflow-y:scroll; scrollbar-width:none; -ms-overflow-style:none; border-radius:20px; filter:drop-shadow(1px 1px 1px #eee);'>
	                            <div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                    <h6>Agro</h6>
	                                    <div style='display:flex; width:100%;'>
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
	                        	<div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                 <h6>Vet</h6>

	                                    <div style='display:flex; width:100%;'>
	                                        <p class='list-ring'>
	                                            <label><input type='radio' name='category' class='category' value='11'>&nbsp;&nbsp;Poultry</label>
	                                            <label><input type='radio' name='category' class='category' value='12'>&nbsp;&nbsp;Pet</label>
	                                            <label><input type='radio' name='category' class='category' value='13'>&nbsp;&nbsp;Ruminants</label>
	                                        </p>
	                                        <p class='list-ring'>
	                                            <label><input type='radio' name='category' class='category' value='14'>&nbsp;&nbsp;Fish</label>
	                                            <label><input type='radio' name='category' class='category' value='15'>&nbsp;&nbsp;Feed formulation</label>
	                                            <label><input type='radio' name='category' class='category' value='16'>&nbsp;&nbsp;Others</label>
	                                        </p>
	                                    </div>
	                                </div>
	                        	</div>
	                        	<div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                     <h6>Medicals</h6>
	                                   
	                                    <div style='display:flex; width:100%;'>
	                                        <p class='list-ring'>
	                                            <label><input type='radio' name='category' class='category' value='21'>&nbsp;&nbsp;General Health</label>
	                                            <label><input type='radio' name='category' class='category' value='22'>&nbsp;&nbsp;Infertility</label>
	                                            <label><input type='radio' name='category' class='category' value='23'>&nbsp;&nbsp;Diabetes</label>
	                                            <label><input type='radio' name='category' class='category' value='24'>&nbsp;&nbsp;Hepatitis</label>
	                                        </p>
	                                        <p class='list-ring'>
	                                            <label><input type='radio' name='category' class='category' value='25'>&nbsp;&nbsp;Alergy</label>
	                                            <label><input type='radio' name='category' class='category' value='26'>&nbsp;&nbsp;Obesity/Weightloss</label>
	                                            <label><input type='radio' name='category' class='category' value='27'>&nbsp;&nbsp;Sickle cell</label>
	                                            <label><input type='radio' name='category' class='category' value='28'>&nbsp;&nbsp;Hypertension</label>
	                                        </p>
	                                    </div>
	                                </div>
	                        	</div>
                            </div>

                        </div>
                        <div class='form-group' style='margin-top:40px;'>
                            <label class='numberedWall'> <span class='numbered'>3</span>
								Use-case title
							</label>
                           <input type='text' name='title' id='textspace' class='form-control' placeholder='Your use-case title' style='font-size:14px; border-radius:20px;'/>
                                <div style='display:flex; flex-direction:column; font-size:12px; padding:5px 10px 5px 20px; margin-top:10px; background:#fff; border-radius:10px;' >
                                      <div style='font-size:10px; text-align:left; font-style:italic; color:#2166f3; display:flex; justify-content:flex-start; align-items:center;'>NOTE: Title should reflect only the function you intend to apply the product for
                                      </div>
                                </div> 
                                
                        </div>
                        <div class='form-group' style='margin-top:40px;'>
                                <label class='numberedWall'> <span class='numbered'>4</span>
                                    Record proof
                                </label>
                                <div class='' style='display:flex; justify-content:center; align-items:center;'>
                                    <div onclick='checkSelection();' style='text-align:center;'>
                                   	 <span id='chatMicSpan' onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID_enc\", \"$height\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"10\", \"\");' class='hover'>
                                        <span class='material-icons' style='color:deepskyblue; font-size:35px; filter:drop-shadow(1px 1px .5px #444);'>&#xe04b;</span>
                                   	 </span>
                                    <div style='font-size:10px;'>10s Video proof of problem existence</div>
                                </div>
                        </div>
				   <div id='all_chat' style='width:100%;'></div>
                 
						<div class='form-group' style='margin-top:40px;'>
                                <label class='numberedWall'> <span class='numbered'>5</span>
                                    Product Image
                                </label>
                                <div class='' style='display:flex; justify-content:center; align-items:center;'>
                                    <div onclick='useCamera(\"productimg1\");' style='text-align:center;'>
                                        <span>
                                           <span class='material-icons' style='color:deepskyblue; font-size:35px; filter:drop-shadow(1px 1px .5px #444);'>&#xe412;</span>
                                        </span>
                                        <div style='font-size:10px;'>Front view</div>
                                    </div>            
                                    <div onclick='useCamera(\"productimg2\");' style='margin-left:20%; text-align:center;'>
                                        <span>
                                           <span class='material-icons' style='color:deepskyblue; font-size:35px; filter:drop-shadow(1px 1px .5px #444);'>&#xe412;</span>
                                        </span>
                                        <div style='font-size:10px;'>Rear view</div>
                                    </div>            
                                </div>
                        </div>

                    <div style='display:flex; justify-content:space-between; margin-bottom:50px;'>
                       <div style='display:flex; flex-direction:column; justify-content:flex-start; width:48%;'>
	                        <canvas id='canvas' style='border-radius:10px; background:transparent; width:100%; height:200px; z-index:11; display:none;'>
	                        </canvas>
	                        <div id='cancel' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-60px;'>
	                            <div style='display:flex; justify-content:space-around;'>
	                                <div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:transparent;'>
	                                    <span class='material-icons' style='color:red; font-size:30px;'>&#xe5c9;</span>
	                                </div>
	                                <div style='display:flex; justify-content:center; width:100%; align-items:center; font-style:italic; font-size:12px; color:#fff; font-weight:bold;'>Front view</div>
	                                <div id='proceed' onclick='proceedUpload();' style='display:flex; justify-content:center; align-items:center; background:transparent; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-left:auto;'>
	                                    <span class='material-icons' style='color:#2166f3; font-size:30px;'>&#xe86c;</span>
	                                </div>
	                            </div>
	                        </div>
                       </div>
                       <div style='display:flex; flex-direction:column; justify-content:flex-end; width:48%;'> 
	                        <canvas id='canvas2' style='border-radius:10px; background:transparent; width:100%; height:200px; z-index:11; display:none;'>
	                        </canvas>
	                        <div id='cancel2' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-60px;'>
	                            <div style='display:flex; justify-content:space-around;'>
	                                <div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:transparent;'>
	                                    <span class='material-icons' style='color:red; font-size:30px;'>&#xe5c9;</span>
	                                </div>
   	                                <div style='display:flex; justify-content:center; width:100%; align-items:center; font-style:italic; font-size:12px; color:#fff; font-weight:bold;'>Rear view</div>

	                                <div id='proceed' onclick='proceedUpload();' style='display:flex; justify-content:center; align-items:center; background:transparent; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-left:auto;'>
	                                    <span class='material-icons' style='color:#2166f3; font-size:30px;'>&#xe86c;</span>
	                                </div>
	                            </div>
	                        </div>
	                    </div>
                    </div>



                    	<div style='font-size:10px; color:red; padding:10px; text-align:left; font-style:italic; margin-top:40px;'>NOTE: Ensure accurate data provision before you start</div>
                    	<div class='form-group' onclick='inlineLoader(\"inLoader\");'>
                      		<button type='submit' id='post_enq' class='' style='display:flex; align-items:center; justify-content:center; padding:10px; font-size:20px; width:100%; border-radius:12px; background:#2166f3; color:#fff; border:transparent;' name='create'><span>Start</span> <span id='inLoader' style='display:none;'></span></button>
                    	</div>

                </form>
            </div></div>";

}
else{
    $sol.= $usersView->completeRegFirst();

}

return $sol;
       
