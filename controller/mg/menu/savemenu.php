<?php
$m = new Model('menu');
$uid = Session::get('uid');
$m->find($uid);
$m->menu = Request::post('data');
if($m->has_id()){
	$m->update(array('id'=>$uid),array('menu'=>Request::post('data')));
}else{
	$m->insert(array('id'=>$uid,'menu'=>Request::post('data')));
}
Response::write('ok');
