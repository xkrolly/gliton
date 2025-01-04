/*$('#recordAudio').on('click', function(){ 
  $('.each-audio').stop();  //stop all audios
  document.getElementById('setInner').innerHTML = "<span class='material-icons' style='font-size:26px;' id='stopRecord'>&#xe163;</span>";
  document.getElementById('post_enq').setAttribute("id", "stopRecord");
  document.getElementById('enquiry').value = '';
  var stopButton = document.getElementById("stopRecord");
  stopButton.addEventListener("click", stopAudioRecording);

  $('#mic').css('color', '#0f0');
  document.getElementById('cancelAudio').style.display = 'flex';
  $('#stopRecord').css({'color':'#fff', 'flex-direction':'column', 'background':'red', 'justify-content':'center'});
  startCount('activeTimer', 'timerDiv');

  audioRecording();

 });

$('#recordSoloAudio').on('click', function(){ 
  document.getElementById('mic').setAttribute('class', 'fa fa-paper-plane');
  document.getElementById('recordSoloAudio').parentNode.setAttribute('id', 'stopBtn');
  //document.getElementById('setInner').innerHTML = "<span class='material-icons' style='font-size:26px;' id='stopRecord'>&#xe163;</span>";

  $('#mic').css('color', '#0f0');
  document.getElementById('cancelAudio').style.display = 'flex';
  $('#stopRecord').css({'color':'#fff', 'flex-direction':'column', 'background':'red', 'justify-content':'center'});
  startCount('activeTimer', 'timerDiv');

  audioRecording();

 });

$('#stopBtn').on('click', function(){ 
//  document.getElementById('mic').setAttribute('class', 'fa fa-microphone');
  document.getElementById('stopRecord').innerHTML = "<i class='fa fa-microphone' id='mic' style='font-size: 33px; color: rgb(0, 255, 0); filter: drop-shadow(rgb(68, 68, 68) 0.5px 0.5px 0.5px);'></i>";

  document.getElementById('setInner').innerHTML = "";

  $('#mic').css('color', '#fff');
  document.getElementById('cancelAudio').style.display = 'none';
  $('#stopRecord').css({'flex-direction':'column', 'justify-content':'center'});
  document.getElementById('timerDiv').style.display = 'none';
 });*/

//var pauseButton = document.getElementById("pauseButton");

//add events to those 2 buttons
/*recordButton.addEventListener("click", audioRecording);
stopButton.addEventListener("click", stopRecording);
*///pauseButton.addEventListener("click", pauseRecording);

/*----------------------------Image HAndler--------------------------*/
function cancelUpload(){
  var mdia = $('#mediaproof').val();
  var mdiaTyp = $('#mediaType').val();
      var xhr=new XMLHttpRequest();
  
  var fd = new FormData();
  fd.append("upload", mdia);
  fd.append("mediaType", mdiaTyp);
            xhr.open("POST", "views/cancel_upload.php", true);
            xhr.send(fd);
  document.getElementById('canvas').style.display = 'none';
  document.getElementById('cancel').style.display = 'none';
  document.getElementById('mediaproof').value = '';
  document.getElementById('mediaType').value = '';

}

function proceedUpload(){
  document.getElementById('cancel').style.display = 'none';
}

function useCamera(){
  var category = document.querySelector('input[name="category"]:checked');
  if(category){
    $('#textQ').show();
    accessCamera();
  }
  else{
    alert('Select a topic first');
  }
}


function loadImg(){
    var i = document.getElementById('upload').files.length;
    n = parseInt(i) - 1;
    localStorage.setItem('uploadID', n);

    while(n>=0){
            var div = document.createElement("div");
            div.setAttribute("id", "imagediv"+n);
        if( document.getElementById('upload').value !== '' ){
          div.innerHTML = "<div style='display:flex;'><div id='inloader' style='margin:20px 30px auto auto;'></div></div>";
        }

            var c_id = $('#cid').val();
            document.getElementById('all_chat').appendChild(div);
//            document.getElementById('chats'+c_id).appendChild(div);
        
            document.getElementById('imagediv'+n).setAttribute('style', 'filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; font-size:16px; margin-right:10px; margin-bottom:10px;');
            document.getElementById('imagediv'+n).innerHTML = '<div id="chatmsg'+n+'" style="max-width:80%; min-width:80%; color:#000; background:#ccc; border-radius:10px; padding:5px 10px 5px 10px;"><div style="width:100%; height:300px;"><img id="imgFrame'+n+'" style="width:100%; height:300px; object-fit:cover;" src="" loading="lazy" /></div></div>';
            window.scrollBy(-200000000000000, 20000000000000000000);
      n--;
      }

    var file = $("input[type=file]").get(0).files[0];
    
    if(file){
      var reader = new FileReader();
    
      reader.onload = function(){
        
         $("#imgFrame0").attr("src", reader.result);
      }
     
     reader.readAsDataURL(file);
      $('#enquiry_data').submit();

      var que = $('#encmsg').val();
      var cat = $('#category').val();
      var msgReply = $('#msgReply').val();
      var mediaUsed = $('#mediaUsed').val();
      var lock = $('#lock').val();
      var rcid = $('#rcid').val();
    }
  }

$(document).on('click', '#upload', function(){
//function uploadImg(user){
   var guid = $('#guid').val();
   var cat = $('#cat').val();
   var c_id = $('#cid').val();
   var lck = $('#lock').val();
    
   var imgNomenc = guid + cat.charAt(0) + Date.now();

  var rid_enc_cons = localStorage.getItem('rid_enc_cons');
  var shrd = localStorage.getItem('shrd'+rid_enc_cons);
  var encname = sym_encrypt(imgNomenc, shrd);
   encname = encname.replace('/', '');
   encname = encname.replace('+', '');

  /*var prevEncmsg = $('#encmsg').val();
  prevEncmsg == '' ? encname : encname = prevEncmsg+'/=='+encname;*/
  
  document.getElementById('encmsg').value = encname;
  document.getElementById('mediaUsed').value = '2';
  $('.uploadIcon').css({"color":"red"});
  document.getElementById('setInner').innerHTML='<span class="material-icons" style="font-size:26px;">&#xe163;</span>';

});

function countDownTimer(dur, id){
  var sec = 60;
  var min = dur;

  var x = setInterval(function(){
    sec == -1 ? mins = min - 1 : mins = min;
    min == -1 ? mins = '00' : mins = min;
    min < 10 ? mins = '0'+min : mins = min;
    min >= 0 ? document.getElementById("min_span"+id).innerHTML = '<span>'+mins+'</span>' : '';
    
    sec == -1 ? secs = 59 : secs = sec;
    sec < 10 ? secs = '0'+sec : secs = sec;
    if(dur>0){ 
    sec >= 0 ? document.getElementById("sec_span"+id).innerHTML = '<span>'+secs+'</span>' : '';
     }
    sec--;
  }, 1000);
 
}


if(!!document.getElementById("session_elapse")){
var sec = $('#rem_time').val();
if(sec<630){
//if(sec>=-5){
  var x = setInterval(function(){
    sec<=60 ? $('#countdownSpan').slideDown('slow') : sec;
  sec>=0 ? document.getElementById("session_elapse").innerHTML = '<span style="filter:drop-shadow(1px 1px 0px #aaa);">'+sec+'</span>' : window.location.href='../index.php';

    sec--;
  }, 1000);
 }
}

function sessionTimer(){
var sec_rem = $('#sess_sec_rem_holder').val();
if(sec_rem>0){
//if(sec>=-5){
  var x = setInterval(function(){
  document.getElementById("sess_sec_rem").innerHTML = '<span style="filter:drop-shadow(1px 1px 0px #aaa);">'+sec_rem+'</span>';

    sec_rem --;
  }, 1000);
 }//else{  document.getElementById("sess_sec_rem").innerHTML = '<span style="filter:drop-shadow(1px 1px 0px #aaa);">00</span>';}
}

//enlarge a clicked image

$(document).on('click', '#bgo', function(){
    document.getElementById('bgo').remove();
    document.getElementById('fullscreen') ? document.getElementById('fullscreen').pause() : '';                    
   
});

$(document).on('click', '.flexible', function(){
    var imgId =$(this).prop('id');
    var imgsrc = document.getElementById(imgId).getAttribute('src');
     
     var div = document.createElement('div');
      div.setAttribute('id', 'bgo');
                         
    document.getElementById('flexible').appendChild(div);

    $('#bgo').css({'z-index':1000, 'background':'#ccc', 'position':'fixed', 'top':0, 'right':0, 'width':'100vw', 'height':'100vh', 'overflow':'scroll'});
    document.getElementById('bgo').innerHTML = "<img class='flexible' id='"+imgId+"' src='"+imgsrc+"' style='object-fit:contain; width:100%; height:102%;' />"; 

});

$(document).on('click', '.flexible2', function(){
                         
    var vdId =$(this).prop('id');
//document.getElementById
//$('#v'+vdId).pause();
    var __vdsrc = document.getElementById(vdId).getAttribute('src');
    var _vdsrc = __vdsrc.split('.');
vdsrc = _vdsrc[0];
var ext = _vdsrc[1];
     var div = document.createElement('div');
      div.setAttribute('id', 'bgo');
     //stop the video first
    document.getElementById('flexible').appendChild(div);

    $('#bgo').css({'z-index':1000, 'background':'#fff', 'position':'fixed', 'top':0, 'right':0, 'width':'100vw', 'height':'100vh', 'overflow':'scroll'});
    document.getElementById('bgo').innerHTML = "<video class='flexible2b' id='media_B' autoplay id='fullscreen' style='object-fit:cover; width:100vw; height:100vh;'>"+ 
    "<source  src='"+vdsrc+"."+ext+"'>"+
    "</video>";
document.getElementById('media_B').play();
document.getElementById(vdId).pause();

});  

$(document).on('click', '.flexibleTxt', function(){
    var txtId =$(this).prop('id');
    var txtWords = document.getElementById(imgId).getItem();
     
     var div = document.createElement('div');
      div.setAttribute('id', 'bgo');
                         
    document.getElementById('flexible').appendChild(div);

    $('#bgo').css({'z-index':1000, 'background':'#ccc', 'border':'5px solid #fff', 'position':'fixed', 'top':0, 'right':0, 'width':'100vw', 'height':'100vh', 'overflow':'scroll'});
    document.getElementById('bgo').innerHTML = "<p style='height:100%; width:100%; font-size:25px; color:deepskyblue; display:flex; justify-content:center; align-items:center;'>"+txtWords+"</p>"; 

});

