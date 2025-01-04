
///VIDEO CAP ENDS
function changeSubBtnId(){
    	document.getElementById('setInner').innerHTML = "<span class='material-icons' style='font-size:26px; color:#fff'>&#xe163;</span>";
 document.getElementById('mediaUsed').value = '0';

 // add floating paddlock

 document.getElementById('chatLock').style.display = 'block';

 var lck = $('#lock').val();

 lck=='' ? document.getElementById('chatLock').innerHTML = "<span class='material-icons' style='color:deepskyblue; font-size:25px;' onclick='unlockChat()'>&#xe897;</span>" : '';
//lock chat
  lck=='' ? document.getElementById('lock').value = 1 : '';

}

function unlockChat(){
 document.getElementById('chatLock').innerHTML = "<span class='material-icons' style='color:#666; font-size:25px;' onclick='lockChat()'>&#xe898;</span>";
document.getElementById('lock').value = 0;
}

function lockChat(){
 document.getElementById('chatLock').innerHTML = "<span class='material-icons' style='color:deepskyblue; font-size:25px;' onclick='unlockChat()'>&#xe897;</span>";
document.getElementById('lock').value = 1;
}

//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;

var gumStream; 						//stream from getUserMedia()
var rec; 							//Recorder.js object
var input; 							//MediaStreamAudioSourceNode we'll be recording
var x;

// shim for AudioContext when it's not avb. 
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext //audio context to help us record

        function startCount(activeTimer, timerDiv){
                            var div = document.createElement("span");
                         div.setAttribute("id", timerDiv);
                         
                  
                  document.getElementById(activeTimer).appendChild(div);
                var sec = 1;
              
                x = setInterval(function(){
                document.getElementById(timerDiv).innerHTML = '<span style="filter:drop-shadow(1px 1px 0px #aaa);">'+sec+':00</span>';  
               sec++;
              }, 1000);
        }

        function countDown(activeTimer, timerDiv, sec){
            var div = document.createElement("span");
            div.setAttribute("id", timerDiv);
            document.getElementById(activeTimer).appendChild(div);
           
            x = setInterval(function(){
                if(sec >= 0){
                    sec > 9 ? a= '' : a=0;
                    document.getElementById(timerDiv).innerHTML = '<span>'+a+sec+'</span>';
                }
                
               sec--;
              }, 1000);
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



function startRecordin() {
    //stop all audios
    $('.each-audio').stop();
    document.getElementById('setInner').innerHTML = "<span class='material-icons' style='font-size:26px;' id='stopRecord'>&#xe163;</span>";
    console.log("recordButton clicked");
    
    document.getElementById('post_enq').setAttribute("id", "stopRecord");
        document.getElementById('enquiry').value = '';
        var stopButton = document.getElementById("stopRecord");
        stopButton.addEventListener("click", stopRecording);

        $('#mic').css('color', 'red');
        $('#stopRecord').css({'color':'#fff', 'flex-direction':'column', 'background':'red', 'justify-content':'center'});

        startCount('activeTimer', 'timerDiv');
    
    ////////////////////
    var constraints = { audio: true, video:false }

    /*
        Disable the record button until we get a success or fail from getUserMedia() 
    */

    recordButton.disabled = true;
    stopButton.disabled = false;
//  pauseButton.disabled = false

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
        audioContext = new AudioContext();

        gumStream = stream;
        input = audioContext.createMediaStreamSource(stream);
    rec = new Recorder(input,{numChannels:1})

        //start the recording process
        rec.record()
        console.log("Recording started");

    }).catch(function(err) {
        recordButton.disabled = false;
        stopButton.disabled = true;
    });
}

function stopRecording() {
console.log("stopButton clicked");
    stopButton.disabled = true;
    recordButton.disabled = false;
    
    //tell the recorder to stop the recording
    rec.stop();
        document.getElementById('stopRecord').setAttribute("id", "post_enq");
      
    $('#mic').css('color', '#000');
    $('#post_enq').css('background', '#2186f3');
    clearInterval(x);

document.getElementById('activeTimer').innerHTML = '';

    //stop microphone access
    gumStream.getAudioTracks()[0].stop();

    //create the wav blob and pass it on to createDownloadLink
    rec.exportWAV(createDownloadLink);

}

function createDownloadLink(blob) {
    
    var url = URL.createObjectURL(blob);
    var au = document.createElement('audio');
    var li = document.createElement('li');
    var link = document.createElement('a');

    var category = $('#category').val();
    var cat = $('#cat').val();
    var c_id = $('#cid').val();
    var recipient = $('#recipient_id').val();
    var chat_id = $('#chat_id').val();
    var chatpop= $('#chatpop').val();
    var cid = $('#cid').val();

   if(category !== ''){

  var un = localStorage.getItem('un'); 
  var uid = localStorage.getItem('usa'); 
  var audio_name = uid + cat.charAt(0) + Date.now();
  var rid_enc_cons = localStorage.getItem('rid_enc_cons');
  var shrd = localStorage.getItem('shrd'+rid_enc_cons);

  encname = sym_encrypt(audio_name, shrd);

  document.getElementById('encmsg').value = encname;
      var xhr=new XMLHttpRequest();
      xhr.onload=function(e) {
       if(this.readyState === 4) {
        console.log("Server returned: ",e.target.responseText);
       }
      };
      
      //locked or not
      var lck = $('#lock').val();
      
      var fd=new FormData();
      fd.append("audio_data", blob, encname);
      fd.append("categ", category);
      fd.append("lock", lck);
      fd.append("chatpop", chatpop);
      fd.append("cid", cid);
      xhr.open("POST","index.php?page=aud_upload",true);
      xhr.send(fd);
   }  
   
//   $('#post_enq').css({'enabled':true, 'background':'#2196f3'});
      $('#timerDiv').hide();
      var div = document.createElement("span");
     div.setAttribute("id", "timerDiv");
     div.setAttribute("style", "font-size:12px;");
    
   var div = document.createElement("div");
          var span = document.createElement("span");

          span.setAttribute("style", "background:#fff; color:#000; padding:5px 10px 5px 10px; border-radius:10px; max-width:80%;");
          span.setAttribute("id", "audio");
          div.setAttribute("style", "filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:flex-end; font-size:16px; margin-right:10px; margin-bottom:10px;");
                              
          div.appendChild(span);
          window.scrollBy(-200000000000000, 20000000000000000000);
    var c_id = $('#cid').val();
  
          document.getElementById('all_chat').appendChild(div);
          var audio ='<audio id="source" class="each-audio audiostyle" src="'+url+'" controls type="audio/webm" ></audio>';
         document.getElementById('audio').innerHTML= audio;
          document.getElementById('audio').setAttribute('id', '');
          document.getElementById('mediaUsed').value = '';

}

