<?php

//include('includes/autoloader.inc.php');

$usersView = new usersView();
$usersContr = new usersContr();
if(isset($_POST['validate'])){
    $n=0;
    $new = array();
    while($n < 20){
        if(isset($_POST['specialty'.$n])){
            $specialty = $_POST['specialty'.$n];
            $new[] = '_'.$specialty;
        }
        $n++;
    }
    $xpt = $_POST['xpt'];
    $myAOI = implode($new).'_';
    $userData = $usersView->fetchUser();
$vals = $myAOI.', '.$xpt.', '.$userData[0]['profile_id'];
    $usersContr->update('profile', 'aoi = ?, xpt = ? WHERE profile_id = ?', $vals);
}

$aoi = $usersView->select('aoi', ' WHERE aoi_id > ? ORDER BY aoi_id DESC LIMIT 52', 0);

$ln = count($aoi) - 1;

$validate= "    <header style='font-size: 16px; font-weight: 600; border-bottom: 1px solid red; padding-bottom:7px; padding-left:10px;'>Professional Check</header>
            <div style='text-align:right; margin-bottom:30px; font-size:11px;'>For exclusive access to professionally private content</div>
            <form method='post' id='vericheck_data'> 
            <input type='hidden' name='category' id='category'>
            <div style='display:flex column; align-items:center; justify-content:center; width:100%; padding-bottom:100px;'>
                
                <div class='form-group' style='text-align:center;'>
                <h6 style='font-weight:bold;'>Choose category</h6>
                    <div style='margin-left:auto; margin-right:auto; align-items:center; justify-content:center; height:40vh; width:70vw; background:#fff; border-radius:20px; filter:drop-shadow(-1px 1px 1px #aaa); overflow-y:auto; padding:10px; padding-bottom:10px; font-size:14px;'>";
  $validate .="<div style='display:flex; flex-direction:column; justify-content:center; align-items:center;'><span>";
  while($ln > 0){
        $aoid = $aoi[$ln]['aoi_id'];
        if($aoid == 1 || $aoid == 11 || $aoid == 21 || $aoid == 31 || $aoid == 41 || $aoid == 51 || $aoid == 61 || $aoid == 71 || $aoid == 81 || $aoid == 91 || $aoid == 101 || $aoid == 111 || $aoid == 121){
            $checkMark = $usersView->veriCheckMark(0, $aoid, 1, '#fff');
            $validate.="<br><br><h6 style='text-align:left; font-weight:bold; color:#2166f3; display:flex; justify-content:center; align-items:center;'>".ucfirst($aoi[$ln]['category'])."&nbsp;&nbsp;$checkMark</h6>";
        }

  !empty($aoi[$ln]['subcategory']) ? $validate .="<div style='display:flex; justify-content:flex-left;'><div id='a$aoid' onclick='addCheckmark($aoid)'><input type='checkbox' id='c$aoid'><span style='margin-left:10px;'>".$aoi[$ln]['subcategory']."</span></div></div>" : "";
  $ln--;
  }
  $validate .="  </span></div>";

  $validate.="</div>
                </div>";


    $validate.="       <br><div class='col-sm-6 center'>
                        <h6 style='font-weight:bold;'>Upload Certificates</h6>
                        <input type='file' name='cert' id='cert' multiple camera class='' value='' style='width:70vw; padding:5px; border:1px solid #999;'>
                        <span id='imgP'></span>
                    </div><br>
                         <div class='col-sm-6 center'><br>
                <button name='validate' class='btn btn-default theme' style='width:50%;'>Apply for Checkmark</button>
                </div>
                <div style='display:flex; justify-content:center; align-items:center; margin: auto 10% auto 10%; padding:10px;'><div id='vericheck_resp'></div>
				</form>";
$validate .="</div></div></div><br><br><br><br><br>";
return $validate;