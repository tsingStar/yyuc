<?php
Page::$need_view = false;
$fn = Request::get(1);
if(trim(Conf::$local_remote)==''){
	Conf::$local_remote = YYUC_FRAME_PATH.YYUC_PUB.'/';
}
if(trim(Conf::$remote_path)==''){
	Conf::$remote_path = '/';
}
$path = Conf::$local_remote.upath($fn);
$files = File::scandir($path,4);

$res = array('pp'=>Conf::$remote_path.upath($fn).'/');

foreach ($files as $f){
	$res[$f] = 0;
}

Session::set('O_imagesfn',$fn);
Response::json($res);
