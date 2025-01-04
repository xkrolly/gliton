<?php

$usersView = new usersView();
$usersContr = new usersContr();
$_SESSION['categoryPassAtChat'] = TRUE;

if(isset($_GET['more'])){
	$_bal = $usersView->dec_cons($_GET['more']);
	$_ncat = $usersView->dec_cons($_GET['ncat']);
	$oldcat = "<i style='font-family:serif; font-weight:bold;'>".$_GET['old']."</i>";
	$newcat = "<i style='font-family:serif; font-weight:bold;'>".$_GET['new']."</i>";
	
	$que = 'I want to as question on '.$_GET['new'];
	$categPass = $usersView->enc_cons('TRUE');
	$bal = intval($_bal);

	$toPay = $bal * -1;

	$bal < 0 ? $resp = "To switch from $oldcat to $newcat, you will need to pay #".$toPay." to be able to continue." : ($bal == 0 ? $resp = "To switch topic of consultation, $oldcat charges is equivalent to $newcat charges, do you want to proceed with $newcat or cancel?" : $resp = "Switching from $oldcat to $newcat will grant you a balance of #".$bal.". You want to proceed?" ); 

	return "<div style='display:flex; height:100vh; width:100vw; justify-content:center; align-items:center;'>
				<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
				<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid red; align-items:center; justify-content:center;'><i class='fa fa-times' style='color:red; font-size:30px;'></i></div>
				<h3>Hoops!</h3>
					<p style='font-family:serif;'>
					$resp
					</p>
					<div style='display:flex; justify-content:center;'>
						<div><a href='enquiry'>cancel</a></div>
								<div style='height:15px; width:1px; background:#000; margin-left:20px; margin-right:20px;'>
								</div>
						<div>
							<form action='tutor' method='post' style='display:inline;'>
					 			<button style='border:0; background:none; color:#2166f3; padding:0;'>proceed</button>
								 <input type='hidden' name='category' value='$_ncat'>
								 <input type='hidden' name='que' value='$que'>
								 <input type='hidden' name='categoryPass' value='$categPass'>
								 <input type='hidden' name='pub' value=''>
					 		</form>
					 	</div>
					</div>
				</div>
			</div>";
}