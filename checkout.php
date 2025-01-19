<?php
include_once 'includes/autoloader.inc.php';

$usersContr = new usersContr();
$usersView = new usersView();


if(isset($_GET['checkoutid'])){
	$checkoutID = str_replace(' ', '+', $_GET['checkoutid']);

    $checkoutID = $usersView->decryptor0($checkoutID);

$data = $usersView->getCheckout($checkoutID);
//var_dump($data);
//WELCOME TO CHECKOUT PAGE: ".$checkoutID.
$mediaAtype = $data[0];
$mediaBtype= $data[1];
$urlA = $data[2];
$urlB = $data[3];

$mediaAtype == 2 ? $assetA = "<img src='".$urlA."' id='checkoutimgA' style='width:100%; height:100%; object-fit:cover;' class='flexible'>" : ($mediaAtype == 3 ? $assetA = "<video src='".$urlA."' id='checkoutimgA' style='width:100%; height:100%; object-fit:cover;' class='flexible2' autoplay></video>" : '');
$mediaBtype == 2 ? $assetB = "<img src='".$urlB."' id='checkoutimgB' class='flexible' style='width:100%; height:100%; object-fit:cover;'>" : ($mediaBtype == 3 ? $assetB = "<video src='".$urlB."' id='checkoutvidB' style='width:100%; height:100%; object-fit:cover;' class='flexible2'></video>" : '');

		$checkout = "

<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en' dir='ltr'>
  <head>
    <title>Glit: Seek professional or technical guide/advice from expert</title>
    <meta charset='utf-8'>
    <meta name='refresh' content='0'>
    <meta name='description' content='Seek professional or technical guide/advice from expert!'>
    <meta name='theme-color' content='#fff'>
    <meta name='msapplication-TileColor' content='#fff'>
    <meta name='glit:creator' content='@_GLit'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1, user-scalable=no'>
    <meta name='mobile-web-app-capable' content='yes'>
    <meta http-equiv='x-ua-compatible' content='ie=edge'>
    <link rel='canonical' href='https://glit.ng/' />
    <link rel='manifest' href='manifest.json'>
    <link rel='apple-touch-icon' href='img/glit192.png'>
    <link rel='icon' href='img/glit192.png'>
    <link rel='stylesheet' href='css/master.css'>
    <link rel='stylesheet' href='css/style.css'>
  </head>
  <body class='RBtn body GLit' id='flexible'>
    <div id='_paymentSubpage' style='z-index:5000;'></div>
    
    
    <main role='main' style='z-index:290;' class='animate-bottom'>
      <article itemscope itemtype='http://schema.org/checkoutPage'>
        <meta itemprop='datePublished' content='2020-01-02 09:00:20 -0700 -0700'>
        <meta itemprop='dateModified' content='2021-02-02 10:30:55 -0700 -0700'>

        <div id='response' style='z-index:80;'>
        </div>
		<div style='width:100%; background:#fff; height:100vh; display:flex; flex-direction:column; justify-content:center; align-items:center;'>
		<div style='height:45%; background:#eee; width:100%;'>$assetA</div>
		<div style='height:55%; background:#eee; width:100%;'>$assetB</div>

		</div>

        <div class='add-button'>
              <div style='position:fixed; top:48%; display:flex; flex-direction:column; justify-content:center; align-items:center; width:100%;'>
                <span style='font-size:10px;'>Not on Glit yet?</span>
                <a href='https://glit.ng' style='text-decoration:none;'><button style='padding:10px; border-radius:10px; filter:drop-shadow(1px 1px 1px #fff); background:#2166f3; font-size:18px; color:#fff;'>Join Glit</button></a> 

              </div>
        </div>

	  </article>
    </main> 
        <script src='sw.js'></script>  
        <script src='scripts/jquery-3.6.0.min.js'></script>;

    <script src='notification.js'></script>
    <script src='scripts/validate.js'></script>
    <script src='index.js'></script>
    <script src='bundle.fe8415897932ee6cfc43.js'></script>
    <script src='scripts/processor.js'></script>
    <script src='scripts/app.js'></script>
    <script src='scripts/mediaHandler.js'></script>
    <script src='scripts/script.js'></script>

 </body>
</html>";
echo $checkout;

}
