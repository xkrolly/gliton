<?php

return "
        <form method='post' id='completeReg_data' class='homeWidth'>
        <input type='hidden' name='mypub' id='mypub' />
        <input type='hidden' name='prv' id='prv' />
        <input type='hidden' name='enc_pwd' id='enc_pwd' />
        
        <div style='display:flex; justify-content:center; margin-bottom:20px;'>
            <div id='c1' style='background:#2196f3; width:15px; height:15px; border-radius:50%;'></div>
            <div id='b1' style='background:#eee; height:5px; width:20px; margin-left:2px; margin-right:2px; align-self:center;'></div>
            <div id='c2' style='background:#eee; width:15px; height:15px; border-radius:50%;'></div>
            <div id='b2' style='background:#eee; height:5px; width:20px; margin-left:2px; margin-right:2px; align-self:center;'></div>
            <div id='c3' style='background:#eee; width:15px; height:15px; border-radius:50%;'></div>
        </div>
            <div id='completereg-fm-a'>
                <h5 style='margin-bottom:10px;'>Create login details</h5>
    			<div style='display:flex column; text-align:left;'>
                    <div class='form-group'>
                            <div class='col-sm-12' style='display:flex; flex-direction:column;'>
                            <input style='font-size:12px;' class='form-control em' type='text' name='user' id='user' placeholder='username(8 characters max)' autocomplete='off' maxlength='8'/>
                             <span id='check_uname'></span>

                            </div>
                            
                    </div>
                    <div class='form-group' style='margin-top:-10px;'>
                            <div class='col-sm-12'>
                             <input style='font-size:12px;' class='form-control em' id='pass-word' autocomplete='off' type='password' name='pass-word' placeholder='password' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters' >

                            </div>
                    </div>
                    <div id='message'>
                      <h6>Password must contain the following:</h6>
                      <div id='letter' class='invalid'>A <b>lowercase</b> letter</div>
                      <div id='capital' class='invalid'>A <b>capital (uppercase)</b> letter</div>
                      <div id='number' class='invalid'>A <b>number</b></div>
                      <div id='length' class='invalid'>Minimum <b>8 characters</b></div>
                    </div>       
                    <div class='form-group'>
                         <div class='col-sm-12'>
                            <input style='font-size:12px;' class='form-control em' type='password' name='pass-wordd' id='pass-wordd' placeholder='Retype-password' value='' pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}' title='Must match previous one and contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'/>

                            </div>
                    </div>
    
                    <div class='col-sm-12 text-center' style='display:flex; flex-direction:column;'>
                              <span id='check_pass-word'></span>
                            <button class='btn btn-default' id='savelogindata'>Proceed</button>

                    </div>
                </div>
            </div>

            <div style='display:none;' id='completereg-fm-b'>
                   
                <h5 style='margin-bottom:10px;'>Your details</h5>
                <div style='display:flex column; text-align:left;'>
                    <div class='form-group'>
                            <div class='col-sm-12'>
                            <input class='form-control em' type='text' name='fname' id='fname' placeholder='firstname' value=''/>

                            </div>
                            
                    </div>
                    <div class='form-group'>
                            <div class='col-sm-12'>
                            <input class='form-control em' type='text' name='sname' id='sname' placeholder='Surname' value=''/>

                            </div>
                            
                    </div>
                    <div class='form-group'>
                            <div class='col-sm-12'>
                            <input class='form-control em' type='email' name='regcontact' id='regcontact' value='' placeholder='email' />
                            </div>
                    </div>
                    <div class='col-sm-12 text-center'>
                            <button class='btn btn-default' id='savelogindatab'>Proceed
                            </button>
                            <input type='hidden' name='username' id='username'>
                            <input type='hidden' name='passphrase' id='passphrase'>
                    </div>
                </div> 
            </div>
            <div style='display:none;' id='completereg-fm-c'>
                   
            <h5 style='margin-bottom:15px;'>Your Detail</h5>
                <div id='reg-detail' style='text-align:left; padding-left:30px;'>
                </div>
                            <span id='check_username'></span>
                            <span id='check_passphrase'></span>
                            <span id='check_fname'></span>
                            <span id='check_sname'></span>
                            <span id='check_regcontact'></span>

                <div class='form-group'>
                    <div style='display:flex; justify-content:center; align-items:center;'>
                            <span id='cancelRegFm'><<</span>
                            <button class='btn btn-default' name='submit' id='submit' style='margin-left:20%;'>Submit</button>
                            <input type='hidden' name='user-name' id='user-name' value=''>
                            <input type='hidden' name='pass-phrase' id='pass-phrase' value=''>
                            <input type='hidden' name='first-name' id='first-name' value=''>
                            <input type='hidden' name='last-name' id='last-name' value=''>
                            <input type='hidden' name='con-tact' id='con-tact' value=''>
                    
                         </div>
                   </div>    
                </div>
             </div>
        </form>";

        /*                    <!--<div class='form-group'>
                            <div class='col-sm-12'>
                            <input class='form-control em' type='password' name='spw' id='spw' placeholder='Retype Password' value=''  />
                                <span id='check_spw'></span>
                            </div>
                    </div>-->
*/