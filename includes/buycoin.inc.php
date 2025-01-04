<?php
  
  include('autoloader.inc.php');
  $usersContr = new usersContr();
  $usersView = new usersView();

  $amount = $_POST['amount'] * 1000;
  $_SESSION['coin'] = 'YES';
$usersView->buyCoin($amount);
