
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
                    document.getElementById('productIMG') ? $('#productIMG').slideUp('1500') : '';
                    document.getElementById('productIMG2') ? $('#productIMG2').slideUp('1500') : '';
		    document.getElementById('mediaA') ? document.getElementById('mediaA').setAttribute('poster', '') : '';
		    document.getElementById('mediaB') ? document.getElementById('mediaB').setAttribute('poster', '') : '';
                 
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
              var thumb = content[38];
              var thumb2 = content[39];
              var tppimg = content[40];

              
              var posterA = strDir+'/thumb/'+que+'t';
              var posterB = strDir2+'/thumb/'+que2+'t';

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
                
//                document.getElementById('totalShares').innerHTML = shared;
                
                function numEestimator(a){
                 
                  a.length == 4 ? y = 1 : (a.length == 5 ? y = 2 : (a.length == 6 ? y = 3 : y = 4 )); 
                  var _a = a.substr(y, 1);
                  a.length >= 4 ? 
                  output = a.substr(0, y)+'.'+_a+'K' : output = a;
                  return output;
                }
                 shared === undefined ? shared = 0 : shared = numEestimator(shared);
                document.getElementById('totalShares').innerHTML = shared;
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
                  if(thumb != ''){document.getElementById('mediaA').setAttribute('poster', 'videos/'+posterA+'.webp');}
                  document.getElementById('imgA').style.display = 'none';
                  document.getElementById('wordingsA').style.display = 'none';
                  $('.flexible2').stop();

		      const video = document.getElementById('mediaA');

		      const observer = new IntersectionObserver((entries) => {
			      if(entries[0].isIntersecting) {
				      const source = video.querySelector('source');
				      source.src = source.dataset.src;
				      video.load();
				      observer.unobserve(video);
			      }
		      }, {
			      threshold: 0.5,
		      });
		      observer.observe(video);

                                    ///////////////////3ppp
	          if(tppimg == ''){
        		document.getElementById('productIMG').style.display = 'none'; document.getElementById('productIMG2').style.display = 'none';
  			document.getElementById('like').setAttribute('onclick', 'likeDis("fpp");');
			document.getElementById('favorite').setAttribute('onclick', 'saveFav("fpp");');

		  }

                    if(tppimg != ''){
                      tppimg2 = tppimg+'_2';
                      document.getElementById('productIMG').style.display = 'block';
                      document.getElementById('productIMG2').style.display = 'block';
                      document.getElementById('productIMG').src = 'img3pp/'+strDir+'/'+tppimg+'.webp';
                      document.getElementById('productIMG2').src = 'img3pp/'+strDir+'/'+tppimg2+'.webp';
    		      document.getElementById('like').setAttribute('onclick', 'likeDis("tpp");');
		      document.getElementById('favorite').setAttribute('onclick', 'saveFav("tpp");');
                       
                    }

		      

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
                //  if(thumb2 != ''){document.getElementById('mediaB').setAttribute('poster', 'videos/'+posterB+'.webp');}
                  document.getElementById('imgB').style.display = 'none';
           //THREE
//                  media != 3 ? document.getElementById('mediaB').play() : 
  //                document.getElementById('mediaB').pause();
		      const video = document.getElementById('mediaB');

		      const observer = new IntersectionObserver((entries) => {
			      if(entries[0].isIntersecting) {
				      const source = video.querySelector('source');
				      source.src = source.dataset.src;
				      video.load();
				      observer.unobserve(video);
			      }
		      }, {
			      threshold: 0.5,
		      });
		      observer.observe(video);


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

              
              //Share shareData(title, text, href)
              var url = 'https://glit.ng/checkout.php?&checkoutid='+pubidEnc;
              var title = insight;
              var text = heading;
              document.getElementById('shareContent').setAttribute('onclick', 'shareData(\"'+title+'\", \"'+text+'\", \"'+url+'\", \"'+pubidEnc+'\")');

                  shareContent
              //script content
            var scriptURL ="index.php?page=peepChats&pub="+pubidEnc;
                insight = insight.replace('<br />', '&&&&&');
                insight = insight.replace('<br />', '&&&&&');
                insight = insight.replace('<br />', '&&&&&');
              document.getElementById('_contentScript').setAttribute('onclick', 'paymentSubpage(\"'+scriptURL+'\", \"'+heading+'\", \"'+price+'\", \"'+balance+'\", \"'+insight+'\")');
              document.getElementById('_contentScript2').setAttribute('onclick', 'paymentSubpage(\"'+scriptURL+'\", \"'+heading+'\", \"'+price+'\", \"'+balance+'\", \"'+insight+'\")');

}

function paymentSubpage(url, title, price, balance, insight){
    var price = parseInt(price)/1000;

    balance < price ? disable='disabled' : disable = '';

var widthFactor = balance/price;
var width = widthFactor * 40;
width > 100 ? width = 100 : width;
	
var subpage = " <div id='paySubpage' style='background:#fff; padding:20px; color:#000; height:100%; width:100%; position:fixed; top:0; right:0; bottom:0;'>"+
                    "<div style='display:flex; flex-direction:column; height:100%; padding:10px; align-items:center; justify-content:space-around; border:5px solid #2166f3; border-radius:20px;'>"+
                    "<div style='display:flex; align-items:center; color:#000; width:100%; text-align:center; font-size:14px;'><span onclick='cancelPay();' style='margin-right:auto; color:#000; font-size:18px; text-align:left;'>&lt;&lt;</span>Pay "+price+"<sup style='font-size:10px;'>GC</sup> to own this solscript<span style='margin-left:auto; color:transparent; font-size:16px; text-align:right;'>&lt;&lt;</span></div>"+
                    "<div style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:100px; width:100px; border-top:2px solid gold;'>"+
                      "<span class='material-icons' style='font-size:50px; color:gold;'>&#xea24;</span>"+
                    "</div>"+
                    
                    "<h2 style='color:#000; width:100%; text-align:center; padding:20px; font-family:roboto; font-weight:bold; font-size:24px;'>Practical strategies to raise broilers efficiently</h2>"+
                    "<div style='font-size:14px; padding:20px;'>"+insight+"</div>"+
                    "<div style='font-size:16px;'>@</div>"+
                    "<div style='display:flex; justify-content:center; align-items:center; font-weight:bold; font-size:25px; color:#fff; background:#2166f3; border-radius:50%; height:60px; width:60px; filter:drop-shadow(1px 1px 1px #ccc);'>"+price+"<sup style='font-size:6px;'>GC</sup></div>"+
                    "<div id='walletBal' style='font-size:12px;'>- Bal "+balance+"<sup style='font-size:6px;'>GC</sup> - </div>"+
                    "<div style='display:none; flex-direction:column; align-items:center; width:100%;'><button id='payBtn' class='theme form-control' style='border-radius:10px; width:100%; padding:10px; padding-bottom:35px;'>Proceed to pay</button></div>"+
                    "<div id='pay' style='display:none; flex-direction:column; align-items:center; width:100%;'><button id='payBtn' class='theme form-control' style='border-radius:10px; width:100%; padding:10px; padding-bottom:35px;'>Proceed to pay</button></div>"+

                    "<div style='display:flex; flex-direction:column; align-items:center; width:100%;'>";
if(balance >= price){
        subpage += "<a href='"+url+"' "+disable+" style='width:100%; text-decoration:none;'><button id='payBtn' class='theme form-control' style='border-radius:10px; width:100%; padding:10px; padding-bottom:35px;'>Proceed to pay</button></a>";
}
if(balance < price){
        subpage += "<span id='fund_note' style='color:red; font-size:14px;'>Insufficient fund!</span>"+
                        "<a href='index.php?page=buycoin&price="+price+"' style='width:100%; text-decoration:none;'><button id='fundWallet' class='fundWallet theme2 form-control' style='border-radius:10px; width:100%; padding:10px; padding-bottom:35px; border:1px solid #2166f3;'>Fund your wallet</button></a>";
}				
subpage +=       "</div>"+

              "</div></div>";
/*/////////////////////////////////////////
  var subpage = " <div id='paySubpage' style='background:#fff; padding:20px; color:#000; height:100%; width:100%; position:fixed; top:0; right:0; bottom:0;'>"+
                    "<div style='display:flex; flex-direction:column; height:100%; padding:10px; align-items:center; justify-content:space-around;'>"+
                    "<div style='display:flex; align-items:center; color:#000; width:100%; text-align:center; font-size:14px;'><span onclick='cancelPay();' style='margin-right:auto; color:#000; font-size:18px; text-align:left;'>&lt;&lt;</span>Pay "+price+"<sup style='font-size:10px;'>GC</sup> to own this solscript<span style='margin-left:auto; color:transparent; font-size:16px; text-align:right;'>&lt;&lt;</span></div><br><br>"+
                    "<div style='display:flex; justify-content:center; align-items:center; border-radius:50%; height:100px; width:100px; border-top:2px solid gold;'>"+
                      "<span class='material-icons' style='font-size:50px; color:gold;'>&#xea24;</span>"+
                    "</div>"+
                    "<h4 style='color:#111; width:100%; text-align:center; padding:20px; font-family:roboto; font-weight:bold; font-size:18px;'>"+title+"<span class='material-icon' onclick='copyToClipboard(\""+url+"\");' id='clipboardCopy' style='margin-left:10px; color:#2166f3; font-size:14px;'>&#xe157;</span></h4>"+
 "<div style='font-size:12px; padding:5px 20px 20px 10px; text-align:center;'>"+insight+"</div>"+
                    "<div style='font-size:14px;'>@</div>"+
                    "<div style='display:flex; justify-content:center; align-items:center; font-weight:bold; color:#2166f3; margin-bottom:8px;'><span style='font-size:30px; font-weight:bold;'>"+price+"</span><sup style='font-size:10px;'>GC</sup></div>"+
                    "<div style='display:flex; flex-direction:column; align-items:center; justify-content:center;'>"+
	                    
	  	    	"<div style='display:flex; align-items:center; justify-content:center;'>"+	
		   	    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
	                    "<span style='width:5px; height:5px; border:1px solid #2166f3; border-radius:50%;'></span>"+
		     	"</div>"+
                        "<div id='walletBal'  style='font-size:12px; margin-top:8px;'>"+
                            "<div id='walletSpher' style='display:flex; justify-content:center; align-items:center; '><span style='font-size:20px; font-weight:bold;'>"+balance+"</span><sup style='font-size:8px;'>GC</sup></div>"+
                            "<div id='wallet' style='display:flex; justify-content:center; align-items:center;'><span class='material-icons' style='font-size:16px;'>&#xe850;</span> Bal</div>"+
                        "</div>"+
                    "</div><br><br><br>";
                    
if(balance < price){
      subpage +=   "<div style='width:100%;'><a href='index.php?page=buycoin&price="+price+"' style='width:100%;'><button id='fundwallet' class='form-control theme' style='border-radius:10px; width:100%; padding:20px auto 20px auto; color:#fff;'>Fund your wallet</button></a></div>";
}    
      subpage +=    "<div style='display:flex; flex-direction:column; align-items:center; font-size:12px; width:100%;'><a href='"+url+"' "+disable+" style='width:100%; text-decoration:none;'><button "+disable+" id='payBtn' class='form-control' style='border-radius:10px; width:100%; padding:20px auto 20px auto; color:#fff;'>Proceed to pay</button></a><span style='margin:10px auto;'></span>"+

                 
                    "</div>"+
                 
                  "</div></div>";*/
$('main').hide();
document.getElementById('_paymentSubpage').innerHTML = subpage;
document.getElementById('_paymentSubpage').style.display = 'block';
  /*
	if(balance < price){
        document.getElementById('payBtn').style.color = '#eee';
        document.getElementById('payBtn').style.border = '1px solid #eee';
        document.getElementById('walletBal').style.color = 'red';
        document.getElementById('wallet').style.color = 'red';
        document.getElementById('fundwallet').style.background = '#2166f3';
        document.getElementById('walletSphere').style.background = 'red';
        document.getElementById('walletSphere').style.color = '#fff';
 
        
    }
    if(balance >= price){ 
        document.getElementById('walletBal').style.color = 'green';
        document.getElementById('fundwallet').style.color = '#ddd';

        document.getElementById('wallet').style.color = 'green';
        document.getElementById('payBtn').style.background = 'green';
        document.getElementById('payBtn').style.color = '#fff';
        document.getElementById('walletSphere').style.background = 'green';
    }
*/    
}
function recordShare(id){

              var shr = document.getElementById('totalShares').innerHTML;
              var newShr = parseInt(shr) + 1;
              document.getElementById('totalShares').innerHTML = newShr;

    $.ajax({
            url: 'includes/recordShared.inc.php',
            method: 'POST',
            data: {id:id},
            dataType:'json',
            success: function(data){
            },
            error: function(data){

            }
          });
}
    async function shareData(title, text, href, id) {
      recordShare(id);
      try{
        await navigator.share({
          title: title,
          text: text,
          url: href,
        });
      } catch (error){
        console.error('error: ', error);
      }
    };

/*function shareData(title, text, href){
  if(navigator.share){
    //document.getElementById('shareContent').addEventListener('click', 
    async () => {
      try{
        await navigator.share({
          title: title,
          text: text,
          url: href, //window.location.href,
        });
      } catch (error){
        console.error('error: ', error);
      }
    };
  }else{
    console.log('web share api not supported');
  }
}
*/
function cancelPay(){
document.getElementById('_paymentSubpage').innerHTML = '';
document.getElementById('_paymentSubpage').style.display = 'none';
$('main').show();

}

function copyToClipboard(text){

 // var link = 'localhost/gliton/checkout.php?&checkoutid='+text.replace('index.php?page=peepChats&pub=', '');
  var link = 'https://glit.ng/checkout.php?&checkoutid='+text.replace('index.php?page=peepChats&pub=', '');
  navigator.clipboard.writeText(link).then(() => {
    document.getElementById('clipboardCopy').style.display = 'block';
    document.getElementById('clipboardCopy').innerHTML = 'link successfully copied';
    document.getElementById('clipboardCopy').style.color = 'green';

  }).catch((error) => {
    var err = 'error copying to clipboard: '+error;
    document.getElementById('clipboardCopy').style.display = 'block';
    document.getElementById('clipboardCopy').innerHTML = err;
    document.getElementById('clipboardCopy').style.color = 'red';
    
  });
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



