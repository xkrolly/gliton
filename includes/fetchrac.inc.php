<?php

include('autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();

$allUserInfo = $usersView->select('rac', ' WHERE rac_id !=?', 0);

$list = '';
$x = count($allUserInfo)-1;

while($x>=0){
	$list .= "<div style='margin-left:10px;'>".$usersView->decryptor0($allUserInfo[$x]['contact'])." - ".$usersView->decryptor0($allUserInfo[$x]['code'])."</div>";	
$x--;
}
echo $list;