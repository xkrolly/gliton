$('#seeder_pData').on('submit', function(event){
 // alert('i am in');
                event.preventDefault();
    //alert('i am in 2');

            $.ajax({
                url: 'includes/seeder.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    var cat = data.cat;
                    var que = data.que;
                    alert('SEEDER SUCCESS');
                },
                error: function(data){

                }
              });
            
});

$('#seed_stages').on('submit', function(event){
                event.preventDefault();
         
            $.ajax({
                url: 'includes/seeder.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    var cat = data.cat;
                    var que = data.que;
                    alert('SUCCESSFUL');
                },
                error: function(data){

                }
              });
            
});

$('#publish_data').on('submit', function(event){
                event.preventDefault();
         
            $.ajax({
                url: 'includes/seeder.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    var cat = data.cat;
                    var que = data.que;
                    alert('SUCCESSFUL2');
                },
                error: function(data){

                }
              });
            
});



$('#GlitCdata').on('submit', function(event){
                event.preventDefault();
         
            $.ajax({
                url: 'includes/buycoin.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    $('#'+data.dialog).hide();
                },
                error: function(data){

                }
              });
            
});

function computeValue(){
    var coinAmount = $('#coinAmount').val();
    
    var totalCoinValue = coinAmount * 1000;
    document.getElementById('totalCoinValue').innerHTML = 'Total: #'+totalCoinValue;

 }

function asset(){ 
   document.getElementById('asset').style.display = 'flex';
   document.getElementById('bookmark').style.display = 'none';
   document.getElementById('wallet').style.display = 'none';
  $('.acc_nav').css({'background':'#fff', 'font-weight':'normal'});
  $('#asst').css({'background':'#eee', 'font-weight':'bold'});
    
}

function bkmark(){ 
   document.getElementById('asset').style.display = 'none';
   document.getElementById('bookmark').style.display = 'flex';
   document.getElementById('wallet').style.display = 'none';
  $('.acc_nav').css({'background':'#fff', 'font-weight':'normal'});
  $('#bkmk').css({'background':'#eee', 'font-weight':'bold'});
    
}

 function wallet(){ 
   document.getElementById('asset').style.display = 'none';
   document.getElementById('bookmark').style.display = 'none';
   document.getElementById('wallet').style.display = 'flex';
      $('.acc_nav').css({'background':'#fff', 'font-weight':'normal'});
 $('#wlt').css({'background':'#eee', 'font-weight':'bold'});
 
}

function scrollDiv(_id){
    parseInt(_id) === 0 ? id1 = parseInt(_id) + 1 : id1 = parseInt(_id) - 1;
    id = 'scrollet'+id1;
   // alert(id);
    window.scrollTo(6000, findPosition(document.getElementById(id)) );
}

function findPosition(obj){
    var currenttop = 0;
    if(obj.offsetParent){
        if(obj == obj.offsetParent){
            currenttop +=obj.offsetTop;
        }
      /*  do{
            currenttop +=obj.offsetTop;
        } while((obj = obj.offsetParent));*/
        return [currenttop];
    }
}



function scrollDiv2(_id, dir){

      /*var elementTop= $('#'+id).offset().top;
      var viewportTop= $(window).scrollTop();*/

      var yy = localStorage.getItem('scrollY') 
      var _yy = window.scrollY;
      //yy > _yy ? _id = parseInt(_id) + 1 : _id = parseInt(_id) - 1;
      id = parseInt(_id) + parseInt(dir);
      id < 0 ? id = 0 : id;
      var id = 'scrollet'+id;

/*elementTop > viewportTop ? 
    parseInt(_id) == 0 ? _id = parseInt(_id) + 1 : _id = parseInt(_id) - 1;
*/
//alert(id);
    document.getElementById(id).scrollIntoView();

}


function createClass(aoid){
/*    $.ajax({
            url: 'views/createClassFm.php',
            method: 'POST',
            data: {aoid:aoid},
            dataType:'json',
            success: function(data){
                var xp = data.xid;
                if(data.status == 1 ){
                    $('#folo'+xp).fadeOut('3000');
                    //document.getElementById('#burp').play();  
                    document.getElementById('ttf'+xp).innerHTML = data.ttf;   
                
                }

            },
            error: function(data){
            }
            
    });*/
    window.location.href = 'newclass';
      
}
function prdIntrxnManager(pubid, int){

        var intStatus = $('#'+int+'Status').val();
        var focuspg = $('#focuspg').val();
        
        int == 'Fav' ? color = 'deepSkyblue' : color = 'red';
        intStatus == 1 ? color = color : color = '#fff';
        int == 'Like' ? document.getElementById('like').style.color = color : document.getElementById('favIcon').style.color = color;
        
        var total_Intrxns = $('#total_'+int+'s').val();
        total_Intrxns == '' ? total_Intrxns = 0 : total_Intrxns;

        intStatus == 1 ? nIntStatus = 0 : nIntStatus = 1;
        intStatus == 1 ? ntotal_Intrxns = parseInt(total_Intrxns) - 1 : ntotal_Intrxns = parseInt(total_Intrxns) + 1;
        ntotal_Intrxns < 0 ? ntotal_Intrxns = 0 : ntotal_Intrxns;
        int == 'Like' ? affix = 'L' : affix = 'F';
        var newFocus = $('#focuspg').val().replace(affix+'('+pubid+'.'+total_Intrxns+'.'+intStatus+')'+affix, affix+'('+pubid+'.'+ntotal_Intrxns+'.'+nIntStatus+')'+affix);
        document.getElementById('focuspg').value = newFocus;
        document.getElementById('total_'+int+'s').value = ntotal_Intrxns;
        document.getElementById(int+'Status').value = nIntStatus;

}


function likeDis(prdType){

    var prdid = $('#productID').val();
    var pubid = $('#pubID').val();

    prdIntrxnManager(pubid, 'Like');

    $.ajax({
            url: 'includes/like.inc.php',
            method: 'POST',
            data: {prdID:prdid, val:prdType},
            dataType:'json',
            success: function(data){
                var prd = data.prdid;
                var pubid = data.pubid;
                var ttl = data.ttl;

               if(data.status == 1 ){
                    document.getElementById('like').style.color = 'red';
                    document.getElementById('totalLikes').innerHTML = ttl;
                }
                else if(data.status == 0 ){
                    document.getElementById('like').style.color = '#fff';
                    document.getElementById('totalLikes').innerHTML = data.ttl;
                }

            },
            error: function(data){
            }
            
    });
}

function saveFav(prdType){
    //set in case of difficulty

    var prdid = $('#productID').val();
    var pubid = $('#pubID').val();

    prdIntrxnManager(pubid, 'Fav');

    $.ajax({
            url: 'includes/fav.inc.php',
            method: 'POST',
            data: {prdID:prdid, val:prdType},
            dataType:'json',
            success: function(data){
                var prd = data.prdid;
                var pubid = data.pubid;
                var ttf = data.ttf;
                if(data.status == 1 ){
                    document.getElementById('favIcon').style.color = 'deepskyblue';
                    document.getElementById('totalFavs').innerHTML = ttf;

/*                    var frontFavs = $('#frontFavs').val(); 
                    frontFavs != '' ? frontFavs = frontFavs+pubid+'_' : frontFavs = '_'+pubid+'_'; 
                    document.getElementById('frontFavs').value = frontFavs;
*/
                }
                else if(data.status == 0 ){
                    document.getElementById('favIcon').style.color = '#fff';
                    document.getElementById('totalFavs').innerHTML = ttf;

/*                    var frontFavs = $('#frontFavs').val();
                    frontFavs = frontFavs.replace('_'+pubid+'_', '_');
                    frontFavs == '_' ? frontFavs = '' : frontFavs;
                    document.getElementById('frontFavs').value = frontFavs;
*/
                }

            },
            error: function(data){
            }
            
    });
}


function foloDis(xpid){
    $.ajax({
            url: 'includes/folo.inc.php',
            method: 'POST',
            data: {xpt:xpid},
            dataType:'json',
            success: function(data){
                var xp = data.xid;
                if(data.status == 1 ){
                    $('#folo'+xp).fadeOut('3000');
                    $('.folo'+xp).fadeOut('3000');
                    //document.getElementById('#burp').play();  
                    document.getElementById('ttf'+xp).innerHTML = data.ttf;   
                
                }

            },
            error: function(data){
            }
            
    });
}

$('#createClassData').on('submit', function(event){
                event.preventDefault();
    $.ajax({
                url: 'includes/createClass.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    var classID = data.resp;
                    //alert('class created with lecture ID: '+resp);
                  
                  document.getElementById('class_response').innerHTML = 'Class created successfully. <a href="index.php?page=classes">Click here</a> to view the created class.';
                  $('#class_response').css({'color':'#fff', 'background':'green', 'margin-top':'10px', 'font-size':'12px', 'padding':'5px', 'overflow':'clear;'});
                },
                error: function(data){
                 /* $('#vericheck_upd').show();
                    $('#vericheck_upd').css({'background':'yellow', 'color':'red', 'font-size':'12px', 'margin-top':'20px', 'padding':'2px'});
                    $('#vericheck_upd').innerHTML = 'Error, Try again!';
                    document.getElementById('vericheck_upd').innerHTML = 'Error, Try again!';*/
                
                }
        });
});

$('#veriCert_data').on('submit', function(event){
            event.preventDefault();
    $.ajax({
                url: '../admin/vericheckConfirm.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                  $('#vericheck_upd').show();
                  document.getElementById('vericheck_upd').innerHTML = 'Vericheck mark successfully!';
                  $('#vericheck_upd').css({'color':'#fff', 'background':'green', 'margin-bottom':'20px', 'font-weight':'bold', 'margin-top':'20px', 'font-size':'12px', 'padding':'2px', 'margin-bottom':'-30px'});
                    $('.cats').prop('checked', false);
                },
                error: function(data){
                  $('#vericheck_upd').show();
                  $('#vericheck_upd').css({'background':'yellow', 'color':'red', 'font-size':'12px', 'margin-top':'20px', 'padding':'2px'});
                  $('#vericheck_upd').innerHTML = 'Error, Try again!';
                  document.getElementById('vericheck_upd').innerHTML = 'Error, Try again!';
                }
              });
});

$('#upgrade_data').on('submit', function(event){
                event.preventDefault();
         
            $.ajax({
                url: '../includes/upgrade.inc.php',
                method: 'post',
                data: new FormData(this),
                dataType:'json',
                contentType: false,
                cache: false,
                processData: false,
                success: function(data){
                    $('#'+data.dialog).hide();
                  document.getElementById('upgr_resp').innerHTML = 'Account upgraded successfully!';
                  $('#upgr_resp').show();
                  $('#upgr_resp').css({'color':'#fff', 'background':'green', 'font-weight':'bold', 'margin-top':'20px', 'font-size':'12px', 'padding':'2px', 'margin-bottom':'-30px'});
                },
                error: function(data){
                  $('#upgr_resp').show();
                  $('#upgr_resp').innerHTML = 'Error, Try again!';  
                  $('#upgr_resp').css({'background':'yellow', 'color':'red', 'padding':'2px'});
                }
              });
            
});



function fixappo(n, cat, a){
    //alert('My Appointment fixed at '+n);
    a == 'viewinurl' ? urlPrefix = '../' : urlPrefix='';
    $.ajax({
            url: urlPrefix+'includes/fixappo.inc.php',
            method: 'POST',
            data: {appofix:n, cat:cat},
            dataType:'json',
            success: function(data){
                data.resp == 1? resp = 'Appointment fixed successfully' : (data.resp== 2 ? resp='This is no longer available! kindly pick another.' : resp='');
                document.querySelector('#apporesp').innerHTML = resp;
                if(data.resp == 1){
                    document.getElementById('appo'+data.appo).setAttribute("disabled", '');
                }
                else{
                document.querySelector('#apporesp').style.background = 'yellow';
                document.querySelector('#apporesp').style.color = 'red';
    
                }
    
                document.querySelector('#apporesp').style.display = 'inline';
            },
            error: function(data){
                document.querySelector('#apporesp').innerHTML = 'Appointment fixing failed!!!';
            }
            
    });
    
}
 


$('#vericheck_data').on('submit', function(event){
        event.preventDefault();
    $.ajax({
        url: 'includes/vericheck.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
          $('#vericheck_resp').show();

          document.getElementById('vericheck_resp').innerHTML = 'Your application for a verification label is successful. You will be notified via your inbox within 72hrs after it is vetted by the Admin. Thanks.';

          $('#vericheck_resp').css({'color':'#fff', 'background':'green', 'font-weight':'bold', 'margin-top':'20px', 'font-size':'12px', 'padding':'10px', 'margin-bottom':'-30px'});
        },
        error: function(data){
          $('#vericheck_resp').show();
          $('#vericheck_resp').innerHTML = 'Error, Try again!';  
          $('#vericheck_resp').css({'background':'yellow', 'color':'red', 'padding':'2px'});
        }
    });
    

});

$('#sub_data').on('submit', function(event){
        event.preventDefault();
 
    $.ajax({
        url: 'includes/sub.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
            var cat = data.cat;
            var charges = data.charges;
            var url = data.url;
            var val = data.val; 
            var prdID = data.prdID;
            var sub_cat = data.sub_cat;
            var dur = data.dur;
            var email = data.email;
            var contact = data.contact;
            var fullname = data.fullname;
           window.src='https://checkout.flutterwave.com/v3.js';
                    
            pay(cat, charges, email, contact, fullname, url, val, prdID);

            var subDur = data.dur;
            subDur == 1 ? subType = 'Basic' : (subDur == 2 ? subType = 'Deluxe' : subType = 'Premium');

          document.getElementById('sub_resp').innerHTML = 'A sum of '+charges+' will be charged for your <span style=\'font-weight:bold;\'>'+subType+' plan</span> subscription!';
          $('#sub_resp').show();
          $('#sub_resp').css({'color':'green', 'margin-top':'20px', 'font-size':'12px', 'padding':'2px 5px 2px 10px;'});
        },
        error: function(data){
          $('#sub_resp').show();
          document.getElementById('sub_resp').innerHTML = 'Your subscription failed!';  
          $('#sub_resp').css({'color':'red', 'margin-top':'20px', 'font-size':'12px', 'padding':'2px 5px 2px 10px;'});
              setInterval(function(){
              window.location.href = 'sub';
        }, 1000*2);
//          document.getElementById('sub_resp').innerHTML = 'Error, Try again!';  
//          $('#sub_resp').css({'background':'yellow', 'color':'red', 'padding':'2px'});
        }
      });
    
  });

  $('#appo_data').on('submit', function(event){
        event.preventDefault();
 
    $.ajax({
        url: 'includes/saveappo.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
           // localStorage.setItem(data.appoday, data.appocal);
            
          document.getElementById('appoReply').innerHTML = 'Appointment saved!';
          $('#appoReply').show();
          $('#appoReply').css({'color':'green', 'font-weight':'weight', 'padding':'2px', 'margin-bottom':'-30px'});
        },
        error: function(data){
          $('#appoReply').show();
          $('#appoReply').innerHTML = 'Error, Try again!';  
          $('#appoReply').css({'background':'yellow', 'color':'red', 'padding':'2px'});
        }
      });
    
  });


function switchMe(val){
         $.ajax({
            url: '../includes/switch.inc.php',
            method: 'POST',
            data: {newStat:val},
            dataType:'json',
            success: function(data){
                window.location.href = 'index.php';
            },
            error: function(data){
                alert('switch failed');
            }
            
    });
    
}

//GET OTP3
function getOTP3(){
      var mobileNum = $('#mobileNum').val();
      var OTP = '1357';
     $.ajax({
            url: 'msg.messaggio.com/api/v1/send',
            method: 'POST',
            data:     {
                  "recipients": [
                    {
                      "phone": mobileNum
                    }
                  ],
                  "channels": [
                    "sms"
                  ],
                 
                  "sms": {
                    "from": "Glit",
                    "content": [
                      {
                        "type": "text",
                        "text": "Your Glit OTP is "+OTP
                      }
                    ]
                  },
                 
                },
            dataType:'json',
            success: function(data){
               var resp = data.resp;
                //resp(resp);
                alert('OTP sent to your mobile. Retrieve for confirmation.')
            },
            error: function(data){
                
            }
            
    });
    
}



//OTP codes
function getOTP(){
      var mobileNum = $('#mobileNum').val();
    
     $.ajax({
            url: 'getotp.inc.php',
            method: 'POST',
            data: {mobileNum:mobileNum},
            dataType:'json',
            success: function(data){
               var resp = data.resp;
                //resp(resp);
                alert('OTP sent to your mobile. Retrieve for confirmation.')
            },
            error: function(data){
                
            }
            
    });
    
}

function selectThis(val){
    document.getElementById('category').value = val;
}
//category selection
function showSublist(){
    var topic = document.getElementById('topic').value;
    var output;
    switch(true){
        case topic =='a':
              output = '<div class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;"><input type="hidden" name="categoryval" id="categoryval">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(1)" value="1">&nbsp;&nbsp;Agrochemicals</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(2)" value="2">&nbsp;&nbsp;Seed</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(3)" value="3">&nbsp;&nbsp;Farm machinery</label>'+
              '</p>'+
            '<p class="list-ring">'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(4)" value="4">&nbsp;&nbsp;Plant diseases</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(5)" value="5">&nbsp;&nbsp;Farm operations</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(6)" value="6">&nbsp;&nbsp;Agro market</label>'+
               '</p></div></div>';
              break;
        case topic == 'b':
                output = '<div  class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(11)" value="11">&nbsp;&nbsp;Poultry</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(12)" value="12">&nbsp;&nbsp;Pet</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(13)" value="13">&nbsp;&nbsp;Ruminants</label>'+
              '</p>'+
            '<p class="list-ring">'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(14)" value="14">&nbsp;&nbsp;Fish</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(15)" value="15">&nbsp;&nbsp;Feed formulation</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(16)" value="16">&nbsp;&nbsp;Others</label>'+
               '</p></div></div>';
              break;
        case topic == 'c':
              output = '<div class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(21)" value="21">&nbsp;&nbsp;General Health</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(22)" value="22">&nbsp;&nbsp;Infertility</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(23)" value="23">&nbsp;&nbsp;Diabetes</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(24)" value="24">&nbsp;&nbsp;Hepatitis</label>'+
              '</p>'+
            '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(25)" value="25">&nbsp;&nbsp;Protein alergy</label>'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(26)" value="26">&nbsp;&nbsp;Obesity/Weightloss</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(27)" value="27">&nbsp;&nbsp;Sickle cell</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(28)" value="28">&nbsp;&nbsp;Hypertension</label>'+
               '</p></div></div>';
              break;
        case topic == 'd':
              output = '<div class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(31)" value="31">&nbsp;&nbsp;Academic career</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(32)" value="32">&nbsp;&nbsp;Life career</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(33)" value="33">&nbsp;&nbsp;Relationship/Marriage</label>'+
            
              '</p>'+
            '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(34)" value="34">&nbsp;&nbsp;Business/Marketing</label>'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(35)" value="35">&nbsp;&nbsp;Psychology/Therapy</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(36)" value="36">&nbsp;&nbsp;Scholarship abroad</label>'+
               '</p></div></div>';
              break;
        case topic == 'e':
              output = '<div class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(41)" value="41">&nbsp;&nbsp;Local dishes</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(42)" value="42">&nbsp;&nbsp;Snacks</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(43)" value="43">&nbsp;&nbsp;Grills & Fries</label>'+
            
              '</p>'+
            '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(44)" value="44">&nbsp;&nbsp;Continental soups & sauce</label>'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(45)" value="45">&nbsp;&nbsp;Bakery</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(46)" value="46">&nbsp;&nbsp;Others</label>'+
               '</p></div></div>';
              break;
        case topic == 'f':
              output = 'i am F';
              break;
        case topic == 'g':
              output = 'i am G';
              break;
        case topic == 'h':
              output = 'i am H';
              break;
        case topic == 'i':
              output = 'i am I';
              break;
        case topic == 'j':
              output = '<div class="cat-list-panel"><h6 style="font-weight:bold;">Select a topic</h6><hr>'+
              '<div style="display:flex; width:100%;">'+
              '<p class="list-ring">'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(91)"  value="91">&nbsp;&nbsp;Automobile purchase</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(92)" value="92">&nbsp;&nbsp;Automobile repair(minor)</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(93)" value="93">&nbsp;&nbsp;Automobile repair (major)</label>'+
              '</p>'+
            '<p class="list-ring">'+
                '<label><input type="radio" name="category" class="category" onclick="selectThis(94)" value="94">&nbsp;&nbsp;Automobile auction</label>'+
              '<label><input type="radio" name="category" class="category" onclick="selectThis(95)" value="95">&nbsp;&nbsp;Automobile swap</label>'+
               '</p></div></div>';
              break;
        case topic == 'k':
              output = 'i am K';
              break;
        case topic == 'l':
              output = 'i am L';
              break;
        case topic == 'm':
              output = 'i am M';
              break;
        case topic == 'n':
              output = 'i am N';
              break;

    }
  document.getElementById('subList-panel').innerHTML = output;  
}

//notification
    function updateNotifications(category='newMsg'){
       category = $('#category').val();
      var catID_val = $('#colval').val();
      var colID = $('#col_id').val();
      
        $.ajax({
            url: 'notifyMe.php',
            method: 'GET',
            data: {getCat: category, catid: catID_val, colid:colID},
            dataType:'json',
            success: function(data){
              if(data.request > 0){
                    clearInterval(noteInterval);
              colorNoteDisplay();
                $('#notePanel').css('display', 'flex');
                document.getElementById('newQ').innerHTML=data.request;
                document.getElementById('enq').innerHTML=data.q;
                document.getElementById('enqCat').innerHTML=data.category;

              }else{
                    $('#notePanel').css('display', 'none');
                    clearInterval(noteInterval);
              }
            }
        });
    }
     var noteInterval='';
      //  updateNotifications();
        
        /*setInterval(function(){
            updateNotifications();
        }, 1000*5);*/

/*function colorNoteDisplay(){
noteInterval+=setInterval(function(){
  $('#rH').val() == '#fff' ? $('#responseFormHeader').css({'background':'green', 'color':'#fff'}) :  $('#responseFormHeader').css({'background':'#fff', 'color':'green'});
  $('#rH').val() == '#fff' ? $('#rH').val('green') : $('#rH').val('#fff');
  document.getElementById('playnote').play();
}, 500);

};*/

/* var inputIdArr = []; var selectIdArr = [];
ajaxSubmitter('#session_data', 'includes/buysession.inc.php', selectIdArr, inputIdArr);

$(document).on('click','#proceedtopay', function(){ 
  $('#sessionForm').hide();
  $('#session_data').show();
  var tobuy = $('#sessToBuy').val();
  $('#sessNum').val(tobuy);
  var total_purchase = tobuy * 1; 
  document.getElementById('sess_amount').innerHTML = '$'+total_purchase+' USD'; 
  
});

autocomplete='off' pattern='^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[\W]).*$' title='Password must be 8 or more characters with at least one number, an upper case letter, and one special character'
*/

/*var inputIdArr = []; var selectIdArr = [];
ajaxSubmitter('#search_data', 'includes/searchresults.inc.php', selectIdArr, inputIdArr);
*/

var inputIdArr = []; var selectIdArr = [];
ajaxSubmitter('#profile_data', 'includes/setprofile.inc.php', selectIdArr, inputIdArr);
ajaxSubmitter('#admin_approval', 'admin/adminpub.php', selectIdArr, inputIdArr);


$('#search_data').on('submit', function(event){
    event.preventDefault();

    $.ajax({
        url: 'includes/fetchSearch.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){

            var wordinput =data.wordinput;
            var total =data.total;
            var heading =data.heading;
            var sender = data.sender;
            var recipient = data.recipient;
            var conv_id = data.conv_id;
            var pub_id = data.pub_id;
            var xpt = data.xpt;
            var tutor = data.tutor;
            var published = data.published;
            var price = data.price;
            var thumbnail = data.thumbnail;
            var thumbnail_Dir = data.thumbnail_Dir;
            var media = data.media;

            document.getElementById('searchPanel').style.background = '#fff';
            document.getElementById('searchPanel').style.padding = '10px';
        document.getElementById('glitsearch').style.display = 'block';

        document.getElementById('glitsearch').innerHTML = "<div onclick=$('#searchPanel').slideUp('slow'); style='width:100%; display:flex; justify-content:flex-end; align-items:center;'><a href='' style='color:red;'><span class='material-icons' style='margin-left:auto; align-self:center; font-size:18px; color:#444;'>&#xe5c9;</span></a></div>"+
        "<div style='width:100%; margin-top:10px; display:flex; justify-content:center; font-style:italic; font-weight:800; color:#fff; display:flex; align-items:flex-end;'><span style='color:#fff; margin-right:6px; font-size:25px; text-shadow:.5px .5px #333;'>Glit search</span></div>";
            var page = '<div style="position:fixed; top:0; bottom:0; left:0; overflow:auto; display:flex; justify-content:flex-start; align-items:flex-start; content-visibility:auto; z-index:18; background:#fff; width:100vw; padding:30px;">';
             page += '<div style="background:#fff; margin-top:220px; width:100%; text-align:right;"><div style="text-align:right; margin-right:10px; margin-bottom:-5px;">';
             
      
            if(total < 1){
              page += "<br><br><br><div style='color:red; font-size:16px; text-align:center;'>No match found !!</div>";
            }else{

                    page +="<div style='display:flex; flex-wrap:wrap; flex-direction:row;'>";
                while(total > 0){
                    var mediaDisplay = '';
                    media[total - 1] == 3 ? mediaDisplay += "<video autoplay class='flexible2' id='"+pub_id[total - 1]+"' style='border-radius:5px; width:80px; height:100px; object-fit:cover; background:red;' src='videos/"+thumbnail_Dir[total - 1]+"/dec/"+thumbnail[total - 1]+".webm'></video>" : mediaDisplay +="<img class='flexible' id='"+pub_id[total - 1]+"' style='border-radius:5px; width:80px; height:100px; object-fit:cover; background:red;' src='img/"+thumbnail_Dir[total - 1]+"/"+thumbnail[total - 1]+".webp' />";                   
                        page +="<div style='margin:10px 3px 30px 3px; display:flex; flex-direction:column;'>"+mediaDisplay+
                        "<figcation style='font-size:9px; pointer-events:none; color:#fff; text-align:center; text-shadow:.5px .5px #2166f3; width:80px; height:100px; padding:5px; margin-top:-100px; z-index:30; display:flex; justify-content:center; align-items:center;'><a style='pointer-events:auto; color:#fff;' href='index.php?page=peepChats&pub="+pub_id[total - 1]+"&published="+published[total - 1]+"&convid="+conv_id[total - 1]+"&s="+sender[total - 1]+"&r="+recipient[total - 1]+"'>"+heading[total-1]+"</a></figcaption></div>";

                  total--;
                }
            }
            page +='</div></div></div>';

          $('#search_results').html(page);
        },
        error: function(data){
           page = "<hr><div id='wrong' onclick=$('#wrong').hide() style='background-color:white; text-align:center; border:1px solid #ccc; border-radius:10px'>Something went wrong, please try again!</div>";
           $('#search_results').html(page);
        }
    });
  });


////////////////////////////  END OF SEARCH   ////////////////////

$(document).on('click','.forceRegCompletion', function(){ 
  $('#completeReg').show();
});



  $(document).on('click','#savelogindata', function(){
 //  $(document).on('submit','#completeReg_data', function(){
     event.preventDefault();

       var pass_word= $('#pass-word').val();
       var pass_wordd=$('#pass-wordd').val();
       var user= $('#user').val();

  if( user != '' && pass_word == pass_wordd && pass_word.length >= 8){
   
   $('#passphrase').val(pass_word);
   $('#username').val(user);
      $('#completereg-fm-a').css('display','none');//hide();
      $('#completereg-fm-b').css('display','block');//.show();
      $('#b1').css('background','#2196f3');
      $('#c2').css('background','#2196f3');

    }
    else if(user == '' || pass_word != pass_wordd || pass_word.length < 8) {
        if(pass_word != pass_wordd || pass_word.length < 8){
           $('#pass-word').css('border', '3px solid red'); 
           $('#pass-wordd').css('border', '3px solid red'); 
          pass_word.length < 8 ? document.getElementById('check_pass-word').innerHTML='<span style="color:red; font-size:10px;">Minimum of 8 characters required!</span>' :
          (pass_word != pass_wordd ? document.getElementById('check_pass-word').innerHTML='<span style="color:red; font-size:10px;">Passwords do not match!</span>' : '');
        }
      if(user == ''){
        document.getElementById('check_uname').innerHTML='<span style="color:red; font-size:10px;">Username is empty!, </span>';
       $('#user').css('border', '3px solid red'); 

      }    
    }

     
  });

  $(document).on('click','#savelogindatab', function(){
     event.preventDefault();

     var un=$('#username').val();
     var pw=$('#passphrase').val();
     var fn = document.getElementById('fname').value;
     var sn=document.getElementById('sname').value;
     var email = document.getElementById('regcontact').value;
   
     if(fn!='' && sn!='' && email!=''){
         $('#completereg-fm-b').hide();
         $('#completereg-fm-c').show();
         $('#b2').css('background','#2196f3');
         $('#c3').css('background','#2196f3');

        document.getElementById('reg-detail').innerHTML='<p>Firstname: <strong>'+fn+'</strong></p>'+
            '<p>Lastname: <strong>'+sn+'</strong></p>'+
            '<p>username: <strong>'+un+'</strong></p>'+
            '<p>Password: *********</p>'+
            '<p>Email: <strong>'+email+'</strong></p>';
         
         $('#pass-phrase').val(pw);
         $('#user-name').val(un);
         $('#first-name').val(fn);
         $('#last-name').val(sn);
         $('#con-tact').val(email);
     }else{
        $('#fn').css('border', '1px solid red');
        $('#sn').css('border', '1px solid red'); 
        $('#con-tact').css('border', '1px solid red'); 
      document.getElementById('check_contact').innerHTML='<span style="color:red; font-size:10px;">All form fields required!</span>';

      }
  });

$(document).on('click', '#cancelreg-fm', function(){
  $('#completereg-fm-b').show();
  $('#completereg-fm-c').hide();
     $('#b2').css('background','#eee');
     $('#c3').css('background','#eee');
  
  
})
$(document).on('click','#saveSettings', function(){
  ajaxSubmitter('#settingFm', 'views/setSettings.php');
});



     $('#completeReg_data').on('submit', function(event){
        event.preventDefault();
 var inputIdArr = ['username', 'passphrase', 'fname', 'sname', 'regcontact'];
 var selectIdArr = [];
 var detectError = validate(selectIdArr, inputIdArr);

if(detectError == 0){

      var prv = gen_priv();
      var pwd = document.getElementById('pass-phrase').value;
      var un = document.getElementById('user-name').value;
      var fn = document.getElementById('first-name').value;
      var ln = document.getElementById('last-name').value;
      var email = document.getElementById('con-tact').value;

      var un = un.toLowerCase(); 
      localStorage.setItem("un", un);

      var enc_pwd = sym_encrypt(pwd, un);
      var pwd_enc_prvK = sym_encrypt(prv, pwd);
      var pub = gen_pub(pwd_enc_prvK, enc_pwd);

      $('#mypub').val(pub);
      $('#enc_pwd').val(enc_pwd);
      $('#prv').val(pwd_enc_prvK);
      
      localStorage.setItem("mypub", pub);
      localStorage.setItem("prv", pwd_enc_prvK);
      localStorage.setItem("encP", enc_pwd);
 
    $.ajax({
        url: 'includes/completeReg.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
          window.location.href='index.php';

          var msg = data.ajaxReply;
          var bgcolor = 'green';
          var id= 'reply';
          $('#completeReg').hide();
          response(msg, bgcolor);
          
        },
        error: function(data){
          var msg='Attempt failed, please try again!';
          var bgcolor='red';
          var id='';
          response(msg, bgcolor);
        }
      });
    }
  });

function enc_que(que, xpid, xptid){
    var shrd = localStorage.getItem('shrd'+xpid);
   // alert('encQ shrd: '+shrd);
    var encQ = sym_encrypt(que, shrd);

    $('#que'+xptid).val(encQ);
}

//post solo
function proceedWithUpload(cid, cat_t, que){
  document.getElementById('cancel').style.display = 'none';
  document.getElementById('canvas').style.display = 'none';
  var mediaProof = $('#mediaproof').val();
  var mediaType = $('#mediaType').val();
  var chid = $('#chat_id').val();
  
  var cat = $('#category').val();
  var directory = $('#dir').val();
  
  var xhr=new XMLHttpRequest();
  var fd=new FormData();
  fd.append("cat", cat);
  fd.append("mediaType", mediaType);
  fd.append("cid", cid);
  
  xhr.open("POST", "includes/setsoloenq.inc.php", true);
  xhr.send(fd);

  $('#dashboard').slideDown(500);

    var div = document.createElement("div");
    var span = document.createElement("span");
      span.setAttribute("id", "span");
      div.setAttribute("id", "each-section");
      div.setAttribute("style", "display:flex; justify-content:center; font-size:16px; margin-right:0; margin-bottom:7px;");

          var div2 = document.createElement("div");
      div2.setAttribute("style", "width:100%;");
      div.appendChild(div2);
      
          var div3 = document.createElement("div");
      
      div3.setAttribute("style", "color:#000; background:#fff; width:100%;");
      div3.setAttribute("id", "chatmsg");
      
      div2.appendChild(div3);
      var output = "<div style='position:relative;'>";
      mediaType == 2 ? 
      output += "<img id='s"+cid+"' src='img/"+directory+"/"+que+".webp' style='width:100%; height:500px; object-fit:cover;' class='flexible' load='lazy' />" : 
      (mediaType == 3 ? output += "<video class='flexible2'><source src=''></video>" : output +="");
      
      var dateNow = new Date().toLocaleString('ng', {
          year:'numeric',
          month:'2-digit',
          day:'2-digit',
          hour:'2-digit',
          minute:'2-digit',
          second:'2-digit',
          hour12:true
      });
    var dateForID = Date.now();

                               output +=" <figcaption id='ins"+dateForID+"' style='font-size:14px; height:100%; position:absolute; top:0; left:0; display:none; justify-content:center; align-items:center; width:100%;'>"+
                                        "<div style='display:flex; flex-direction:column; z-index:10; width:100%; color:#fff; text-shadow:1px 1px #222; height:500px;'>"+
                                            "<div style='border-top-right-radius:20px; border-top-left-radius:20px; padding:20px; width:100%; margin-top:auto; padding-bottom:50px; text-align:justify;  background:rgba(255, 255, 255, .05);'>"+
                                                                "<div onclick='$(\"#ins"+dateForID+"\").slideUp(1000);' style='display:flex; justify-content:center; margin:0 auto 20px auto;'>"+
                                                                    "<div onclick='$(\"#ins"+dateForID+"\").slideUp(1000);' style='height:4px; width:30px; background:#fff; border:1px solid #fff; border-radius:20px;'>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                    "<div id='cntted"+dateForID+"' contenteditable='true' onclick='clearContent(\"cntted"+dateForID+"\");' style='width:100%;'>Add a concise and descriptive insight to this scrollet."+
                                                    "</div>"+
                                                    "<p style='text-align:center; margin:25px auto 5px auto;'><span style='color:yellow;' onclick='addContent(\"cntted"+dateForID+"\");'>Add</span></p>"+
                                          "</div>"+
                                        "</div>"+
                                    "</figcaption></div>";

output +="<div style='display:flex; align-items:center; justify-content:center; padding-bottom:-5px;'>"+
                                     "<div style='font-size:10px; color:#000; margin-left:5px;'>"+dateNow+"</div>";

                               if(mediaType == 2 || mediaType == 3){
                                   output +="<span style='font-size:14px; margin-left:auto; margin-right:10px;' onclick='$(\"#ins"+dateForID+"\").slideDown();' class='material-icons'>&#xe8fe;</span>";
                                }
                                output +="</div>";
                                
      document.getElementById('all_chat').appendChild(div);
//      var node = document.createTextNode(output);
document.getElementById('chatmsg').innerHTML = output;
//img/vet/U2FsdGVkX19uyjAeMCrwbBIn2sNHqJLYI884gXSD_JheAK6NL_NfHo+hMVw_MYIX.webp

//      span.appendChild(node);
      var div4 = document.createElement("div");
      div3.appendChild(div4);
                  window.scrollBy(-200000000000000,20000000000000000000);
document.getElementById('chatmsg').setAttribute('id', '');
////////////release camera

}



$(document).ready(function(){

$('#enquiry_data').on('submit', function(event){ 
    event.preventDefault();
if( $('#enquiry').val() !='' || $('#upload').val() != '' || $('#useVoicenote').val() != '' ){
    $('.fa-microphone, .fa-paperclip').show();
    $('#enquiry').css('width', '70%');
    
    var rid_enc_cons = localStorage.getItem('rid_enc_cons');
    var shrdk = localStorage.getItem('shrd'+rid_enc_cons);
    var m_sg = $('#enquiry').val();
    var c_id = $('#cid').val();

      if( m_sg !=''){
//alert(m_sg+'=='+shrdk);
          var _m_sg = sym_encrypt(m_sg, shrdk);
          document.getElementById('encmsg').value = _m_sg;
        }
      var div = document.createElement("div");
      var span = document.createElement("span");
      span.setAttribute("id", "span");
      div.setAttribute("id", "each-section");
      div.setAttribute("style", "filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; font-size:16px; margin-right:10px; margin-bottom:8px;");

          var div2 = document.createElement("div");
      div2.setAttribute("style", "max-width:80%;");
      div.appendChild(div2);
      
          var div3 = document.createElement("div");
      
      div3.setAttribute("style", "color:#000; background:#fff; padding:10px; border-radius:20px 20px 0 20px; width:100%;");
      div3.setAttribute("id", "chatmsg");
      
      div2.appendChild(div3);
//alert('pro: '+c_id);
//      m_sg!=='' ? document.getElementById('chats'+c_id).appendChild(div) : x=0;
      m_sg!=='' ? document.getElementById('all_chat').appendChild(div) : x=0;
      var node = document.createTextNode(m_sg);
      span.appendChild(node);
      var div4 = document.createElement("div");
      div3.appendChild(div4);
      
    //adding the quote to the msg
    var a = document.createElement("a");
    var uniq = $('#msgReply').val();

    a.setAttribute("id", "reply"+uniq);
    a.setAttribute("href", "#"+uniq);
    var quote = $('#quote').val();
    var node = document.createTextNode(quote);
    a.setAttribute("style", "color: rgb(0, 0, 0); text-decoration: none; font-size: 14px; text-align: justify; border-radius: 7px; padding: 3px; background: rgb(238, 238, 238)");
    quote.length > 0 ? div4.appendChild(a) : ''; 
    div3.appendChild(span);
     
    quote.length > 0 ? document.getElementById('reply'+uniq).innerHTML = quote : '';
    //alert(quote.length);
    quote.length > 0 ? document.getElementById('reply'+uniq).removeAttribute('id'): '';
     document.getElementById('replyPanel').style.display = 'none';
     document.getElementById('quote').value = '';
   
                  window.scrollBy(-200000000000000,20000000000000000000);
   
var category = $('#category').val();
  if(category==''){
    alert('Select a topic first');
    event.preventDefault();
  }
  else{
    var chatpop = $('#chatpop').val();
    chatpop == 'duo' ? path = '../' : path = '';
    
    $.ajax({
        url: path+'includes/setenquiry.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
            localStorage.setItem('uploadID', data.n);

            /*document.getElementById('encmsg').value='';
            document.getElementById('upload').value='';*/
        
             $('#encmsg').value = '';
             $('#upload').value = '';
             $('#enquiry_data')[0].reset();
             $('#textQ').value = '';
        },
        error: function(data){
          $('#enquiry_data')[0].reset();
        }
      });
   }
  }


 
//}else{alert('Input your question first!');}
  });
});
