<?php
include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();

$_cert = $_GET['cert'];
$cert = str_replace(' ', '+', $_cert);
$_cat = $_GET['cat'];
$cat = str_replace(' ', '+', $_cat);

$_pid = $_GET['pid'];
$certDEC = $usersView->dec_cons($cert);
$catDEC = $usersView->dec_cons($cat);
$pidDEC = $usersView->decryptor0($_pid);

$_cat = explode('_', $catDEC);
$cat_arr = array_slice($_cat, 1, -1, true);
$proview = "<div style='display:flex; width:100vw; height:100vh; background:#eee;'>
							<div style='display:flex; width:10%;'>
							</div>				
				<div style='display:flex; flex-direction:column; align-items:center; justify-content:center; width:80%; height:90%; margin-top:50px; background:#fff; filter:drop-shadow(-2px -2px 2px #aaa); border-radius:30px; padding:20px;'>
					<div style='display:flex; align-items:center; justify-content:center; width:100%; height:88%;'>
						<img src='img/vericheckCert/$certDEC' style='width:95%; height:88%'/>
					</div>";
$proview.="<div>		<form id='veriCert_data' method='post'><input type='hidden' name='category' id='category' value=''/>
							<input type='hidden' name='applicant' id='applicantID' value='$_pid'/>
							<input type='hidden' name='userCERT' id='userCERT' value='$cert'/>";    	

					foreach ($cat_arr as $cat) {
	// code...
						$data = $usersView->select('aoi', ' WHERE aoi_id = ?', $cat);
						$subcategory = $data[0]['subcategory'];
						$proview.="<div style='display:flex; justify-content:flex-left;'><div style='border:0; background:#fff; padding:0;' id='a$cat'  onclick='addCheckmark($cat)'><input id='c$cat' value='$cat' type='checkbox'><span style='margin-left:10px;'>".$subcategory."</span></div></div>";


						}

$proview.="   	
						<div style='display:flex; justify-content:space-between; width:200px;'><button type='submit'>Approve</button><div style=''>Disapprove</div></div>
						<div id='vericheck_upd'></div>
</form></div>";    	

$proview.=" 
				</div>
				
				<div style='display:flex; width:10%;'>
				</div>
			</div>
			 <script src='../scripts/jquery-3.6.0.min.js'></script>
			 <script src='../scripts/login.js'></script>
			 <script src='../scripts/processor.js'></script>
		     <script src='../scripts/script.js'></script>
			";

echo $proview;