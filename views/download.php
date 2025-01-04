<?php

	$usersContr = new usersContr();
	$usersView = new usersView();
if(!isset($_GET['konsult'])){ 
$catid=$_GET['catid'];
$scriptid = str_replace(' ', '+', $_GET['scriptid']);
$chatpop = $_GET['chat'];

$heading = $usersView->downloadScript($chatpop, $catid, $scriptid); 

return "<div style='font-size:18px; width:100%; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
		<div style='width:65%; display:flex; flex-direction:column; justify-content:center; align-items:center;'>	
			<div>
			<span class='material-icons' style='color:#0f0; font-size:60px;'>&#xe86c;</span>
        
            </div>
			<div style='font-size:25px; font-style:italic; font-weight:bold; margin-top:5px;'>Quite awesome!!!</div>
			<div style='padding:20px; border-radius:10px; font-style:italic; text-align:justify;'>
				Your download of <strong style='color:#2166f3;'>".ucfirst($heading)."</strong> solscript was successful. Kindly check it in the Glit directory in your download folder!
			</div>
			<div><a href='index.php'>&lt;&lt;Back</a></div>
		</div>
		</div>";
}
else if(isset($_GET['konsult'])){

	$catid = $_GET['catid'];
	$uniqConv_enc = str_replace(' ', '+', $_GET['convid']);
	$chatpop = $_GET['chat'];

$heading = $usersView->saveScript($chatpop, $catid, $uniqConv_enc);

return "<div style='font-size:18px; width:100%; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
		<div style='width:65%; display:flex; flex-direction:column; justify-content:center; align-items:center;'>	
			<div><i class='fa fa-check' style='background:#fff; color:#0f0; border:3px solid #0f0; padding:20px; font-size:25px; border-radius:50%;'></i></div>
			<div style='font-size:25px; font-style:italic; font-weight:bold; margin-top:5px;'>Quite awesome!!!</div>
			<div style='padding:20px; border-radius:10px; font-style:italic; text-align:justify;'>
				You have successfuly saved <strong style='color:#2166f3;'>".ucfirst($heading)."</strong> solscript in the Glit directory of your download folder!
			</div>
		</div>
		</div>";


} 
