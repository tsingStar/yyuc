<?php
/**
 * 关注回复及无匹配回复
 */
$m = new Model('follow');
$m->find(Session::get('uid'));
if($m->try_post()){
	if(!$m->has_id()){
		$m->id = Session::get('uid');
		$m->insert();
	}else{
		$m->save();
	}
	Response::exejs('layer.msg("设置成功",1,1);');
}