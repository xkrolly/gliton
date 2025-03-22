<?php
	$usersContr = new usersContr();
	$usersView = new usersView();

$userData = $usersView->fetchUser();
	$me = $userData[0]['profile_id'];

$catid='';
$contentID = $me.'_0_'.$catid.'_'.time();
$contentID_enc = $usersView->enc_cons($contentID);

$spec_data = $usersView->select('aoi', ' WHERE aoi_id = ? OR aoi_id = ? OR aoi_id = ?', '1, 11, 21');
$spec = count($spec_data) - 1;

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

$sd_data = $usersView->select('seeder', ' WHERE sd_id > ?', 0);
$n = count($sd_data) - 1;
$m = count($sd_data) - 1;


$rForm ="
	            <div style='display:flex; flex-direction:column; padding:20px; padding-bottom:100px; background:#eee; min-height:100vh;'>
			        	<form style='width:100%; padding:20px; border-radius:20px; background:#fff;' method='post' id='seeder_pData'>
					

						    <h4 style='text-align:center; font-weight:1000;'>Problem CVE</h4>
							
						    <div style='display:flex column; align-items:center; justify-content:center; width:100%; '>
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
				                      <label><input type='radio' name='category' class='category' value='1' onclick=''>&nbsp;&nbsp;Agrochemicals</label>
				                      <label><input type='radio' name='category' class='category' value='2' onclick=''>&nbsp;&nbsp;Seed</label>
				                      <label><input type='radio' name='category' class='category' value='3' onclick=''>&nbsp;&nbsp;Farm machinery</label>
				                      </p>
				                      <p class='list-ring'>
				                          <label><input type='radio' name='category' class='category' value='4' onclick=''>&nbsp;&nbsp;Plant diseases</label>
				                          <label><input type='radio' name='category' class='category' value='5' onclick=''>&nbsp;&nbsp;Farm operations</label>
				                          <label><input type='radio' name='category' class='category' value='6' onclick=''>&nbsp;&nbsp;Agro market</label>
				                      </p>
				                      
				                    </div>
				                </div>
				                </div>
				              </div>
				               	<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Topic</label>
									<input type='text' name='topic' id='textspace' />

								</div>
										<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Add insight</label>
									<textarea name='insight' id='insight'></textarea>
								</div>
						
				               	<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Upload video</label>
									<input type='file' name='vid1' id='vid1' />

								</div>

								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Video thumbnail</label>
									<input type='file' name='thumbnail1' id='thumbnail1' />

								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Date</label>
									<div style='display:flex;'><input type='date' name='date' id='date' />	<input type='time' name='time' id='time' />
									</div>


								</div>

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
				   								<input type='hidden' name='problem' value='problem'>

				                <div class='form-group' style='margin-top:25px;'>
				                    <div class='col-sm-12 center' onclick='inlineLoader(\"inLoader\");'>

				                            <button type='submit' disabled name='problem' class='col-sm-12 btn btn-default em hover2 theme' id='post_enq' style='display:flex; align-items:center; justify-content:center; padding:8px 15px 8px 15px; font-size:16px; border:2px solid #2186f3; border-radius:30px;'><span>Post problem</span><span id='inLoader' style='display:none;'></span></button>
				                    </div>
				                </div>
				                
				              

						</form>
				
			        	<form style='width:100%; margin-top:20px; background:#fff; padding:20px; border-radius:20px;' method='post' id='seed_stages' >
						    <h4 style='text-align:center; font-weight:1000;'>Procedures</h4>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Pick project</label>
								
								<select name='project'>";
								while($n >= 0){
									$rForm .= "<option value='".$sd_data[$n]['sd_id']."'>".$sd_data[$n]['topic']."</option>";
									$n--;
								}
								$rForm .="</select>
								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Upload video</label>
									<input type='file' name='vid' id='vid' />

								</div>

								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Upload Image</label>
									<input type='file' name='img' id='img' />

								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Add insight</label>
									<textarea name='insight' id='insight'></textarea>
								</div>
								
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Date</label>
									<div style='display:flex;'><input type='date' name='date' id='date' />	<input type='time' name='time' id='time' /></div>


								</div>
								<input type='hidden' name='procedure' value='procedure'>
								<input type='submit' name='procedure' value='Add stage'/>
						</form>

				        <form style='width:100%; margin-top:20px; background:#fff; padding:20px; border-radius:20px;' method='post' id='publish_data'>
							    <h4 style='text-align:center; font-weight:1000;'>Solution CVE</h4>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Pick project</label>
								
								<select name='project'>";
								while($m >= 0){
									$rForm .= "<option value='".$sd_data[$m]['sd_id']."'>".$sd_data[$m]['topic']."</option>";
									$m--;
								}
								$rForm .="</select>
								</div>
							
							<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Solution thumbnail</label>
									<input type='file' name='thumb2' id='thumb2' />

								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>solution CVE video</label>
									<input type='file' name='vid2' id='vid2' />

								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Overall insight</label>
									<textarea name='insight' id='insight'></textarea>
								</div>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Topic of solscript</label>
									<input type='text' name='topic' id='topic' />
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


			    				<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<label>Date</label>
									<div style='display:flex;'><input type='date' name='date' id='date' />	<input type='time' name='time' id='time' /></div>


								</div>

<div class='form-group' style='margin-top:20px;'>
                 <label style='color:#fff; background:deepskyblue; padding:5px; font-weight:bold; font-size:18px;'>Accessible to:
                <span class='material-icons' style='margin-left:10px; color:#2166f3; font-size:22px;' onclick='$(\"#imodal2\").slideDown(20);'>&#xe88e;</span></label>
                  <div class='form-control' style='display:flex; justify-content:space-around; align-items:center; padding:5px;'>
                  <label style='font-size:12px; display:flex; justify-content:center; align-items:center;'><input type='radio' checked class='' name='authorization' value='0' style='margin-right:10px;'/>Everyone</label>
                  <label style='font-size:12px; display:flex; justify-content:center; align-items:center;'><input type='radio' class='' name='authorization' value='1' style='margin-right:10px;'/>

	<select name='authority'>";

								while($spec >= 0){
									$rForm .= "<option value='".$spec_data[$spec]['aoi_id']."'>".$spec_data[$spec]['specialist']."s only</option>";
									$spec--;
								}
								$rForm .="</select></label>
                  </div>

            </div>

   					         <input type='hidden' id='sk' name='sk' value=''>
							<input type='hidden' name='publishSeed' id='publishSeed' value='publishSeed'>
							<button type='submit' style='width:100%; background:green; color:#fff;' name='publish'>Publish</button>
                <script>
                  var rid = localStorage.getItem('rid_enc_cons');
                  var shrd = localStorage.getItem('shrd'+ rid);
                  $('#sk').val(shrd);
                </script>
       
						</form>

</div>
";
      
define('tutortochat', 'chatNow');
define('stdtochat', 'chatReady');
return $rForm;
