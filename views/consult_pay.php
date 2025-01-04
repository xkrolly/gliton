<?php

include('../includes/autoloader.inc.php');
	$usersView = new usersView();

    $cat = $_GET['cat'];
    $amount = 5000;
    $redirectURL = 'glit.ng/index.php';
    $payfor = 'session';
    $productID = '0';
    $usersView->pay_now($cat, $amount, $redirectURL, $payfor, $productID);

    