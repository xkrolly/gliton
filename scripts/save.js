/*let scrollTimeout = null;

$(window).on('scroll', function() {
  const scrollPosition = $(window).scrollTop();
  const documentHeight = $('#scrollet').height() / 50;
    console.log(scrollPosition+' :page end reached: '+documentHeight);

  if(scrollPosition >= documentHeight){
    console.log('page end reached');
 
  $(window).on('wheel', function(event){
    if(event.originalEvent.deltaY > 0){
      console.log('scrolling down at d END again');
    }
    if(event.originalEvent.deltaY < 0){
      console.log('scrolling UP at d END again');
    }
  });
 }
});










var scrollPosition = window.scrollY;
let scrollTimeout = null;


    
//window.addEventListener('scroll', (e) => {
  $(window).on('scroll', (e) => {
  
  //console.log('bottom scroll???');

            e.preventDefault();
            scrollAmount = 0;//e.deltaY * 0.999;
            window.scrollTop += scrollAmount;
            if(scrollTimeout){
              clearTimeout(scrollTimeout);
            }

       var dir = 0;
       var currentPosition = window.scrollY;
           
       scrollTimeout = setTimeout(() => {

              var currentPosition = window.scrollY;
              if(currentPosition < scrollPosition){
                reView();
                console.log('scroll uppp');
                dir += 30;//30.6666;
            //const scrollet = 
            document.getElementById('topscript').style.display = 'block';
            document.getElementById('scrollet').scrollTop = 200;
            document.getElementById('bottomPad').style.display = 'none';
//            document.getElementById('bottomscript').style.height = '0';


              } 
              if(currentPosition > scrollPosition){
              
              document.getElementById('bottomList').value == '' ? generateScrollets() : '';
              bringToView();
                console.log('scroll down');
                dir += 0;//.6666;
            document.getElementById('bottomPad').style.display = 'block';
            var _btmpd = $('#_bottomPad').val();
            var btmpd = parseInt(_btmpd) + 1;
            document.getElementById('bottomPad').style.height = btmpd+'px';
            document.getElementById('_bottomPad').value = btmpd;
            



              } 
           
              scrollPosition = currentPosition;

      }, 100);
    dir == 30 ? xv = 'bottomH' : xv = 'topscript';
            document.getElementById(xv).style.display = 'none';

});*/
