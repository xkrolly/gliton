
function addContent(contentID){
      const cont = document.getElementById(contentID).innerHTML;
  
      $.ajax({
            url: 'includes/addInsight.inc.php',
            method: 'POST',
            data: {content:cont, contid:contentID},
            dataType:'json',
            success: function(data){
              var insID = data.insID;
              document.getElementById(insID).style.background = ''; 
              document.getElementById(insID).style.color = '#fff'; 

            },
            error: function(data){

            }  
      });
}

function clearContent(id){
  document.getElementById(id).style.background = '#eee'; 
  document.getElementById(id).style.color = '#aaa'; 
  //document.getElementById(id).setAttribute('id', ''); 
}


function scriptTimeLine(timePannelID, startDate, endDate){
        var time_ago = Date.parse(startDate)/1000;
        var current_time = Date.parse(endDate)/1000;
        
        var _today = new Date();
        var rightNow = Date.parse(_today)/1000;
        var daydiff = parseInt(rightNow) - parseInt(current_time);

        var time_diff = parseInt(current_time) - parseInt(time_ago);
//alert(time_diff);
        var seconds= time_diff;
//        alert(current_time+'....'+time_ago);
        var minutes= Math.round(seconds/60);
            var hours= Math.round(seconds/3600);
            var days= Math.round(seconds/86400);
            var weeks= Math.round(seconds/604800);
            var months= Math.round(seconds/2629440);
            var years= Math.round(seconds/31553280);
          
          var dt ="";
            if(daydiff <= 86400){
                dt += "Today";
            }
        else if(daydiff > 86400 && daydiff < 172800){ 
                dt += "Yesterday";
                
            }
        else if(daydiff >= 172800 && daydiff < 604800){
                var date = new Date(parseInt(current_time));
                var options = {weekday: 'long'};
                var dayName = date.toLocaleString('en-NG', options).split(',')[0];
                dt += dayName;
          }
        else if(daydiff > 604800 ){
            var date = new Date(parseInt(current_time));
            var options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'};
            var dateStr = date.toLocaleString('en-NG', options).split(',')[0];
            dt += dateStr;
        }
          
          days.length == 1 ? days = '0'+days : days;
            days = days+1;
          document.getElementById(timePannelID).innerHTML = "<span style='padding:5px; background:#fff; border-radius:5px; color:#444;'>DAY "+days+" <span style='height:7px; width:2px; border:1px inset #eee; margin-left:5px; margin-right:5px;'></span> "+dt+"</span>";

}


function isInViewport($e){
  const rect = $e[0].getBoundingClientRect();
  return(
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= $(window).height() &&
    rect.right <= $(window).width()
    );
}


$(window).on('scroll', function (e) {

    const $elem = $('.each-minipage');
    $($elem).each(function(){
        var id=$(this).attr('id');
        const $el = $('.'+id);
        
        if(isInViewport($el)){
          var start = $('#start'+id).val();
          var upd = $('#current'+id).val();
          scriptTimeLine('timeBanner', start, upd);

        }
    }); 
});

function inlineLoader(id){
  document.getElementById(id).setAttribute('id', 'miniLoader');
  document.getElementById('miniLoader').style.display = 'block';
}



function viewInsight(){
  document.getElementById('insightBtn').style.display = 'none';
  $('#insight').slideDown(200);
}


//////////////////////////
$('#upload').attr('capture', 'environment');
$('#upload').attr('accept', 'image/*');
$('#upload').attr('x-webkit-capture', 'environment');
 
let swipeTimeout = null;
let swipeTimeout2 = null;

if($(window).width() <= 768 ){
 // alert('MOBILE');
$('#scrollet').on('touchstart', function(event){
      var startX = event.originalEvent.touches[0].pageX;
      var startY = event.originalEvent.touches[0].pageY;
 if(swipeTimeout){
     clearTimeout(swipeTimeout);
   }
   swipeTimeout = setTimeout(() => {

      $('#scrollet').on('touchmove', function(event){

        if(swipeTimeout2){
             clearTimeout(swipeTimeout2);
           }
        swipeTimeout2 = setTimeout(() => {
 
        var currentX = event.originalEvent.touches[0].pageX;
        var currentY = event.originalEvent.touches[0].pageY;
        
        var distanceX = currentX - startX;
        var distanceY = currentY - startY;
                                ///////////////////
          if(distanceY > 0){
            //alert('swiped down');
              event.preventDefault();
              event.stopPropagation();
                 reView();
             
          }else{
            //alert('swiped up');
             $('#bottomList').val() == '' && $('#topList').val() == '' ? generateScrollets() : bringToView();
           }
        }, 200);
      });

      $('#scrollet').on('touchend', function(){
          $('#scrollet').off('touchmove touchend');
      });
    }, 100);
});



}else{
  //alert('THIS is COMPUTER');
}



let scrollTimeout = null;
let scrollTimeout2 = null;
$(window).on('swipedown swipeup swipeleft swiperight', function(event){
  alert('Phone swiped');
})

if($('#scrollet').length > 0){
  generateScrollets();

$(window).on('scroll', function(e) {
    if(e.target.scrollTop === 0){e.preventDefault();}
    //e.preventDefault();
  
  const scrollPosition = $(window).scrollTop();
  const documentHeight = $('#scrollet').height() / 50000;
  console.log('media'+' '+'media2');

   if(scrollTimeout){
     clearTimeout(scrollTimeout);
   }
   scrollTimeout = setTimeout(() => {

        if(scrollPosition >= documentHeight){

        $(window).on('wheel overscroll swipeup', function(e){
             if(scrollTimeout2){
               clearTimeout(scrollTimeout2);
              }
              scrollTimeout2 = setTimeout(() => {

                  if(e.originalEvent.deltaY > 0){
                    $('#bottomList').val() == '' && $('#topList').val() == '' ? generateScrollets() : bringToView();
                   console.log('scrolling down at d END again');
                  }
                  if(e.originalEvent.deltaY < 0){
                    reView();
                    console.log('scrolling UP at d END again');
                  }
              }, 200);

        });
       }
    }, 200);

});
}
function pageView(content){
             var topicID = content[0];
             // lastArr == '' ? heading = 'TOP REACHED' : 
             var heading = content[1];
              var likes = content[2];
              var published = content[3];
              var price = content[4];
              var media = content[5];
              var media2 = content[6];
              var tutorImgUrl = content[7];
              var colval2 = content[8];
              var col_id = content[9];
              var col_id2 = content[10];
              var ln = content[11];
              var strDir = content[12];
              var strDir2 = content[13];
              var que = content[14];
              var que2 = content[15];
              var pubid = content[16];
              var recipient = content[17];
              var creator = content[18];
              var likeStatus = content[19];
              var categoryID = content[20];
              var catPass = content[21];
              var shared = content[22];
              var timespan = content[23];
              var pubidEnc = content[24];
              var insight = content[25];
              var konzlt = content[26];
              var uname = '@'+content[27];
 
              var vidTotal = content[28];
              var imgTotal = content[29];
              var audTotal = content[30];
              var txtTotal = content[31];

              var creatorEnc0 = content[32];
	          var favs = content[33];
              var favStatus = content[34];
              var pubDate = content[35];
              var balance = content[36];

              var srcA = strDir+'/dec/'+que;
              var srcB = strDir2+'/dec/'+que2;
              var srcImgA = strDir+'/'+que;
              var srcImgB = strDir2+'/'+que2;

                if(konzlt == true){document.getElementById('meetTutor').innerHTML = 'Consult';}
                if(konzlt == false){document.getElementById('meetTutor').innerHTML = 'You';}
                document.getElementById('uname').innerHTML = "<a style='color:#fff; font-family:Arapey;' href='index.php?page=profile&pid="+creatorEnc0+"'>"+uname+"</a>";
                document.getElementById('solscriptImgTotal').innerHTML = imgTotal;
                document.getElementById('solscriptVidTotal').innerHTML = vidTotal;
                document.getElementById('pubDate').innerHTML = pubDate;
                
                //document.getElementById('totalFavs').innerHTML = favs;
                
                function numEestimator(a){
                //  alert(a);
                  a.length == 4 ? y = 1 : (a.length == 5 ? y = 2 : (a.length == 6 ? y = 3 : y = 4 )); 
                  var _a = a.substr(y, 1);
                  a.length >= 4 ? 
                  output = a.substr(0, y)+'.'+_a+'K' : output = a;
                  return output;
                }
                 
                document.getElementById('totalShares').innerHTML = numEestimator(shared);
                document.getElementById('timespan').innerHTML = timespan;
                document.getElementById('timespan2').innerHTML = timespan;

              if(media == 2){
                  document.getElementById('wordingsA').style.display = 'none';
                  if(insight != ''){
                    
                    document.getElementById('insightBtn').style.display = 'block';
                    
                    document.getElementById('insight').style.display = 'none';
                    document.getElementById('insight').style.background = 'rgba(0, 0, 0, .2)';//'rgba(0, 191, 255, .3)';
                    document.getElementById('insight').innerHTML = '<div style="display:flex; justify-content:center; align-items:center; flex-direction:column;"><div onclick="$(\'#insight\').slideUp(1000); $(\'#insightBtn\').show();" style="margin-top:-5px; margin-bottom:20px; width:40px; height:4px; border:1px solid #fff; background:#fff;"></div>'+insight+'</div>';
                  }else{
                    document.getElementById('insight').style.display = 'none';
                    
                  }  
                  //movement for REVIEW (img)
                  document.getElementById('imgA').style.display = 'block';
                  document.getElementById('imgA').src = 'img/'+srcImgA+'.webp';
                  // for generate (img)
                  document.getElementById('mediaA').style.display = 'none';
                  document.getElementById('mediaA').pause();
                     
              }
              else if(media == 3){

                  document.getElementById('mediaA').style.display = 'block';
                  document.getElementById('mediaA').src = 'videos/'+srcA+'.webm';
                  document.getElementById('imgA').style.display = 'none';
                  document.getElementById('wordingsA').style.display = 'none';
                  $('.flexible2').stop();
                  document.getElementById('mediaA').play();

                  if(insight != ''){
                    document.getElementById('insightBtn').style.display = 'block';
                    document.getElementById('insight').style.display = 'none';
                    document.getElementById('insight').style.background = 'rgba(0, 0, 0, .2)'; //'rgba(0, 191, 255, .3)';
                    document.getElementById('insight').innerHTML = '<div style="pointer-events:auto; display:flex; justify-content:center; align-items:center; flex-direction:column;"><div onclick="$(\'#insight\').slideUp(1000); $(\'#insightBtn\').show();" style="margin-top:-5px; margin-bottom:20px; width:40px; height:4px; border:1px solid #fff; background:#fff;"></div>'+insight+'</div>';
                  }else{
                    document.getElementById('insight').style.display = 'none';
                    
                  }
              }
              else if(media < 2){// || media > 3){
                  document.getElementById('wordingsA').style.display = 'block';
                  document.getElementById('imgA').style.display = 'none';
                  document.getElementById('mediaA').style.display = 'none';
                  document.getElementById('mediaA').pause();            
              }

              if(media2 == 2){
                  document.getElementById('imgB').style.display = 'block';
                  document.getElementById('imgB').src = 'img/'+srcImgB+'.webp';
                  document.getElementById('mediaB').style.display = 'none';
                  document.getElementById('mediaB').pause();

              }
              else if(media2 == 3){
                  document.getElementById('mediaB').style.display = 'block';
                  document.getElementById('mediaB').src = 'videos/'+srcB+'.webm';
                  document.getElementById('imgB').style.display = 'none';
           //THREE
                  media != 3 ? document.getElementById('mediaB').play() : 
                  document.getElementById('mediaB').pause();
               }

              document.getElementById('productID').value = published;
              document.getElementById('pubID').value = pubid;
             // document.getElementById('glitor').value = glitor;

      //profile
             //document.getElementById('profilelnk').src = 'index.php?page=profile&'+'.webp';
      //profileIMG
             
             document.getElementById('tutorImg').src = tutorImgUrl+'.webp';
              konzlt == false ? document.getElementById('tutorImgLink').href = '#' : '';
              konzlt == true ? document.getElementById('tutorImgLink').href = 'index.php?page=tutor&category='+categoryID+'&categoryPass='+catPass : '';
              //contentTopicA
              document.getElementById('headingA').innerHTML = "<span class='typewritr'>"+heading+"</span>";
             
////////LIKES newLikeStatus should be used
            var focusPG = $('#focuspg').val();
            let startChar = "_L(";
            let endChar = ")L_";
            let startIndex = focusPG.indexOf(startChar) + startChar.length;
            let endIndex = focusPG.indexOf(endChar) + endChar.length;
            var rxtn_s_ = focusPG.slice(startIndex, endIndex);
            var rxtn_s = rxtn_s_.slice(0, -3);
            let rxtns = rxtn_s.split('.');
     
            var pubid = rxtns[0];
            var likesTotal = rxtns[1];
            var likeStatusFrmFocus = rxtns[2];
            $('#LikeStatus').val() == '' ? nLikeStatus = likeStatus : nLikeStatus = likeStatusFrmFocus;
                nLikeStatus == 1 ? color = 'red' : color = '#fff';
                document.getElementById('like').style.color = color;
      
              document.getElementById('totalLikes').innerHTML = numEestimator(likesTotal);
              document.getElementById('total_Likes').value = likesTotal;
              document.getElementById('LikeStatus').value = nLikeStatus;
////////FAVS             
  
            let startChar2 = "_F(";
            let endChar2 = ")F_";
            let startIndex2 = focusPG.indexOf(startChar2) + startChar2.length;
            let endIndex2 = focusPG.indexOf(endChar2) + endChar2.length;
            var rxtn_s_2 = focusPG.slice(startIndex2, endIndex2);
            var rxtn_s2 = rxtn_s_2.slice(0, -3);
            let rxtns2 = rxtn_s2.split('.');
     
            var pubid = rxtns2[0];
            var favsTotal = rxtns2[1];
            var favStatusFrmFocus = rxtns2[2];
            
            $('#FavStatus').val() == '' ? nFavStatus = favStatus : nFavStatus = favStatusFrmFocus;
                nFavStatus == 1 ? color = 'deepskyblue' : color = '#fff';
              document.getElementById('favIcon').style.color = color;
        
              document.getElementById('totalFavs').innerHTML = numEestimator(favsTotal);
              document.getElementById('total_Favs').value = favsTotal;
              document.getElementById('FavStatus').value = nFavStatus;

              
              //Share
              document.getElementById('shareContent').href = 'https://wa.me/+2347037940894?text=heading';
              //script content
            var scriptURL ="index.php?page=peepChats&pub="+pubidEnc;

              document.getElementById('_contentScript').setAttribute('onclick', 'paymentSubpage(\"'+scriptURL+'\", \"'+heading+'\", \"'+price+'\", \"'+balance+'\", \"'+insight+'\")');
              document.getElementById('_contentScript2').setAttribute('onclick', 'paymentSubpage(\"'+scriptURL+'\", \"'+heading+'\", \"'+price+'\", \"'+balance+'\", \"'+insight+'\")');

}

function paymentSubpage(url, title, price, balance, insight){
    var price = parseInt(price)/1000;

    balance < price ? disable='disabled' : disable = '';

var widthFactor = balance/price;
var width = widthFactor * 40;

  var subpage = " <div id='paySubpage' style='background:#fff; padding:20px; color:#000; height:100%; width:100%; position:fixed; top:0; right:0; bottom:0; border: 5px solid #2166f3; border-radius:10px;'>"+
                    "<div style='display:flex; flex-direction:column; height:100%; padding:10px; align-items:center; justify-content:space-around;'>"+
                    "<h6 style='color:#000; width:100%; text-align:center; font-size:13px;'>Pay "+price+"GC to own this solscript</h6><br><br>"+
                    "<div style='display:flex; justify-content:center; align-items:center; width:150px; height:150px; border-radius:50%; border: 1px solid #111; filter:drop-shadow(1px 1px 1px #aaa) drop-shadow(-1px -1px 1px #aaa); background:#fff;'>"+
                      "<span class='material-icons' style='font-size:60px; color:gold;'>&#xe0f0;</span>"+
                    "</div>"+
                    "<h4 style='color:#111; width:100%; text-align:center; padding:20px; font-family:roboto; font-weight:bold; font-size:18px;'>"+title+"</h4>"+
 "<div style='font-size:12px; padding:5px 20px 20px 10px; text-align:center;'>"+insight+"</div>"+
                    "<div style='font-size:14px;'>@</div>"+
                    "<div style='display:flex; justify-content:center; align-items:center; font-weight:bold; color:#2166f3; border-radius:50%; border:2px solid #2166f3; height:40px; width:40px; padding:10px; margin-bottom:8px;'><span style='font-size:20px;'>"+price+"</span><sub style='font-size:10px;'>GC</sub></div>"+
                    "<div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+

                        "<div id='walletBal'  style='font-size:12px; margin-top:8px;'>"+
                            "<div id='walletSphere' style='display:flex; justify-content:center; align-items:center; width:"+width+"px; height:"+width+"px; border-radius:50%; border:1px solid #000;'><span style='font-size:14px;'>"+balance+"</span><sub style='font-size:8px;'>GC</sub></div>"+
                            "<div id='wallet' style='display:flex; justify-content:center; align-items:center;'><span class='material-icons' style='font-size:12px;'>&#xe850;</span> Bal</div>"+
                        "</div>"+
                    "</div><br><br><br>";
                    
if(balance < price){
      subpage +=   "<div style='width:100%;'><a href='index.php?page=buycoin&price="+price+"' style='width:100%;'><button id='fundwallet' class='form-control theme' style='border-radius:10px; width:100%; padding:20px auto 20px auto; color:#fff;'>Fund your wallet</button></a></div>";
}    
      subpage +=    "<div style='display:flex; flex-direction:column; align-items:center; font-size:12px; width:100%;'><a href='"+url+"' "+disable+" style='width:100%;'><button "+disable+" id='payBtn' class='form-control theme' style='border-radius:10px; width:100%; padding:20px auto 20px auto; color:#fff;'>Proceed to pay</button></a><span style='margin:10px auto;'></span>"+
                    "<span onclick='cancelPay();' style='color:#aaa; font-size:16px; text-decoration:underlined;'>Cancel</span></div>"+
                         "<div class='ribbon-wrap'><div class='ribbon'>Special offer</div></div>"+
               
                  "</div></div>";
$('main').hide();
document.getElementById('_paymentSubpage').innerHTML = subpage;
document.getElementById('_paymentSubpage').style.display = 'block';
    if(balance < price){
        document.getElementById('payBtn').style.background = '#eee';
        document.getElementById('payBtn').style.border = '1px solid #eee';
        document.getElementById('walletBal').style.color = 'red';
        document.getElementById('wallet').style.color = 'red';
        document.getElementById('fundwallet').style.background = 'green';
        document.getElementById('walletSphere').style.background = 'red';
        document.getElementById('walletSphere').style.color = '#fff';
 
        
    }
    if(balance >= price){ 
        document.getElementById('walletBal').style.color = 'green';
        document.getElementById('fundwallet').style.color = '#ddd';

        document.getElementById('wallet').style.color = 'green';
        document.getElementById('payBtn').style.background = '#2166f3';
        document.getElementById('walletSphere').style.background = 'green';
    }
    
}

function cancelPay(){
document.getElementById('_paymentSubpage').innerHTML = '';
document.getElementById('_paymentSubpage').style.display = 'none';
$('main').show();

}

/*              function shareDis(){
                const src = $('#A-src').val();
                fetch(src)
                .then(response => response.blob())
                .then(file => {

                  const shareData = {
                    files: [file],
                    title: 'heading',
                    text: 'likes',
                  }

                  navigator.share(shareData)
                  .then(() => {
                    console.log('shared data here');
                  })
                  .catch((error) => {
                    console.error('ERROR sharing:', error);
                  });
                });
              };
*/

              function shareDis(){
                const src = $('#A-src').val();
/*                fetch(src)
                .then(response => response.blob())
                .then(file => {
*/
                  const shareData = {
                    files: [{
                      name: src,
                      type: 'image/webp',
                      data: fetch(src).then(response => response.blob())
                    }],
                    title: 'heading',
                    text: 'likes',
                  }

                  navigator.share(shareData)
                  .then(() => {
                    console.log('shared data here');
                  })
                  .catch((error) => {
                    console.error('ERROR sharing:', error);
                  });
//                });
              };

function generateScrollets(){
  var genspec = 2;//$('#genspec').val();
    $.ajax({
            url: 'includes/seek.inc.php',
            method: 'POST',
            data: {genspec:genspec},
            dataType:'json',
            success: function(data){
              var newL = data.newList;
              var newLarr = newL.split(', ');
              var ccc = newLarr.pop();

              //update viewpg wt new view n store it 
              document.getElementById('focuspg').value = ccc;
              var content = ccc.split('__');

              pageView(content);

              document.getElementById('bottomList').value = newLarr.join(', ');
              document.getElementById('headingA').innerHTML = content[1];//heading;

            },
            error: function(data){
            }
            
        });

}
 // generateScrollets();

function bringToView(){
          if( $('#bottomList').val() !== ''){ 

               $('.page').addClass('roll-down');
                  setTimeout(function(){
                    $('.page').removeClass('roll-down');
                  //  bottomToFocus();
                  }, 500);
            }
  setTimeout(function(){    
              var bottomL = $('#bottomList').val();
              bottomL != '' ? bottomLArr = bottomL.split(', ') : bottomLArr = '';
              bottomLArr != '' ? _bottomLArr = bottomLArr.pop() : _bottomLArr = 'END REACHED';

              var initFocus = $('#focuspg').val();
              document.getElementById('focuspg').value = _bottomLArr;
             $('#bottomList').val() == '' ? focuspg = 'END REACHED' : focuspg = $('#focuspg').val();
              //update the display
              content = focuspg.split('__');
                  document.getElementById('imgA').style.display = 'none';
                  document.getElementById('imgB').style.display = 'none';
                  document.getElementById('mediaA').style.display = 'none';
                  document.getElementById('mediaB').style.display = 'none';
                  
              $('#bottomList').val() !== '' ? pageView(content) : '';

              $('#bottomList').val() == '' ? document.getElementById('focuspg').value = '' : '';
              ///////////////////////////////
              if($('#bottomList').val() == ''){
                var topL = $('#topList').val();
                document.getElementById('bottomList').value = topL; 
              }
              ////////////////////
              //update toplist wt initFocus
              var topL = $('#topList').val(); 
              initFocus == '' ? _initFocus='' : _initFocus = ', '+initFocus;
              topL == '' ? newTopList = initFocus : newTopList = topL+_initFocus;
              document.getElementById('topList').value = newTopList;
              bottomL != '' ? document.getElementById('bottomList').value = bottomLArr.join(', ') : '';
  }, 500);
}

function reView(){
          if( $('#topList').val() !== ''){ 

                 $('.page').addClass('roll-up');
                  setTimeout(function(){
                    $('.page').removeClass('roll-up');
                  //  focusToTop();

                  }, 500);
            }
  setTimeout(function(){    
              var topL = $('#topList').val();
              var newLarr = topL.split(', ');
              var lastArr = newLarr.pop();
            
            //update bottomList
              var _bottomList = $('#bottomList').val();
              var newBttomList; 

              $('#focuspg').val() != '' ? focuspg = ', '+$('#focuspg').val() : focuspg = '';
              _bottomList == '' ? newBottomList = $('#focuspg').val() : newBottomList = _bottomList+focuspg;

              document.getElementById('bottomList').value = newBottomList;

            //update viewpg wt new view n store it 
              content = lastArr.split('__');
                  document.getElementById('imgA').style.display = 'none';
                  document.getElementById('imgB').style.display = 'none';
                  document.getElementById('mediaA').style.display = 'none';
                  document.getElementById('mediaB').style.display = 'none';

//              $('#topList').val() !== '' ? pageView(content) : '';

              //document.getElementById('focusscript').style.background = 'deepskyblue';
              document.getElementById('focuspg').value = lastArr;
                $('#topList').val() !== '' ? pageView(content) : '';

              //fill top list wt d remaining 
              document.getElementById('topList').value = newLarr.join(', ');
 }, 500);
}

 
function addCheckmark(aoid){
    var selected = $('#selected').val();
    selectedTotal = parseInt(selected) + 1;
    var _aoid = aoid+'_';
    var cat = $('#category').val();
    cat == '' ? cat='_' : cat;
    cat.includes(aoid) ? aoi = cat : aoi = cat+_aoid;
    $('#category').val(aoi);
    document.getElementById('a'+aoid).setAttribute('onclick', 'removeCheckmark('+aoid+')');
    $('#c'+aoid).prop('checked', true);
}
  
  function removeCheckmark(aoid){
    var selected = $('#selected').val();
    selectedTotal = parseInt(selected) - 1;

    var cat = $('#category').val();
    var _aoid = aoid+'_';
    $('#c'+aoid).prop('checked', false);
    document.getElementById('c'+aoid).value = '';

    cat = cat.replace(_aoid, '');

    document.getElementById('a'+aoid).setAttribute('onclick', 'addCheckmark('+aoid+')');
    document.getElementById('category').value = cat;
  }


  function subscribe(aoid){

    var selected = $('#selected').val();
    selectedTotal = parseInt(selected) + 1;
    
    var _aoid = aoid+'_';
    var cat = $('#category').val();
    cat == '' ? cat='_' : cat;
    cat.includes(aoid) ? aoi = cat : aoi = cat+_aoid;
    $('#category').val(aoi);
    document.getElementById('a'+aoid).setAttribute('onclick', 'remove('+aoid+')');
    $('#c'+aoid).prop('checked', true);
    document.getElementById('selected').value = selectedTotal;
    document.getElementById('total').innerHTML = 0;
    $('.plan').prop('checked', false);
    
  }
  
  function remove(aoid){
var selected = $('#selected').val();
    selectedTotal = parseInt(selected) - 1;

    var cat = $('#category').val();
    var _aoid = aoid+'_';
    $('#c'+aoid).prop('checked', false);
    document.getElementById('c'+aoid).value = '';

    cat = cat.replace(_aoid, '');

    document.getElementById('a'+aoid).setAttribute('onclick', 'subscribe('+aoid+')');
    document.getElementById('category').value = cat;
    document.getElementById('selected').value = selectedTotal;
   document.getElementById('total').innerHTML = 0;
    $('.plan').prop('checked', false);
  
  }

  function sumUp(x){
    var selections = $('#selected').val();
    var total = selections * x;
   document.getElementById('total').innerHTML = total;
   x ==1000 ? desc = 'Unlimited access to solution contents per topic for 30Days.' : ( x === 3000 ? desc = '1 free consultation + Unlimited access to Solution contents per topic for 30Days.' : desc = '3 free consultations + Unlimited access to Solution contents per topic for 30Days.');
   
   document.getElementById('planDesc').innerHTML = desc;
   
  }
///////////////////////////

function checkSelection(){
  var category = document.querySelector('input[name="category"]:checked');
  category ? $('#textQ').show() : alert('Select a topic first');
  document.getElementById('textspace').focus();
}

$(document).on('click','.category', function(){ 
 document.getElementById('post_enq').disabled = false;
 $('#textQ').show();
  document.getElementById('textspace').focus();
    
});


 
if("loading" in HTMLImageElement.prototype){
  const lazyImages = document.querySelectorAll("img.lazy");
  lazyImages.forEach(img => {
    img.src = img.dataset.src;
    });
}else{
  var observer = new IntersectionObserver(lazyLoad, {
    rootMargin: "100px",
    threshold: 1.0
  });

  function lazyLoad(elements){
    elements.forEach(image => {
      if(image.IntersectionRatio > 0){
        image.src = image.dataset.src;
        observer.unobserve(item.target);
      };
    });
  };

var lazyImages = document.querySelectorAll("img.lazy");
lazyImages.forEach(img => {
  observer.observe(img);
});

}

function displayProfileMenu(){
      var id = $('.menuBar').attr('id');
//      .replace('menuBar', 'menuBarShow');
      if(id=='menuBar'){
        $('#menuBar').append('<div class="menuList" id="menuList" style="filter:drop-shadow(-2px 2px 2px #ccc); position:fixed; right:1%; border-radius:5px; background:#fff; margin-top:10px; padding:20px; font-size:15px; text-align:left;">'+
        '<p style="margin:-10px auto -10px auto;"><a href="verify" style="color:black;">Verification check</a></p><hr>'+
        '<p style="margin:-10px auto -10px auto;"><a href="setprofile" style="color:black;">Profile settings</a></p><hr>'+
        '<p style="margin:-10px auto 0px auto;"><a href="" style="color:black;">Other settings</a></p>'+
      '</div>');
      document.getElementById('menuBar').id='menuBarHide';

      }else{
          $('.menuList').hide();
      document.getElementById('menuBarHide').id='menuBar';
      }

}




useAud();
function useAud(){
        $(document).on('click','#useAudio',function(){
          $('#useAudio').css('font-size','30px');
          
          $('#textRec').remove();
          $('#audioRec').show();
//          $('.countDown').show();  
        });
      }



$(document).on('click','.item', function(){ 
  var did =$(this).prop('id').replace('itemContainer', '');
  $('#proof'+did).show('slow');
  $('.item'+did).css('font-size','20px');
});

    function response(msg, bgcolor){
       $('#response').show();

       var div = document.createElement("div");
          var node = document.createTextNode(msg);
          div.appendChild(node);
          var respPanel = document.getElementById('response');
          var child = document.getElementById("commentOpener");
          respPanel.appendChild(div);
          div.setAttribute("id", "response2");
     
        $('#response2').css({'z-index':10, 'font-size':'16px', 'font-family':'roboto', 'border-radius':'5px', 'text-align':'center', 'padding':'5px', 'color':'#fff', 'background-color':bgcolor});

            setTimeout(function(){
                $('#response').fadeOut();
                setTimeout(function(){
                   respPanel.removeChild(div);
                }, 50);
            }, 30000);
    }

//Javascript for darkMode switch
if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  document.documentElement.setAttribute("dark", true);
}

//Complete reg form caller
$(document).on('click','.forceRegCompletion', function(){ 
  $('#completeReg').show();
});




