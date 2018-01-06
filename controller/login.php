<?php
/**
 * 登陆
 */
if(Cookie::has('ui')){
	$uid = Cookie::get('ui');
	$u = new Model('admins');
	$u->find($uid);
	if($u->has_id() && md5($u->pwd.$u->id.Conf::$management_center_password)==Cookie::get('up')){
		set_login($u,'自动登录成功');
	}else{
		Cookie::clear();
		Session::clear();
	}
}

$un = trim(Request::post('un'));
$pwd = trim(Request::post('pwd'));
$rem = trim(Request::post('rem'));

if($un != '' && $pwd !=''){
	$u = new Model('admins');
	$u->find(array('pwd'=>$pwd,'OR'=>array('un'=>$un,'email'=>$un)));
	if($u->has_id()&&$u->id>0){
		if($rem=='1'){
			Cookie::set('ui',$u->id);
			Cookie::set('up',md5($u->pwd.$u->id.Conf::$management_center_password));
		}
		set_login($u,'登录成功');
	}else{
		toast('登录信息不正确');
		Cookie::clear();
		Session::clear();
	}
}



