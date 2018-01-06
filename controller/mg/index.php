<?php
require_once YYUC_FRAME_PATH.'fun/leftmenu.php';
$r = Session::get('role');
$role = new Model('roles');
$role->find($r);
$qxarrs = $role->qxarr;
if(trim($qxarrs)!=''){
	$qxarr = json_decode($qxarrs);			
}else{
	$qxarr = array();
}

//设置不能访问的路径权限
$no_qxarr = array();
foreach ($menu_index as $key=>$val){
	foreach ($val['sub'] as $k=>$v){
		if(!in_array($v['file'], $qxarr)){
			unset($menu_index[$key]['sub'][$k]);
			array_push($no_qxarr,$v['file']);
		}
	}
	if(count($menu_index[$key]['sub'])==0){
		unset($menu_index[$key]);
	}
}
$index = $menu_index;
Session::set('no_qxarr',$no_qxarr);//不能访问的路径

