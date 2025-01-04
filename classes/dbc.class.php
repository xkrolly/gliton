<?php

class Dbc {
	private $host = "131.153.147.42";//"localhost";//:3308";//"35.241.229.251";
	private $user = "glitng_tee4glit";//xkrollco_tee";//"root";
	private $pwd = "Cmp4p_2u4$";//*gDB23";// //"C__tprT><?-s";
	private $dbName = "glitng_guru";
	private $charset = "utf8mb4";
	protected $con;

	public function __construct() {
		$this->con = mysqli_connect($this->host, $this->user, $this->pwd, $this->dbName);
	}

	protected function connect() {
		$dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbName;
		// . ';charset=';// . $this->charset;
		$pdo = new PDO($dsn, $this->user, $this->pwd);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		return $pdo;
	}

	protected function connect2() {
		$dsn = 'mysql:host=' . $this->host . ';dbname=glitng_gurush';
		$pdo = new PDO($dsn, $this->user, $this->pwd);
		$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
		return $pdo;
	}
}