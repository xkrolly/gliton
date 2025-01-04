<?php

include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();

  
//capture img for storage
  $img_input=$_FILES['img_data']['tmp_name'];
  $cat = $_POST['cat'];
//  $imgName = $_POST['mediaProof'];
  $imgName = mt_rand(1000, 9999).$uid.time().$cat;
 
  $cat_arr = $usersView->aoi($cat);
  $folder = $cat_arr['folder'];
  move_uploaded_file($img_input, '../img/'.$folder.'/'.$imgName.'.webp');

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$vals = $imgName.', '.$me;
$usersContr->update('profile', 'save_que = ?  WHERE profile_id = ?', $vals);
  
 