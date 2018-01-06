<?php
$media_id=Request::get('media_id');
if(!$media_id){
	die('ERROR');
}
$tk = WX_gettoken();
if(!$tk){
	die('nosec');
}

$pem=array();
$pem['media_id']=$media_id;
$url ="https://api.weixin.qq.com/cgi-bin/material/get_material?access_token=".$tk;
$res=HttpCurl::quickpost($url, json_encode($pem));
header('Content-Type: image/png');
echo $res;