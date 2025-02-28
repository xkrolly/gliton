<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();
   
   $user = $usersView->fetchUser();
     
if(isset($_POST['appofix'])){
    $cat = $_POST['cat'];
    $_cat = '_'.$cat.'_';

    $client = $user[0]['profile_id'];


    $str = explode('_', $_POST['appofix']);
    $tutor = $str[1]; $_appo = $str[0];
    $new_appo = '';
    if(strpos($_appo, 'pm') ){
     $a_ppo = str_replace('pm', '', $_appo);
     $dayOfWeek = substr($a_ppo, 0, 1);
     $_time = substr($a_ppo, 1, 2);
     $to24hr = intval($_time) + 12; 
     $new_appo .= $dayOfWeek.$to24hr;
    }else{
      $a_ppo = str_replace('am', '', $_appo);
     $dayOfWeek = substr($a_ppo, 0, 1);
     $_time = substr($a_ppo, 1, 2);
     strlen($a_ppo) < 3 ? $fixedDate = $dayOfWeek.'0'.$_time : $fixedDate = $dayOfWeek.$_time;
     
      $new_appo .= intval($fixedDate);
    }


     $valu = $tutor.", %_".$new_appo."_%"; 
    $data = $usersView->select('appointment', ' WHERE profile_id = ? AND freetime LIKE ?', $valu);

    if(count($data) > 0){
        $prev_appo = $data[0]['fixedtime'];
        $xpt_freetime = $data[0]['freetime'];
        
        $xpt_freetime_new = str_replace('_'.$new_appo, '', $xpt_freetime);
        $user = $usersView->fetchUser();
        $uid = $user[0]['profile_id'];
        !empty($prev_appo) ? $appo = $prev_appo.$new_appo.'.'.$uid.'.'.$cat.'_' : $appo = '_'.$new_appo.'.'.$uid.'.'.$cat.'_'; 
        
        $vals = $appo.', '.$xpt_freetime_new.', '.$tutor;

        
        //pay coin for this
        
        $tutorData = $usersView->fetchProfile($tutor) ;       
        $trxnAmnt = $tutorData[0]['cFee'] * 1000;
        $trxnType = 'coin4value'; 
        $clientOrBuyer = $uid;
        $redirectURL='';
        $xpertConsultFee = $tutorData[0]['cFee'];
        //pay charges in Glitcoin b4 setting appointment
        $lockedCode = $usersView->enc_cons($tutor."-".$cat."-".$new_appo."-".$xpertConsultFee);
        $usersView->lockClientFeeForFutureTrnx($xpertConsultFee, $lockedCode, $clientOrBuyer);
        
        //LOCKED AMOUNT SHD NOT BE REMOVED UNTILL AFTER CONSULT SESSION ENDS, So BELOW LINE IS INVALID
        //$usersView->coin_TRNX($trxnAmnt, $trxnType, $clientOrBuyer, $redirectURL);

        $usersContr->update('appointment', 'fixedtime = ?, freetime = ? WHERE profile_id = ?', $vals);

        $appoStartDate = 44;

        $weekDay = $_POST['appofix'][0];
        $dayTime = str_replace($weekDay, '', $_appo);
        $dayName = '';
        switch ($weekDay) {
            case 1:
                $dayName .= 'Sunday';
                break;
            case 2:
                $dayName .= 'Monday';
                break;
            case 3:
                $dayName .= 'Tuesday';
                break;
            case 4:
                $dayName .= 'Wednesday';
                break;
            case 5:
                $dayName .= 'Thursday';
                break;
            case 6:
                $dayName .= 'Friday';
                break;
            case 7:
                $dayName .= 'Saturday';
                break;
            
        }

        date_default_timezone_set('Africa/Lagos');

        date('w') + 1 == intval($weekDay) && date('i') < 38 ? $nextDayName = strtotime('today') : $nextDayName = strtotime('next '.$dayName);
 
        strpos($dayTime, 'pm') ? $add = 12 : $add = 0;
        $dayTime = intval($add) + intval(substr($dayTime, 0, -2));
        $dayof = date('Y-m-d', $nextDayName);
        $consultTime = $dayof.' '.$dayTime.':00:00';
        
    //check if appo to be fixed is sameDay, less 25mins past & within current HR 
          date('w') + 1 == intval($weekDay) && date('i') < 38 && date('H') == $dayTime ? $initMinsPast = date('i') : $initMinsPast = '00';
          $endMinsPast = intval($initMinsPast) + 30;

        $appoStartDate  = $dayof.' '.$dayTime.':'.$initMinsPast.':00';
        $appoEndDate = $dayof.' '.$dayTime.':'.$endMinsPast.':00';
        $resp='';
        if(date('w') + 1 == intval($weekDay) && date('i') > 38 && date('H') == $dayTime){ 
           $resp .='3';
        }
        else{

           $usersView->manageConsultSession($tutor, $client, strtotime($appoStartDate), strtotime($appoEndDate), $xpertConsultFee);
           $resp .= '1';
        }

        $ins_val = array('sender_id'=>$uid, 'cat_id'=>$_cat, 'mtype'=>'1', 'target_id'=>$tutor, 'msg'=> $new_appo);
        $usersContr->insert('xnote', $ins_val);

        echo json_encode(array("resp"=> $resp, "appo"=> $_appo));
    }else{
        echo json_encode(array("resp"=> "2", "appo"=> $_appo));
       }
}
