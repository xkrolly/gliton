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

      $buy_er = $usersView->usercode($_buyer);
	$_vals = $productID.', '.$key.', %.'.$buy_er.'.%';
	$_vals2 = $productID.', '.$key;
	$val = array('product_id'=>$productID, 'productKey'=> $key, 'buyer'=>'.'.$buy_er.'.');

	//check if the product is previously bought by this user
	$purchData = $usersView->select('purchase', ' WHERE product_id = ? AND productKey = ? AND buyer LIKE ?', $_vals);
	//check if the product has ever been sold
	$purchData2 = $usersView->select('purchase', ' WHERE product_id = ? AND productKey = ?', $_vals2);

	count($purchData2) > 0 ? $newBuyerList = $purchData2[0]['buyer'].$buy_er.'.' : $newBuyerList = '.'.$buy_er.'.';//$purchData2[0]['buyer']; //which is still d old buyerlist
	$_vals3 = $newBuyerList.', '.$productID;
	count($purchData2) == 0 ? $usersContr->insert('purchase', $val) : (count($purchData) == 0 ? $usersContr->update('purchase', 'buyer = ? WHERE product_id = ?', $_vals3) : '' );

	//$buyer = str_replace(' ', '+', $buyer);
	//$_buyer = $usersView->dec_cons($buyer);

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

//	$pubid = $usersView->encryptor0($prodData[0]['pub_id']);
        $pubid = $usersView->num_AlphaA($prodData[0]['pub_id']);

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
	$myData = $usersView->fetchUser();
	$me = $myData[0]['profile_id'];
//coin balance
    $coinBal = $usersView->coinBalance($me);

	///////////////////////////////////
	return "<div style='display:flex; height:100vh; width:100vw; justify-content:center; padding-top:20%;'>
			<div style='font-size:14px; width:70%; text-align:center; font-family:serif;'>
			   <div style='display:flex; height:50px; width:50px; margin-bottom:20px; margin-left:auto; margin-right:auto; border-radius:50%; border:2px solid #0f0; align-items:center; justify-content:center;'>
        			<span class='material-icons' style='color:#0f0; font-size:60px;'>&#xe86c;</span>
                           </div>
			   <h3>Awesome!!! </h3>
			   <div style='font-size:16px; font-family:serif; margin-top:20px;'>Your purchase of <span style='font-style:italic; text-decoration:underline; font-family:serif;'>".$heading."</span> 
                		<span style='font-style:italic; font-family:serif;'>solscript</span> was successful and your Glitcoin balance is <strong>$coinBal</strong><sup style='font-size:8px;'>GC</sup>. You can now freely access it through search and/or scrolls. Thanks. 
					<div style='display:flex; justify-content:center; align-items:center; margin:30px auto 0 auto;'>
						<a href='index.php?page=download&catid=$catID&scriptid=$_published&chat=$chatpop' style='font-style:italic; color:#fff; background:#2166f3; font-size:16px; padding:10px;'>Download</a> 
						<div style='height:14px; width:1px; background:#000; margin-left:15px; margin-right:15px;'></div>
						<a href='index.php?page=peepChats&s=$tutor&r=$student&pub=$pubid' style='font-style:italic; color:#2166f3; background:#fff; border:2px solid #2166f3; padding:8px; font-size:16px;'>View script</a>
					</div>
					<div style='width:100%; font-style:italic; display:flex; flex-direction:column; justify-content:center; align-items:center; margin-bottom:10px; margin-top:50px; padding:10px; font-size:12px; background:#eee; border:1px solid #000; border-radius:20px;'>
     						<div style='font-size:16px; font-weight:1000; font-family:roboto; margin-bottom:20px;'>Get a discount!</div>					
     						<div style='font-size:13px; font-family:roboto;'>Get a discount, opportunity to impact people and access to unlimited earning from this solscript by creating a <span style='color:#2166f3; font-weight:bold;'>solution trial</span> with it!</div>
	   					<div style='font-size:12px; font-family:roboto; font-style:italic;'> <br>You dont want to miss out on this huge offer! All it takes is to just record a solscript about your experience when applying the solution through the link below.</div>
	   
	  					<a href='index.php?page=trial&pubid=$pubid&catid=$catID' style='color:#000; padding:10px; margin-right:10px; text-decoration:underline; border-radius:10px;' class='hover'>Trial offer - 10% discount</a>
	   				</div><br><br>
	    		   </div>
			</div>
               </div>";

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
