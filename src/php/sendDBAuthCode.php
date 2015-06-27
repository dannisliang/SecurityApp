<?php
	$authCode = $_POST['dropboxAuthCode'];
	require_once '../dropbox-sdk/Dropbox/autoload.php';
	use \Dropbox as dbx;
	$appInfo = dbx\AppInfo::loadFromJsonFile('../app-info.json');
	$webAuth = new dbx\WebAuthNoRedirect($appInfo, 'PHP-Example/1.0');
	try {
		list($accessToken, $dropboxUserId) = $webAuth->finish($authCode);
	} catch (dbx\Exception $ex) {
		//http_response_code($ex->getCode());
		//print("Error communicating with Dropbox API: " . $ex->getMessage());
		//echo $ex->getCode();
		//header('HTTP/1.1 401 Unauthorized', true, $ex->getCode());
		//print $ex->getMessage();
		//return $ex;
		print $ex->getCode();
	}
?>