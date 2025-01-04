<?php
include('autoloader.inc.php');
$usersContr = new usersContr();
$usersView = new usersView();

$category = $_POST['category'];
$cert_tmp_name = $_FILES['cert']['tmp_name'];

$usersView->applyForVerificationMark($category, $cert_tmp_name);
echo json_encode(array("data"=>''));
