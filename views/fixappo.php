<?php
include_once 'includes/autoloader.inc.php';

$usersContr = new usersContr();
$usersView = new usersView();
//fixappo
$qcat ='';
$que = '';
$categPass = $usersView->enc_cons('TRUE');
if(isset($_GET['rid'])){
    $_rid = $_GET['rid'];
    $qcat .= $_GET['qid'];
    $que .= $_GET['q'];

    $rid = $usersView->dec_cons($_rid);
    $vals = array('profile_id'=>$rid);
    $rData = $usersView->select('appointment', ' WHERE profile_id = ?', $rid);
    $freetime2 = $rData[0]['freetime'];

    $freetime1 = explode('_', $freetime2);
   $pid = $usersView->fetchProfile($rid);
    $fn = $pid[0]['firstname'];
    $ln = $pid[0]['lastname'];
   
    $fullname = ucfirst($usersView->decryptor0($fn)).' '.ucfirst($usersView->decryptor0($ln));
    $freetime = array();
    foreach($freetime1 as $free){
        
        if(strlen($free) == 2){
            $char1 = substr($free, 0, 1);
            $char2 = substr($free, 1, 1);
            $free = $char1.'0'.$char2;
            $free = intval($free);
            $freetime[] = $free;
        }
        elseif(strlen($free) > 2){
            $freetime[] = intval($free);
        }
    }
    
    rsort($freetime);
 
    $output="";
    
            $sunday = array();
            $monday = array();
            $tuesday = array();
            $wednesday = array();
            $thursday = array();
            $friday = array();
            $saturday = array();

    foreach($freetime as $time){
        if(!empty($time)){
            $period = substr($time, 1, 2);
            $meriTime='';

            if($period > 11){
                $period = $period - 12;
                $period== 0 ? $meriTime .='noon' : $meriTime .= $period.'pm';
            }else{ 
            $period > 9 ? $period = substr($period, 0, 2) : $period = substr($period, 1, 1);
            
                $meriTime .= $period.'am';
                ////
            }

            switch(true){
                case substr($time, 0, 1) == '1':
                   $sunday[] = $meriTime;
                   break;
                case substr($time, 0, 1) == '2':
                   $monday[] = $meriTime;
                  break;
                case substr($time, 0, 1) == '3':
                 $tuesday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '4':
                 $wednesday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '5':
                 $thursday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '6':
                 $friday[] = $meriTime;
                 break;
                case substr($time, 0, 1) == '7':
                 $saturday[] = $meriTime;
                 break;
            
            }

        }
    }

    date_default_timezone_set('Africa/Lagos');

    $today = intval(date('w', time())) + 1;
     $_currHr = str_replace(' ', '', date('h A'));
    $currHr = strtolower(ltrim($_currHr, '0'));

    $weekDay = 1;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";

    $S = count($sunday)-1;
    $S >= 0 ? $sun = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Sun </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $sun='';
    while($S >= 0){

     $today == $weekDay && $sunday[$S] == $currHr && date('i') > 38 ? $sun .="" : $sun .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo1$sunday[$S]' onClick='fixappo(\"1$sunday[$S]_$rid\", $qcat, \"\");'>".$sunday[$S]."</button>";
    
        $S--;
    }
    count($sunday) > 0 ? $sun .="</div></div>" : '';

    $weekDay = 2;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $M = count($monday)-1;
    $M >= 0 ? $mon = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Mon </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $mon ='';
    while($M >= 0){
        
     $today == $weekDay && $monday[$M] == $currHr && date('i') > 38 ? $mon .="" : $mon .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo2$monday[$M]' onClick='fixappo(\"2$monday[$M]_$rid\", $qcat, \"\");'>".$monday[$M]."</button>";
    
        $M--;
    }
    count($monday) > 0 ? $mon .="</div></div>" : '';

    $weekDay = 3;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $T = count($tuesday) - 1;
    $T >= 0 ? $tue = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Tue </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $tue = '';
    while($T >= 0){
        
     $today == $weekDay && $tuesday[$T] == $currHr && date('i') > 38 ? $tue .="" : $tue .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo3$tuesday[$T]' onClick='fixappo(\"3$tuesday[$T]_$rid\", $qcat, \"\");'>".$tuesday[$T]."</button>";
    
        $T--;
    }
    count($tuesday) > 0 ? $tue .="</div></div>" : '';

    $weekDay = 4;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $W = count($wednesday)-1;
    $W >= 0 ? $wed = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Wed </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $wed='';
    while($W >= 0){
        
     $today == $weekDay && $wednesday[$W] == $currHr && date('i') > 38 ? $wed .="" : $wed .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo4$wednesday[$W]' onClick='fixappo(\"4$wednesday[$W]_$rid\", $qcat, \"\");'>".$wednesday[$W]."</button>";
    
        $W--;
    }
    count($wednesday) > 0 ? $wed .="</div></div>" : '';

    $weekDay = 5;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $t = count($thursday) -1;
    $t >= 0 ? $thu = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Thu </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $thu= '';

    while($t >= 0){
        
     $today == $weekDay && $thursday[$t] == $currHr && date('i') > 38 ? $thu .="" : $thu .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo5$thursday[$t]' onClick='fixappo(\"5$thursday[$t]_$rid\", $qcat, \"\");'>".$thursday[$t]."</button>";
    
        $t--;
    }

    count($thursday) > 0 ? $thu .="</div></div>" : '';

    $weekDay = 6;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $F = count($friday)-1;
    $F >= 0 ? $fri = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Fri </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $fri= '';
    while($F >= 0){
     $today == $weekDay && $friday[$F] == $currHr && date('i') > 38 ? $fri .="" : $fri .= "<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo6$friday[$F]' onClick='fixappo(\"6$friday[$F]_$rid\", $qcat, \"\");'>".$friday[$F]."</button>";
    
        $F--;
    }
    count($friday) > 0 ? $fri .="</div></div>" : '';

    $weekDay = 7;
    $today == $weekDay ? $dayCss = "color:red; font-weight:bold;" : $dayCss = "";
    $s = count($saturday) - 1;
    $s >= 0 ? $sat = "<div style='display:flex; width:100%; margin-bottom:15px;'><div style='font-size:16px; align-self:flex-start; justify-content:flex-start; width:15%; $dayCss'>Sat </div><div style='display:flex; flex-wrap:wrap; width:85%;'>" : $sat = '';

    while($s >= 0){

     $today == $weekDay && $saturday[$s] == $currHr && date('i') > 38 ? $sat .="" : $sat .="<button class='hover' style='font-size:12px; border-radius:4px; padding:3px; margin:3px;' id='appo7$saturday[$s]' onClick='fixappo(\"7$saturday[$s]_$rid\", $qcat, \"\");'>".$saturday[$s]."</button>";
    
        $s--;
    }
        count($saturday) > 0 ? $sat .="</div></div>" : '';

    $output .="<div style='display:flex; flex-direction:column; align-items:center; padding:40px 20px 20px 20px; background:#fff; min-height:99vh;'><h5 style='font-size:14px; background:#2166f3; color:#fff; padding:5px; border-radius:4px;'>Fix appointment with ".$fullname."</h5><h6 style='margin:5px auto 20px auto; font-size:13px;'>Select from their free time below</h6><p style='color:red; font-style:italic; font-family:serif; font-size:10px; margin-top:-20px;'>Note: Each appointment last 30mins max.</p>";
   $output .= "<div style='text-align:center;' class='chatInput'>".$sun.$mon.$tue.$wed.$thu.$fri.$sat."</div>";
   
    $output .="    <div style='position:fixed; bottom:2px; width:100%; background:#fff; padding:5px;'>
                        <form action='tutor' method='post' style='display:inline; width:100%;'>
                            <button class='theme' style='font-size:14px; width:100%;'>Proceed</button>
                            <input type='hidden' name='category' value='$qcat'>
                            <input type='hidden' name='que' value='$que'>
                            <input type='hidden' name='categoryPass' value='$categPass'>
                            <input type='hidden' name='pub' value=''>
                        </form>
                    </div>";

    $output .="<div style='display: flex; position:fixed; bottom:15%; justify-content: center; width:100%;' onClick='$(\"#apporesp\").hide();'><span id='apporesp' style='display:none; background:skyblue; color:blue; padding:3px; border-radius:5px; font-size:12px;'></span></div>
						</div>";

    return $output;
}
