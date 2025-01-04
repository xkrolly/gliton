
function validate(selectIdArray, inputIdArray){
var resp='';
 if(selectIdArray.length > 0){
   
    selectIdArray.forEach(function(id){
      if($('#'+id+' :selected').val()==''){
        resp += 1;
        document.getElementById('check_'+id).innerHTML = '<span style="color:red; font-size:12px; font-style:italic;">Select an option!</span>';
        $('#'+id).css('border','1px solid red');
      }else{document.getElementById('check_'+id).innerHTML =''; resp += 0;}
   
    });

  }
  
 if(inputIdArray.length > 0){
    inputIdArray.forEach(function(id){
      if($('#'+id).val()==''){
         document.getElementById('check_'+id).innerHTML = '<span style="color:red; font-size:12px; font-style:italic;">This field is empty!</span>';
        $('#'+id).css('border','1px solid red');
        resp += 1;
     }else{ document.getElementById('check_'+id).innerHTML =''; resp += 0;}
    });

  }
return resp;
}

function response(msg, bgcolor){
       var div = document.createElement("div");
          var node = document.createTextNode(msg);
          div.appendChild(node);
          var respPanel = document.getElementById('response');
          respPanel.appendChild(div);
          
        $('#response').css({'z-index':10, 'font-size':'16px', 'font-family':'roboto', 'border-radius':'5px', 'text-align':'center', 'padding':'5px', 'color':'#fff', 'background':bgcolor});

            setTimeout(function(){
                            $('#response').fadeOut();
                           setTimeout(function(){
                             respPanel.removeChild(div);
                            }, 50);    
                        }, 120000);
    }


//OTP signup 
$(document).ready(function(){
  //infobipnew/src/sms/send-sms-basic.php',
    $('#signup_data').on('submit', function(event){
      event.preventDefault();

      $.ajax({
        url: 'includes/signup.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){

          var output=data.ajaxReply;
          var mobile = '+234'+ data.mobile.slice(1);
          var code = data.code;
          var OTP = 'Your Glit OTP code is '+code;
           output == '1' ? document.getElementById('whatsap-share').innerHTML ="<a href='https://wa.me/"+mobile+"?text="+OTP+"' style='text-decoration:underline; padding:10px; background:#0f0; filter:dropshadow(2px 2px 2px #ccc); border-radius:5px; font-weight:bold; color:#000;'>Click here to get OTP via WhatsApp</a>" : '';
           output == '1' ? document.getElementById('whatsap-share2').innerHTML ="<a href='https://wa.me/"+mobile+"?text="+OTP+"' style='text-decoration:underline; padding:10px; background:#0f0; filter:dropshadow(2px 2px 2px #ccc); border-radius:5px; font-weight:bold; color:#000;'>Click here to get OTP via WhatsApp</a>" : '';
           
           /* document.getElementById('whatsap-share').innerHTML = "<a href='whatsapp://send?text=Your GLiT OTP is"+OTP+"' action='share/whatsapp/share' target='_blank'>View OTP on WhatsApp</a>";*/
          output == '1' ? bgcolor = 'green' : bgcolor ='red';
          output=='1' ? document.getElementById('otpVerifyFm').innerHTML=
          "<form id='otpCheck' method='post' action='includes/otpverifier.inc.php'>"+
          "<input inputmode='numeric' autofocus name='otp' placeholder='Enter your OTP' style='padding:10px; background:#ecf0f3; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white; border-bottom-left-radius:50px; border-top-left-radius:50px; margin-top:10px; margin-bottom:10px;'/>"+
          "<input type='hidden' name='mobile' value='"+mobile+"' />"+
          "<button type='submit' style='background:deepskyblue; color:#fff; padding:7px; border-top-right-radius:50px; border-bottom-right-radius:50px; width:50px; font-size:15px;' id='verify' class='btnVerify'>Verify</button>"+
          "</form>" : '';

output=='1' ? document.getElementById('otpVerifyFm2').innerHTML=
          "<form id='otpCheck' method='post' action='includes/otpverifier.inc.php' style='display:flex; justify-content:center; margin-bottom:10px;'>"+
          "<div><input inputmode='numeric' autofocus name='otp' placeholder='Enter your OTP' style='padding:10px; background:#ecf0f3; box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;'/>"+
          "<input type='hidden' name='mobile' value='"+mobile+"' /></div>"+
          "<div><button type='submit' style='background:deepskyblue; color:#fff; padding:7px; font-size:12px;' id='verify' class='btnVerify'>Verify</button></div>"+
          "</form>" : '';

          output=='1' ? msg='Successful, retrieve OTP from WhatsApp through above button/link and enter it into the provided space to verify your mobile.' : (output=='3' ? msg='This contact is a registered user' : (output == 4 ? msg='Fill in your mobile digit correctly and try again' : msg='Error occured, try again!')); 
          response(msg, bgcolor);
        },
        error: function(data){
          var bgcolor='red';
          var msg='Registration error, pls try again.';
          response(msg, bgcolor);
        }
      });
  });

});

//OTP starts
function sendOTP() {
	$(".error").html("").hide();
	var number = $("#mobile").val();
	if (number.length == 10 && number != null) {
		var input = {
			"mobile_number" : number,
			"action" : "send_otp"
		};
		$.ajax({
			url : 'controller.php',
			type : 'POST',
			data : input,
			success : function(response) {
				$(".container").html(response);
			}
		});
	} else {
		$(".error").html('Please enter a valid number!')
		$(".error").show();
	}
}

function verifyOTP() {
	$(".error").html("").hide();
	$(".success").html("").hide();
	var otp = $("#mobileOtp").val();
	var input = {
		"otp" : otp,
		"action" : "verify_otp"
	};
	if (otp.length == 6 && otp != null) {
		$.ajax({
			url : 'controller.php',
			type : 'POST',
			dataType : "json",
			data : input,
			success : function(response) {
				$("." + response.type).html(response.message)
				$("." + response.type).show();
			},
			error : function() {
				alert("ss");
			}
		});
	} else {
		$(".error").html('You have entered wrong OTP.')
		$(".error").show();
	}
}
//Controller.php
//OTP Ends

function ajaxSubmitter(formToSubmit, processor_URL, selectIdArray, inputIdArray){
  $(formToSubmit).on('submit', function(event){
      event.preventDefault();
      //var sum = selectIdArray.length + inputIdArray.length;
      var detectError = validate(selectIdArray, inputIdArray);
//      alert(check);
if(detectError == 0){
      $.ajax({
        url: processor_URL,
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
          var msg=data.ajaxReply;
          var bgcolor='#002';
          response(msg, bgcolor);
          $('#mdd').hide();
          $(formToSubmit)[0].reset();
        },
        error: function(data){
          var bgcolor='red';
          var msg='Failed try again.';
          response(msg, bgcolor);
        }
      });
    }
  });
}

$(document).ready(function(){
$('#login_data').on('submit', function(event){
    event.preventDefault();
      if( $('#uname').val()==''){
           document.getElementById('uname-input-check').innerHTML="<span style='color:red; font-size:12px;'>Input username!</span>";
             $('#uname').css('border', '1px solid red');
          localStorage.setItem('app_uname', $('#uname').val());
     
        }
       if( $('#pwd').val()==''){
           document.getElementById('pwd-input-check').innerHTML="<span style='color:red; font-size:12px;'>Input password!</span>";
             $('#pwd').css('border', '1px solid red');
          localStorage.setItem('app_pwd', $('#pwd').val());
         
        }

if( $('#uname').val() !=='' && $('#pw').val() !==''){
      
    $.ajax({
        url: 'includes/login.inc.php',
        method: 'post',
        data: new FormData(this),
        dataType:'json',
        contentType: false,
        cache: false,
        processData: false,
        success: function(data){
            if(data.url=='login'){

              //the 3 lines below to be removed OR data.prv is simply fetched locally
                 var pwd_enc_prv = data.prv;
                 //var enc_pwd = localStorage.getItem('encP');
                 var pwd =data.pwd;
                 var enc_pwd = sym_encrypt(data.pwd, data.un);
                          localStorage.setItem("un", data.un);
                          localStorage.setItem("encP", enc_pwd);
                          localStorage.setItem("prv", pwd_enc_prv);

                window.location.href='scrolls';

            }else{
          var msg= data.ajaxReply;
          var bgcolor='#002';
          var id=data.id;
          response(msg, bgcolor);
          }
        },
        error: function(data){
            $('#login_data')[0].reset();
          var msg='Sorry, You cannot be logged in now, please check your internet and try again!';
          var bgcolor='red';
          var id=data.id;
          response(msg, bgcolor);
        }
      });
  }

  });
});

/*
function updatemyPubtoDB(pub, me){
   $.ajax({
            url: 'includes/updatepub.inc.php',
            method: 'GET',
            data: {pub: pub, me: me},
            dataType:'json',
            success: function(data){
         window.location.href='enquiry';
                        
      }
    });
}*/