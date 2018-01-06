<?php
$part = new Model('roles');
if(Request::get(1)){
	$part->find(Request::get(1));
}
if($part->try_post()){
	if($part->save()){
		Redirect::to('role','保存成功');
	}
}