<?php
header("Access-Control-Allow-Origin: https://ravemodal-dev.herokuapp.com/v3/hosted/pay");
//is it updating or commiting?
include_once 'includes/autoloader.inc.php';
$imp = '';
$pgv = new usersView();
/*$code = $pgv->usercode('220915');
var_dump($code);*/
$pgv->content='';
    $pgv->addScript('scripts/jquery-3.6.0.min.js');
    $pgv->addScript('scripts/jquery.mobile-1.4.5.min.js');    
    $pgv->addScript('scripts/login.js');
    $pgv->addScript('scripts/crypto-js.js');
    $pgv->addScript('scripts/key.js');
    $pgv->addCSS('https://fonts.googleapis.com/icon?family=Material+Icons');
  
if(isset($_SESSION['user_id']) || isset($_GET['autolog'])){
//var_dump($_SESSION['user_id']);
//if(isset($_SESSION['user_id']) && intval($_SESSION['user_id']) < 3 && 2===3){
  $pgv->addScript('scripts/bot.js');
  $pgv->addScript('scripts/recorder.js');
  $pgv->addScript('scripts/recorder2.js');
  $pgv->addScript('https://checkout.flutterwave.com/v3.js');
  //$pgv->addScript('scripts/pay.js');
     //$pgv->addScript('https://js.paystack.co/v1/inline.js');
      
//!isset($_GET['autolog']) && 
/*isset($_GET['autolog']) ? $_SESSION['user_id'] = $_GET['autolog'] : '';
!isset($_SESSION['user_id']) ? $_SESSION['user_id'] = $_COOKIE['uid'] : $_SESSION['user_id'];
*/
if(!isset($_SESSION['user_id'])){
  isset($_GET['autolog']) ? $_SESSION['user_id'] = $_GET['autolog'] : $_SESSION['user_id'] = $_COOKIE['uid'];
}
$row = $pgv->fetchUser();
$regCompleted = $row[0]['regCompleted'];
$xpat = $row[0]['xpt']; 

if($regCompleted==0){

  $pgv->content .= $pgv->showModal2('views/completeRegFm.php', 'completeReg', 'file', 'block');

}

  $pgv->addCSS('css/index.css');
  $navigationIsClicked = isset($_GET['page']);
  $fileToLoad='';
  $xpat == 0 ? $viewpg = "scrolls" : $viewpg = "response";
  //$xpat == 1 ? $viewpg = "response" : $viewpg = "scrolls";
  
  if($navigationIsClicked){$fileToLoad .= $_GET['page'];}
  else {$fileToLoad .= $viewpg;}

  //  $fileToLoad == "scrolls" ? $fileToLoad = $viewpg : $fileToLoad;
    $fileToLoad == "" ? $fileToLoad = "scrolls" : $fileToLoad;
    $pgv->content.=include_once "views/".$fileToLoad.".php";

$pgv->embeddedStyle = "<style>
    nav a[href *= '$fileToLoad']{
      background:deepskyblue;
      border-radius:20px;
      color:#fff;
      text-decoration:none;
      padding:10px 4px 2px 4px;
    }
    .contain_er{
      display:flex;
    }



.ribbon-wrap{
  width:150px;
  height:150px;
  position: absolute;
  top: -10px;
  left: -10px;
  pointer-events: none;
}

.ribbon{
  width: 230px;
  font-size: 0.918rem;
  text-align: center;
  padding: 8px 0;
  background: #2166f3;
  color:#fff;
  position:absolute;
  transform: rotate(-45deg);
  right: -17px;
  top:29%;
}

  </style>";

}else{
  isset($_GET['impostor']) ? $imp .= $_GET['impostor'] : $imp .= '';

 $pgv->content .= include_once "views/login.php";
 $pgv->embeddedStyle = "<style>
     *{
      box-sizing:border-box;
      vertical-align: baseline;
      font-weight: inherit;
      font-family: inherit;
      font-style: inherit;
      font-size: 100%;
      border: 0;
      outline: 0;
      padding: 0;
      margin: 0;
    }

    .bg-overlay{
            background: transparent;
            height:100%;
            width:100%;          
            padding:15px;
            z-index:12;
    }

    .homepage>header{
      position: absolute;
      bottom:0;
      left:0;
      height:50%;
      width:100%;
      padding: 20px 10px;
      background:inherit;
      background-attachment:fixed;
      overflow:hidden;
      margin-top:200px;
    }
    
    .lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}

.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}

//.pattern{
  //width: 100vw;
  //height: 100vh;
//}

.pt1{
  background-size: 15px 15px;
  background-position: 0 0, 130px 130px;
  background-image: -webkit-linear-gradient(45deg, skyblue 25%, transparent 25%, transparent 75%, skyblue 75%, skyblue), -webkit-linear-gradient(45deg, skyblue 25%, transparent 25%, transparent 75%, skyblue 75%, skyblue);
  
  background-image: -moz-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), -moz-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);
  
  background-image: -ms-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), -ms-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);
  
  background-image: -o-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black), -o-linear-gradient(45deg, black 25%, transparent 25%, transparent 75%, black 75%, black);
  
  background-image: linear-gradient(45deg, #cae6ef 25%, transparent 25%, transparent 75%, #cae6ef 75%, #cae6ef), linear-gradient(45deg, #cae6ef 25%, transparent 25%, transparent 75%, #cae6ef 75%, #cae6ef);
}

@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}


 </style>";
} // lobster fonts/
 //<meta http-equiv='Content-Type' content='text/html'>
//    <title>Glit: Seek professional or technical guide/advice from expert</title>
    
$page="
<!DOCTYPE html>
<html xmlns='http://www.w3.org/1999/xhtml' xml:lang='en' lang='en' dir='ltr'>
  <head>
    <title>Glit</title>
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
    $pgv->embeddedStyle
    $pgv->css
    $pgv->scriptElements
    <script>
    $('#scrollet').on('swipedown swipeup swipeleft swiperight', function(event){
  alert('Phone swiped');
});

        function dec_que(que, pub){
            var pw_enc_privKey = localStorage.getItem('prv');
            var enc_pwd = localStorage.getItem('encP');
            var shrd =gen_shared(pw_enc_privKey, enc_pwd, pub);
            
            var decQ = sym_decrypt(que, shrd);
            localStorage.setItem('clientQ', decQ);

        }

    </script>
    <script charset='utf-8' src='27.fe8415897932ee6cfc43.js'></script>
    <script charset='utf-8' src='9.fe8415897932ee6cfc43.js'></script>
  </head>
  <body class='RBtn body GLit' id='flexible'>
    <div id='loaderBg' style='z-index:5000;'></div>
    <div id='loader' style='z-index:5000;'></div>
    <div id='_paymentSubpage' style='z-index:5000;'></div>
    
    
    <main role='main' style='z-index:290;' class='animate-bottom'>
      <article itemscope itemtype='http://schema.org/checkoutPage'>
        <meta itemprop='datePublished' content='2020-01-02 09:00:20 -0700 -0700'>
        <meta itemprop='dateModified' content='2021-02-02 10:30:55 -0700 -0700'>
<div class='lds-ripple' id='spinner' style='display:none; background:#2186f3; border-radius:50%;'><div></div><div></div></div>
  
        <div style='width:100%; display:flex; justify-content:center;'>
        <div id='overlay'></div>
        </div>
        <div id='response' style='z-index:80;'>
        </div>

        <div class='add-button'><div style='width:100%; display:flex; justify-content:center;'><div style='display:flex; margin-left:auto; margin-right:auto; align-items:center; align-self:center; width:84%; border-radius:10px; background:rgba(255,255,255, .8); filter:drop-shadow(1px 1px 1px #aaa) drop-shadow(-1px -1px .5px #aaa); position:fixed; bottom:10px; padding:5px 10px 5px 10px; z-index:500;'>
            <div style='margin-right:auto; display:flex;'><img src='img/glit192.png' alt='gLIT logo' style='height:38px; width:38px; border-radius:50%;'><span style='margin-right:20px; margin-left:6px; font-size:9px;'>Consult professionals or experts, or be a resource person and create solutions, get paid etc..</span></div>
            <button class='add-button hover' style='margin-left:auto; background:transparent; color:#2166f3; font-size:16px; border:0; border-left:1px solid #000;'>Install</button>
        </div></div></div>";

if($imp == 'TRUE'){$page .="<div id='impostor_note' style='position:fixed; top:0; width:100vw; z-index:200; text-align:center;'>
              <div style='background:transparent;'>
                <div style='font-size:16px; background:yellow; color:deepskyblue; padding:4px;'>
                  Your account has been logged in on another device.
                </div>
                <div style='display:flex; justify-content:space-around; font-size:14px; margin-top:0; padding:10px;'>
                  <a href='#' style='color:#fff; background:deepskyblue; padding:12px 30px 12px 30px; border-radius:30px; filter:drop-shadow(1px 1px 1px #555);' onclick=$('#impostor_note').hide();><span onclick=$('.loginPanel').slideDown(200)>Yes, It's me.</span></a>
                  <a href='resetpw.php' style='background:#fff; color:deepskyblue; padding:12px; border-radius:30px; filter:drop-shadow(1px 1px 1px #555);'>Change Password</a>
                </div>
              </div>
            </div>";
}
      $page.=  $pgv->content
     
      ."</article>
    </main> 
   <script>
   
      function enc_ans(pub){
        var pw_enc_privKey = localStorage.getItem('prv');
        var enc_pwd = localStorage.getItem('encP');
             
        var shrd = gen_shared(pw_enc_privKey, enc_pwd, pub);
        var ans = $('#ans').val();
        var encA = sym_encrypt(ans, shrd);
       var fff =  sym_decrypt(encA, shrd);
        $('#que').val(encA);
      }

      if(!!document.getElementById('enq')){
        var decQ = localStorage.getItem('clientQ');
        document.getElementById('enq').innerHTML = decQ;
      }


      var numELEMENT = document.getElementById('mobileNum');
 if(numELEMENT){
      numELEMENT.addEventListener('input', ()=>{
         
        var numELEMENTval = numELEMENT.value;
        numELEMENTval.length > 9 ? checkRAC(1) : '';
      });
   }
      var numELEMENT2 = document.getElementById('mobileNm');
      if(numELEMENT2){
        numELEMENT2.addEventListener('input', ()=>{
        var numELEMENTval2 = numELEMENT2.value;
        numELEMENTval2.length > 9 ? checkRAC(2) : '';
        });
     }

      function checkRAC(a){
        a == 1 ? num = $('#mobileNum').val() : (a == 2 ? num = $('#mobileNm').val() : num='');

        $.ajax({
          url: 'includes/checkrac.inc.php',
          method: 'post',
          data: {num:num, form:a},
          dataType:'json',
          success: function(data){

            var OTP = data.code;
            var output = data.output;
            var mobile = data.mobile;
            var fm = data.fm;

           var form =\"<a href='https://wa.me/\"+mobile+\"?text=\"+OTP+\"' style='text-decoration:none; padding:10px; background:yellow; filter:dropshadow(2px 2px 2px #ccc); border-radius:5px; font-weight:bold; color:#2186f3;'>Get OTP via WhatsApp</a>\";
           
           var form2 = \"<form id='otpCheck' method='post' action='includes/otpverifier.inc.php' style='display:flex; justify-content:center; margin-bottom:10px;'><div><input inputmode='numeric' autofocus name='otp' placeholder='Enter your OTP' style='padding:10px; background:#ecf0f3; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;'/><input type='hidden' name='mobile' value='\"+mobile+\"'/></div><div><button type='submit' style='background:#f01e6b; color:#fff; padding:7px; font-size:12px;' id='verify' class='btnVerify'>Verify</button></div></form>\";

           if(output == '1' && document.getElementById('whatsap-share').textContent ==''){ 
            document.getElementById('whatsap-share').innerHTML = form;
             document.getElementById('otpVerifyFm2').innerHTML= form2;
             
           }


          }
   
          });
      }

      $(window).on('load', function () {
        $('#loader').hide();
        $('#loaderBg').hide();
    
      }) 
    </script>
    <script src='sw.js'></script>
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
echo $page;
