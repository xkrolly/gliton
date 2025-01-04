/////////// SIGN UP KEYS      ////////////////////////////////

/*function getDecrypted(){
  alert('what is decryption?');
}*/

function sym_encrypt(text, key){
    const passphrase = key;
    return CryptoJS.AES.encrypt(text, passphrase).toString();
}

function sym_decrypt(ciphertext, key){
    const passphrase = key;
    const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}

function gen_priv(){
  var n=0;
  var triplet = [];
  while(n <= 53 ){
    triplet[n] = String(Math.floor(Math.random() * 9)+1);
//    triplet[n] == 0 ? triplet[n]=1 : triplet[n];
    n++;
  }
  var privKey = triplet.join('.');
  return privKey;
}

function gen_pub(pw_enc_privKey, enc_pwd){
    var qprime = 23; 
    var alpha = 5;
    
    var un = localStorage.getItem('un');
    var pwd = sym_decrypt(enc_pwd, un);

    var dec_private_key = sym_decrypt(pw_enc_privKey, pwd);
    var priv = dec_private_key.split('.');
    var x=0;
    var n= priv.length - 1;
    var _pub = [];
    while(x<=n){
      
      _pub[x] = (alpha**priv[x]) % qprime;
      
      x++;
    }
    
    var pub = _pub.join('.');
    pub = sym_encrypt(pub, '100289911991889148918591');
    return pub;
}


  function gen_shared(pw_enc_privKey, enc_pwd, p_ub){
    var qprime = 23;

    var un = localStorage.getItem('un');
    var pwd = sym_decrypt(enc_pwd, un);
    
    var pri_v = sym_decrypt(pw_enc_privKey, pwd);
    var priv = pri_v.split('.');
  
    var _pub = sym_decrypt(p_ub,  '100289911991889148918591');
    var pub = _pub.split('.');
    var x=0;
    var n=priv.length - 1;
    var shared = [];
    
    while(x<=n){

        shared[x] = (pub[x]**(priv[x])) % qprime;
        
        x++;
    }
   
    var sharedf = shared.join('');
   
    return sharedf;
  }


  