<?php

  $usersContr = new usersContr();
  $usersView = new usersView();

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$regCompleted = $userData[0]['regCompleted'];
$sol ='';

if($regCompleted == 1){

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
     


               <form action='uscript' method='post' id='' class='col-sm-12 enquiry-form' role='form' style='background:#fff; padding:20px; margin-top:60px;'>
                    <input type='hidden' name='mediaproof' id='mediaproof'/>
                    <input type='hidden' name='mediaType' id='mediaType'/>
                    <input type='hidden' name='encmsg' id='encmsg'/>
                    <input type='hidden' name='user' id='user' value=''/>
                    <input type='hidden' name='category' id='category' class='category' value=''/>
	
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
                            
                            <div style='height:200px; overflow:scroll; border-radius:20px; filter:drop-shadow(1px 1px 1px #eee);'>
	                            <div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                    <h6>Agro</h6>
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
	                        	<div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                 <h6>Vet</h6>
	                                   
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
	                        	<div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                     <h6>Medicals</h6>
	                                   
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
								<div id='subList-panel' style='margin-bottom:10px;'>
	                                <div class='cat-list-panel' style='background:#fff;'>
	                                     <h6>Nutritions</h6>
	                                   
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
                            </div>

                        </div>
                        <div class='form-group' style='margin-top:40px;'>
                            <label class='numberedWall'> <span class='numbered'>3</span>
								Use-case title
							</label>
                           <input type='text' name='title' id='textspace' class='form-control' placeholder='Your use-case title' style='font-size:14px; border-radius:20px;'/>
                                <div style='display:flex; flex-direction:column; font-size:12px; padding:5px 10px 5px 20px; margin-top:10px; background:#fff; border-radius:10px;' >
                                      <div style='font-size:10px; text-align:left; font-style:italic; color:#2166f3; display:flex; justify-content:flex-start; align-items:center;'>NOTE: Title should reflect the function you intend to apply the product for<span style='display:flex; margin-left:auto; justify-content:center; align-items:center; height:14px; width:14px; border:1px solid #2166f3; color:#2166f3; border-radius:50%; font-size:10px; font-family:serif; font-style:italic; font-weight:1000;' onclick='learnmore(6);'>i
                                      	</span></div>
                                </div>
                        </div>
                        <div class='form-group' style='margin-top:40px;'>
                                <label class='numberedWall'> <span class='numbered'>4</span>
                                    Record proof
                                </label>
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
         				<div id='all_chat' style='width:100%;'></div>
           
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
