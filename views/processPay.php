<?php

include('../includes/autoloader.inc.php');
	$usersView = new usersView();

//    $pay_code = $usersView->encryptor0($_cat.'__'.$amount.'__'.$redirectURL.'__'.$payfor.'__'.$productID);
$pay_code = str_replace(' ', '+', $_GET['payCode']);
    $_payCode = $usersView->dec_con0($pay_code);
var_dump($_payCode);
    $payCodeArray = explode($_payCode, '__');
    
    $cat = $payCodeArray[0];
    $amount = $payCodeArray[1];
    $redirectURL = $payCodeArray[2];
    $payfor = $payCodeArray[3];
    $productID = $payCodeArray[4];
    $usersView->pay_now($cat, $amount, $redirectURL, $payfor, $productID);

    