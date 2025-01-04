function countDownJs(diff){
    const targetDate = new Date().getTime() + diff;
		let days, hours, minutes, seconds;

getCountdown();

const timer = setInterval(getCountdown, 1000);

function pad(n) {
  return (n < 10 ? '0' : '') + n;
}

function getCountdown() {
  const currentDate =  new Date().getTime();
  let secondsLeft = (targetDate - currentDate) / 1000;

  if (secondsLeft < 0){
    document.getElementById('chatInputShell').style.display = 'flex';
    clearInterval(timer);
    return;
  }

  days = pad(parseInt(secondsLeft / 86400));
  secondsLeft = secondsLeft % 86400;

  hours = pad(parseInt(secondsLeft/3600));
  secondsLeft = secondsLeft % 3600;

  minutes = pad(parseInt(secondsLeft / 60));
  seconds = pad(parseInt(secondsLeft % 60));
  
//  var countdown = document.getElementById('countdown'); 
const countdown = document.getElementById("tiles");
  countdown.innerHTML = 
    '<span>'+days+'</span>'+
    '<span>'+hours+'</span>'+
    '<span>'+minutes+'</span>'+
    '<span>'+seconds+'</span>';
}
}


function pay(uniqid, amount, email, contact, fullname, redirectURL, paymentFor, productID){
	window.location.href = redirectURL;
	// "index.php?page=groupchat&lectureid="+productID;
	/*amount < 0 ?
	FlutterwaveCheckout({
		public_key: "FLWPUBK_TEST-9361b6f6f68c22825a62da947fc20c1b-X",
		tx_ref: uniqid,
		amount: amount,
		currency: "NGN",
		payment_options: "card, ussd",
		redirect_url: redirectURL,
		meta: {
			consumer_id: productID,
			consumer_mac: '',
		},
		customer: {
		email: email,
		phone_number: contact,
		name: fullname,
		},
		customizations: {
		title: "Glit solution script",
		description: paymentFor,
		},
	}) : window.location.href = redirectURL;*/
}

function makePayment(amount, redirectURL){
	  $.ajax({
            url: 'includes/callPay.inc.php',
            method: 'GET',
            data: {amount:amount, redirectURL:redirectURL},
            dataType:'json',
            success: function(data){
            	alert('payment success in ajax');
            },
            error: function(data){
            }
            
    });
}