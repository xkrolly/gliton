<?php

//include('../includes/autoloader.inc.php');
    
    $usersView = new usersView();
    $userData = $usersView->fetchUser();
//var_dump($userData[0]['show_profile']);
    $userData[0]['hideProfile'] == 1 ? $checked = 'checked' : $checked = '';
    $userData[0]['hideProfile'] == 1 ? $value = '' : $value = 1;
return "<div style='padding:20px; margin-bottom:50px;'>
<form id='profile_data' method='post'>
<h4>Profile settings</h4><br>
				<div style='display:flex;'>
                     <div class='col-sm-6'>
                        <label style='font-weight:bold;'>Header Image</label>
                        <input type='file' name='imgH' id='imgH' multiple camera class='fileinput' value='' style='width:100%;'>
                        <span id='imgH'></span>
                    </div>
                     <div class='col-sm-6'>
                        <label style='font-weight:bold;'>Profile Image</label>
                        <input type='file' name='imgP' id='imgP' multiple camera class='fileinput' value='' style='width:100%;'>
                        <span id='imgP'></span>
                    </div>
                </div>
                <hr>
				<div class='form-group'>
                    <div class='col-sm-12'>
                        <label style='font-weight:bold;'>Profession</label>
                    </div>
                     <div class='col-sm-12' style='display:flex;'>
                        <input type='text' class='form-control' name='profession' value='' placeholder='input your profession /expertise' />
                     </div>
                </div>

                <hr>
                <div class='form-group'>
                    <div class='col-sm-12'>
                        <label style='font-weight:bold;'>Gender</label>
                    </div>
                     <div class='col-sm-12' style='display:flex;'>
                        <label><input type='radio' name='sex' value='g1'>&nbsp;Female </label>&nbsp;&nbsp;&nbsp;<label><input type='radio' name='sex' value='g2'>&nbsp;Male</label>

                     </div>
                </div>
                <hr>
				<div class='form-group'>
                    <div class='col-sm-12'>
                        <label style='font-weight:bold;'>Contact</label>
                    </div>
                     <div class='col-sm-12' style='display:flex;'>
                        <input type='text' class='form-control' name='contact' value=''>
                     </div>
                </div>
                                <hr>
                <div class='form-group'>
                    <div class='col-sm-12'>
                        <label style='font-weight:bold;'>Privacy</label>
                    </div>
                     <div class='col-sm-12' style='display:flex;'>
                        <label><input type='checkbox' name='hideProfile' value='".$value."' ".$checked.">&nbsp;Hide profile image on chat</label>
                     </div>
                </div><br>

                <div class='col-sm-12'>
                <button class='btn btn-default theme form-control'>Update</button>
                </div>
</form></div><br><br>";