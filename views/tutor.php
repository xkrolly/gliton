<?php
define('ALLOW_ACCESS', true);

$_SESSION['ISSET_FLAG'] = FALSE;
$_SESSION['ISSET_CHAT'] = FALSE;
$_SESSION['alreadygetUniqConv'] = FALSE;

$_SESSION['new_sess'] = TRUE;

$usersContr = new usersContr();
$usersView = new usersView();

isset($_POST['que']) ? $que = $_POST['que'] : $que = 'My question is as follows:';

$userData = $usersView->fetchUser();
$_engaged = $userData[0]['engaged'];
$_paidSession = $userData[0]['purchasedSession'];

$regCompleted = $userData[0]['regCompleted'];
$tutor_list ='';

if($regCompleted == 1){

    $paid_Session = $usersView->dec_cons($_paidSession);
    $paidSession = intval($paid_Session);

    //get my newly generated pub if any, and update my db
	if(!empty($_POST['pub'])){
	    $vals = $_POST['pub'].', '.$me;
		$usersContr->update('skyman_user', 'pub = ? WHERE user_id = ?', $vals);
	}  

    if(isset($_POST['category']) || isset($_GET['category']) ){
    	
    	isset($_POST['category']) ? $_cat = $_POST['category'] : (isset($_GET['category']) ? $_cat = $_GET['category'] : $_cat='');
        isset($_POST['category']) ? $catPass = $_POST['categoryPass'] : (isset($_GET['category']) ? $catPass = $_GET['category'] : '');
    
        //save que temporarily on db
        $valu = $usersView->enc_cons($que).', '.$userData[0]['profile_id'];
        $usersView->dec_cons($catPass) === 'TRUE' ? $x='' : $usersContr->update('profile', 'save_que = ? WHERE profile_id = ?', $valu);
        //$usersView->dec_cons($catPass) === 'TRUE' ? $x='' : $usersView->categoryPass($_cat);

        
	    if( $_engaged == 1){
			//select new available tutor OR Terminate transac

				$aoiData = $usersView->select('aoi', ' WHERE aoi_id = ?', $_cat);
				$cat_code = $aoiData[0]['cat_code'];
				$expert = ucfirst($aoiData[0]['specialist']);
				
				return "<div style='display:flex; height:100%; width:100%; justify-content:center; align-items:center; padding-top:25%;'>
										<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
											<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid red; align-items:center; justify-content:center;'><i class='fa fa-bullhorn' style='color:red; font-size:30px;'></i></div>
											<h3>Hello!</h3>
											<p style='font-family:serif;'>You are currently in session with a <strong style='font-family:serif;'>".$expert."</strong>. Kindly <i>Continue</i> or <i>Cancle</i> to end it. 
											<p style='margin-top:-10px; font-weight:bold; color:red; font-style:italic; font-size:11px;'>Note: No compensation for abruptly ending a consultation session. Thanks.</p>
											</p>
											<div style='display:flex; justify-content:space-around; width:100%; margin-top:20px;'><a href='enquiry' style='color:#fff; background:red; padding:5px; font-size:12px; border:1px solid red; border-radius:5px;'>Cancel</a>
												<a href='views/chat.php' style=' background:#fff; padding:5px; border:1px solid blue; border-radius:5px; font-size:12px;'>Continue</a>
											</div>
										</div>
									</div>";
	    }

		$cat = '%_'.$_cat.'_%';
		$_SESSION['converse_not_started_yet'] = TRUE;

		$me = $userData[0]['profile_id'];
        //check user coin balance
        $coinData = $usersView->select('coin', ' WHERE owner_id = ?', $me);
        $myBal = $coinData[0]['Gcoin'];
        $appoStr = $usersView->to_appoStr('');
		$tutor_AppoStr = $appoStr.'.'.$me;


	
		$session_sec_rem = strtotime($userData[0]['session_end']) - time();
		$session_sec_rem <=0 ? $session_sec_rem = "" : $session_sec_rem = "<i class='fa fa-arrow-down sm' style='font-size:10px;'></i>".$session_sec_rem.'s';

    //to ensure data insert to scd once at the beginning
		$_SESSION['insertToScd'] = TRUE;

		$tutor_list .='';


                    //capture GC value before deduction; and estimate locked amnt

	                isset($_SESSION['Gb4']) ? $_Gb4 = $usersView->dec_cons($_SESSION['Gb4']) : $_Gb4 = '';
                    ( !empty($_Gb4) && $_Gb4 > intval($myBal) ) ? $locked = intval($_Gb4) - intval($myBal) : $locked = ''; 
                    
$locked != '' ? $myBalSpan = "<span style='color:#fff; padding:10px; font-weight:bold; margin-left:auto;'>".$myBal."Gc </span>" : $myBalSpan = "<div style='margin-left:auto; display:flex; flex-direction:column;'><span style='color:#fff; padding:10px; font-weight:bold;'>".$myBal."Gc </span><span style='font-size:9px; color:red; margin-top:-10px;'>$locked</span></div>"; 
				
				$vals = "1, ".$cat.", ".$me;
				$tutorData = $usersView->select('profile', ' INNER JOIN skyman_user USING(profile_id) WHERE xpt = ? AND aoi LIKE ? AND profile_id != ? ORDER BY online ASC', $vals);
				$aoiData = $usersView->select('aoi', ' WHERE aoi_id = ?', $_cat);
				
				$cat_code = $aoiData[0]['cat_code'];
				$expert = ucfirst($aoiData[0]['specialist']);
				$spec = ucfirst($aoiData[0]['subcategory']);
                $tutor_list .="<div style='background:deepskyblue; display:flex; justify-content:center; width:100%; position:fixed; top:0; font-size:12px;'>
                <span style='margin-right:auto; padding:10px; font-weight:bold;'><a href='buycoin' style='color:#2166f3;'>Fund wallet</a>
                </span>$myBalSpan</div>";

				$tutor_list .= "<div style='padding:5px;'><h6 style='font-size:18px; text-align:center; margin-bottom:10px; margin-top:40px; font-family:serif;'>".$expert."s</h6>";

				if(count($tutorData) > 0){
						$ln = count($tutorData) - 1;

					while($ln >= 0){
        
        	//get all the specialties
  					$xpt_id = $tutorData[$ln]['profile_id'];
		    		$fn = $tutorData[$ln]['firstname'];
			        $sn = $tutorData[$ln]['lastname'];
			        $aoicheckMark = $tutorData[$ln]['aoi'];
			        
			        $xpt_consult_fee = $tutorData[$ln]['cFee'];

			        $_tutor_specs = $usersView->generate_spec($xpt_id, '');
			        $imgUrl_tutor = $usersView->generate_DP($xpt_id, '70px', '');
			        $tutor_specs = implode(' | ', $_tutor_specs);

			        $firstname = $usersView->decryptor0($fn);
			        $lastname =  $usersView->decryptor0($sn);
			        $tutor_uname = $usersView->select('skyman_user', ' WHERE user_id = ? ORDER BY online DESC', $xpt_id);
						$online = $tutor_uname[0]['online'];
						$rPub = $tutor_uname[0]['pub'];

						$enc_xpt_id = $usersView->encryptor0($xpt_id);
		        $ttid = $usersView->num_AlphaA($xpt_id);
		        $xpid = $usersView->enc_cons($xpt_id);
		        $_xpid = str_replace('==', '', $xpid);
    		        $recipient_enc0 = $usersView->encryptor0($tutorData[$ln]['profile_id']);

				//unset appointmnets
     				$usersView->unsetAppo($xpt_id);

						$online == 1 ? $color = '#2166f3' : $color = '#888';
						$online == 1 ? $status = 'online' : $status = 'offline';
						$online == 1 ? $bold = 'bold' : $bold = 'normal';

						$fullname = strtoupper($lastname).'   '.strtoupper($firstname); 

				//grab the veriCheck Mark
						$checkMark = $usersView->veriCheckMark($xpt_id, $_cat, '3', '#fff');
						$checkMark2 = "<span class='verified'><i class='fa fa-check' aria-hidden='true'></i></span>";
				//check if previously fixed appointment with this xpt_id tutor exist
						$vals = $xpt_id.', %_'.$tutor_AppoStr.'_%';
				    $appoCheck = $usersView->select('appointment', ' WHERE profile_id = ? AND fixedtime LIKE ?', $vals);
				
				//check categoryPass
				isset($_POST['category']) ? $catPass = $_POST['categoryPass'] : (isset($_GET['category']) ? $catPass = $_GET['category'] : '');

				//check if previously fixed time exist at all for this user
						$vals = '%_'.$tutor_AppoStr.'_%';
				    $appoCheck2 = $usersView->select('appointment', ' WHERE fixedtime LIKE ?', $vals);

                    $userData = $usersView->fetchUser();
                    $userQue = $usersView->dec_cons($userData[0]['save_que']);
                    count($appoCheck) > 0 ?	$que = $userQue : $que;

                    //capture GC value before deduction; and estimate locked amnt

	                isset($_SESSION['Gb4']) ? $_Gb4 = $usersView->dec_cons($_SESSION['Gb4']) : $_Gb4 = '';
                    ( !empty($_Gb4) && $_Gb4 > intval($myBal) ) ? $locked = intval($_Gb4) - intval($myBal) : $locked = ''; 
                   
                    ( !empty($_Gb4) && $_Gb4 > intval($myBal) ) ? $balB4Deduction = intval($_Gb4) : $balB4Deduction = intval($myBal);

                    intval($xpt_consult_fee) > intval($balB4Deduction) ? $disable ='disabled' : $disable ='';
                    intval($xpt_consult_fee) > intval($balB4Deduction) ? $bg ='#eee' : $bg ='#2166f3';
                    intval($xpt_consult_fee) > intval($balB4Deduction) ? $theme = 'disabled-theme' : $theme = 'theme';
                    intval($xpt_consult_fee) > intval($balB4Deduction) ? $btnAction = '' : $btnAction = 'submit';
                    intval($xpt_consult_fee) > intval($balB4Deduction) ? $href='#' : $href = "index.php?page=fixappo&rid=".$xpid."&qid=".$_cat."&q=".$que;                    

				    count($appoCheck) > 0 ?	
				    $btn = "<button type='$btnAction' id='chatup".$xpt_id."' $disable class='$theme hover' onclick='enc_que(\"$que\", \"$xpid\", \"$xpt_id\");' style='display:flex; align-items:center; justify-content:center; padding:2px; width:45%; border:2px solid $bg; border-radius:8px;'>Chat up</button>" : 
				    $btn = "<div id='chatup".$xpt_id."' style='display:flex; align-items:center; justify-content:center; width:45%; border:2px solid $bg; border-radius:8px;' class='$theme hover2'><a href='$href' $disable style='text-decoration:none; padding:2px; width:100%; text-align:center; color:#fff;' class='light-them'>Fix appointment</a></div>";
      				    count($appoCheck) > 0 ? $hideOdas = 'block' : $hideOdas = 'none';
				    count($appoCheck2) == 0 ? $hideOdas = 'block' : $hideOdas;
        
					$tutor_list .="<div style='display:$hideOdas; background:#cbf6ff; border:1px solid deepskyblue; border-radius:35px; padding:0 10px 20px 10px; margin-bottom:20px;'><form method='post' action='views/chat.php' >
  					<input type='hidden' name='u_type' value='1'>
    	            <input type='hidden' name='loginAudio' id='loginAudio' value='1'>
    	            <input type='hidden' name='que' class='que' id='que".$xpt_id."' value=''>
    	            <input type='hidden' name='category' id='category' value='$_cat'>
                    <input type='hidden' name='cat_code' id='cat_code' value='$cat_code'>
	            
    		        <input type='hidden' name='' id='sess_sec_rem_holder' value='' /> 
    		        <input type='hidden' name='haltResponse' value='0'>  
    		        <input type='hidden' name='rPub' id='rPub".$xpid."' value='".$rPub."'>  
    		        <input type='hidden' name='tt' value='$ttid'>  
    		        <input type='hidden' name='chat' value='1'>  
    		        <input type='hidden' name='flag' value='1'>
       		        <input type='hidden' name='categoryPass' value='".$catPass."'>
    
    		        <input type='hidden' name='sk' id='sk".$xpid."' value=''>  
    		        <script>
		            //set online  isOnline(\"$xpid\"); sessionTimer();
                     localStorage.setItem('uploadID', 0); // seeding multiple uploading of files on chatPG
		    			
		    					var enc_pwd = localStorage.getItem('encP'); 
		              var pwd_enc_pk = localStorage.getItem('prv');
		              pwd_enc_pk === null ? window.location.href = 'logout' : '';

					    		var shrd = gen_shared(pwd_enc_pk, enc_pwd, '$rPub');
					    		
					    		document.getElementById('sk' + '$xpid').value = shrd;
		              localStorage.setItem('shrd'+'$xpid', shrd);
		              document.getElementById('loader').style.display = 'none';
		            
            	    </script>
							
					<input type='hidden' name='recipient_id' id='recipient_id' value='".$recipient_enc0."'>
						<div style='display:flex; margin-top:30px; '><span style='font-weight:bold; font-size:16px;' class='tutorName'>".$fullname."</span>$checkMark2</div>
					<div style='display:flex; width:100%; border-radius:10px; padding:6px; align-items:center;'>
					    <div style='display:flex; flex-direction:column; width:55%;'>
					        <span class='tutorSkill'>".$expert."</span> 
					        <span class='tutorSpec' style='font-style:normal; font-family:serif;'>".$tutor_specs."</span>
					    </div>
					    <div style='font-size:12px; display:flex; justify-content:center; align-items:center; margin-left:20px; width:32px; height:32px; background:gold; filter:drop-shadow(1px 1px 1px #aaa); border-radius:50%; color:#fff; margin-right:10px;'>
					        ".$xpt_consult_fee."Gc
					    </div>
					    
					    <div style='font-size:13px; margin-left:auto; font-style:italic; display:flex;'>
					       <div style='display:flex; flex-direction:column; justify-content:center; align-items:center;'>
					       
					       <div id='indicator".$xpt_id."' style='border:1px solid #ccc; padding:1px; border-radius:50%;'>
					            $imgUrl_tutor
					       </div>";
						
							    $check = $usersView->checkFoloa($xpt_id, $me);
						    	$xx = $usersView->select('profile', ' WHERE profile_id = ?', $xpt_id);

						  	  $nTotal = $xx[0]['tf'];
						    	$totalWorks = $xx[0]['works'];
							    $xpid_ = $usersView->cutSpecialChars($_xpid);

									if(count($check) == 0){
										$tutor_list.="<span class='folo".$xpid_."' style='font-size:20px; z-index:20; margin-top:-15px; height:20px; width:20px; background:red; color:#fff; border-radius:50%; display:flex; justify-content:center; align-items:center;' onclick='foloDis(\"$_xpid\")'>+</span>";
									}
										$tutor_list.="</div>
											       </div>
											    </div>
	    							<div style='display:flex; width:100%; color:#888; border-radius:10px; margin-top:-5px; font-size:9px; padding:6px;'>
										  	<div style='display:flex; align-items:center; '>".$totalWorks." puzzles solved
										  		<div style='margin: auto 10px auto 10px; height:4px; width:4px; border-radius:50%; background:#777;'></div> ".$totalWorks." published
										  	</div> 		           
												<div style='font-weight:bold; margin-left:auto; margin-right:16px;'>
												 		<span id='ttf".$xpid_."'>$nTotal</span> followers
												</div>

									  </div>
								    <div style='display:flex; width:100%; color:#888; border-radius:10px; margin-top:5px; font-size:9px; padding:6px 6px 0 6px;'>
										  	<span class='light-theme2' style='display:flex; align-items:center; justify-content:center; width:45%; border:2px solid #2166f3; padding:5px 10px 5px 10px; border-radius:8px; margin-right:auto; background:transparent;'>View publications</span>
										  	$btn

									</div>
						   </form></div>";

					 $ln --;
					}

				}
				else{
			
					$tutor_list .="<div style='display:flex; height:100%; width:100%; justify-content:center; align-items:center; padding-top:75%;'>
										<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
											<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid red; align-items:center; justify-content:center;'><i class='fa fa-times' style='color:red; font-size:30px;'></i></div>
											<h3>Hoops!!!</h3>
											<p style='font-family:serif;'>Sorry, no <strong style='font-family:serif;'>".$expert."</strong> is currently available. Kindly check back later. Thanks.</p>
									
										</div>
									</div>";
				}


			$tutor_list .= "</div>";
			return $tutor_list;
	
	}else{
		header('Location: enquiry');
	}
}
else{
    $tutor_list .= $usersView->completeRegFirst();
		return $tutor_list;
	
    
}
