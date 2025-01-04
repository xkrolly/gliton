function isOnline(rid){
    
    
        localStorage.setItem('rStatus'+rid, 0);
    
/*    $.ajax({
            url: 'includes/online.inc.php',
            method: 'POST',
            data: {type:'check', rid:rid},
            dataType:'json',
            success: function(data){
                var rstatus = data.rstat;
                var rid = data.rid;
                var drid = data.drid;
                
                var lifeNow = localStorage.getItem('rStatus'+rid);
                //, rstatus);
                var diff = rstatus - lifeNow;
                if(diff > 0){
                    //set new online stat
                    localStorage.setItem('rStatus'+rid, rstatus);
                    //set recipient as online
                    document.getElementById('indicator'+drid).style.background = '#4CBB17';//39FF14';
                    //check again            
                    //isOnline(rid);
                }else{ //set recipient as offline

                    isOnline(rid);
                
                    document.getElementById('indicator'+drid).style.background = '#bbb';
                    //document.getElementById('chatup'+drid).innerHTML = "<div style='display:inline; margin:auto 10px 5px auto; background:#00ff00; border:1px solid #000; font-size:12px; border-radius:5px; padding:6px;'><a href='index.php?page=fixappo&rid="+rid+"' style='text-decoration:none;'>Fix appointment</a></div>";
                }
            },
            error: function(data){
            }
            
    });*/
}

function o_ff(val){
         $.ajax({
            url: '../includes/online.inc.php',
            method: 'POST',
            data: {type:'upd', st:val},
            dataType:'json',
            success: function(data){
                var status = data.stat;
    localStorage.setItem('nowStatus', status);
            },
            error: function(data){
            }
            
    });
    
}

        o_ff(0);

    setInterval(function(){
        o_ff(0);
    }, 1000*10);
    
    
    
    function on(){
        o_ff(1);
    }
    function off(){
        o_ff(0);
    }
