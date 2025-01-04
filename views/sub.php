<?php
$usersContr = new usersContr();
$usersView = new usersView();
$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$_checkMarkDues = $userData[0]['checkMark_dues'];
//var_dump(time().'   '.$usersView->dec_cons($_checkMarkDues));
$checkDate = '';
$checkMarkDues = '';
if(strlen($checkMarkDues) > 2 ){
$checkMarkDues .= $usersView->dec_cons($_checkMarkDues);
$checkDate_arr = explode('/', $checkMarkDues);

$checkDate .= intval($checkDate_arr[1]);
}
	//.$aoid.'.'.$now.'<'.$checkDate);

$now = time();
//var_dump($checkMarkDues.'===>=== '.$now);

$aoi = $usersView->select('aoi', ' WHERE aoi_id > ? ORDER BY aoi_id DESC LIMIT 52', 0);
$ln = count($aoi) - 1;
$sub = "<div style='width:100%; display:flex; align-items:center; justify-content:center;'>";
$sub .= "<div class='enquiry-form'>
			<header style='font-size: 20px; font-weight: 600; border-bottom: 1px solid red; padding-left:10px; padding-bottom:7px;'>Glit Subcription</header>
			<div style='text-align:right; margin-bottom:30px; font-size:11px; margin-right:10px;'>Subscribe to access unlimited solution content</div>
            <form method='post' id='sub_data' style=''> 
            <input type='hidden' name='category' id='category'>
            <input type='hidden' name='selected' id='selected' value='0'>
            
            <div style='display:flex column; align-items:center; justify-content:center; width:100%; padding-bottom:100px;'>
                
                <div class='form-group' style='text-align:center;'>
                <h6 style='font-weight:bold;'>Choose topics</h6>
                	<div style='margin-left:auto; margin-right:auto; align-items:center; justify-content:center; height:40vh; width:100%; background:#fff; border-radius:20px; overflow-y:auto; padding:10px; padding-bottom:10px; font-size:14px;'>";
  $sub .="<div style='display:flex; flex-direction:column; justify-content:center; align-items:center;'><span>";
  while($ln > 0){
		$aoid = $aoi[$ln]['aoi_id'];

		if($aoid == 1 || $aoid == 11 || $aoid == 21 || $aoid == 31 || $aoid == 41 || $aoid == 51 || $aoid == 61 || $aoid == 71 || $aoid == 81 || $aoid == 91 || $aoid == 101 || $aoid == 111 || $aoid == 121){
			$sub.="<br><br><h6 style='text-align:left; font-weight:bold; color:#2166f3;'>".ucfirst($aoi[$ln]['category'])."</h6>";
		}
strpos($checkMarkDues, '.'.$aoid.'.') && $now < $checkDate ? $disabled = 'disabled' : $disabled='';
strpos($checkMarkDues, '.'.$aoid.'.') && $now < $checkDate ? $subscribe = '' : $subscribe = "onclick='subscribe($aoid)'";
strpos($checkMarkDues, '.'.$aoid.'.') && $now < $checkDate ? $color = '#ccc' : $color = '#000';
if(strpos($checkMarkDues, '.'.$aoid.'.') && $now > $checkDate){
		$subscription = '-.'.$aoid.'./'.$checkDate;
	$check_arr = explode('-', $checkMarkDues);
	foreach($check_arr as $check){
		//strlen($check) > 15 ? var_dump('YES: ') : var_dump('NO: ');
		strlen($check) > 15 ? $checkMarkDues = str_replace('.'.$aoid.'.', '.', $checkMarkDues) : $checkMarkDues;
		$usersView->removeExpiredSub($checkMarkDues, $aoid, $checkDate, $me);
	}
}
!empty($aoi[$ln]['subcategory']) ? 
$sub .="<div style='display:flex; justify-content:flex-left;'><div style='border:0; background:#fff; padding:0; color:$color' id='a$aoid' $subscribe><input $disabled id='c$aoid' type='checkbox'><span style='margin-left:10px;'>".$aoi[$ln]['subcategory']."</span></div></div>" : "";

  $ln--;
  }
  $sub .="  </span></div>";

  $sub.="</div>
                </div>
                <div class='form-group' style='width:100%; margin-left:auto; margin-right:auto; font-size:12px; margin-top:40px; text-align:center;'>
					<h6 style='font-weight:bold;'>Choose a plan</h6>
					<div style='display:flex; padding:10px 20px 5px 20px;'>
						
						<div style='margin-right:auto; display:flex; flex-direction:column; align-items:center; justify-content:center;'>
							<label class='hover' onclick='sumUp(1000);' style='background:#fff; padding:5px 20px 5px 20px; border-radius:10px; border:1px solid #ccc;'>
								<span style='font-weight:bold; font-size:15px; color:#2166f3; font-family:serif;'>Basic</span>
								<div style='margin:10px;'><input type='radio' class='plan' name='dur' value='1' style='height:17px; width:17px;'></div>
								<div style='font-size:12px; font-style:italic;'>#1,000</div>
							</label>
						</div>
						<div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>
							<label class='hover' onclick='sumUp(3000);' style='background:#fff; padding:5px 20px 5px 20px; border-radius:10px; border:1px solid #ccc;'>
								<span style='font-weight:bold; font-size:15px; color:gold; font-family:serif;'>Deluxe</span>
								<div style='margin:10px;'><input type='radio' name='dur' class='plan' value='2' style='height:17px; width:17px;'></div>
								<div style='font-size:12px; font-style:italic;'>#3,000</div>
							</label>
						</div>
						<div style='margin-left:auto; display:flex; flex-direction:column; align-items:center; justify-content:center;'>
							<label class='hover' onclick='sumUp(5000);' style='background:#fff; padding:5px 10px 5px 10px; border-radius:10px; border:1px solid #ccc;'>
								<span style='font-weight:bold; font-size:15px; color:#00ff00; font-family:serif;'>Premium</span>
								<div style='margin:10px;'><input type='radio' name='dur' value='3' class='plan' style='height:17px; width:17px;'></div>
								<div style='font-size:12px; font-style:italic;'>#5,000</div>
							</label>
						</div>
					</div>                  
                </div>
                    <div style='display:flex; justify-content:center; align-items:center; margin-bottom:0px; font-size:10px; font-style:italic;'><span id='planDesc'></span></div>
                <div style='text-align:center; font-family:serif; font-weight:bold; color:red; margin-top:20px;'>Total: #<span id='total'>0</span></div>
                    <div style='display:flex; justify-content:center; align-items:center; margin-bottom:5px;'><span id='sub_resp'></span></div>

                <div class='form-group'>
                	<div class='col-sm-12' style='margin-top:20px; text-align:center;'>
                	<script src='https://checkout.flutterwave.com/v3.js'></script>
					
                			<button type='submit' name='subscribe' class='col-sm-12 btn btn-default theme' id='post_sub' style='filter:drop-shadow(-1px 1px 1px #aaa); padding:8px 15px 8px 15px; font-size:16px; width:50%; border:2px solid #2186f3; border-radius:30px;'>Subscribe</button>
                    </div>
                </div>
             </div>
           </form>
";
$sub.="</div></div>";
return $sub;