<?php
/**
 * 修改密码
 */
$m = new Model('admins');
if($m->try_post()){	
	if(trim($m->cpwd)==''){
		alert('原始密码不能为空');
	}else{
		$mm = new Model('admins');
		$mm->find(Session::get('uid'));
		if($mm->pwd != $m->cpwd){
			alert('原始密码不正确');
		}elseif($m->pwd != $m->npwd){
			alert('两次密码输入不一致');
		}else{
			$mm->update(array('id'=>Session::get('uid')),array('pwd'=>$m->pwd));
			alert('密码更新成功');
		}
	}
}