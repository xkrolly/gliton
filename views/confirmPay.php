<?php

$usersContr = new usersContr();
$usersView = new usersView();

/*
$lecture:qid = $usersView->decryptor0($_GET['lectureid']);
$lectureid = str_replace(' ', '+', $lectureid);
$lectureID_enc_cons = $usersView->enc_cons($lectureid);
*/

$lectureID_enc_cons = str_replace(' ', '+', $_GET['lectureid']);
$data = $usersView->select('classes', ' WHERE lecture_id = ?', $lectureID_enc_cons);
$amount = $data[0]['lecture_fee'];
$class_date_enc = $usersView->enc_cons($data[0]['class_date']);
//$transactionId = $_GET['transaction_id'];

$lectureID = $usersView->dec_cons($lectureID_enc_cons);
$lectureID_arr = explode('_', $lectureID);
$tutor = $lectureID_arr[0];
$cat = $lectureID_arr[1];

$usersView->share_ClassPayment('0', $tutor, $lectureID_enc_cons, $cat);
$currency = 'NGN'; 
$redirectURL = "index.php?page=groupchat&lectureid=".$lectureID_enc_cons."&date=".$class_date_enc;
header('Location: '.$redirectURL);
//$usersView->confirmPay($transactionId, $amount, $currency, $redirectURL);