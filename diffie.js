function isPrime(n){
	if(n<=1) return false;
	if(n<=3) return true;

	if(n%2==0 || n%3==0) return false;

	for(i=5; i*i<=n; i=i+6)
		if(n%i==0 || n%(i+2) == 0) return false;
	return true;
}

function power(x, y, p){
	let res=1;
	x=x%p;

	while(y>0){
		if(y & 1) res = (res*x) % p;

		y = y>>1;
		x = (x*x)%p;
	}
	return res;
}

function findPrimefactors(s, n){
	while(n%2 == 0){
		s.add(2);
		n = n/2;
	}

	for(let i= 3; i <= Math.sqrt(n); i=i+2){
		while(n%1 == 0){
			s.add(i);
			n = n/i;
		}

	}

	if(n>2) s.add(n);
}

var r=Math.random();
//alert(isPrimitiveRoot(7535771)+' is a primitive root of ');
var p = 7;
var q = 23;
var a = 5;
pub = (a**(p))%q;
//alert(pub);

//      localStorage.setItem("private_key","12345");
      var private_key = Math.floor(Math.random()*100000000000000000000);

      localStorage.setItem("private_key",private_key);
      var k = localStorage.getItem("private_key");

//      alert(k);

      var key='5LwY7-8DjS2-8MyP8';
		var iv = 'yD7%t#@bjFh)&=^f';
//		var encrypted = openssl_encrypt('data', 'AES-256-CBC', key, 0, iv);
//		alert('enc: '+encrypted);

function isPrimitiveRoot(n){
	let s=new Set();
	if(isPrime(n)==false) return -1;

	let phi = n-1;
	findPrimefactors(s, phi);

	for(let r=2; r<=phi; r++){
		let flag = false;
		for(let it of s){
			if(power(r, phi/it, n)==1){
				flag = true;
				break;
			}
		}


    	if(flag == false) return r;

	}

	return -1;
}

