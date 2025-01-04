 <?php 
// style='background:#f8f8ff;' paid =&#xf041;  expert=&#xea4a; solution =&#xea24;privacy=<span class='material-icons' style='color:#00ff00; font-size:50px;'>&#xea17;</span>
return "<div class='homepage pattern pt1' onclick='getMyLoc()'>
          <div class='bg-overlay' style='width:100vw;'>
            <div onclick='getMyLoc()' style='margin:-10px -12px 20px 2px; display:flex; color:#fff; justify-content:center; align-items:center;'>
              <div>
              </div>
              <div class='topBar'>   
                  <div style='margin-right:20px;'>FAQs</div>
                  <div style='margin-right:20px;'>Learn more</div>
                  <div style='margin-right:10px; color:red;' onclick=$('.loginPanel').slideDown(200)>
                  <span class='material-icons' style='font-size:12px;'>&#xe7fd;</span>
                    Login
                  </div>
              </div>
            </div>
            <div style='position:fixed; top:5px; left:5px; height:40px; width:40px; z-index:20; background:#000; opacity:0.3; color:#fff; border-radius:50%;'>
            </div>
            <div style='display:flex; justify-content:center; align-items:center; position:fixed; top:5px; left:5px; height:40px; width:40px; background:transparent; color:#fff; z-index:21; font-weight:bold; font-family:sans-serif; border-radius:50%; font-size:14px;'>GL<span style='color:#2176f3;'>iT</span></div>
            
            <header style='font-family: sans-serif;'>
            <div style='display:flex; justify-content:center;'><span id='logocover'><span id='logo'>G</span></span></div>
              <h1 style='color:#000; font-weight:bold; text-align:center;' class='headingone'>Chat professionals or experts
              </h1>
              <p class='sm-desc headingtwo'>Consult professionals on medicals, agricultural, veterinary, nutrition etc for professional solution/guidance.</p>
              <form method='post' id='signup_data' style='display:flex; margin-top:20px; justify-content:center; padding:5px;'>
            <input type='hidden' value='' id='lokey' name='lokey'>
              <input type='text' title='WhatsApp number' class='sm pillTail' placeholder='Your WhatsApp number' name='mobileNum' id='mobileNum'>
                <button type='submit' class='btn-default regfrmBtn' style='margin-left:3px; border-top-right-radius:50px; color:#fff; background:#000; border-bottom-right-radius:50px;' onClick='getOTP3();'>Get started!</button>
            </form>
            <br>
                <div id='whatsap-share' style='font-size:12px; text-align:center;'></div>
                <div id='otpVerifyFm2' style='display:flex; justify-content:center; margin-top:10px;'></div>
        
            </header>
          </div>
        </div>
        <div style='height:2px; width:100%; border-top:2px inset #eee;'></div>
      
          
    <div id='columns-to-row' style='margin-top:25px; width:100vw; background:#fff;'>
      <div class='columns-to-row-unit'>
        <div>
        <img src='img.png' style='height:100px; width:100px;'/>
        </div>
        <div class='sm-title'>Expert access</div>
        <div class='sm-desc2'>Chat at your comfort with top experts and professionals to seek solution, guidance or technical advice on any field.
        </div>
      </div>
      
      <div class='columns-to-row-unit'>
        <div>
                <img src='solution2.jpg' style='height:100px; width:150px;'/>
    
        </div>
        <div class='sm-title'>Immediate solution</div>
        <div class='sm-desc2'>Your challenge get responded to in a matter of seconds.
        </div>
      </div>
      
      
  <div class='hide' style='height:2px; margin:10px 0 50px 0; width:100%; border-top:2px inset #eee;'></div>
      
      <div class='columns-to-row-unit'>
        <div>
        <img src='privacy2.png' style='height:100px; width:100px;'/>
            
        </div>
        <div class='sm-title'>Privacy protection</div>
        <div class='sm-desc2'>Your privacy and sensitive data are secured and your chats are protected with End-to-End Encryption. Nobody can access your chats.
        </div>
      </div>
      

      <div class='columns-to-row-unit'>
        <div>
            <img src='cash.png' style='height:100px; width:100px;'/>
        </div>
        <div class='sm-title'>Get paid</div>
        <div class='sm-desc2'>You will be earning royalties on each of the useful solutions.</div>
      </div>

    </div>



<p style='text-align:center;' onclick='getMyLoc()'>
                <button type='button' style='color:#fff; font-size:20px; background:#2176f3; padding:15px 20px; border:0px; border-radius:5px; margin:60px 30px;' class='btn-sm' onclick=$('.loginPanel').slideDown(200)>
                  Join GLiT
                </button>
            </p>

     <div style='background:transparent; color:#000; padding:10px; padding-bottom:30px;' class='footer-list'>
        <div style='display:flex; align-items:space-between; justify-content:space-around; border-top:1px solid #222; margin-top:50px; margin-bottom:80px;'>
            <div>
              <a href='./' style='text-decoration:none; margin-top:10px;'>Home</a>
            </div>
            <div>
              <a href='views/about.php' style='text-decoration:none;'>About</a>
            </div>
            <div>
              <a href='views/privacy-policy.php' style='text-decoration:none;'>Policy</a>
            </div>
            <div>
              <a href='views/terms.php' style='text-decoration:none;'>Terms</a>
            </div>
          </div>
          <div>
             <footer style='display:flex; justify-content:center; align-items:center; font-size:12px;'>
                &copy  ".date('Y')." <img src='img/glit192.png' alt='gLIT logo' style='height:20px; width:20px; margin-left:6px;'>LIT
            </footer>
          </div>
        </div>


<div class='loginPanel' style='display:none; margin-bottom:20%; overflow:scroll; filter: drop-shadow(2px 2px 3px #232); position:fixed; border-left:1px solid #ccc; top:0px; right:0px; height:100%; padding:20px; background:#fff; z-index:1;'>
          <label onclick=$('.loginPanel').slideUp(500) style='text-align:left; color:black; font-size:20px;'>&times</label>
          <div style='display:flex; justify-content:center; align-self:center;'>
            <img src='img/glit192.png' alt='gLIT logo' style='height:55px; width:55px; margin:25px auto 20px auto;' />
            </div>
             <p style='color:black; font-size:16px; text-align:center; font-weight:bold;'>
              Sign in below
            </p>
            <div>
              <form method='post' id='login_data' onclick='getMyLoc()'>
                <input type='text' title='username' class='login-input' name='uname' id='uname' placeholder='Username' style='width:100%; padding:10px; background:#ecf0f3; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; border-radius:50px; margin-top:10px; margin-bottom:-6px;'/>
                <p id='uname-input-check'></p><br>
              
        <input type='password' required name='pwd' id='pwd' placeholder='Password' class='form-control login-input' style='width:100%; padding:10px; background:#ecf0f3; margin-bottom:6px; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; border-radius:50px;'/>
        <p style='font-size:14px; font-style:italic; margin-top:4px; margin-left:10px;'>
            <label style='display:flex; align-items:center;'>
                <input type='radio' name='eternity' value='1'/>
                &nbsp; Stay logged in
               
            </label>
        </p>
        <p id='pwd-input-check'></p>
              
                <div style='display:flex; margin-top:25px;'><span onclick='inlineLoader(\"inLoader\");'>
                 <div id='inLoader'></div>
                <input type='submit' name='login' id='loginbtn' value='Login' class='btn' style='padding:10px 20px 10px 20px; filter: drop-shadow(1px 1px 1px #232); border-radius:30px;'>
                  <input type='hidden' id='latd' name='latd' value=''>
                <input type='hidden' id='lngd' name='lngd' value=''>
                </span>
                <div style='align-self:center; margin-left:auto; height:20px; width:1px; border:1px solid #ccc;'></div>
                <a href='resetpw.php' style='margin-left:auto; font-style:italic; align-self:center; margin-right:50px; font-size:14px;'><i>forgot password</i></a>
                </div>
            <br>
              </form>
            </div>
            <div style='width:100%; border:2px inset #eee; background:#ccc; margin:20px auto 20px auto;'></div>
            <p style='text-align:center; font-size:18px; color:black; margin:10px auto 20px auto;'>Not yet a member?</p>
            <form id='sinup_data2' style='display:flex; margin-bottom:20px;'>
            <input type='hidden' value='' id='lokey2' name='lokey2'>
              <input type='text' style='width:65%; padding:10px; background:#ecf0f3; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; border-top-left-radius:50px; border-bottom-left-radius:50px;' title='WhatsApp number' class='sm logininput' placeholder='Your WhatsApp number' name='mobileNm' id='mobileNm'>
                <div type='btn' class='btn-default sm' style='padding:10px; border-top-right-radius:50px; border-bottom-right-radius:50px; width:35%; background:#ddd;'>Register</div>
            </form>
            <div id='whatsap-share2' style='font-size:12px; text-align:center;'></div>
            <div id='otpVerifyFm' style='margin:20px auto 20px auto;'></div>
            <p style='padding:5px; margin-bottom:10px; border-radius:50px; font-size:14px; color:black; border:1px solid #aaa'>
              <i class='fab fa-facebook sm'></i>&nbsp;&nbsp;Sign in with Facebook
            </p>
            <p style='padding:5px; margin-bottom:10px; border-radius:50px; font-size:14px; color:black; border:1px solid #aaa'>
              <i class='fab fa-google sm'></i>&nbsp;&nbsp;Sign in with Google
            </p>
            <p style='padding:5px; margin-bottom:10px; border-radius:50px; font-size:14px; color:black; border:1px solid #aaa'>
              <i class='fab fa-twitter sm'></i>&nbsp;&nbsp;Sign in with Twitter
            </p>
            <p style='color:#aaa; font-size:12px'>
              By clicking on Sign in/REGISTER you agree to gLIT <a href='views/terms.php'>Terms of use</a> and <a href='views/terms.php'>Privacy policy</a>.
            </p>
            <br>
           
        </div>
      </div>
        ";
 
 
 //Return "<div>Dev in progress</div>";