<?php
/*header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
//https://ravemodal-dev.herokuapp.com/v3/hosted/pay");
*/
include('autoloader.inc.php');

$usersContr = new usersContr();
$usersView = new usersView();

$amount = $_GET['amount'];
$redirectURL = $_GET['redirectURL'];
$cat = $_GET['cat'];

$productID = '';
$valueOffered = 'How to start payment for glit';

$usersView->pay_now($cat, $amount, $redirectURL, $valueOffered, $productID){
	
//$usersView->payNow($amount, $redirectURL);
