<?php
!isset($_SESSION['user_id']) ? session_start() : '';

	spl_autoload_register('xAutoLoader');

	function xAutoLoader($class) {
		$url = $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

		switch (true) {
			case strpos($url, 'includes'):
				$path = '../classes/';
				break;

			case strpos($url, 'views'):
				$path = '../classes/';
				break;

			case strpos($url, 'src'):
				$path = '../classes/';
				break;

			
			case strpos($url, 'admin'):
				$path = '../classes/';
				break;
            
            case strpos($url, 'admin/inc'):
				$path = '../../classes/';
				break;

			case strpos($url, 'infobipnew/src/sms'):
				$path = '../../../classes/';
				break;

			case strpos($url, 'PHP-v3-1.0.6'):
				$path = '../classes/';
				break;

			default:
				$path = 'classes/';
				break;

		}

		$ext = ".class.php";
		$fullPath = strtolower($path . $class . $ext);

		if(!file_exists($fullPath)){
			return false;
		}
	require_once $fullPath;

	}
	
/*spl_autoload_register(function ($class){
    require_once __DIR__ . '/' . strtolower(str_replace('\\', '/', $class) . '.php');
});*/