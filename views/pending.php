<?php
define('ALLOW_ACCESS', true);

$_SESSION['SET_FLAG'] = TRUE;
$_SESSION['SET_CHAT'] = TRUE;
$_SESSION['new_sess'] = TRUE;



$usersContr = new usersContr();
$usersView = new usersView();


$userData = $usersView->fetchUser();
$uid = $userData[0]['profile_id']; $engager = $userData[0]['engager'];
$fn = $userData[0]['firstname'];
$ln = $userData[0]['lastname'];
$pn = $userData[0]['contact'];
$categPass = $usersView->enc_cons('FALSE');

        //check user coin balance
        $coinData = $usersView->select('coin', ' WHERE owner_id = ?', $uid);
        $myBal = $coinData[0]['Gcoin'];

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



$pendingData = $usersView->fetchPending();

//var_dump($pendingData);

$n = count($pendingData) - 1;
$pend = $usersView->topBar($notes);
$pend .=$usersView->bottomNavigation('Q');
$pend .="<div style='width:100%; height:100%; display:flex; justify-content:center; flex-direction:column; align-items:center; margin-top:50px; margin-bottom:100px; padding:20px;'>
<div style='background:deepskyblue; display:flex; justify-content:center; width:100%; position:fixed; top:0; font-size:12px;'>
                <span style='margin-right:auto; padding:10px; font-weight:bold;'><a href='buycoin' style='color:#2166f3;'>Fund wallet</a>
                </span><span style='color:#fff; padding:10px; font-weight:bold; margin-left:auto;'>".$myBal."Gc </span></div>

			<div style='position:fixed; z-index:20000; top:8%; display:flex; justify-content:center; width:100%;'>
   				<div style='padding:5px; border-radius:5px; background: rgba(0,0,0, .3); color:#fff; font-size:13px;'>Pending projects</div>
       			</div>
			<div class='scrollet enquiry-form'>";

	$mediaType = 1;
if($n < 0){$pend .="<div style='width:100%; display:flex; justify-content:center;'><div style='font-size:12px;'>Hoops! no pending project.</div></div>";}
while($n >= 0){
	//var_dump('INSIDE--');
$pendingData[$n]['projectType'] == 1 ? $fa = 'e7fd' : ($pendingData[$n]['projectType'] == 2 ? $fa = '38d3' : $fa = 'f233');		
//$pendingData[$n]['projectType'] == 1 ? $contentUrl = 'uscript' : ($pendingData[$n]['projectType'] == 2 ? $contentUrl = 'views/chat.php' : $contentUrl = 'views/grpchat.php');		
	
	$pendingData[$n]['projectType'] == 1 && $trial == 0 ? $contentUrl = 'uscript' : 
	($pendingData[$n]['projectType'] == 1 && $trial == 1 ? $contentUrl = 'trial' : 
	 ($pendingData[$n]['projectType'] == 2 ? $contentUrl = 'views/chat.php' : $contentUrl = 'views/grpchat.php'));

	$catid = $pendingData[$n]['projectCat'];
	$title = $pendingData[$n]['projectTitle'];
	$trial = $pendingData[$n]['trial'];
	$projectID = $pendingData[$n]['projectID'];
	$projectType = $pendingData[$n]['projectType'];
	$tutor = $pendingData[$n]['owner']; 
	$tutor_numAlpha = $usersView->num_AlphaA($tutor);
  $contributor = $pendingData[$n]['contributor'];
	
	$tutor != $uid ? $recipi_id = $tutor : $recipi_id = str_replace('.', '', $contributor);

	$aoiData = $usersView->select('aoi', ' WHERE aoi_id = ?', $catid);
	$cat_code = $aoiData[0]['cat_code'];
				

	//get client or tutor rpub
  $recipi = $usersView->select('skyman_user', ' WHERE user_id = ? ORDER BY online DESC', $recipi_id);
	if(count($recipi) >= 0){
	$online = $recipi[0]['online'];
	$rPub = $recipi[0]['pub'];
	$xpid = $recipi_id;
	$recipi_id_enc0 = $usersView->encryptor0($recipi_id);
 

  $pending = $usersView->enc_cons($catid.'_pending');
$pubid = str_replace('_'.$usersView->usercode($me), '', $projectID);
	$pend .="		<div style='width:100%; padding-left:40px; padding-right:40px;'>
 				<div style='display:flex; border:1px solid #fff; border-radius:10px; filter:drop-shadow(.5px .5px .5px #aaa) drop-shadow(-.5px -.5px .5px #aaa); background:#fff; justify-content:space-around; align-items:center; margin-bottom:10px;'>
					<div style='width:15%; padding:10px;'><span class='material-icons' style='font-size:20px; color:#bbb; filter:drop-shadow(1px 1px 1px #000);'>&#x".$fa.";</span></div>
					<div style='display:flex; flex-direction:column; width:60%; text-align:center;'>
						<div class='truncate' style='font-size:13px;'>".$pendingData[$n]['projectTitle']."</div>
						<div style='display:flex; justify-content:center; font-size:10px; font-style:italic; width:100%; text-align:center;'>
							<span style='margin-right:5px;'>".date('m-d H:i', strtotime($pendingData[$n]['startDate']))."</span>
							to<span style='margin-left:5px;'>".date('m-d H:i', strtotime($pendingData[$n]['newupdate']))."</span>
						</div>
					</div>
					<div style='width:25%; text-align:right; padding:10px;'>";
     					$trial == 1 ?	$pend .= "<a href='index.php?page=trial&pubid=$pubid&catid=$catid' style='text-decoration:none; display:flex; align-items:center;'><span class='' style='color:#2166f3; background:transparent; border:1px solid #fff;'>Resume</span></a>" :
     					$pend .= "<form action='$contentUrl' method='post'>
							<input type='submit' value='Resume' style='color:#2166f3; border:0; background:transparent; font-size:12px;'/>
							<input type='hidden' name='category' value='$catid' />
							<input type='hidden' name='title' value='$title' />
							<input type='hidden' name='pending' value='$pending' />
							<input type='hidden' name='mediaType' value='$mediaType' />
							<input type='hidden' name='cid' value='$projectID' />
							<input type='hidden' name='que' value='$title' />
							<input type='hidden' name='cat_code' value='$cat_code' />
							<input type='hidden' name='tt' value='$tutor_numAlpha' />
							<input type='hidden' name='recipient_id' value='$recipi_id_enc0' />

   		        <input type='hidden' name='chat' value='1'>  
   		        <input type='hidden' name='flag' value='1'>
   		        <input type='hidden' name='categoryPass' value='catPass'>

 
    		        <input type='hidden' name='haltResponse' value='0'>  

							<input type='hidden' name='projectType' value='$projectType' />
						</form>";
		
			$pend .="		<script>
		      		
		    					var enc_pwd = localStorage.getItem('encP'); 
		              var pwd_enc_pk = localStorage.getItem('prv');
		              pwd_enc_pk === null ? window.location.href = 'logout' : '';

					    		var shrd = gen_shared(pwd_enc_pk, enc_pwd, '$rPub');
					    		document.getElementById('sk' + '$xpid').value = shrd;
		              localStorage.setItem('shrd'+'$xpid', shrd);
		              document.getElementById('loader').style.display = 'none';
		            
            	    </script>
					
					</div>
				</div></div>";
			}
	$n--;
}

$pend .=   "</div>
		</div>";
}
$pend.=$usersView->searchPanel();

return $pend;
