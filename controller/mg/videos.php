<?php
$fn = Request::get(1);
if(trim(Conf::$local_remote)==''){
	Conf::$local_remote = YYUC_FRAME_PATH.YYUC_PUB.'/';
}
if(trim(Conf::$remote_path)==''){
	Conf::$remote_path = '/';
}
$path = Conf::$local_remote.upath('videos');

if(!is_dir($path)){
	File::creat_dir($path);
}

$files = File::scandir($path,4);

$res = array();
foreach ($files as $f){
	$res[] = $f;
}
