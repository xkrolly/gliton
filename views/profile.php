<?php
 $usersContr = new usersContr();
 $usersView = new usersView();

 $_row = $usersView->fetchUser();

$_sess = $_row[0]['purchasedSession'];
$sess = $usersView->dec_cons($_sess);
isset($_GET['pid']) ? $user = $usersView->decryptor0(str_replace(' ', '+', $_GET['pid'])) : $user = $_row[0]['profile_id'];

$user == $_row[0]['profile_id'] ? $editable = TRUE : $editable = FALSE;
        
        $coinBalData = $usersView->select('coin', ' WHERE owner_id = ?', $_row[0]['profile_id']);
        $coinBal = $coinBalData[0]['Gcoin'];
    $totalBalInNaira = intval($coinBal) * 1000;
    
    $userData = $usersView->select('skyman_user', ' WHERE user_id = ?', $user);
    /*$totalBalInNaira = $usersView->dec_cons($userData[0]['asset']) * 100;
    $totalBalInUSD = $totalBalInNaira / 850;
    $totalBalInPDS = $totalBalInNaira / 1000;*/
    
    $row = $usersView->fetchProfile($user);

//check $favourites
$_favourites = $usersView->fetchFavs($_row[0]['profile_id']);
$favourites = "<div style='display:flex; flex-wrap:wrap; flex-direction:row; height:100%; padding-bottom:12px; overflow-y:scroll;'>";
foreach($_favourites as $fav){
    $eachFav = explode(' ', $fav);
    
    $thumbnail = $eachFav[0];
    $dir = $eachFav[1];
    $media = $eachFav[2];
    $heading = str_replace('.', ' ', $eachFav[3]);
    
    $media == 3 ? $mediaDisplay = "<video class='flexible2' id='$eachFav[3]' style='border-radius:4px; border:1px solid #aaa; width:96px; height:104px; object-fit:cover; background:#fff;' src='videos/".$dir."/dec/".$thumbnail.".webm'></video>" : $mediaDisplay ="<img class='flexible' id='$eachFav[3]' style='border-radius:4px; border:1px solid #aaa; width:96px; height:104px; object-fit:cover; background:#fff;' src='img/".$dir."/".$thumbnail.".webp' />";

    $favourites .="<div style='margin:1px; display:flex; flex-direction:column;'>".$mediaDisplay.
    "<figcation style='font-size:9px; pointer-events:none; color:#fff; text-align:center; text-shadow:.5px .5px #2166f3; width:96px; height:104px; padding:5px; margin-top:-100px; z-index:30; display:flex; justify-content:center; align-items:center; flex-wrap:wrap; flex-direction:row;'><a style='pointer-events:auto; color:#fff;' href='index.php?page=peepChats&pub'>".$heading."</a></figcaption></div>";
}
$favourites .="</div>";   

//check purchased assets
$_assets = $usersView->fetchAssets($_row[0]['profile_id']);

$asset = "<div style='display:flex; flex-wrap:wrap; flex-direction:row; min-height:1000px; padding-bottom:1200px; overflow-y:auto;'>";

foreach($_assets as $ass){
    $allAss = explode(' ', $ass);
    
    $thumbnail = $allAss[0];
    $dir = $allAss[1];
    $media = $allAss[2];
    $heading = str_replace('.', ' ', $allAss[3]);
    
    $media == 3 ? $mediaDisplay = "<video class='flexible2' id='$allAss[3]' style='border-radius:4px; border:1px solid #aaa; width:96px; height:104px; object-fit:cover; background:#fff;' src='videos/".$dir."/dec/".$thumbnail.".webm'></video>" : $mediaDisplay ="<img class='flexible' id='' style='border-radius:20px; width:50px; height:50px; object-fit:cover; background:#fff;' src='img/".$dir."/".$thumbnail.".webp' />";

    $asset .="<div style='margin:1px; display:flex; flex-direction:column;'>".$mediaDisplay.
    "<figcation style='font-size:9px; pointer-events:none; color:#fff; text-align:center; text-shadow:.5px .5px #2166f3; width:96px; height:104px; padding:5px; margin-top:-100px; z-index:30; display:flex; justify-content:center; align-items:center; flex-wrap:wrap; flex-direction:row;'><a style='pointer-events:auto; color:#fff;' href='index.php?page=peepChats&pub'>".$heading."</a></figcaption></div>";
}
$asset .="</div>";   // $joinDate = $userData[0]['join_date'];  
$fn =$usersView->decryptor0($row[0]['firstname']);
$ln =$usersView->decryptor0($row[0]['lastname']);
$_aoi = $row[0]['aoi'];
 $_aoi_arr = explode('_', $_aoi);
!empty($_aoi) ? $aoi = $_aoi_arr[1] : $aoi = "";

$_profession = $usersView->generate_spec($_row[0]['profile_id'], '');

!empty($_profession) ? $profession = implode(' | ', $_profession) : $profession = '';

$initial = $usersView->initials($row[0]['firstname'], $row[0]['lastname']);
$fullname = $fn.' '.$ln;

//get a paid check
$checkMarkDues = $row[0]['checkMark_dues'];
!empty($checkMarkDues) ? $paidCheck = $usersView->paidCheck($checkMarkDues) : $paidCheck = '';
$veriCheckMark = $usersView->veriCheckMark($user, $aoi, '3', '#fff');

//$years = $usersView->numOfYears($timestamp);
$row[0]['gender']=='m' ? $gender='Male':($row[0]['gender']=='f'? $gender='Female' : $gender='Custom');
    
$img_style="flex:1; z-index:2; width:7.5em; height: 7.5em; background: white; display:flex; align-items: center; justify-content: center; text-decoration: none; border-radius: 50%; border:4px solid #fff; color:#999; font-size: 13px; opacity:1; margin-top:-50%; margin-right:auto;";
$header_style="flex:1; width:100%; height:80px; background: white; display:flex; align-items: center; justify-content: center; border-top-right-radius:10px; border-top-left-radius:5px; text-decoration: none; color:#999; font-size: 13px; opacity:1; font-family:calligraphy;";
$editable == true ? $a = 'setprofile' : $a = '#';
$imgEmpty="<a href='".$a."'><div class='imgProf' style='margin-top:-50%; background:#fff; color:#000;'>$initial</div></a>";
    $headerEmpty="<a href='".$a."'><div style='".$header_style."; border:1px solid #ccc;'><strong> Upload Header Image </strong></div></a>";
  
    $img="<img src='".usersView::PROFILE.$row[0]['picture'].".webp' id='myprofpic' class='flexible' alt='profile picture' style='".$img_style."'>";
$header=$row[0]['headerImg'];
    $headerImg="<div>
                  <img src='".usersView::HEADER.$header.".webp' alt='header image' id='myheaderpic' class='flexible' style='".$header_style."'>
                </div>";
        empty($row[0]['picture']) ? $img=$imgEmpty : $img=$img;
      //  $img = $usersView->generate_DP($_row[0]['profile_id'], '7.5em');
        empty($header) ? $headerImg=$headerEmpty : $headerImg;

$page="<div style='position:fixed; top:0px; width:100%; min-height:100vh; background:#ddd;'>
          <div style='width:100%; background:#fff; margin-bottom:10px; padding-top:10px; '>
            <form id='' class='search_data' method='post'>
            <input type='hidden' name='searchType' id='searchType' value='2'>
            <div style='display:flex; margin-bottom:10px; padding-right:20px;'>
              <button type='submit' name='submit' class='' id='search_btn' style='margin-left:20px; background:#fff; border:1px solid #ccc; border-right:transparent; flex:1; border-top-left-radius:5px; border-bottom-left-radius:5px; padding:6px;'><i class='fa fa-search' style='font-size:1em; color:#ccc;'></i></button>
              <input type='search' name='input' id='input' placeholder='Search profiles...' style='flex:8; padding:6px; font-size:1em; border:1px solid #ccc; border-left:transparent; border-top-right-radius:5px; border-bottom-right-radius:5px;'/>
            </div>
          </form>
          <div id='profilePg'>
            <div class='hideMe' style=''>
              $headerImg
            </div>
            <div class='hideMe' style='display:flex;'>
              <div style='justify-content:left; padding-left:30px;'>
                $img
                <div style='display:flex; justify-content:space-around; font-size:14px; margin-top:10px; font-family:serif;'>
                  <div style='display:flex; flex-direction:column;'>
                    <span style='background:#0f0; disply:flex; color:#fff; padding:1px; font-size:12px;'>Total balance</span>
                    <span style='font-size:22px; margin-top:-5px; margin-bottom:-5px; font-weight:bold; padding:5px 0 5px 0;'># ".$totalBalInNaira."</span>
                    <span style='font-size:8px; background:#ccc; padding:1px;'>".$coinBal."GC</span>

                  </div>

                </div>
            
              </div>

              <div style='display:flex; flex-direction:column;'>
                <div style='display:flex; flex:1; font-size:16px; align-items:center; justify-content:left; font-family:sans-serif; font-weight:bold; margin-left:10px; color:#333; margin-bottom:-20px;'>".strtoupper($fullname)."$veriCheckMark
                </div>
                <div style='display:flex; flex-direction:column; margin-left:10px; margin-right:10px; margin-top:6px;'>
                      <div style='margin-top:6px; font-size:12px; display:flex; align-items:flex-bottom;'>
                      Skills: <span style='font-size:10px; margin-top:2px; margin-left:4px;'>".ucfirst($profession)."</span>
                    </div>
                    <div style='display:flex; font-size:12px; margin-top:6px;'>
                      <span>Sessions: <span style='font-size:10px;'>".$sess."</span></span> 
                    </div>
                      <div style='margin-top:6px; font-size:12px; display:flex;'>
                      Subscriptions: <span style='width:100%;'>".$paidCheck."</span>
                    </div>

                </div>

              </div>";
      if($editable == true){$page.="

              <div style='display:flex; margin-left:auto; align-self:bottom; margin-top:10px; margin-right:10px;' onClick='displayProfileMenu()' id='menuBar' class='menuBar'>
                <div style='background:#555; width:4px; height:4px;'></div>
                <div style='background:#555; width:4px; height:4px; margin-left:4px;'></div>
                <div style='background:#555; width:4px; height:4px; margin-left:4px;'></div>
              </div>
            </div>
            <div style='width:100%; background:#ddd; margin-top:5px; height:1px;'>
            </div>

            <div style='display:flex; justify-content:space-around; font-size:14px; color:#555;'>
                <div id='asst' class='acc_nav'  onclick='asset();' style='width:33%; border-right:1px solid #ccc; background:#eee; text-align:center; font-weight:bold; padding:2px;'>Assets</div>
                <div id='bkmk' class='acc_nav' onclick='bkmark();' style='width:33%; border-right:1px solid #ccc; text-align:center; padding:2px;'>Bookmark</div>
                <div id='wlt' class='acc_nav' onclick='wallet();' style='width:33%; text-align:center; padding:2px;'>Wallet</div>
          
            </div>";
      }
$page.=" </div>   
          
          </div>
            <div id='asset' style='display:flex; justify-content:flex-start; align-items:flex-start; padding:10px; margin:0; border:1px solid #aaa; width:100%; font-size:16px; background:#ddd; min-height:1000px;'>
              $asset
            </div>
            <div id='bookmark' style='display:none; overflow:auto; justify-content:flex-start; align-items:flex-start; padding:10px; margin:0; border:1px solid #aaa; width:100%; font-size:16px; background:#ddd; min-height:90%;'>
                $favourites
            </div>
            <div style='width:100%; display:flex; justify-content:center; align-items:center;'><a href='buycoin' style='font-size:12px; margin:auto 12px 2px auto;'>Fund wallet</a><div style='height:14px; width:1px; border:1px solid #2166f3;'></div><a href='buycoin' style='font-size:12px; margin:auto 12px 2px 12px;'>Hide Balance</a><div style='height:14px; width:1px; border:1px solid #2166f3;'></div><a href='buycoin' style='font-size:12px; margin:auto auto auto 12px;'>Convert to USD</a></div>

            <div id='wallet' style='display:none; padding:10px; min-height:520px; margin:0; border:1px solid #aaa; width:100%; font-size:16px; background:#ddd;'>
                  <div style='display:flex; flex-direction:column; justify-content:center; align-items:center; margin-top:auto; margin-bottom:auto; height:50%; width:100%;'>
                   
                    <span style='display:flex; color:#000; padding:1px; font-size:26px; font-weight:bold;'>Total balance</span>
                    <span style='font-size:20px; margin-top:-5px; margin-bottom:-5px; font-weight:bold; padding:5px 0 5px 0;'>".$coinBal."GC</span>
                    <span style='font-size:14px; background:#ccc; padding:1px;'>(#".$totalBalInNaira.")</span>
                  
                  </div>
            </div>
        </div>
";
        
$page .=$usersView->bottomNavigation();
$page .=$usersView->searchPanel();


  return $page;