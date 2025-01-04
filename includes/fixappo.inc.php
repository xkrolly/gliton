<?php

include('autoloader.inc.php');
	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['appofix'])){
    $cat = $_POST['cat'];
    $_cat = '_'.$cat.'_';

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

        //pay charges in Glitcoin b4 setting appointment
        $usersView->coin_TRNX($trxnAmnt, $trxnType, $buyer, $redirectURL);
	    
        $usersContr->update('appointment', 'fixedtime = ?, freetime = ? WHERE profile_id = ?', $vals);
        
        //pay coin for this
        
        $tutorData = $usersView->fetchProfile($tutor);
        
        $trxnAmnt = $tutorData[0]['cFee'] * 1000;
        $trxnType = 'coin4value'; 
        $buyer = $uid;
        $redirectURL='';
        
        $ins_val = array('sender_id'=>$uid, 'cat_id'=>$_cat, 'mtype'=>'1', 'target_id'=>$tutor, 'msg'=> $new_appo);
        $usersContr->insert('xnote', $ins_val);

        echo json_encode(array("resp"=> "1", "appo"=> $_appo));
    }else{
        echo json_encode(array("resp"=> "2", "appo"=> $_appo));
       }
}