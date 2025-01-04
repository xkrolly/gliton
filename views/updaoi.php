<?php
 $usersContr = new usersContr();
 $usersView = new usersView();


$page = "<div style='position:fixed; top:0; background:#fff; width:100%; margin-bottom:10px; padding:10px; z-index:2;'><form action='index.php?page=updaoi' method='post'><div>ADD to AOI</div>
            <p><input type='text' placeholder='Category' name='cat'>&nbsp;<input type='text' placeholder='Subcategory' name='subcat'>&nbsp;<input type='text' name='code' placeholder='Code'>&nbsp;<input type='text' name='specialist' placeholder='Specialist'>&nbsp;<input type='submit' name='insert' value='INSERT'/></p></form><br>";
            
$page .= "<form action='index.php?page=updaoi' method='post'>
            <div>UPDATE AOI</div>
            <p><input type='text' name='cat-u' placeholder='Category'>&nbsp;<input type='text' name='subcat-u' placeholder='Subcategory'>&nbsp;<input type='text' name='code-u' placeholder='Code'>&nbsp;<input type='text' placeholder='Specialist' name='specialist-u'>&nbsp;<input type='text' placeholder='AOI-id' name='aoiid-u'><input type='submit' name='update' value='UPDATE'/></p></form></div>";
        

if(isset($_POST['insert'])){
    $cat = $_POST['cat'];
    $subcat = $_POST['subcat'];
    $specialist = $_POST['specialist'];
    $code = $_POST['code'];
    
    $vals_chq = $cat.', '.$subcat.', '.$specialist;
    $rowaoi = $usersView->select('aoi', ' WHERE category = ? AND subcategory = ? AND specialist = ?', $vals_chq);
    
$vals = array('category'=>$cat, 'subcategory'=>$subcat, 'code'=>$code, 'specialist'=>$specialist);
count($rowaoi) == 0 ? $usersContr->insert('aoi', $vals) : '';
$page .= '<p style="color:green;">Insertion was successful</p>';

}

if(isset($_POST['update'])){
    $cat = $_POST['cat-u'];
    $subcat = $_POST['subcat-u'];
    $specialist = $_POST['specialist-u'];
    $code = $_POST['code-u'];
    $aoiId = $_POST['aoiid-u'];
    
    
    
$vals2 = $cat.', '.$subcat.', '.$code.', '.$specialist.', '.$aoiId;
$usersContr->update('aoi', 'category = ?, subcategory = ?, code = ?, specialist = ? WHERE aoi_id = ?', $vals2);
$page .= '<p style="color:blue;">UPDATE was successful</p>';
}

$page .="<div style='margin-top:45%; padding-bottom:100px;'>";
        $row = $usersView->select('aoi', ' WHERE aoi_id > ? ORDER BY aoi_id DESC', 0);
$n = count($row) - 1;
while($n >= 0){
$page .="<div style='display:flex; justify-content:space-evenly;'><div>".$row[$n]['aoi_id']."</div><div>".$row[$n]['category']."</div><div>".$row[$n]['subcategory']."</div><div>".$row[$n]['specialist']."</div></div>";

$n--;
}

$page .="</div>";
return $page;
