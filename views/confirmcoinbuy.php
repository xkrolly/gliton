<?php
include('../includes/autoloader.inc.php');
  session_start();
  $usersContr = new usersContr();
  $usersView = new usersView();

    $_link = str_replace(' ', '+', $_GET['link']);
    $link = $usersView->dec_cons($_link);
    $linkArray = explode('_', $link);
    $buyer = $linkArray[0];
    $trxnAmnt_inCoin = $linkArray[1];
    $time = strtotime($linkArray[2]);
    $trxnAmntInNaira = intval($trxnAmnt_inCoin) * 1000;
    $newBal = '';
    if($_SESSION['coin'] == 'YES'){
        ///$bal = $usersView->depositCoin($coins, $buyer);
        $trxnType = 'cash4coin';
      //  var_dump('buyer=='.$buyer.' trxn amnt:'.$trxnAmnt_inCoin.'='.$trxnAmntInNaira);
        $bal = $usersView->coin_TRNX($trxnAmntInNaira, $trxnType, $buyer, '');
        $_SESSION['coin'] = 'NO';
        $newBal .=$bal;
        
    }
    
    	return "<div style='display:flex; height:100%; width:100vw; justify-content:center; padding-top:65%;'>
    				<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
        				<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid #0f0; align-items:center; justify-content:center;'>
                			<span class='material-icons' style='color:#0f0; font-size:60px;'>&#xe86c;</span>
                        </div>
        				<h3>Awesome!!! </h3>
    					<div style='font-family:serif;'>
                            <span style='font-style:italic; font-family:serif;'>Your wallet funding of <span style='background:#eee;'>".$trxnAmnt_inCoin."GC</span> is successful. Balance is ".$newBal."</span>
    					<div style='display:flex; justify-content:center; align-items:center; margin:20px auto -8px auto;'>
    						<a href='scrolls' style='font-size:14px;'>Home</a> 
    							<div style='height:15px; width:1px; background:#000; margin-left:20px; margin-right:20px;'></div>
    						<a href='profile' style='font-size:14px;'>View wallet</a>
    					</div>
    				</div>
			    </div>";
