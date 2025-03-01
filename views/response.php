<?php
	$usersContr = new usersContr();
	$usersView = new usersView();
	$_SESSION['insertToScd'] = FALSE;
    $_SESSION['ISSET_CHAT'] = FALSE;
//set empty global variable for date
$_SESSION['newDate'] = '';

	$userData = $usersView->fetchUser();
	$recipient_id = $userData[0]['engager'];
    $uniq_conv = $userData[0]['currConverse'];
    $_SESSION['alreadygetUniqConv'] = TRUE;

	$user_id = $userData[0]['profile_id'];
	$me = $userData[0]['profile_id'];
	//unset the past fixed appo
	$usersView->unsetAppo($user_id);

	//get new notes notification set
	$vals = '0, '.$user_id;
	$newNotes = $usersView->select('xnote', ' WHERE iview = ? AND target_id = ?', $vals);

	$n = count($newNotes);
	$n > 0 ? $allnew = "<span style='margin-left:-5px; color:#fff; height:16px; width:16px; background:red; padding:1px; border-radius:50%; font-weight:bold; font-size:8px;'>".$n."</span>" : $allnew = '';
	
	//get the que id from chat table
	$allVals = $recipient_id.', '.$user_id.', 0, '.$uniq_conv;
	$cData = $usersView->select('chat', ' WHERE sender_id = ? AND recipient_id = ? AND flag > ? AND uniq_conv = ? ORDER BY chat_id DESC', $allVals);
	
	/*	$allVals = $recipient_id.', '.$user_id;
	$cData = $usersView->select('chat', ' WHERE sender_id = ? AND recipient_id = ? ORDER BY chat_id DESC', $allVals);*/
	
$qTable = '';
$que = '';
$colval = '';
$category = '';
$media = '';
$chatType = '';
$flag = '';
$col_id = '';
$haltResponse = '';		
$suffix ='';


	$r_data = $usersView->select('skyman_user', ' WHERE user_id = ?', $recipient_id);
	$recipient_id != '0' ? $r_pub = $r_data[0]['pub'] : $r_pub = '';
$ln = count($cData);
if($ln > 0){
    $suffix .='?';
	$agro_id = $cData[0]['agro_id'];
	$hth_id = $cData[0]['hth_id'];
	$vet_id = $cData[0]['vet_id'];
	$guide_id = $cData[0]['guide_id'];
	$cook_id = $cData[0]['cook_id'];

    $flag .= $cData[0]['flag'];

    $media .= $cData[0]['media'];
	$array = $usersView->aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id);
            		 $category =  $cData[0]['category_id'];
            	//	 $category =  $array['categ'];
					 $qCol = $array['queCol'];
		    		 $chatType = $array['strDir'];
					 $qTable = $array['topic'];
					 $col_id = $array['col_id'];
        			 $colval = $array['colval'];
		
	
/*	$sql = "SELECT category, subcategory from aoi WHERE aoi_id = $flag";
				$stmt = $this->connect()->query($sql);
			
				$aoi_rw = $stmt->fetch();
				$chat_flag1 = $aoi_rw['category'];
				$chat_flag2 = $aoi_rw['subcategory'];	*/
			
	if($colval > 0){
	$queData = $usersView->select($qTable, ' WHERE '.$col_id.' = ?', $colval);
	$que .= $queData[0][$qCol];
	$userData = $usersView->fetchUser();
	$recipient_id = $userData[0]['engager'];
	$user_id = $userData[0]['profile_id'];

	$val = $user_id.', '.$recipient_id.', '.$colval;
	$chatData = $usersView->select('chat', ' WHERE recipient_id = ? AND sender_id = ? AND '.$col_id.' = ?', $val);

	if(count($chatData) > 0){
		$chat_id = $chatData[0]['chat_id'];
		$view = $chatData[0]['view'].$user_id.'-';
		$vals = $view.', '.$chat_id;
		$view != '0' ? $usersContr->update('chat', 'view = ? WHERE chat_id = ?', $vals) : $x = '';
	}
   }
//post response

}
else{
	$qTable .= '<span style="font-size:10px; font-weight:normal;">No Puzzle to solve yet</span>';
	$haltResponse .= '1';
	$que .= 'No task';
	$category .='nil';
	$colval .='';
	$suffix .='...';
}


$imgView = '';
$fullname = '';
$recipient_enc = $usersView->encryptor0($recipient_id);

$recipient_enc_cons = $usersView->enc_cons($recipient_id);

	$clientDP = $usersView->generate_DP(2, '65px', '');
	$tutorDP = $usersView->generate_DP($user_id, '65px', '');
	$chat_flag2 ='';
	$cat_code = '';
    if($flag > 0 ){
    	$aoi_rw = $usersView->select('aoi', ' WHERE aoi_id = ?', $flag);
		$chat_flag2 .= $aoi_rw[0]['subcategory'];	
		$cat_code .= $aoi_rw[0]['cat_code'];

	}

	$appo_data = $usersView->select('appointment', ' WHERE profile_id = ?', $user_id);

	$freetime = $appo_data[0]['freetime']; $fixedtime = $appo_data[0]['fixedtime'];

	$freetimeArray = explode('_', $freetime);
	$free = array();
	foreach($freetimeArray as $y){

		strlen($y) > 2 ? $free[] = substr($y, 0, 3) : '';

	}

	$freetimeStr = implode(', ', $free);




	$fixedArray = explode('_', $fixedtime);
	$fixed = array();
	foreach($fixedArray as $x){

		strlen($x) > 4 ? $fixed[] = substr($x, 0, 3) : '';

	}
$fixedStr = implode(', ', $fixed);
/*	strlen($allFixed) > 4 ? $allFixed : '';*/
$me_nAlpha = $usersView->num_alphaA($me);

//	$allFree = $freetime;
//			<div style='border:1px solid #222; padding:4px; height:30px width:30px; display:flex; justify-content:center; border-radius:50%;' id='this' onClick='$(\"#this\").hide()'><span class='material-icons material-symbols-outlined' style='font-size:18px; color:red;'>&#xe7f7;</span></div>

$media == '1' ? $que = "<audio controls style='height:25px; width:65vw;'><source src='sounds/".$chatType."/".$que.".webm'/></audio>" : $que;
$rForm ="<div style='display:flex; padding:10px; font-size:14px; background:#fff; filter:drop-shadow(2px 2px 2px #bbb); position:fixed; top:0; right:0;left:0; z-index:2; align-items:center; width:100%; justify-content:center;'>
			<div style='width:30%; align-items:center; justify-content:flex-start; margin-right:auto; display:flex; color:#2166f3; font-weight:bold; font-size:20px;'>	<img src='img/glit192.png' alt='gLIT logo' style='height:25px; width:25px;'>lit</div>
			
        	<div style='width:35%; margin-left:auto; display:flex; justify-content:flex-end; align-items:center; margin-right:10px;'>
	            <div onclick='$(\"#searchPanel\").slideDown(\"slow\");' style='margin:-8px 18px auto auto;'>
	            	<span class='material-icons' style='color:#555; font-size:25px;'>&#xe8b6;</span>
 	            </div>
 
	            <a href='#' onClick='$(\".showpanel\").slideDown()' style='margin-top:-8px;'>
	                <span class='material-icons' style='font-size:25px; color:#555;'>&#xebcc;</span>
	            </a>
	            <div class='showpanel' style='display:none; padding:5px; position:fixed; top:40px; left:5px; right:5px; margin:10px; z-index:20; background:skyblue; border-bottom-left-radius:10px; border-bottom-right-radius:10px; filter:drop-shadow(1px 1px 1px #ccc) drop-shadow(-1px 0px 1px #ccc);'>
	                <div style='display:flex; flex-direction:column;'>
			        	<form style='width:100%;' method='post' id='appo_data'>
						<input type='hidden' name='appo' id='appo' value='$freetime'/>
					    <input type='hidden' name='appoday' id='appoday'/>
					
						<div style='width:100%; display:flex; justify-content:center;'>
						    <div style=''>
								<div style='display: flex; justify-content: center;  margin-bottom: 20px;'>
									<select style='padding:10px; font-size:16px; border-radius:10px;' title='day' name='day' id='day'>
										<option value='1'>Sunday</option>
										<option value='2'>Monday</option>
										<option value='3'>Tuesday</option>
										<option value='4'>Wednesday</option>
										<option value='5'>Thursday</option>
										<option value='6'>Friday</option>
										<option value='7'>Saturday</option>
									</select>
								</div>
								<div class='am' id='am2' style='display:flex; margin-bottom: 8px;'>
									<span class='free_am' onclick='setFree(24)' ondblclick='createClass(24)' id='24'>12am</span><span class='free_am' onclick='setFree(1)' ondblclick='createClass(1)' id='1'>1am</span><span class='free_am' onclick='setFree(2)' ondblclick='createClass(2)' id='2'>2am</span><span class='free_am' onclick='setFree(3)' ondblclick='createClass(3)' id='3'>3am</span><span class='free_am' onclick='setFree(4)' ondblclick='createClass(4)' id='4'>4am</span><span class='free_am' onclick='setFree(5)' ondblclick='createClass(5)' id='5'>5am</span>
								</div>
								<div class='am' id='am1' style='display:flex; margin-bottom: 8px;'>
									<span class='free_am' onclick='setFree(6);' ondblclick='createClass(6)' id='6'>6am</span><span class='free_am' onclick='setFree(7);' ondblclick='createClass(7)' id='7'>7am</span><span class='free_am' onclick='setFree(8);' ondblclick='createClass(8)' id='8'>8am</span><span class='free_am' onclick='setFree(9);' ondblclick='createClass(9)' id='9'>9am</span><span class='free_am' onclick='setFree(10);' ondblclick='createClass(10)' id='10'>10am</span><span class='free_am' onclick='setFree(11);' ondblclick='createClass(11)' id='11'>11am</span>
								</div>
								<div class='pm' id='pm1' style='display:flex; margin-bottom: 8px;'>
									<span class='free_pm' onclick='setFree(12);' ondblclick='createClass(12)' id='12'>12pm</span><span class='free_pm' onclick='setFree(13);' ondblclick='createClass(13)' id='13'>1pm</span><span class='free_pm' onclick='setFree(14);' ondblclick='createClass(14)' id='14'>2pm</span><span class='free_pm' onclick='setFree(15);' ondblclick='createClass(15)' id='15'>3pm</span><span class='free_pm' onclick='setFree(16);' ondblclick='createClass(16)' id='16'>4pm</span><span class='free_pm' onclick='setFree(17);' ondblclick='createClass(17)' id='17'>5pm</span>
								</div>
								<div class='pm' id='pm2' style='display:flex; margin-bottom: 8px;'>
									<span class='free_pm' onclick='setFree(18);' ondblclick='createClass(18)' id='18'>6pm</span><span class='free_pm' onclick='setFree(19);' ondblclick='createClass(19)' id='19'>7pm</span><span class='free_pm' onclick='setFree(20);' ondblclick='createClass(20)' id='20'>8pm</span><span class='free_pm' onclick='setFree(21);' ondblclick='createClass(21)' id='21'>9pm</span><span class='free_pm' onclick='setFree(22);' ondblclick='createClass(22)' id='22'>10pm</span><span class='free_pm' onclick='setFree(23);' ondblclick='createClass(23)' id='23'>11pm</span>
								</div>
								<div style='text-align:center; margin-top: 20px;'>
									<button type='submit' name='save' style='padding:5px; border-radius:5px;'>Save</button>
									<div id='appoReply' style='display:none;' onclick='$(\"#appoReply\").hide();'></div>
								    
								</div>
								
							</div>

						</div>
					</form>
		        	<div style='display:flex; justify-content:space-between; margin-top:25px; padding-left:10px; padding-right:10px; margin-bottom: 2px; font-size:12px;'>
						<div onclick='resetAppo();' style='color:#fff'>Reset</div> 
						<div style='margin-left:auto; color:#fff' onclick='$(\".showpanel\").slideUp()'>close</div>
					</div>
            	</div>
            </div>
        	<a href='note' style='margin-top:-8px; margin-left:18px;'>
         		<span class='material-icons material-symbols-outlined' style='color:#555; font-size:25px;'>&#xe7f7;</span>".$allnew."
            </a>


        </div>
		

   			<div style='margin-left:10px;' onclick='$(\"#menu\").show()'>
				<div style='width:3px; height:3px; background:#000;'></div>
				<div style='width:3px; height:3px; margin-top:4px; background:#000;'></div>
				<div style='width:3px; height:3px; margin-top:4px; background:#000;'></div>
			</div>


	</div>
	<div id='menu' style='position:fixed; top:8%; left:0; display:none; z-index:2; background:#fff; filter:drop-shadow(1px 1px 1px #ccc); padding:10px;'>
	    <div style='display:flex; flex-direction:column; justify-content:center; align-items:flex-start; padding:10px; padding-left:20px;'>
	    	<div style='text-align:right; margin-left:12px; font-weight:bold; font-size:12px; width:100%; margin-top:-10px;' onclick='$(\"#menu\").slideUp();'>x</div>
	    	<a href='scrolls' style='color:#000; font-size:12px; margin-bottom:10px;'>
	    		Scrolls
        	</a>
	    	<a href='newclass' style='color:#000; font-size:12px; margin-bottom:10px;'>
	    		Start Class
        	</a>
	    	<a href='index.php?page=classes' style='color:#000; font-size:12px; margin-bottom:10px;'>
	    		View Classes
        	</a>
	    	<a href='profile' style='color:#000; font-size:12px; margin-bottom:10px;'>
	    		Profile
        	</a>
        	<div style='border:1px inset #eee; width:100%;'></div>
        	<a style='color:#000; font-size:12px; margin-top:10px;' href='logout'>Logout</a>
        </div>
	</div>
		
	
	<div style='margin-top:75px;'></div>
	<div>
                  <hr>
                  <div style='width:100%; display:flex; justify-content:center; color:red;' id='typeOut'>
<p href='' class='typewriter'>...a solution you proffer can solve a million similar problems.
</p></div>
            <hr style=''>
          </div>

	<div style='display:flex; width:100vw; align-items:center; justify-content:center;'>
            <form method='POST' action='views/chat.php' class='rptFm' role='form' style='display:flex; align-items:center; justify-content:center; border-radius:20px; padding:10px; padding-bottom:20px; width:90%; background:#fff; margin:10px; margin-bottom:200px; filter:drop-shadow(2px 2px 2px #ccc);'>
              
			    <input type='hidden' name='subcategory' value='Nil'>
			    <input type='hidden' name='tt' value='$me_nAlpha'>
			    <input type='hidden' name='cat_code' value='$cat_code'>
			    <input type='hidden' name='category' id='category' value='$category'>
                <input type='hidden' name='colval' id='colval' value='$colval'>
                <input type='hidden' name='col_id' id='col_id' value='$col_id'>
                <input type='hidden' name='recipient_id' value='$recipient_enc'>
                <input type='hidden' name='chatpop' id='chatpop' value='duo'>
                <input type='hidden' name='haltResponse' value='$haltResponse' id='haltResponse'>
                <input type='hidden' name='que' id='que' value=''>
                <input type='hidden' name='rH' id='rH' value='#fff'>
                <input type='hidden' name='loginAudio' id='loginAudio' value='1'>
               <input type='hidden' name='pwd_enc_pK' id='pwd_enc_pK' value=''> 
                <input type='hidden' name='r' id='r' value=''>
                <input type='hidden' name='y' id='y' value=''>
                <input type='hidden' name='g' id='g' value=''>
               
               <div style='display:flex column; align-items:center; justify-content:center; width:100%;'>
                    <h5 id='responseFormHeader' style='text-align:center; margin-top:15px; margin-bottom:-2px; padding:10px; font-size:23px; color:#222; font-weight:1000;'>Solve challenge</h5>
                    <div style='display:flex; justify-content:center;'>
                        <div style='height:10px; width:10px; border-radius:50%; filter:drop-shadow(1px 1px 1px #555); background:red; margin-right:10px;' id='red-indicator'></div>
                        <div style='height:10px; width:10px; border-radius:50%; filter:drop-shadow(1px 1px 1px #555); background:yellow; margin-right:10px' id='yellow-indicator'></div>
                        <div style='height:10px; width:10px; border-radius:50%; filter:drop-shadow(1px 1px 1px #555); background:#00ff00;' id='green-indicator'></div>
                    </div>


                    <div style='display:flex; padding:3px; margin-top:30px; margin-left:10px;'>
	                    <div style='height:auto; max-width:90px; z-index:1;'>
			                $clientDP
			            </div>
			            <div style='width:100%; min-height: 150px; margin-left:-55px; margin-right:20px; margin-top:10px; padding:10px 10px 10px 80px; border-top-right-radius:30px; border-bottom-left-radius:30px; border-bottom-right-radius:30px; font-size:12px; background:#eee; filter:drop-shadow(2px 2px 2px #ccc);'>
				            <div style='font-size:13px; font-weight:bold;'>".strtoupper($qTable)."   <span style='font-weight:normal;'>&gt;&gt;</span> <span style='font-size:14px;' id='enqCat'>".ucfirst($chat_flag2)."</span></div>
				            <div style='margin-top:15px;'><span id='enqq' style='font-size:12px; text-align:justify; width:90%;'></span></div>
			      		</div>
			      		
		            </div>
                    
		            <div style='display:flex; padding:3px; margin-top:10px;'>
			        
	                    <div style='width:100%; margin-right:-55px; margin-left:20px; margin-top: 10px; padding:1px; font-size:12px; border-top-left-radius:30px; border-bottom-left-radius:30px;'><textarea style='width:100%; height:150px; border-top-left-radius:30px; border-bottom-left-radius:30px; border-bottom-right-radius:30px; border-top-right-radius:30px; border:5px solid #ccc; padding:20px 50px 20px 20px;' id='ans' placeholder='Your solution is...'></textarea></div>
	  	                <div style='display:flex; height:auto; max-width:65px; margin-top:100px; margin-right:20px; z-index:3;'>
			                $tutorDP
			                <span class='material-icons' style='display:flex; justify-content:center; align-items:center; margin-top:48px; margin-left:-24px; color:#2166f3; background:#fff; z-index:2; height:12px; width:12px; border-radius:50%; font-size:20px;'>&#xe029;</span>
			            </div>
			        </div>
			        <div class='form-group' style='text-align:center; margin-top:30px;'>
                                    <div class='col-sm-12'>
                                            <button type='submit' onClick='enc_ans(\"$r_pub\");' name='proceed' class='btn btn-default em hover2 theme2' id='post_enq' style='padding:8px 10px 8px 10px; font-size:14px; border:3px solid #2186f3; border-radius:50px; '><span>Post Solution</span></button>
                                    </div>
                    </div>
                   
                    <script>
                     localStorage.setItem('uploadID', 0);
                	  	var enc_pwd = localStorage.getItem('encP');
			  		var pwd_enc_pK = localStorage.getItem('prv'); 
		              
		              pwd_enc_pK === null ? window.location.href = 'logout' : '';

					var shrd = gen_shared(pwd_enc_pK, enc_pwd, '$r_pub');
			  		localStorage.setItem('shrd'+'$recipient_enc_cons', shrd);
   	    		    var decQ = sym_decrypt('$que', shrd);
                    document.getElementById('enqq').innerHTML = decQ;
   						let freetimeOnDb = '$freetime'.slice(1, -1);
   						let fixedtimeOnDb = '$fixedtime'.slice(1, -1);
   						
   						localStorage.setItem('savedFreeDB', freetimeOnDb);
   						localStorage.setItem('savedFxd', fixedtimeOnDb);

		   			function resetAppo(){
   						localStorage.setItem('savedFree','');
   						document.getElementById('appo').value='';
				    	 document.getElementById('appoReply').innerHTML = 'Appointments reset successfully!';
   						 $('#appoReply').show();
				         $('#appoReply').css({'color':'red', 'font-weight':'weight', 'padding':'2px', 'margin-bottom':'-30px'});
     
   					}

   					function setFree(time){
        				let freeTime = document.querySelector('#appo').value;
        				var dayselect = document.getElementById('day').value;
                        document.getElementById('appoday').value = dayselect;
                        
        			    var bg = ''; var col ='';

                            time < 10 ? timex ='0'+time : timex = time;
        			    if(freeTime !== ''){
                            
            			    if(freeTime.includes('_'+dayselect+timex+'_')){ newFreeTime = freeTime.replace(dayselect+timex+'_', '');
            			        time > 11 && time!=24 ? bg+='#ffffe6' : bg+='#eee';
            			        col+='#000';
						        document.getElementById('appo').value = newFreeTime;    			    
            			    }
            			    else{ newFreeTime = freeTime+dayselect+timex+'_';
            			            bg+='green';        
            			        col+='#fff';
		            			document.getElementById('appo').value = newFreeTime;    
            			    } 
                    
                        $('#'+time).css({'background':bg, 'color':col});
        				
        			        
        			    }else{
        		          $('#'+time).css({'background':'green', 'color':'#fff'});
        			      time < 10 ? time ='0'+time : time;
                	      freeTime += '_'+dayselect+time+'_';
        			   	  document.getElementById('appo').value = freeTime;
        			    }
   					    
   					   // storeToLocal(dayselect, timex);
        			    
   					}
   		
   					function storeToLocal(dayselect, time){
        			    
   						var FTfrmDb = localStorage.getItem('savedFreeDB');
   						var dbFTarray = FTfrmDb.split('_');
   						
						var FxdTfrmDb = localStorage.getItem('savedFxd');
						var dbFxTarray = FxdTfrmDb.split('_');


						   						//var n = _FTfrmDbArray.length;
   												//var FTfrmDbArray = [];

   					 	let savedFT = localStorage.getItem('savedFree');


        		    	savedFT !== '' ? _savedFTarr = savedFT.split('_') : '';
	    			    savedFT !== '' ? _savedFTarr.push(dayselect+time) : _savedFTarr = [dayselect+time];

						var allFTarray = uniq(dbFTarray, _savedFTarr);
						
						localStorage.setItem('savedFree', _savedFTarr);
						alert(allFTarray);

                    }
   					
   					function uniq(a, b){
   						for(let i=0; i < a.length; i++){
   							for(let j=0; j < b.length; j++){
   								if(a[i] === b[j]){
   									let ind = b.indexOf( b[j] );
   									b.splice(ind, 1);
   								}
   						
   							}		
   							
   						}

   						a.push(...b);
   						return a;
   					}

   					$('#day').on('change', function() { 
   						var _appo = document.getElementById('appo').value;
   						var appo = _appo.slice(1, -1);
    					
    					localStorage.setItem('savedFree', appo);
                        var FT =localStorage.getItem('savedFree');
   					    
   					    FT !== '' ? FTarray = FT.split('_') : FTarray = [];
                   
   					    var FxT =localStorage.getItem('savedFxd');
   					    
   					    
   					    FxT !== '' ? FxTarray = FxT.split('_') : FxTarray = [];
                        $('.free_am').css({'background':'#fff', 'color':'#000', 'border':'1px solid black', 'border-radius':'2px'});
   						$('.free_pm').css({'background':'#ffffe6', 'color':'#000', 'border':'1px solid black', 'border-radius':'2px'});
   						
                        FTarray.forEach(colorBG);
				        FxTarray.forEach(colorBG);
   					   
   					});

					
				   	var FT_ = localStorage.getItem('savedFreeDB');
				   	var FxT_ = localStorage.getItem('savedFxd');
				   	var FT_array = FT_.split('_');
				   	var FxT_array = FxT_.split('_');
				   	
				    FT_array.forEach(colorBG);
					FxT_array.forEach(colorBG);
					    

					function colorBG(item){
                    	    let firstChar = item.substr(0, 1);
                    		let id = item.replace(firstChar, '');
                   		 	var day = document.getElementById('day').value;
                   		
                   			_id = id.substr(0, 2);
                   			_id>9 ? idx = id.substr(0, 2) : idx = id.substr(1, 1);
                
                    		if(idx !='' && firstChar == day){
                    			
                    			id.includes('.') ? bdrad = '20px' : bdrad = '20px';
                    			id.includes('.') ? bd = '3px solid red' : bd = '3px solid green';
                    			

                    			id.includes('.') ? bgc = '#fff' : bgc = '#fff';
                    			id.includes('.') ? col = 'red' : col = 'green';
                    			_id = id.substr(0, 2);
                    			
                    			_id > 9 ? idx = _id.substr(0, 2) : idx = _id.substr(1, 1);
                    			
                    			$('#'+idx).css({'background': bgc, 'color':col, 'border': bd, 'border-radius':bdrad});

                    			id.includes('.') ? document.getElementById(idx).setAttribute('onClick', 'setOptions(\"'+item+'\");') : '';

                    		}
                    }




function setOptions(daytime){

	$.ajax({
            url: 'includes/delegate.inc.php',
            method: 'POST',
            data: {delegCode:daytime},
            dataType:'json',
            success: function(data){
            	 $('#response').slideDown();
                var dp_URL = data.dp_URL;
                var cfn = data.cfn;
                var topic = data.topic;
                var cat = data.cat;
                var delegtime = data.delegtime;
                var tutors = data.tutors;
                var delegator = data.xpt;
                var client_ID = data.client_ID;
                var n = tutors.length - 1;
                var eachTutor = '';
                var CID = '';
                while(n>=0){
                	var _tutor = tutors[n].split('_');
                	var delegate = _tutor[0];

                	eachTutor += '<label onClick=\"delegateTutor('+delegator+', '+client_ID+', '+delegate+', '+cat+', '+delegtime+', '+CID+')\" style=\"display:flex; align-items:center;\"><input type=\"radio\" name=\"delegate\" value=\"'+delegate+'\" style=\"margin-right:10px;\">'+_tutor[1]+'</label>';
                	n--;
                }
               /*<span style=\"color:#2166f3; font-weight:500; font-size:12px; color:#fff; background:#2166f3; border-radius:50px; padding:5px;\">Delegate</span>*/
                document.getElementById('response').innerHTML = '<div style=\"width:80vw; background:#fff; padding:5px; border-radius:50px; display:flex; margin-left:auto; margin-right:auto; filter:drop-shadow(2px 2px 2px #aaa);\"><img src=\"img/profiles/profile/'+dp_URL+'.webP\"  style=\"width:130px; height:130px; border-radius:50%; border:5px solid transparent; background:transparent;\"/><div style=\"margin-left:auto; display:flex; flex-direction:column; margin-right:auto; justify-content:center; align-items:center; height:130px;\"><div style=\"font-size:18px; font-weight:800;\">'+cfn+'</div><div style=\"font-size:12px; margin-bottom:auto; margin-top:10px;\">Delegate to '+topic+' expert:</div><div style=\"display:flex; justify-content:flex-left; align-items:center; font-size:12px; padding:30px 10px 10px 10px; background:#eee; margin:-5px auto 10px auto; height:60px; width:36vw; border:1px solid #aaa; overflow-y:scroll; border-radius:10px;\">'+eachTutor+'</div><div style=\"text-align:center; margin-top:auto;\"></div></div><div onclick=\"$(\'#response\').slideUp();\" style=\"font-size:20px; font-weight:600; display:flex; justify-content:flex-end; align-items:center;\">x</div></div>';
            },
            error: function(data){
            }
            
    });
}


function delegateTutor(delegator, client_ID, delegate, cat, delegtime, CID){

	$.ajax({
            url: 'includes/delegateTutor.inc.php',
            method: 'POST',
            data: {delegator:delegator, client_ID:client_ID, delegate:delegate, cat:cat, delegtime:delegtime, cid:CID},
            dataType:'json',
            success: function(data){
            	
			},
			error: function(data){

			}
	});
}			

indic();

function indic(){
setInterval(function(){
    if(document.getElementById('y').value == '1'){
      document.getElementById('yellow-indicator').style.background = '#eee';
      document.getElementById('y').value = '';
    
      document.getElementById('green-indicator').style.background = '#eee';
      document.getElementById('g').value = '';
    
      document.getElementById('red-indicator').style.background = '#eee';
      document.getElementById('r').value = '';
   
      }
      else{
       document.getElementById('yellow-indicator').style.background = 'yellow';
      document.getElementById('y').value = '1';

      document.getElementById('green-indicator').style.background = '#00ff00';
      document.getElementById('g').value = '1';

       document.getElementById('red-indicator').style.background = 'red';
      document.getElementById('r').value = '1';

     }
  }, 1000);

}

              </script>
            </form>
        </div>
        </div>
        <div style='margin-top:-180px;'>
	<br>

</div>
";
$rForm.=$usersView->searchPanel();
$rForm.=$usersView->bottomNavigation();
      
define('tutortochat', 'chatNow');
define('stdtochat', 'chatReady');
return $rForm;
