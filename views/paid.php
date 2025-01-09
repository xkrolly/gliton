<?php
	$usersContr = new usersContr();
	$usersView = new usersView();

if(!empty($_GET['link'])){
	$link = $_GET['link'];
	$link_dec_arr = explode(', ', $link);
	$buyer = str_replace(' ', '+', $link_dec_arr[0]);
	$productID = str_replace(' ', '+', $link_dec_arr[1]);
	$key = str_replace(' ', '+', $link_dec_arr[2]);
	$_price = str_replace(' ', '+', $link_dec_arr[3]);
	$cat_id = str_replace(' ', '+', $link_dec_arr[4]);
	$price = str_replace(' ', '+', $_price);
	$key = str_replace(' ', '+', $key);
	//$buyer = str_replace(' ', '+', $buyer);
	$_buyer = $usersView->dec_cons($buyer);

    $tx_status = $_GET['status'];
    $tx_ref = $_GET['tx_ref'];
    $tx_id = $_GET['transaction_id'];
    $amount = '50';
    $currency = 'NGN';
   // $outcome = $usersView->verifyFlutterPayment($tx_ref, $amount, $currency);
//    var_dump('successssssssssssssss');
    /*if($outcome['status'] == 'success'){
        $goOn = true;
    }else{
        header('Location: scrolls');
    }*/
   /*....................VERIFY PAYMENT........................
   
    //$usersView->verifyFlutterPayment($tx_status, $tx_ref, $tx_id, $buyer, $productID, $key);
    require("../flutterwavephp/processPayment.php");
/*    $flutterwave = new Flutterwave(
            getenv(pubK),
            getenv(secK),
            getenv(encK)
        );
    $verification = $flutterwave->verifyPayment($_GET['tx_ref']);
    if($verification['status'] == 'success'){
            //payment verified, update db
            $currency='NGN';
            $amount = '50';
            $verifyPayCode = $buyer.'_'.$currency.$amount;

            $valus = $verifyPayCode.', '.$productID.', '.$key.', '.$buyer;
            $this->update('purchase', 'payVerified = ? WHERE product_id = ? AND productKey = ? AND buyer = ?', $valus);
        } else {
            //payment failed, notify user
        }
        
    require("Flutterwave-PHP-v3/library/Transactions.php");
    use Flutterwave\Transactions;
    $history = new Transactions();
    $data = array("id"=>"288200108");
    $verifyTransaction = $history->verifyTransaction($data);
    print_r($verifyTransaction);

..........................................*/

    $buy_er = $usersView->usercode($_buyer);
	$_vals = $productID.', '.$key.', %.'.$buy_er.'.%';
	$_vals2 = $productID.', '.$key;
	$val = array('product_id'=>$productID, 'productKey'=> $key, 'buyer'=>'.'.$buyer.'.');

	//check if the product is previously bought by this user
	$purchData = $usersView->select('purchase', ' WHERE product_id = ? AND productKey = ? AND buyer LIKE ?', $_vals);
	//check if the product has ever been sold
	$purchData2 = $usersView->select('purchase', ' WHERE product_id = ? AND productKey = ?', $_vals2);

	count($purchData2) > 0 ? $newBuyerList = $purchData2[0]['buyer'].$buy_er.'.' : $newBuyerList = $purchData2[0]['buyer']; //which is still d old buyerlist
	$_vals3 = $newBuyerList.', '.$productID;
	count($purchData2) == 0 ? $usersContr->insert('purchase', $val) : (count($purchData) == 0 ? $usersContr->update('purchase', 'buyer = ? WHERE product_id = ?', $_vals3) : '' );

	$buyer = str_replace(' ', '+', $buyer);
	$_buyer = $usersView->dec_cons($buyer);

	$prodData = $usersView->select('publish', ' WHERE published = ?', $productID);
	$heading = $prodData[0]['heading'];
	$chatpop = $prodData[0]['chatpop'];
	$catID = $prodData[0]['topic_id'];

	count($prodData) > 0 && $chatpop == 'd' ? 
	$shrd_data = $usersView->select2('sharedkey', ' WHERE ucid = ?', $key) : '';
	count($prodData) > 0 && $chatpop == 'd' ? 
	$shrdKey = $usersView->dec_cons($shrd_data[0]['sk']) : 
	$shrdKey = $key;
	
	//$_SESSION['product_keyxx'] = $usersView->enc_cons($shrdKey);
	$_SESSION[$key] = $usersView->enc_cons($shrdKey);
	//var_dump($usersView->dec_cons($_SESSION['product_keyxx']));

	$pubid = $usersView->encryptor0($prodData[0]['pub_id']);
	$usersView->msgUser('0', $_buyer, '10', '', $heading, $prodData[0]['pub_id']);
   	$_published = $prodData[0]['published'];
   	$published = $usersView->dec_cons( $_published );

   		//GET PUBLICATION DETAIL
	$_pub = explode('_', $published);
	$tutor = $usersView->encryptor0($_pub[0]);
	$chatpop == 'd' ? $student = $usersView->encryptor0($_pub[1]) : $student = '0'; 
    $chatpop == 'd' ? $conv_id = $usersView->encryptor0($_pub[2]) : $conv_id = $_published;

	///share payment
	$admin = '0'; $amount = $price; $_tutor = $_pub[0]; $client = $_pub[1];
	//for Grpchat, Admin gets the client earning
	$chatpop == 'd' ? $client = $_pub[1] : $client = $admin;
	$chatpop == 'm' ? $cat_id = $_pub[1] : $cat_id;

	if(count($purchData) == 0 ){
		$usersView->share_ProductPayment($admin, $_tutor, $client, $_published, $cat_id);
	}
	$_GET['link'] = '';
	///////////////////////////////////
	return "<div style='display:flex; height:100vh; width:100vw; justify-content:center; padding-top:65%;'>
				<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
				<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid #0f0; align-items:center; justify-content:center;'>
        			<span class='material-icons' style='color:#0f0; font-size:60px;'>&#xe86c;</span>
                </div>
				<h3>Awesome!!! </h3>
							<div style='font-family:serif;'>Your purchase of <span style='font-style:italic; font-family:serif;'>".$heading."</span> 
								<span class='material-icons' style='color:#2166f3; font-size:20px;'>&#xe873;</span>
                <span style='font-style:italic; font-family:serif;'>solscript</span> was successful. You can now freely access it through search and/or scrolls. Thanks.</div>
					<div style='display:flex; justify-content:center; align-items:center; margin:20px auto -8px auto;'>
						<a href='index.php?page=download&catid=$catID&scriptid=$_published&chat=$chatpop' style='font-size:14px;'>Download</a> 
							<div style='height:15px; width:1px; background:#000; margin-left:20px; margin-right:20px;'></div>
						<a href='index.php?page=peepChats&s=$tutor&r=$student&pub=$pubid' style='font-size:14px;'>View</a>
					</div>
										<hr style='margin-top:25px; margin-right:20%; margin-left:20%; height:10px; font-size:25px;'>
					<div style='width:100%; display:flex; justify-content:center; align-items:center; margin-top:5px; font-size:12px;'><a href='index.php?page=trial&pubid=$pubid&catid=$catID' style='color:#fff; padding:10px; margin-right:10px; text-decoration:none; border-radius:10px; background:deepskyblue; border:.5px solid #666;' class='hover'>Trial #1 available - 50% discount</a>".$usersView->learnMore(5, 12)."</div>

				</div>
			</div>";
			/*<a href='index.php?page=peepChats&s=$tutor&r=$student&convid=$conv_id&pubid=$pubid&published=$_published' style='font-size:10px;'>View</a>*/

}
elseif(isset($_GET['tsess'])){
	$total_sess = $_GET['tsess'];
	$_pid = $_GET['id'];
	$cat_id_enc = $_GET['cat'];

	$pid = $usersView->dec_cons($_pid);

	///share session payment
	$admin = 0; $buyer = $pid;
	$usersView->share_SessionPayment($admin, $buyer, $cat_id_enc);
	
	$cat_id = $usersView->dec_cons($cat_id_enc);
	$aoidata = $usersView->select('aoi', ' WHERE aoi_id = ?', $cat_id);
	$topic = $aoidata[0]['subcategory'];

	$vals = $total_sess.', '.$pid;
	$_SESSION['approve_purchase'] == true ? $usersContr->update('profile', 'purchasedSession = ? WHERE profile_id = ?', $vals) : '';
	
	$myData = $usersView->fetchUser();
	$recipient = $myData[0]['profile_id'];

	$_cat_id = '_'.$cat_id.'_';
	$usersView->msgUser('0', $recipient, '8', $_cat_id, '', '');


	$que = 'I want to ask question on '.$topic;
	$categPass = $usersView->enc_cons('TRUE');


	return "<div style='display:flex; height:100vh; width:100vw; justify-content:center; align-items:center;'>
				<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
				<div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid #2166f3; align-items:center; justify-content:center;'>
				<span class='material-icons' style='color:#2166f3; font-size:60px;'>&#xe86c;</span></div>
				<h3>Cheers!!!</h3>
					<p style='font-family:serif;'>You have successfully purchased a session for expert consultation on <span style='font-style:italic;'>".$topic."</span>.</p>
					<div>
						<form action='tutor' method='post' style='display:inline;'>
					 		<button style='border:0; background:none; color:#2166f3; padding:0;'>proceed</button>
							<input type='hidden' name='category' value='$cat_id'>
							<input type='hidden' name='que' value='$que'>
							<input type='hidden' name='categoryPass' value='$categPass'>
							<input type='hidden' name='pub' value=''>
						</form>
					</div>

				</div>
			</div>";
$_SESSION['approve_purchase'] = false;
}else{ header('Location: index'); }