function response(msg, bgcolor){
       var div = document.createElement("div");
          var node = document.createTextNode(msg);
          div.appendChild(node);
          
          var respPanel = document.getElementById('response');
          respPanel.appendChild(div);
          document.getElementById('response').style.display = 'block';
        $('#response').css({'z-index':10, 'font-size':'16px', 'font-family':'roboto', 'border-radius':'5px', 'text-align':'center', 'padding':'5px', 'color':'#fff', 'background':bgcolor});

            setTimeout(function(){
                            $('#response').fadeOut();
                           setTimeout(function(){
                             respPanel.removeChild(div);
                            }, 50);    
                        }, 5000);
    }


/*https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.0.0/crypto-js.js*/
//const CryptoJS = require('crypto-js.js');
//download chatmedia to local
function saveChatMedia(link, dir, file){
    $("#"+link).click(function  (e) {
        e.preventDefault();
        window.location.href = dir+"/"+file;
    });
}
//retrieve chat
function getChat(convid){
    /*db.transaction("Glitchat").objectStore("Glitchat").get(convid).onsuccess = (event) => {
        
      //console.log(`Name for SSN 444-44-4444 is 
      var s = event.target.result.s;
      var r = event.target.result.r;
      var que = event.target.result.que;
      var convid = event.target.result.convid;
      alert(que+' by '+s+' to '+r);
    };*/
    
    
    
    const objectStore = db.transaction("Glitchat").objectStore("Glitchat");
    
    objectStore.openCursor().onsuccess = (event) => {
      const cursor = event.target.result;
      var allChats = [];
      
      if (cursor) {
          var s = cursor.value.s;
          var r = cursor.value.r;
          var que = cursor.value.que;
            //${cursor.key}
          allChats.push( '<div>'+que+'</div>' ); 
          cursor.continue();

      } else {
        console.log("No more entries!");
      }
    $('#chatpage').innerHTML(allChats);

    };

}

//save chat
function saveChat(cat_enc, uniqCon_enc, rid_enc){
          $.ajax({
          url: '../includes/savechat.inc.php',
          method: 'POST',
          data: {cat_enc:cat_enc, uniqCon_enc:uniqCon_enc, rid_enc:rid_enc},
          dataType:'json',
          success: function(data){
              var convid = data.output[0]['convid'];
                
              /*var n = data.output[0]['n'] - 1;
              const all = [];
              while(n > 0){
                var sender = data.output[n]['s'];
                var recipient = data.output[n]['p'];
                var chat = data.output[n]['que'];
                all.push( array(sender, recipient, chat) ); 
                n--;
              }*/
              let savedChats = data.output;
              const dbName = "mychats";
              const request = indexedDB.open(dbName, 2);
             
            request.onerror = (event) => {
                response("Error saving chats to offline!", "red");
                $('.dialog').hide();
            };
           request.onsuccess = (event) => {
              const db = event.target.result;
              
              const tx = db.transaction("Glitchat", "readwrite");
                const loci = tx.objectStore("Glitchat");
                  savedChats.forEach((chat) => {
                      loci.add(chat);
                  });
                
                tx.oncomplete = function() {
                    response('Chats saved to offline', '#000');
                    $('.menulist').hide();

                };
                        
            };
            request.onupgradeneeded = (event) => {
              const db = event.target.result;
              const objectStore = db.createObjectStore("Glitchat", { keyPath: "chid", autoIncrement: true });

              objectStore.createIndex("s", "s", { unique: false });
              objectStore.createIndex("r", "r", { unique: false });
              objectStore.createIndex("convid", "convid", { unique: false });
            
              objectStore.createIndex("que", "que", { unique: false });
              objectStore.createIndex("chid", "chid", { unique: true });
            
             objectStore.transaction.oncomplete = (event) => {
                const chatObjectStore = db
                  .transaction("Glitchat", "readwrite")
                  .objectStore("Glitchat");

                savedChats.forEach((chat) => {
                  chatObjectStore.add(chat);
                //     response('Chats successfully saved to offline', '#000');
                    $('.menulist').hide();

                });
                //
                     response('Chats saved to offline', '#000');
                
              };

           };

          }
     });
    
}

//close chat
function closeChat(uniqconv_id, id, status){
          $.ajax({
          url: '../views/endconverse.php',
          method: 'POST',
          data: {uniqconv_id: uniqconv_id, id:id, status:status},
          dataType:'json',
          success: function(data){     
              $('#dialog'+data.id).hide();
             $('#close'+data.id).hide();
                data.output == '1' ? response('Conversation closed', '#2176f3') : (data.output == '2' ? response('Conversation postponed. It is subjected to removal if no update on it within 7days', 'red') : response('Failed to close!', 'red'));
            
                        setTimeout(function(){
                            window.location.href='../enquiry';
                        }, 10000);

          }
     });
    
}


//set chat appointmnt
/*$('#appoData').on('submit', function(event){
    event.preventDefault();
//        on();

//function setAppo(uniqconv_id, tutor, client){
          var dateset = $('#dateset').val();
          alert('date set is: '+dateset);
          $.ajax({
          url: '../views/setapp.php',
          method: 'POST',
          data: {uniqconv_id: uniqconv_id, dateset:dateset},
          dataType:'json',
          success: function(data){
              var setdate = data.setdate;
              $('#dialog'+data.id).hide();
             $('#close'+data.id).hide();
                data.output == '1' ? response('Next appointment set to '+setdate, '#2176f3') : response('Failed to close!', 'red');
          }
     });
    
});*/

function informRecipient(recipient='to'){
    $('.fa-paperclip').hide();
    $('.fa-microphone').hide();
    $('#enquiry').css('width', '140%');
        var chatpop = $('#chatpop').val();
    chatpop == 'duo' ? path = '../' : path = '';

      $.ajax({
          url: path+'views/mychat.php',
          method: 'GET',
          data: {to: recipient},
          dataType:'json',
          success: function(data){                  
            var reply = data.t;
           
          }
     });

 
}
$(document).ready(function() {
  $("body").animate({ scrollTop: Math.pow(2, 100)}, "slow");
});

 
//lock chats
    function lock(chid, action){
        
        $.ajax({
            url: 'lockchat.php',
            method: 'GET',
            data: {chid:chid, action:action},
            dataType:'json',
            success: function(data){
                var ch_id = data.chid;
                data.command == 0 ? execute = "<span class='material-icons' style='color:#aaa; font-size:14px;'>&#xe898;</span>" : execute = "<span class='material-icons' style='color:deepskyblue; font-size:14px;'>&#xe897;</span>";
                document.getElementById('lock'+chid).innerHTML = execute;
                data.command == 0 ? action = 1 : action = 0; 
                document.getElementById('lock'+chid).setAttribute("onclick", "lock("+chid+", "+action+")");
      
            }
        });
    }
  
  //makeCVE
function makeCVE(chid, cveType){
        
        $.ajax({
            url: 'makecve.php',
            method: 'GET',
            data: {chid:chid, cveType:cveType},
            dataType:'json',
            success: function(data){
                var ch_id = data.chid;
                var cveType = data.cveType;
//                cveType < 2 ? cveVisual = '' : cveVisual = "<span style='font-size:6px; color:deepskyblue;'>2</span>";
                
                cveType == 0 ? nxtcveType = 1 : (cveType==1 ? nxtcveType = 2 : nxtcveType = 0);
                //cveType == 2 ? nextCol = '#aaa' : nextCol = 'deepskyblue';
                cveType == 0 ? cveCol = '#bbb' : (cveType == 1 ? cveCol = 'orange' : cveCol = '#0f0');
                    cveType == 1 && document.getElementsByClassName('problemCVE') ? document.getElementsByClassName('problemCVE')[0].innerHTML = "<span class='material-icons' style='color:#bbb; font-size:14px;'>&#xe8f4;</span>" : (cveType == 2 && document.getElementsByClassName('solutionCVE') ? document.getElementsByClassName('solutionCVE')[0].innerHTML = "<span class='material-icons' style='color:#bbb; font-size:14px;'>&#xe8f4;</span>" : '');
//                cveType == 1 ? document.getElementsByClassName('problemCVE')[0].innerHTML = "<span class='material-icons' style='color:#bbb; font-size:14px;'>&#xe8f4;</span>" : (cveType == 2 ?  document.getElementsByClassName('solutionCVE')[0].innerHTML = "<span class='material-icons' style='color:#bbb; font-size:14px;'>&#xe8f4;</span>" : '');
                if(cveType > 0){
                    cveType == 1 ? ccvve = 'problemCVE' : ccvve = 'solutionCVE';
                    var id = document.getElementsByClassName(ccvve)[0].id;
                    var chatid = id.replace('cve', '');
                document.getElementById(id).setAttribute("onclick", "makeCVE("+chatid+", 1)");
                    
                }

                cveType == 1 ? document.getElementById('cve'+ch_id).setAttribute('class', 'problemCVE') : (cveType == 2 ? document.getElementById('cve'+ch_id).setAttribute('class', 'solutionCVE') : document.getElementById('cve'+ch_id).setAttribute('class', '')); 
                //removeAttribute('class');
                    
                
                var execute = "<span class='material-icons' style='color:"+cveCol+"; font-size:14px;'>&#xe8f4;</span>";
                document.getElementById('cve'+chid).innerHTML = execute;

                document.getElementById('cve'+chid).setAttribute("onclick", "makeCVE("+chid+", "+nxtcveType+")");
      
            }
        });
    }

                    
/*//makeCVE
function makeCVE(chid, cveType, action){
        
        $.ajax({
            url: 'makecve.php',
            method: 'GET',
            data: {chid:chid, cveType:cveType, action:action},
            dataType:'json',
            success: function(data){
                var ch_id = data.chid;
                var cveType = data.cveType;
                cveType == 1 ? cveVisual = '' : cveVisual = "<span style='font-size:6px; color:#aaa;'>2</span>";
                data.command == 0 ? execute = "<span class='material-icons' style='color:#aaa; font-size:14px;'>&#xe8f4;</span>"+cveVisual : execute = "<span class='material-icons' style='color:deepskyblue; font-size:14px;'>&#xe8f4;</span>"+cveVisual;
                document.getElementById('cve'+cveType+'_'+chid).innerHTML = execute;
                
                
                cveType == 1 ? contra = 2 : contra = 1;
                cveType == 1 ? contraCveVisual = "<span style='font-size:6px; color:#aaa;'>2</span>" : contraCveVisual = '';
                document.getElementById('cve'+contra+'_'+chid).innerHTML = "<span class='material-icons' style='color:#aaa; font-size:14px;'>&#xe8f4;</span>"+contraCveVisual;

                data.command == 0 ? action = 1 : action = 0; 
                document.getElementById('cve'+cveType+'_'+chid).setAttribute("onclick", "makeCVE("+chid+", "+cveType+", "+action+")");
      
            }
        });
    }
*/    
//mychats
    function updateChats(){
        var receiver = localStorage.getItem('rid');

        var chatpop = $('#chatpop').val();
        chatpop == 'duo' ? path = '' : path = 'views/';

        $.ajax({
            url: path+'mychat.php',
            method: 'GET',
            data: {receiver:receiver},
            dataType:'json',
            success: function(data){
              $.each(data.chat, function() {
 
                    //var rPubK = this['rPubK'];
                    var xpt_status = this['xpt_status'];
                    var ttid = this['ttid'];
                    var chatpop = this['audience'];
                    var holdClass = this['holdclass'];

                    holdClass != '1' ? $('#chatInputShell').hide() : $('#chatInputShell').show();
                    if(chatpop == 'duo'){$('#chatInputShell').show();}
                    var prvK = localStorage.getItem("prv");
                    var encP = localStorage.getItem("encP");
                    var chatpop = localStorage.getItem("chatpop");

                    var receiver_enc = localStorage.getItem('rid_enc_cons');
                    var shrdK = localStorage.getItem("shrd"+receiver_enc);
                   var _m_sg = this['msg'];
                    var m_sg = sym_decrypt(_m_sg, shrdK);
                    var _quoteMsg = this['quote'];
                    var quoteSender = this['quoteSender'];
                    
                    var quoteMsg = '';
                    
                   // alert(_quoteMsg);
                  // _quoteMsg == '' ? quoteMsg = '' : (_quoteMsg = null ? quoteMsg='' : quoteMsg = sym_decrypt(_quoteMsg, shrdK));
                          //  me !== sender && _quoteMsg.length > 10 ? quoteMsg = sym_decrypt(_quoteMsg, shrdK) : quoteMsg = '';
                    
                    var sender = this['s'];
                    var recipient = this['r'];
                    var mode = this['mode'];
                    var me = this['u'];
                    var date = this['dt'];
                    var replyto = this['replyto'];
                    var cid = this['cid'];
                    var chid = this['chid'];
                    replyto = parseInt(replyto);

	 quoteSender == me ? qbg = '#ddd' : qbg = 'skyblue';

     if(me !== sender && _quoteMsg!=='' && _quoteMsg !== null){ 
         _quoteMsg.length > 6 ? quoteMsg += sym_decrypt(_quoteMsg, shrdK) : quoteMsg += '';
         
     }
        quoteMsg.length > 0 ? quoteMsg = quoteMsg : quoteMsg = '';                                   
                        isNaN(replyto) ? replyPanel = "" : (replyto <= 0 ? replyPanel = "" : replyPanel ="<div><a id='reply"+replyto+chid+"' href='#"+replyto+"' style='color:#000; background:"+qbg+"; border-radius:7px; padding:3px; text-decoration:none; font-size:13px;'>"+quoteMsg+"</a></div>");
                        
                    var chatDir = this['type'];
                    var seen = this['sn'];
                    var imgDir = chatDir;//.replace('_chats', '');
                    var msg = '';
 
//                    chatpop == 0 ? bg = 'deepskyblue' : bg = '#2186f3';
                    me == sender ? justify = 'flex-end' : justify = 'flex-start';
                    sender == ttid && sender != me ? bg = 'cyan' : bg='deepskyblue';
                    me == sender ? bg = '#fff' : bg;
                    me == ttid && me != sender ? bg = 'deepskyblue' : bg;
                    me != sender && chatpop == 'duo' ? bg = 'cyan' : bg;

                    me == sender ? color = '#000' : color = '#fff';
                    me == sender ? pos = 'right' : pos = 'left';
                    me == sender ? bodaRadius = '20px 20px 0 20px' : bodaRadius = '20px 20px 20px 0';
                    seen == 1? vwcolor = '#2186f3' : vwcolor = '#999';
                    me==sender ? color = color : color = '#000';
                    var uniqId = '';
                 
                    var div = document.createElement("div");
                    div.setAttribute('class', 'each-section');
                    div.setAttribute('id', chid+'b');
                    
                    div.setAttribute("style", "filter: drop-shadow(1px 1px 1px #aaa); display:flex; justify-content:"+justify+"; font-size:16px; margin-"+pos+":10px; margin-bottom:8px;");
                        
                    var div2 = document.createElement("div");
                    div2.setAttribute('id', chid+'a');
                    mode == 2 ? minWidth=" min-width:80%;" : ( mode== 3 ? minWidth=" min-width:80%;" : minWidth="");
                    div2.setAttribute("style", "background:"+bg+"; color:"+color+"; padding:10px 10px 5px 10px; border-radius:"+bodaRadius+"; max-width:80%;"+minWidth);
                    div.appendChild(div2);
                    
                    var span = document.createElement("span");
                    span.setAttribute("id", chid);

                    var elementInDOM = document.getElementById(chid);
                    var date_node = document.createTextNode(date);
                    
                    var timeDiv = document.createElement("div");
                        //<span class='material-icons' style='color:#666; font-size:25px;' onclick='unlockChat()'>&#xe897;</span>
                    var lockIcon = "<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div>"+
                                    "<div onClick='lock("+chid+", 0)' style='margin-left:10px; margin-right:15px;' id='lock"+chid+"'>"+
                                        "<span class='material-icons' style='font-size:14px; color:deepskyblue;'>&#xe897;</span>"+
                                    "</div>";
                    var unlockIcon = "<div style='margin-left:10px; width:3px; height:3px; border:1px solid #aaa; background:#aaa; border-radius:50%;'></div>"+
                                    "<div onClick='lock("+chid+", 1)' style='margin-left:10px; margin-right:15px;' id='lock"+chid+"'>"+
                                        "<span class='material-icons' style='font-size:14px; color:#aaa;'>&#xe898;</span>"+
                                    "</div>";

                    var lck = $('#lock').val();
                    lck == 1 ? islock = lockIcon : islock = unlockIcon;
                    me == sender && xpt_status == 1 ? islock : islock =''; 
                    
                    timeDiv.innerHTML = 
    					             "<span style='font-size:10px; color:"+color+";'>"+date+"</span>"+islock+"<span style='font-size:14px; margin-left:auto;' class='material-icons' onclick='replythis(\""+chid+"\", \""+_m_sg+"\")'>&#xe15e;</span>";
    			     timeDiv.setAttribute("style", "display:flex; justify-content:center; align-items:center; padding-bottom:-2px; width:100%;");
                    if(mode==0 && !elementInDOM){
                 
                        if(me != sender){
                  //          alert(cid);
                    
                    //document.getElementById('chats'+cid) ? document.getElementById('chats'+cid).appendChild(div) : document.getElementById('all_chat').appendChild(div);
                      document.getElementById('all_chat').appendChild(div);         
                          var node = document.createTextNode(m_sg);
                            //setting reply panel if exist
                          span.appendChild(node);
                          document.getElementById(chid+'a').innerHTML = replyPanel;
                          document.getElementById(chid+'a').appendChild(span);
                          document.getElementById(chid+'a').appendChild(timeDiv);
                          
                          
                          
                        }else{
                         //replace id span with chatid
                          document.getElementById('span').setAttribute('id', chid);
                         document.getElementById('chatmsg').appendChild(timeDiv);
                         document.getElementById('chatmsg').removeAttribute('id');
                         
                        }

                    }
                   else if(mode == 1 && !elementInDOM){ 
                       
                        m_sg = this['msg'];
                        msg = '<audio controls class="each-audio audiostyle"><source src="sounds/'+chatDir+'/'+m_sg+'.webm" type="audio/webm" /></audio>';
                        if(me !== sender){
                   // document.getElementById('chats'+cid) ? document.getElementById('chats'+cid).appendChild(div) : document.getElementById('all_chat').appendChild(div);
                    document.getElementById('all_chat').appendChild(div);
                         document.getElementById(chid+'a').appendChild(span);
                        
                        document.getElementById(chid+'a').innerHTML = replyPanel;
                        span.innerHTML = msg;
                          document.getElementById(chid+'a').appendChild(span);
                          document.getElementById(chid+'a').appendChild(timeDiv);
                          document.getElementById(chid+'a').removeAttribute('id');

                            
                        }else{
                            document.getElementById('audio').appendChild(timeDiv);
                            document.getElementById('audio').removeAttribute('id');
                     
                        }    
                  /*      document.getElementById(chid).innerHTML = msg;
                    document.getElementById(chid).appendChild(s_pan);
                     document.getElementById(chid+'a').appendChild(timeDiv);*/
                        
                    }
                    else if(mode == 2 && !elementInDOM){
                        
                         m_sg = this['msg'];
                         var chatpop = $('#chatpop').val();
                         chatpop == 'duo' ? path = '../' : path = '';
                       if(me !== sender){
                        //document.getElementById('chats'+cid) ? document.getElementById('chats'+cid).appendChild(div) : document.getElementById('all_chat').appendChild(div);
                        document.getElementById('all_chat').appendChild(div);
                      _msg = "<img class='chatimg flexible' id='imgFrame' src='' loading='lazy' style='height:300px; width:100%; object-fit:cover;' />";
                          //div2.appendChild(span);
                         // /document.getElementById(chid).innerHTML = _msg;

                          document.getElementById(chid+'a').innerHTML = replyPanel;
                          var spann = document.createElement('div');
                          spann.setAttribute('id', 'newimg');
                          spann.style.width = '100%';
                          
                          document.getElementById(chid+'a').appendChild(spann);
                          
                          document.getElementById('newimg').innerHTML = _msg;
                          spann.removeAttribute('id');
                          
                          document.getElementById(chid+'a').appendChild(timeDiv)
                       
                        document.getElementById('imgFrame').setAttribute('src', path+'img/'+imgDir+'/'+m_sg+'.webp');
                        $('.uploadIcon').css({"color":"#000"});
                       
                        //class='chatimg' id='"+chati
                        
                        document.getElementById('imgFrame').setAttribute('id', chid);
                      document.getElementById(chid+'a').removeAttribute('id');
                    
                     }else{

                         var chatpop = $('#chatpop').val();
                         chatpop == 'duo' ? path = '../' : path = '';
                          var i = localStorage.getItem('uploadID');
                         //   alert('chat.js i: '+i);
                          if(i != null && i >= 0){

                            document.getElementById('chatmsg'+i).style.background = '#fff';
                            
                            document.getElementById('imgFrame'+i).setAttribute('src', path+'img/'+imgDir+'/'+m_sg+'.webp');
                            document.getElementById('chatmsg'+i).appendChild(timeDiv);
                            document.getElementById('chatmsg'+i).style.width = '80%';
                            document.getElementById('chatmsg'+i).removeAttribute('id');
                            document.getElementById('imagediv'+i).removeAttribute('id');
                            document.getElementById('imgFrame'+i).setAttribute('id', chid);
                            document.getElementById(chid).setAttribute('class', 'chatimg flexible');
                            document.getElementById('uploadIcon').style.color = '#000';

                            i=i-1;
                            localStorage.setItem('uploadID', i);
                            i == -1 ? localStorage.removeItem('uploadID') : '';

                           }

                        }
                    }
                   else if(mode == 3 && !elementInDOM){

                         m_sg = this['msg'];
                       if(me !== sender){
                          _msg = "<video id='videoFrame' class='flexible2' width='100%' height='280px' controls autoplay style='object-fit:cover;'><source src='videos/"+chatDir+"/"+m_sg+".webm' type='video/webm'><source src='../videos/"+chatDir+"/"+m_sg+".mp4' type='video/mp4'><source src='../videos/"+chatDir+"/"+m_sg+".ogg' type='video/ogg'>Your browser does not support the video tag.</video>";
                         // div.appendChild(span);
                         // document.getElementById(chid).innerHTML = _msg;
                    // document.getElementById('chats'+cid) ? document.getElementById('chats'+cid).appendChild(div) : document.getElementById('all_chat').appendChild(div);
                    document.getElementById('all_chat').appendChild(div);
                     document.getElementById(chid+'a').innerHTML = replyPanel;
                        span.innerHTML = _msg;
                        
                  
                    document.getElementById(chid+'a').appendChild(span);
                     document.getElementById(chid+'a').appendChild(timeDiv);
                     document.getElementById(chid+'a').removeAttribute('id');
                      document.getElementById('videoFrame').removeAttribute('id');
                    document.getElementById(chid).setAttribute('class', 'flexible2');

                       }else{
                         document.getElementById('chatmsg').appendChild(timeDiv);
                         document.getElementById('chatmsg').removeAttribute('id');
                         document.getElementById('videoFrame').removeAttribute('id');
                         
                        
                       }
                           
                    }
                  
                     window.scrollBy(-200000000000000, 20000000000000000000);
           

                  });
            }
        });
    }
    
    updateChats();

    setInterval(function(){

      updateChats();
    }, 4000);
    
    
      $(document).on('click', '.each-section', function(){
         var id=$(this).attr('id').replace('b', '');
         var mode = $('#m'+id).val();
         var que = $('#q'+id).val();
         var cat = $('#cat'+id).val();
         var chatpop = $('#chatpop'+id).val();

         chatpop == 'duo' ? path = '../' : path = '';
		
		mode == 1 ? long_url = path+'sounds/'+cat+'/'+que+'.webm' : (mode == 2 ? long_url =path+'img/'+cat+'/'+que+'.webp' :( mode == 3 ? long_url = path+'videos/'+cat+'/'+que+'.webm' : long_ur = ''));
			
            if(mode == '1'){
                document.getElementById(id).innerHTML = "<source src='"+long_url+"' type='audio/webm'>";
                
                document.getElementById(id).play();
            }else if(mode == '2'){
                document.getElementById(id).src=long_url;
            }
            else if(mode == '3'){
                document.getElementById(id).innerHTML = "<source src='"+long_url+"' type='video/webm'>";
                document.getElementById(id).play();
            }
     
      });
   
    
    $(window).on('load', function () {
     $(window).on('resize scroll', function(){
      $('.each-section').each(function(){
        if($(this).isInViewport()){

             var id=$(this).attr('id').replace('b', '');
            var mode = $('#m'+id).val();
            var que = $('#q'+id).val();
            var cat = $('#cat'+id).val();
         var chatpop = $('#chatpop').val();

         chatpop == 'duo' ? path = '../' : path = '';

//alert('id: '+id+' mode: '+mode+' QUE: '+que);

/* 		mode == 1 ? mediatype = 'audio/webm' : (mode == 3 ? mediatype = 'video/webm' : mediatype = '');*/
			mode == 1 ? long_url = path+'sounds/'+cat+'/'+que+'.webm' : (mode == 2 ? long_url =path+'img/'+cat+'/'+que+'.webp' :( mode == 3 ? long_url = path+'videos/'+cat+'/'+que+'.webm' : long_ur = ''));
			
            if(mode == '1'){
                document.getElementById(id).innerHTML = "<source src='"+long_url+"' type='audio/webm'>";
                
                //document.getElementById(id).play();
            }else if(mode == '2'){
                document.getElementById(id).src=long_url;
            }
            else if(mode == '3'){
                document.getElementById(id).innerHTML = "<source src='"+long_url+"' type='video/webm'>";
               // document.getElementById(id).play();
            }
        }
      else{
          if(mode == '1' || mode == '2' || mode == '3'){
            document.getElementById(id).pause();
          }
          
      }
      
    });

  });
}); 
	
  $.fn.isInViewport = function(){
      var elementTop= $(this).offset().top;
      var elementBottom= elementTop + $(this).outerHeight();
    
      var viewportTop= $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      var m=$(window).height()/16;
      return elementBottom > (viewportTop+m) && elementTop < (viewportBottom-m);
  }


