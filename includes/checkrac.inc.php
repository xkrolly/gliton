<?php
include('autoloader.inc.php');

$usersView = new usersView();

$formUsed = $_POST['form'];
$num = $usersView->mobile4mat('234', $_POST['num'], 10);
$enc0_userMobile = $usersView->encryptor0($num);
$dec0_userMobile = $usersView->decryptor0($enc0_userMobile);

$userInfo = $usersView->select('rac', ' WHERE rac_id > ?', 0);
$tryingREG = '';
$n = count($userInfo) - 1;

while($n >= 0){
	if($num == $usersView->decryptor0($userInfo[$n]['contact'])){
	  $tryingREG = 1;
	  $otp = $usersView->decryptor0($userInfo[$n]['code']);
	  echo json_encode(array("code"=>$otp, "output"=>$tryingREG, "mobile"=>$num, "fm"=>$formUsed));
	}
 $n--;
}
