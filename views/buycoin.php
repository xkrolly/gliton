<?php
  $usersContr = new usersContr();
  $usersView = new usersView();
isset($_GET['price']) ? $price = $_GET['price'] : $price = 0;

$buyCoin = "<div style='width:100%; height:100vh; display:flex; justify-content:center; align-items:center; padding:30px;' class='pt1 pt2'>
                <div style='filter:drop-shadow(1px 1px 1px #aaa); background:#fff; padding:25px 40px 40px 40px; border-radius:10px; margin-top:5px; width:100%;'>
                    <form method='post' action='includes/buycoin.inc.php' role='form' style='width:100%; font-size:16px;'>
                        <h6 style='text-align:center;'><span style='background:green; color:#fff; padding:10px; border-radius:1px;'>Fund your wallet with GC</span></h6><br>
                        <div style='display:flex; flex-direction:column;'>
                            <input type='number' id='coinAmount' value='".$price."' oninput='computeValue()' name='amount' class='form-control property col-md-12' placeholder='1GC = #1000' style='font-size:12px; padding:5px; border:1px solid #aaa;'/>
                            <span style='color:red; font-size:12px; font-style:italic; margin-top:5px;' id='totalCoinValue'></span>
                    
                        </div><br>
                        <div style='display:flex; align-items:center;'>
                            <input type='submit' name='gcoin' value='Buy GC' style='font-size:14px; padding:10px; border-radius:5px;' class='theme'/>
                            <div style='height:20px; border:1px solid #2166f3; margin-left:40px; margin-right:40px;'></div>
                            <a href='index.php?page=scrolls'>Exit</a>
                        </div>
                    </form>
                    <script src='scripts/script.js'></script>
                    <script src='scripts/processor.js'></script>

                </div>
            </div>";
return $buyCoin;
//peepChats&pub=MzNIckprbVFmR3J0aGVL+SwrMDzVWgLp/FGz7PZIkgZxFxWlLKPww6OJ