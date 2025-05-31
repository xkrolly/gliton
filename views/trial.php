<?php

	$usersContr = new usersContr();
	$usersView = new usersView();

$pubid = $_GET['pubid'];
$catid = $_GET['catid'];

                $aoi_array = $usersView->aoi($catid);
            	$queCol = $aoi_array['queCol'];
				$user_id_col = $aoi_array['user'];
				$cat_id = $aoi_array['cat_id'];
				$cat_tbl = $aoi_array['topic'];
				$expert = $aoi_array['expert'];
				$directory = $aoi_array['folder'];

$userData = $usersView->fetchUser();
$me = $userData[0]['profile_id'];
$_me = $usersView->usercode($me);
$pubid = $usersView->alphaA_Num($pubid);

$published = $usersView->select('publish', ' WHERE pub_id = ?', $pubid);
$chatpop = $published[0]['chatpop'];
$conversID = $published[0]['published'];
$title = $published[0]['heading'];

$chatpop = 's' ? $table = 'solochat' : ($chatpop = 'd'? $table = 'chat' : $table = 'grpchat');
$chatpop = 's' ? $col = 'content_id' : ($chatpop = 'd'? $col = 'uniq_conv' : $col = 'class_id');

$chatpop = 's' ? $tableID = 'solo_id' : ($chatpop = 'd'? $tableID = 'chat_id' : $tableID = 'grp_id');

$solscript = $usersView->select($table, ' INNER JOIN '.$cat_tbl.' USING ('.$cat_id.') WHERE '.$col.' = ? AND flag = ? ORDER BY '.$tableID.' DESC', $conversID.', 0');
$n = count($solscript) - 1;
$output ="
		<div id='vidframe' style='z-index:100; display:none; width:100%; position:fixed; top:0;'>
            <video id='preview' controls autoplay muted style='display:flex; background:green; width: 100vw; height: 100vh; box-sizing:border-box; object-fit :cover;'>
              <source id='webcam' src='' type='video/webm'>
            </video>
              <span id='log'></span>
	                      ".$usersView->countDownStyled()."
              <button id='stopBtn' class='sm' style='position:fixed; bottom:20px; right:20px; z-index:101; background:transparent; color:#fff; border-radius:10px; border:1px solid #000;'>Stop</button>

        </div>
";


$rid='';
$chid='';
$height='240px';
$lck=0;
$uploadURL='views/solo_vid_upload.php';
$contentID = $conversID.'_'.$_me; //adding my fingerprint
$addVideoFrame=0;
$addSpanPadin=0;

$mediaType ='3'; 
$owner = $me;
$contributors = '';
$projectType = 's';
$usersView->addToPending($catid, $title, $contentID, $mediaType, $owner, $contributors, $projectType);

$x = 1;
$output .="<div style='background:#eee; padding-bottom:60px;'><form action='' method='post'>
				";
while($n >= 0){

	$solscript[$n]['media'] == 3 ? 
	$display = " <video id='media".$n."' class='flexible2' style='width:100px; height:70px; object-fit:cover; border-radius:10px;' src='videos/".$directory."/dec/".$solscript[$n][$queCol].".webm' ></video>" : ($solscript[$n]['media'] == 2 ? $display = "<img id='img".$n."' src='img/".$directory."/".$solscript[$n][$queCol].".webp' class='flexible' style='width:100px; height:70px; object-fit:cover;' />" : $display = $solscript[$n][$queCol]);

	$output .= "
	<div style='display:flex; width:100%; flex-direction:column; border-bottom:1px solid #ccc; padding:5px 0 1px 0; background:#fff; margin-top:20px;'>
			<div style='display:flex; width:100%;'>
				<div style='padding:1px; padding-left:10px; display:flex; align-items:center; margin-bottom:2px;'>".$display."<span style='font-size:12px; margin-left:10px;'>Scrollet $x</span></div>
				<div style='margin-left:auto; margin-right:30px; margin-top:auto; margin-bottom:auto;'>
				    <input type='hidden' name='mediaproof' id='mediaproof$n'/>
		        	<input type='hidden' name='mediaType' id='mediaType$n'/>
        		  	<input type='hidden' name='encmsg$n' id='encmsg$n'/>
                    <input type='hidden' name='user' id='user$n' value='$me'/>
                    <input type='hidden' name='category' id='category$n' class='category' value='$catid'>
 $n==0 ? $output .= "<div></div>" : $output .= "<div style='font-size:12px; padding:10px; border-radius:10px; border:1px solid #2166f3;' class='theme2' id='chatMicSpan' onclick='startVideo(\"$catid\", \"$directory\", \"$rid\", \"$chid\", \"$contentID\", \"$height\", \"$lck\", \"$uploadURL\", \"$addVideoFrame\", \"$addSpanPadin\", \"5\", $n);' class='hover'>Create</div>";
		$output .="</div>
			</div>

			<div id='all_chat$n' style='width:100%; height:250px; display:flex; align-items:center; justify-content:center; background:#fff; border:1px solid #aaa; font-size:12px;'>";
 $n==0 ? $output .= "<div style='display:flex; flex-direction:column;'>
			<div style='font-size:13px; font-style:italic; padding:20px 50px 10px 50px; width:100%; text-align:center;'>
	                     Watch this scrollet and create your copy at the solution proof in the next publish page after you click on publish trial.
		  	</div>
 			 <div><input type='radio' name='endresult'><span style='margin-left:20px; color:green;'>Satisfied by the End-Result i get</span></div>
			 <div><input type='radio' name='endresult'><span style='margin-left:20px; color:gold;'>Somewhat satisfied by the End-Result</span></div>
			 <div><input type='radio' name='endresult'><span style='margin-left:20px; color:red;'>Not Satisfied at all</span></div>
		     </div>" : 
	 $output .= "<span id='scrollet$n'>Your scrollet copy appears here after you create it</span>";
		$output .="<div style='display:flex; flex-direction:column; justify-content:flex-end; margin-bottom:30px;'>
				    <canvas id='canvas$n' style='background:transparent; width:100%; height:400px; z-index:11; display:none;'>
				    </canvas>
				    <div id='cancel$n' style='z-index:12; color:red; background:transparent; display:none; width:100%; padding:5px; margin-top:-80px;'>
				      <div style='display:flex; justify-content:space-around;'>
				          <div onclick='cancelUpload();' style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:50px; width:50px; background:#fff;'>
				                        <span class='material-icons' style='color:red; font-size:30px;'>&#xe5c9;</span>
				                        
				          </div>
				          <div id='proceed$n' onclick='proceedUpload();' style='display:flex; justify-content:center; align-items:center; background:#fff; border:5px solid 2166f3; border-radius:50%; height:50px; width:50px; margin-left:auto;'>
				          <span class='material-icons' style='color:#2166f3; font-size:30px;'>&#xe86c;</span>
				                        
				          </div>
				      </div>
				    </div>

			     </div>


			</div>
			</div>";
$x++;
$n--;

}
   			$soloPublish = $usersView->encryptor0('soloPublish');
			$_cat_enc = $usersView->encryptor0($catid);

$output .="<div style='margin-top:20px; width:100%; text-align:center;'>
		<a style='text-decoration:none;' href='index.php?page=publish&val=$contentID&ab=$soloPublish&cat=$_cat_enc&ttl=$title'>
		     <div style='display:flex; justify-content:center; align-item:center;'><div class='bg theme' style='border-radius:10px; padding:15px; border:5px solid #fff;'>Publish trial</div></div>
		</a>
	   </div>
</form>
<div style='font-size:12px; font-style:italic; padding:20px 50px 10px 50px; width:100%; text-align:center;'>
	<strong>Note: </strong>You only get the 10% discount after you publish the trial and the trial has passed the genuiness test for approval by the admin.</div>
</div>";
return $output;
//work on creating a chat pg using this detail and user will copy and add their input
//return $trial;

