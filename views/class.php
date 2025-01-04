<?php
$_SESSION['TUTOR_ACCESS'] = TRUE;

$usersContr = new usersContr();
$usersView = new usersView();

$rForm ='';

$rForm .="<div style='display:flex; align-items:center; justify-content:center; padding:8px; background:#fff; filter:drop-shadow(2px 2px 2px #ccc); position:fixed; top:0; width:100%; z-index:25;'>
            <div style='display:flex; flex-direction:column; margin-left:20px; width:40%; margin-right:auto;' onclick='$(\"#menu\").show()'>
              <div style='width:25px; height:2px; background:#000;'></div>
              <div style='width:25px; height:2px; margin-top:4px; background:#000;'></div>
              <div style='width:25px; height:2px; margin-top:4px; background:#000;'></div>
            </div>
            <div style='align-self:center; margin-left:auto; width:20%; justify-content:center; margin-right:auto; display:flex; color:#2166f3; font-weight:bold; font-size:20px;'> <img src='img/glit192.png' alt='gLIT logo' style='height:25px; width:25px;'>lit</div>
    
            <div style='display:flex; justify-content:flex-end; width:40%; margin-right:20px;'>
              <div onclick='$(\"#searchPanel\").slideDown(\"slow\");' style='margin:auto 2px auto auto;'><span class='material-icons' style='color:#444; font-size:20px; margin-right:2px;'>&#xe8b6;</span>
              </div>
              <div style='margin-left:20px;'><a href='note'><span class='material-icons' style='color:#444; font-size:20px;'>&#xe7f4;</span></a></div>
              n
            </div>
          </div>
					
				    <div id='menu' style='display:none; z-index:1; position:fixed; left:0; top:4%; margin:20px 5px auto auto; padding-right:200px;'>
				        <div style='display:flex; justify-content:flex-end;'>
				        <div style='border-bottom-right-radius:5px; border-bottom-left-radius:5px; background:#fff; filter:drop-shadow(-2px 2px 2px #888); font-size:16px; padding:5px 20px 10px 20px;'>
					    <p style='text-align:right; margin-right:-15px; margin-bottom:-5px;' onclick='$(\"#menu\").slideUp(20);'>&times;</p>
					    <div style='display:flex; align-items:center; padding-bottom:8px; border-bottom:1px solid #ccc;'>
                <span class='material-icons' style='color:#2166f3; margin-right:5px; font-size:18px;'>&#xe870;</span>
                <a href='sub' style='font-weight:bold; text-decoration:none; font-size:14px;'>Subscribe</a>
              </div>
              <p style='margin-bottom:4px; padding-bottom:8px; border-bottom:1px solid #ccc;'>
                  <a style='text-decoration:none; color:#444; font-size:14px; display:flex; align-items:center;' href='solscript'>
                      <span class='material-icons' style='font-size:18px; margin-right:10px;'>&#xe889;</span> 
                     Create Sol-script
                 </a>
              </p>
              <p style='margin-bottom:4px; padding-bottom:8px; border-bottom:1px solid #ccc;'>
                  <a style='text-decoration:none; color:#444; font-size:14px; display:flex; align-items:center;' href='class'>
                      <span class='material-icons' style='font-size:18px; margin-right:10px;'>&#xe889;</span> 
                      Public class
                 </a>
              </p>

              <p style='margin-bottom:4px; margin-top:5px; padding-bottom:8px; border-bottom:1px solid #ccc;'><a style='text-decoration:none; color:#444; display:flex; align-items:center; font-size:14px;' href='profile?&pid='><span class='material-icons' style='margin-right:10px; font-size:18px;'>&#xe7fd;</span>Profile</a></p>
              <p style='margin-bottom:4px; padding-bottom:8px; border-bottom:1px solid #ccc;'>
                  <a style='text-decoration:none; color:#444; font-size:14px; display:flex; align-items:center;' href='history'>
                      <span class='material-icons' style='font-size:18px; margin-right:10px;'>&#xe889;</span> 
                      History
                 </a>
              </p>
					    <p>
					    <a href='logout' style='color:red; font-size:14px; display:flex; align-items:center; text-decoration:none;'><span class='material-icons' style='font-size:20px; margin-right:10px;'>&#xe9ba;</span> Log out</a>
					    </p>
				</div></div></div>";

$rForm .="<div style='margin-top:60px;'>
                  <hr>
            <hr style='margin-top:-14px;'>
          </div>
";
$rForm .="<div style='display:flex; min-height:50vh; align-items:center; justify-content:center; width:100%; z-index:20;'>
                
            <form method='POST' action='tutor' class='col-sm-12 enquiry-form' role='form' id='return_data' style='background: #fff;'>
            <input type='hidden' name='mymsg' id='mymsg' value=''>

            <input type='hidden' name='u_type' value='1'>
            <input type='hidden' name='loginAudio' id='loginAudio' value='1'>
         
            <input type='hidden' name='resetPRV' id='resetPRV' value=''>
            <input type='hidden' name='recipient_id' id='recipient_id' value=''>
            <input type='hidden' name='mediaUsed' id='mediaUsed' value='0'>
        
<header class='header1' style='border-bottom: 1px solid red; padding-bottom:7px;'>Glit class</header>
<div style='text-align:right; margin-bottom:30px; font-size:11px;'>Mass meeting with expert</div>
             
               <div style='display:flex column; align-items:center; justify-content:center; width:100%;'>
                 <div style=''>
                
                <div class='form-group'>
                    <div class='' style=''>
                    <select class='form-control property' name='topic' id='topic' title='topic' onchange='showSublist()' style='height:40px; font-size:14px; margin-top:35px;'>
                      <option value=''>Select category</option>
                        <option value='a'>Agro/ Farming</option>
                        <option value='b'>Veterinary</option>
                        <option value='c'>Health</option>
                        <!--<option value='d'>Law</option>
                        <option value='e'>Travelling</option>
                        <option value='f'>Shopping</option>
                        <option value='g'>Cooking/Diet</option>
                      <option value='h'>Business</option>
                      <option value='i'>Career</option>
                      <option value='j'>Car/Vehicle</option>
                      <option value='k'>Therapy</option>
                      <option value='l'>Marriage</option>
                        <option value='m'>Parenting</option>
                    <option value='n'>Purchasing</option>
                    <option value='o'>Others</option>-->
                      
      
                    </select>
                    <span id='check_property'></span>
                    </div>
                </div>
                <div id='subList-panel'>
                <div class='cat-list-panel'><h6 style='font-weight:bold;'>Select a topic</h6>
                <hr>
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
               </p></div></div>

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
                     <div onclick='checkSelection();'>
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

                <div class='form-group' style='margin-top:25px;'>
                    <div class='col-sm-12 center'>
                            <button type='submit' disabled onclick='checkSelection()' name='proceed' class='col-sm-12 btn btn-default em hover2 theme' id='post_enq' style='padding:8px 15px 8px 15px; font-size:16px; border:2px solid #2186f3; border-radius:30px;'><span>Ask Expert</span></button>
                    </div>
                </div>
                
              </div>

              </div>
             
            </form>
        </div>
        <div style='margin-top:30px; z-index:20;'>
                  <hr>
            <hr style='margin-top:-14px;'>
            <hr style='margin-top:-14px;'>
          </div>
    <p style='font-weight:1000; font-family:roboto; font-size:18px; filter:drop-shadow(1px 1px 1px #fff); margin-bottom:80px; padding:0 30px 0 30px; text-align:center; z-index:20; color:#aaa;'>...a solution created can solve a million similar problems.</p>
              
        ";
$rForm .="
";

$rForm.=$usersView->searchPanel();
return $rForm;