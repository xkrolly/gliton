<?php
include('autoloader.inc.php');

	$usersContr = new usersContr();
	$usersView = new usersView();

if(isset($_POST['reset'])){
    $prk = $_POST['prk'];
    $pbk = $_POST['pbk'];
    $me = $_POST['me'];
    $newPwd = $_POST['pwd'];
    
    
    ///update encPrvK n pubK on db
    $pw=password_hash($newPwd, PASSWORD_DEFAULT);
    $vals = $pbk.', '.$pw.', '.$me;

    $usersContr->update('skyman_user', 'pub = ?, password = ? WHERE user_id = ?', $vals);
	
    $valu = $prk.', '.$me;
    $usersContr->update2('prevkey', 'prevPK = ? WHERE uid = ?', $valu);
    
    echo "<div style='width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; font-size:25px;'><span style='color:green; background:#00ff00; padding:20px;'>Password successfully changed.</span><br><a href='../index.php' style='text-decoration:none;'>&lt;&lt; Back</a></div>";
}
