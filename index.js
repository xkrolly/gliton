//initializeFirebase();

/*if ("serviceWorker" in navigator){
	navigator.serviceWorker.register("sw.js").then(registration => {
		console.log("SW registered!");
		console.log(registration);
	}).catch(error => {
		console.log("SW registration failed!");
		console.log(error);
	})
}*/

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').then(() => { console.log('Service Worker Registered'); });
  
   navigator.serviceWorker.addEventListener("message", (event) => {
    // event is a MessageEvent object
    console.log(`The service worker sent me a message: ${event.data}`);
  });

  navigator.serviceWorker.ready.then((registration) => {
    registration.active.postMessage("Hi service worker");
  });
}

//let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';


window.addEventListener('afterinstallprompt', (e) => {
    //auto login setup

    const xhr=new XMLHttpRequest();
              localStorage.setItem('app_uname', $('#uname').val());

    var un = localStorage.getItem('app_uname');
    var pw = localStorage.getItem('app_pwd');
    var fd=new FormData();
    fd.append("uname", un);
    fd.append("pwd", pw);
    xhr.open("POST", 'includes/login.inc.php', true);
    xhr.send(fd);
});

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

addBtn.addEventListener('click', () => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
         if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

function getMyLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(redirectToPos);
   } else { 
     var msg="Put on your device location ( <i class='fa fa-map-marker' style='color:#2166f3'></i> ) to use this app!";
     var bgcolor='#002';
     var id='';
     var respSelector='response';
     response(msg, bgcolor, id, respSelector);
    }
}
    
function redirectToPos(position) {
    var lat =position.coords.latitude;
    var lng =position.coords.longitude;
    {maximumAge:10000; timeout: 5000; enableHighAccuracy: true}

    $('#latd').val(lat);
    $('#lngd').val(lng);
}
