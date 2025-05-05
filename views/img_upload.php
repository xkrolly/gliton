<?php

include('../includes/autoloader.inc.php');
  $usersView = new usersView();
  $usersContr = new usersContr();

  $cat = $_POST['cat'];
  $imgusage = $_POST['imgusage'];
  if($imgusage == 'productimg1' || $imgusage == 'productimg2'){

    $prdImg = $_FILES['product_img']['tmp_name'];
    $usersView->imguploader3p($cat, $prdImg, $imgusage);
  
  }
  else{

    $img_input=$_FILES['img_data']['tmp_name'];
    $usersView->imguploader($cat, $img_input);
  
  }
