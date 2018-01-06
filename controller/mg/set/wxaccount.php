<?php
/**
 * 微信配置
 */
$m = new Model('wx_set');
$m->find(1);
if(trim($m->token)==''){
	$m->token = md5(microtime());
	$m->save();
}
$jm43 = md5($m->token).md5(md5($m->token));
$jm43 = substr($jm43, 0, 43);
if($m->try_post()){
	$m->save();
	alert('设置成功');
}