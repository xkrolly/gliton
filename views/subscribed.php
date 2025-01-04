<?php

//include('includes/autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

isset($_GET['link']) ? $link = $_GET['link'] : header('Location: index');
$_link = str_replace(' ', '+', $link);
$link_dec = $usersView->dec_cons($_link);

$myData = $usersView->fetchUser();
$me = $myData[0]['profile_id'];
$varr = explode(', ', $link_dec);

$_cats = $_GET['sublink'];
$cats = $usersView->dec_cons($_cats);

$usersView->msgUser('0', $me, '7', $cats, '');

$all_cats = explode('_', trim($cats));
foreach ($all_cats as $cat) {
	!empty($cat) ? var_dump($cat) : '';
	//share sub payment
	$admin = 0; $tutor = ''; $client = $me;
	!empty($cat) ? $usersView->share_SubPayment($admin, $tutor, $client, $cat) : '';
}

/*$cat_arr = explode('_', $cats);
$cat = array_slice($cat_arr, 1, -1, true);*/

$usersContr->update('profile', 'purchasedSession = ?, checkMark_dues = ? WHERE profile_id = ?', $link_dec);

//header('Location: enquiry');
return "<div style='display:flex; width:100%; height:100vh; justify-content:center; align-items:center;'>
			<div style='color:#2166f3; padding:20px; font-size:14px; text-align:center; border-radius:10px; border:1px solid #ccc;'>Your subscription is successful</div></div>";