<?php

include('autoloader.inc.php');
$login='';
$href='';

$usersView = new usersView();
$usersContr = new usersContr();
$prv = '';
$encP = '';
$me = '';
    
if(isset($_POST['uname']) && isset($_POST['pwd'])){
    $_uname=strtolower($_POST['uname']);
    $uname=trim($_uname);
    
    $pwd=trim($_POST['pwd']);
    $lat_login = $usersView->sanitise($_POST['latd']);
    $lng_login = $usersView->sanitise($_POST['lngd']);
   
   isset($_POST['eternity']) ? $dur=$_POST['eternity'] : $dur=0;
    $_SESSION['eternity'] = $dur;

        if(!empty($uname) && !empty($pwd)){
            strlen($uname) > 10 ? $contact = '234'.substr($uname, -10) : $contact=$uname;
            $uname_contact=$uname.', '.$contact;

            $u_name = $usersView->encryptor0($uname);
            $_contact = $usersView->encryptor0($contact);
            //use this for encrypted data
            $uname_streamlined = substr($u_name, 20, -14);
            $contact_streamlined = substr($_contact, 20, -14);

            //$_uname_contact = '%'.$uname_streamlined.'%, %'.
            //%'.$uname_streamlined.'%, 
            $_uname_contact = '%'.$uname_streamlined.'%, %'.$contact_streamlined.'%';

            $contact_streamlined = '%'.$contact_streamlined.'%';
            $userData=$usersView->select('skyman_user', ' WHERE username LIKE ? OR username LIKE ?', $_uname_contact);

    
     $userPro = $usersView->select('profile', ' WHERE contact LIKE ?', $contact_streamlined);
    
    if(count($userData)>0 || count($userPro)>0){
                
            if(password_verify($pwd, $userData[0]['password'])){
                   
               if($userData[0]['ban']==0){
                     $pid = $userData[0]['user_id'];
                     $me .= $pid;
                     $_SESSION['user_id'] = session_id().sha1($uname);
                
                    $cookie_name = "eternity";
                    $cookie_value = $_SESSION['eternity'];
                    setcookie($cookie_name, $cookie_value, time() + (864000), "/", "glit.store", true, true);

                    $cookie_name = "uid";
                    $cookie_value = $_SESSION['user_id'];
                    setcookie($cookie_name, $cookie_value, time() + (864000), "/", "glit.store", true, true);
  
                    !empty($lat_login) ? $_SESSION['loadNewsFeed'] = true : $_SESSION['loadNewsFeed']=false;
//                     New insertion
                    $_SESSION['geoloc_switch_query']=0;
                    $_SESSION['lat'] = $lat_login;
                    
                    /*$userLoginData=$usersView->select('skyman_user', ' WHERE session = ?', $_SESSION['user_id']);*/
                    
                    $userData2=$usersView->select('profile', ' WHERE profile_id = ?', $pid);
                    $regCompleted='';

        if(!empty($userData2[0]['lastname']) && !empty($userData2[0]['firstname']) && !empty($userData2[0]['contact'])){
                        $regCompleted.=1;
                    }else{
                        $regCompleted.=0;     

                    }
                    $vals= '0, '.$regCompleted.', '.$lat_login.', '.$lng_login.', '.$pid;
                    $usersContr->update('profile', 'engaged = ?, regCompleted = ?, lat=?, lng=? WHERE profile_id = ?', $vals);

                  //$usersView->update_Impact($pid, 0);


//                    $session=session_id();
    
                    $ip = $usersView->getIP();
                    $vals2= $_SESSION["user_id"].', 1, '.$dur.', '.$ip.', '.$userData[0]['user_id'];
                    $usersContr->update('skyman_user', 'session = ?, online = ?, eternity=?, ip=? WHERE user_id = ?', $vals2);
                    $href.='login';
    
               }
                else{
              

                $login.="Sorry, No access for you! Your Glit account has been banned due to violation of our policies.";
                }
            }
            else{
              

                $login.="Sorry! you must enter a valid username and password to log in.";
            }
           }
         else{
               $login.="Sorry! you need a valid username and password to log in.";
          

            }
        }
        else{
            $login.='Sorry! You must enter your username and password to log in.';     var_dump('ONE 12');

        }

    
//get prv
    $pkDATA = $usersView->select2('prevkey', ' WHERE uid = ?', $me);
    
//xptORnot?
    $data = $usersView->fetchUser();
    
    $xptornot = $data[0]['xpt'];
    //$xptornot == 1 ? $prv = $pkDATA[0]['prevPK'] : $prv = '';
    $prv = $pkDATA[0]['prevPK'];
    $uname=strtolower($_POST['uname']);
    
        echo json_encode(array('ajaxReply' => $login, 'url' =>$href, 'prv'=>$prv, 'ure'=>$xptornot, 'me'=>$me, 'un'=>$uname, 'pwd'=>$_POST['pwd']));
//    	echo json_encode(array('ajaxReply' => $login, 'url' =>$href));
}