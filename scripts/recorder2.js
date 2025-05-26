
/*-----------------------Image capturing-----------------------------*/

function accessCamera(imgusage){
  navigator.mediaDevices.getUserMedia({
    video:{facingMode: 'environment'}, audio:false})
      .then(function(stream){
        document.getElementById('camera-preview').style.display = 'block';
        document.getElementById('snap').style.display = 'block';
        imgusage == 'productimg2' ? document.getElementById('canvas2').style.display = 'block' : document.getElementById('canvas').style.display = 'block';
        var video = document.getElementById('camera-preview');
        video.srcObject = stream;
        video.play();
        
        $('#snap').on('click', function(){
          snap(video, imgusage);
        });
 
 var dataURL = canvas.toDataURL();
 function dataURLToBlob(dataURL){
  var binaryString = atob(dataURL.split(',')[1]);
  var arrayBuffer = new ArrayBuffer(binaryString.length);
  var intArray = new Uint8Array(arrayBuffer);

  for (var i = 0, j = binaryString.length; i<j; i++){
    intArray[i] = binaryString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], {type: 'image/webp'});
 }

 function saveBlob(blob, filename, imgusage){
    //alert(filename);
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    var xhr=new XMLHttpRequest();
    var cat = $('#categoryval').val();

    var randomInt = window.crypto.getRandomValues(new Uint32Array(1))[0]%90000 + 10000;
    filename = randomInt + Date.now() + cat;
    var shrd = Date.now() + cat + Date.now()
    filename_enc = sym_encrypt(filename, shrd);
    filename_enc = filename_enc.replace(/[/]/g, '_');
    localStorage.setItem('shrd', shrd);
//////////
       var fd=new FormData();
       imgusage == 'proof' ? imgurl = 'img_data' : imgurl = 'product_img';
            fd.append(imgurl, blob, filename_enc);
            fd.append("cat", cat);
            fd.append("mediaProof", filename);
            imgusage == 'productimg2' ? fd.append("mediaProof2", filename) : '';

            fd.append("imgusage", imgusage);
 
            xhr.open("POST", "views/img_upload.php", true);
            xhr.send(fd);
    document.getElementById('camera-preview').style.display = 'none';
    document.getElementById('snap').style.display = 'none';
    imgusage == 'productimg2' ? document.getElementById('cancel2').style.display = 'block' : document.getElementById('cancel').style.display = 'block';
    
    document.getElementById('mediaType').value = '2';
    imgusage == 'productimg1' ? document.getElementById('prdImg').value = filename : '';
    const videoTrack = stream.getVideoTracks()[0];
    videoTrack.stop();
 }
 function snap(video, imgusage){
          imgusage == 'productimg2' ? canvas = document.getElementById('canvas2') : canvas = document.getElementById('canvas');
          var context = canvas.getContext('2d');
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          var snapshot = canvas.toDataURL();
          var blob = dataURLToBlob(snapshot);
          saveBlob(blob, 'image', imgusage);
 }

      }).catch(function(error){
        console.error('Error accessing camera:', error);
      });
}


/*--------------------AUDIO REC----------------------------*/

function audioRecording() {
  var recordButton = document.getElementById('recordButton');
  var stopButton = document.getElementById('stopRecord');
    var constraints = { audio: true, video:false }
//  recordButton.disabled = true;
  //  stopButton.disabled = false;

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
  audioContext = new AudioContext();
  gumStream = stream;

  /* use the stream */
  input = audioContext.createMediaStreamSource(stream);
  rec = new Recorder(input,{numChannels:1})

  //start the recording process
  rec.record()

  }).catch(function(err) {
      recordButton.disabled = false;
      stopButton.disabled = true;
  });
}

function stopAudioRecording() {
  var recordButton = document.getElementById('recordButton');
  var stopButton = document.getElementById('stopRecord');

  stopButton.disabled = true;
  recordButton.disabled = false;
  rec.stop();
  //stop microphone access
  gumStream.getAudioTracks()[0].stop();

  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(createDownloadLink);

}

/*function pauseRecording(){
  console.log("pauseButton clicked rec.recording=",rec.recording );
  if (rec.recording){
    //pause
    rec.stop();
    pauseButton.innerHTML="Resume";
  }else{
    //resume
    rec.record()
    pauseButton.innerHTML="Pause";

  }
}
*/

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

          document.getElementById('all_chat').appendChild(div);
  
          var audio ='<audio id="source" class="each-audio audiostyle" src="'+url+'" controls type="audio/webm" ></audio>';
         document.getElementById('audio').innerHTML= audio;
          document.getElementById('audio').setAttribute('id', '');
    
        //clear the audio
          document.getElementById('mediaUsed').value = '';
}


/*---------------------------------VIDEO REC-------------------------------*/
function startVideo(catid, category, rid, chid, cid, height, lck, uploadURL, addVideoFrame, addSpanPadin, recordTime, serialn){
    let preview = document.getElementById("preview");
    let recording = document.getElementById("recording");
    let logElement = document.getElementById("log");
    let stopBtn = document.getElementById("stopBtn");
    let vidframe = document.getElementById("vidframe");
    let recordingTimeMS = recordTime * 1000;
    //let recordedBlob = ''
    function log(msg) {
      logElement.innerHTML += `${msg}\n`;
    }

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();
      log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });

      
      let recorded = wait(lengthInMS).then(() => {
//      let recorded = wait(5000).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });

      return Promise.all([stopped, recorded]).then(() => data);
    }

    function stop(stream) {
      stream.getTracks().forEach((track) => track.stop());
      preview.style.display = 'none';
      vidframe.style.display = 'none';
//              window.clearTimeout();
    }
     
    var div = document.createElement("div");
    var span = document.createElement("span");
    var c_id = $('#cid').val();

    addVideoFrame == 1 ? dropshadow = "filter: drop-shadow(1px 1px 1px #aaa); margin-right:10px; " : dropshadow = "";
    addSpanPadin == 1 ? padin = "padding:5px 10px 5px 10px; border-radius:10px; width:80%;" : padin = "width:100%";
    span.setAttribute("style", "background:transparent; color:#000; "+padin);
    span.setAttribute("id", "video"+serialn);
    div.setAttribute("style", dropshadow+"display:flex; justify-content:flex-end; font-size:16px; margin-bottom:0px; width:100%;");
    div.appendChild(span);

  //remove the inner comment
    document.getElementById('all_chat'+serialn).removeChild();
    document.getElementById('scrollet'+serialn) ? document.getElementById('scrollet'+serialn).remove() : '';

   document.getElementById('all_chat'+serialn).appendChild(div);
    var video = "<video id='videoFram"+serialn+"' class='flexible2' controls loading='lazy' autoplay style='object-fit:cover; width:100%; border-radius:10px; height:"+height+"' src=''><source src=''></video>";
    document.getElementById('video'+serialn).innerHTML= video;
    //ENDDDDDDDDDDDDDD       
    window.scrollBy(-200000000000000, 20000000000000000000);
        document.getElementById('vidframe').style.display = 'block';
        document.getElementById('preview').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'block';
        //add watermark
        //createwatermark();
        var recordingTimeS = recordingTimeMS / 1000;
   
    navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'},
        audio: true,
    }).then((stream) => {
        preview.srcObject = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        
        ///////SWITCH CAMERA
        /*          const videoTrack = stream.getVideoTracks()[0];
              document.getElementById('switch').addEeventListener('click', ()=>{
                    videoTrack.applyConstraints({ 
                        advanced: [{ facingMode: videoTrack.getConstraints().facingMode === 'user'}]
                        //? 'user' : 'environment' }]
                    });
                });*/
        ////////////SWITCH ENDS
        countDown('activeTimer2', 'timerDiv2', recordingTimeS);

        return new Promise((resolve) => (preview.onplaying = resolve));

    }).then(() => startRecording(preview.captureStream(), recordingTimeMS)).then((recordedChunks) => {
      
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                var xhr=new XMLHttpRequest();
                var uid = $('#user'+serialn).val();
                var video_name = category.charAt(0) + Date.now();
                var rid_enc_cons = localStorage.getItem('rid_enc_cons');
                var shrd = localStorage.getItem('shrd'+rid_enc_cons);

                var encname = video_name;//sym_encrypt(video_name, shrd);//video_name;//
                document.getElementById('encmsg'+serialn).value = encname;
                document.getElementById('mediaType'+serialn).value = '3';
                document.getElementById('mediaproof'+serialn).value = '3';
         
                var  url = URL.createObjectURL(recordedBlob);
                document.getElementById('videoFram'+serialn).src = url;
                document.getElementById('loading'+serialn) ?  document.getElementById('loading'+serialn).remove() : "";
                document.getElementById('video'+serialn).removeAttribute('id');
                document.getElementById('videoFram'+serialn).setAttribute('id', 'videoFrame');
        
                //END
                //locked or not
            var fd=new FormData();
            fd.append("vid_data", recordedBlob, encname);
            fd.append("categ", catid);
            fd.append("cid", cid);
            fd.append("lock", lck);
            xhr.open("POST", uploadURL, true);
            xhr.send(fd);

            $('#dashboard').slideDown(500);

            clearInterval(x);//clear the countDown
            stopBtn.style.display = 'none';
            preview.style.display = 'none';
            vidframe.style.display = 'none';

            stop(preview.srcObject);


      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          log("Camera or microphone not found. Can't record.");
        } else {
          log(error);
        }
      });

  stopBtn.addEventListener("click", () => {
      event.preventDefault();

      stop(preview.srcObject);

      document.getElementById('stopBtn').style.display = 'none';
      document.getElementById('preview').style.display = 'none';
      document.getElementById('vidframe').style.display = 'none';
  },
    false
  );

} 

/*function startVideo(catid, category, rid, chid, cid, height, lck, uploadURL, addVideoFrame, addSpanPadin, recordTime, serialn){
    let preview = document.getElementById("preview");
    let recording = document.getElementById("recording");
    let logElement = document.getElementById("log");
    let stopBtn = document.getElementById("stopBtn");
    let vidframe = document.getElementById("vidframe");
    let recordingTimeMS = recordTime * 1000;
    //let recordedBlob = ''
    function log(msg) {
      logElement.innerHTML += `${msg}\n`;
    }

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();
      log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });

      
      let recorded = wait(lengthInMS).then(() => {
//      let recorded = wait(5000).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });

      return Promise.all([stopped, recorded]).then(() => data);
    }

    function stop(stream) {
      stream.getTracks().forEach((track) => track.stop());
      preview.style.display = 'none';
      vidframe.style.display = 'none';
//              window.clearTimeout();
    }
     
    var div = document.createElement("div");
    var span = document.createElement("span");
    var c_id = $('#cid').val();

    addVideoFrame == 1 ? dropshadow = "filter: drop-shadow(1px 1px 1px #aaa); margin-right:10px; " : dropshadow = "";
    addSpanPadin == 1 ? padin = "padding:5px 10px 5px 10px; border-radius:10px; width:80%;" : padin = "width:100%";
    span.setAttribute("style", "background:transparent; color:#000; "+padin);
    span.setAttribute("id", "video");
    div.setAttribute("style", dropshadow+"display:flex; justify-content:flex-end; font-size:16px; margin-bottom:0px; width:100%;");
    div.appendChild(span);
  
//    document.getElementById('all_chat').innerHTML = '';
    document.getElementById('all_chat').appendChild(div);
    var video = "<video id='videoFram' class='flexible2' autoplay style='object-fit:cover; width:100%; border-radius:10px; height:"+height+"' src=''><source src=''></video>";
    
    document.getElementById('video').innerHTML= video;
    //ENDDDDDDDDDDDDDD       
    window.scrollBy(-200000000000000, 20000000000000000000);
        document.getElementById('vidframe').style.display = 'block';
       // document.getElementById('videoFram').style.transform = 'scaleX(-1)';
        document.getElementById('preview').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'block';
        //add watermark
        //createwatermark();
        var recordingTimeS = recordingTimeMS / 1000;
        countDown('activeTimer2', 'timerDiv2', recordingTimeS);
   
    navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'},
        audio: true,
    }).then((stream) => {
        preview.srcObject = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        
        return new Promise((resolve) => (preview.onplaying = resolve));
        
        }).then(() => startRecording(preview.captureStream(), recordingTimeMS)).then((recordedChunks) => {
        
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
                var xhr=new XMLHttpRequest();
                var uid = $('#user').val();
                var video_name = category.charAt(0) + Date.now();
                var rid_enc_cons = localStorage.getItem('rid_enc_cons');
                var shrd = localStorage.getItem('shrd'+rid_enc_cons);

                var encname = video_name;//sym_encrypt(video_name, shrd);//video_name;//
                document.getElementById('encmsg').value = encname;
                document.getElementById('mediaType').value = '3';
                document.getElementById('mediaproof').value = '3';
         
                var  url = URL.createObjectURL(recordedBlob);
                document.getElementById('videoFram').src = url;
                document.getElementById('loading').remove();
                document.getElementById('video').removeAttribute('id');
                document.getElementById('videoFram').setAttribute('id', 'videoFrame');
            
                //END
                //locked or not
            var fd=new FormData();
            fd.append("vid_data", recordedBlob, encname);
            fd.append("categ", catid);
            fd.append("cid", cid);
            fd.append("lock", lck);
            xhr.open("POST", uploadURL, true);
            xhr.send(fd);

            $('#dashboard').slideDown(500);

            clearInterval(x);//clear the countDown
            stopBtn.style.display = 'none';
            preview.style.display = 'none';
            vidframe.style.display = 'none';

            stop(preview.srcObject);


      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          log("Camera or microphone not found. Can't record.");
        } else {
          log(error);
        }
      });

  stopBtn.addEventListener("click", () => {
      event.preventDefault();

      stop(preview.srcObject);

      document.getElementById('stopBtn').style.display = 'none';
      document.getElementById('preview').style.display = 'none';
    //  document.getElementById('vidframe').style.display = 'none';
  },
    false
  );

} */
/*
function startVideo(catid, category, rid, chid, cid, height, lck, uploadURL, addVideoFrame, addSpanPadin, recordTime){
    let preview = document.getElementById("preview");
    let recording = document.getElementById("recording");
    let logElement = document.getElementById("log");
    let stopBtn = document.getElementById("stopBtn");
    let vidframe = document.getElementById("vidframe");
    let recordingTimeMS = recordTime * 1000;
    //let recordedBlob = ''
    
    function log(msg) {
      logElement.innerHTML += `${msg}\n`;
    }

    function wait(delayInMS) {
      return new Promise((resolve) => setTimeout(resolve, delayInMS));
    }

    function startRecording(stream, lengthInMS) {
      let recorder = new MediaRecorder(stream);
      let data = [];

      recorder.ondataavailable = (event) => data.push(event.data);
      recorder.start();
      log(`${recorder.state} for ${lengthInMS / 1000} seconds…`);

      let stopped = new Promise((resolve, reject) => {
        recorder.onstop = resolve;
        recorder.onerror = (event) => reject(event.name);
      });

      
      let recorded = wait(lengthInMS).then(() => {
//      let recorded = wait(5000).then(() => {
        if (recorder.state === "recording") {
          recorder.stop();
        }
      });

      return Promise.all([stopped, recorded]).then(() => data);
    }

    function stop(stream) {
      stream.getTracks().forEach((track) => track.stop());
      preview.style.display = 'none';
      vidframe.style.display = 'none';
        
//              window.clearTimeout();

    }


    var div = document.createElement("div");
    var span = document.createElement("span");
    var c_id = $('#cid').val();

    addVideoFrame == 1 ? dropshadow = "filter: drop-shadow(1px 1px 1px #aaa); margin-right:10px; " : dropshadow = "";
    addSpanPadin == 1 ? padin = "padding:5px 10px 5px 10px; border-radius:10px; width:80%;" : padin = "width:100%";
    span.setAttribute("style", "background:#fff; color:#000; "+padin);
    span.setAttribute("id", "video");
    div.setAttribute("style", dropshadow+"display:flex; justify-content:flex-end; font-size:16px; margin-bottom:10px; width:100%;");
    div.appendChild(span);
             
    document.getElementById('all_chat').appendChild(div);
    var video = "<video id='videoFram' controls autoplay style='object-fit:cover; width:100%; height:"+height+"'><source src=''>Your browser does not support the video tag.</video><span id='loading' style='color:#2166f3;'>Loading...</span>";
    document.getElementById('video').innerHTML= video;

    //ENDDDDDDDDDDDDDD       
    window.scrollBy(-200000000000000, 20000000000000000000);
             
        document.getElementById('vidframe').style.display = 'block';
        document.getElementById('preview').style.display = 'block';
        document.getElementById('stopBtn').style.display = 'block';

        var recordingTimeS = recordingTimeMS / 1000;
        countDown('activeTimer2', 'timerDiv2', recordingTimeS);
///{facingMode: 'environment'},
    navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'},
        audio: true,
    }).then((stream) => {
        preview.srcObject = stream;
        preview.captureStream = preview.captureStream || preview.mozCaptureStream;
        
        return new Promise((resolve) => (preview.onplaying = resolve));
        
        }).then(() => startRecording(preview.captureStream(), recordingTimeMS)).then((recordedChunks) => {
        
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });

                var xhr=new XMLHttpRequest();

                var uid = $('#user').val();
                var video_name = uid + category.charAt(0) + Date.now();
                var rid_enc_cons = localStorage.getItem('rid_enc_cons');
                var shrd = localStorage.getItem('shrd'+rid_enc_cons);

                var encname = video_name;//sym_encrypt(video_name, shrd);
                document.getElementById('encmsg').value = encname;
                document.getElementById('mediaType').value = '3';
                document.getElementById('mediaproof').value = '3';

                var  url = URL.createObjectURL(recordedBlob);
                
                document.getElementById('videoFram').src = url;
                document.getElementById('loading').remove();
                document.getElementById('video').removeAttribute('id');
                document.getElementById('videoFram').setAttribute('id', 'videoFrame');

                //END
                //locked or not
               // catid == '' ? catid = $('.category').val() : '';
            var fd=new FormData();
            fd.append("vid_data", recordedBlob, encname);
            fd.append("categ", catid);
            fd.append("cid", cid);
            fd.append("lock", lck);
            xhr.open("POST", uploadURL, true);
            xhr.send(fd);
      
            $('#dashboard').slideDown(500);

            clearInterval(x);//clear the countDown
            stopBtn.style.display = 'none';
            preview.style.display = 'none';
            vidframe.style.display = 'none';

            stop(preview.srcObject);


      })
      .catch((error) => {
        if (error.name === "NotFoundError") {
          log("Camera or microphone not found. Can't record.");
        } else {
          log(error);
        }
      });

  stopBtn.addEventListener("click", () => {
      event.preventDefault();

      stop(preview.srcObject);

      document.getElementById('stopBtn').style.display = 'none';
      document.getElementById('preview').style.display = 'none';
      document.getElementById('vidframe').style.display = 'none';
  },
    false
  );

} 
*/
