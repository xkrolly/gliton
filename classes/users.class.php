<?php
 class Users extends Dbc {
	public $excluded;
	public $order;
	public $lat;
	public $lng;
	public $fid;
	public $media_setins;
	public $dm;
	public $count; 
	public $regCompleted;
	protected $lastId;
	const PUBLIC_KEY = 'r33234';
	const SECRET_KEY = '6465';
	
	protected function harvesine($lat1, $lng1, $lat2, $lng2) {
		$dLat = ($lat2 - $lat1) * M_PI/180.0;
		$dLng = ($lng2 - $lng1) * M_PI/180.0;
		
		$lat1 = $lat1 * M_PI / 180;
		$lat2 = $lat2 * M_PI / 180;
		
		$a = pow( sin($dLat / 2), 2) + pow( sin( $dLng / 2), 2) * cos($lat1) * cos($lat2);

		$rad = 6371;
		$c = 2 * asin(sqrt($a));
		return $rad * $c;
	}
	
	protected function selectStmt($tableName, $whereOpr, $whereVal) {
		$whereVal = explode(', ', $whereVal);

		$sql="SELECT * FROM ".$tableName.$whereOpr;
		$stmt = $this->connect()->prepare($sql);
		$stmt->execute($whereVal);
		$this->count = $stmt->rowCount();
		$results = $stmt->fetchAll();
		return $results;
	}
	protected function selectStmt2($tableName, $whereOpr, $whereVal) {
		$whereVal = explode(', ', $whereVal);

		$sql="SELECT * FROM ".$tableName.$whereOpr;
		$stmt = $this->connect2()->prepare($sql);
		$stmt->execute($whereVal);
		$this->count = $stmt->rowCount();
		$results = $stmt->fetchAll();
		return $results;
	}
	protected function deleteStmt($tableName, $whereOpr, $whereVal) {
		$whereVal = explode(', ', $whereVal);

		$sql="DELETE FROM ".$tableName.$whereOpr;
		$stmt = $this->connect()->prepare($sql);
		$stmt->execute($whereVal);
	}
	protected function deleteStmt2($tableName, $whereOpr, $whereVal) {
		$whereVal = explode(', ', $whereVal);

		$sql="DELETE FROM ".$tableName.$whereOpr;
		$stmt = $this->connect2()->prepare($sql);
		$stmt->execute($whereVal);
	}

	protected function userProfile($where) {
		return $this->selectStmt('profile', ' WHERE profile_id = ?', $where);
	}

	protected function userProfiles($column, $whereVal) {
		$whereVal = $this->encryptor0($whereVal);
		$whereVal = '%'.$this->slice_enc0($whereVal).'%';

		return $this->selectStmt('profile', ' WHERE '.$column.' LIKE ?', $whereVal);
	}
	
	protected function userId() {
		
		if(isset($_SESSION['user_id'])){
		 $session = $_SESSION['user_id'];

  		$row = $this->selectStmt('skyman_user', ' WHERE session = ?', $session);
		  	if(count($row) > 0){
		  		$profile_id = $row[0]['profile_id'];
	        	$row2 = $this->selectStmt('profile', ' WHERE profile_id = ?', $profile_id);
		  		
		  		$regCompleted = $row2[0]['regCompleted'];
		  		
				$regCompleted != 0 ? $innerJoin = ' INNER JOIN prd_interactions USING (profile_id)' : $innerJoin = '';
				return $this->selectStmt('profile', $innerJoin.' WHERE profile_id = ?', $profile_id);
			}else{
				session_destroy();
			header('Location: index.php?page=login&impostor=TRUE');
			}
		}
	}
	protected function inKam($amount, $uid, $payfor, $productID){
        $payLog = $amount.'-'.$uid.'-'.$payfor.'-'.$productID;
        $payLog_enc = $this->encryptor0($payLog);
        $payLog_enc_cons = $this->enc_cons($payLog);
    
        $vals = array('payLog'=>$payLog_enc, 'payLog2'=>$payLog_enc_cons);
        $this->insert2SHK('skymAcct', $vals);

        $cumPayLogData = $this->selectStmt2('skymAcct', ' WHERE skymAcct_id = ?', '1');
        $cumPayLog = $cumPayLogData[0]['payLog'];
        
        $_cumPayLog_update = $this->decryptor0($cumPayLog);
        $cumPayLog_update = $_cumPayLog_update.'_'.$payLog;
        $cumPayLog_update_enc = $this->encryptor0($cumPayLog_update);
        
        $valus = $cumPayLog_update_enc.', 1';
        $this->update2Stmt('skymAcct', 'payLog = ? WHERE skymAcct_id = ?', $valus);
	}
	protected function insert2Db($tableName, $data) {
		$num = count($data);
		$tag=array_fill(0, $num, '?');
		$all_tags=implode(", ", $tag);

	 	$sql = "INSERT INTO ".$tableName." (";
	 	$sql .= implode(", ", array_keys($data)) . ") VALUES (".$all_tags.")";
	 	$values = array_values($data);	
	 	$stmt = $this->connect()->prepare($sql);
		$stmt->execute($values);
//	$lastID = $this->connect()->lastInsertId();
	}
	protected function insert2SHK($tableName, $data) {
		$num = count($data);
		$tag=array_fill(0, $num, '?');
		$all_tags=implode(", ", $tag);

	 	$sql = "INSERT INTO ".$tableName." (";
	 	$sql .= implode(", ", array_keys($data)) . ") VALUES (".$all_tags.")";
	 	$values = array_values($data);	
	 	$stmt = $this->connect2()->prepare($sql);
		$stmt->execute($values);
//	$lastID = $this->connect()->lastInsertId();
	}
    protected function update2Stmt($tableName, $setOPRs, $setWhereVals) {
	    
	    $setWhereVals = explode(', ', $setWhereVals);
	 	$sql = "UPDATE ".$tableName." SET ".$setOPRs;
	 	$stmt = $this->connect2()->prepare($sql);
		$stmt->execute($setWhereVals);
		$results = $stmt->fetchAll();
		return $results;
	}
	
    protected function updateStmt($tableName, $setOPRs, $setWhereVals) {
	    
	    $setWhereVals = explode(', ', $setWhereVals);
	 	$sql = "UPDATE ".$tableName." SET ".$setOPRs;
	 	$stmt = $this->connect()->prepare($sql);
		$stmt->execute($setWhereVals);
		$results = $stmt->fetchAll();
		return $results;
	}
/*	protected function updateStmt($tableName, $setOPRs, $setWhereVals) {
	    
	    $setWhereVals = explode(', ', $setWhereVals);
	 	$sql = "UPDATE ".$tableName." SET ".$setOPRs;
	 	$stmt = $this->connect()->prepare($sql);
		$stmt->execute($setWhereVals);
		$results = $stmt->fetchAll();
		return $results;
	}
*/	
	protected function gen_pub($pw_enc_privKey, $enc_pwd, $qprime, $alpha){
		$dec_pwd = $this->decryptor0($enc_pwd);
		$dec_private_key = $this->decryptorReg($pw_enc_privKey, $enc_pwd);
		
		$priv = explode('-', $dec_private_key);

		$x=0;
		$n=count($priv)-1;
		$_pub = array();
		while($x<=$n){
			$_pub[] = fmod(pow($alpha, $priv[$x]), $qprime);
			$x++;
		}
		
		$pub = implode('-', $_pub);
		return $pub;
	}

	protected function gen_shared($priv_1, $enc_pwd1, $pub_2, $qprime){
		$pub = explode('-', $pub_2);
		$priv_1 = $this->decReg($priv_1, $enc_pwd1);
		$priv = explode('-', $priv_1);

		$x=0;
		$n=count($priv)-1;
		$shared = array();
		while($x<=$n){
			$shared[] = fmod(pow($pub[$x], $priv[$x]), $qprime);
			$x++;
		}
		$sharedf = implode('-', $shared);
		return $sharedf;
	}

	protected function encReg($data, $key){
		$iv = 'yD7%t#@bjFh)&=^f';
		$encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
		return $encrypted;
	}
	protected function decReg($data, $key){
		$iv = 'yD7%t#@bjFh)&=^f';
		$decrypted = openssl_decrypt($data, 'AES-256-CBC', $key, 0, $iv);
		return $decrypted;
	}

	protected function encr0($data){
		$key='5LwY7-8DjS2-8MyP8';
		$iv = 'yD7%t#@bjFh)&=^f';
		$encrypted = openssl_encrypt($data, 'AES-256-CBC', $key, 0, $iv);
		return $encrypted;
	}

	protected function decr0($data){
		$key='5LwY7-8DjS2-8MyP8';
		$iv = 'yD7%t#@bjFh)&=^f';
		$decrypted = openssl_decrypt($data, 'AES-256-CBC', $key, 0, $iv);
		return $decrypted;
	}
	protected function encr($input){
		$input = strtolower($input);
		$key = sodium_crypto_secretbox_keygen();
		$_SESSION['key'] = $key;
		$nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES );
		$encrypted_result = sodium_crypto_secretbox($input, $nonce, $key);
		$encoded = base64_encode( $nonce . $encrypted_result);
		$_SESSION['encoded'] = $encoded; 
		return $encoded;
	}

	protected function decr($encoded, $key){
		$decoded = base64_decode( $encoded );
		$nonce = mb_substr($decoded, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, '8bit');
		$encrypted_result = mb_substr($decoded, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES, null, '8bit');
		$plaintext = sodium_crypto_secretbox_open($encrypted_result, $nonce, $key);
		return $plaintext;
	}

	protected function encr2($data, $key){
		$enc_key = base64_decode($key);
		$data = strtolower($data);
		$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
//		$iv=bin2hex($iv); //added this new line
		$encrypted = openssl_encrypt($data, 'AES-256-CBC', $enc_key, 0, $iv);
		return base64_encode($encrypted . '::' . $iv);
	}

	protected function decr2($data, $key){
		$enc_keyy = base64_decode($key); //hex2bin($iv);
		list($encrypted_data, $iv) = array_pad(explode('::', base64_decode($data), 2),2,null);
//		var_dump($encrypted_data);
//		$iv=hex2bin($iv); //added this new line
		return openssl_decrypt($encrypted_data, 'AES-256-CBC', $enc_keyy, 0, $iv);
	}
	protected function encr3($data, $key){
		$enc_key = base64_decode($key);
		$iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('AES-256-CBC'));
		$encrypted = openssl_encrypt($data, 'AES-256-CBC', $enc_key, 0, $iv);
		$return = base64_encode($encrypted . '::' . $iv);
		$_SESSION['enc'] = $encrypted;
		return $return;
	}

	protected function decr3($data, $key){
		$enc_keyy = base64_decode($key);
		list($encrypted_data, $iv) = array_pad(explode('::', base64_decode($data), 2),2,null);
//		var_dump($encrypted_data);
		return openssl_decrypt($encrypted_data, 'AES-256-CBC', $enc_keyy, 0, $iv);
	}

	protected function key(){
		$str1 = '-*5LwY7$';
		$str2 = '-*8DjS2$';
		$str3 = '-*8MyP8$';
		$str4 = '-*9YtL1$';
		$str5 = '-*9mrm8$';
		$str6 = '-*0ndm1$';

		$a = str_split($str1, 4);
		$b = str_split($str2, 4);
		$c = str_split($str3, 4);
		$d = str_split($str4, 4);
		$e = str_split($str5, 4);
		$f = str_split($str6, 4);
		$_key = $a[0].$b[0].$c[0].$d[0].$e[0].$f[0].$f[1].$e[1].$d[1].$c[1].$b[1].$a[1];
		return $_key;
	}

	public function _aoi_cht($agro_id, $vet_id, $hth_id, $guide_id, $cook_id){
	$expert = '';
	$category='';
	$qCol='';
	$user_id_col='';
	$topic='';
	$storage='';
	$col_id='';
	$colval='';
	   switch (true) {

				case $agro_id > 1:
					 $category .=  '';//$cData[0]['category_id'];
					 $qCol .= 'agro_que';
					 $storage .= 'agro';
					 $topic .= 'agro';
					 $col_id .= 'agro_id';
                     $user_id_col .= 'a_user_id';
	   		         $expert .= 'Agronomist';
            		 $colval .= $agro_id;
					break;

				case $vet_id > 1:
					 $category .=  '';//$cData[0]['category_id'];
					 $qCol .= 'vet_que';
					 $storage .= 'vet';
					 $topic .= 'veterinary';
					 $col_id .= 'vet_id';
                     $user_id_col .= 'v_user_id';
	   		         $expert .= 'Vet Doctor';
            		 $colval .= $vet_id;
					break;

				case $hth_id > 1:
					 $category .= '';//$cData[0]['category_id'];
					 $qCol .= 'hth_que';
					 $storage .= 'hth';
					 $topic .= 'health';
					 $col_id .= 'hth_id';
					 $user_id_col .= 'h_user_id';
	   		         $expert .= 'Medical Doctor';
                     $colval .= $hth_id;
					break;

				case $guide_id > 1:
					 $category .= '';//$cData[0]['category_id'];
					 $qCol .= 'guide_que';
					 $storage .= 'guide';
					 $topic .= 'guidance';
					 $col_id .= 'guide_id';
	   		         $user_id_col .= 'g_user_id';
	   		         $expert .= 'Expert';
                     $colval .= $guide_id;

					break;
				case $cook_id > 1:
					 $category .= '';//$cData[0]['category_id'];
					 $qCol .= 'cook_que';
					 $storage .= 'cook';
					 $topic .= 'cooking';
					 $col_id .= 'cook_id';
	   		         $user_id_col .= 'c_user_id';
	   		         $expert .= 'Cook';
                     $colval .= $cook_id;

					break;
				/*default:
					 $category = $cData[0]['category_id'];
					 $colval .= '';
					break;*/
			}
		
			return array('expert'=>$expert, 'categ'=>$category, 'queCol'=>$qCol, 'user_id_col'=>$user_id_col, 'topic'=>$topic, 'strDir'=>$storage, 'col_id'=>$col_id, 'colval'=>$colval);
	}


	public function _aoi($_cat){

		$queCol='';
		$user_id_col='';
		$cat_id='';
		$topic='';
		$folder='';
		$expert='';
		$brd_category='';

	    			switch (true) {
					case $_cat == '1':
					case $_cat == '2':
					case $_cat == '3':
					case $_cat == '4':
					case $_cat == '5':
					case $_cat == '6':
					case $_cat == '7':
					case $_cat == '8':
					case $_cat == '9':
					case $_cat == '10':
					    $queCol .= 'agro_que';
						$user_id_col .= 'a_user_id';
						$cat_id .= 'agro_id';
						$topic .= 'agro';
						$folder .= 'agro';
						$expert .= 'Agronomist';
                        $brd_category .= '1';
						break;
						
					case $_cat == '11':
					case $_cat == '12':
					case $_cat == '13':
					case $_cat == '14':
					case $_cat == '15':
					case $_cat == '16':
					case $_cat == '17':
					case $_cat == '18':
					case $_cat == '19':
					case $_cat == '20':
					    $queCol .= 'vet_que';
						$user_id_col .= 'v_user_id';
						$cat_id .= 'vet_id';
						$topic .= 'veterinary';
						$folder .= 'vet';
						$expert .= 'Vet Doctor';
                        $brd_category .= '2';
						break;

					case $_cat == '21':
					case $_cat == '22':
					case $_cat == '23':
					case $_cat == '24':
					case $_cat == '25':
					case $_cat == '26':
					case $_cat == '27':
					case $_cat == '28':
					case $_cat == '29':
					case $_cat == '30':
						$queCol .= 'hth_que';
			                        $user_id_col .= 'h_user_id';
						$cat_id .= 'hth_id';
						$topic .= 'health';
						$folder .= 'hth';
						$expert .= 'Medical doctor';
                                                $brd_category .= '3';
						break;
							
					case $_cat == '31':
					case $_cat == '32':
					case $_cat == '33':
					case $_cat == '34':
					case $_cat == '35':
					case $_cat == '36':
					case $_cat == '37':
					case $_cat == '38':
					case $_cat == '39':
					case $_cat == '40':
					        $queCol .= 'guide_que';
						$user_id_col .= 'g_user_id';
						$cat_id .= 'guide_id';
						$topic .= 'guidance';
						$folder .= 'guide';
						$expert .= 'Expert';
                                                $brd_category .= '4';
                                          break; 
                        
					case $_cat == '41':
					case $_cat == '42':
					case $_cat == '43':
					case $_cat == '44':
					case $_cat == '45':
					case $_cat == '46':
					case $_cat == '47':
					case $_cat == '48':
					case $_cat == '49':
					case $_cat == '50':
					
					    $queCol .= 'cook_que';
						$user_id_col .= 'c_user_id';
						$cat_id .= 'cook_id';
						$topic .= 'cooking';
						$folder .= 'cook';
						$expert .= 'Cook';
                        $brd_category .= '5';
                        
						break;

					case $_cat == '51':
					case $_cat == '52':
					case $_cat == '53':
					case $_cat == '54':
					case $_cat == '55':
					case $_cat == '56':
					case $_cat == '57':
					case $_cat == '58':
					case $_cat == '59':
					case $_cat == '60':
					$queCol .= 'legal_que';
						$user_id_col .= 'l_user_id';
						$cat_id .= 'legal_id';
						$topic .= 'legal';
						$folder .= 'legal';
						$expert .= 'Lawyer';
                                                $brd_category .= '6';
						
						break;

			}
			
			return array('queCol'=>$queCol, 'user'=>$user_id_col, 'cat_id'=>$cat_id, 'topic'=>$topic, 'folder'=>$folder, 'expert'=>$expert, 'brd_cat'=>$brd_category);
	}

  	protected function checkClassDate($chatAudience, $class_date){
  		$chatAudience == 'group' ? $time_future = strtotime($this->dec_cons($class_date)) : $time_future = time();
	  	$current_time=time();
  		$diff = $time_future - $current_time;
  		$diff <= 0 ? $return = '1' : $return = '0';
  		return $return;
  	}

  	protected function fetchsolochat($scriptID){
		$uData = $this->fetchUser();
		$user = $uData[0]['profile_id'];
		$oWHERE ="solochat.scriptor_id = '$user' AND solochat.content_id = '$scriptID' ORDER BY solo_id DESC";

 	    $sql="SELECT * FROM solochat INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN cooking USING (cook_id) WHERE ".$oWHERE;
		$stmt = $this->connect()->query($sql);
		$chatsArray=array();

		while($row1 = $stmt->fetch()){
		    
			$array = $this->_aoi_cht($row1['agro_id'], $row1['vet_id'], $row1['hth_id'], $row1['guide_id'], $row1['cook_id']);
			
			$_que=$array['queCol'];
			$que = $row1[$_que];
			$chatType = $array['strDir'];

            $que =  str_replace("&#39;", "'", $que);
			$solo_id = $row1['solo_id'];
			$replyto = $row1['replyto'];
			$lock = $row1['locked'];
			$content_id = $row1['content_id'];
			$media = $row1['media'];
			$date = $row1['cdate'];
			$flag = $row1['flag'];
			$title = $row1['title'];
			$insight = $row1['insight'];
			$category_id = $row1['category_id'];

	  		$chatsArray[] =array("solo_id"=>$solo_id, "catid"=>$category_id, "type"=>$chatType, "que"=>$que, "mode"=>$media, "cid"=>$content_id, "replyto"=>$replyto, "locked"=>$lock, "flag"=>$flag, "title"=>$title, "insight"=>$insight, "sol_date"=>$date);
		}
		return $chatsArray;		
  	}

	protected function getnewchats($recipient_id, $chatAudience){
		$userData = $this->userId();
		$user = $userData[0]['profile_id'];
		$xpt_status = $userData[0]['xpt'];
		$me = '-'.$user.'-'; 
		$chat_id ='';
		$convid = '';
		$replyto = '';
		$view = '';

		$chatAudience == 'group' ? $notEqualsMe = "!= $user" : $notEqualsMe = "= $recipient_id";
		$chatAudience == 'group' ? $recipientType = 0 : $recipientType = $user;
		$chatAudience == 'group' ? $innerJOINCLASS = " INNER JOIN classes USING (class_id)" : $innerJOINCLASS = "";

		$sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN veterinary USING (vet_id) INNER JOIN cooking USING (cook_id) $innerJOINCLASS WHERE chat.sender_id = $user AND chat.recipient_id $notEqualsMe AND view NOT LIKE '%$me%' OR chat.sender_id $notEqualsMe AND chat.recipient_id = $recipientType AND view NOT LIKE '%$me%' ORDER BY chat_id ASC";

//		$sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN veterinary USING (vet_id) INNER JOIN cooking USING (cook_id) WHERE chat.sender_id = $user AND chat.recipient_id $notEqualsMe AND view NOT LIKE '%$me%' OR chat.sender_id $notEqualsMe AND chat.recipient_id = $recipientType AND view NOT LIKE '%$me%' ORDER BY chat_id ASC";

//var_dump($sql);

	//	$sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN veterinary USING (vet_id) INNER JOIN cooking USING (cook_id) WHERE chat.sender_id = '$user' AND chat.recipient_id = '$recipient_id' AND view NOT LIKE '%$me%' OR chat.sender_id = '$recipient_id' AND chat.recipient_id = '$user' AND view NOT LIKE '%$me%' ORDER BY chat_id ASC";


		$stmt = $this->connect()->query($sql);
		$chatsArray=array();
//var_dump($stmt->fetchAll());

		while($row1 = $stmt->fetch()){
			$array = $this->_aoi_cht($row1['agro_id'], $row1['vet_id'], $row1['hth_id'], $row1['guide_id'], $row1['cook_id']);
			$_que=$array['queCol'];
			 $que = $row1[$_que];
			 $chatType = $array['strDir'];

            $que =  str_replace("&#39;", "'", $que);
        	$sender_id = $row1['sender_id'];
			$chat_id .= $row1['chat_id'];
			$replyto .= $row1['replyto'];
			$convid .= $row1['conv_id'];
		$chatAudience == 'group' ? $convid = $row1['lecture_id'] : $convid;

		/*$chatAudience == 'group' ? $time_future = strtotime($row1['class_date']) : $time_future = time();
  		$current_time=time();
  		$diff = ($time_future - $current_time);
  		$diff <= 0 ? $classBegins = TRUE : $classBegins = FALSE;
*/
  		    $classBegins = '';
			$lectureID = '';
			$tutor = '';
			if($chatAudience == 'group'){
		  		$classBegins .= $this->checkClassDate($chatAudience, $row1['class_date']);
				$lectureID .= $this->dec_cons($row1['lecture_id']);
				$lectureID_arr = explode('_', $lectureID);
				$tutor .= $lectureID_arr[0];
			}else{
				$classBegins .='1';
			}

			$view .= $row1['view'];
			$media = $row1['media'];
			//$_me = '-'.$me.'-';
			$view == 0 ? $val = $me : $val = $view.$user.'-';
//var_dump('THIS IS ME VAL: '.$val);
		
			$check = "SELECT * FROM chat WHERE chat_id = '$chat_id' AND view LIKE '%$me%'";
			$c_stmt = $this->connect()->query($check);
			$row = $c_stmt->fetchAll();
			if( count($row) == 0 ){
				$_sql ="UPDATE chat SET view = '$val' WHERE chat_id='$chat_id'";
				$stmt = $this->connect()->query($_sql);
			}
			
			//GET RECIPIENT PUBLIC ID
			$get = "SELECT * FROM skyman_user WHERE user_id = '$recipient_id'";
			$stmt = $this->connect()->query($get);

			$rw = $stmt->fetch();

//			$pubK = $rw['pub'];

			$_date = strtotime($row1['cdate']) + 3600; 
			
			date_default_timezone_set('Africa/Lagos');
			$date = date('H:i', $_date);

			$_recipient_ = '-'.$recipient_id.'-';
			strpos($row1['view'], $_recipient_) ? $seen = 1 : $seen = 0;
            
			$category_id = $row1['category_id'];
			$locked = $row1['locked'];
			$perm = $this->permissionStatus($category_id, $user);
            $locked == 1 ? $visibility = $perm : $visibility = 1;
	//var_dump($visibility);
            $quoteArray = $this->getquotemsg($replyto);
            !empty($quoteArray) ? $quote = $quoteArray[0] : $quote = '';
            !empty($quoteArray) ? $quoteSender = $quoteArray[0] : $quoteSender='';
            //"rPubK"=>$pubK, 
			$eachChat =array("ttid"=>$tutor, "holdclass"=>$classBegins, "xpt_status"=>$xpt_status, "chid"=>$chat_id, "seen"=>$seen, "dt"=>$date, "s"=>$sender_id, "r"=>$recipient_id, "type"=>$chatType, "que"=>$que, "mode"=>$media, "v"=>$view, "cid"=>$convid, "replyto"=>$replyto, "quote"=>$quote, 'quoteSender' => $quoteSender);
			$visibility == 1 ? $chatsArray[] = $eachChat : $chatsArray[] = [];
		}
			return $chatsArray;
	}
    
    protected function permissionStatus($category_id, $user){
    		$_category_id = '-'.$category_id.'-';
			$vals = "$user, %$_category_id%";

			$data = $this->select('profile', ' WHERE profile_id = ? AND aoi LIKE ?', $vals);
			count($data) > 0 ? $permission = 1 : $permission = 0;
			
			return $permission;
	}
    protected function getquotemsg($replyto){
        	$_chatData = "SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN veterinary USING (vet_id)  WHERE chat_id = '$replyto' AND locked = 0";
			$_stmt = $this->connect()->query($_chatData);
			$rowQ = $_stmt->fetchAll();
        if(count($rowQ) > 0){
         switch (true) {
				case $rowQ[0]['agro_id'] > 1:
					 $quote =  $rowQ[0]['agro_que'];
					 $quoteSender =  $rowQ[0]['a_user_id'];
					break;

				case $rowQ[0]['vet_id'] > 1:
					 $quote =  $rowQ[0]['vet_que'];
					 $quoteSender =  $rowQ[0]['v_user_id'];
					break;
				case $rowQ[0]['hth_id'] > 1:
					 $quote =  $rowQ[0]['hth_que'];
					 $quoteSender =  $rowQ[0]['h_user_id'];
					break;
				case $rowQ[0]['guide_id'] > 1:
					 $quote =  $rowQ[0]['guide_que'];
					 $quoteSender =  $rowQ[0]['g_user_id'];
					break;
         }
    
        return array($quote, $quoteSender);
       }
    }
    
	protected function fetchChats($recipient_id, $resumingCID, $hxList, $aoiCurrent){

		$userData = $this->userId();
		$user = $userData[0]['profile_id'];
		$_recipient_id = '-'.$recipient_id.'-';
		$_user = '-'.$user.'-';
		$this_user_aoi = $userData[0]['aoi'];
    	
	   	strpos($this_user_aoi, $aoiCurrent) !== false ? $tutor = $user : $tutor = $recipient_id;
	    
	    $tutorP = $this->userProfile($tutor);
        $tutorConvId = $tutorP[0]['converse_id'];
        
		$_both = '-'.$user.$_recipient_id;
		$check2 = "UPDATE chat SET view='$_both' WHERE sender_id = '$recipient_id' AND view='$_recipient_id'";
		$this->connect()->query($check2);
			

			$oWHERE ="uniq_conv = '$resumingCID' AND chat.sender_id = '$user' AND chat.recipient_id = '$recipient_id' OR uniq_conv = '$resumingCID' AND chat.sender_id = '$recipient_id' AND chat.recipient_id = '$user' ORDER BY chat_id DESC";

    $sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN cooking USING (cook_id) WHERE ".$oWHERE;

		$stmt = $this->connect()->query($sql);
		$chatsArray=array();
		$sender = '';

		while( $row1 = $stmt->fetch() ){
		    
     	     $array = $this->_aoi_cht($row1['agro_id'], $row1['vet_id'], $row1['hth_id'], $row1['guide_id'], $row1['cook_id']);
			 $_que = $array['queCol'];
			 $que = $row1[$_que];
			 $chatType = $array['strDir'];
        
			$mode = $row1['media'];
			$sender_id = $row1['sender_id'];
			$date = $row1['cdate'];
			$flag = $row1['flag'];
			$lock = $row1['locked'];
			$replyto = $row1['replyto'];
			   
			$close = $row1['close'];
			$_SESSION['chat_id'] = $row1['chat_id'];
			$cat_id = $row1['category_id'];
			$cat_grp = $row1['cat_grp'];
				//only for chat resuming frm hmpg
			$receiver = $row1['recipient_id'];
			$cve = $row1['cve'];
			$eachChat =array("catid"=>$cat_id, "cat_grp"=>$cat_grp, "lock"=>$lock, "chat_id"=>$row1['chat_id'], "conv_id"=>$row1['conv_id'], "uniq_conv"=>$row1['uniq_conv'], "flag"=>$flag, "mode"=>$mode, "replyto"=>$replyto, "tstamp"=>$row1['cdate'], "receiver"=>$receiver, "s"=>$sender_id, "r"=>$recipient_id, "type"=>$chatType, "que"=>$que, "close"=>$close, "cve"=>$cve);
	
			$chatsArray[] = $eachChat;
		}
		return $chatsArray;
	}

	protected function fetchgchat($lectureID_enc){
		$lectureID = $this->dec_cons($lectureID_enc);
		$userData = $this->fetchUser();
		$me = $userData[0]['profile_id'];

		$lectureID_enc = str_replace(' ', '+', $lectureID_enc);

			/*//var_dump($lectureID_enc);
			$data = $this->selectStmt('classes', ' WHERE lecture_id = ?', $lectureID_enc);
			$classID = $data[0]['class_id'];
			var_dump('MY class id: '.$classID);
		$oWHERE ="class_id = '$classID' ORDER BY chat_id DESC";*/

		$oWHERE ="lecture_id = '$lectureID_enc' ORDER BY chat_id DESC";

    	$sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN cooking USING (cook_id) INNER JOIN classes USING (class_id) WHERE ".$oWHERE;

		$stmt = $this->connect()->query($sql);
		$chatsArray=array();
		$sender = '';
		$gchatsArray = array();

		while($row1 = $stmt->fetch()){
     	    $array = $this->_aoi_cht($row1['agro_id'], $row1['vet_id'], $row1['hth_id'], $row1['guide_id'], $row1['cook_id']);
			$_que = $array['queCol'];
		    $chatType = $array['strDir'];
		    $replyto = $row1['replyto'];
		    $close = $row1['close'];
//			$cat_id = $row1['category_id'];

			$que = $row1[$_que];
			$eachChat =array("catid"=>$row1['category_id'], "chat_id"=>$row1['chat_id'], "class_date"=>$row1['class_date'], "class_id"=>$row1['lecture_id'], "flag"=>$row1['flag'], "tstamp"=>$row1['cdate'], "s"=>$row1['sender_id'], "r"=>$row1['recipient_id'], "replyto"=>$replyto, "type"=>$chatType, "mode"=>$row1['media'], "que"=>$que, "close"=>$close);
	
			$gchatsArray[] = $eachChat;
		}

		return $gchatsArray;
	}
		
    protected function savelocal($uniq_conv, $cat){
    
	    $sql="SELECT * FROM chat INNER JOIN agro USING (agro_id) INNER JOIN veterinary USING (vet_id) INNER JOIN health USING (hth_id) INNER JOIN guidance USING (guide_id) INNER JOIN cooking USING (cook_id) WHERE uniq_conv = '$uniq_conv'";
	    //$sql="SELECT * FROM chat WHERE uniq_conv = ".$val;
	    
	    $array = $this->_aoi($cat);
	    $queCol = $array['queCol'];

		$stmt = $this->connect()->query($sql);
		$chatsArray=array();
		$sender = '';
		$row = $stmt->fetchAll();
		$x = count($row);
		$n = $x - 1;
		while($n>=0){//$row = $stmt->fetch()){
        $sender = $row[$n]['sender_id'];
        $recipient = $row[$n]['recipient_id'];
        $chid = $row[$n]['chat_id'];
        $que = $row[$n][$queCol];
        $convid = $row[$n]['conv_id'];
        $allChats[] = [$sender, $recipient, $que];

			$eachChat =array("n"=>$x, "chid"=>$chid, "convid"=>$convid, "s"=>$sender, "r"=>$recipient, "que"=>$que);
	
			$chatsArray[] = $eachChat;
		$n--;
		    
		}
		return $chatsArray;
    }

	protected function ipay($email, $amount){
		$paystack = new Yabacon\Paystack(SECRET_KEY);
	    
	    try
	    {
	      $tranx = $paystack->transaction->initialize([
	        'amount'=>$amount,       // in kobo
	        'email'=>$email,         // unique to customers
	        'reference'=>$reference, // unique to transactions
	      ]);
	    } catch(\Yabacon\Paystack\Exception\ApiException $e){
	      print_r($e->getResponseObject());
	      die($e->getMessage());
	    }

	    // store transaction reference so we can query in case user never comes back
	    // perhaps due to network issue
	    save_last_transaction_reference($tranx->data->reference);

	    // redirect to page so User can pay
	    header('Location: ' . $tranx->data->authorization_url);

	    ///////////////////////////////////////////////////////////////
	    // Retrieve the request's body and parse it as JSON
    $event = Yabacon\Paystack\Event::capture();
    http_response_code(200);

    /* It is a important to log all events received. Add code *
     * here to log the signature and body to db or file       */
    openlog('MyPaystackEvents', LOG_CONS | LOG_NDELAY | LOG_PID, LOG_USER | LOG_PERROR);
    syslog(LOG_INFO, $event->raw);
    closelog();

    /* Verify that the signature matches one of your keys*/
    $my_keys = [
                'live'=>'sk_live_blah',
                'test'=>'sk_test_blah',
              ];
    $owner = $event->discoverOwner($my_keys);
    if(!$owner){
        // None of the keys matched the event's signature
        die();
    }

     // Do something with $event->obj
    // Give value to your customer but don't give any output
    // Remember that this is a call from Paystack's servers and
    // Your customer is not seeing the response here at all
    switch($event->obj->event){
        // charge.success
        case 'charge.success':
            if('success' === $event->obj->data->status){
                // TIP: you may still verify the transaction
                // via an API call before giving value.
            }
            break;
    }

     $reference = isset($_GET['reference']) ? $_GET['reference'] : '';
    if(!$reference){
      die('No reference supplied');
    }

    // initiate the Library's Paystack Object
    $paystack = new Yabacon\Paystack(SECRET_KEY);
    try
    {
      // verify using the library
      $tranx = $paystack->transaction->verify([
        'reference'=>$reference, // unique to transactions
      ]);
    } catch(\Yabacon\Paystack\Exception\ApiException $e){
      print_r($e->getResponseObject());
      die($e->getMessage());
    }

    if ('success' === $tranx->data->status) {
      // transaction was successful...
      // please check other things like whether you already gave value for this ref
      // if the email matches the customer who owns the product etc
      // Give value
    }


	}

}
