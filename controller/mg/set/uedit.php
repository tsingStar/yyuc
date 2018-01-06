<?php
$u = new Model('admins');
$part = new Model('roles');
$part_a = $part->where(array('id@<>'=>'1'))->map_array('id', 'tit');

if(Request::get(1)){
	$u->find(Request::get(1));
}
if($u->try_post()){
	if($u->save()){
		Redirect::to('user','保存成功');
	}
}