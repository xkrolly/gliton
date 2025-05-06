<?php

class UsersContr extends Users {
	private $found_id;
	public $reply;
	public $reqResp;
	
	public function cr8matchStr($input) {
		return $this->matchStrStmt($input);
	}

	public function update($tableName, $valSpace, $vals){
		return $this->updateStmt($tableName, $valSpace, $vals);
	}
	public function update2($tableName, $valSpace, $vals){
		return $this->update2Stmt($tableName, $valSpace, $vals);
	}
	public function delete($tableName, $valSpace, $vals){
		return $this->deleteStmt($tableName, $valSpace, $vals);
	}
	public function delete2($tableName, $valSpace, $vals){
		return $this->deleteStmt2($tableName, $valSpace, $vals);
	}

	public function insert($tableName, $data){
		return $this->insert2Db($tableName, $data);
	}
	public function insert2($tableName, $data){
		return $this->insert2SHK($tableName, $data);
	}
	public function updUserActivity($userId, $btnPressed){
		$active= $this->selectStmt('userActivity', ' WHERE user_id = ?', $userId);

            if(count($active)>0){
				$newVal = $active[0][$btnPressed] + 1;
				$vals = $newVal.', '.$userId;
				$this->update('userActivity', $btnPressed.' = ? WHERE user_id = ?', $vals);
            }
            else{
        		$vals = array('user_id'=>$userId, $btnPressed=>1);
				$this->insert2Db('userActivity', $vals);
            }
	}


}
