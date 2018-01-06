<?php 
/**
 * 主体颜色
 */
$col = Request::post('col');
if(Session::set('st')!=$col){
	$u=new Model('admins');
	$u->update(array('id'=>Session::get('uid')),array('theme'=>$col));
	Session::set('st',$col);
}
Response::write('1');