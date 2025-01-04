<?php
include('../includes/autoloader.inc.php');
    $usersView = new usersView();
    $usersContr = new usersContr();

$glitData = $usersView->select2('glitsum', ' WHERE glit_id > ?', '9');
$consult = $usersView->dec_cons($glitData[0]['consult']);
$purchase = $usersView->dec_cons($glitData[0]['purchase']);
$sub = $usersView->dec_cons($glitData[0]['sub']);

$n = count($glitData) - 1;

/*while($n > 0){
    var_dump('ID:'.$glitData[$n]['glit_id'].' consult:'.$usersView->dec_cons($glitData[$n]['consult']).' purchase:'.$usersView->dec_cons($glitData[$n]['purchase']).' sub:'.$usersView->dec_cons($glitData[$n]['sub']). '<br>');
    $n--;
}*/
$userData = $usersView->userList();

$admin = 
"<html>
	<head>
	<meta charset='utf-8'>
    <meta name='refresh' content='0'>
    <meta name='description' content='Seek professional or technical guide/advice from expert!'>
    <meta name='Homepage' content='GLit homepage'>
    <meta name='theme-color' content='#2176f3'>
    <meta name='glit:title' content='GLit homepage'>
    <meta name='glit:description' content='Seek technical guide as urgent as possible. Get started with GLit now!'>
    <meta name='glit:creator' content='@_GLit'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no'>
    <meta name='mobile-web-app-capable' content='yes'>
    <meta http-equiv='x-ua-compatible' content='ie=edge'>
    
	</head>
	<body>
		<div style='text-align:left;'>
			<h2 style='text-align:center;'>GliT Users Admin Table</h2>
			<h3 style='text-align:center;'>All users</h3>
			<div style='width:100%; margin:0 5px 5px 0; height:30vh; overflow:scroll;'>
	            <div style='display:flex; width:100%; background:#ccc; color:#2166f3;'>
                    <div style='width:30%; font-size:12px;'>User</div>
                    <div style='width:30%'>category</div>
                    <div style='width:20%'>view</div>
                    <div style='width:20%'>Approval</div>
				</div>";


//while( $n >= 0){
 foreach($userData as $n){

 $fn = $n['firstname'];
 $ln = $n['lastname'];
 $un = $n['username'];
 $pid = $n['profile_id'];
 $aoi = $n['aoi'];
 $xpt = $n['xpt'];
 $_all_specs = $usersView->generate_spec($pid, '');
 !empty($_all_specs) ? $all_specs = implode(', ', $_all_specs) : $all_specs = '';
//var_dump($_all_specs);
// implode(glue, pieces)
    $fullname = $usersView->decryptor0($fn).' '.$usersView->decryptor0($ln);
    $username = $usersView->decryptor0($un);


     if($xpt == 1){
        $admin .=   "<div style='display:flex; background:#eee; position:relative; top:3; justify-content:space-between; width:100%; margin-bottom:6px; padding:10px;'>
        <div style='width:30%; font-size:10px;'>".ucfirst($fullname)."<br>(@".$username.")</div>
        <div style='width:30%; font-size:10px;'>$all_specs</div>
        <div style='width:20%; font-size:10px;'><button>View</button></div>
        <div style='width:20%; font-size:10px;'><button>Approval</button></div>
        </div>";
    }
}
      $admin .="</div>";
       $admin.="<div style='width:100%; height:30vh; overflow:auto;'>
                       <div id='upgr_resp'></div>
                <h4 style='margin:2px; color:red; text-align:center;'>GliT Clients</h4>
                <div style='display:flex; justify-content:space-between; width:100%; background:#ccc; color:#2166f3;'>
                    <div style='width:50%; font-size:12px;'>Users(@uname)</div>
                    <div style='width:20%; font-size:12px;'>Verify App</div>
                    <div style='width:30%; font-size:12px;'>Upgrade</div>
                </div>";

$admin .= "<form id='upgrade_data' method='post' action='../includes/upgrade.inc.php'><input type='hidden' name='pid' id='pid' value='$pid'>";
foreach($userData as $n){
 $xpt = $n['xpt'];
 $fn = $n['firstname'];
 $ln = $n['lastname'];
 $un = $n['username'];
 $pid = $n['profile_id'];
 $aoi = $n['aoi'];

    $fullname = $usersView->decryptor0($fn).' '.$usersView->decryptor0($ln);
    $username = $usersView->decryptor0($un);
$professionalCert = $n['professional_cert'];

$professionalCert == 'applying' ? $profData = $usersView->select('application', ' WHERE applicant = ? ORDER BY app_id DESC', $pid) : $profData = '';
!empty($profData) ? $certificate = $usersView->enc_cons($profData[0]['cert']) : $certificate = '';

!empty($profData) ? $allCategory = $profData[0]['category'] : $allCategory = '';
!empty($allCategory) ? $allCategories = $usersView->generate_spec('', $allCategory) : $allCategories = '';
!empty($allCategories) ? $allCategories = implode(', ', $allCategories) : $allCategories = '';
!empty($allCategory) ? $allCategoryEnc = $usersView->enc_cons($allCategory) : $allCategoryEnc = '';

    $content = $usersView->makeTutorForm($pid);
    $admin .= $usersView->showModal2($content, 'dialog'.$pid, '', 'none');
$pidEnc = $usersView->encryptor0($pid);
    if($xpt == 0){
       $admin.="<div style='display:flex; width:100%; background:#eee; color:#2166f3; justify-content:center; align-items:center; margin-bottom:6px;'>
                    <div style='width:50%; font-size:12px;'>".$fullname." (".$username.")</div>
                    <div style='width:20%; font-size:12px;'>$allCategories&nbsp;&nbsp;<p><a href='proview.php?&cat=$allCategoryEnc&cert=$certificate&pid=$pid'>View</a></p></div>
                    <div style='width:30%; font-size:12px;'><span onclick='showForm($pid);' style='padding:2px; font-size:10px; background:green; color:#fff; border:1px solid green; border-radius:10px;'>Upgrade</span></div>
                </div>";
    }
}

$admin .='</form></div>';

$approvals = $usersView->select('publish', ' WHERE approval = ?', 0);
$a = count($approvals)-1;
$admin .= "<div style='margin-top:10px; height:40vh; overflow:auto; background:#eee;'>
              <h4>Newly Published</h4>";

while($a >= 0){
    $pubid = $approvals[$a]['pub_id'];
	$pub_id_enc = $usersView->encryptor0($pubid);
    $heading = $approvals[$a]['heading'];
    $admin .= "<div style='display:flex; margin:10px; font-size:14px; padding:10px; background:skyblue;'><div>".$heading."</div><a href='../index.php?page=peepChats&pub=".$pub_id_enc."' style='margin-left:auto;'>View</a><button style='margin-left:auto;' id='approve".$pubid."' onclick='approve($pubid);'>Approve</button></div>";
    
    $a--;
}

$admin .="</div>";



$admin .="
		<script src='../scripts/jquery-3.6.0.min.js'></script>
        <script src='../scripts/login.js'></script>
        <script src='../scripts/processor.js'></script>
   
		<script>
            function showForm(pid){
                $('#dialog'+pid).slideDown(20);
                document.getElementById('pid').value = pid;
            }
		    function approve(pubid){
		         $.ajax({
                    url: 'adminupdate.inc.php',
                    method: 'POST',
                    data: {pubid:pubid},
                    dataType:'json',
                    success: function(data){
                        var p = 'approve'+data.pubid;
                        document.getElementById(p).innerHTML = 'APPROVED';
                        document.getElementById(p).style.background = 'yellow';
                    },
                    error: function(data){
                    }
		         });
		       
		    }
		    function banThis(pid){
		         //this function is not used yet. Find a way to use it for banning users
                 $.ajax({
                    url: 'adminupdate.inc.php',
                    method: 'POST',
                    data: {pid:pid},
                    dataType:'json',
                    success: function(data){
                        var b = 'ban'+data.id;
                        document.getElementById(b).innerHTML = 'BANNED';
                        document.getElementById(b).style.background = 'red';
                 
                    },
                    error: function(data){
                    }
            
    });
    
		    }
		</script>
	</body>
</html>";
echo $admin;