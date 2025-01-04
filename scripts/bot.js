$(document).ready(function(){
	$('#chatbot_data').on('submit', function(event){
    	event.preventDefault();

    	var userchat = $('#userchat').val().toLowerCase();
    	if(userchat.length == 1){ 
    	 var s_pan = document.createElement('span');
    	   s_pan.setAttribute("id", 'chatspan');
           s_pan.setAttribute("style", 'background:#fff; max-width:80%; padding:10px; border-radius:10px; filter:drop-shadow(-1px 1px 1px #777);');             

    	 var div = document.createElement('div');
    	 div.setAttribute('style', 'margin:25px 10px 25px 25px; text-align:right;');
    	 div.appendChild(s_pan);
    	  document.getElementById('bot_chats').appendChild(div);
    	  //var chat = document.getElementById('bot_chats').appendChild(s_pan);
          document.getElementById('chatspan').innerHTML = userchat;
          document.getElementById('chatspan').removeAttribute('id');


    	 var div = document.createElement('div');
    	 div.setAttribute('style', 'margin:25px 25px 25px 10px; text-align:left;');
    	  
    	  var span = document.createElement('div');
    	  span.setAttribute("id", 'chatspan2');
          span.setAttribute("style", 'font-size:14px; background:#eff; max-width:80%; padding:10px; border-radius:10px; filter:drop-shadow(1px -1px 1px #777);');             

  		  div.appendChild(span);
    	  document.getElementById('bot_chats').appendChild(div);

          localStorage.getItem('responseStack')!='' ? prev = localStorage.getItem('responseStack') : prev = '';

          var newresponse = prev.concat(userchat);//String(prev)+String(response);
          var response = botreply(newresponse);
          localStorage.setItem('responseStack', newresponse);
        //  alert(newresponse);
    	  //var chat = document.getElementById('bot_chats').appendChild(s_pan);
          document.getElementById('chatspan2').innerHTML = response;
          document.getElementById('chatspan2').removeAttribute('id');
		   window.scrollBy(-200000000000000, 20000000000000000000);

		}
		else{alert('Your selection does not exist');}
 	});
});


function renewbotchat(){
//http://localhost/guruit/index.php?page=bot
	localStorage.getItem('responseStack') == 0 ? window.location.href='enquiry' : localStorage.setItem('responseStack', '');

}

function removeThis(msg){
	$('#overlay').hide(); $('#response').hide();
}

function showDetail(msg){
       var div = document.createElement("div");
        $('#overlay').css({'display':'block', 'position':'fixed', 'left':0, 'right':0, 'top':0, 'bottom':0, 'height':'101vh', 'width':'101vw', 'z-index':'10', 'font-size':'16px', 'font-family':'roboto', 'border-radius':'5px', 'text-align':'center', 'padding':'5px', 'color':'#fff', 'background':'#fff'});
          var respPanel = document.getElementById('overlay');
          respPanel.appendChild(div);
 
//        document.getElementById('overlay').innerHTML = "<div style='display:flex; justify-content:center; height:100%; width:95%;'><img id='"+msg+"' onclick='removeThis("+msg+")' src='img/mockup/"+msg+".jpg' style=''/></div>";//height:100%; width:100%; object-fit:cover;
          document.getElementById('overlay').innerHTML = "<img id='"+msg+"' onclick='removeThis("+msg+")' src='img/mockup/"+msg+".jpg' style=''/>";
  
        $('#response').css({'display':'block', 'position':'fixed', 'left':0, 'right':0, 'top':'80%', 'bottom':0, 'z-index':'11', 'opacity':0.6, 'font-size':'16px', 'font-family':'roboto', 'text-align':'justify', 'padding':'20px', 'color':'#fff', 'background':'#000'});
        document.getElementById('response').innerHTML = "<span style='z-index:12; font-size:16px;'>100G Levanor to 200L of water</span>";
}

function botreply(r){
	switch (true) {
		case r == 'a':
		var reply = 'Select your interest in any of these:<br><br>A. Chicken<br>B. Goat/Sheep/Cattle<br>C. Pig<br>D. Rabbit/Rodent<br>';
		break;

		/*case r == 'b':
		var reply = 'A. Cassava<br>B. Rice<br>C. Vegetables<br>D. Yam<br>';
		break;
*/
			case r == 'aa':
			var reply = 'Which is correct about your chicken?<br><br>'+
						'A. Good management practice audio on Broilers<br>'+
					 'B. I want to deworm<br>'+
					 'C. Passing green stool<br>'+
					 'D. Passing brown and/or blood stained droppings<br>'+
					 'E. Coughing<br><br>';
			break;

				case r == 'aab':
				var reply = 'To deworm your chicken, administer:<br><br>'+
					'Levamisole - <strong onclick="showDetail(\'aab1a\');" style="color:#2186f3;">LEVANOR WSP</strong><br>'+
					'Piperacine citrate - <strong onclick="showDetail(\'aab2a\');" style="color:#2186f3;">PIPERANOR WSP</strong><br>'+
					'Ivermectin 1% oral - <strong onclick="showDetail(\'aab3a\');" style="color:#2186f3;">IVANOR</strong><br>'+
					'Albendasole suspension - <strong onclick="showDetail(\'aab4a\');" style="color:#2186f3;">ALBENOR</strong><br>';
				break;

				case r == 'aac':
				var reply = 'Green droppings? Select the correct option:<br><br>'+
						 'A. I already vaccinated my chicken with Lasota and dewormed them recently<br>'+
						 'B. I have not given Lasota vaccine but i have dewormed them<br>'+
						 'C. I gave Lasota but have not dewormed<br>'+
						 'D. No Lasota given and they were not dewormed<br>';
				break;

						case r == 'aaca':
						localStorage.setItem('responseStack', 0);
						var reply = 'Your problem may just be bacterial infection like salmonella or ecoli. Use Amoxicillin+Collistin OR Erythromycin + Collistin<br><br>OR <a href=#>Click here to Consult a Vet Doctor</a>';
						break;
						case r == 'aacb':
						localStorage.setItem('responseStack', 0);
						var reply = 'Try treating for Salmonellosis with <strong>Amoxicillin+Collistin</strong> OR <strong>Erythromycin + Collistin</strong>, and ensure you vaccinate with Lasota later on when they get healthy.<br><br>OR <a href=#>Click here to Consult a Vet Doctor</a>';
						break;
						case r == 'aacc':
						localStorage.setItem('responseStack', 0);
						var reply = 'Deworm and treat for salmonellosis or collibacilosis with Amoxicillin+Collistin OR Erythromycin + Collistin<br><br>OR <a href=#>Click here to Consult a Vet Doctor</a>';
						break;
						case r == 'aacd':
						localStorage.setItem('responseStack', 0);
						var reply = 'Try treating for bacterial infection like salmonella or ecoli. Use Amoxicillin+Collistin OR Erythromycin + Collistin and deworm them. When they get healthy give Lasota<br><br>OR <a href=#>Click here to Consult a Vet Doctor</a>';
						break;

				
				case r == 'aad':
				localStorage.setItem('responseStack', 0);
				var reply = 'Brownish or Blood stained droppings? It is likely to be Coccidiosis. Select the correct option:<br><br>'+
						 'SOLUTION: Administer Sulphaquinoxaline with vitamin K as seen in Coccinor, Embacin forte etc for 3 consecutive days followed by ordinary water for 2 days and then the medicine for another 2 days. Other'+
						 ' effective medications are Trisulphanor, Toltranor, Diclasor, Ampronor.';
				break;

				case r == 'aae':
				localStorage.setItem('responseStack', 0);
				var reply = 'Coughing or Chronic respiratory disorder(CRD) is treated using Tylosin tartrate mixed with doxycycline or apramycin. If he symptoms persist after 5-day treatment, consult your Vet.<br><br>'+
				'Effective products in their order: <strong style="color:#2186f3;">Typranor, Doxytylonor, Tylodox, Doxytyl, Spitrepnor etc</strong>';
				break;
				
			case r == 'ab':
			case r == 'ac':
		
			var reply = 'A. Deworm<br>'+
					 'B. Consult<br>'+
					 'C. Treat<br>'+
					 'D. Learn management skill<br>';
			break;

				case r == 'aba':
				case r == 'aca':
				var reply = 'For broad spectrum dewormer: Oral Albendasole @ 10mg/Kg OR Ivermectin 0.08% oral solution. Consult your Vet Doctor for best result';
				localStorage.setItem('responseStack', 0);
				break;
				case r == 'abb':
				case r == 'aca':
				case r == 'abc':
				case r == 'acc':
				case r == 'abd':
				case r == 'acd':

				var reply = '<form action="tutor" id="return_data"><input type="hidden" name="que" value="Need a little help on my animals"><input type="hidden" name="category" value="9"><button style="border:2px solid #ccc; color:#2186f3; padding:5px; border-radius:10px; background:transparent;">Consult a Vet Doctor</button></form>';
				localStorage.setItem('responseStack', 0);
				break;
			


			case r == 'b':
		
			var reply = 'Select any crop of your interest:<br><br>'+
					 '<div style="display:flex;">'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
					 '</div>'+
					 '<div style="display:flex;">'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
					 '</div>'+
					 '<div style="display:flex;">'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
					 '</div>'+
					 '<div style="display:flex;">'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
						 '<div style="margin:5px; padding:5px 10px 5px 10px; border-radius:20px; background:#2186f3; color:#eff;"><input type="radio" name="crops" value="1" /><span style="margin-left:5px;">Cassava</span></div>'+
					 '</div>';
			break;

			case r == 'c':
		
			var reply = 'A. Herbicide<br>'+
					 'B. Insecticide<br>'+
					 'C. Fungicide<br>'+
					 'D. Pesticide/Rodenticide<br>';
			break;
				
				case r == 'ca':
		
				var reply = 'A. Selective<br>'+
					'B. Non-selective<br>';
				break;
					
					case r == 'caa':
		
					var reply = 'Below are the selective herbicides, they are categorised into pre- & post-<br><br>'+
					 '<strong>Before Planting</strong><br>'+
					 'Atrazine: <strong style="color:#2186f3;">Atraforce</strong><br>'+
					 'Butachlor: <strong style="color:#2186f3;">Butaforce</strong><br>'+
					 'Oxadiazon: <strong style="color:#2186f3;">Riceforce</strong><br>'+
					 'S-Metolachlor: <strong style="color:#2186f3;">Metaforce</strong><br>'+
					 'Diuron: <strong style="color:#2186f3;">force-uron</strong><br>'+
					 'Atrazine+Metolachlor: <strong style="color:#2186f3;">Xtraforce</strong><br>'+
					 'Pendemethalin: <strong style="color:#2186f3;">Forcetop</strong><br>'+

					 '<br><strong>After Planting</strong><br>'+
					 'Bispyribac Sodium: <strong style="color:#2186f3;">Agriforce</strong><br>'+
					 '2,4D Amine: <strong style="color:#2186f3;">Aminoforce</strong><br>'+
					 'Bentazone: <strong style="color:#2186f3;">Bentaforce</strong><br>'+
					 'Fluazifop-P-butyl: <strong style="color:#2186f3;">Starforce</strong><br>';
					break;

					case r == 'cab':
		
					var reply = 'Glyphosphate: <strong style="color:#2186f3;">Force up</strong><br>'+
					'Paraquat: <strong style="color:#2186f3;">ParaForce</strong><br>'+
					'Gluphosinate: <strong style="color:#2186f3;">Paraforce Super</strong><br>'+
					'Idunno: <strong style="color:#2186f3;">United Force</strong><br>';
					break;

		default:
		var reply ='<span style="color:red">Sorry! Your selection does not exist OR You have reached THE END</span>';
	}
return reply;

}