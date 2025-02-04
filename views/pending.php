<?php


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



$pendingData = $usersView->fetchPending();



$n = count($pendingData) - 1;
$pend = $usersView->topBar($notes);
$pend .=$usersView->bottomNavigation();
$pend .="<div style='width:100%; height:100%; display:flex; justify-content:center; flex-direction:column; align-items:center; margin:50px 10px 100px 10px; padding:50px;'>
			<h6>Pending projects</h6>
			<div class='scrollet enquiry-form'>";

	$mediaType = 1;
if($n < 0){$pend .="<div style='width:100%; display:flex; justify-content:center;'><div style='font-size:12px;'>Hoops! no pending project.</div></div>";}
while($n >= 0){
$pendingData[$n]['projectType'] == 1 ? $fa = 'e7fd' : ($pendingData[$n]['projectType'] == 2 ? $fa = '38d3' : $fa = 'f233');		
	$catid = $pendingData[$n]['projectCat'];
	$title = $pendingData[$n]['projectTitle'];
	$projectID = $pendingData[$n]['projectID'];
    $pending = $usersView->enc_cons($catid.'_pending');

	$pend .="
				<div style='width:100%; display:flex; border:1px solid #fff; border-radius:10px; filter:drop-shadow(.5px .5px .5px #aaa) drop-shadow(-.5px -.5px .5px #aaa); background:#fff; padding:10px; justify-content:space-around; align-items:center; margin:10px;'>
					<div style='width:15%; padding:10px;'><span class='material-icons' style='font-size:20px; color:#bbb; filter:drop-shadow(1px 1px 1px #000);'>&#x".$fa.";</span></div>
					<div style='display:flex; flex-direction:column; width:55%;'>
						<div class='truncate' style='font-size:14px;'>".$pendingData[$n]['projectTitle']."</div>
						<div style='display:flex; font-size:10px; font-style:italic;'>
							<span style='margin-right:10px;'>started: ".date('m-d H:i', strtotime($pendingData[$n]['startDate']))."</span>
							<span>update: ".date('m-d H:i', strtotime($pendingData[$n]['newupdate']))."</span>
						</div>
					</div>
					<div style='text-align:right;'><form action='uscript' method='post'>
							<input type='submit' value='Resume' style='color:deepskyblue; border:0; background:transparent; font-size:14px;'/>
							<input type='hidden' name='category' value='$catid' />
							<input type='hidden' name='title' value='$title' />
							<input type='hidden' name='pending' value='$pending' />
							<input type='hidden' name='mediaType' value='$mediaType' />
							<input type='hidden' name='cid' value='$projectID' />
						</form>
					</div>
				</div>";
	$n--;
}
//if( isset($_POST['category']) && !empty($_POST['title']) && !empty($_POST['mediaType'])){

$pend .=   "</div>
		</div>";
}
$pend.=$usersView->searchPanel();

return $pend;
