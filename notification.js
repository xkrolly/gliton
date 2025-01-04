
//function notify(header, msgbody){
const notification = 'Olaiyiwola is in urgent need of your experties!';
//'GLIT notification';//document.querySelector('#notification');
const sendButton = document.querySelector('#sendnote');
const registration = navigator.serviceWorker.getRegistration();

const sendNotification = function async () {
  if(Notification.permission === 'granted') {
    showNotification(notification.value);
  }
  else {
    if(Notification.permission !== 'denied') {
      const permission = Notification.requestPermission();
  
      if(permission === 'granted') {
        showNotification(notification.value);
      }
    }
  }
  };
  
  const showNotification = body => {
  const title = 'Glit consult';
  
  const payload = {
    body : notification
  };
  
  if('showNotification' in registration) {
    registration.showNotification(title, payload);
  }
  else {
    new Notification(title, payload);
  }
};

    
//sendButton.addEventListener('load', sendNotification);
    

/////////////////////////
$(window).on('load', function () {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      randomNotification();
    }
  });
});



function randomNotification(nTitle, nBody, nImg) {
  /*const randomItem = Math.floor(Math.random() * 6);//games.length);
  const notifTitle = 'Glit update';
  const notifBody = 'You are being updated right now';
  const notifImg = '';*/
  const options = {
    body: nBody,
    icon: nImg,
  };
  new Notification(nTitle, options);
  setTimeout(randomNotification, 30000);
}
