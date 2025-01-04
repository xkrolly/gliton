<?php

$usersContr = new usersContr();
$usersView = new usersView();

$aoi = $usersView->select('aoi', ' WHERE aoi_id > ? ORDER BY aoi_id DESC LIMIT 52', 0);
$ln = count($aoi) - 1;

$sub ="<div class='enquiry-form' style='padding-bottom:100px; display:flex; flex-direction:column; justify-content:center; align-items:center; min-height:100vh;'>
		<form method='post' id='createClassData'>
		<h6>select category</h6><div style='display:flex; justify-content:flex-left; height:150px; overflow-y:auto; font-size:12px; padding:30px; background:#eee; border-radius:20px; width:80%; margin-bottom:20px;'>";
  while($ln > 0){
			$aoid = $aoi[$ln]['aoi_id'];

			if($aoid == 1 || $aoid == 11 || $aoid == 21 || $aoid == 31 || $aoid == 41 || $aoid == 51 || $aoid == 61 || $aoid == 71 || $aoid == 81 || $aoid == 91 || $aoid == 101 || $aoid == 111 || $aoid == 121){
				$sub.="<br><span><h6 style='text-align:left; font-weight:bold; color:#2166f3;'>".ucfirst($aoi[$ln]['category'])."</h6>";
			}

			!empty($aoi[$ln]['subcategory']) ? 
				$sub .="<div style='display:flex; justify-content:flex-left; align-items:center;'><span><input type='radio' name='topic' value='".$aoid."' id='".$aoid."'></span><label for='".$aoid."' style='margin-left:10px;'>".$aoi[$ln]['subcategory']."</label></div>" : "";

   $ln--;
  }

  $sub .="  </span></div>";
$sub.="   <div class='form-group'>
                  <div class='col-sm-12'>
 										<label for='topic' style='font-size:14px;'>Lecture Topic & Fee</label>
 									</div>         
                  <div class='col-sm-12' style='width:100%;'>
                  	<input type='text' id='topic' name='topic-desc' placeholder='Topic to discuss...'/>
                    <input type='number' id='lecturefee' name='lecturefee' min='0' max='5000' placeholder='Fee \"#\"'/>
                  </div>
          </div>
          <div class='form-group'>
                  <div class='col-sm-12'>
 										<label for='date' style='font-size:14px;'>Lecture Date & Time</label>
 									</div>         
                  <div class='col-sm-12'>
                  	<input type='date' name='date' id='date' />
               	  	<input type='time' name='time' id='time' />
                   </div>
          </div>
          	<div class='form-group'>
                <div class='col-sm-12'>
            			<button style='border-radius:10px; font-size:12px;' class='theme'>Create class</button>
                </div>
            </div>
       <div style='width:100%; display:flex; justify-content:center; align-items:center;'><div id='class_response' style='width:80%; padding:10px;'></div></div>
          </form>
          </div>";

return $sub;
