<?php
$roles = new Model('roles');
if('del'==Request::get(1)){
	$id = Request::post('id');
	$roles->find($id);
	if($roles->has_id()){
		$roles->remove();
		Response::write('ok');
	}else{
		Response::write('no');
	}
}
$res = $roles->where(array('id@<>'=>'1'))->order('id')->list_all();

