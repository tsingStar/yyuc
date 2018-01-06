<?php
/**
 * 密码找回-2
 */
$uuid = Request::get('ver');
$uuid = String::decryption(urldecode($uuid));
$uuids = explode('@@@', $uuid);
if(count($uuids)!=2){
	Redirect::to_404();
}
//判断链接是否过期
$ygq = false;
$u = new Model('admins');
$u->find(array('email'=>$uuids[0],'pwd'=>$uuids[1]));
if(!$u->has_id()){
	Redirect::to_404();
}else{
	if(Request::post('pwd')){
		$pwd = trim(Request::post('pwd'));
		if($pwd==''){
			alert('密码不能为空，请重新设置');
		}elseif($pwd==Request::post('pwd2')){
			$u->update(array('id'=>$u->id),array('pwd'=>$pwd));
			set_login($u);
			Redirect::to('/mg/','密码更新成功,欢迎回来！');
		}else{
			alert('两次密码不一致，请重新设置');
		}
	}
	
}