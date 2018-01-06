<?php
/**
 * 基本信息
 */
$m = new Model('admins');

$uid = Session::get('uid');
$m->find($uid);

if($m->try_post()){
	$m->save();
	alert('设置成功');
}
